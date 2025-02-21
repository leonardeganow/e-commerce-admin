'use client'

// import { useState } from 'react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
// import { CalendarDateRangePicker } from "@/components/ui/date-range-picker"
import { ArrowDownIcon, ArrowUpIcon, DollarSignIcon, ShoppingCartIcon, UsersIcon } from 'lucide-react'

export default function ReportsPage() {
  // const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() })

  // Dummy data for demonstration
  const monthlySales = [
    { month: 'January', sales: 12000, orders: 350, newCustomers: 65 },
    { month: 'February', sales: 15000, orders: 425, newCustomers: 59 },
    { month: 'March', sales: 18000, orders: 500, newCustomers: 80 },
    { month: 'April', sales: 22000, orders: 600, newCustomers: 81 },
    { month: 'May', sales: 26000, orders: 700, newCustomers: 56 },
    { month: 'June', sales: 30000, orders: 800, newCustomers: 55 },
  ]

  const topProducts = [
    { name: 'Product A', sales: 1234, revenue: 12340 },
    { name: 'Product B', sales: 1000, revenue: 10000 },
    { name: 'Product C', sales: 876, revenue: 8760 },
    { name: 'Product D', sales: 765, revenue: 7650 },
    { name: 'Product E', sales: 543, revenue: 5430 },
  ]

  const customerSegments = [
    { segment: 'New', count: 573, percentageChange: 12.7 },
    { segment: 'Returning', count: 1205, percentageChange: 5.3 },
    { segment: 'Loyal', count: 879, percentageChange: -2.1 },
    { segment: 'At Risk', count: 234, percentageChange: 8.9 },
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Reports</h1>
        {/* <CalendarDateRangePicker date={dateRange} setDate={setDateRange} /> */}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Revenue
            </CardTitle>
            <DollarSignIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Orders
            </CardTitle>
            <ShoppingCartIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              New Customers
            </CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +12.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Month</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>New Customers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {monthlySales.map((month) => (
                <TableRow key={month.month}>
                  <TableCell>{month.month}</TableCell>
                  <TableCell>${month.sales.toLocaleString()}</TableCell>
                  <TableCell>{month.orders}</TableCell>
                  <TableCell>{month.newCustomers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Sales</TableHead>
                <TableHead>Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.name}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.sales}</TableCell>
                  <TableCell>${product.revenue.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Segments</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Segment</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerSegments.map((segment) => (
                <TableRow key={segment.segment}>
                  <TableCell>{segment.segment}</TableCell>
                  <TableCell>{segment.count}</TableCell>
                  <TableCell>
                    <span className={segment.percentageChange >= 0 ? "text-green-600" : "text-red-600"}>
                      {segment.percentageChange >= 0 ? (
                        <ArrowUpIcon className="inline h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDownIcon className="inline h-4 w-4 mr-1" />
                      )}
                      {Math.abs(segment.percentageChange)}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

