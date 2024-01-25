import PaymentPendingLottie from "@/components/lotties/PaymentPendingLottie";
import { buttonVariants } from "@ui/components/shadcn/button";
import Link from "next/link";

const PaymentPendingPage = () => {
  return (
    <main className="">
      <section className="flex min-h-[calc(100vh-8.6rem)] w-full flex-col items-center justify-center">
        <PaymentPendingLottie />
        <p className="text-3xl font-medium text-yellow-500">Pending</p>
        <p className="my-3 font-medium text-primary">
          Payment is being processed, please wait for a moment
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

export default PaymentPendingPage;
