"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface DropdownOption {
  value: string;
  label: string;
}

interface PremiumDropdownProps {
  /** All selectable options, in display order. Plain strings are used
   *  as both the stored value and the displayed label; pass
   *  `{ value, label }` objects when the stored value and displayed
   *  text need to differ (e.g. BHK stores "2" but displays "2 BHK"). */
  options: readonly string[] | readonly DropdownOption[];
  /** Currently selected value, or "" for a placeholder/unselected state. */
  value: string;
  onChange: (value: string) => void;
  /** Shown in the trigger when value is "". */
  placeholder: string;
  /** Optional leading icon in the trigger (e.g. MapPin for a locality field). */
  icon?: LucideIcon;
  "aria-label": string;
  /** Trigger button classes for background/border, so this component can
   *  match whichever field style it's dropped into (e.g. the homepage
   *  search form's gray-50 fields vs. the Projects filter bar's
   *  offwhite fields) without every call site looking mismatched.
   *  Defaults to the homepage search form's existing style. */
  triggerClassName?: string;
  /** Trigger button padding, so this component can match the field
   *  height already used at a given call site. Defaults to the
   *  homepage search form's existing field padding. */
  triggerPaddingClassName?: string;
}

function normalizeOptions(
  options: readonly string[] | readonly DropdownOption[]
): DropdownOption[] {
  return options.map((opt) =>
    typeof opt === "string" ? { value: opt, label: opt } : opt
  );
}

/**
 * The same premium dropdown styling/behavior used for the Projects
 * listing page's "Sort" control (white background, rounded corners,
 * subtle border, soft shadow, gold checkmark on the selected option,
 * subtle hover, click-outside to close, full keyboard support)
 * generalized here so it can be reused anywhere a native <select>
 * would otherwise be used — e.g. the homepage locality search field.
 */
export default function PremiumDropdown({
  options,
  value,
  onChange,
  placeholder,
  icon: Icon,
  "aria-label": ariaLabel,
  triggerClassName = "border-gray-100 bg-gray-50",
  triggerPaddingClassName = "pl-3.5 pr-3 py-3.5",
}: PremiumDropdownProps) {
  const normalized = normalizeOptions(options);
  const selectedIndex = normalized.findIndex((opt) => opt.value === value);
  const selectedLabel = normalized[selectedIndex]?.label ?? "";

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, selectedIndex));
  const [placement, setPlacement] = useState<"below" | "above">("below");
  const [menuMaxHeight, setMenuMaxHeight] = useState(256); // matches the old fixed max-h-64
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const MARGIN = 8; // breathing room from the viewport edge
  const PREFERRED_HEIGHT = 256; // the dropdown's normal max-h-64

  // Pure calculation, no state writes — safe to call synchronously from
  // the click handler (before the menu is even rendered) AND from the
  // layout effect below (for resize/scroll while it's already open).
  function calculatePlacement(): { placement: "below" | "above"; maxHeight: number } {
    const trigger = triggerRef.current;
    if (!trigger) return { placement: "below", maxHeight: PREFERRED_HEIGHT };
    const rect = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom - MARGIN;
    const spaceAbove = rect.top - MARGIN;

    if (spaceBelow >= PREFERRED_HEIGHT || spaceBelow >= spaceAbove) {
      return { placement: "below", maxHeight: Math.max(120, Math.min(PREFERRED_HEIGHT, spaceBelow)) };
    }
    return { placement: "above", maxHeight: Math.max(120, Math.min(PREFERRED_HEIGHT, spaceAbove)) };
  }

  // Keeps the menu correctly positioned if the viewport changes (resize,
  // scroll) WHILE it's already open. This never runs before the first
  // paint of an already-open menu — that initial placement is decided
  // synchronously in openMenu() below, before `open` is ever set to
  // true, specifically so the menu never paints in the wrong spot and
  // then jumps. useLayoutEffect (not useEffect) is used here too so
  // that even a resize-triggered reposition is applied before the
  // browser paints the next frame, avoiding any visible flicker.
  useLayoutEffect(() => {
    if (!open) return;

    function recalculate() {
      const result = calculatePlacement();
      setPlacement(result.placement);
      setMenuMaxHeight(result.maxHeight);
    }

    window.addEventListener("resize", recalculate);
    window.addEventListener("scroll", recalculate, { capture: true, passive: true });
    return () => {
      window.removeEventListener("resize", recalculate);
      window.removeEventListener("scroll", recalculate, true);
    };
  }, [open]);

  // Click-outside to close.
  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: PointerEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [open]);

  // Focus the active option whenever the menu opens or the active index changes.
  useEffect(() => {
    if (open) optionRefs.current[activeIndex]?.focus();
  }, [open, activeIndex]);

  function openMenu() {
    // Calculate placement synchronously, in the same click handler that
    // opens the menu — before `open` is set to true and before React
    // ever renders the menu — so the very first painted frame already
    // has the correct position. No default/fallback frame, no
    // effect-driven correction after the fact, no visible jump.
    const result = calculatePlacement();
    setPlacement(result.placement);
    setMenuMaxHeight(result.maxHeight);
    setActiveIndex(Math.max(0, selectedIndex));
    setOpen(true);
  }

  function selectOption(optionValue: string) {
    onChange(optionValue);
    setOpen(false);
    containerRef.current?.querySelector("button")?.focus();
  }

  function handleTriggerKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  }

  function handleOptionKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((index + 1) % normalized.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((index - 1 + normalized.length) % normalized.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectOption(normalized[index].value);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      containerRef.current?.querySelector("button")?.focus();
    } else if (e.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <button
        suppressHydrationWarning
        type="button"
        ref={triggerRef}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        className={`flex items-center gap-2 w-full rounded-lg border text-sm text-left transition-colors hover:border-gold/40 focus:outline-none focus:ring-2 focus:ring-amber-300 ${triggerPaddingClassName} ${triggerClassName}`}
      >
        {Icon && <Icon className="w-4 h-4 text-gray-400 flex-shrink-0" />}
        <span className={`flex-1 truncate ${value ? "text-gray-600" : "text-gray-400"}`}>
          {value ? selectedLabel : placeholder}
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute left-0 right-0 z-20 py-1.5 bg-white rounded-lg border border-black/[0.06] shadow-[0_12px_32px_rgba(0,0,0,0.12)] overflow-hidden overflow-y-auto ${
            placement === "below" ? "top-full mt-2" : "bottom-full mb-2"
          }`}
          style={{ maxHeight: menuMaxHeight }}
        >
          {normalized.map((option, index) => {
            const selected = option.value === value;
            return (
              <li key={`${option.value || "__placeholder__"}-${index}`} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={selected}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  tabIndex={index === activeIndex ? 0 : -1}
                  onClick={() => selectOption(option.value)}
                  onKeyDown={(e) => handleOptionKeyDown(e, index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm text-left transition-colors focus:outline-none ${
                    selected
                      ? "bg-gold/[0.12] text-navy font-semibold"
                      : "text-gray-600 hover:bg-offwhite hover:text-navy"
                  }`}
                >
                  {option.label || placeholder}
                  {selected && <Check className="w-3.5 h-3.5 text-gold flex-shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
