"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Download, Eye, ChevronDown, Briefcase } from "lucide-react";
import { Github, Linkedin } from "lucide-react";

const GalaxyScene = dynamic(
  () => import("@/components/three/GalaxyScene").then((m) => m.GalaxyScene),
  { ssr: false }
);

const TYPING_SEQUENCE = [
  "Associate Software Engineer",
  2000,
  "Full Stack Developer",
  1800,
  "Next.js Developer",
  1800,
  "React Developer",
  1800,
  "Backend Developer",
  1800,
  "Node.js Developer",
  1800,
];

export function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* 3D Galaxy Background */}
      <div className="absolute inset-0 z-0">
        <GalaxyScene />
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% 50%, transparent 30%, rgba(2,2,9,0.6) 70%, rgba(2,2,9,0.95) 100%)",
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 z-[2]"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-primary))",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase"
            style={{
              background: "rgba(34, 197, 94, 0.1)",
              border: "1px solid rgba(34, 197, 94, 0.3)",
              color: "#4ade80",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            <span
              className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
              style={{ boxShadow: "0 0 8px #4ade80" }}
            />
            Available for Work
          </div>
        </motion.div>

        {/* Main Name */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="section-title mb-4"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 1 }}
        >
          Hi, I&apos;m{" "}
          <span className="gradient-text glow-text">Laiba Rashid</span>
        </motion.h1>

        {/* Typing Animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-4"
        >
          <div
            className="text-xl md:text-2xl font-semibold"
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            <TypeAnimation
              sequence={TYPING_SEQUENCE}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="gradient-text-blue"
            />
            <span
              className="ml-1 animate-pulse"
              style={{ color: "#7c3aed" }}
            >
              |
            </span>
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-base md:text-lg mb-10 max-w-2xl mx-auto"
          style={{ color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}
        >
          Building scalable full-stack applications with TypeScript, Next.js,
          Node.js, PostgreSQL & MongoDB. Passionate about clean code and
          stunning user experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <Download size={18} />
            Download Resume
          </a>
          <button
            onClick={scrollToProjects}
            className="btn-secondary flex items-center gap-2"
          >
            <Eye size={18} />
            View Projects
          </button>
          <button
            onClick={scrollToContact}
            className="btn-ghost flex items-center gap-2"
          >
            <Briefcase size={18} />
            Hire Me
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex justify-center gap-4 mb-16"
        >
          {[
            {
              href: "https://github.com/laiba",
              icon: Github,
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/laiba",
              icon: Linkedin,
              label: "LinkedIn",
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              aria-label={label}
            >
              <Icon
                size={18}
                className="transition-colors"
                style={{ color: "rgba(255,255,255,0.4)" }}
              />
            </a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="flex justify-center gap-8 md:gap-16"
        >
          {[
            { value: "4+", label: "Projects" },
            { value: "1+", label: "Year Exp." },
            { value: "15+", label: "Technologies" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl md:text-3xl font-black gradient-text"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {value}
              </div>
              <div
                className="text-xs mt-1 tracking-wider uppercase"
                style={{
                  color: "rgba(255,255,255,0.35)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{
            color: "rgba(255,255,255,0.25)",
            fontFamily: "JetBrains Mono, monospace",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown
            size={20}
            style={{ color: "rgba(124, 58, 237, 0.7)" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
