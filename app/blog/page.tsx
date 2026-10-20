import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";
import FadeIn from "@/components/motion/FadeIn";
import BlogHero from "@/components/blog/BlogHero";
import BlogCard from "@/components/blog/BlogCard";
import BlogCTA from "@/components/blog/BlogCTA";
import { getPublishedBlogPosts, type BlogPost } from "@/lib/data/blogSupabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Shrika Dreams Real Estate Consultant",
  description:
    "Property insights, locality guides, and buying advice for Bangalore home buyers from Shrika Dreams.",
};

export default async function BlogPage() {
  let posts: BlogPost[] = [];
  let failed = false;
  try {
    posts = await getPublishedBlogPosts();
  } catch (error) {
    failed = true;
    console.error("Failed to load public blog posts from Supabase:", error);
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main>
        <BlogHero />
        <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pb-14 lg:pb-16">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0">
              {posts.map((post, idx) => (
                <FadeIn key={post.id} delay={(idx % 3) * 0.06} className="h-full min-w-0">
                  <BlogCard post={post} />
                </FadeIn>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-black/[0.06] bg-white px-6 py-14 text-center">
              <h2 className="font-serif text-xl font-bold text-navy mb-2">
                {failed ? "Articles are unavailable right now" : "No articles published yet"}
              </h2>
              <p className="text-sm text-gray-500">
                {failed
                  ? "Please try again in a little while."
                  : "We're preparing new guides. Please check back soon."}
              </p>
            </div>
          )}
        </div>
        <BlogCTA />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
