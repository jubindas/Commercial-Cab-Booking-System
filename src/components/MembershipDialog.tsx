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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getSubcategories } from "@/service/apiSubCategory";

import { createMembership, updateMembership } from "@/service/apiMembership";

import type { SubCategory } from "@/table-types/sub-category-table-types";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: {
    sub_category_id: number;
    name: string;
    description: string;
    price: number;
    discounted_price: number | null;
    discounted_percentage: number | null;
  };
  id?: string | number;
}

export default function MembershipDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const queryClient = useQueryClient();

  const [subCategoryId, setSubCategoryId] = useState<string>("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<string>("");
  const [discountedPrice, setDiscountedPrice] = useState<string>("");
  const [discountedPercentage, setDiscountedPercentage] = useState<string>("");

  const { data: subCategories } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSubCategoryId(String(initialData.sub_category_id));
      setName(initialData.name);
      setDescription(initialData.description);
      setPrice(String(initialData.price));
      setDiscountedPrice(
        initialData.discounted_price !== null
          ? String(initialData.discounted_price)
          : ""
      );
      setDiscountedPercentage(
        initialData.discounted_percentage !== null
          ? String(initialData.discounted_percentage)
          : ""
      );
    }
  }, [mode, initialData]);

  const mutation = useMutation({
    mutationFn: (data: {
      sub_category_id: number;
      name: string;
      description: string;
      price: number;
      discounted_price: number | null;
      discounted_percentage: number | null;
    }) =>
      mode === "create"
        ? createMembership(data)
        : updateMembership(String(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"] });
      toast.success(`Membership ${mode === "create" ? "created" : "updated"}`);
      if (mode === "create") {
        setSubCategoryId("");
        setName("");
        setDescription("");
        setPrice("");
        setDiscountedPrice("");
        setDiscountedPercentage("");
      }
    },
    onError: (err) => {
      console.error(`Failed to ${mode} membership:`, err);
      toast.error(`Failed to ${mode} membership`);
    },
  });

  const handleSave = () => {
    if (!subCategoryId || !name || price === "") {
      toast.error("Subcategory, Name, and Price are required!");
      return;
    }
    const priceNum = Number(price);
    const discountedPriceNum =
      discountedPrice !== "" ? Number(discountedPrice) : null;
    const discountedPercentageNum =
      discountedPercentage !== "" ? Number(discountedPercentage) : null;

    if (
      priceNum < 0 ||
      (discountedPriceNum !== null && discountedPriceNum < 0) ||
      (discountedPercentageNum !== null && discountedPercentageNum < 0)
    ) {
      toast.error("Values must be >= 0");
      return;
    }

    mutation.mutate({
      sub_category_id: Number(subCategoryId),
      name,
      description,
      price: priceNum,
      discounted_price: discountedPriceNum,
      discounted_percentage: discountedPercentageNum,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            {mode === "create" ? "Add Membership" : "Edit Membership"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[650px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add a Membership" : "Edit Membership"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Enter membership details below."
              : "Update membership details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="subCategory">Sub Category</Label>
            <Select value={subCategoryId} onValueChange={setSubCategoryId}>
              <SelectTrigger className="w-full h-[42px] bg-zinc-50 text-zinc-900 border border-zinc-300 rounded-md">
                <SelectValue placeholder="Select a Subcategory" />
              </SelectTrigger>
              <SelectContent className="w-[600px] bg-zinc-50 text-zinc-900 border border-zinc-300">
                {subCategories?.map((sub: SubCategory) => (
                  <SelectItem key={sub.id} value={String(sub.id)}>
                    {sub.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Membership name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price">Price *</Label>
            <Input
              id="price"
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              min={0}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="discountedPrice">Discounted Price</Label>
            <Input
              id="discountedPrice"
              type="number"
              placeholder="Enter discounted price"
              value={discountedPrice}
              onChange={(e) => setDiscountedPrice(e.target.value)}
              min={0}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="discountedPercentage">Discount Percentage</Label>
            <Input
              id="discountedPercentage"
              type="number"
              placeholder="Enter Discount Percentage"
              value={discountedPercentage}
              onChange={(e) => setDiscountedPercentage(e.target.value)}
              min={0}
            />
          </div>
        </div>

        <div>
          <div className="grid gap-2">
            <Label htmlFor="commission">Commission</Label>
            <Input
              type="number"
              placeholder="Enter Discount Percentage"
              min={0}
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
