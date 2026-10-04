import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const FeederNotFound = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center px-4 bg-muted/20">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-2xl bg-background border shadow-sm">
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center animate-bounce">
          <AlertTriangle className="size-8 text-destructive" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Feeders ID Not Found
          </h1>
          <p className="text-sm text-muted-foreground">
            The feeders identifier is missing or invalid. Please check the URL
            or try navigating back to the dashboard.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Go Back
          </Button>

          <Button
            size="sm"
            onClick={() => router.push("/dashboard/infrastructure/feeders")}
            className="flex items-center gap-2"
          >
            <Home className="size-4" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
