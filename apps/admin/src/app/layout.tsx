import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/context/ThemeProvider";
import ToastProvider from "@/context/ToastProvider";
import { companyName, webPrimaryColor } from "@repo/utils/constants";
import { EdgeStoreProvider } from "@/context/edgestore";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: `${companyName} Admin`,
  description: "Admin panel for the app",
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
        <TRPCReactProvider cookies={cookies().toString()}>
          <EdgeStoreProvider>
            <ThemeProvider attribute="class" disableTransitionOnChange>
              <ToastProvider>
                <NextTopLoader color={webPrimaryColor} />
                {children}
              </ToastProvider>
            </ThemeProvider>
          </EdgeStoreProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
