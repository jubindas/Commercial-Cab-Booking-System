import { useState } from "react";

import {  Dialog,  DialogContent,  DialogDescription,  DialogHeader,  DialogTitle,  DialogTrigger } from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { createState } from "@/service/apiStates";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";



export default function StatesDialog() {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });


  const mutation = useMutation({
    mutationFn: createState,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      console.log(" State created:", data);
      setFormData({ name: "", code: "" });
      toast("The State is Created")
    },
    onError: (err) => {
      console.error(" Failed to create state:", err);
    },
  });


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }


  function handleSave() {
    if (!formData.name || !formData.code) {
      alert("Both name and code are required!");
      return;
    }
    mutation.mutate(formData);
  }

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add State
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">Add a State</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the state details below. Both fields are required.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-zinc-700">
              State Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter state name"
              value={formData.name}
              onChange={handleChange}
              required
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="code" className="text-zinc-700">
              State Code
            </Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter state code"
              value={formData.code}
              onChange={handleChange}
              required
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
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
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
