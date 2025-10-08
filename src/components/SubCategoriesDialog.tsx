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

import { getCategories, type CategoryPayload } from "@/service/apiCategory";

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

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");

  console.log("📊 Current state:", {
    open,
    selectedCategory,
    subCategoryName,
    subCategoryDescription,
  });

  const { data: categories } = useQuery<Array<{ id: number; name: string }>>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  useEffect(() => {
    if (open) {
      if (mode === "edit" && initialData) {
        setSelectedCategory(String(initialData.category_id));
        setSubCategoryName(initialData.name);
        setSubCategoryDescription(initialData.description);
      } else if (mode === "create") {
        setSelectedCategory("");
        setSubCategoryName("");
        setSubCategoryDescription("");
      }
    }
  }, [open, mode, initialData]);

  const mutation = useMutation({
    mutationFn: (data: {
      name: string;
      description: string;
      category_id: number;
    }) => {
      return mode === "create"
        ? createSubcategory(data)
        : updateSubcategory(Number(id), data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      toast.success(
        `Subcategory ${mode === "create" ? "created" : "updated"} successfully`
      );

      setSelectedCategory("");
      setSubCategoryName("");
      setSubCategoryDescription("");
      setOpen(false);
    },
    onError: (err) => {
      console.error("Mutation error:", err);
      toast.error(`Failed to ${mode} subcategory`);

      if (err instanceof Error) {
        console.error("Error message:", err.message);
        toast.warning(`Details: ${err.message}`);
      } else {
        console.error("Unknown error:", err);
        toast.info("Unexpected error occurred. Please try again.");
      }
    },
  });

  const handleSave = () => {
    console.log("Current values:", {
      selectedCategory,
      subCategoryName,
      subCategoryDescription,
    });

    if (!selectedCategory || !subCategoryName.trim()) {
      console.warn("Validation failed - missing required fields");
      toast.error("Please fill all required fields!");
      return;
    }

    const payload = {
      name: subCategoryName,
      description: subCategoryDescription,
      category_id: Number(selectedCategory),
    };

    mutation.mutate(payload);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    console.log("Dialog open state changed to:", isOpen);
    setOpen(isOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
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
              Main Category *
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={(val) => {
                setSelectedCategory(val);
              }}
            >
              <SelectTrigger className="w-full bg-zinc-50 text-zinc-900 border border-zinc-300 h-[38px] px-3 rounded-md">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-50 text-zinc-900 border border-zinc-300">
                {categories?.map((cat: CategoryPayload, idx) => (
                  <SelectItem key={idx} value={String(idx)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">SubCategory Name *</Label>
            <Input
              id="name"
              placeholder="Enter subcategory name"
              value={subCategoryName}
              onChange={(e) => {
                console.log("✍️ Name changed to:", e.target.value);
                setSubCategoryName(e.target.value);
              }}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={subCategoryDescription}
              onChange={(e) => {
                console.log("✍️ Description changed to:", e.target.value);
                setSubCategoryDescription(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              console.log("❌ Cancel clicked");
              setOpen(false);
            }}
          >
            Cancel
          </Button>
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
