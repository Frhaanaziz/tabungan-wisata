import "@/styles/globals.css";

import { Inter } from "next/font/google";
import { cookies } from "next/headers";

import { TRPCReactProvider } from "@/trpc/react";
import NextTopLoader from "nextjs-toploader";
import ToastProvider from "@/context/ToastProvider";
import {
  companyDescription,
  companyName,
  webPrimaryColor,
} from "@repo/utils/constants";
import NextAuthSessionProvider from "@/context/NextAuthSessionProvider";
import { PropsWithChildren } from "react";
import { Metadata, Viewport } from "next";
import { EdgeStoreProvider } from "@/context/edgestore";
import { baseUrl } from "@/lib/constant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  applicationName: companyName,
  title: {
    default: companyName,
    template: `%s | ${companyName}`,
  },
  description: companyDescription,
  metadataBase: new URL(baseUrl),
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: companyName,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: companyName,
    title: {
      default: companyName,
      template: `%s | ${companyName}`,
    },
    description: companyDescription,
  },
  twitter: {
    card: "summary",
    title: {
      default: companyName,
      template: `%s | ${companyName}`,
    },
    description: companyDescription,
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${inter.variable}`}
      >
        <NextAuthSessionProvider>
          <TRPCReactProvider cookies={cookies().toString()}>
            <EdgeStoreProvider>
              <ToastProvider>
                <NextTopLoader color={webPrimaryColor} />
                {children}
              </ToastProvider>
            </EdgeStoreProvider>
          </TRPCReactProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
