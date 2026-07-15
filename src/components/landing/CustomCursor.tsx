"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
    };

    const onMouseEnterLink = () => {
      cursor.style.width = "24px";
      cursor.style.height = "24px";
      cursor.style.background = "rgba(192,132,252,0.4)";
    };

    const onMouseLeaveLink = () => {
      cursor.style.width = "12px";
      cursor.style.height = "12px";
      cursor.style.background = "rgba(192,132,252,0.9)";
    };

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "12px",
        height: "12px",
        borderRadius: "50%",
        background: "rgba(192,132,252,0.9)",
        pointerEvents: "none",
        zIndex: 9999,
        transition: "width 0.15s, height 0.15s, background 0.15s",
        willChange: "transform",
      }}
    />
  );
}
