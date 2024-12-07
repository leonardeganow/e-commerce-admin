"use client";

import { useState } from "react";
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

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  description: z.string().optional(),
  price: z.number().min(0, {
    message: "Price must be a positive number.",
  }),
  currency: z.string().default("GHS"),
  stock: z.number().int().min(0, {
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

// Mock categories data (replace with actual data from your backend)
const categories = [
  { id: "1", name: "Electronics" },
  { id: "2", name: "Clothing" },
  { id: "3", name: "Home & Garden" },
];

export function AddProductForm() {
  const [colors, setColors] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const toast = useToast();
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
      image: undefined,
      colors: [],
      sizes: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Include colors and sizes in the form data
    const productData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key === "image") {
        productData.append(key, value as File);
      } else if (key !== "colors" && key !== "sizes") {
        productData.append(key, String(value));
      }
    });
    colors.forEach((color) => productData.append("colors[]", color));
    sizes.forEach((size) => productData.append("sizes[]", size));

    console.log("Form Data:", Object.fromEntries(productData));
    toast({
      title: "Product added successfully",
      description: "The product has been added to the database.",
    });
    // Here you would typically send this data to your backend API
    // Example: await fetch('/api/products', { method: 'POST', body: productData })
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
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
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
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
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
                <img
                  src={imagePreview}
                  alt="Preview"
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
        <Button type="submit">Add Product</Button>
      </form>
    </Form>
  );
}
