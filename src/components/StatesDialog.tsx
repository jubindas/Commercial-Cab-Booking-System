import { useState, useEffect } from "react";

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

import { createState, updateState } from "@/service/apiStates";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";


interface Props {
  mode: "create" | "edit";
  trigger?: React.ReactNode;
  initialData?: { name: string; code: string };
  id?: string | number;
}

export default function StatesDialog({
  mode,
  trigger,
  initialData,
  id,
}: Props) {
  const queryClient = useQueryClient();
 

  const [formData, setFormData] = useState({ name: "", code: "" });

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData(initialData);
    }
  }, [mode, initialData]);

  const mutation = useMutation({
    mutationFn: (data: { name: string; code: string }) =>
      mode === "create"
        ? createState(data)
        : updateState(String(id), data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      console.log(`State ${mode === "create" ? "created" : "updated"}:`, data);
      toast.success(`State ${mode === "create" ? "created" : "updated"}`);
    },
    onError: (err) => {
      console.error(`Failed to ${mode} state:`, err);
      toast.error(`Failed to ${mode} state`);
    },
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function handleSave() {
    if (!formData.name || !formData.code) {
      toast.error("Both name and code are required!");
      return;
    }
    mutation.mutate(formData);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Add State
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Add a State" : "Edit State"}
          </DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Enter the state details below. Both fields are required."
              : "Update the state details below."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">State Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter state name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">State Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter state code"
              value={formData.code}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={handleSave}
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? mode === "create"
                ? "Saving..."
                : "Updating..."
              : mode === "create"
              ? "Save"
              : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
