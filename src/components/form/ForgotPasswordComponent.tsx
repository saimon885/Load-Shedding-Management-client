"use client";
import { UseForgotPassword } from "@/hooks/auth.hook";

import { UseFormGetValues, UseFormTrigger } from "react-hook-form";
import { LoginPayload } from "@/types/auth/login";

const ForgotPasswordComponent = ({
  trigger,
  getValues,
}: {
  trigger: UseFormTrigger<LoginPayload>;
  getValues: UseFormGetValues<LoginPayload>;
}) => {
  const { mutate: Forgot, isPending } = UseForgotPassword();

  const handleForgotPassword = async () => {
    console.log("buttton click");
    const isEmailValid = await trigger("email");
    if (!isEmailValid) return;

    const emailData = getValues("email");

    const payload = { email: emailData };
    console.log(payload);

    Forgot(payload);
  };
  return (
    <button
      type="button"
      onClick={() => handleForgotPassword()}
      disabled={isPending}
      className="text-sm font-medium text-blue-600 hover:underline dark:text-sky-400"
    >
      {isPending ? "Sending..." : "Forgot password?"}
    </button>
  );
};

export default ForgotPasswordComponent;
