/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

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

import { createPullCar } from "@/service/apiPullcar";

import { Textarea } from "./ui/textarea";


interface Props {
  trigger?: React.ReactNode;
}

export default function PullCarDialog({ trigger }: Props) {

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [carDetails, setCarDetails] = useState("");

  const [description, setDescription] = useState("");

  const [price, setPrice] = useState<string>("");

  const [capacity, setCapacity] = useState<string>("");

  const [locationStart, setLocationStart] = useState("");

  const [locationEnd, setLocationEnd] = useState("");

  const [images, setImages] = useState<File[]>([]);

  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: (payload: FormData) => createPullCar(payload),
    onSuccess: () => {
      toast.success("Pull car created successfully");
      queryClient.invalidateQueries({ queryKey: ["pullcar"] });
      resetForm();
      setOpen(false)
    },
    onError: (err: any) => {
      if (err?.response?.data?.errors) {
        const messages = Object.values(err.response.data.errors)
          .flat()
          .join(", ");
        toast.error(`Validation error: ${messages}`);
      } else if (err?.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Failed to save pull car. Please try again.");
      }
      console.error("Pull car save error:", err);
    },
  });

  const resetForm = () => {
    setName("");
    setCarDetails("");
    setDescription("");
    setPrice("");
    setCapacity("");
    setLocationStart("");
    setLocationEnd("");
    setImages([]);
    setOpen(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !price || !locationStart || !locationEnd) {
      toast.error("Please fill all required fields");
      return;
    }

    const MAX_FILE_SIZE = 2 * 1024 * 1024;
    for (const file of images) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`File ${file.name} exceeds 2MB size limit`);
        return;
      }
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("car_details", carDetails);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("journey_start_time", "2005-01-01 00:00:00"); // static date
    formData.append("capacity", capacity.toString());
    formData.append("location_start", locationStart);
    formData.append("location_end", locationEnd);

    images.forEach((file) => formData.append("images[]", file));

    createMutation.mutate(formData);
  };

  const isLoading = createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Pull Car
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-10 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Add New Pool Car
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2 text-base">
            Please complete all required fields and upload high-quality car
            images.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                Name *
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter car name"
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                Car Details
              </Label>
              <Input
                value={carDetails}
                onChange={(e) => setCarDetails(e.target.value)}
                placeholder="Model, Variant, Color"
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            <div className="sm:col-span-2">
              <Label className="block font-semibold text-gray-700 mb-2">
                Description
              </Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the car and journey"
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                Price
              </Label>
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Enter Price"
                min={0}
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                Seat Capacity
              </Label>
              <Input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="Enter number of seats"
                min={1}
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                Start Location *
              </Label>
              <Input
                value={locationStart}
                onChange={(e) => setLocationStart(e.target.value)}
                placeholder="Starting point"
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                End Location *
              </Label>
              <Input
                value={locationEnd}
                onChange={(e) => setLocationEnd(e.target.value)}
                placeholder="Destination"
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>

            {/* Images upload */}
            <div className="flex flex-col">
              <Label className="block font-semibold text-gray-700 mb-1 text-sm">
                Car Images (Max 4)
              </Label>

              <label
                htmlFor="carImages"
                className={`flex items-center justify-center w-full h-9 px-3 border-2 border-dashed rounded-lg bg-gray-50 text-gray-500 cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-200 text-sm ${
                  images.length >= 4 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <span className="text-gray-700 font-medium text-sm">
                  Click files
                </span>
              </label>

              <Input
                id="carImages"
                type="file"
                multiple
                accept="image/*"
                disabled={images.length >= 4}
                onChange={(e) => {
                  const files = e.target.files
                    ? Array.from(e.target.files)
                    : [];
                  const totalFiles = [...images, ...files].slice(0, 4);
                  setImages(totalFiles);
                }}
                className="hidden"
              />

              {images.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {images.map((file, index) => (
                    <div
                      key={`new-${index}`}
                      className="relative px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-md shadow-sm flex items-center"
                    >
                      {file.name}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = images.filter((_, i) => i !== index);
                          setImages(updated);
                        }}
                        className="ml-1 text-purple-600 hover:text-purple-900 font-bold text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
              className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition font-medium shadow-sm"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={handleSave}
              className="px-6 py-2 rounded-xl bg-purple-700 text-white font-semibold hover:bg-purple-800 transition shadow-lg"
            >
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}