import PaymentSuccessLottie from "@/components/lotties/PaymentSuccessLottie";
import { buttonVariants } from "@ui/components/shadcn/button";
import Link from "next/link";

const PaymentSuccessPage = () => {
  return (
    <main className="container py-10">
      <section className="flex min-h-[calc(100vh-8.6rem)] w-full flex-col items-center justify-center">
        <PaymentSuccessLottie />
        <p className="text-3xl font-medium text-green-500">Success</p>
        <p className="my-3 text-center font-medium text-primary">
          Your payment has been processed successfully
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

export default PaymentSuccessPage;
