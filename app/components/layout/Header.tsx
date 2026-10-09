"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Building2, Menu, Phone, X } from "lucide-react";
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

  // Close mobile menu when viewport becomes desktop-wide.
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
  const isDark = variant === "solid" || !scrolled;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/#projects") return pathname === "/projects";
    if (href.startsWith("/localities")) return pathname.startsWith("/localities");
    return pathname === href;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        variant === "solid"
          ? "bg-navy shadow-[0_1px_12px_rgba(0,0,0,0.18)]"
          : scrolled
            ? "bg-white border-b border-black/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.06)]"
            : "bg-transparent border-b-0 shadow-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
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
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }, index) => {
              const active = isActive(href);
              return (
                <Link
                  key={`${href}-${index}`}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  className={`text-sm font-medium tracking-wide transition-colors ${
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
          <div className="hidden md:flex items-center gap-5">
            <a
              href={BRAND.phoneHref}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
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
            className={`md:hidden p-1.5 transition-colors ${
              isDark ? "text-white" : "text-gray-800"
            }`}
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-black/[0.06]">
          <div className="px-4 sm:px-5 py-5 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }, index) => (
              <Link
                key={`${href}-${index}`}
                href={href}
                onClick={(e) => {
                  handleNavClick(e, href);
                  setMobileOpen(false);
                }}
                className={`py-3 text-sm font-medium border-b border-gray-50 last:border-0 ${
                  isActive(href) ? "text-navy font-semibold" : "text-gray-700"
                }`}
              >
                {label}
              </Link>
            ))}
            <a
              href={BRAND.phoneHref}
              className="mt-3 flex items-center gap-2 py-3 text-sm text-gray-500"
            >
              <Phone className="w-4 h-4" />
              {BRAND.phone}
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-2 py-3.5 text-center text-sm font-semibold text-white rounded bg-gold"
            >
              Get a Callback
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
