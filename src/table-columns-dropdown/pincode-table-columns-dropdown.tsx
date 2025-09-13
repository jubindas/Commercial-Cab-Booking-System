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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deletePincode } from "@/service/apiPincode";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface Props {
  id: string | number;
}

export default function PincodeTableColumnsDropdown({ id }: Props) {
  const queryClient = useQueryClient();

  const deletePincodes = useMutation({
    mutationFn: (pincodeId: string | number) => deletePincode(String(pincodeId)),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["pincodes"] });
      console.log("Pincode deleted:", data);
      toast("The Pincode is Deleted");
    },

    onError: (err) => {
      console.error("Failed to delete pincode:", err);
      toast.error("Failed to delete pincode");
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="justify-start text-red-500 hover:bg-zinc-700"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white text-zinc-900">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this pincode? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deletePincodes.mutate(id)}
                  disabled={deletePincodes.isPending}
                  className="bg-red-500"
                >
                  {deletePincodes.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
