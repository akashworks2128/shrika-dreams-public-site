"use client";

import { motion, type Transition } from "motion/react";
import type { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

const transition: Transition = {
  duration: 0.78,
  ease: [0.22, 1, 0.36, 1],
};

/**
 * Reusable premium entrance: soft fade, short upward movement and
 * barely-visible scale. Used for section content and card reveals.
 */
export default function FadeIn({
  children,
  delay = 0,
  y = 22,
  className,
}: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-55px" }}
      transition={{ ...transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
