"use client";
import Lottie from "react-lottie-player";
import { useState, useEffect } from "react";
import { Skeleton } from "@ui/components/shadcn/skeleton";
import { useRouter } from "next/navigation";

const PaymentFailedLottie = () => {
  const [animationData, setAnimationData] = useState<object>();
  const router = useRouter();

  // redirect to home page after 5 seconds
  useEffect(() => {
    import("@repo/assets/lotties/payment-failed.json").then(setAnimationData);
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  if (!animationData)
    return <Skeleton className="h-[300px] w-[300px] rounded-3xl" />;

  return (
    <Lottie
      //  loop
      animationData={animationData}
      play
      style={{ width: 300 }}
    />
  );
};

export default PaymentFailedLottie;
