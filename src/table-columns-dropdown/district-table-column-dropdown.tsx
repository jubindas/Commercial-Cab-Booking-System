import {MoreVertical  } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { deleteDistrict } from "@/service/apiDistrict";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner"

interface Props {
  id: string | number;
}


export default function DistrictTableColumnDropdown({id}: Props) {
const queryClient = useQueryClient();

  const deleteState = useMutation({
    mutationFn: (stateId: string | number) => deleteDistrict(String(stateId)),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["district"] });
      console.log("District deleted:", data);
      toast("The District is Deleted")
    },

    onError: (err) => {
      console.error("Failed to delete state:", err);
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical  className="h-4 w-4 text-zinc-800" />
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
            onClick={() => deleteState.mutate(id)}
            disabled={deleteState.isPending}
          >
            {deleteState.isPending ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}