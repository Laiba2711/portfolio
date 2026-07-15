"use client";

import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader } from "@/components/landing/Loader";
import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { AboutSection } from "@/components/landing/AboutSection";
import { ExperienceSection } from "@/components/landing/ExperienceSection";
import { SkillsSection } from "@/components/landing/SkillsSection";
import { ProjectsSection } from "@/components/landing/ProjectsSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleLoaderComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Cinematic Loader */}
      <AnimatePresence mode="wait">
        {!loaded && <Loader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Main Site */}
      <main className="relative min-h-screen">
        {/* Animated gradient background */}
        <div className="animated-bg" />

        {/* Grid overlay */}
        <div
          className="fixed inset-0 grid-pattern pointer-events-none"
          style={{ opacity: 0.3, zIndex: 0 }}
        />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
