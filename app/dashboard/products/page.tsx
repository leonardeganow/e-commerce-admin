"use client";

import { AddProductForm } from "@/components/products/add-new-product";
import { AllProducts } from "@/components/products/all-products";
import { CategoriesManagement } from "@/components/products/categories-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState("all-products");

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Product Management</h1>
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList>
          <TabsTrigger value="all-products">All Products</TabsTrigger>
          <TabsTrigger value="add-new-product">Add New Product</TabsTrigger>
          {/* <TabsTrigger value="low-stock-alerts">Low Stock Alerts</TabsTrigger> */}
          <TabsTrigger value="categories-management">
            Categories Management
          </TabsTrigger>
          {/* <TabsTrigger value="product-bundling">Product Bundling</TabsTrigger> */}
        </TabsList>
        <TabsContent value="all-products">
          <AllProducts />
        </TabsContent>
        <TabsContent value="add-new-product">
          <AddProductForm />
        </TabsContent>
        {/* <TabsContent value="low-stock-alerts">
          <LowStockAlerts />
        </TabsContent> */}
        <TabsContent value="categories-management">
          <CategoriesManagement />
        </TabsContent>
        {/* <TabsContent value="product-bundling">
          <ProductBundling />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
