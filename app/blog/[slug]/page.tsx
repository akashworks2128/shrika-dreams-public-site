import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ChevronRight, User } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import SectionEyebrow from "@/components/ui/SectionEyebrow";
import BlogCTA from "@/components/blog/BlogCTA";
import TiptapRenderer from "@/components/blog/TiptapRenderer";
import { formatBlogDate } from "@/components/blog/blogFormat";
import { getPublishedBlogPostBySlug } from "@/lib/data/blogSupabase";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  let post = null;
  try {
    post = await getPublishedBlogPostBySlug(slug);
  } catch {
    // Fall through to the generic title; the page itself will surface the failure.
  }
  if (!post) return { title: "Article Not Found | Shrika Dreams" };

  const description = post.metaDescription || post.excerpt || undefined;
  return {
    title: `${post.metaTitle || post.title} | Shrika Dreams Real Estate Consultant`,
    description,
    openGraph: {
      title: post.metaTitle || post.title,
      description,
      type: "article",
      ...(post.coverImage ? { images: [post.coverImage] } : {}),
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedBlogPostBySlug(slug);
  if (!post) notFound();

  const date = formatBlogDate(post.publishedAt);

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <article className="pt-24 pb-12 lg:pt-28 lg:pb-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-5 lg:px-8">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-sm text-gray-400 mb-6 min-w-0"
            >
              <Link href="/" className="hover:text-navy transition-colors flex-shrink-0">
                Home
              </Link>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <Link href="/blog" className="hover:text-navy transition-colors flex-shrink-0">
                Blog
              </Link>
              <ChevronRight className="w-3 h-3 flex-shrink-0" />
              <span className="text-gray-500 font-medium truncate">{post.title}</span>
            </nav>

            {post.category ? (
              <SectionEyebrow className="mb-3">{post.category}</SectionEyebrow>
            ) : null}
            <h1 className="font-serif text-3xl md:text-4xl font-bold leading-tight text-navy mb-5 break-words">
              {post.title}
            </h1>

            {date || post.author ? (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-400 mb-8">
                {post.author ? (
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gold" />
                    {post.author}
                  </span>
                ) : null}
                {date ? (
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="w-3.5 h-3.5 text-gold" />
                    {date}
                  </span>
                ) : null}
              </div>
            ) : null}

            {post.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover rounded-xl border border-black/[0.06] mb-10"
              />
            ) : null}

            {post.content ? (
              <TiptapRenderer doc={post.content} />
            ) : post.contentText ? (
              <p className="leading-[1.85] text-gray-600 whitespace-pre-line [overflow-wrap:anywhere]">
                {post.contentText}
              </p>
            ) : null}

            <div className="mt-12 pt-6 border-t border-black/[0.06]">
              <Link
                href="/blog"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                Back to all articles
              </Link>
            </div>
          </div>
        </article>
        <BlogCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
