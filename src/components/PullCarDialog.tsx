"use client";

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
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPullCar, updatePullCar } from "@/service/apiPullcar";
import type { PullCar } from "@/table-types/pull-car-types";

interface Props {
  id?: number;
  initialData?: PullCar;
  trigger?: React.ReactNode;
  mode: "edit" | "create";
}

export default function PullCarDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [carDetails, setCarDetails] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [journeyStartTime, setJourneyStartTime] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(1);
  const [locationStart, setLocationStart] = useState<string>("");
  const [locationEnd, setLocationEnd] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log("Populating edit form with data:", initialData);
      setName(initialData.name || "");
      setCarDetails(initialData.car_details || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price || 0);
      setJourneyStartTime(initialData.journey_start_time || "");
      setCapacity(initialData.capacity || 1);
      setLocationStart(initialData.location_start || "");
      setLocationEnd(initialData.location_end || "");
      setImages([]);
    }
  }, [mode, initialData]);

  const pullCarMutation = useMutation({
    mutationFn: (payload: FormData) => createPullCar(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pullcars"] });
      console.log("Created pull car successfully:", data);
      toast.success("Pull car created successfully");
      resetForm();
    },
    onError: (err: any) => {
      console.error("Failed to create pull car:", err.response ?? err);
      toast.error(err.response?.data?.message || "Failed to create pull car");
    },
  });

  // Edit mutation
  const editPullCarMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: FormData }) =>
      updatePullCar(id, payload),
    onSuccess: (data) => {
      console.log("Updated pull car successfully:", data);
      toast.success("Pull car updated successfully");
      queryClient.invalidateQueries({ queryKey: ["pullcars"] });
      setOpen(false);
    },
    onError: (err: any) => {
      console.error("Failed to create pull car:", err.response ?? err);
      toast.error(err.response?.data?.message || "Failed to create pull car");
    },
  });

  const resetForm = () => {
    setName("");
    setCarDetails("");
    setDescription("");
    setPrice(0);
    setJourneyStartTime("");
    setCapacity(1);
    setLocationStart("");
    setLocationEnd("");
    setImages([]);
    queryClient.invalidateQueries({ queryKey: ["pullcars"] });
    setOpen(false);
  };

  const handleSave = () => {
    if (
      !price ||
      !journeyStartTime ||
      !capacity ||
      !locationStart ||
      !locationEnd
    ) {
      console.error("Validation failed: missing required fields");
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name || "");
    formData.append("car_details", carDetails || "");
    formData.append("description", description || "");
    formData.append("price", price.toString());
    formData.append("journey_start_time", journeyStartTime);
    formData.append("capacity", capacity.toString());
    formData.append("location_start", locationStart);
    formData.append("location_end", locationEnd);

    images.forEach((file) => formData.append("images", file));
    console.log("Submitting FormData:", formData);

    if (mode === "edit") {
      if (!id) {
        console.error("Edit mode requires a valid ID");
        toast.error("Cannot update pull car: missing ID");
        return;
      }
      console.log("Calling editPullCarMutation with id:", id);
      editPullCarMutation.mutate({ id, payload: formData });
    } else {
      console.log("Calling pullCarMutation for create");
      pullCarMutation.mutate(formData);
    }
  };

  const isLoading = pullCarMutation.isPending || editPullCarMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded-md shadow">
            {mode === "create" ? "Add Pull Car" : "Edit Pull Car"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto bg-white text-zinc-900 border border-zinc-200 shadow-lg rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-zinc-900">
            {mode === "create" ? "Add Pull Car" : "Edit Pull Car"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500 mt-1">
            Fill in all the details to{" "}
            {mode === "create" ? "add a new" : "update the"} pull car.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <Label>Name</Label>
            <Input
              placeholder="Enter car name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Car Details */}
          <div className="flex flex-col gap-1">
            <Label>Car Details</Label>
            <Input
              placeholder="Enter car details"
              value={carDetails}
              onChange={(e) => setCarDetails(e.target.value)}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1 sm:col-span-2">
            <Label>Description</Label>
            <Input
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1">
            <Label>Price</Label>
            <Input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Journey Start Time */}
          <div className="flex flex-col gap-1">
            <Label>Journey Start Time</Label>
            <Input
              type="datetime-local"
              value={journeyStartTime}
              onChange={(e) => setJourneyStartTime(e.target.value)}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Capacity */}
          <div className="flex flex-col gap-1">
            <Label>Capacity</Label>
            <Input
              type="number"
              min={1}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Location Start */}
          <div className="flex flex-col gap-1">
            <Label>Location Start</Label>
            <Input
              placeholder="Enter start location"
              value={locationStart}
              onChange={(e) => setLocationStart(e.target.value)}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Location End */}
          <div className="flex flex-col gap-1">
            <Label>Location End</Label>
            <Input
              placeholder="Enter end location"
              value={locationEnd}
              onChange={(e) => setLocationEnd(e.target.value)}
              className="rounded-md border-zinc-300"
            />
          </div>

          {/* Images File Input */}
          <div className="flex flex-col gap-1 sm:col-span-2">
            <Label>Images (Upload files)</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  const filesArray = Array.from(e.target.files);
                  setImages(filesArray);
                  console.log("Selected files:", filesArray);
                }
              }}
              className="rounded-md border-zinc-300"
            />
            {images.length > 0 && (
              <p className="text-sm text-zinc-500 mt-1">
                {images.length} file(s) selected
              </p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <Button
            variant="outline"
            className="px-4 py-2 rounded-md border-zinc-300 hover:bg-zinc-100"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 text-white px-4 py-2 rounded-md shadow hover:bg-purple-700"
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
