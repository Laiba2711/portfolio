"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Layers } from "lucide-react";

const PROJECTS = [
  {
    id: "trust-launch",
    slug: "trust-launch",
    title: "Trust Launch",
    tagline: "AI SaaS Compliance Platform",
    description:
      "A powerful AI-powered SaaS platform for business compliance, automating regulatory checks and streamlining the compliance workflow with OpenAI integration.",
    liveUrl: "https://trustlaunchai.com",
    githubUrl: null,
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker", "OpenAI"],
    gradient: "from-purple-600 to-blue-600",
    color: "#7c3aed",
    featured: true,
    category: "SaaS",
    emoji: "🤖",
  },
  {
    id: "satoshibin",
    slug: "satoshibin",
    title: "Satoshibin",
    tagline: "Crypto Payment Platform",
    description:
      "A full-featured crypto payment platform with Bitcart integration, enabling merchants to accept Bitcoin and other cryptocurrencies seamlessly.",
    liveUrl: "https://satoshibin.com",
    githubUrl: null,
    tech: ["React", "Node.js", "Prisma", "PostgreSQL", "Bitcart", "Docker"],
    gradient: "from-orange-500 to-yellow-500",
    color: "#f59e0b",
    featured: true,
    category: "Fintech",
    emoji: "₿",
  },
  {
    id: "unity-eats",
    slug: "unity-eats",
    title: "UnityEats",
    tagline: "Real-Time Food Delivery Platform",
    description:
      "A feature-rich food delivery platform with real-time order tracking using Socket.IO, Stripe payments, and a multi-vendor restaurant system.",
    liveUrl: null,
    githubUrl: null,
    tech: ["Next.js", "Node.js", "Socket.IO", "Stripe", "PostgreSQL", "Prisma"],
    gradient: "from-green-500 to-teal-600",
    color: "#10b981",
    featured: false,
    category: "E-Commerce",
    emoji: "🍔",
  },
  {
    id: "space-portal",
    slug: "space-portal",
    title: "Interactive 3D Space Portal",
    tagline: "Immersive Three.js Experience",
    description:
      "A cinematic 3D space exploration website built with React Three Fiber, featuring particle systems, GSAP animations, and a stunning galaxy scene.",
    liveUrl: "https://space-landing-h61i.vercel.app/",
    githubUrl: null,
    tech: ["React", "Three.js", "React Three Fiber", "GSAP", "Framer Motion"],
    gradient: "from-blue-600 to-cyan-500",
    color: "#22d3ee",
    featured: false,
    category: "3D / Creative",
    emoji: "🚀",
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -6 }}
      className="glass-card overflow-hidden group relative"
    >
      {/* Gradient top bar */}
      <div
        className={`h-1 bg-gradient-to-r ${project.gradient}`}
        style={{ boxShadow: `0 0 20px ${project.color}60` }}
      />

      {/* Preview area */}
      <div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(ellipse at center, ${project.color}15 0%, rgba(2,2,9,0.8) 70%)`,
        }}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-20" />

        {/* Emoji / Icon */}
        <motion.div
          className="text-6xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {project.emoji}
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-4 left-4">
          <span
            className="text-xs px-3 py-1 rounded-full font-mono"
            style={{
              background: `${project.color}20`,
              border: `1px solid ${project.color}40`,
              color: project.color,
            }}
          >
            {project.category}
          </span>
        </div>

        {/* Featured badge */}
        {project.featured && (
          <div className="absolute top-4 right-4">
            <span
              className="text-xs px-2 py-1 rounded-full"
              style={{
                background: "rgba(250,204,21,0.15)",
                border: "1px solid rgba(250,204,21,0.3)",
                color: "#facc15",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              ⭐ Featured
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3"
          style={{ background: "rgba(2,2,9,0.7)", backdropFilter: "blur(4px)" }}
        >
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background: `${project.color}30`,
                border: `1px solid ${project.color}50`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all"
              style={{
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.15)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Github size={14} />
              Code
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3
          className="text-xl font-bold mb-1 group-hover:text-white transition-colors"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {project.title}
        </h3>
        <p className="text-sm mb-3 font-medium" style={{ color: project.color }}>
          {project.tagline}
        </p>
        <p
          className="text-sm mb-5 leading-relaxed"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">
              {t}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/5">
          <div className="flex gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs flex items-center gap-1 transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <ExternalLink size={12} />
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs flex items-center gap-1 transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <Github size={12} />
                Source
              </a>
            )}
          </div>

          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1 text-xs font-semibold transition-all"
            style={{ color: project.color }}
          >
            Case Study
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="section-padding relative">
      {/* Background */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(124,58,237,0.5), transparent)",
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
              <Layers size={12} />
              Portfolio
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-base"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Real-world applications built with modern tech stacks, shipped to production.
          </motion.p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.4)" }}>
            More projects available on GitHub
          </p>
          <a
            href="https://github.com/laiba"
            target="_blank"
            rel="noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <Github size={16} />
            View GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
