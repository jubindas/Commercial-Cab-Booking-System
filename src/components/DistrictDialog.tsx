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

import { useState, useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { getStates } from "@/service/apiStates";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createDistrict, updateDistrict } from "@/service/apiDistrict";

import { toast } from "sonner";
import type { State } from "@/table-types/state-table-types";

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
  const [openDialog, setOpenDialg] = useState(false);
  const [selectedState, setSelectedState] = useState("");

  const [districtName, setDistrictName] = useState("");

  const [districtCode, setDistrictCode] = useState("");

  const [open, setOpen] = useState(false);

  const [value, setValue] = useState("");

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
      setOpenDialg(false);
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
    if (!selectedState || !districtName) {
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
    <Dialog open={openDialog} onOpenChange={setOpenDialg}>
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
            <div className="grid gap-2">
              <Label htmlFor="state" className="text-zinc-700">
                State *
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
                      ? states?.find((s: State) => String(s.id) === value)?.name
                      : "Select State..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-130 p-0 bg-white">
                  <Command>
                    <CommandInput placeholder="Search State..." />
                    <CommandList>
                      <CommandEmpty>No state found.</CommandEmpty>
                      <CommandGroup>
                        {states?.map((s: State) => (
                          <CommandItem
                            key={s.id}
                            value={s.name.toLowerCase()}
                            onSelect={() => {
                              setValue(String(s.id));
                              setSelectedState(String(s.id));
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

          <div className="grid gap-2">
            <Label htmlFor="districtName" className="text-zinc-700">
              District Name *
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
