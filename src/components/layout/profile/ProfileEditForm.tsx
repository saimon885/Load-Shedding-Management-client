"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { ImagePlus, Loader2, Save, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormValues,
  UpdateUserSchema,
} from "@/validation/form/user/UpdateUserValidation";
import { ProfileEditFormProps } from "@/types/user/User.type";
import { UpdateUserHook } from "@/hooks/profile.hook";
import { toast } from "@/components/ui/toast";

export default function ProfileEditForm({
  open,
  onOpenChange,
  data,
  onSuccess,
}: ProfileEditFormProps) {
  const { mutate: UpdateProfile, isPending: isLoading } = UpdateUserHook();
  const [preview, setPreview] = useState(data.profileImage);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: data.name || "",
      address: data.address || "",
      phone: data.phone || "",
      areaId: data.areaId || "",
    },
  });

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  const handleClose = () => {
    reset({
      name: data.name,
      address: data.address,
      phone: data.phone,
      areaId: data.areaId,
    });

    setPreview(data.profileImage);
    onOpenChange(false);
  };

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();

      const updateData = {
        name: values.name,
        address: values.address,
        phone: values.phone,
        areaId: values.areaId,
      };

      formData.append("data", JSON.stringify(updateData));

      const image = values.profileImage?.[0];

      if (image) {
        formData.append("profileImage", image);
      }

      UpdateProfile(formData, {
        onSuccess: (response) => {
          console.log("Profile updated:", response);

          const imagePreview = image
            ? URL.createObjectURL(image)
            : data.profileImage;

          onSuccess({
            ...updateData,
            profileImage: imagePreview,
          });
          toast.add({
            title: "Update Success",
            description: "Profile updated successfully",
            type: "success",
          });

          onOpenChange(false);
        },

        onError: (error) => {
          console.error("Profile update failed:", error);

          toast.add({
            title: "Update failure",
            description:
              error.message || "Something went wrong. Please try again",
            type: "error",
          });
        },
      });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Profile</DialogTitle>

          <DialogDescription>
            Update your personal information and profile picture.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="Profile preview"
                  width={112}
                  height={112}
                  className="size-28 rounded-full border-4 border-background object-cover shadow-md"
                  unoptimized={preview.startsWith("blob:")}
                />
              ) : (
                <div className="flex size-28 items-center justify-center rounded-full bg-muted">
                  <ImagePlus className="size-8 text-muted-foreground" />
                </div>
              )}

              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 flex size-9 cursor-pointer items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-md transition hover:bg-primary/90"
              >
                <ImagePlus className="size-4" />

                <input
                  id="profileImage"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  {...register("profileImage", {
                    onChange: handleImageChange,
                  })}
                />
              </label>
            </div>

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WEBP. Maximum recommended size 2MB.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>

            <Input
              id="name"
              placeholder="Enter your full name"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>

            <Input
              id="phone"
              placeholder="Enter your phone number"
              {...register("phone", {
                required: "Phone number is required",
              })}
            />

            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>

            <Input
              id="address"
              placeholder="Enter your address"
              {...register("address", {
                required: "Address is required",
              })}
            />

            {errors.address && (
              <p className="text-sm text-destructive">
                {errors.address.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="areaId">Area ID</Label>

            <Input
              id="areaId"
              placeholder="Enter area ID"
              {...register("areaId", {
                required: "Area ID is required",
              })}
            />

            {errors.areaId && (
              <p className="text-sm text-destructive">
                {errors.areaId.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="gap-2"
            >
              <X className="size-4" />
              Cancel
            </Button>

            <Button type="submit" disabled={isLoading} className="gap-2">
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="size-4" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
