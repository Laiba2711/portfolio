"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, CheckCircle2, ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
  {
    company: "Devflovv (Coding Pulse)",
    role: "Associate Software Engineer",
    period: "October 2025 – June 2026",
    current: true,
    location: "Onsite, Lahore, Pakistan",
    description:
      "Developed and maintained scalable full-stack web applications for diverse clients. Designed and implemented RESTful APIs, deployed containerized apps using Docker, and consistently optimized application performance to meet SLA targets.",
    achievements: [
      "Developed scalable full-stack applications using Next.js, Node.js, and PostgreSQL",
      "Designed and implemented RESTful APIs with authentication and authorization",
      "Containerized applications with Docker for reliable deployments",
      "Optimized application performance — reduced load times by 40%",
      "Delivered client-based development projects on time",
      "Integrated real-time features using Socket.IO",
    ],
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker", "TypeScript", "Prisma", "Socket.IO"],
    color: "#7c3aed",
  },
];

export function ExperienceSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="experience" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="section-label">
              <Briefcase size={12} />
              Work History
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </motion.h2>
        </div>

        {/* Experience Cards */}
        <div className="max-w-4xl mx-auto">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="glass-card p-6 sm:p-8 relative overflow-hidden"
            >
              {/* Gradient accent */}
              <div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${exp.color}, transparent)`,
                }}
              />
              <div
                className="absolute -top-20 -right-20 w-60 h-60 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${exp.color}10 0%, transparent 70%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
                <div>
                  {exp.current && (
                    <span
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full mb-3"
                      style={{
                        background: "rgba(34,197,94,0.1)",
                        border: "1px solid rgba(34,197,94,0.3)",
                        color: "#4ade80",
                        fontFamily: "JetBrains Mono, monospace",
                      }}
                    >
                      <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                      Current
                    </span>
                  )}
                  <h3
                    className="text-xl font-bold mb-1"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-base font-semibold"
                      style={{ color: exp.color }}
                    >
                      {exp.company}
                    </span>
                    <ArrowUpRight size={14} style={{ color: exp.color }} />
                  </div>
                </div>
                <div
                  className="text-right flex-shrink-0"
                  style={{ color: "rgba(255,255,255,0.35)", fontFamily: "JetBrains Mono, monospace", fontSize: 12 }}
                >
                  <div className="mb-0.5">{exp.period}</div>
                  <div>{exp.location}</div>
                </div>
              </div>

              {/* Description */}
              <p
                className="text-sm mb-6"
                style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}
              >
                {exp.description}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <p
                  className="text-xs font-semibold tracking-wider uppercase mb-3"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  Key Achievements
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {exp.achievements.map((achievement, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 + j * 0.05 }}
                      className="flex items-start gap-2 text-sm"
                      style={{ color: "rgba(255,255,255,0.6)" }}
                    >
                      <CheckCircle2
                        size={14}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: exp.color }}
                      />
                      <span>{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <p
                  className="text-xs font-semibold tracking-wider uppercase mb-3"
                  style={{
                    color: "rgba(255,255,255,0.35)",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  Tech Stack
                </p>
                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
