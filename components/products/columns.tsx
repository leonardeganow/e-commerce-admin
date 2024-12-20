/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

import { PencilIcon, TrashIcon } from "lucide-react";
import { Button } from "../ui/button";
import productStore from "@/store/productStore";
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
import { useDeleteProduct } from "@/hooks/productHook";
import { Badge } from "../ui/badge";

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "image",
    header: "Product Image",
    cell: ({ row }: any) => {
      const image = row.original.image;
      return (
        <div className=" ">
          <img
            src={image}
            alt="product image"
            width={10}
            height={10}
            className="h-10 w-10 object-cover rounded-full"
          />
        </div>
      );
    },
  },
  { accessorKey: "price", header: "Price" },
  {
    accessorKey: "stock",
    header: "Stock",
    cell: ({ row }: any) => {
      const stock = row.original.stock;
      return (
        <div className=" ">
         {stock === 0 ? <Badge variant={"destructive"}>Out of stock</Badge> : stock}
        </div>
      );
    },
  },
  {
    header: "actions",
    id: "actions",
    cell: ({ row }: any) => {
      const product = row.original;

      const { setProduct, setActiveTab } = productStore();

      const { mutate, isPending } = useDeleteProduct();

      return (
        <div className="space-x-2">
          <Button
            onClick={() => {
              setProduct(product);
              setActiveTab("add/edit-new-product");
            }}
            variant="outline"
            size="sm"
            className="h-8 px-2 lg:px-3"
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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  product.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  disabled={isPending}
                  onClick={() => mutate({ productId: product._id })}
                >
                  {isPending ? "deleting..." : "Continue "}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
