/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { DEV_SERVER_URL } from "@/app/constants";
import useUserStore from "@/store/userDataStore";
import { useEffect } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

type StoreFormValues = {
  name: string;
  image: string | null; // Base64 string
};

export function StoreForm() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoader, setInitialLoader] = useState(false);

  const { toast } = useToast();
  const { userData } = useUserStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StoreFormValues>();

  const handleImageChange = (file: File | null) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setValue("image", base64String); // Set Base64 string in form data
      setPreviewUrl(base64String); // Update preview
    };
    reader.readAsDataURL(file);
  };

  const onStoreSubmit = async (data: StoreFormValues) => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${DEV_SERVER_URL}/auth/storesettings`,
        {
          ...data,
          adminId: userData?.id,
        }
      );

      if (response.status === 200) {
        setIsLoading(false);
        toast({
          title: "Store settings updated",
          description: response.data.message,
        });
      }
    } catch (error) {
      console.error("Error updating store settings:", error);
      setIsLoading(false);

      toast({
        title: "Error updating store settings",
        description: error?.response?.data?.message || "An error occurred.",
      });
    }
  };

  const fetchStoreData = async () => {
    setInitialLoader(true);
    try {
      const response = await axios.get(`${DEV_SERVER_URL}/auth/storeinfo`);
      console.log(response);

      if (response.status === 200) {
        const { name, image } = response.data.store[0];
        setInitialLoader(false);
        // Pre-fill the form fields
        setValue("name", name);
        setValue("image", image);
        setPreviewUrl(image); // Set preview URL if image exists
      }
    } catch (error) {
      setInitialLoader(false);

      console.error("Error fetching store data:", error);
      toast({
        title: "Error fetching store data",
        description: "Could not load store information.",
      });
    }
  };

  // Fetch existing store data on mount
  useEffect(() => {
      fetchStoreData();

  }, []);

  return (
    <div>
      {initialLoader ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <form onSubmit={handleSubmit(onStoreSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store Name</Label>
            <Input
              id="name"
              placeholder="Enter store name"
              {...register("name", { required: "Store name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Store Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e.target.files?.[0] || null)}
            />
            {errors.image && (
              <p className="text-sm text-red-600">{errors.image.message}</p>
            )}
          </div>
          {previewUrl && (
            <div className="mt-4">
              <Label>Preview:</Label>
              <Image
                src={previewUrl}
                alt="Store preview"
                width={200}
                height={200}
                className="mt-2 max-w-full h-auto rounded-md shadow-md"
              />
            </div>
          )}
          <Button disabled={isLoading} type="submit" className="w-full">
            Update Store
          </Button>
        </form>
      )}
    </div>
  );
}
