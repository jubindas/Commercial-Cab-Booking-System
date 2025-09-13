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

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getLocation } from "@/service/apiLocation";
import { createPincode } from "@/service/apiPincode";

export default function PincodeDialog() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [areaName, setAreaName] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [fallbackPinCodes, setFallbackPinCodes] = useState("");

  const queryClient = useQueryClient();

  // Fetch all locations
  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  // Mutation for creating Pincode
  const createPincodes = useMutation({
    mutationFn: createPincode,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pincodes"] });
      toast("Pincode created successfully");

      // reset fields
      setSelectedLocation("");
      setAreaName("");
      setPinCode("");
      setFallbackPinCodes("");
    },
    onError: (err) => {
      console.error("Failed to create pincode:", err);
    },
  });

  // Save handler
  const handleSave = () => {
    if (!selectedLocation || !pinCode) {
      console.log("Please fill all required fields");
      return;
    }

    const newPincode = {
  location_id: selectedLocation.toString(), // ensure string
  area_name: areaName || undefined,
  pin_code: pinCode,
  fallback_pin_codes: fallbackPinCodes
    ? fallbackPinCodes.split(',').map(code => code.trim()) // convert to array
    : undefined,
};


    console.log("Submitting Pincode:", newPincode);
    createPincodes.mutate(newPincode);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Pincode
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">Add a Pincode</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the pincode details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Select Location */}
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
                {locations?.map((loc: any) => (
                  <SelectItem key={loc.id} value={loc.id}>
                    {loc.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Area Name */}
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

          {/* Pin Code */}
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

          {/* Fallback Pin Codes */}
          <div className="grid gap-2">
            <Label htmlFor="fallbackPinCodes" className="text-zinc-700">
              Fallback Pin Codes (comma separated)
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
            disabled={createPincodes.isPending}
          >
            {createPincodes.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
