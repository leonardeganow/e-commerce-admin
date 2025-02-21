/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { PasswordStrengthMeter } from "./password-strength-meter";
import axios from "axios";
import { DEV_SERVER_URL } from "@/app/constants";
import useUserStore from "@/store/userDataStore";
import { useToast } from "@/hooks/use-toast";

type PasswordFormValues = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export function PasswordForm() {
  const [showPassword, setShowPassword] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isLoading, setLoading] = useState(false);

  const { userData } = useUserStore();

  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<PasswordFormValues>();

  const newPassword = watch("newPassword");

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }

    setLoading(true);
    const newData = {
      ...data,
      userId: userData?.id,
      role: "admin",
    };

    try {
      const response = await axios.post(
        `${DEV_SERVER_URL}/auth/changepassword`,
        newData
      );
      if (response.status === 200) {
        setLoading(false);

        toast({
          title: "Password Changed",
          description: "Your password has been updated successfully",
        });
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
      toast({
        title: "Password Change Failed",
        description: error?.response?.data?.message || "An error occurred",
      });
    }
  };

  const togglePasswordVisibility = (field: keyof typeof showPassword) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
      {["oldPassword", "newPassword", "confirmPassword"].map((field) => (
        <div key={field} className="space-y-2">
          <Label htmlFor={field}>
            {field === "oldPassword"
              ? "Current Password"
              : field === "newPassword"
              ? "New Password"
              : "Confirm New Password"}
          </Label>
          <div className="relative">
            <Input
              disabled={isLoading}
              id={field}
              type={showPassword[field] ? "text" : "password"}
              placeholder={`Enter ${
                field === "oldPassword" ? "current" : "new"
              } password`}
              {...register(field, {
                required: `${field} is required`,
                minLength:
                  field !== "oldPassword"
                    ? {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      }
                    : undefined,
              })}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => togglePasswordVisibility(field)}
            >
              {showPassword[field] ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword[field] ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          {errors[field] && (
            <p className="text-sm text-red-600">{errors[field]?.message}</p>
          )}
        </div>
      ))}
      {newPassword && <PasswordStrengthMeter password={newPassword} />}
      <Button disabled={isLoading} type="submit" className="w-full">
        {isLoading ? (
          <Loader2 className="animate-spin h-2 w-2" />
        ) : (
          "Change Password"
        )}
      </Button>
    </form>
  );
}
