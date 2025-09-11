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

import { useQuery } from "@tanstack/react-query";

import { getStates } from "@/service/apiStates";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDistrict } from "@/service/apiDistrict";

import { toast } from "sonner";

export default function DistrictDialog() {
  const [selectedState, setSelectedState] = useState("");
  const [districtName, setDistrictName] = useState("");
  const [districtCode, setDistrictCode] = useState("");

  const queryClient = useQueryClient();

  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const createDistricts = useMutation({
    mutationFn: createDistrict,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["district"] });
      toast("The District is Created");
      setSelectedState("");
      setDistrictName("");
      setDistrictCode("");
    },
    onError: (err) => {
      console.error(" Failed to create state:", err);
    },
  });

  const handleSave = () => {
    if (!selectedState || !districtName || !districtCode) {
      console.log("Please fill all required fields");
      return;
    }

    const district = {
      state_id: selectedState,
      name: districtName,
      code: districtCode,
    };

    createDistricts.mutate(district);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add District
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">Add a District</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the district details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="state" className="text-zinc-700">
              State
            </Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger className="w-full bg-zinc-50 text-zinc-900 border border-zinc-300 h-[38px] px-3 rounded-md">
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-50 text-zinc-900 border border-zinc-300">
                {states?.map((state: any) => (
                  <SelectItem key={state.id} value={state.id}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="districtName" className="text-zinc-700">
              District Name
            </Label>
            <Input
              id="districtName"
              placeholder="Enter district name"
              value={districtName}
              onChange={(e) => setDistrictName(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="districtCode" className="text-zinc-700">
              District Code
            </Label>
            <Input
              id="districtCode"
              placeholder="Enter district code"
              value={districtCode}
              onChange={(e) => setDistrictCode(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="outline"
            className="border border-zinc-300 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
          >
            Cancel
          </Button>
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={createDistricts.isPending}
          >
            {createDistricts.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
