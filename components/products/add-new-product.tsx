/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useDropzone } from "react-dropzone";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { DEV_SERVER_URL } from "@/app/constants";
import { Category } from "@/types/global";
import Image from "next/image";
import { Loader2 } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.number().min(1, {
    message: "Price must be a positive number.",
  }),
  currency: z.string().default("GHS"),
  stock: z.number().int().min(1, {
    message: "Stock must be a non-negative integer.",
  }),
  featured: z.boolean().default(false),
  category: z.string().min(1, {
    message: "Please select a category.",
  }),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .png, and .webp formats are supported."
    ),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
});

export function AddProductForm() {
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const fileInputRef = useRef();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      currency: "GHS",
      stock: 0,
      featured: false,
      category: "",
      image: "",
      colors: [],
      sizes: [],
    },
  });

  async function getCategories() {
    try {
      const response = await axios.get(
        `${DEV_SERVER_URL}/product/getcategories`
      );
      if (response.status === 200) {
        setCategories(response.data.data);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
      setCategories([]);
      toast({
        title: "Error fetching categories",
        description:
          error?.response?.data?.message ||
          "Failed to retrieve categories from the server.",
      });
    }
  }
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const productData = {
        name: values.name,
        description: values.description,
        price: values.price,
        currency: values.currency,
        stock: values.stock,
        featured: values.featured,
        categoryId: values.category,
        image: imagePreview,
        colors: colors,
        sizes: sizes,
      };

      const response = await axios.post(
        `${DEV_SERVER_URL}/product/addproduct`,
        productData
      );

      setIsLoading(true);

      if (response.status === 201) {
        setIsLoading(false);
        form.reset();
        setColors([]);
        setSizes([]);
        setImagePreview(null);
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = ""; // This will clear the file input field
        }

        toast({
          title: "Product added successfully",
          description: response?.data.message,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoading(true);
      console.error(error);
      setIsLoading(false);
      toast({
        title: "Error adding product",
        description:
          error?.response?.data?.message ||
          "An error occurred while adding the product to the database.",
      });
    }
  }

  const handleColorAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      setColors([...colors, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const handleSizeAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      e.preventDefault();
      setSizes([...sizes, e.currentTarget.value]);
      e.currentTarget.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: "File too large",
          description: `Please upload an image smaller than ${
            MAX_FILE_SIZE / (1024 * 1024)
          }MB.`,
          variant: "destructive",
        });
        return; // Exit if the file is too large
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter product description"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="1"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Currency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="GHS">GHS</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured Product</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    {categories.length >= 1 && (
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category._id}
                            value={category._id ?? ""}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    )}
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel>Product Image</FormLabel>
                  <FormControl>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        handleImageChange(e);
                        onChange(e.target.files?.[0]);
                      }}
                      {...field}
                    />
                  </FormControl>
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="mt-2 max-w-xs rounded-md"
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color, index) => (
                    <div key={index} className="bg-gray-200 px-2 py-1 rounded">
                      {color}
                      <button
                        type="button"
                        onClick={() =>
                          setColors(colors.filter((_, i) => i !== index))
                        }
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <Input
                    placeholder="Add color and press Enter"
                    onKeyDown={handleColorAdd}
                    className="flex-grow"
                  />
                </div>
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Sizes</FormLabel>
              <FormControl>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, index) => (
                    <div key={index} className="bg-gray-200 px-2 py-1 rounded">
                      {size}
                      <button
                        type="button"
                        onClick={() =>
                          setSizes(sizes.filter((_, i) => i !== index))
                        }
                        className="ml-2 text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                  <Input
                    placeholder="Add size and press Enter"
                    onKeyDown={handleSizeAdd}
                    className="flex-grow"
                  />
                </div>
              </FormControl>
            </FormItem>
          </div>
        </div>
        <Button disabled={isLoading} type="submit">
          {isLoading ? (
            <span className="flex items-center gap-x-2">
              <Loader2 className="animate-spin h-2 w-2" />
              loading
            </span>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </Form>
  );
}

// function ImageDropzone({ onImageChange }) {
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({
//     accept: {
//       "image/*": [".jpeg", ".png", ".webp"],
//     },
//     maxSize: MAX_FILE_SIZE,
//     onDrop: (acceptedFiles) => {
//       if (acceptedFiles.length > 0) {
//         onImageChange(acceptedFiles[0]);
//       }
//     },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer ${
//         isDragActive ? "border-primary" : "border-gray-300"
//       }`}
//     >
//       <input {...getInputProps()} />
//       {isDragActive ? (
//         <p>Drop the image here ...</p>
//       ) : (
//         <p>Drag &lsquo;n&apos; drop an image here, or click to select one</p>
//       )}
//     </div>
//   );
// }
