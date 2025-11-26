/* eslint-disable @typescript-eslint/no-explicit-any */
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import {
  toggleUserMembershipApproval,
  rejectUserMembership,
} from "@/service/apiUserMembership";

import { useAuth } from "@/hooks/useAuth";

import { useNavigate } from "react-router-dom";

import type { Membership } from "@/table-types/membership-table-types";

interface Props {
  id: string;
  rowData: Membership;
}

export default function UserMembershipActionDropdown({ id, rowData }: Props) {
  const { token } = useAuth();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const approveMutation = useMutation({
    mutationFn: () =>
      toggleUserMembershipApproval(id, rowData.is_membership_approved, token),
    onSuccess: () => {
      toast.success("Membership approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-membership"] });
    },
    onError: (err: any) => {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectUserMembership(id, token),
    onSuccess: () => {
      toast.success("Membership rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-membership"] });
    },
    onError: (err: any) => {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-zinc-800 hover:text-zinc-800"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-36 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2"
      >
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start text-blue-400 hover:bg-blue-500 hover:text-white"
            onClick={() => navigate(`/user-membership-details/${id}`)}
          >
            View Details
          </Button>
          {!rowData.is_membership_approved && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className="justify-start text-green-500 hover:bg-green-300"
                >
                  Approve
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-white text-zinc-900">
                <AlertDialogHeader>
                  <AlertDialogTitle>Approve Membership</AlertDialogTitle>
                  <p className="text-sm text-zinc-700 mt-1">
                    Do you want to approve or reject the membership for{" "}
                    <span className="font-semibold">{rowData.user?.name}</span>?
                  </p>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>

                  <AlertDialogAction
                    className="bg-red-600 text-white hover:bg-red-700"
                    onClick={() => rejectMutation.mutate()}
                    disabled={rejectMutation.isPending}
                  >
                    {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                  </AlertDialogAction>

                  <AlertDialogAction
                    className="bg-green-600 text-white hover:bg-green-700"
                    onClick={() => approveMutation.mutate()}
                    disabled={approveMutation.isPending}
                  >
                    {approveMutation.isPending ? "Approving..." : "Approve"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
