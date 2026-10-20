"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, ChevronRight, Menu, Phone, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";

interface HeaderProps {
  /**
   * "overlay" (default): transparent over a hero image, turns solid white on scroll.
   * "solid": always the navy bar — for pages with no hero image behind the header,
   * like /projects.
   */
  variant?: "overlay" | "solid";
}

const PENDING_SCROLL_KEY = "pendingScrollToHash";

export default function Header({ variant = "overlay" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (variant === "solid") return;
    const handleScroll = () => setScrolled(window.scrollY > 56);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [variant]);

  // Close the mobile menu when the viewport becomes wide enough for the full
  // desktop navbar. Keep this in sync with the `xl:` classes below (1280px).
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1280px)");
    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  // While the mobile sheet is open: lock page scroll behind it and allow Escape to close.
  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [mobileOpen]);

  // Next.js's built-in hash-scroll on <Link> is unreliable: it can silently
  // no-op on a repeat click, or fire before the destination page's sections
  // have mounted after a cross-page navigation. This picks up any hash we
  // stashed before navigating and scrolls to it once this page has mounted.
  useEffect(() => {
    const pending = sessionStorage.getItem(PENDING_SCROLL_KEY);
    if (!pending) return;
    sessionStorage.removeItem(PENDING_SCROLL_KEY);
    requestAnimationFrame(() => {
      document.getElementById(pending)?.scrollIntoView({ behavior: "smooth" });
    });
  }, [pathname]);

  /**
   * Handles every nav link that may point at a same-page or cross-page
   * hash (e.g. "/#projects"). Plain page links (e.g. "/builders") are left
   * alone and handled entirely by next/link as normal.
   */
  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Special-case the plain Home link ("/"): it has no hash, so the
    // generic hash-handling below doesn't apply, but clicking Home should
    // always return to the top of the page — even when already on "/",
    // where a plain <Link> would otherwise be a same-URL no-op.
    if (href === "/") {
      if (pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Navigating from another page: let next/link do a normal push to
      // "/", which mounts the Home page fresh at the top already.
      return;
    }

    const hashIndex = href.indexOf("#");
    if (hashIndex === -1) return; // Plain route — let Link handle it.

    const targetPath = href.slice(0, hashIndex) || "/";
    const hash = href.slice(hashIndex + 1);

    if (pathname === targetPath) {
      // Already on the right page: scroll directly instead of relying on
      // the browser/Next to notice a hash-only URL change.
      e.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `${targetPath}#${hash}`);
    } else {
      // Navigating from a different page: stash the target so the effect
      // above can scroll to it once the destination page has mounted.
      e.preventDefault();
      sessionStorage.setItem(PENDING_SCROLL_KEY, hash);
      router.push(href);
    }
  }

  // Navy background + white text: either the "solid" variant, or the
  // "overlay" variant before the page has been scrolled.
  const isDark = variant === "solid" || !scrolled || mobileOpen;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/#projects") return pathname === "/projects";
    if (href.startsWith("/localities")) return pathname.startsWith("/localities");
    if (href === "/blog") return pathname.startsWith("/blog");
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        mobileOpen ? "z-[60]" : "z-50"
      } ${
        mobileOpen
          ? "bg-navy border-b border-white/10 shadow-none"
          : variant === "solid"
          ? "bg-navy shadow-[0_1px_12px_rgba(0,0,0,0.18)]"
          : scrolled
            ? "bg-white border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b-0 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between gap-4 xl:gap-8 h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 whitespace-nowrap">
            <div className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0 bg-gold">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div
                className={`font-serif text-base font-bold leading-tight tracking-tight transition-colors ${
                  isDark ? "text-white" : "text-navy"
                }`}
              >
                {BRAND.name}
              </div>
              <div
                className={`text-[9px] tracking-[0.18em] uppercase font-medium transition-colors ${
                  isDark ? "text-white/50" : "text-gray-400"
                }`}
              >
                {BRAND.title}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-6 2xl:gap-7">
            {NAV_LINKS.map(({ label, href }, index) => {
              const active = isActive(href);
              return (
                <Link
                  key={`${href}-${index}`}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`text-sm font-medium tracking-wide whitespace-nowrap transition-colors ${
                    active
                      ? isDark
                        ? "text-gold"
                        : "text-navy font-semibold"
                      : isDark
                        ? "text-white/75 hover:text-white"
                        : "text-gray-600 hover:text-navy"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-5 flex-shrink-0">
            <a
              href={BRAND.phoneHref}
              className={`flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors ${
                isDark
                  ? "text-white/65 hover:text-white"
                  : "text-gray-500 hover:text-navy"
              }`}
            >
              {BRAND.phone}
              <Phone className="w-3.5 h-3.5" />
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0 bg-gold"
            >
              Get a Callback
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className={`xl:hidden flex-shrink-0 -mr-2 w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
              isDark ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-black/5"
            }`}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: full-height navy sheet. Always mounted so it can fade/slide;
          inert + invisible while closed so it can't be focused or tapped. */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        className={`xl:hidden fixed inset-x-0 top-16 lg:top-20 bottom-0 overflow-hidden bg-gradient-to-b from-navy to-dark transition-[opacity,visibility,transform] duration-300 ease-out ${
          mobileOpen
            ? "visible opacity-100 translate-y-0"
            : "invisible opacity-0 -translate-y-2"
        }`}
      >
        {/* Same faint line texture used on the site's dark CTA sections. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px)",
          }}
        />

        <div className="relative h-full max-w-7xl mx-auto px-5 lg:px-8 flex flex-col">
          <nav aria-label="Mobile" className="flex-1 min-h-0 overflow-y-auto overscroll-contain pt-4 pb-4">
            <div className="max-w-xl">
              {NAV_LINKS.map(({ label, href }, index) => {
                const active = isActive(href);
                return (
                  <Link
                    key={`${href}-${index}`}
                    href={href}
                    onClick={(e) => {
                      // Release the scroll lock first so same-page hash scrolling works.
                      document.body.style.overflow = "";
                      handleNavClick(e, href);
                      setMobileOpen(false);
                    }}
                    style={{ transitionDelay: mobileOpen ? `${90 + index * 45}ms` : "0ms" }}
                    className={`group flex items-center justify-between py-4 [@media(max-height:700px)]:py-2.5 border-b border-white/10 transition-all duration-500 ease-out ${
                      mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                  >
                    <span className="flex items-center gap-4 min-w-0">
                      <span className="w-6 flex-shrink-0 font-serif text-[11px] tracking-[0.2em] text-gold/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`font-serif text-[1.65rem] [@media(max-height:700px)]:text-xl leading-none tracking-tight transition-colors ${
                          active ? "text-gold" : "text-white/90 group-hover:text-white"
                        }`}
                      >
                        {label}
                      </span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 flex-shrink-0 transition-all group-hover:translate-x-0.5 ${
                        active ? "text-gold" : "text-white/25 group-hover:text-gold"
                      }`}
                    />
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Pinned bottom block: always reachable without scrolling. */}
          <div
            className="flex-shrink-0 max-w-xl w-full pt-4 [@media(max-height:700px)]:pt-3 space-y-3 [@media(max-height:700px)]:space-y-2 border-t border-white/10 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
          >
            <a
              href={BRAND.phoneHref}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3 [@media(max-height:700px)]:py-2 transition-colors hover:bg-white/[0.08]"
            >
              <span className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 bg-gold/20">
                <Phone className="w-4 h-4 text-gold" />
              </span>
              <span className="min-w-0">
                <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-white/40">
                  Call us
                </span>
                <span className="block text-base font-semibold text-white whitespace-nowrap">
                  {BRAND.phone}
                </span>
              </span>
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block rounded-xl bg-gold py-4 [@media(max-height:700px)]:py-3 text-center text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Get a Callback
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
