import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const recentOrders = [
    {
      id: "1234",
      product: "Mechanical Keyboard",
      customer: "John Doe",
      total: "$154.99",
      status: "Shipped",
    },
    {
      id: "1235",
      product: "27\" Monitor",
      customer: "Jane Smith",
      total: "$299.99",
      status: "Processing",
    },
    {
      id: "1236",
      product: "Wireless Mouse",
      customer: "Bob Johnson",
      total: "$49.99",
      status: "Delivered",
    },
    {
      id: "1237",
      product: "USB-C Hub",
      customer: "Alice Brown",
      total: "$79.99",
      status: "Shipped",
    },
    {
      id: "1238",
      product: "External SSD",
      customer: "Charlie Wilson",
      total: "$129.99",
      status: "Processing",
    },
  ]
  
  export function RecentOrders() {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.total}</TableCell>
              <TableCell>{order.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  
  