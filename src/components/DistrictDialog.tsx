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

import { useQuery } from "@tanstack/react-query";

import { getStates } from "@/service/apiStates";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDistrict, updateDistrict } from "@/service/apiDistrict";

import { toast } from "sonner";


interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: { stateId: string; name: string; code: string };
  id?: string | number;
}

export default function DistrictDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {


  const [selectedState, setSelectedState] = useState("");

  const [districtName, setDistrictName] = useState("");

  const [districtCode, setDistrictCode] = useState("");

  const queryClient = useQueryClient();


  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedState(initialData.stateId);
      setDistrictName(initialData.name);
      setDistrictCode(initialData.code);
    }
  }, [mode, initialData]);

  
  const { data: states } = useQuery({
    queryKey: ["states"],
    queryFn: getStates,
  });

  const mutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (data: any) =>
      mode === "create"
        ? createDistrict(data)
        : updateDistrict(String(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["district"] });
      toast(`District ${mode === "create" ? "Created" : "Updated"}`);
      setSelectedState("");
      setDistrictName("");
      setDistrictCode("");
    },
    onError: (err) => {
      console.error(
        `Failed to ${mode === "create" ? "create" : "update"} district:`,
        err
      );
      toast.error(
        `Failed to ${mode === "create" ? "create" : "update"} district`
      );
    },
  });

  const handleSave = () => {
    if (!selectedState || !districtName ) {
      toast.error("Please fill all fields!");
      return;
    }

    const districtData = {
      state_id: selectedState,
      name: districtName,
      code: districtCode,
    };

    mutation.mutate(districtData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add District
          </Button>
        )}
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
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
