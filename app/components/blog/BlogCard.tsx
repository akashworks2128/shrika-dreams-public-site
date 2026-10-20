import Link from "next/link";
import { ArrowRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/lib/data/blogSupabase";
import { formatBlogDate } from "./blogFormat";

export default function BlogCard({ post }: { post: BlogPost }) {
  const date = formatBlogDate(post.publishedAt);

  return (
    <article className="group h-full min-w-0 bg-white rounded-xl overflow-hidden border border-black/[0.06] shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_16px_36px_rgba(0,0,0,0.10)] hover:-translate-y-1 flex flex-col">
      <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-navy/[0.06]">
        {post.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImage}
            alt={post.title}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-navy">
            <span className="font-serif text-xl font-bold text-gold/80">Shrika Dreams</span>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1">
          {post.category ? (
            <span className="text-[10px] font-bold tracking-[0.14em] uppercase text-gold">
              {post.category}
            </span>
          ) : null}
          {date ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400">
              <CalendarDays className="w-3 h-3" />
              {date}
            </span>
          ) : null}
        </div>

        <h2 className="font-serif font-bold text-lg leading-snug text-navy mb-3 break-words">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {post.excerpt ? (
          <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
        ) : null}

        <Link
          href={`/blog/${post.slug}`}
          className="mt-auto pt-4 border-t border-black/[0.06] inline-flex items-center gap-1 text-sm font-semibold text-navy"
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </article>
  );
}
