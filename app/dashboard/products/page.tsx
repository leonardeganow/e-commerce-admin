"use client";

import { AddEditProductForm } from "@/components/products/add-new-product";
import { AllProducts } from "@/components/products/all-products";
import { CategoriesManagement } from "@/components/products/categories-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import productStore from "@/store/productStore";
import { Product } from "@/types/global";
import { useState } from "react";

export default function ProductsPage() {
  // const [activeTab, setActiveTab] = useState("all-products");
  // const [product, setProduct] = useState<Product | undefined>();

  const { activeTab, setActiveTab ,product,setProduct } = productStore()

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
          <TabsTrigger value="add/edit-new-product">
            Add/Edit New Product
          </TabsTrigger>
          {/* <TabsTrigger value="low-stock-alerts">Low Stock Alerts</TabsTrigger> */}
          <TabsTrigger value="categories-management">
            Categories Management
          </TabsTrigger>
          {/* <TabsTrigger value="product-bundling">Product Bundling</TabsTrigger> */}
        </TabsList>
        <TabsContent value="all-products">
          <AllProducts
            setActiveTab={setActiveTab}
            setProduct={setProduct}
            product={product}
          />
        </TabsContent>
        <TabsContent value="add/edit-new-product">
          <AddEditProductForm product={product} setProduct={setProduct} />
        </TabsContent>
        {/* <TabsContent value="low-stock-alerts">
          <LowStockAlerts />
        </TabsContent> */}
        <TabsContent value="categories-management">
          <CategoriesManagement setProduct={setProduct} />
        </TabsContent>
        {/* <TabsContent value="product-bundling">
          <ProductBundling />
        </TabsContent> */}
      </Tabs>
    </div>
  );
}
