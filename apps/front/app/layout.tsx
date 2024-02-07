import type { Metadata } from 'next';
import { Poppins, Volkhov, Caveat } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import { cn } from '@repo/utils';
import { companyName, webPrimaryColor } from '@repo/utils/constants';
import { env } from '@/env.mjs';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});
const volkhov = Volkhov({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});
const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: companyName,
    template: `%s | ${companyName}`,
  },
  description: `Discover your dream vacation with ${companyName} - your trusted travel experts. Browse affordable packages, customize your trip with flexible booking options, and get personalized advice from our travel specialists. Whether it's a beach getaway, city break, or exotic adventure, we have the perfect vacation waiting for you. Book online today and start exploring.`,
  keywords: [
    'travel agency',
    'travel packages',
    'vacation packages',
    'book vacation',
    'book trip',
    'beach vacation',
    'city break',
    'adventure travel',
    'family vacation',
    'honeymoon packages',
    'cruise packages',
    'all-inclusive resorts',
    'luxury travel',
    'cheap flights',
    'airfare deals',
    'hotel deals',
    'travel guides',
    'holiday planning',
    'group travel',
    'study tours',
  ],
  metadataBase: new URL(env.NEXT_PUBLIC_BASE_URL),
  openGraph: {
    type: 'website',
    description: `Discover your dream vacation with ${companyName} - your trusted travel experts. Browse affordable packages, customize your trip with flexible booking options, and get personalized advice from our travel specialists. Whether it's a beach getaway, city break, or exotic adventure, we have the perfect vacation waiting for you. Book online today and start exploring.`,
    url: env.NEXT_PUBLIC_BASE_URL,
    siteName: companyName,
    images: [
      {
        url: `${env.NEXT_PUBLIC_BASE_URL}/images/logo.png`,
        width: 116,
        height: 35,
        alt: companyName,
      },
    ],
  },
  category: 'Travel',
  generator: 'Next.js',
  applicationName: companyName,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          [poppins.className, volkhov.className].toString(),
          `${caveat.variable}`
        )}
      >
        <NextTopLoader color={webPrimaryColor} />

        {children}
      </body>
    </html>
  );
}
