"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowRight,
  Building2,
  ChevronRight,
  FileText,
  Home,
  Info,
  Mail,
  MapPin,
  Menu,
  Phone,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
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

/** Outline icon for each nav label (labels come from NAV_LINKS). */
const NAV_ICONS: Record<string, LucideIcon> = {
  Home,
  Localities: MapPin,
  Projects: Building2,
  Builders: Users,
  About: Info,
  Contact: Mail,
  Blog: FileText,
};

// Existing building photo already used by the hero; only fetched once the
// menu has been opened, so it costs nothing on first load.
const MENU_HEADER_IMAGE =
  "https://images.unsplash.com/photo-1564486593523-38d62206e706?w=640&h=320&fit=crop&auto=format";

/** Smooth scrolling unless the visitor prefers reduced motion. */
function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

/**
 * Locks/unlocks page scroll. Both <html> and <body> are set: whichever one
 * the browser treats as the viewport scroller is then locked.
 */
function setScrollLock(locked: boolean) {
  const value = locked ? "hidden" : "";
  document.documentElement.style.overflow = value;
  document.body.style.overflow = value;
}

export default function Header({ variant = "overlay" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  // Becomes true the first time the menu is opened (lazy-loads the header photo).
  const [menuEverOpened, setMenuEverOpened] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
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

  // While the mobile sheet is open: lock page scroll behind it, move focus to
  // the close button, and allow Escape to close.
  useEffect(() => {
    if (!mobileOpen) return;
    setScrollLock(true);
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      setScrollLock(false);
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
      document.getElementById(pending)?.scrollIntoView({ behavior: scrollBehavior() });
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
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
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
      document.getElementById(hash)?.scrollIntoView({ behavior: scrollBehavior() });
      window.history.replaceState(null, "", `${targetPath}#${hash}`);
    } else {
      // Navigating from a different page: stash the target so the effect
      // above can scroll to it once the destination page has mounted.
      e.preventDefault();
      sessionStorage.setItem(PENDING_SCROLL_KEY, hash);
      router.push(href);
    }
  }

  function closeMenu() {
    setMobileOpen(false);
    toggleRef.current?.focus();
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
            ref={toggleRef}
            onClick={() => {
              setMenuEverOpened(true);
              setMobileOpen((open) => !open);
            }}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: centered panel over a dark backdrop. Navy header, white
          navigation, gold accents — all from the existing brand palette. */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        // Backdrop click closes; clicks that start inside the panel never match
        // currentTarget, so they can't close it by accident.
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMenu();
        }}
        className={`xl:hidden fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/70 px-3 pt-[max(12px,env(safe-area-inset-top))] pb-[max(12px,env(safe-area-inset-bottom))] transition-[opacity,visibility] duration-200 sm:items-center ${
          mobileOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Site navigation"
          className={`relative flex max-h-[calc(100dvh-24px)] min-h-[min(640px,calc(100dvh-24px))] w-full max-w-[420px] flex-col overflow-hidden rounded-xl bg-white font-sans shadow-[0_18px_44px_rgba(0,0,0,0.35)] ring-1 ring-white/10 ${
            mobileOpen ? "menu-panel-in" : ""
          }`}
        >
          {/* Navy header with subtle architectural photo and curved gold edge */}
          <div className="relative flex-shrink-0 overflow-hidden bg-navy px-5 pb-10 pt-5">
            {menuEverOpened && (
              <Image
                src={MENU_HEADER_IMAGE}
                alt=""
                fill
                sizes="420px"
                aria-hidden="true"
                className="object-cover object-right opacity-30"
              />
            )}
            {/* Keeps the text side solid navy so the wordmark stays readable. */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #1a2744 0%, rgba(26,39,68,0.94) 48%, rgba(26,39,68,0.62) 100%)",
              }}
            />

            <div className="relative z-10 flex items-center justify-between gap-3">
              <Link
                href="/"
                onClick={(e) => {
                  setScrollLock(false);
                  handleNavClick(e, "/");
                  setMobileOpen(false);
                }}
                className="flex min-w-0 items-center gap-3.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label={`${BRAND.name} home`}
              >
                <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gold shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
                  <Building2 className="h-6 w-6 text-white" strokeWidth={1.6} />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[22px] font-bold leading-tight tracking-tight text-white">
                    {BRAND.name}
                  </span>
                  <span className="mt-1 block truncate text-[10px] font-medium uppercase tracking-[0.24em] text-white/70">
                    {BRAND.title}
                  </span>
                </span>
              </Link>
              <button
                ref={closeRef}
                type="button"
                onClick={closeMenu}
                aria-label="Close navigation"
                className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/10 active:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <X className="h-6 w-6" strokeWidth={1.75} />
              </button>
            </div>

            {/* Curved white edge with a thin gold line */}
            <svg
              className="absolute bottom-0 left-0 block h-6 w-full"
              viewBox="0 0 420 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="menuHeaderGold" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0" stopColor="#c9a04b" stopOpacity="0" />
                  <stop offset="0.55" stopColor="#c9a04b" stopOpacity="0.85" />
                  <stop offset="1" stopColor="#c9a04b" />
                </linearGradient>
              </defs>
              <path d="M0 23 C130 23 290 17 420 2 V24 H0 Z" fill="#ffffff" />
              <path
                d="M0 23 C130 23 290 17 420 2"
                fill="none"
                stroke="url(#menuHeaderGold)"
                strokeWidth="1.5"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {/* Navigation — scrolls on short screens while contact actions stay pinned below */}
          <nav
            aria-label="Mobile"
            className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-2 pt-1 touch-pan-y"
          >
            <ul className="flex flex-col">
              {NAV_LINKS.map(({ label, href }, index) => {
                const active = isActive(href);
                const Icon = NAV_ICONS[label] ?? FileText;
                return (
                  <li
                    key={`${href}-${index}`}
                    className={`relative after:absolute after:bottom-0 after:left-14 after:right-3 after:h-px after:bg-slate-200/80 last:after:hidden ${
                      active ? "after:hidden" : ""
                    }`}
                  >
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      onClick={(e) => {
                        // Release the scroll lock first so same-page hash scrolling works.
                        setScrollLock(false);
                        handleNavClick(e, href);
                        setMobileOpen(false);
                      }}
                      className={`group relative flex min-h-[54px] items-center gap-4 overflow-hidden rounded-xl py-3 pl-4 pr-3 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold ${
                        active
                          ? "bg-gold/[0.12] text-[#8a6a1f]"
                          : "text-navy hover:bg-gold/[0.06] active:bg-gold/[0.12]"
                      }`}
                    >
                      {active && (
                        <span
                          className="absolute inset-y-0 left-0 w-[3px] bg-gold"
                          aria-hidden="true"
                        />
                      )}
                      <Icon
                        className={`h-[22px] w-[22px] flex-shrink-0 ${active ? "text-gold" : "text-navy"}`}
                        strokeWidth={1.6}
                        aria-hidden="true"
                      />
                      <span className={`flex-1 text-[17px] tracking-tight ${active ? "font-semibold" : "font-medium"}`}>
                        {label}
                      </span>
                      <ChevronRight
                        className={`h-[18px] w-[18px] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 ${
                          active ? "text-gold" : "text-navy/60"
                        }`}
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Contact actions pinned to the bottom of the panel */}
          <div className="mt-auto flex-shrink-0 px-4 pb-4 pt-3">
            <a
              href={BRAND.phoneHref}
              onClick={() => setMobileOpen(false)}
              className="group mb-3 flex min-h-[68px] items-center gap-3.5 rounded-xl border border-[#e8dfc9] bg-[#fbf9f4] px-3.5 py-2.5 transition-colors hover:border-gold/60 active:bg-[#f5efe0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gold text-white">
                <Phone className="h-5 w-5" strokeWidth={1.8} aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Call us
                </span>
                <span className="mt-0.5 block text-[18px] font-bold leading-tight tracking-tight text-navy">
                  {BRAND.phone}
                </span>
              </span>
              <ChevronRight className="h-[18px] w-[18px] flex-shrink-0 text-gold" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-xl bg-gold px-4 text-base font-semibold text-white shadow-[0_6px_16px_rgba(201,160,75,0.32)] transition-[background-color,transform,box-shadow] duration-200 hover:bg-[#b98f3d] active:translate-y-px active:shadow-[0_3px_8px_rgba(201,160,75,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
              style={{ backgroundImage: "linear-gradient(180deg, #d3ac5a 0%, #bf943f 100%)" }}
            >
              <Phone className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
              Get a Callback
              <ArrowRight className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden="true" />
            </Link>
          </div>

          {/* Decorative footer: tagline + navy base with a thin gold curve.
              Hidden on short screens so it never competes with the actions. */}
          <div className="flex-shrink-0 [@media(max-height:660px)]:hidden" aria-hidden="true">
            <div className="flex items-center justify-center gap-3 px-6 pb-1 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-400">
              <span className="h-px w-10 bg-slate-200" />
              Your Dream &middot; Our Priority
              <span className="h-px w-10 bg-slate-200" />
            </div>
            <svg className="block h-8 w-full" viewBox="0 0 420 32" preserveAspectRatio="none">
              <path d="M0 2 Q210 40 420 2 V32 H0 Z" fill="#1a2744" />
              <path
                d="M0 2 Q210 40 420 2"
                fill="none"
                stroke="#c9a04b"
                strokeWidth="1.25"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
}
