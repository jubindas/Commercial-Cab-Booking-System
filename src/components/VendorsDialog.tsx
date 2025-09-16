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

interface Props {
  trigger?: React.ReactNode;
}

export default function VendorsDialog({ trigger }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idCard: null as File | null,
    addressProof: null as File | null,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const { id, value, files } = e.target;

    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [id]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  }

  function handleSave() {
    if (!formData.name || !formData.phone || !formData.idCard || !formData.addressProof) {
      console.error("All fields are required!");
      return;
    }

    const vendorData = new FormData();
    vendorData.append("name", formData.name);
    vendorData.append("phone", formData.phone);
    if (formData.idCard) vendorData.append("idCard", formData.idCard);
    if (formData.addressProof) vendorData.append("addressProof", formData.addressProof);

    console.log("Vendor Data (FormData):", vendorData);

    // Example API call:
    // axios.post("/api/vendors", vendorData, { headers: { "Content-Type": "multipart/form-data" } });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add Vendor
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900">
        <DialogHeader>
          <DialogTitle>Add a Vendor</DialogTitle>
          <DialogDescription>
            Enter the vendor details below. All fields are required.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Vendor Name */}
          <div className="grid gap-2">
            <Label htmlFor="name">Vendor Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter vendor name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          {/* Phone Number */}
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="text"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          {/* Aadhaar / Voter ID (Image Upload) */}
          <div className="grid gap-2">
            <Label htmlFor="idCard">Aadhaar / Voter ID (Image)</Label>
            <Input
              id="idCard"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>

          {/* Address Proof (Image Upload) */}
          <div className="grid gap-2">
            <Label htmlFor="addressProof">Address Proof (Image)</Label>
            <Input
              id="addressProof"
              type="file"
              accept="image/*"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
