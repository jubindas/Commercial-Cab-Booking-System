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

import { deleteMembership } from "@/service/apiMembership";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useState } from "react";

import MembershipDialog from "@/components/MembershipDialog";

import { useNavigate } from "react-router-dom";

interface Props {
  id: string | number;
  rowData?: {
    sub_category_id: number;
    name: string;
    description: string;
    price: number;
    discounted_price: number;
    discounted_percentage: number;
  };
}

export default function MembershipTableColumnDropdown({ id, rowData }: Props) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: (membershipId: string | number) =>
      deleteMembership(membershipId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["membership"] });
      toast.success("Membership deleted successfully");
    },
    onError: (err) => {
      console.error("Failed to delete membership:", err);
      toast.error("Failed to delete membership");
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
            <MembershipDialog
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
              className="justify-start text-zinc-200 hover:bg-zinc-800"
              onClick={() => navigate(`/user-membership`)}
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
              Are you sure you want to delete this membership?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate(id)}
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
