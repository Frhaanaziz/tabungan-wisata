"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Toaster } from "sonner";

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const { resolvedTheme } = useTheme();

  return (
    <>
      <Toaster
        richColors
        position="top-center"
        theme={resolvedTheme as "light" | "dark" | undefined}
      />
      {children}
    </>
  );
};

export default ToastProvider;
