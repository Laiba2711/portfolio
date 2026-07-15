"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let current = 0;
    intervalRef.current = setInterval(() => {
      current += Math.floor(Math.random() * 8) + 1;
      if (current >= 100) {
        current = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 800);
        }, 400);
      }
      setCount(current);
    }, 40);
    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader-overlay"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Grid background */}
          <div className="absolute inset-0 grid-pattern opacity-30" />

          {/* Scanning line */}
          <motion.div
            className="absolute left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(124,58,237,0.8), transparent)",
            }}
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo / Name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="flex items-center gap-3 mb-2">
                {/* Animated logo mark */}
                <div className="relative w-12 h-12">
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background:
                        "linear-gradient(135deg, #7c3aed, #2563eb)",
                    }}
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <div
                    className="absolute inset-[2px] rounded-[10px] flex items-center justify-center font-bold text-lg"
                    style={{ background: "var(--bg-primary)" }}
                  >
                    LR
                  </div>
                </div>
                <span
                  className="text-2xl font-bold tracking-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Laiba<span className="gradient-text">Rashid</span>
                </span>
              </div>
              <p
                className="text-sm tracking-[0.3em] uppercase"
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                Full Stack Developer
              </p>
            </motion.div>

            {/* Counter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              <span
                className="text-7xl font-black gradient-text"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {count}
              </span>
              <span
                className="text-3xl font-light ml-1"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                %
              </span>
            </motion.div>

            {/* Progress bar */}
            <div className="w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, #7c3aed, #c084fc, #2563eb)",
                  width: `${count}%`,
                  boxShadow: "0 0 10px rgba(192,132,252,0.6)",
                }}
                transition={{ duration: 0.05 }}
              />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xs tracking-[0.2em] uppercase"
              style={{
                color: "rgba(255,255,255,0.25)",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {count < 30
                ? "Initializing systems..."
                : count < 60
                ? "Loading 3D assets..."
                : count < 90
                ? "Preparing experience..."
                : "Launching..."}
            </motion.p>

            {/* Orbiting dots */}
            <div className="absolute" style={{ width: 200, height: 200, top: -60 }}>
              {[0, 120, 240].map((angle, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    background: i === 0 ? "#7c3aed" : i === 1 ? "#2563eb" : "#c084fc",
                    top: "50%",
                    left: "50%",
                    boxShadow: `0 0 8px ${i === 0 ? "#7c3aed" : i === 1 ? "#2563eb" : "#c084fc"}`,
                  }}
                  animate={{ rotate: [angle, angle + 360] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.2,
                  }}
                  transformTemplate={({ rotate }) =>
                    `rotate(${rotate}) translateX(70px) rotate(-${rotate})`
                  }
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
