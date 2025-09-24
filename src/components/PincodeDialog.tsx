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

import { getLocation } from "@/service/apiLocation";

import { createPincode, updatePincode } from "@/service/apiPincode";

import type { Location } from "@/table-types/location-table-types";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: {
    locId: string;
    name: string;
    pinCode: string;
    fallBackPincodes: string[];
  };
  id?: string | number;
}

export default function PincodeDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const [selectedLocation, setSelectedLocation] = useState("");

  const [areaName, setAreaName] = useState("");

  const [pinCode, setPinCode] = useState("");

  const [fallbackPinCodes, setFallbackPinCodes] = useState("");

  const queryClient = useQueryClient();

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedLocation(initialData.locId);
      setAreaName(initialData.name);
      setPinCode(initialData.pinCode);
      setFallbackPinCodes(initialData.fallBackPincodes?.join(", ") || "");
    }
  }, [mode, initialData]);

  const pincodeMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) =>
      mode === "create" ? createPincode(data) : updatePincode(String(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pincodes"] });
      toast(
        mode === "create"
          ? "Pincode created successfully"
          : "Pincode updated successfully"
      );
      setSelectedLocation("");
      setAreaName("");
      setPinCode("");
      setFallbackPinCodes("");
    },
    onError: (err) => {
      console.error("Failed to save pincode:", err);
      toast.error(
        err instanceof Error
          ? `Error: ${err.message}`
          : "Failed to save pincode. Please try again."
      );
    },
  });

  const handleSave = () => {
    if (!selectedLocation) {
      toast.error("Please select a location");
      return;
    }

    if (!pinCode) {
      toast.error("Pin code is required");
      return;
    }

    const fallbackArray = fallbackPinCodes
      ? fallbackPinCodes.split(",").map((code) => code.trim())
      : [];

    if (fallbackArray.some((code) => code.length !== 6)) {
      toast.error("Each fallback pincode must be exactly 6 digits");
      return;
    }

    if (fallbackArray.length > 5) {
      toast.error("You cannot add more than 5 fallback pincodes");
      return;
    }

    const newPincode = {
      location_id: selectedLocation,
      area_name: areaName || null,
      pin_code: pinCode,
      fallback_pin_codes: fallbackArray.length > 0 ? fallbackArray : undefined,
    };

    console.log("Submitting Pincode:", newPincode);
    pincodeMutation.mutate(newPincode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            {mode === "create" ? "Add Pincode" : "Edit Pincode"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            {mode === "create" ? "Add a Pincode" : "Edit Pincode"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the pincode details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="location" className="text-zinc-700">
              Location
            </Label>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-full bg-zinc-50 text-zinc-900 border border-zinc-300 h-[38px] px-3 rounded-md">
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-50 text-zinc-900 border border-zinc-300">
                {locations?.map((loc: Location) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="areaName" className="text-zinc-700">
              Area Name
            </Label>
            <Input
              id="areaName"
              placeholder="Enter area name"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="pinCode" className="text-zinc-700">
              Pin Code
            </Label>
            <Input
              id="pinCode"
              placeholder="Enter pin code"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fallbackPinCodes" className="text-zinc-700">
              Fallback Pin Codes (comma separated, max 5)
            </Label>
            <Input
              id="fallbackPinCodes"
              placeholder="123456, 654321"
              value={fallbackPinCodes}
              onChange={(e) => setFallbackPinCodes(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={pincodeMutation.isPending}
          >
            {pincodeMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
