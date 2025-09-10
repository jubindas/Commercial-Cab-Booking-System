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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function MainCategoryDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-600 text-white hover:bg-purple-700">
          Add Category
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px] bg-white text-zinc-900 border border-zinc-200 shadow-md rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-zinc-900">
            Add a Main Category
          </DialogTitle>
          <DialogDescription className="text-zinc-500">
            Enter the category details below. Description is optional.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-zinc-700">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter category name"
              required
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="text-zinc-700">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Add a short description for this category"
              className="bg-zinc-50 text-zinc-900 border border-zinc-300 placeholder:text-zinc-400"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="membership" className="text-zinc-700">
              Membership
            </Label>
            <Input
              id="membership"
              placeholder="Enter membership type (e.g., Gold Membership)"
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
          <Button className="bg-purple-600 text-white hover:bg-purple-700">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
