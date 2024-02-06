import type { Metadata } from 'next';
import { Poppins, Volkhov, Caveat } from 'next/font/google';
import './globals.css';
import NextTopLoader from 'nextjs-toploader';
import NavBar from '@/components/common/NavBar';
import { cn } from '@repo/utils';
import { webPrimaryColor } from '@repo/utils/constants';

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
  title: 'Travel Agency Landing Page',
  description:
    'A Travel Agency Landing Page built with Next14, Shadcn, and Tailwind.',
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
        <NavBar />
        {children}
      </body>
    </html>
  );
}
