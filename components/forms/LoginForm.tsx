"use client";

import { useState } from "react";
// import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import useUserStore from "@/store/userDataStore";
import { DEV_SERVER_URL } from "../../app/constants";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface FormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { setUserData } = useUserStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get("redirect");

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`${DEV_SERVER_URL}/auth/login`, {...data, role: "admin"});
      setIsLoading(false);
      console.log(response);
      
      if (response) {
        setUserData(response.data.user);
        Cookies.set("authToken", response.data.accessToken, { expires: 7 });
        // Redirect to the original page or to the home page if no redirect param
        router.push(redirectUrl || "/dashboard");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      if (error.response.data.message) {
        toast({
          title: "Login Failed",
          description: error.response.data.message,
        });
      } else {
        toast({
          title: "Login Failed",
          description: "An error occurred while attempting to login",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            {/* <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Logo"
              width={64}
              height={64}
              className="rounded-full"
            /> */}
            Shoebox-admin
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Login to your account
          </CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Entered value does not match email format",
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </CardFooter>
        </form>
        <div className="text-sm text-center text-gray-500">
          <Link
            href="/forgotpassword"
            className="hover:text-primary underline underline-offset-4"
          >
            Forgot your password?
          </Link>
          <Link
            className="hover:text-primary underline underline-offset-4"
            href="/register"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}
