"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'

// Mock data for low stock products
const lowStockProducts = [
  { id: 1, name: "Product 1", category: "Category A", stock: 5, threshold: 10 },
  { id: 2, name: "Product 2", category: "Category B", stock: 3, threshold: 15 },
  { id: 3, name: "Product 3", category: "Category A", stock: 8, threshold: 20 },
  { id: 4, name: "Product 4", category: "Category C", stock: 2, threshold: 10 },
]

export function LowStockAlerts() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="h-5 w-5 text-yellow-500" />
        <h2 className="text-xl font-semibold">Low Stock Alerts</h2>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Current Stock</TableHead>
            <TableHead>Threshold</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {lowStockProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell className="text-red-500 font-semibold">{product.stock}</TableCell>
              <TableCell>{product.threshold}</TableCell>
              <TableCell>
                <Button size="sm">Restock</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

