"use client";

import { Button } from "../ui/button";
import { toast } from "../ui/toast";
import { UseLoginHook } from "@/hooks/auth.hook";
import { useRouter } from "next/navigation";

const demoAccounts = [
  {
    label: "Admin",
    email: "admin@gmail.com",
    password: "admin12$$AD",
  },
  {
    label: "Customer",
    email: "saimonhossan34567@gmail.com",
    password: "user12$$AD",
  },
  {
    label: "Technician",
    email: "technician@gmail.com",
    password: "technician12$$AD",
  },
];

const DemoLoginButtons = () => {
  const router = useRouter();

  const { mutate: login, isPending } = UseLoginHook();

  const handleDemoLogin = (email: string, password: string) => {
    login(
      {
        email,
        password,
      },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.add({
              title: "Demo Login Success",
              description: "Welcome back",
              type: "success",
            });

            router.push("/");
          }
        },

        onError: (err) => {
          toast.add({
            title: "Login Failed",
            description:
              err.message || "Unable to login with this demo account.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <div className="mt-6 space-y-3">
      <div className="text-center">
        <p className="text-sm font-medium">Demo Login</p>

        <p className="text-xs text-muted-foreground">
          Use a demo account to explore the system
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {demoAccounts.map((account) => (
          <Button
            key={account.label}
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleDemoLogin(account.email, account.password)}
          >
            {account.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DemoLoginButtons;
