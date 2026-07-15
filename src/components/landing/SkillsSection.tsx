"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Server, Database, Wrench, Zap } from "lucide-react";

const skillCategories = [
  {
    id: "frontend",
    label: "Frontend",
    icon: Code2,
    color: "#c084fc",
    skills: [
      { name: "React", level: 90 },
      { name: "Next.js", level: 92 },
      { name: "TypeScript", level: 88 },
      { name: "JavaScript", level: 92 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Bootstrap", level: 82 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    color: "#60a5fa",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express", level: 86 },
      { name: "REST API", level: 90 },
      { name: "Socket.IO", level: 80 },
      { name: "Authentication", level: 85 },
    ],
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    color: "#34d399",
    skills: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 84 },
      { name: "Prisma", level: 88 },
      { name: "Mongoose", level: 82 },
      { name: "MySQL", level: 78 },
    ],
  },
  {
    id: "tools",
    label: "Tools & DevOps",
    icon: Wrench,
    color: "#f59e0b",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 78 },
      { name: "Postman", level: 88 },
      { name: "Stripe", level: 80 },
      { name: "Vercel", level: 90 },
      { name: "Render", level: 80 },
    ],
  },
];

function SkillCard({
  category,
  index,
}: {
  category: (typeof skillCategories)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const Icon = category.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -8, rotateY: 3 }}
      className="glass-card p-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Card header */}
      <div className="flex items-center gap-3 mb-6">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            background: `${category.color}18`,
            border: `1px solid ${category.color}30`,
          }}
        >
          <Icon size={20} style={{ color: category.color }} />
        </div>
        <div>
          <h3 className="font-semibold text-white text-sm">{category.label}</h3>
          <p
            className="text-xs"
            style={{
              color: "rgba(255,255,255,0.35)",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {category.skills.length} skills
          </p>
        </div>
        {/* Glow accent */}
        <div
          className="ml-auto w-2 h-2 rounded-full animate-pulse"
          style={{
            background: category.color,
            boxShadow: `0 0 8px ${category.color}`,
          }}
        />
      </div>

      {/* Skills list */}
      <div className="flex flex-col gap-4">
        {category.skills.map((skill, i) => (
          <div key={skill.name}>
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.8)" }}>
                {skill.name}
              </span>
              <motion.span
                className="text-xs font-mono"
                style={{ color: category.color }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: index * 0.1 + i * 0.05 + 0.4 }}
              >
                {skill.level}%
              </motion.span>
            </div>
            <div className="skill-bar">
              <motion.div
                className="skill-bar-fill"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: skill.level / 100 } : {}}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1 + i * 0.1 + 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  background: `linear-gradient(90deg, ${category.color}80, ${category.color})`,
                  transformOrigin: "left",
                  width: "100%",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export function SkillsSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(headerRef, { once: true });

  return (
    <section id="skills" className="section-padding relative">
      {/* Background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">
              <Zap size={12} />
              Tech Stack
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="section-title"
          >
            Skills &{" "}
            <span className="gradient-text">Technologies</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-xl mx-auto text-base"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            A curated set of tools and technologies I use to build production-ready
            full-stack applications.
          </motion.p>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {skillCategories.map((category, i) => (
            <SkillCard key={category.id} category={category} index={i} />
          ))}
        </div>

        {/* Tech pills row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap justify-center gap-3"
        >
          {[
            "Bitcart", "OpenAI", "Stripe", "Cloudinary", "UploadThing",
            "Resend", "Vercel", "Docker", "Prisma", "Socket.IO", "GSAP", "Three.js"
          ].map((tech) => (
            <span key={tech} className="tech-badge">
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
