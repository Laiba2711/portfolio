"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider basePath="/api/auth">
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </SessionProvider>
  );
}
