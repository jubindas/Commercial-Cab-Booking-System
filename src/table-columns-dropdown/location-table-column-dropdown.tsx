import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { deleteLocation } from "@/service/apiLocation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  id: string | number;
}

export default function LocationTableColumnDropdown({ id }: Props) {
  const queryClient = useQueryClient();

  const deleteLocations = useMutation({
    mutationFn: (locationId: string | number) => deleteLocation(String(locationId)),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
      console.log("Location deleted:", data);
      toast("The Location is Deleted");
    },

    onError: (err) => {
      console.error("Failed to delete location:", err);
      toast.error("Failed to delete location");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-zinc-800" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 bg-zinc-800 border border-zinc-700 p-2">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-700"
            onClick={() => console.log("Edit clicked for:", id)}
          >
            Edit
          </Button>
          <Button
            variant="ghost"
            className="justify-start text-red-500 hover:bg-zinc-700"
            onClick={() => deleteLocations.mutate(id)}
            disabled={deleteLocations.isPending}
          >
            {deleteLocations.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
