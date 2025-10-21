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

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { getDistrict } from "@/service/apiDistrict";

import { createCity, updateCity } from "@/service/apiCities";

import type { District } from "@/table-types/district-table-types";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: { districtId: string; name: string; code: string };
  id?: string | number;
}

export default function CityDialog({ mode, trigger, initialData, id }: Props) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>("");
  const [cityName, setCityName] = useState("");
  const [cityCode, setCityCode] = useState("");

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setSelectedDistrict(initialData.districtId);
      setCityCode(initialData.code);
      setCityName(initialData.name);
    }
  }, [mode, initialData]);

  const { data: districts = [] } = useQuery<District[]>({
    queryKey: ["districts"],
    queryFn: getDistrict,
  });

  const cityMutation = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: (cityData: any) =>
      mode === "create"
        ? createCity(cityData)
        : updateCity(String(id), cityData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      toast.success(
        mode === "create"
          ? "City created successfully"
          : "City updated successfully"
      );
      setSelectedDistrict("");
      setCityName("");
      setCityCode("");
    },
    onError: (err) => {
      console.error(
        `Failed to ${mode === "create" ? "create" : "update"} city:`,
        err
      );
      toast.error(`Failed to ${mode === "create" ? "create" : "update"} city`);
    },
  });

  const handleSave = () => {
    if (!selectedDistrict || !cityName) {
      console.log("Please fill all required fields");
      return;
    }

    const city = {
      district_id: Number(selectedDistrict),
      name: cityName,
      code: cityCode,
    };

    cityMutation.mutate(city);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            {mode === "create" ? "Add City" : "Edit City"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            {mode === "create" ? "Add a City" : "Edit City"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the city details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <div className="grid gap-2">
              <Label htmlFor="state" className="text-zinc-700">
                District *
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
                      ? districts?.find((s: District) => String(s.id) === value)
                          ?.name
                      : "Select state..."}
                    <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-130 p-0 bg-white">
                  <Command>
                    <CommandInput placeholder="Search state... here" />
                    <CommandList>
                      <CommandEmpty>No state found.</CommandEmpty>
                      <CommandGroup>
                        {districts?.map((s: District) => (
                          <CommandItem
                            key={s.id}
                            value={s.name.toLowerCase()}
                            onSelect={() => {
                              setValue(String(s.id));
                              setSelectedDistrict(String(s.id));
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
            <Label htmlFor="cityName" className="text-zinc-700">
              City Name *
            </Label>
            <Input
              id="cityName"
              placeholder="Enter city name"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="cityCode" className="text-zinc-700">
              City Code
            </Label>
            <Input
              id="cityCode"
              placeholder="Enter city code"
              value={cityCode}
              onChange={(e) => setCityCode(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={cityMutation.isPending}
          >
            {cityMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
