"use client";
import { Button } from "../ui/button";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "../ui/toast";
import { useRouter } from "next/navigation";
import { UseGoogleOauthHook } from "@/hooks/auth.hook";

const GoogleLoginResponse = () => {
  const router = useRouter();
  const { mutate: googleLogin } = UseGoogleOauthHook();

  const handleGoogleSuccess = (credentialResponse: { credential?: string }) => {
    const idToken = credentialResponse.credential;

    if (!idToken) {
      toast.add({
        title: "Google OAuth Failed",
        description: "Something went wrong. Please try again",
        type: "error",
      });
      return;
    }

    googleLogin(
      { idToken },
      {
        onSuccess: (res) => {
          toast.add({
            title: "Logged in Successfully",
            description: "Welcome back",
            type: "success",
          });
          if (res.success) {
            router.push("/");
          }
        },
        onError: (err: any) => {
          toast.add({
            title: "Google OAuth Failed",
            description:
              err.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      },
    );
  };

  const handleGoogleError = () => {
    toast.add({
      title: "Google OAuth Failed",
      description: "Something went wrong. Please try again",
      type: "error",
    });
  };
  return (
    <div className="my-4">
      <GoogleLogin
        theme="outline"
        shape="pill"
        text="continue_with"
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </div>
  );
};

export default GoogleLoginResponse;
