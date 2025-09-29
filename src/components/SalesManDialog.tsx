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
import { getLocation } from "@/service/apiLocation";

import { useQuery } from "@tanstack/react-query";

import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import type { Location } from "@/table-types/location-table-types";

export default function SalesManDialog() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [salesManName, setSalesManName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const { data: locations } = useQuery({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  const generatePassword = (phoneNumber: string) => {
    if (!phoneNumber) return "";
    const last5 = phoneNumber.slice(-5);
    return `BHARA-${last5}`;
  };

  const handleSave = () => {
    const password = generatePassword(phoneNumber);
    console.log({
      selectedLocation,
      salesManName,
      phoneNumber,
      password,
      email,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Sales Man
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900">
        <DialogHeader>
          <DialogTitle>Add Sales Man</DialogTitle>
          <DialogDescription>
            Enter the sales man details below. Both fields are required.
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
            <Label htmlFor="name">Sales Man Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter sales man name"
              onChange={(e) => setSalesManName(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Phone Number</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter phone number"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 "
            onClick={handleSave}
          >
            create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
