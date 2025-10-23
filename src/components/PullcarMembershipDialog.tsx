/* eslint-disable @typescript-eslint/no-explicit-any */
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

import { useEffect, useState } from "react";

import { Textarea } from "./ui/textarea";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  createPullCarsMembership,
  updatePullCarsMembership,
} from "@/service/apiPullcarMembership";

import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";

interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  id?: string;
  initialData?: {
    name: string;
    price: string;
    description: string;
  };
}

export default function PullcarMembershipDialog({
  mode,
  id,
  trigger,
  initialData,
}: Props) {
  const [name, setName] = useState("");

  const [price, setPrice] = useState<string>("");

  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const { token } = useAuth();

  useEffect(() => {
    if (mode === "edit" && initialData) {
      console.log("the initial datas are", initialData);
      setName(initialData?.name);
      setDescription(initialData.description);
      setPrice(initialData?.price);
    }
  }, [mode, initialData]);

  const createPullCar = useMutation({
    mutationFn: (data: any) =>
      mode === "create"
        ? createPullCarsMembership(data, token)
        : updatePullCarsMembership(id, data, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pullcar-memberships"] });
      toast(
        mode === "create"
          ? "The Pull Car Membership Created"
          : "The Pull Car Membership Updated"
      );
      setName("");
      setPrice("");
      setDescription("");
    },
    onError: (err) => {
      console.error("Failed to save pincode:", err);
      toast.error(
        err instanceof Error
          ? `Error: ${err.message}`
          : "Failed to save pincode. Please try again."
      );
    },
  });

  const handleSave = () => {
    if (!name) {
      alert("Name is required");
      return;
    }

    const membershipData = {
      name,
      price,
      description,
    };

    createPullCar.mutate(membershipData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Pool Car Membership
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            {mode === "create"
              ? "Add Pullcar Membership"
              : "Edit Pullcar Membership"}
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the membership details below.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-zinc-700">
              Name *
            </Label>
            <Input
              id="name"
              placeholder="Enter membership name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="price" className="text-zinc-700">
              Price *
            </Label>
            <Input
              type="number"
              id="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-zinc-700">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleSave}
            disabled={createPullCar.isPending}
          >
            {createPullCar.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
