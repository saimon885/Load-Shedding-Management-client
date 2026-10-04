import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { CreatePaymentHook } from "@/hooks/payments.hook";
import React from "react";

const PaymentAdd = ({ serviceId }: { serviceId: string }) => {
  const { mutate: payment, isPending } = CreatePaymentHook();

  const CreatePayment = () => {
    const payload = {
      serviceId: serviceId,
    };

    payment(payload, {
      onSuccess: (res: any) => {
        toast.add({
          title: "Redirecting...",
          description: "Taking you to bKash payment gateway.",
          type: "success",
        });

        if (res?.data) {
          window.location.href = res.data;
        } else {
          toast.add({
            title: "Error",
            description: "Payment URL not found in response.",
            type: "error",
          });
        }
      },
      onError: (err: any) => {
        toast.add({
          title: "Error",
          description: err.message || "Failed to create Payment.",
          type: "error",
        });
      },
    });
  };

  return (
    <Button
      onClick={() => CreatePayment()}
      disabled={isPending}
      className="w-full flex items-center justify-center gap-2 text-xs font-bold h-10 shadow-xs cursor-pointer bg-[#e11d48] hover:bg-[#e11d48]/90 text-white rounded-lg transition-colors"
    >
      <span className="font-extrabold text-sm tracking-tight">
        {isPending ? "Processing..." : "bKash Pay Now"}
      </span>
    </Button>
  );
};

export default PaymentAdd;
