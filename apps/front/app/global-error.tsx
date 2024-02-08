'use client';

import * as Sentry from '@sentry/nextjs';
import MainButton from '@/components/common/MainButton';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  React.useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="min-h-screen flex flex-col justify-center items-center space-y-10 bg-sky-50/50">
          <Image
            src={'/images/error.svg'}
            width={600}
            height={600}
            alt="error"
          />

          <div className="space-y-5">
            <h1 className="text-4xl font-bold text-center text-title">
              Internal server error
            </h1>
            <p className="text-center inline-block">
              It shouldn&apos;t have happened! We&apos;ve been notified about
              this <br />
              issue and we&apos;ll take a look at it shortly.
            </p>
          </div>

          <Link href={'/'}>
            <MainButton text="Back to Home" size="xlarge" width="100" />
          </Link>
        </main>
      </body>
    </html>
  );
}
