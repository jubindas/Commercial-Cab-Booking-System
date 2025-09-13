import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { deleteCity } from "@/service/apiCities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";

interface Props {
  id: string | number;
}

export default function CityTableColumnDropdown({ id }: Props) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const deleteCityMutation = useMutation({
    mutationFn: (cityId: string | number) => deleteCity(String(cityId)),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["cities"] });
      console.log("City deleted:", data);
      toast("The City is Deleted");
    },

    onError: (err) => {
      console.error("Failed to delete city:", err);
      toast.error("Failed to delete city");
    },
  });

  return (
    <>
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
              onClick={() => setOpenDialog(true)}
            >
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this city?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteCityMutation.mutate(id)}
              disabled={deleteCityMutation.isPending}
              className="bg-red-500"
            >
              {deleteCityMutation.isPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
