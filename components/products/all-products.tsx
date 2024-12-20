"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcwIcon } from "lucide-react";

import { Product } from "@/types/global";
import DataTableProducts from "./data-table-products";
import { columns } from "./columns";
import { useFetchAllProducts } from "@/hooks/productHook";

interface AllProductsProps {
  product: Product | undefined;
  setActiveTab: (tabName: string) => void;
  setProduct: (product: Product | undefined) => void;
}

export function AllProducts(props: AllProductsProps) {
  const { data, error, isLoading, isFetching, refetch } = useFetchAllProducts();

  useEffect(() => {
    if (props.product) {
      props.setProduct(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <div className="grid place-items-center pt-10">
        <Loader2 className="animate-spin h-5 w-5" />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end items-center gap-3">
        <Button>Export to CSV</Button>
        <Button onClick={() => refetch()} variant={"outline"}>
          <RefreshCcwIcon />
        </Button>
      </div>
      <DataTableProducts
        columns={columns}
        data={data}
        isRefetching={isFetching}
      />
    </div>
  );
}
