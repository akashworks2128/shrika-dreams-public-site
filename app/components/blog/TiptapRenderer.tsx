import type { ReactNode } from "react";
import type { TiptapNode } from "@/lib/data/blogSupabase";
import GalleryLightbox, { type GalleryItem } from "./GalleryLightbox";

/**
 * Renders Tiptap JSON (as stored by the admin editor) to React elements.
 * No HTML is injected: every node/mark is mapped explicitly, so content from
 * the database can't introduce script or arbitrary markup.
 *
 * Supported: paragraphs, headings 1–4, text alignment, bold/italic/underline/
 * strike/code/highlight/sub/sup/link marks, bullet + numbered lists, blockquote,
 * code blocks, horizontal rules, images, gallery blocks, and tables.
 */

const ALIGN_CLASS: Record<string, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify",
};

const HEADING_CLASS: Record<number, string> = {
  1: "font-serif text-3xl md:text-4xl font-bold text-navy leading-tight mt-10 mb-5",
  2: "font-serif text-2xl md:text-3xl font-bold text-navy leading-tight mt-9 mb-4",
  3: "font-serif text-xl md:text-2xl font-bold text-navy leading-snug mt-8 mb-3",
  4: "font-serif text-lg md:text-xl font-bold text-navy leading-snug mt-6 mb-3",
};

const GALLERY_COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
};

const GALLERY_TYPES = new Set(["gallery", "imageGallery", "galleryBlock", "image-gallery", "image_gallery"]);

function align(node: TiptapNode): string {
  const value = node.attrs?.textAlign;
  return typeof value === "string" ? (ALIGN_CLASS[value] ?? "") : "";
}

function safeUrl(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (/^(https?:\/\/|\/(?!\/))/i.test(url)) return url;
  return null;
}

function safeHref(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const url = value.trim();
  if (/^(https?:\/\/|mailto:|tel:|\/(?!\/)|#)/i.test(url)) return url;
  return null;
}

function num(value: unknown): number | undefined {
  const n = typeof value === "string" ? parseInt(value, 10) : value;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? n : undefined;
}

function renderText(node: TiptapNode, key: string): ReactNode {
  let out: ReactNode = node.text ?? "";
  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case "bold":
        out = <strong className="font-semibold text-navy">{out}</strong>;
        break;
      case "italic":
        out = <em>{out}</em>;
        break;
      case "underline":
        out = <u>{out}</u>;
        break;
      case "strike":
        out = <s>{out}</s>;
        break;
      case "code":
        out = <code className="rounded bg-navy/[0.06] px-1.5 py-0.5 text-[0.9em] text-navy">{out}</code>;
        break;
      case "highlight":
        out = <mark className="rounded bg-gold/25 px-0.5 text-inherit">{out}</mark>;
        break;
      case "subscript":
        out = <sub>{out}</sub>;
        break;
      case "superscript":
        out = <sup>{out}</sup>;
        break;
      case "link": {
        const href = safeHref(mark.attrs?.href);
        if (href) {
          const external = /^https?:\/\//i.test(href);
          out = (
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer nofollow" } : {})}
              className="font-medium text-navy underline decoration-gold decoration-2 underline-offset-2 hover:text-gold transition-colors break-words"
            >
              {out}
            </a>
          );
        }
        break;
      }
      default:
        break; // textStyle/color etc. intentionally ignored to keep brand colors.
    }
  }
  return <span key={key} className="contents">{out}</span>;
}

function renderChildren(nodes: TiptapNode[] | undefined, path: string): ReactNode[] {
  return (nodes ?? []).map((child, i) => renderNode(child, `${path}.${i}`));
}

function Img({ src, alt, caption, width, height }: { src: string; alt: string; caption?: string; width?: number; height?: number }) {
  return (
    <figure className="my-8">
      {/* Content images can come from any host, so plain <img> is used instead of next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        className="mx-auto h-auto max-w-full rounded-xl border border-black/[0.06]"
      />
      {caption ? (
        <figcaption className="mt-2.5 text-center text-sm text-gray-400">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function galleryItems(node: TiptapNode): GalleryItem[] {
  const items: GalleryItem[] = [];
  const fromAttrs = node.attrs?.images ?? node.attrs?.items ?? node.attrs?.urls;
  if (Array.isArray(fromAttrs)) {
    for (const entry of fromAttrs) {
      if (typeof entry === "string") {
        const src = safeUrl(entry);
        if (src) items.push({ src, alt: "" });
      } else if (entry && typeof entry === "object") {
        const e = entry as Record<string, unknown>;
        const src = safeUrl(e.src ?? e.url);
        if (src) {
          items.push({
            src,
            alt: typeof e.alt === "string" ? e.alt : "",
            caption: typeof e.caption === "string" ? e.caption : typeof e.title === "string" ? e.title : undefined,
          });
        }
      }
    }
  }
  for (const child of node.content ?? []) {
    if (child.type === "image") {
      const src = safeUrl(child.attrs?.src);
      if (src) {
        items.push({
          src,
          alt: typeof child.attrs?.alt === "string" ? child.attrs.alt : "",
          caption: typeof child.attrs?.title === "string" ? child.attrs.title : undefined,
        });
      }
    }
  }
  return items;
}

function renderNode(node: TiptapNode, path: string): ReactNode {
  const children = () => renderChildren(node.content, path);

  switch (node.type) {
    case "text":
      return renderText(node, path);

    case "hardBreak":
      return <br key={path} />;

    case "paragraph": {
      // An empty paragraph is a visual spacer in Tiptap; keep it as a blank line.
      const empty = !node.content || node.content.length === 0;
      return (
        <p key={path} className={`my-5 leading-[1.85] ${align(node)}`}>
          {empty ? <br /> : children()}
        </p>
      );
    }

    case "heading": {
      const level = Math.min(4, Math.max(1, num(node.attrs?.level) ?? 2));
      const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4";
      return (
        <Tag key={path} className={`${HEADING_CLASS[level]} ${align(node)}`}>
          {children()}
        </Tag>
      );
    }

    case "bulletList":
      return (
        <ul key={path} className="my-5 list-disc space-y-2 pl-6 marker:text-gold">
          {children()}
        </ul>
      );

    case "orderedList": {
      const start = num(node.attrs?.start);
      return (
        <ol key={path} start={start} className="my-5 list-decimal space-y-2 pl-6 marker:font-semibold marker:text-gold">
          {children()}
        </ol>
      );
    }

    case "listItem":
      // Tight list items: paragraph margins inside <li> would double the spacing.
      return (
        <li key={path} className="pl-1 leading-[1.85] [&>p]:my-1 [&>ul]:my-2 [&>ol]:my-2">
          {children()}
        </li>
      );

    case "blockquote":
      return (
        <blockquote key={path} className="my-7 border-l-4 border-gold bg-gold/[0.06] py-1 pl-5 pr-4 italic text-navy/90">
          {children()}
        </blockquote>
      );

    case "codeBlock":
      return (
        <pre key={path} className="my-6 max-w-full overflow-x-auto rounded-xl bg-dark p-4 text-sm leading-relaxed text-white/85">
          <code>{(node.content ?? []).map((c) => c.text ?? "").join("")}</code>
        </pre>
      );

    case "horizontalRule":
      return <hr key={path} className="my-10 border-0 border-t border-black/10" />;

    case "image": {
      const src = safeUrl(node.attrs?.src);
      if (!src) return null;
      return (
        <Img
          key={path}
          src={src}
          alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""}
          caption={typeof node.attrs?.title === "string" ? node.attrs.title : undefined}
          width={num(node.attrs?.width)}
          height={num(node.attrs?.height)}
        />
      );
    }

    case "table":
      return (
        <div key={path} className="my-8 max-w-full overflow-x-auto rounded-xl border border-black/[0.08]">
          <table className="w-full min-w-[480px] border-collapse text-left text-sm">
            <tbody>{children()}</tbody>
          </table>
        </div>
      );

    case "tableRow":
      return (
        <tr key={path} className="border-b border-black/[0.06] last:border-b-0">
          {children()}
        </tr>
      );

    case "tableHeader":
    case "tableCell": {
      const Tag = node.type === "tableHeader" ? "th" : "td";
      const colSpan = num(node.attrs?.colspan);
      const rowSpan = num(node.attrs?.rowspan);
      return (
        <Tag
          key={path}
          colSpan={colSpan}
          rowSpan={rowSpan}
          className={`align-top px-4 py-3 border-r border-black/[0.06] last:border-r-0 [&>p]:my-0 ${
            Tag === "th" ? "bg-navy/[0.05] font-semibold text-navy" : "text-gray-600"
          }`}
        >
          {children()}
        </Tag>
      );
    }

    default: {
      if (node.type && GALLERY_TYPES.has(node.type)) {
        const items = galleryItems(node);
        if (items.length === 0) return null;
        const requested = num(node.attrs?.columns);
        const cols = GALLERY_COLS[Math.min(4, requested ?? Math.min(items.length, 3))] ?? GALLERY_COLS[3];
        return (
          <GalleryLightbox key={path} items={items} gridClassName={`my-8 grid gap-3 ${cols}`} />
        );
      }
      // Unknown node: render its children so text is never silently lost.
      return node.content ? <div key={path}>{children()}</div> : null;
    }
  }
}

export default function TiptapRenderer({ doc }: { doc: TiptapNode }) {
  return (
    <div className="min-w-0 text-[1.0625rem] text-gray-600 [overflow-wrap:anywhere]">
      {renderChildren(doc.content, "n")}
    </div>
  );
}
