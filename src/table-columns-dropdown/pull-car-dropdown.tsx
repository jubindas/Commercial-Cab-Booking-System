import type { PullCar } from "@/table-types/pull-car-types";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { MoreVertical } from "lucide-react";

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

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import PullCarDialog from "@/components/PullCarDialog";

import { deletePullCar } from "@/service/apiPullcar";

import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  row: PullCar;
}

export default function PullCarTableColumnsDropdown({ id, row }: Props) {
  const queryClient = useQueryClient();

  const [openDialog, setOpenDialog] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: (pullCarId: string) => deletePullCar(pullCarId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pullcar"] });
      toast.success("Pull car deleted successfully");
    },
    onError: (err) => {
      console.error("Failed to delete pull car:", err);
      toast.error("Failed to delete pull car");
    },
  });

  const navigate = useNavigate();

  const viewDetails = (id: number) => {
    navigate(`/view-details/pull-cars/${id}`);
  };

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
            <PullCarDialog
              mode="edit"
              id={id}
              initialData={row}
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
              className="justify-start text-zinc-200 hover:bg-zinc-700"
              onClick={() => viewDetails(id)}
            >
              View Details
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
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this pull car?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log("the id from dialog", id);
                deleteMutation.mutate(id.toString());
              }}
              disabled={deleteMutation.isPending}
              className="bg-red-500"
            >
              {deleteMutation.isPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
