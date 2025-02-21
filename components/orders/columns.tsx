/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDate_util, moneyFormatter } from "@/app/utils/index";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { OrderViewModal } from "./OrderViewModal";
import { useState } from "react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Order = {
  id: string;
  customerName: string;
  status: "pending" | "processing" | "success" | "failed";
  totalAmount: number;
  paymentStatus: "pending" | "success" | "failed";
  paymentReference: string;
  contactNumber: string;
  date: string;
};

export const Columns: ColumnDef<Order>[] = [
  {
    accessorKey: "_id",
    header: "order Id",
    cell: ({ row }) => {
      const text: string = row.getValue("_id");
      return (
        <div className="text-center w-14 text-ellipsis truncate">{text}</div>
      );
    },
  },
  {
    accessorKey: "user.name",
    enableColumnFilter: true,
    filterFn: "includesString",
    header: () => {
      return <Button variant="ghost">Name</Button>;
    },
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalAmount"));
      const formatted = moneyFormatter(amount);
      return <div className="">{formatted}</div>;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const text: string = row.getValue("paymentStatus");
      return (
        <Badge
          className={`text-center  text-ellipsis truncate ${
            text === "success"
              ? "bg-green-500 text-white"
              : text === "refunded"
              ? "bg-yellow-500 text-white"
              : ""
          }`}
        >
          {text}
        </Badge>
      );
    },
  },
  {
    accessorKey: "paymentReference",
    header: "Payment Reference",
  },
  {
    accessorKey: "contactNumber",
    header: "contact Number",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
    cell: ({ row }) => {
      const text: string = row.getValue("orderStatus");
      return (
        <Badge
          className={`text-center  text-ellipsis truncate ${
            text === "shipped"
              ? "bg-blue-500 text-white"
              : text === "cancelled"
              ? "bg-red-500"
              : text === "refunded"
              ? "bg-yellow-500"
              : text === "delivered"
              ? "bg-green-500"
              : ""
          }`}
        >
          {text}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      const formatted = formatDate_util(date, "yyyy-MM-dd");

      return <div className="">{formatted}</div>;
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original;
      const [open, setOpen] = useState(false);

      return (
        <div className="text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setOpen(true)}
            className="h-8 px-2 lg:px-3"
          >
            View
          </Button>
          <OrderViewModal order={order} open={open} onOpenChange={setOpen} />
        </div>
      );
    },
  },
];
