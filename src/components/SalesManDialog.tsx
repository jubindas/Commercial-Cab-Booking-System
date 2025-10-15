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

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { getLocation } from "@/service/apiLocation";

import { getStates } from "@/service/apiStates";

import { getDistrict } from "@/service/apiDistrict";

import { getCities } from "@/service/apiCities";

import { getPincode } from "@/service/apiPincode";

import { createSalesMan } from "@/service/apiSalesman";

import type { Location } from "@/table-types/location-table-types";

import type { District } from "@/table-types/district-table-types";

import type { City } from "@/table-types/city-table-types";

import { Eye, EyeOff } from "lucide-react";

interface SalesmenPayload {
  name: string;
  email: string;
  phone: string | null;
  alternative_phone_number: string | null;
  password: string;
  password_confirmation: string;
  role: string;
  address: string | null;
  id_proof: File | null;
  address_proof: File | null;
  state_id: number | null;
  district_id: number | null;
  city_id: number | null;
  location_id: number | null;
  pin_code_id: number | null;
}

type SalesManProps = {
  trigger?: React.ReactNode;
  id?: string | number;
};

export default function SalesManDialog({ trigger, id }: SalesManProps) {
  console.log("the id is", id);

  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [phone, setPhone] = useState("");

  const [alternativePhone, setAlternativePhone] = useState("");

  const [password, setPassword] = useState("");

  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [address, setAddress] = useState("");

  const [idProof, setIdProof] = useState<File | null>(null);

  const [addressProof, setAddressProof] = useState<File | null>(null);

  const [stateId, setStateId] = useState<number | null>(null);

  const [districtId, setDistrictId] = useState<number | null>(null);

  const [cityId, setCityId] = useState<number | null>(null);

  const [locationId, setLocationId] = useState<number | null>(null);

  const [pinCodeId, setPinCodeId] = useState<number | null>(null);

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const queryClient = useQueryClient();

  const { data: locations } = useQuery<Location[]>({
    queryKey: ["locations"],
    queryFn: getLocation,
  });
  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });
  const { data: districts } = useQuery<District[]>({
    queryKey: ["districts"],
    queryFn: getDistrict,
  });
  const { data: cities } = useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: getCities,
  });
  const { data: pinCodes } = useQuery({
    queryKey: ["pinCodes"],
    queryFn: getPincode,
  });

  const createMutation = useMutation({
    mutationFn: (payload: SalesmenPayload) => createSalesMan(payload),
    onSuccess: () => {
      toast.success("Salesman saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["salesmen"] });
      setOpen(false);
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
      console.error("Error saving salesman:", err);
    },
  });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || password !== passwordConfirmation)
      return;
    const payload: SalesmenPayload = {
      name,
      email,
      phone: phone || null,
      alternative_phone_number: alternativePhone || null,
      password,
      password_confirmation: passwordConfirmation,
      role: "Salesperson",
      address: address || null,
      id_proof: idProof,
      address_proof: addressProof,
      state_id: stateId,
      district_id: districtId,
      city_id: cityId,
      location_id: locationId,
      pin_code_id: pinCodeId,
    };
    createMutation.mutate(payload);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Salesman
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-10 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Add New Salesman
          </DialogTitle>
          <DialogDescription className="text-gray-500 mt-2 text-base">
            Please complete all required fields and attach ID/Address proofs.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-8" onSubmit={handleSave}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <Label className="mb-2">Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter name"
              />
            </div>
            <div>
              <Label className="mb-2">Email *</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
              />
            </div>
            <div>
              <Label className="mb-2">Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone number"
              />
            </div>
            <div>
              <Label className="mb-2">Alternative Phone</Label>
              <Input
                value={alternativePhone}
                onChange={(e) => setAlternativePhone(e.target.value)}
                placeholder="Alternative phone"
              />
            </div>
            <div className="flex flex-col gap-1 relative">
              <Label className="mb-2">Password *</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <span
                className="absolute right-3 top-[36px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>

            <div className="flex flex-col gap-1 relative">
              <Label className="mb-2">Confirm Password *</Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                placeholder="Confirm Password"
              />
              <span
                className="absolute right-3 top-[36px] cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <Eye size={16} /> : <EyeOff size={16} />}
              </span>
            </div>

            <div>
              <Label className="mb-2">State</Label>
              <Select
                value={stateId?.toString() || ""}
                onValueChange={(val) => setStateId(Number(val))}
              >
                <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                  <SelectValue placeholder="Select State" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {states?.map((s: any) => (
                    <SelectItem key={s.id} value={s.id.toString()}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">District</Label>
              <Select
                value={districtId?.toString() || ""}
                onValueChange={(val) => setDistrictId(Number(val))}
              >
                <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                  <SelectValue placeholder="Select District" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {districts?.map((d: any) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">City</Label>
              <Select
                value={cityId?.toString() || ""}
                onValueChange={(val) => setCityId(Number(val))}
              >
                <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                  <SelectValue placeholder="Select City" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {cities?.map((c: any) => (
                    <SelectItem key={c.id} value={c.id.toString()}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Location</Label>
              <Select
                value={locationId?.toString() || ""}
                onValueChange={(val) => setLocationId(Number(val))}
              >
                <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {locations?.map((l: any) => (
                    <SelectItem key={l.id} value={l.id.toString()}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Pin Code</Label>
              <Select
                value={pinCodeId?.toString() || ""}
                onValueChange={(val) => setPinCodeId(Number(val))}
              >
                <SelectTrigger className="w-full h-[38px] px-3 rounded-md bg-zinc-50 border border-zinc-300">
                  <SelectValue placeholder="Select Pin Code" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {pinCodes?.map((p: any) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.pin_code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2">Address</Label>
              <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter address"
              />
            </div>
            <div>
              <Label className="mb-2">ID Proof</Label>
              <Input
                type="file"
                onChange={(e) => setIdProof(e.target.files?.[0] || null)}
              />
            </div>
            <div>
              <Label className="mb-2">Address Proof</Label>
              <Input
                type="file"
                onChange={(e) => setAddressProof(e.target.files?.[0] || null)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-purple-700 text-white hover:bg-purple-800"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
