import { env } from "@/env";
import React from "react";
import { toast } from "sonner";

declare global {
  interface Window {
    snap?: any;
  }
}

export const useSnap = () => {
  const [snap, setSnap] = React.useState<any>(null);

  React.useEffect(() => {
    const midtransScriptUrl = `${env.NEXT_PUBLIC_MIDTRANS_APP_URL}/snap/snap.js`;

    let script = document.createElement("script");
    script.src = midtransScriptUrl;
    script.setAttribute("data-client-key", env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY);
    script.onload = () => {
      setSnap(window.snap);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  function snapPopUp({ token, toastId }: { token: string; toastId: string }) {
    if (snap) {
      snap.pay(
        token,
        // {
        // onSuccess: function (result: any) {
        //   console.log(result);
        //   updatePayment({
        //     id: paymentId,
        //     status: PaymentStatus.completed,
        //   });
        //   toast.success("Payment success!", { id: toastId });
        // },
        // onPending: function (result: any) {
        //   console.log(result);
        //   toast("Waiting your payment", { id: toastId, icon: "🕒" });
        // },
        // onError: function (result: any) {
        //   console.log(result);
        //   toast.error("Payment failed, please try again", { id: toastId });
        //   updatePayment({
        //     id: paymentId,
        //     status: PaymentStatus.failed,
        //   });
        // },
        // onClose: function () {
        //   deletePayment(paymentId);
        // },
        //   }
      );
    } else {
      console.error("Midtrans is not ready, please try again later");
      toast.error("Midtrans is not ready, please try again later", {
        id: toastId,
      });
      //   deletePayment(paymentId);
    }
  }

  return { snap, snapPopUp };
};
