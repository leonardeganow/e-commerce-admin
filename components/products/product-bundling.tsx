"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for products and bundles
const products = [
  { id: 1, name: "Product 1", price: 19.99 },
  { id: 2, name: "Product 2", price: 29.99 },
  { id: 3, name: "Product 3", price: 39.99 },
  { id: 4, name: "Product 4", price: 49.99 },
]

const initialBundles = [
  { id: 1, name: "Summer Bundle", products: [1, 2], discount: 10 },
  { id: 2, name: "Winter Bundle", products: [3, 4], discount: 15 },
]

export function ProductBundling() {
  const [bundles, setBundles] = useState(initialBundles)
  const [newBundle, setNewBundle] = useState({ name: "", products: [], discount: 0 })

  const handleAddBundle = () => {
    if (newBundle.name && newBundle.products.length > 0) {
      setBundles([...bundles, { ...newBundle, id: bundles.length + 1 }])
      setNewBundle({ name: "", products: [], discount: 0 })
    }
  }

  const handleProductSelection = (productId: number) => {
    setNewBundle(prev => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter(id => id !== productId)
        : [...prev.products, productId]
    }))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Create New Bundle</h3>
        <div className="space-y-2">
          <Label htmlFor="bundleName">Bundle Name</Label>
          <Input
            id="bundleName"
            value={newBundle.name}
            onChange={(e) => setNewBundle({ ...newBundle, name: e.target.value })}
            placeholder="Enter bundle name"
          />
        </div>
        <div className="space-y-2">
          <Label>Select Products</Label>
          <div className="flex flex-wrap gap-2">
            {products.map((product) => (
              <Button
                key={product.id}
                variant={newBundle.products.includes(product.id) ? "default" : "outline"}
                onClick={() => handleProductSelection(product.id)}
              >
                {product.name}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bundleDiscount">Discount Percentage</Label>
          <Input
            id="bundleDiscount"
            type="number"
            min="0"
            max="100"
            value={newBundle.discount}
            onChange={(e) => setNewBundle({ ...newBundle, discount: Number(e.target.value) })}
          />
        </div>
        <Button onClick={handleAddBundle}>Create Bundle</Button>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Existing Bundles</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Bundle Name</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bundles.map((bundle) => (
              <TableRow key={bundle.id}>
                <TableCell>{bundle.name}</TableCell>
                <TableCell>
                  {bundle.products.map(id => products.find(p => p.id === id)?.name).join(", ")}
                </TableCell>
                <TableCell>{bundle.discount}%</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

