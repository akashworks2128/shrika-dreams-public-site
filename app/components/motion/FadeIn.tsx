"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const transition: Transition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Reusable premium entrance: soft fade with a short upward movement.
 * Used for section content and card reveals (it is mounted ~150 times across
 * the site, so it only animates compositor-friendly properties: opacity and
 * translateY — the previous per-card scale forced extra text re-rasterisation
 * on mobile). Honors `prefers-reduced-motion` by rendering the final state
 * immediately.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 22,
  className,
}: FadeInProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      // Only shrink the bottom edge so content is never held hidden by a top
      // margin (e.g. when landing on an anchor beneath the fixed header).
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
