"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PaymentStatus = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const error = searchParams.get("error");

  let config = {
    title: "Something Went Wrong",
    message: "We couldn't process your payment. Please try again.",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    icon: "⚠️",
  };

  if (status === "success") {
    config = {
      title: "Payment Successful!",
      message: "Thank you! Your payment has been processed successfully.",
      color: "text-green-600",
      bgColor: "bg-green-50",
      icon: "✅",
    };
  } else if (status === "failed" || error === "payment-failed") {
    config = {
      title: "Payment Failed",
      message:
        "Your transaction could not be completed. Please check your balance or try another method.",
      color: "text-red-600",
      bgColor: "bg-red-50",
      icon: "❌",
    };
  } else if (status === "cancel") {
    config = {
      title: "Payment Cancelled",
      message: "You have cancelled the bKash payment process.",
      color: "text-gray-600",
      bgColor: "bg-gray-50",
      icon: "⏹️",
    };
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
      <div
        className={`max-w-md w-full p-6 rounded-2xl shadow-sm border border-gray-100 text-center ${config.bgColor}`}
      >
        <div className="text-4xl mb-3">{config.icon}</div>
        <h1 className={`text-2xl font-bold mb-2 ${config.color}`}>
          {config.title}
        </h1>
        <p className="text-gray-600 text-sm mb-6">{config.message}</p>

        {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
        <button
          onClick={() => router.push("/dashboard/customer/my-payments")}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-4 rounded-xl transition duration-200 text-sm"
        >
          Back to Payments
        </button>
      </div>
    </div>
  );
};

export default PaymentStatus;
