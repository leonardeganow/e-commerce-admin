"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { DEV_SERVER_URL } from "@/app/constants";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/types/global";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";

interface AllProductsProps {
  product: Product | undefined;
  setActiveTab: (tabName: string) => void;
  setProduct: (product: Product | undefined) => void;
}

export function AllProducts(props: AllProductsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const { toast } = useToast();

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${DEV_SERVER_URL}/product/products/allproducts`
      );
      return response?.data?.productsWithCategoryNames;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const deleteProducts = async (productId: string | undefined) => {
    setLoading(true);
    try {
      const response = await axios.delete(
        `${DEV_SERVER_URL}/product/products/${productId}`
      );
      if (response.status === 200) {
        refetch();
        setLoading(false);
        toast({
          title: "Product management",
          description: "The product has been deleted from the system",
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Product management",
        description: error?.response.data.message || "An error occured",
      });
    }
  };

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchAllProducts,
  });

  const filteredProducts = data?.filter(
    (product: Product) =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product?.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (props.product) {
      props.setProduct(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(10).fill(0).map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-40"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10"></Skeleton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button>Export to CSV</Button>
      </div>

      <Card>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts?.map((product: Product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.categoryName}</TableCell>
                  <TableCell>
                    {product.currency === "GHS" && "₵"}
                    {product.price.toFixed(2)}
                  </TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          props.setProduct(product);
                          props.setActiveTab("add/edit-new-product");
                        }}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline">
                            {" "}
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete the product.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              disabled={loading}
                              onClick={() => deleteProducts(product._id)}
                            >
                              {loading ? "deleteing..." : "Continue "}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
