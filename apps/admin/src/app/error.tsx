"use client";

import { Button, buttonVariants } from "@ui/components/shadcn/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  if (error.message === "INVALID_ACCESS_TOKEN") redirect("auth/signin");

  return (
    <main className="grid min-h-[calc(100vh-4rem)] place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="rounded-xl border bg-accent p-10 text-center">
        <p className="text-base font-semibold text-primary">
          There was a problem
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
          {error.message || "Something went wrong"}
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Please try again later or contact support if the problem persists.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button onClick={reset}>Try again</Button>
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Go back home
          </Link>
        </div>
      </div>
    </main>
  );
}
