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

export default function LocationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Location
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-zinc-950 text-zinc-100 border border-zinc-800 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Add a Location</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Enter the location details below. Description is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="location" className="text-zinc-300">
              Location
            </Label>
            <Input
              id="location"
              placeholder="Enter location"
              required
              className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-500"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-zinc-300">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add a short note about this location"
              className="bg-zinc-800 text-white border-zinc-700 placeholder:text-zinc-500"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="outline" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
            Cancel
          </Button>
          <Button className="bg-purple-600 text-white hover:bg-purple-500">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
