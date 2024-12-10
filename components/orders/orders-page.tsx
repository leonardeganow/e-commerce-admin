"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const orderTypes = [
  { value: "all", label: "All Orders" },
  { value: "pending", label: "Pending Orders" },
  { value: "fulfilled", label: "Fulfilled Orders" },
  //   { value: "returns", label: "Returns & Cancellations" },
  //   { value: "shipping", label: "Manage Shipping Labels" },
];

const mockOrders = [
  {
    id: "001",
    customer: "John Doe",
    date: "2023-05-01",
    total: "$150.00",
    status: "Pending",
  },
  {
    id: "002",
    customer: "Jane Smith",
    date: "2023-05-02",
    total: "$200.00",
    status: "Fulfilled",
  },
  {
    id: "003",
    customer: "Bob Johnson",
    date: "2023-05-03",
    total: "$100.00",
    status: "Returned",
  },
  {
    id: "004",
    customer: "Alice Brown",
    date: "2023-05-04",
    total: "$300.00",
    status: "Pending",
  },
  {
    id: "005",
    customer: "Charlie Davis",
    date: "2023-05-05",
    total: "$250.00",
    status: "Fulfilled",
  },
];

export function OrdersPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          {orderTypes.map((type) => (
            <TabsTrigger key={type.value} value={type.value}>
              {type.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {orderTypes.map((type) => (
          <TabsContent key={type.value} value={type.value}>
            <Card>
              <CardHeader>
                <CardTitle>{type.label}</CardTitle>
                <CardDescription>
                  Manage your {type.label.toLowerCase()}.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockOrders
                      .filter(
                        (order) =>
                          activeTab === "all" ||
                          (activeTab === "pending" &&
                            order.status === "Pending") ||
                          (activeTab === "fulfilled" &&
                            order.status === "Fulfilled") ||
                          (activeTab === "returns" &&
                            order.status === "Returned")
                      )
                      .map((order) => (
                        <TableRow key={order.id}>
                          <TableCell>{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>{order.total}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === "Pending"
                                  ? "default"
                                  : order.status === "Fulfilled"
                                  ? "secondary"
                                  : "destructive"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
