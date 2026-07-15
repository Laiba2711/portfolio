"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Heart } from "lucide-react";

const LINKS = [
  { icon: Github, href: "https://github.com/laiba", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/in/laiba", label: "LinkedIn" },
  { icon: Mail, href: "mailto:laiba@example.com", label: "Email" },
];

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-16 pb-10 overflow-hidden">
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.4), rgba(37,99,235,0.4), transparent)",
        }}
      />

      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(124,58,237,0.02) 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center gap-8">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <div className="relative w-9 h-9">
                <div className="absolute inset-0 rounded-lg gradient-purple-blue opacity-80" />
                <div
                  className="absolute inset-[1.5px] rounded-[6px] flex items-center justify-center text-xs font-bold"
                  style={{ background: "var(--bg-primary)" }}
                >
                  LR
                </div>
              </div>
              <span className="font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Laiba<span className="gradient-text">Rashid</span>
              </span>
            </div>
            <p className="text-xs text-center max-w-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
              Building scalable full-stack web applications with modern technologies.
            </p>
          </motion.div>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-3"
          >
            {LINKS.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <Icon
                  size={16}
                  className="transition-colors duration-200 group-hover:text-white"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                />
              </a>
            ))}

            {/* Resume */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(124,58,237,0.12)",
                border: "1px solid rgba(124,58,237,0.25)",
                color: "#c084fc",
              }}
            >
              Resume ↗
            </a>
          </motion.div>

          {/* Nav links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-6"
          >
            {["About", "Experience", "Skills", "Projects", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() =>
                  document
                    .getElementById(item.toLowerCase())
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-xs transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.35)" }}
              >
                {item}
              </button>
            ))}
          </motion.div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: "rgba(255,255,255,0.05)" }}
          />

          {/* Bottom row */}
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
            <p
              className="text-xs flex items-center gap-1"
              style={{ color: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono, monospace" }}
            >
              © {new Date().getFullYear()} Laiba Rashid. Built with{" "}
              <Heart size={10} style={{ color: "#7c3aed" }} fill="#7c3aed" />{" "}
              using Next.js & Three.js
            </p>

            {/* Back to top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-xs px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
              style={{
                background: "rgba(124,58,237,0.1)",
                border: "1px solid rgba(124,58,237,0.2)",
                color: "#c084fc",
              }}
            >
              Back to Top
              <ArrowUp size={12} className="transition-transform group-hover:-translate-y-1" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
