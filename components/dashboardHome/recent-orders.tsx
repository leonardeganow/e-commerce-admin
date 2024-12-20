"use client";
import { moneyFormatter } from "@/app/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { OrderViewModal } from "../orders/OrderViewModal";
import { useState } from "react";

export function RecentOrders({ data }) {
  const [selectedOrder, setSelectedOrder] = useState(null); // Track the currently selected order

  return (
    <div>
      {data?.length === 0 ? (
        <div className=" text-center">No recent orders</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.map((order) => {
              return (
                <TableRow key={order._id}>
                  <TableCell>{order._id}</TableCell>
                  <TableCell>{order?.items[0]?.product?.name}</TableCell>
                  <TableCell>{order?.user?.name}</TableCell>
                  <TableCell>
                    {moneyFormatter.format(order.totalAmount)}
                  </TableCell>
                  <TableCell>
                    {order.orderStatus === "shipped" ? (
                      <Badge className="bg-blue-500 text-white">
                        {order.orderStatus}
                      </Badge>
                    ) : order.orderStatus === "cancelled" ? (
                      <Badge className="bg-red-500 text-white">
                        {order.orderStatus}
                      </Badge>
                    ) : order.orderStatus === "refunded" ? (
                      <Badge className="bg-yellow-500 text-white">
                        {order.orderStatus}
                      </Badge>
                    ) : order.orderStatus === "delivered" ? (
                      <Badge className="bg-green-500 text-white">
                        {order.orderStatus}
                      </Badge>
                    ) : (
                      <Badge className="">{order.orderStatus}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>

          {selectedOrder && (
            <OrderViewModal
              order={selectedOrder}
              open={Boolean(selectedOrder)}
              onOpenChange={(open) => {
                if (!open) setSelectedOrder(null); // Close modal
              }}
            />
          )}
        </Table>
      )}
    </div>
  );
}
