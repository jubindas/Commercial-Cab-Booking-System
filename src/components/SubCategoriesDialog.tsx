/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getCategories } from "@/service/apicategory";
import { createSubcategory, updateSubcategory } from "@/service/apiSubCategory";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: { name: string; description: string; category_id: number };
  id?: string | number;
}

export default function SubCategoriesDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");

  const { data: categories } = useQuery<Array<{ id: number; name: string }>>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedCategory(initialData.category_id);
      setSubCategoryName(initialData.name);
      setSubCategoryDescription(initialData.description);
    }
  }, [mode, initialData]);

  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      category_id: number;
    }) =>
      mode === "create"
        ? createSubcategory(data)
        : updateSubcategory(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      toast.success(`Subcategory ${mode === "create" ? "created" : "updated"}`);

      setSelectedCategory(null);
      setSubCategoryName("");
      setSubCategoryDescription("");
    },
    onError: (err) => {
      console.error(`Failed to ${mode} subcategory:`, err);
      toast.error(`Failed to ${mode} subcategory`);
    },
  });

  const handleSave = () => {
    if (!selectedCategory || !subCategoryName) {
      toast.error("Please fill all required fields!");
      return;
    }

    mutation.mutate({
      name: subCategoryName,
      description: subCategoryDescription,
      category_id: Number(selectedCategory),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            {mode === "create" ? "Add SubCategory" : "Edit SubCategory"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add a SubCategory" : "Edit SubCategory"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Enter subcategory details below."
              : "Update the subcategory details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category" className="text-zinc-700">
              Main Category
            </Label>
            <Select
              value={selectedCategory?.toString() || ""}
              onValueChange={(val) => setSelectedCategory(Number(val))}
            >
              <SelectTrigger className="w-full bg-zinc-50 text-zinc-900 border border-zinc-300 h-[38px] px-3 rounded-md">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-50 text-zinc-900 border border-zinc-300">
                {categories?.map((cat: any) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">SubCategory Name</Label>
            <Input
              id="name"
              placeholder="Enter subcategory name"
              value={subCategoryName}
              onChange={(e) => setSubCategoryName(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={subCategoryDescription}
              onChange={(e) => setSubCategoryDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? mode === "create"
                ? "Saving..."
                : "Updating..."
              : mode === "create"
              ? "Save"
              : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
