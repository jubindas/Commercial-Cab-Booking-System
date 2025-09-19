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

import { deleteStates } from "@/service/apiStates";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import StatesDialog from "@/components/StatesDialog";


interface Props {
  id: string | number;
  rowData?: { name: string; code: string }; 
}

export default function StateTablCcolumnDropdown({ id, rowData }: Props) {
  const queryClient = useQueryClient();

  const deleteState = useMutation({
    mutationFn: (stateId: string | number) => deleteStates(String(stateId)),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["states"] });
      toast("The State is Deleted");
      console.log(data);
    },
    onError: (err) => {
      console.error("Failed to delete state:", err);
      toast.error("Failed to delete state");
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
          <StatesDialog
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

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="justify-start text-red-500 hover:bg-zinc-700"
              >
                Delete
              </Button>
            </AlertDialogTrigger>
             <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this state? This action cannot
                  be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => deleteState.mutate(id)}
                  disabled={deleteState.isPending}
                  className="bg-red-500"
                >
                  {deleteState.isPending ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
