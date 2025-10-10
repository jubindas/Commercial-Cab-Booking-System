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

import { Calendar } from "@/components/ui/calendar";

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

export default function PullCarDialog({ initialData, mode, trigger }: Props) {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [carDetails, setCarDetails] = useState("");

  const [description, setDescription] = useState("");

  const [journeyStartTime, setJourneyStartTime] = useState<Date | undefined>(
    new Date()
  );

  const [price, setPrice] = useState<string>("");
  const [capacity, setCapacity] = useState<string>("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const [locationStart, setLocationStart] = useState("");

  const [locationEnd, setLocationEnd] = useState("");

  const queryClient = useQueryClient();

  const [images, setImages] = useState<File[]>([]);

  const [existingImages, setExistingImages] = useState<string[]>([]);

  useEffect(() => {
    if (mode === "edit" && initialData && open) {
      setName(initialData.name || "");
      setCarDetails(initialData.car_details || "");
      setDescription(initialData.description || "");
      setPrice(initialData.price?.toString() || "");
      setJourneyStartTime(
        initialData.journey_start_time
          ? new Date(initialData.journey_start_time)
          : undefined
      );
      setCapacity(initialData.capacity?.toString() || "");
      setLocationStart(initialData.location_start || "");
      setLocationEnd(initialData.location_end || "");

      const arrayImages = [
        initialData.image1,
        initialData.image2,
        initialData.image3,
        initialData.image4,
      ].filter((img): img is string => !!img);

      setExistingImages(arrayImages);
      setImages([]);
    }
  }, [mode, initialData, open]);

  const createMutation = useMutation({
    mutationFn: (payload: FormData) =>
      mode === "edit" && initialData
        ? updatePullCar(initialData.id, payload)
        : createPullCar(payload),
    onSuccess: () => {
      toast.success(
        mode === "edit"
          ? "Pull car updated successfully"
          : "Pull car created successfully"
      );
      queryClient.invalidateQueries({ queryKey: ["pullcar"] });
      resetForm();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      // Axios-specific error handling
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
      console.error("❌ Pull car save error:", err);
    },
  });

  const resetForm = () => {
    setName("");
    setCarDetails("");
    setDescription("");
    setPrice("");
    setJourneyStartTime(undefined);
    setCapacity("");
    setLocationStart("");
    setLocationEnd("");
    setImages([]);
    setOpen(false);
  };

  const formatDateForMySQL = (date: Date) => {
    const pad = (n: number) => n.toString().padStart(2, "0");

    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); 
    const day = pad(date.getDate());

    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !name ||
        !price ||
        !locationStart ||
        !locationEnd ||
        !journeyStartTime
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
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
      formData.append(
        "journey_start_time",
        journeyStartTime ? formatDateForMySQL(journeyStartTime) : ""
      );

      formData.append("capacity", capacity.toString());

      formData.append("location_start", locationStart);
      formData.append("location_end", locationEnd);

      images.forEach((file) => formData.append("images[]", file));

      if (mode === "edit") {
        existingImages.forEach((url) => formData.append("images[]", url));
      }

      console.log("FormData ready to send:");
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      createMutation.mutate(formData);
    } catch (err) {
      console.error("Unexpected error while preparing data:", err);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const isLoading = createMutation.isPending;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-700 text-white font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-800 transition-all duration-200 tracking-wide">
            {mode === "edit" ? "Edit Pull Car" : "Add Pull Car"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-10 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            {mode === "edit" ? "Edit Pull Car" : "Add New Pull Car"}
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
                Name
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
              <Input
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

            <div className="flex flex-col">
              <Label className="block font-semibold text-gray-700 mb-2">
                Journey Start Date
              </Label>

              <Button
                type="button"
                variant="outline"
                onClick={() => setCalendarOpen(!calendarOpen)}
                className="w-full mb-2 bg-white border-gray-300 text-gray-700 hover:bg-purple-50 hover:border-purple-500 transition-all duration-200"
              >
                {calendarOpen ? "Close Calendar" : "Select Date"}
              </Button>

              {calendarOpen && (
                <Calendar
                  mode="single"
                  selected={journeyStartTime}
                  onSelect={(date) => {
                    setJourneyStartTime(date);
                    setCalendarOpen(false);
                  }}
                  disabled={(date) => date < new Date()}
                  className="rounded-lg border shadow-sm bg-gray-50 p-2"
                />
              )}

              {journeyStartTime && (
                <p className="text-sm text-gray-600 mt-1">
                  Selected Date:{" "}
                  <span className="font-medium text-purple-700">
                    {journeyStartTime.toDateString()}
                  </span>
                </p>
              )}
            </div>

            <div>
              <Label className="block font-semibold text-gray-700 mb-2">
                Capacity
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
                Start Location
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
                End Location
              </Label>
              <Input
                value={locationEnd}
                onChange={(e) => setLocationEnd(e.target.value)}
                placeholder="Destination"
                className="w-full rounded-lg border-gray-300 bg-gray-50 py-2 px-3 text-gray-900 shadow-sm focus:border-purple-600 focus:ring-2 focus:ring-purple-100 transition"
              />
            </div>
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
                  const totalFiles = [...images, ...files].slice(0, 4); // max 4
                  setImages(totalFiles);
                  console.log(
                    "📸 Selected Files:",
                    totalFiles.map((f) => f.name)
                  );
                }}
                className="hidden"
              />

              {[...existingImages, ...images].length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {existingImages.map((url, index) => (
                    <div
                      key={`existing-${index}`}
                      className="relative px-2 py-0.5 bg-purple-100 text-purple-800 text-xs rounded-md shadow-sm flex items-center"
                    >
                      {url.split("/").pop()}
                      <button
                        type="button"
                        onClick={() => {
                          const updated = existingImages.filter(
                            (_, i) => i !== index
                          );
                          setExistingImages(updated);
                        }}
                        className="ml-1 text-purple-600 hover:text-purple-900 font-bold text-xs"
                      >
                        ×
                      </button>
                    </div>
                  ))}

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
