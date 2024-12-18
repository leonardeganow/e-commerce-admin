"use client";
import DataTable from "./data-table";
import { columns } from "./columns";
import { useGetOrders } from "@/hooks/orderHook";
import { Loader2 } from "lucide-react";

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
    return <p>Error: an error occured</p>;
  }
  return (
    <div className="container mx-auto  p-10">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
