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

import { useNavigate } from "react-router-dom";

import type { TotalSalesMan } from "@/table-types/total-sales-man-table-type";

import { deleteSalesmen } from "@/service/apiSalesman";

import SalesManDialog from "@/components/SalesManDialog";

interface Props {
  id: number;
  salesman: TotalSalesMan;
}

export default function SalesmanTableColumnsDropdown({ id, salesman }: Props) {
  console.log("the row data from now on is", salesman);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const token = localStorage.getItem("token");

  const deleteMutation = useMutation({
    mutationFn: (salesmanId: string) => deleteSalesmen(salesmanId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salesmen"] });
      toast.success("Salesman deleted successfully");
    },
    onError: (err) => {
      console.error("Failed to delete salesman:", err);
      toast.error("Failed to delete salesman");
    },
  });

  const viewDetails = (id: number) => {
    navigate(`/view-details/salesmen/${id}`);
  };

  const viewReferrals = (id: number) => {
    navigate(`/view-details/referrals/${id}`);
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
            <SalesManDialog
              mode="edit"
              id={id}
              initialData={salesman}
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
              className="justify-start text-zinc-200 hover:bg-zinc-700"
              onClick={() => viewReferrals(id)}
            >
              Referrals
            </Button>

            <Button
              variant="ghost"
              className="justify-start text-red-500 hover:bg-zinc-700"
              onClick={() => setOpenDialog(true)}
            >
              Disable
            </Button>
          </div>
        </PopoverContent>
      </Popover>

      <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this salesman?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                console.log("Deleting salesman with ID:", id);
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
