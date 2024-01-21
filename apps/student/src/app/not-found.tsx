"use client";
import { Button, buttonVariants } from "@ui/components/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import notFoundIcon from "@repo/assets/icons/404.svg";

const NotFoundPage = () => {
  const router = useRouter();

  return (
    <main>
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-12 lg:flex-row lg:gap-12">
        <div className="wf-ull lg:w-1/2">
          <p className="text-sm font-medium text-primary">404 error</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground md:text-3xl">
            Page not found
          </h1>
          <p className="mt-4 text-muted-foreground">
            Sorry, the page you are looking for doesn&apos;t exist.Here are some
            helpful links:
          </p>

          <div className="mt-6 flex items-center gap-x-3">
            <Button
              variant={"outline"}
              size={"lg"}
              className="gap-2"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Go back</span>
            </Button>

            <Link href={"/"} className={buttonVariants({ size: "lg" })}>
              Take me home
            </Link>
          </div>
        </div>

        <div className="relative mt-12 flex w-full items-center justify-center lg:mt-0 lg:w-1/2">
          <Image
            className="w-full max-w-lg lg:mx-auto"
            src={notFoundIcon}
            alt="404"
            width={512}
            height={165}
          />
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
