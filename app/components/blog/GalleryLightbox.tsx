"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryItem = { src: string; alt: string; caption?: string };

const CLOSE_MS = 200;
const SWIPE_PX = 50;

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Blog gallery grid (same markup/appearance as before) whose images open in a
 * full-screen viewer. Only used for gallery blocks; single images are untouched.
 */
export default function GalleryLightbox({ items, gridClassName }: { items: GalleryItem[]; gridClassName: string }) {
  const [index, setIndex] = useState<number | null>(null); // null = closed
  const [visible, setVisible] = useState(false); // drives the fade transition
  const [mounted, setMounted] = useState(false);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lastIndex = useRef(0);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const isOpen = index !== null;
  const count = items.length;

  const open = (i: number) => {
    clearTimeout(closeTimer.current);
    lastIndex.current = i;
    setIndex(i);
    // Two frames so the initial (transparent) state is painted before fading in.
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  };

  const close = useCallback(() => {
    setVisible(false);
    clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(
      () => {
        setIndex(null);
        // Return focus to the thumbnail that was opened (it may have changed via navigation).
        triggerRefs.current[lastIndex.current]?.focus({ preventScroll: true });
      },
      prefersReducedMotion() ? 0 : CLOSE_MS,
    );
  }, []);

  const go = useCallback(
    (delta: number) => {
      setIndex((current) => {
        if (current === null || count < 2) return current;
        const next = (current + delta + count) % count;
        lastIndex.current = next;
        return next;
      });
    },
    [count],
  );

  // Scroll lock: overflow:hidden keeps window.scrollY intact, so closing returns to the same spot.
  useEffect(() => {
    if (!isOpen) return;
    const html = document.documentElement;
    const body = document.body;
    const prev = { htmlOverflow: html.style.overflow, bodyOverflow: body.style.overflow, bodyPad: body.style.paddingRight };
    const scrollbar = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`; // avoid layout shift on desktop
    return () => {
      html.style.overflow = prev.htmlOverflow;
      body.style.overflow = prev.bodyOverflow;
      body.style.paddingRight = prev.bodyPad;
    };
  }, [isOpen]);

  // Keyboard: Escape, arrows, and a Tab focus trap.
  useEffect(() => {
    if (!isOpen) return;
    closeBtnRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      } else if (e.key === "Tab") {
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button:not([disabled])");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !dialogRef.current?.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close, go]);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStart.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStart.current;
    touchStart.current = null;
    if (!start) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy) * 1.5) go(dx < 0 ? 1 : -1);
  };

  const current = index !== null ? items[index] : null;

  const controlBtn =
    "flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm " +
    "transition-colors hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold " +
    "sm:h-14 sm:w-14";

  const overlay =
    mounted && current
      ? createPortal(
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Image viewer, image ${(index ?? 0) + 1} of ${count}`}
            onClick={close}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className={`fixed inset-0 z-[100] flex h-dvh w-screen touch-pan-y flex-col overflow-hidden bg-dark/95 backdrop-blur-sm transition-opacity duration-200 ease-out motion-reduce:transition-none ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-3 pt-[max(0.75rem,env(safe-area-inset-top))] sm:px-5">
              <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/90" aria-hidden="true">
                {(index ?? 0) + 1} / {count}
              </span>
              <button
                ref={closeBtnRef}
                type="button"
                aria-label="Close image viewer"
                onClick={(e) => {
                  e.stopPropagation();
                  close();
                }}
                className={controlBtn}
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Image area */}
            <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-2 sm:px-20">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src + index}
                src={current.src}
                alt={current.alt || `Gallery image ${(index ?? 0) + 1} of ${count}`}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
                className={`max-h-full max-w-full select-none object-contain transition-transform duration-200 ease-out motion-reduce:transition-none ${
                  visible ? "scale-100" : "scale-95"
                }`}
              />

              {count > 1 ? (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(-1);
                    }}
                    className={`${controlBtn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-4`}
                  >
                    <ChevronLeft className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={(e) => {
                      e.stopPropagation();
                      go(1);
                    }}
                    className={`${controlBtn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-4`}
                  >
                    <ChevronRight className="h-6 w-6" aria-hidden="true" />
                  </button>
                </>
              ) : null}
            </div>

            {/* Caption (also announces image changes to screen readers) */}
            <div
              aria-live="polite"
              className="min-h-[2.5rem] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] text-center text-sm text-white/80"
            >
              {current.caption ? <span onClick={(e) => e.stopPropagation()}>{current.caption}</span> : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <div className={gridClassName}>
        {items.map((item, i) => (
          <figure key={`g${i}`} className="min-w-0">
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              onClick={() => open(i)}
              aria-haspopup="dialog"
              aria-label={`Open image ${i + 1} of ${count} in full screen${item.alt ? `: ${item.alt}` : ""}`}
              className="block w-full cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-lg border border-black/[0.06] object-cover"
              />
            </button>
            {item.caption ? (
              <figcaption className="mt-1.5 text-center text-xs text-gray-400">{item.caption}</figcaption>
            ) : null}
          </figure>
        ))}
      </div>
      {overlay}
    </>
  );
}
