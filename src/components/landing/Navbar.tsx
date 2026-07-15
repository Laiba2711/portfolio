"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 group"
        >
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-lg gradient-purple-blue opacity-80 group-hover:opacity-100 transition-opacity" />
            <div
              className="absolute inset-[1.5px] rounded-[6px] flex items-center justify-center text-xs font-bold"
              style={{ background: "var(--bg-primary)" }}
            >
              LR
            </div>
          </div>
          <span className="font-semibold text-sm tracking-wide" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Laiba<span className="gradient-text">.</span>
          </span>
        </motion.a>

        {/* Desktop Links */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hidden md:flex items-center gap-1"
        >
          {navLinks.map((link, i) => (
            <motion.button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
              className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:text-white"
              style={{ color: "rgba(255,255,255,0.6)", fontFamily: "Inter, sans-serif" }}
              whileHover={{ background: "rgba(255,255,255,0.05)" }}
            >
              {link.label}
            </motion.button>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:flex items-center gap-3"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            className="btn-secondary text-sm py-2 px-5"
          >
            Resume
          </a>
          <button
            onClick={() => scrollTo("#contact")}
            className="btn-primary text-sm py-2 px-5"
          >
            Hire Me
          </button>
        </motion.div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <motion.span
            animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={{ opacity: mobileOpen ? 0 : 1 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
          <motion.span
            animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            className="block w-6 h-0.5 bg-white rounded-full"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass-dark mt-2 mx-4 rounded-2xl"
          >
            <div className="p-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-left px-4 py-3 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                >
                  {link.label}
                </button>
              ))}
              <div className="mt-3 pt-3 border-t border-white/5 flex gap-2">
                <a href="/resume.pdf" target="_blank" className="btn-secondary text-sm py-2 flex-1 text-center">
                  Resume
                </a>
                <button onClick={() => scrollTo("#contact")} className="btn-primary text-sm py-2 flex-1">
                  Hire Me
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
