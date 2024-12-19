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

export function RecentOrders({ data }) {
  return (
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
        {data?.map((order) => (
          <TableRow key={order._id}>
            <TableCell>{order._id}</TableCell>
            <TableCell>{order?.items[0]?.product?.name}</TableCell>
            <TableCell>{order?.user?.name}</TableCell>
            <TableCell>{moneyFormatter.format(order.totalAmount)}</TableCell>
            <TableCell>{order.orderStatus}</TableCell>
            <TableCell>
              <Button variant="outline">view</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
