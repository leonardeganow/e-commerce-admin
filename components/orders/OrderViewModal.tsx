/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import { Order, OrderItem } from "./types"
import { formatDate_util, moneyFormatter } from "@/app/utils/index";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  CreditCard,
  Package,
  Phone,
  User,
  Truck,
  CheckCircle,
  XCircle,
  AlertCircle,
  ShoppingCart,
  ClockArrowDown,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useChangeOrderStatus, useRefund } from "@/hooks/orderHook";
// import { updateOrderStatus } from "@/app/api/orders"
// import { toast } from "@/components/ui/use-toast"

interface OrderViewModalProps {
  order: Order;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderViewModal({
  order,
  open,
  onOpenChange,
}: OrderViewModalProps) {
  const [status, setStatus] = useState();

  const { mutate: handleStatusChange, isPending } =
    useChangeOrderStatus(setStatus);

  const { mutate: handleRefund, isPending: refundLoader } = useRefund();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
    }
  };

  useEffect(() => {
    setStatus(order.orderStatus);
  }, [order]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-clip-text text-transparent bg-blue-500">
            Order Details
          </DialogTitle>
        </DialogHeader>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid gap-6 py-4"
        >
          <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-2">
              <Package className="h-6 w-6 text-blue-500" />
              <span className="font-medium text-gray-700">Order ID:</span>
            </div>
            <span className="font-mono text-sm bg-white px-2 py-1 rounded-md shadow-inner">
              {order._id}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              icon={<User className="h-5 w-5 text-blue-500" />}
              title="Customer"
              value={order?.user?.name}
            />
            <InfoCard
              icon={<Phone className="h-5 w-5 text-blue-500" />}
              title="Contact"
              value={order.contactNumber}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              icon={<CreditCard className="h-5 w-5 text-blue-500" />}
              title="Total Amount"
              value={moneyFormatter(order.totalAmount)}
              valueClassName="text-lg font-bold text-green-600"
            />
            <InfoCard
              icon={<Calendar className="h-5 w-5 text-blue-500" />}
              title="Date"
              value={formatDate_util(order.createdAt, "yyyy-MM-dd HH:mm:ss")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <span className="font-medium text-gray-700">Payment Status:</span>
              <Badge
                className={`${
                  order.paymentStatus === "success"
                    ? "bg-green-100 text-green-800"
                    : order.paymentStatus === "failed"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                } px-3 py-1 rounded-lg text-sm font-medium flex items-center w-fit`}
              >
                {getStatusIcon(order.paymentStatus)}
                <span className="ml-2">{order.paymentStatus}</span>
              </Badge>
            </div>
            <InfoCard
              icon={<CreditCard className="h-5 w-5 text-gray-500" />}
              title="Payment Ref"
              value={order.paymentReference}
              valueClassName="font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            {status !== "refunded" && (
              <Button
                disabled={refundLoader}
                onClick={() =>
                  handleRefund({
                    orderId: order._id,
                    refundAmount: order.totalAmount,
                  })
                }
                className="bg-yellow-500"
              >
                Refund Customer
              </Button>
            )}
          </div>
          <div className="space-y-2">
            <span className="font-medium text-gray-700 flex items-center gap-2">
              Order Status:{" "}
              {isPending && <Loader2 className="animate-spin h-2 w-2 " />}{" "}
            </span>
            <Select
              value={status}
              onValueChange={(param) => {
                handleStatusChange({ orderId: order._id, orderStatus: param });
              }}
              disabled={isPending}
            >
              <SelectTrigger className="w-full bg-white border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="refunded" disabled>
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    Refunded
                  </div>
                </SelectItem>
                <SelectItem
                  value="cancelled"
                  disabled={
                    status === "delivered" ||
                    status === "shipped" ||
                    status === "cancelled" ||
                    status === "refunded"
                  }
                >
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    cancelled
                  </div>
                </SelectItem>
                <SelectItem
                  value="processing"
                  disabled={
                    status === "delivered" ||
                    status === "shipped" ||
                    status === "cancelled" ||
                    status === "refunded"
                  }
                >
                  <div className="flex items-center">
                    <ClockArrowDown className="h-4 w-4 text-yellow-500 mr-2" />
                    Processing
                  </div>
                </SelectItem>
                <SelectItem
                  value="shipped"
                  disabled={
                    status === "delivered" ||
                    status === "cancelled" ||
                    status === "refunded"
                  }
                >
                  <div className="flex items-center">
                    <Truck className="h-4 w-4 text-blue-500 mr-2" />
                    shipped
                  </div>
                </SelectItem>
                <SelectItem
                  value="delivered"
                  disabled={
                    status === "delivered" ||
                    status === "cancelled" ||
                    status === "processing" ||
                    status === "refunded"
                  }
                >
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    delivered
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingCart className="h-5 w-5 text-purple-500" />
              <span className="font-medium text-gray-700">Order Items:</span>
            </div>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                 
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item: OrderItem) => {
                    return (
                      <tr key={item._id}>
                      
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex gap-2">
                        <img
                              src={item.product.image}
                              alt="product image"
                              width={5}
                              height={5}
                              className="h-5 w-5 object-cover rounded-full"
                            />
                          {item.product.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moneyFormatter(item.price)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moneyFormatter(item.price * item.quantity)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
        <div className="flex justify-end mt-6">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | undefined;
  valueClassName?: string;
}

function InfoCard({ icon, title, value, valueClassName = "" }: InfoCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm space-y-2">
      <div className="flex items-center space-x-2">
        {icon}
        <span className="font-medium text-gray-700">{title}:</span>
      </div>
      <span className={`block ${valueClassName}`}>{value}</span>
    </div>
  );
}
