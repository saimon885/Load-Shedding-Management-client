"use client";

import Profile from "@/components/layout/profile/GetProfile";
import { Spinner } from "@/components/ui/spinner";
import { UsegetMeHook } from "@/hooks/profile.hook";

export default function ProfilePage() {
  const { data, isLoading, isError } = UsegetMeHook();
  console.log(data?.data);

  if (isLoading) {
    return (
      <main className="mt-18 flex min-h-[calc(100vh-72px)] items-center justify-center px-4">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Spinner className="size-6" />
          <p className="text-sm">Loading profile...</p>
        </div>
      </main>
    );
  }

  if (isError || !data?.data) {
    return (
      <main className="mt-18 flex min-h-[calc(100vh-72px)] items-center justify-center px-4">
        <div className="rounded-lg border bg-card px-6 py-5 text-center shadow-sm">
          <p className="font-medium">
            User Not Found Please Sign In or Register Your Account!
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Please try again later.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mt-18 min-h-screen bg-muted/30 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Profile data={data.data} />
      </div>
    </main>
  );
}
