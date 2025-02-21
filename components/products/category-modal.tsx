"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Category } from "@/types/global";
import { Loader2 } from "lucide-react";

interface CategoryModalProps {
  isOpen: boolean;
  loading: boolean;
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSave: (category: any) => void;
  onAdd: (name: string) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onDelete: (id: any) => void;
  selectedCategory?: Category | undefined;
}

export function CategoryModal({
  isOpen,
  onClose,
  onSave,
  loading,
  onAdd,
  onDelete,
  selectedCategory,
}: CategoryModalProps) {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(selectedCategory?.name || "");
  }, [selectedCategory]);

  const handleEdit = () => {
    if (name.trim()) {
      onSave({
        id: selectedCategory?._id,
        name: name.trim(),
      });
      onClose();
    }
  };

  const handleAdd = () => {
    if (name.trim()) {
      onAdd(name.trim());
    }
  };

  const handleDelete = () => {
    if (selectedCategory) {
      onDelete(selectedCategory._id);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {selectedCategory ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription>
            {selectedCategory
              ? "Make changes to the category here."
              : "Enter the details for the new category."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-4"
              placeholder="Category Name"
              aria-label="Category Name"
            />
          </div>
        </div>
        <DialogFooter>
          {selectedCategory && (
            <Button
              variant="destructive"
              onClick={handleDelete}
              aria-label="Delete Category"
            >
              {loading ? (
                <span>
                  {" "}
                  <Loader2 className="animate-spin" />
                  Please wait
                </span>
              ) : (
                "Delete"
              )}
            </Button>
          )}

          {loading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              onClick={selectedCategory ? handleEdit : handleAdd}
              disabled={!name.trim()}
              aria-label={selectedCategory ? "Save Changes" : "Add Category"}
            >
              {selectedCategory ? "Save Changes" : "Add Category"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
