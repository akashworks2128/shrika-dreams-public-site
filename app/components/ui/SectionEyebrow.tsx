import type { ReactNode } from "react";

interface SectionEyebrowProps {
  children: ReactNode;
  /** Extra classes for spacing/alignment merged alongside the base
   *  typography classes (e.g. "mb-10 text-center"). */
  className?: string;
  /** Override the default gold color, e.g. "text-gray-400" for a label
   *  sitting on a dark background where gold isn't wanted. Kept as its
   *  own prop (rather than relying on Tailwind class-order in
   *  `className`) so the override is guaranteed to win. */
  colorClassName?: string;
  as?: "p" | "span" | "div";
}

/**
 * The small uppercase "eyebrow" label used above section headings across
 * the entire site — e.g. "ABOUT THE LOCALITY", "PROJECT OVERVIEW",
 * "FEATURED LISTINGS", "OUR PROCESS", "GET IN TOUCH".
 *
 * This is the single shared source of truth for that label's typography.
 * Previously every section hand-copied its own text-[10px]/text-[11px]
 * class string, which is why sizes drifted; changing the size here now
 * updates every section at once instead of hunting down each copy.
 *
 * Font family, gold color, uppercase, and letter-spacing are the
 * defaults; pass `className` for spacing/alignment and `colorClassName`
 * to override the color at a given call site (see
 * BuilderPartnersSection, which uses gray instead of gold to sit on its
 * dark background).
 */
export default function SectionEyebrow({
  children,
  className = "",
  colorClassName = "text-gold",
  as = "p",
}: SectionEyebrowProps) {
  const Tag = as;
  return (
    <Tag
      className={`text-base sm:text-lg lg:text-xl font-bold tracking-[0.18em] uppercase ${colorClassName} ${className}`}
    >
      {children}
    </Tag>
  );
}
