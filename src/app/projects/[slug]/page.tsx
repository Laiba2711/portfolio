"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowLeft, CheckCircle2, ChevronRight, Layers, Layout, Target, Zap, Rocket } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";

// Mock data based on the plan
const PROJECTS = [
  {
    id: "trust-launch",
    slug: "trust-launch",
    title: "Trust Launch",
    tagline: "AI SaaS Compliance Platform",
    category: "SaaS",
    description: "A powerful AI-powered SaaS platform for business compliance, automating regulatory checks and streamlining the compliance workflow with OpenAI integration.",
    problem: "Navigating complex business compliance regulations is traditionally time-consuming, expensive, and prone to human error. Small to medium businesses struggle to keep up with changing requirements.",
    solution: "Trust Launch leverages AI to analyze business profiles against current regulations, automatically identifying compliance gaps and generating actionable step-by-step resolution plans.",
    architecture: "Built on a modern serverless architecture using Next.js App Router. The backend utilizes Prisma with PostgreSQL for robust data relations, while OpenAI's API powers the core compliance analysis engine. Authentication is handled via NextAuth with role-based access control.",
    challenges: "The main challenge was ensuring the AI's analysis remained accurate and didn't hallucinate regulatory requirements. We solved this by implementing a strict prompt engineering pipeline with multi-step verification and human-in-the-loop overrides.",
    liveUrl: "https://trustlaunchai.com",
    githubUrl: null,
    tech: ["Next.js", "Node.js", "PostgreSQL", "Docker", "OpenAI"],
    features: [
      "AI-driven compliance analysis",
      "Automated regulatory checks",
      "Step-by-step resolution plans",
      "Role-based access control",
      "Real-time progress tracking",
      "Exportable compliance reports"
    ],
    timeline: "3 Months",
    role: "Full Stack Developer",
    gradient: "from-purple-600 to-blue-600",
    color: "#7c3aed",
    emoji: "🤖",
  },
  {
    id: "satoshibin",
    slug: "satoshibin",
    title: "Satoshibin",
    tagline: "Crypto Payment Platform",
    category: "Fintech",
    description: "A full-featured crypto payment platform with Bitcart integration, enabling merchants to accept Bitcoin and other cryptocurrencies seamlessly.",
    problem: "Merchants want to accept cryptocurrencies but find existing solutions either too complex to integrate, charge high fees, or hold custody of their funds.",
    solution: "Satoshibin provides a seamless, non-custodial payment gateway integrating directly with Bitcart. It offers simple API endpoints for merchants while keeping transaction fees minimal.",
    architecture: "The frontend is a React SPA communicating with a Node.js Express backend. We use Prisma as the ORM with PostgreSQL. The core payment processing is handled by a self-hosted Bitcart instance running in Docker.",
    challenges: "Handling asynchronous payment confirmations securely without webhooks getting lost. Implemented a robust polling fallback mechanism and idempotent webhook processors.",
    liveUrl: "https://satoshibin.com",
    githubUrl: null,
    tech: ["React", "Node.js", "Prisma", "PostgreSQL", "Bitcart", "Docker"],
    features: [
      "Non-custodial payments",
      "Multi-currency support",
      "Merchant API",
      "Webhook notifications",
      "Transaction history dashboard",
      "Custom checkout pages"
    ],
    timeline: "4 Months",
    role: "Backend Engineer",
    gradient: "from-orange-500 to-yellow-500",
    color: "#f59e0b",
    emoji: "₿",
  },
  {
    id: "unity-eats",
    slug: "unity-eats",
    title: "UnityEats",
    tagline: "Real-Time Food Delivery Platform",
    category: "E-Commerce",
    description: "A feature-rich food delivery platform with real-time order tracking using Socket.IO, Stripe payments, and a multi-vendor restaurant system.",
    problem: "Local restaurants needed an affordable, branded platform for deliveries without paying the 30% commissions demanded by major aggregators.",
    solution: "A white-label, multi-tenant delivery platform providing real-time tracking, secure payments, and a comprehensive restaurant management dashboard.",
    architecture: "Next.js frontend with SSR for SEO. Node.js backend handling complex order routing. Socket.IO manages real-time location updates between drivers and customers. Stripe Connect handles split payments.",
    challenges: "Managing real-time state across three distinct user apps (Customer, Driver, Restaurant). Implemented a centralized Redis pub/sub architecture to ensure event consistency.",
    liveUrl: null,
    githubUrl: null,
    tech: ["Next.js", "Node.js", "Socket.IO", "Stripe", "PostgreSQL", "Prisma"],
    features: [
      "Real-time GPS tracking",
      "Multi-vendor support",
      "Stripe Connect split payments",
      "Driver app interface",
      "Restaurant order management",
      "Review and rating system"
    ],
    timeline: "6 Months",
    role: "Full Stack Developer",
    gradient: "from-green-500 to-teal-600",
    color: "#10b981",
    emoji: "🍔",
  },
  {
    id: "space-portal",
    slug: "space-portal",
    title: "Interactive 3D Space Portal",
    tagline: "Immersive Three.js Experience",
    category: "3D / Creative",
    description: "A cinematic 3D space exploration website built with React Three Fiber, featuring particle systems, GSAP animations, and a stunning galaxy scene.",
    problem: "Standard web interfaces often fail to capture the scale and wonder of space exploration, leading to low user engagement on educational astronomy sites.",
    solution: "An immersive, WebGL-powered 3D experience that allows users to seamlessly navigate through a procedurally generated galaxy using fluid scroll mechanics.",
    architecture: "Built entirely on the client side using React, Three.js, and React Three Fiber. GSAP ScrollTrigger manages the complex timeline animations tied to user scrolling.",
    challenges: "Performance optimization. Rendering 10,000+ particles while maintaining 60fps on mobile devices required custom shader materials and aggressive frustum culling.",
    liveUrl: "https://space-landing-h61i.vercel.app/",
    githubUrl: null,
    tech: ["React", "Three.js", "React Three Fiber", "GSAP", "Framer Motion"],
    features: [
      "Custom WebGL shaders",
      "Procedural galaxy generation",
      "Scroll-linked 3D animations",
      "Optimized for mobile",
      "Interactive planetary models",
      "Cinematic camera transitions"
    ],
    timeline: "2 Months",
    role: "Creative Developer",
    gradient: "from-blue-600 to-cyan-500",
    color: "#22d3ee",
    emoji: "🚀",
  }
];

export default function ProjectPage() {
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const project = PROJECTS.find((p) => p.slug === params.slug);

  if (!mounted) return null;

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/" className="btn-primary">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen pb-20">
      <Navbar />
      
      {/* Background */}
      <div className="fixed inset-0 z-[-1] bg-primary">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}40 0%, transparent 70%)` }}
        />
        <div className="absolute inset-0 grid-pattern opacity-10" />
      </div>

      {/* Hero Header */}
      <section className="pt-32 pb-16 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <Link 
            href="/#projects" 
            className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:text-white"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            <ArrowLeft size={16} />
            Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-5xl">{project.emoji}</span>
              <span 
                className="text-xs px-3 py-1 rounded-full font-mono uppercase tracking-wider"
                style={{ 
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}40`,
                  color: project.color
                }}
              >
                {project.category}
              </span>
            </div>
            
            <h1 
              className="text-4xl md:text-6xl font-bold mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              {project.title}
            </h1>
            
            <p 
              className="text-xl md:text-2xl mb-8"
              style={{ color: project.color, fontFamily: "Space Grotesk, sans-serif" }}
            >
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              {project.liveUrl && (
                <a 
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a 
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-secondary"
                >
                  <Github size={18} />
                  View Source
                </a>
              )}
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 glass-card gradient-border">
              {[
                { label: "Role", value: project.role },
                { label: "Timeline", value: project.timeline },
                { label: "Client", value: "Internal" },
                { label: "Status", value: "Completed" }
              ].map((stat, i) => (
                <div key={i}>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {stat.label}
                  </div>
                  <div className="font-semibold text-white">
                    {stat.value}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Content */}
      <section className="px-6">
        <div className="max-w-4xl mx-auto flex flex-col gap-12">
          
          {/* Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass p-8 md:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Layout size={24} style={{ color: project.color }} />
              <h2 className="text-2xl font-bold" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Overview</h2>
            </div>
            <p className="text-lg leading-relaxed text-gray-300">
              {project.description}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Problem */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 border-l-4"
              style={{ borderLeftColor: "#ef4444" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Target size={20} className="text-red-400" />
                <h3 className="text-xl font-bold">The Problem</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {project.problem}
              </p>
            </motion.div>

            {/* Solution */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 border-l-4"
              style={{ borderLeftColor: "#22c55e" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <Zap size={20} className="text-green-400" />
                <h3 className="text-xl font-bold">The Solution</h3>
              </div>
              <p className="text-gray-400 leading-relaxed">
                {project.solution}
              </p>
            </motion.div>
          </div>

          {/* Features & Tech Stack */}
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="md:col-span-2 glass p-8"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Rocket size={20} style={{ color: project.color }} />
                Key Features
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="glass p-8 bg-black/40"
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Layers size={20} style={{ color: project.color }} />
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span key={t} className="tech-badge w-full justify-between">
                    {t}
                    <ChevronRight size={14} />
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Architecture & Challenges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="glass p-8 md:p-12"
          >
            <h3 className="text-2xl font-bold mb-6" style={{ fontFamily: "Space Grotesk, sans-serif" }}>Architecture & Challenges</h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-white">Architecture Overview</h4>
                <p className="text-gray-400 leading-relaxed">
                  {project.architecture}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3 text-white">Technical Challenges</h4>
                <p className="text-gray-400 leading-relaxed">
                  {project.challenges}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </section>
      
      {/* Small footer */}
      <div className="mt-20">
        <Footer />
      </div>
    </main>
  );
}
