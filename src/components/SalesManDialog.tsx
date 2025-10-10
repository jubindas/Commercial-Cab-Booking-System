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

import { useMutation, useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { getLocation } from "@/service/apiLocation";

import type { Location } from "@/table-types/location-table-types";

import { getStates } from "@/service/apiStates";

import { getDistrict } from "@/service/apiDistrict";

import { getCities } from "@/service/apiCities";

import { getPincode } from "@/service/apiPincode";

import type { District } from "@/table-types/district-table-types";

import type { City } from "@/table-types/city-table-types";

import { useQueryClient } from "@tanstack/react-query";

import { createSalesMan } from "@/service/apiSalesman";
import { toast } from "sonner";

export default function SalesManDialog() {
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [alternativePhone, setAlternativePhone] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [role, setRole] = useState<
    "Admin" | "Salesperson" | "Vendor" | "User" | ""
  >("");

  const [address, setAddress] = useState("");

  const [idProof, setIdProof] = useState<File | null>(null);

  const [addressProof, setAddressProof] = useState<File | null>(null);

  const [stateId, setStateId] = useState<number | null>(null);

  const [districtId, setDistrictId] = useState<number | null>(null);

  const [cityId, setCityId] = useState<number | null>(null);

  const [locationId, setLocationId] = useState<number | null>(null);

  const [pinCodeId, setPinCodeId] = useState<number | null>(null);

  const queryClient = useQueryClient();

  const { data: locations } = useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: getLocation,
  });

  console.log("the location is", locations);

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  console.log("States data:", states);

  const { data: districts } = useQuery<District[]>({
    queryKey: ["districts"],
    queryFn: getDistrict,
  });

  console.log("the district is", districts);

  const { data: cities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  console.log("the cities", cities);

  const { data: pinCodes } = useQuery({
    queryKey: ["pinCodes"],
    queryFn: getPincode,
  });

  console.log("the pincode", pinCodes);

const createMutation = useMutation({
  mutationFn: (payload) => createSalesMan(payload),
  onSuccess: (data) => {
    console.log("✅ Salesman created:", data);
    toast.success("Salesman created successfully!");
    queryClient.invalidateQueries({ queryKey: ["salesmen"] });
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
      toast.error("Failed to save. Please try again.");
    }
    console.error("Salesman save error:", err);
  },
});


  const handleSave = () => {
    if (!name || name.length > 255)
      return console.error("Name is required and <= 255 chars");
    if (!email || !/\S+@\S+\.\S+/.test(email) || email.length > 255)
      return console.error("Valid email required and <= 255 chars");
    if (!password || password.length < 8)
      return console.error("Password required, >= 8 chars");
    if (password !== passwordConfirmation)
      return console.error("Password and confirmation must match");
    if (phone && phone.length > 20) return console.error("Phone max 20 chars");
    if (alternativePhone && alternativePhone.length > 20)
      return console.error("Alternative phone max 20 chars");

    const payload = {
      name,
      email,
      phone: phone || null,
      alternative_phone_number: alternativePhone || null,
      password,
      password_confirmation: passwordConfirmation,
      role: role || null,
      address: address || null,
      id_proof: idProof,
      address_proof: addressProof,
      state_id: stateId,
      district_id: districtId,
      city_id: cityId,
      location_id: locationId,
      pin_code_id: pinCodeId,
    };

    console.log("Salesman payload:", payload);
    createMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Sales Man
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 max-h-[85vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle>Add Sales Man</DialogTitle>
          <DialogDescription>Fill all required fields below.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name"
            />
          </div>

          <div className="grid gap-2">
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </div>

          <div className="grid gap-2">
            <Label>Phone</Label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone number"
            />
          </div>

          <div className="grid gap-2">
            <Label>Alternative Phone</Label>
            <Input
              value={alternativePhone}
              onChange={(e) => setAlternativePhone(e.target.value)}
              placeholder="Alternative phone"
            />
          </div>

          <div className="grid gap-2">
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>

          <div className="grid gap-2">
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              placeholder="Confirm password"
            />
          </div>

          <div className="grid gap-2">
            <Label>Role</Label>
            <Select value={role} onValueChange={(val) => setRole(val as any)}>
              <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {["Admin", "Salesperson", "Vendor", "User"].map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>State</Label>
            <Select
              value={stateId !== null ? stateId.toString() : ""}
              onValueChange={(val) => setStateId(Number(val))}
            >
              <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {states && states.length > 0 ? (
                  states.map((s: any) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No states available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>District</Label>
            <Select
              value={districtId !== null ? districtId.toString() : ""}
              onValueChange={(val) => setDistrictId(Number(val))}
            >
              <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                <SelectValue placeholder="Select District" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {districts && districts.length > 0 ? (
                  districts.map((d: any) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No districts available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>City</Label>
            <Select
              value={cityId !== null ? cityId.toString() : ""}
              onValueChange={(val) => setCityId(Number(val))}
            >
              <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {cities && cities.length > 0 ? (
                  cities.map((c: any) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No cities available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Location</Label>
            <Select
              value={locationId !== null ? locationId.toString() : ""}
              onValueChange={(val) => setLocationId(Number(val))}
            >
              <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                <SelectValue placeholder="Select Location" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {locations && locations.length > 0 ? (
                  locations.map((l: any) => (
                    <SelectItem key={l.id} value={l.id.toString()}>
                      {l.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No locations available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Pin Code</Label>
            <Select
              value={pinCodeId !== null ? pinCodeId.toString() : ""}
              onValueChange={(val) => setPinCodeId(Number(val))}
            >
              <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                <SelectValue placeholder="Select Pin Code" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {pinCodes && pinCodes.length > 0 ? (
                  pinCodes.map((p: any) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.pin_code || ""}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="" disabled>
                    No pin codes available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Address</Label>
            <Input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </div>

          <div className="grid gap-2">
            <Label>ID Proof</Label>
            <Input
              type="file"
              onChange={(e) => setIdProof(e.target.files?.[0] || null)}
            />
          </div>
          <div className="grid gap-2">
            <Label>Address Proof</Label>
            <Input
              type="file"
              onChange={(e) => setAddressProof(e.target.files?.[0] || null)}
            />
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
          >
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
