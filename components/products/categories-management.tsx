"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, PlusIcon } from "lucide-react";
import { CategoryModal } from "./category-modal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Category, Product } from "@/types/global";
import axios from "axios";
import { DEV_SERVER_URL } from "@/app/constants";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "../ui/skeleton";

interface CatgoriesManagementProps {
  setProduct: (product: Product | undefined) => void;
}
export function CategoriesManagement(props: CatgoriesManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const { toast } = useToast();

  // Fetch categories
  const getCategories = async (): Promise<Category[]> => {
    const response = await axios.get(`${DEV_SERVER_URL}/product/getcategories`);
    return response.data.data || [];
  };

  const addCategory = async (name: string) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${DEV_SERVER_URL}/product/addcategory`,
        { name }
      );
      setLoading(false);
      return response.data.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      throw new Error(
        error?.response?.data?.message || "Failed to add category"
      );
    }
  };

  // Edit category
  const editCategory = async (category: Category) => {
    setLoading(true);
    try {
      const response = await axios.put(
        `${DEV_SERVER_URL}/product/updatecategory`,
        category
      );
      setLoading(false);
      return response.data.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);

      throw new Error(
        error?.response?.data?.message || "Failed to edit category"
      );
    }
  };

  // Delete category (mocked)
  const deleteCategory = async (id: string) => {
    setLoading(true);

    try {
      const response = await axios.delete(
        `${DEV_SERVER_URL}/product/deletecategory`,
        {
          data: { id },
        }
      );
      setLoading(false);

      return response.data.message;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);

      throw new Error(
        error?.response?.data?.message || "Failed to delete category"
      );
    }
  };

  // Fetch categories query
  const {
    data: categories,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: (message) => {
      toast({
        title: "Category Management",
        description: message || "Category added successfully!",
      });
      refetch();
      handleCloseModal();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Category Management",
        description:
          error.message || "An error occurred while adding the category",
      });
    },
  });

  // Edit category mutation
  const editCategoryMutation = useMutation({
    mutationFn: editCategory,
    onSuccess: (message) => {
      toast({
        title: "Category Management",
        description: message || "Category updated successfully!",
      });
      refetch();
      handleCloseModal();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Category Management",
        description:
          error.message || "An error occurred while updating category",
      });
    },
  });

  // Delete category mutation (mocked)
  const deleteCategoryMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: (message) => {
      toast({
        title: "Category Management",
        description: message || "Category deleted successfully!",
      });
      refetch();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Category Management",
        description:
          error.message || "An error occurred while deleting category",
      });
    },
  });

  // Handlers
  const handleOpenModal = (category?: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(undefined);
    setIsModalOpen(false);
  };

  useEffect(() => {
    props.setProduct(undefined);
  }, [props]);

  if (isLoading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
            <TableHead>
              <Skeleton className="h-4 w-10"></Skeleton>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {new Array(5).fill(0).map((item, i) => {
            return (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-40"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10"></Skeleton>
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-10"></Skeleton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load categories</p>;
  }
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Categories</h2>
        <Button onClick={() => handleOpenModal()}>
          <PlusIcon className="h-4 w-4 mr-2" /> Add Category
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category Name</TableHead>
            <TableHead>Products Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.productsCount}</TableCell>
              <TableCell>
                <div className="space-x-1">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => handleOpenModal(category)}
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CategoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAdd={addCategoryMutation.mutate}
        onDelete={deleteCategoryMutation.mutate}
        onSave={editCategoryMutation.mutate}
        selectedCategory={selectedCategory}
        loading={loading}
      />
    </div>
  );
}
