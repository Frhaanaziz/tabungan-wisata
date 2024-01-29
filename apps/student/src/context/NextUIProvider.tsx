"use client";

import { NextUIProvider as NextUIProviderApi } from "@nextui-org/react";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  return <NextUIProviderApi>{children}</NextUIProviderApi>;
}
