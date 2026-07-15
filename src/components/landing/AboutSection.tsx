"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { User, MapPin, Calendar } from "lucide-react";

const TIMELINE = [
  {
    year: "2025–2026",
    title: "Associate Software Engineer",
    org: "Devflovv (Coding Pulse)",
    type: "work",
    description:
      "Developed scalable full-stack applications with REST APIs, Docker deployment, performance optimization, and client-based development.",
    highlights: ["REST APIs", "Docker", "Performance Optimization", "Client Projects"],
  },
  {
    year: "2025",
    title: "Web Development Certificate",
    org: "March 2025",
    type: "cert",
    description: "Completed professional web development certification covering modern full-stack technologies.",
    highlights: ["Full Stack", "Modern Web", "Best Practices"],
  },
  {
    year: "2021–2025",
    title: "BS Information Technology",
    org: "Government College University",
    type: "edu",
    description: "Bachelor of Science in Information Technology. Studied software engineering, databases, networking, and system design.",
    highlights: ["Software Engineering", "Databases", "System Design"],
  },
];

const typeColors: Record<string, string> = {
  work: "#7c3aed",
  cert: "#22d3ee",
  edu: "#2563eb",
};

const typeLabels: Record<string, string> = {
  work: "Experience",
  cert: "Certificate",
  edu: "Education",
};

export function AboutSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute -left-40 top-1/2 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <User size={12} />
              About Me
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Crafting Digital{" "}
            <span className="gradient-text">Experiences</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — Bio Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Profile Card */}
            <div className="glass-card p-8 mb-6 gradient-border">
              {/* Avatar placeholder */}
              <div className="flex items-start gap-5 mb-6">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black flex-shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #2563eb)",
                    fontFamily: "Space Grotesk, sans-serif",
                  }}
                >
                  LR
                </div>
                <div>
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Laiba Rashid
                  </h3>
                  <p
                    className="text-sm mb-3"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    Associate Software Engineer
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="tech-badge">
                      <MapPin size={10} />
                      Pakistan
                    </span>
                    <span
                      className="tech-badge"
                      style={{ color: "#4ade80", borderColor: "rgba(74,222,128,0.3)", background: "rgba(74,222,128,0.08)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>
              </div>

              <p
                className="text-sm leading-relaxed mb-6"
                style={{ color: "rgba(255,255,255,0.6)", lineHeight: 1.8 }}
              >
                Associate Software Engineer with experience in building scalable
                full-stack web applications using TypeScript, Next.js, React.js,
                Node.js, PostgreSQL, MongoDB, and Docker. Skilled in designing
                REST APIs, real-time systems, payment integrations, and
                responsive user experiences.
              </p>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.8 }}
              >
                Passionate about solving complex problems, optimizing
                performance, and delivering production-ready solutions that make
                a real impact.
              </p>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Projects Built", value: "4+" },
                { label: "Technologies", value: "15+" },
                { label: "Months Exp.", value: "8+" },
              ].map(({ label, value }) => (
                <div key={label} className="glass-card p-4 text-center">
                  <div
                    className="text-2xl font-black gradient-text mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {value}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      color: "rgba(255,255,255,0.35)",
                      fontFamily: "JetBrains Mono, monospace",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — Timeline */}
          <div className="relative">
            {/* Timeline vertical line */}
            <div
              className="absolute left-6 top-0 bottom-0 w-px"
              style={{
                background:
                  "linear-gradient(180deg, transparent, rgba(124,58,237,0.5) 20%, rgba(37,99,235,0.5) 80%, transparent)",
              }}
            />

            <div className="flex flex-col gap-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.3 + i * 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative pl-16"
                >
                  {/* Timeline dot */}
                  <div
                    className="absolute left-4 top-1 w-4 h-4 rounded-full -translate-x-1/2 border-2"
                    style={{
                      background: typeColors[item.type],
                      borderColor: "var(--bg-primary)",
                      boxShadow: `0 0 16px ${typeColors[item.type]}80`,
                    }}
                  />

                  {/* Card */}
                  <div className="glass-card p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full font-mono mb-2 inline-block"
                          style={{
                            background: `${typeColors[item.type]}15`,
                            border: `1px solid ${typeColors[item.type]}30`,
                            color: typeColors[item.type],
                          }}
                        >
                          {typeLabels[item.type]}
                        </span>
                        <h4
                          className="font-semibold text-white"
                          style={{ fontFamily: "Space Grotesk, sans-serif" }}
                        >
                          {item.title}
                        </h4>
                        <p
                          className="text-sm mt-0.5"
                          style={{ color: "rgba(255,255,255,0.45)" }}
                        >
                          {item.org}
                        </p>
                      </div>
                      <span
                        className="text-xs whitespace-nowrap flex-shrink-0"
                        style={{
                          color: "rgba(255,255,255,0.3)",
                          fontFamily: "JetBrains Mono, monospace",
                        }}
                      >
                        <Calendar size={10} className="inline mr-1" />
                        {item.year}
                      </span>
                    </div>

                    <p
                      className="text-sm mb-3"
                      style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7 }}
                    >
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {item.highlights.map((h) => (
                        <span key={h} className="tech-badge">
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
