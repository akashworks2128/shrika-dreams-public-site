import { supabase } from "../supabase";

/**
 * Public blog data access. Reuses the shared Supabase client (anon/publishable
 * key only) — row visibility is enforced by RLS on `public.blog_posts`.
 *
 * The table's exact columns weren't available when this was written, so the
 * mapper below reads a few common aliases for each field. Adjust BlogPostRow /
 * mapBlogPost if the real column names differ.
 */

export type TiptapNode = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
  marks?: { type: string; attrs?: Record<string, unknown> }[];
  text?: string;
};

type BlogPostRow = Record<string, unknown>;

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Tiptap JSON document, or null when content is missing / not JSON. */
  content: TiptapNode | null;
  /** Raw string content when it is not Tiptap JSON (e.g. HTML). Rendered as plain text. */
  contentText: string;
  coverImage: string | null;
  author: string | null;
  category: string | null;
  /** Admin "Publish date" (publish_date), falling back to older date columns / created_at. */
  publishedAt: string | null;
  createdAt: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
};

function str(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function pick(row: BlogPostRow, keys: string[]): string | null {
  for (const key of keys) {
    const value = str(row[key]);
    if (value) return value;
  }
  return null;
}

function collectText(node: TiptapNode, out: string[]): void {
  if (node.type === "text" && typeof node.text === "string") out.push(node.text);
  for (const child of node.content ?? []) collectText(child, out);
  if (node.type && node.type !== "doc" && node.type !== "text") out.push(" "); // keep adjacent blocks apart
}

/**
 * The admin saves `excerpt` as Tiptap JSON (jsonb). Older/other rows may hold a
 * plain string. Either way this returns safe plain text (no HTML is injected).
 */
function excerptText(raw: unknown): string {
  let value = raw;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return "";
    if (trimmed.startsWith("{")) {
      try {
        value = JSON.parse(trimmed);
      } catch {
        return trimmed.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
      }
    } else {
      return trimmed.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    }
  }
  if (value && typeof value === "object" && !Array.isArray(value)) {
    const parts: string[] = [];
    collectText(value as TiptapNode, parts);
    return parts.join("").replace(/\s+/g, " ").trim();
  }
  return "";
}

function parseContent(raw: unknown): { doc: TiptapNode | null; text: string } {
  let value = raw;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return { doc: null, text: "" };
    try {
      value = JSON.parse(trimmed);
    } catch {
      // Not JSON (likely HTML/plain text). We deliberately don't inject raw HTML.
      return { doc: null, text: trimmed.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim() };
    }
  }
  if (value && typeof value === "object" && (value as TiptapNode).type === "doc") {
    return { doc: value as TiptapNode, text: "" };
  }
  return { doc: null, text: "" };
}

/** Rows are filtered by the query, but double-check in case of a status-style schema. */
function isPublishedRow(row: BlogPostRow): boolean {
  if (typeof row.is_published === "boolean") return row.is_published;
  if (typeof row.published === "boolean") return row.published;
  if (typeof row.status === "string") return row.status.toLowerCase() === "published";
  return true;
}

export function mapBlogPost(row: BlogPostRow): BlogPost {
  const { doc, text } = parseContent(row.content ?? row.body ?? row.content_json);
  return {
    id: String(row.id ?? row.slug ?? ""),
    slug: String(row.slug ?? ""),
    title: pick(row, ["title"]) ?? "Untitled",
    excerpt: excerptText(row.excerpt) || pick(row, ["summary", "short_description", "description"]) || "",
    content: doc,
    contentText: text,
    coverImage: pick(row, ["cover_image_url", "featured_image_url", "cover_image", "image_url", "thumbnail_url"]),
    author: pick(row, ["author_name", "author"]),
    category: pick(row, ["category"]),
    publishedAt: pick(row, ["publish_date", "published_at", "created_at"]),
    createdAt: pick(row, ["created_at"]),
    metaTitle: pick(row, ["meta_title", "seo_title"]),
    metaDescription: pick(row, ["meta_description", "seo_description"]),
  };
}

type Filter = (query: ReturnType<typeof baseQuery>) => ReturnType<typeof baseQuery>;

function baseQuery() {
  return supabase.from("blog_posts").select("*");
}

/**
 * Runs `build` against `is_published = true`; if the table uses a `status`
 * column instead (Postgres error 42703 = undefined column), retries with
 * `status = 'published'`.
 */
async function queryPublished(build: Filter) {
  const first = await build(baseQuery().eq("is_published", true));
  if (!first.error || first.error.code !== "42703") return first;
  return build(baseQuery().eq("status", "published"));
}

/**
 * `select("*")` means a missing column never breaks the page: the excerpt is simply
 * empty and the date falls back to created_at. This logs which SQL is needed.
 */
function warnIfSettingsColumnsMissing(rows: BlogPostRow[]) {
  const first = rows[0];
  if (!first) return;
  const missing = ["excerpt", "publish_date"].filter((column) => !(column in first));
  if (missing.length > 0) {
    console.warn(
      `[blog] blog_posts is missing column(s): ${missing.join(", ")}. ` +
        "Run the admin migration 20261013_blog_posts_settings.sql in the Supabase SQL Editor.",
    );
  }
}

export async function getPublishedBlogPosts(): Promise<BlogPost[]> {
  // No SQL ORDER BY: sorting happens below so a missing date column can't break the query.
  const { data, error } = await queryPublished((q) => q);

  if (error) {
    console.error("Supabase blog_posts error:", error);
    throw new Error(error.message);
  }

  warnIfSettingsColumnsMissing((data ?? []) as BlogPostRow[]);

  return ((data ?? []) as BlogPostRow[])
    .filter(isPublishedRow)
    .map(mapBlogPost)
    .filter((post) => post.slug)
    .sort(
      (a, b) =>
        (Date.parse(b.publishedAt ?? "") || 0) - (Date.parse(a.publishedAt ?? "") || 0) ||
        (Date.parse(b.createdAt ?? "") || 0) - (Date.parse(a.createdAt ?? "") || 0),
    );
}

export async function getPublishedBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const { data, error } = await queryPublished((q) => q.eq("slug", slug).limit(1));

  if (error) {
    console.error("Supabase blog_posts slug error:", error);
    throw new Error(error.message);
  }

  const row = ((data ?? []) as BlogPostRow[]).find(isPublishedRow);
  return row ? mapBlogPost(row) : null;
}
