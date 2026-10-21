import Header from "@/components/layout/Header";

/**
 * Instant feedback shown while a server-rendered (force-dynamic) detail page
 * is fetching from Supabase. Without it, tapping a card gives no response
 * until the data arrives, which reads as a broken tap on mobile networks.
 */
export default function PageLoading({ label }: { label: string }) {
  return (
    <div className="min-h-screen bg-offwhite">
      <Header variant="solid" />
      <main
        className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8 pt-28 pb-16"
        aria-busy="true"
        aria-live="polite"
      >
        <span className="sr-only">{label}</span>
        <div className="h-3 w-28 rounded bg-gold/40 mb-5 animate-pulse" />
        <div className="h-9 w-3/4 max-w-md rounded bg-navy/10 mb-4 animate-pulse" />
        <div className="h-4 w-1/2 max-w-sm rounded bg-navy/10 mb-10 animate-pulse" />
        <div className="h-56 sm:h-72 w-full rounded-xl bg-navy/[0.06] animate-pulse" />
      </main>
    </div>
  );
}
