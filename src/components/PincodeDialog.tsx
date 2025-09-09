import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"


export default function PincodeDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Pincode
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">Add a Pincode</DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the pincode details below. Fallback pincodes can be comma-separated.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="pincode" className="text-zinc-700">
              Pincode
            </Label>
            <Input
              id="pincode"
              placeholder="Enter main pincode"
              required
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="fallback" className="text-zinc-700">
              Fallback Pincodes
            </Label>
            <Input
              id="fallback"
              placeholder="Enter fallback pincodes, separated by commas"
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description" className="text-zinc-700">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add a short note about this pincode"
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
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
