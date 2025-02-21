"use client";

import DataTable from "./data-table";
import { useGetOrders } from "@/hooks/orderHook";
import { Loader2, ShoppingCart } from "lucide-react";
import { Columns } from "./columns";

export function OrdersPage() {
  const { data, isLoading, isError } = useGetOrders();

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <Loader2 className="animate-spin h-5 w-5" />
      </div>
    );
  }

  if (isError) {
    return <p>Error: an error occurred</p>;
  }

  return (
    <div className="container mx-auto p-10">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <ShoppingCart className="h-8 w-8 mr-4" />
          <h1 className="text-3xl font-bold">Orders</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Manage and track your customer orders
        </p>
      </div>
      <div>
        <DataTable columns={Columns} data={data} />
      </div>
    </div>
  );
}
