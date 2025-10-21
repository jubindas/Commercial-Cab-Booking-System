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

import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { getLocation } from "@/service/apiLocation";

import { getStates } from "@/service/apiStates";

import { getDistrict } from "@/service/apiDistrict";

import { getCities } from "@/service/apiCities";

import { getPincode } from "@/service/apiPincode";

import { createVendors } from "@/service/apiSalesman";

import type { Location } from "@/table-types/location-table-types";

import type { District } from "@/table-types/district-table-types";

import type { City } from "@/table-types/city-table-types";

import { Eye, EyeOff } from "lucide-react";

interface VendorPayload {
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
  referral_code: string | null;
  current_membership_id: number | null;
}

export default function VendorDialog() {
  const [openDialog, setOpenDialg] = useState(false);

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

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [referralCode, setReferralCode] = useState("");

  const [currentMembershipId, setCurrentMembershipId] = useState<number | null>(
    null
  );

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

  const filteredDistricts = districts?.filter(
    (d: any) => d.state_id === stateId
  );
  const filteredCities = cities?.filter(
    (c: any) => c.district_id === districtId
  );
  const filteredLocations = locations?.filter((l: any) => l.city_id === cityId);
  const filteredPinCodes = pinCodes?.filter(
    (p: any) => p.location_id === locationId
  );

  const createMutation = useMutation({
    mutationFn: (payload: VendorPayload) => createVendors(payload),
    onSuccess: () => {
      toast.success("Vendor saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["vendors_new"] });
      setOpenDialg(false);
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
      console.error("Error saving vendor:", err);
    },
  });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !password || password !== passwordConfirmation)
      return;

    const payload: VendorPayload = {
      name,
      email,
      phone: phone || null,
      alternative_phone_number: alternativePhone || null,
      password,
      password_confirmation: passwordConfirmation,
      role: "Vendor",
      address: address || null,
      id_proof: idProof,
      address_proof: addressProof,
      state_id: stateId,
      district_id: districtId,
      city_id: cityId,
      location_id: locationId,
      pin_code_id: pinCodeId,
      referral_code: referralCode || null,
      current_membership_id: currentMembershipId,
    };

    console.log("the paylod is", payload);

    createMutation.mutate(payload);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialg}>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Vendor
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[700px] bg-white rounded-3xl border border-gray-200 shadow-2xl p-10 max-h-[85vh] overflow-y-auto">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Add New Vendor
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
                type="number"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 10) {
                    setPhone(val);
                  }
                }}
                placeholder="Phone number"
              />
            </div>
            <div>
              <Label className="mb-2">Alternative Phone</Label>
              <Input
                type="number"
                value={alternativePhone}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val.length <= 10) {
                    setAlternativePhone(val);
                  }
                }}
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

            <div className="grid gap-2">
              <div className="grid gap-2">
                <Label htmlFor="state" className="text-zinc-700">
                  Sub Category *
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-white"
                    >
                      {value
                        ? states?.find((s: any) => String(s.id) === value)?.name
                        : "Select state..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-70 p-0 bg-white">
                    <Command>
                      <CommandInput placeholder="Search state... here" />
                      <CommandList>
                        <CommandEmpty>No state found.</CommandEmpty>
                        <CommandGroup>
                          {states?.map((s: any) => (
                            <CommandItem
                              key={s.id}
                              value={s.name.toLowerCase()}
                              onSelect={() => {
                                setValue(String(s.id));
                                setStateId(s.id);
                                setOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  value === String(s.id)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {s.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
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
                  {filteredDistricts?.map((d: any) => (
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
                  {filteredCities?.map((c: any) => (
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
                  {filteredLocations?.map((l: any) => (
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
                  {filteredPinCodes?.map((p: any) => (
                    <SelectItem key={p.id} value={p.id.toString()}>
                      {p.pin_code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label className="mb-2">Referral Code</Label>
              <Input
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder="Enter referral code"
              />
            </div>

            <div>
              <Label className="mb-2">Current Membership ID</Label>
              <Input
                type="number"
                value={currentMembershipId ?? ""}
                onChange={(e) => setCurrentMembershipId(Number(e.target.value))}
                placeholder="Enter membership ID"
              />
            </div>

            {/* Address / Files */}
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
              onClick={() => setOpenDialg(false)}
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
