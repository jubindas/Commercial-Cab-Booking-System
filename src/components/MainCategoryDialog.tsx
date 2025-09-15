import { useState, useEffect } from "react";

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

import { createCategory, updateCategory } from "@/service/apicategory";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: { name: string; description?: string };
  id?: string | number;
}

export default function MainCategoryDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({ name: "", description: "" });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description ?? "",
      });
    }
  }, [mode, initialData]);

  const mutation = useMutation({
    mutationFn: (data: { name: string; description?: string }) =>
      mode === "create"
        ? createCategory(data)
        : updateCategory(String(id), data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(
        `Category ${mode === "create" ? "created" : "updated"} successfully`
      );
      console.log(
        `Category ${mode === "create" ? "created" : "updated"}:`,
        data
      );
      setFormData({ name: "", description: "" });
    },
    onError: (err) => {
      console.error(`Failed to ${mode} category:`, err);
      toast.error(`Failed to ${mode} category`);
    },
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSave() {
    if (!formData.name.trim()) {
      toast.error("Category name is required!");
      return;
    }
    mutation.mutate(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            {mode === "create" ? "Add a Main Category" : "Edit Main Category"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            {mode === "create"
              ? "Enter the category details below. Description is optional."
              : "Update the category details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-zinc-700">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-zinc-700">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add a short description for this category"
              value={formData.description}
              onChange={handleChange}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
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
