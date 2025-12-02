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

import { createCategory, updateCategory } from "@/service/apiCategory";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: { name: string; description?: string; image?: string };
  id?: string | number;
}

export default function MainCategoryDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialg] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "",  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description ?? "",
        
      });

      if (initialData.image) {
        setPreviewUrl(initialData.image);
      }
    }
  }, [mode, initialData]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  const mutation = useMutation({
    mutationFn: async (payload: {
      name: string;
      description?: string;
      is_active: boolean;
    }) => {
      const fd = new FormData();
      fd.append("name", payload.name);
      fd.append("description", payload.description || "");
      fd.append("_method","PUT")

      if (imageFile) fd.append("image", imageFile);

      console.log(
        mode === "create" ? "Create Payload:" : "Update Payload:",
        Object.fromEntries(fd.entries())
      );

      return mode === "create"
        ? createCategory(fd)
        : updateCategory(String(id), fd);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(`Category ${mode === "create" ? "created" : "updated"} successfully`);

      setFormData({ name: "", description: "" });
      setImageFile(null);
      setPreviewUrl(null);
      setOpenDialg(false);
    },

    onError: () => {
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

    mutation.mutate({
      name: formData.name,
      description: formData.description || "",
      is_active: true,
    });
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialg}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add a Main Category" : "Edit Main Category"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create" ? "Enter category details." : "Update category details."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              placeholder="Enter category name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add a short description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="image">Category Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="h-28 w-28 object-cover rounded-md border border-zinc-300 mt-2"
              />
            )}
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
