"use client";

import Image from "next/image";
import { useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Edit3,
  Globe2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ProfileEditForm from "./ProfileEditForm";

interface ProfileData {
  id?: string;
  name?: string | null;
  email?: string | null;
  googleId?: string | null;
  authProvider?: string | null;
  emailVerified?: boolean | null;
  role?: string | null;
  areaId?: string | null;
  status?: string | null;
  createdAt?: string | null;
  profile?: {
    id?: string | null;
    profileImage?: string | null;
    imagePublishedID?: string | null;
    address?: string | null;
    phone?: string | null;
    userId?: string | null;
  } | null;
}

interface ProfileProps {
  data?: ProfileData | null;
}

const formatDate = (date?: string | null) => {
  if (!date) return "Not available";

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
};

const getInitials = (name?: string | null) => {
  if (!name) return "U";

  return name
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value?: string | null;
}

function InfoItem({ icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-medium text-foreground">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

export default function Profile({ data }: ProfileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(data ?? null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleProfileUpdate = (updatedData: {
    name: string;
    areaId: string;
    address: string;
    phone: string;
    profileImage: string;
  }) => {
    setProfile((prev) => ({
      ...prev,
      name: updatedData.name,
      areaId: updatedData.areaId,
      profile: {
        ...prev?.profile,
        address: updatedData.address,
        phone: updatedData.phone,
        profileImage: updatedData.profileImage,
      },
    }));
  };

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <Card className="overflow-hidden border-border/60 shadow-sm">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="relative shrink-0">
                {profile?.profile?.profileImage ? (
                  <Image
                    src={profile?.profile?.profileImage || ""}
                    alt={profile?.name || "Profile"}
                    width={112}
                    height={112}
                    className="size-24 rounded-2xl border object-cover shadow-sm sm:size-28"
                  />
                ) : (
                  <div className="flex size-24 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary sm:size-28 sm:text-3xl">
                    {getInitials(profile?.name)}
                  </div>
                )}

                {profile?.status === "ACTIVE" && (
                  <span className="absolute bottom-1.5 right-1.5 size-4 rounded-full border-2 border-background bg-emerald-500" />
                )}
              </div>

              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {profile?.name || "Unknown User"}
                  </h1>

                  {profile?.emailVerified && (
                    <CheckCircle2 className="size-5 text-primary" />
                  )}
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {profile?.email || "No email available"}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="gap-1.5 font-medium">
                    <ShieldCheck className="size-3.5" />
                    {profile?.role || "USER"}
                  </Badge>

                  <Badge
                    variant={
                      profile?.status === "ACTIVE" ? "outline" : "destructive"
                    }
                    className="gap-1.5 font-medium"
                  >
                    <span
                      className={`size-1.5 rounded-full ${
                        profile?.status === "ACTIVE"
                          ? "bg-emerald-500"
                          : "bg-destructive"
                      }`}
                    />

                    {profile?.status || "UNKNOWN"}
                  </Badge>
                </div>
              </div>
            </div>

            <Button
              onClick={() => setIsEditOpen(true)}
              className="w-full gap-2 sm:w-auto"
            >
              <Edit3 className="size-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Personal Information</CardTitle>

            <p className="text-sm text-muted-foreground">
              Your basic personal and contact information.
            </p>
          </CardHeader>

          <CardContent>
            <div className="grid gap-6 sm:grid-cols-2">
              <InfoItem
                icon={<UserRound className="size-5" />}
                label="Full Name"
                value={profile?.name}
              />

              <InfoItem
                icon={<Mail className="size-5" />}
                label="Email Address"
                value={profile?.email}
              />

              <InfoItem
                icon={<Phone className="size-5" />}
                label="Phone Number"
                value={profile?.profile?.phone}
              />

              <InfoItem
                icon={<MapPin className="size-5" />}
                label="Address"
                value={profile?.profile?.address}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Account</CardTitle>

            <p className="text-sm text-muted-foreground">
              Account and authentication details.
            </p>
          </CardHeader>

          <CardContent className="space-y-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Role
                </p>

                <p className="mt-1 text-sm font-medium">
                  {profile?.role || "Not available"}
                </p>
              </div>

              <ShieldCheck className="size-5 text-muted-foreground" />
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Authentication
                </p>

                <p className="mt-1 text-sm font-medium">
                  {profile?.authProvider || "Not available"}
                </p>
              </div>

              <Globe2 className="size-5 text-muted-foreground" />
            </div>

            <Separator />

            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Email Verification
                </p>

                <p className="mt-1 text-sm font-medium">
                  {profile?.emailVerified ? "Verified" : "Not Verified"}
                </p>
              </div>

              <CheckCircle2
                className={`size-5 ${
                  profile?.emailVerified
                    ? "text-emerald-500"
                    : "text-muted-foreground"
                }`}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">Account Details</CardTitle>

          <p className="text-sm text-muted-foreground">
            Additional information associated with your account.
          </p>
        </CardHeader>

        <CardContent>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={<CalendarDays className="size-5" />}
              label="Member Since"
              value={formatDate(profile?.createdAt)}
            />

            <InfoItem
              icon={<ShieldCheck className="size-5" />}
              label="Account Status"
              value={profile?.status}
            />

            <InfoItem
              icon={<MapPin className="size-5" />}
              label="Area ID"
              value={profile?.areaId || "check your Zone and submit the code."}
            />
          </div>
        </CardContent>
      </Card>

      <ProfileEditForm
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        data={{
          name: profile?.name || "",
          areaId: profile?.areaId || "",
          address: profile?.profile?.address || "",
          phone: profile?.profile?.phone || "",
          profileImage: profile?.profile?.profileImage || "",
        }}
        onSuccess={handleProfileUpdate}
      />
    </div>
  );
}
