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

import { deleteLocation } from "@/service/apiLocation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import LocationDialog from "@/components/LocationDialog";

interface Props {
  id: string | number;
  rowData?: {cityId: string; name: string; longitude: string; latitude: string}
}

export default function LocationTableColumnDropdown({ id, rowData }: Props) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const deleteLocations = useMutation({
    mutationFn: (locationId: string | number) =>
      deleteLocation(String(locationId)),

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
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreVertical className="h-4 w-4 text-zinc-800" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 bg-zinc-800 border border-zinc-700 p-2">
          <div className="flex flex-col">
            <LocationDialog 
             mode="edit"
              id={id}
              initialData={rowData}
              trigger={
                <Button
                  variant="ghost"
                  className="justify-start text-zinc-200 hover:bg-zinc-700"
                >
                  Edit
                </Button>
              }
            />
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
              Are you sure you want to delete this location?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteLocations.mutate(id)}
              disabled={deleteLocations.isPending}
               className="bg-red-500"
            >
              {deleteLocations.isPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
