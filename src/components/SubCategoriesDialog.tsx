/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getCategories, type CategoryPayload } from "@/service/apiCategory";

import { createSubcategory, updateSubcategory } from "@/service/apiSubCategory";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: {
    name: string;
    description: string;
    category_id: number;
    image?: string;
  };
  id?: string | number;
}

export default function SubCategoriesDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialg] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subCategoryDescription, setSubCategoryDescription] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  // console.log("📊 Current state:", {
  //   openDialog,
  //   selectedCategory,
  //   subCategoryName,
  //   subCategoryDescription,
  //   previewUrl,
  // });

  const { data: categories, isError } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const activeCategories = categories?.filter(
    (cat: { is_active: number }) => cat.is_active === 1
  );

  console.log("the filterd datas are", activeCategories);

  useEffect(() => {
    if (openDialog) {
      if (mode === "edit" && initialData) {
        setSelectedCategory(String(initialData.category_id));
        setSubCategoryName(initialData.name);
        setSubCategoryDescription(initialData.description);

        if ((initialData as any).image) {
          setPreviewUrl((initialData as any).image);
          setImageFile(null);
          setValue(String(initialData.category_id));
        }
      } else if (mode === "create") {
        setSelectedCategory("");
        setSubCategoryName("");
        setSubCategoryDescription("");
        setPreviewUrl(null);
        setImageFile(null);
        setValue("");
      }
    }
  }, [openDialog, mode, initialData]);

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  }

  const mutation = useMutation({
    mutationFn: async (data: {
      name: string;
      description: string;
      category_id: number;
    }) => {
      const fd = new FormData();
      fd.append("name", data.name);
      fd.append("description", data.description || "");
      fd.append("category_id", String(data.category_id));

      fd.append("_method", "PUT");

      if (imageFile) fd.append("image", imageFile);

      return mode === "create"
        ? createSubcategory(fd as any)
        : updateSubcategory(Number(id), fd as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      toast.success(
        `Subcategory ${mode === "create" ? "created" : "updated"} successfully`
      );

      setSelectedCategory("");
      setSubCategoryName("");
      setSubCategoryDescription("");
      setImageFile(null);
      setPreviewUrl(null);
      setOpenDialg(false);
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
      imageFile,
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

    console.log("the sub category paylod is", payload);
    mutation.mutate(payload);
  };

  const handleDialogOpenChange = (isOpen: boolean) => {
    console.log("Dialog open state changed to:", isOpen);
    setOpenDialg(isOpen);
  };

  if (isError) {
    return <div>error</div>;
  }

  return (
    <Dialog open={openDialog} onOpenChange={handleDialogOpenChange}>
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
            <div className="grid gap-2">
              <Label htmlFor="state" className="text-zinc-700">
                Main Category *
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-white"
                  >
                    {value
                      ? activeCategories?.find(
                          (s: CategoryPayload) => String(s.id) === value
                        )?.name
                      : "Select Main Category..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-130 p-0 bg-white">
                  <Command>
                    <CommandInput placeholder="Search Main Category..." />
                    <CommandList>
                      <CommandEmpty>No state found.</CommandEmpty>
                      <CommandGroup>
                        {activeCategories?.map((s: CategoryPayload) => (
                          <CommandItem
                            key={s.id}
                            value={s.name.toLowerCase()}
                            onSelect={() => {
                              setValue(String(s.id));
                              setSelectedCategory(String(s.id));
                              setOpen(false);
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === String(s.id)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {s.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
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

          {/* Image upload area - similar to MainCategoryDialog */}
          <div className="grid gap-2">
            <Label htmlFor="image">SubCategory Image</Label>
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
            variant="outline"
            onClick={() => {
              console.log("❌ Cancel clicked");
              setOpenDialg(false);
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
