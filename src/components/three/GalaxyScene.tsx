"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  opacity: number;
}

interface GalaxyParticle {
  x: number;
  y: number;
  r: number;
  color: string;
  angle: number;
  radius: number;
  speed: number;
}

interface Planet {
  x: number;
  y: number;
  r: number;
  color: string;
  glowColor: string;
  floatOffset: number;
  floatSpeed: number;
}

export function GalaxyScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // ── Stars ──────────────────────────────────────────────────────
    const STAR_COUNT = 300;
    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      z: Math.random(),
      r: Math.random() * 1.2 + 0.2,
      opacity: Math.random() * 0.7 + 0.1,
    }));

    // ── Galaxy particles ───────────────────────────────────────────
    const PARTICLE_COUNT = 1800;
    const cx = width / 2;
    const cy = height / 2;

    const particles: GalaxyParticle[] = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      const branchCount = 3;
      const branch = i % branchCount;
      const branchAngle = (branch / branchCount) * Math.PI * 2;
      const radius = Math.random() * Math.min(width, height) * 0.38 + 20;
      const spinAngle = radius * 0.003;
      const randomness = Math.pow(Math.random(), 3) * 30 * (Math.random() < 0.5 ? 1 : -1);

      const t = radius / (Math.min(width, height) * 0.38);
      const r = Math.round(192 + (37 - 192) * t);
      const g = Math.round(132 + (99 - 132) * t);
      const b = Math.round(252 + (235 - 252) * t);
      const a = (Math.random() * 0.5 + 0.3).toFixed(2);
      const color = `rgba(${r},${g},${b},${a})`;

      return {
        x: Math.cos(branchAngle + spinAngle) * radius + randomness + cx,
        y: Math.sin(branchAngle + spinAngle) * radius * 0.35 + randomness * 0.3 + cy,
        r: Math.random() * 1.6 + 0.3,
        color,
        angle: branchAngle + spinAngle,
        radius,
        speed: 0.00015 + Math.random() * 0.0001,
      };
    });

    // ── Planets ────────────────────────────────────────────────────
    const planets: Planet[] = [
      {
        x: width * 0.15,
        y: height * 0.3,
        r: 22,
        color: "#7c3aed",
        glowColor: "rgba(124,58,237,0.4)",
        floatOffset: 0,
        floatSpeed: 0.8,
      },
      {
        x: width * 0.82,
        y: height * 0.6,
        r: 32,
        color: "#2563eb",
        glowColor: "rgba(37,99,235,0.35)",
        floatOffset: 1.5,
        floatSpeed: 0.6,
      },
      {
        x: width * 0.25,
        y: height * 0.75,
        r: 14,
        color: "#c084fc",
        glowColor: "rgba(192,132,252,0.4)",
        floatOffset: 3,
        floatSpeed: 1.2,
      },
      {
        x: width * 0.7,
        y: height * 0.2,
        r: 11,
        color: "#22d3ee",
        glowColor: "rgba(34,211,238,0.4)",
        floatOffset: 0.8,
        floatSpeed: 1.5,
      },
    ];

    let rotation = 0;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Fill background
      ctx.fillStyle = "#020209";
      ctx.fillRect(0, 0, width, height);

      const mx = (mouseRef.current.x / width - 0.5) * 30;
      const my = (mouseRef.current.y / height - 0.5) * 20;

      // ── Draw stars ────────────────────────────────────────────
      for (const star of stars) {
        const twinkle = Math.sin(time * 0.8 + star.z * 20) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(
          star.x + mx * star.z * 0.4,
          star.y + my * star.z * 0.4,
          star.r,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255,255,255,${(star.opacity * twinkle).toFixed(2)})`;
        ctx.fill();
      }

      // ── Draw galaxy particles (rotated) ───────────────────────
      ctx.save();
      ctx.translate(cx + mx * 0.3, cy + my * 0.3);
      ctx.rotate(rotation);
      ctx.translate(-(cx), -(cy));

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.restore();

      // ── Draw planets ──────────────────────────────────────────
      for (const planet of planets) {
        const floatY = Math.sin(time * planet.floatSpeed + planet.floatOffset) * 8;
        const px = planet.x + mx * 0.15;
        const py = planet.y + my * 0.1 + floatY;

        // Glow
        const grd = ctx.createRadialGradient(px, py, 0, px, py, planet.r * 3);
        grd.addColorStop(0, planet.glowColor);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, planet.r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Planet body
        const bodyGrd = ctx.createRadialGradient(
          px - planet.r * 0.3,
          py - planet.r * 0.3,
          planet.r * 0.1,
          px,
          py,
          planet.r
        );
        bodyGrd.addColorStop(0, lighten(planet.color, 40));
        bodyGrd.addColorStop(0.6, planet.color);
        bodyGrd.addColorStop(1, darken(planet.color, 40));
        ctx.beginPath();
        ctx.arc(px, py, planet.r, 0, Math.PI * 2);
        ctx.fillStyle = bodyGrd;
        ctx.fill();
      }

      rotation += 0.0003;
      time += 0.016;
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Mouse parallax
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    // Resize
    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ── Color helpers ──────────────────────────────────────────────────────
function lighten(hex: string, amount: number): string {
  const r = Math.min(255, parseInt(hex.slice(1, 3), 16) + amount);
  const g = Math.min(255, parseInt(hex.slice(3, 5), 16) + amount);
  const b = Math.min(255, parseInt(hex.slice(5, 7), 16) + amount);
  return `rgb(${r},${g},${b})`;
}

function darken(hex: string, amount: number): string {
  const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
  const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
  const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
  return `rgb(${r},${g},${b})`;
}
