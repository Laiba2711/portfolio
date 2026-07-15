"use client";

import { useEffect, useRef, ReactNode } from "react";
import { usePathname } from "next/navigation";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<unknown>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Disable smooth scroll on admin dashboard to avoid scroll conflicts
    if (pathname.startsWith("/admin")) {
      return;
    }

    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
    };

    async function initLenis() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.8,
        touchMultiplier: 2,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    initLenis();

    return () => {
      if (lenisRef.current) {
        (lenisRef.current as { destroy: () => void }).destroy();
        lenisRef.current = null;
      }
    };
  }, [pathname]);

  return <>{children}</>;
}
