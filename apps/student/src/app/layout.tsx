import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/context/ThemeProvider";
import ToastProvider from "@/context/ToastProvider";
import { webPrimaryColor } from "@repo/utils/constants";
import NextAuthSessionProvider from "@/context/NextAuthSessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <NextAuthSessionProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
              <ToastProvider>
                <NextTopLoader color={webPrimaryColor} />
                {children}
              </ToastProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
