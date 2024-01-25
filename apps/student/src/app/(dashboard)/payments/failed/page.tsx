import PaymentFailedLottie from "@/components/lotties/PaymentFailedLottie";
import { buttonVariants } from "@ui/components/shadcn/button";
import Link from "next/link";

const PaymentFailedPage = () => {
  return (
    <main className="">
      <section className="flex min-h-[calc(100vh-8.6rem)] w-full flex-col items-center justify-center">
        <PaymentFailedLottie />
        <p className="text-3xl font-medium text-red-500">Failed</p>
        <p className="my-3 font-medium text-primary">
          Unfortunately payment was not successful
        </p>
        <p className="text-balance text-center text-muted-foreground">
          Page will be automatically redirected to the main page or click button
          below
        </p>
        <Link href={"/"} className={buttonVariants({ className: "mt-5" })}>
          Back to Home
        </Link>
      </section>
    </main>
  );
};

export default PaymentFailedPage;
