"use client";

import { motion } from "motion/react";
import { MessageCircle } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function FloatingWhatsApp() {
  return (
    <motion.a
      href={BRAND.whatsappHref}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-full text-white font-semibold text-sm shadow-lg"
      style={{
        background: "#25D366",
        padding: "12px 20px 12px 16px",
        boxShadow: "0 4px 20px rgba(37,211,102,0.35)",
      }}
    >
      <MessageCircle className="w-5 h-5" />
      <span className="hidden sm:block">WhatsApp</span>
    </motion.a>
  );
}
