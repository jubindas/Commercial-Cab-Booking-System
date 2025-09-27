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

export default function SalesManDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Sales Man
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900">
        <DialogHeader>
          <DialogTitle>Add Sales Man</DialogTitle>
          <DialogDescription>
            Enter the sales man details below. Both fields are required.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Sales Man Name</Label>
            <Input id="name" type="text" placeholder="Enter sales man name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="code">Phone Number</Label>
            <Input id="code" type="text" placeholder="Enter phone number" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="text" placeholder="Enter email" />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
