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

import { getCities } from "@/service/apiCities";

import { createLocation, updateLocation } from "@/service/apiLocation";

import type { City } from "@/table-types/city-table-types";



interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: {
    cityId: string;
    name: string;
    longitude: string;
    latitude: string;
  };
  id?: string | number;
}

export default function LocationDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {



  const [selectedCity, setSelectedCity] = useState("");

  const [locationName, setLocationName] = useState("");

  const [latitude, setLatitude] = useState("");

  const [longitude, setLongitude] = useState("");

  const queryClient = useQueryClient();

  const { data: cities } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedCity(initialData.cityId);
      setLocationName(initialData.name);
      setLatitude(initialData.latitude);
      setLongitude(initialData.longitude);
    }
  }, [mode, initialData]);

  const createLocations = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (locationData: any) => {
      if (mode === "create") return createLocation(locationData);
      return updateLocation(String(id), locationData); 
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      toast(
        mode === "create"
          ? "Location created successfully"
          : "Location updated successfully"
      );
      setSelectedCity("");
      setLocationName("");
      setLatitude("");
      setLongitude("");
    },
    onError: (err) => {
      console.error("Failed to save location:", err);
    },
  });

  const handleSave = () => {
    if (!selectedCity || !locationName) {
      console.log("Please fill all required fields");
      return;
    }

    createLocations.mutate({
      city_id: selectedCity,
      name: locationName,
      latitude: latitude || null,
      longitude: longitude || null,
      code: locationName.toLowerCase().slice(0, 3),
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Location
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">Add a Location</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the location details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="city" className="text-zinc-700">
              City
            </Label>
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-full bg-zinc-50 text-zinc-900 border border-zinc-300 h-[38px] px-3 rounded-md">
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-50 text-zinc-900 border border-zinc-300">
                {cities?.map((city: City) => (
                  <SelectItem key={city.id} value={city.id}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="locationName" className="text-zinc-700">
              Location Name
            </Label>
            <Input
              id="locationName"
              placeholder="Enter location name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="latitude" className="text-zinc-700">
              Latitude (Optional)
            </Label>
            <Input
              id="latitude"
              placeholder="Enter latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="longitude" className="text-zinc-700">
              Longitude (Optional)
            </Label>
            <Input
              id="longitude"
              placeholder="Enter longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={createLocations.isPending}
          >
            {createLocations.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
