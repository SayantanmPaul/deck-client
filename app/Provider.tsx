"use client";

import { ThemeProvider } from "next-themes";

export function NextThemeroviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class" forcedTheme="dark">
      {children}
    </ThemeProvider>
  );
}
