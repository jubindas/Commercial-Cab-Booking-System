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
  togglePoolUserMembershipApproval,
  rejectPoolUserMembership,
} from "@/service/apiUserPoolcarMembership";
import { useAuth } from "@/hooks/useAuth";

interface UserMembership {
  id: number;
  name: string;
  price: string;
  payment_method: string;
  status: string;
  is_membership_approved: boolean;
  purchased_at: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

interface Props {
  id: string;
  rowData: UserMembership;
}

export default function UserPoolCarMembershipDropdown({ id, rowData }: Props) {
  const { token } = useAuth();
  const queryClient = useQueryClient();

  const approveMutation = useMutation({
    mutationFn: () =>
      togglePoolUserMembershipApproval(id, rowData.is_membership_approved, token),
    onSuccess: () => {
      toast.success("Membership approved successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-membership-pool-car"] });
    },
    onError: (err: any) => {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: () => rejectPoolUserMembership(id, token),
    onSuccess: () => {
      toast.success("Membership rejected successfully!");
      queryClient.invalidateQueries({ queryKey: ["user-membership-pool-car"] });
    },
    onError: (err: any) => {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreVertical className="h-4 w-4 text-zinc-800" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-36 bg-zinc-800 border border-zinc-700 p-2">
        <div className="flex flex-col space-y-1">
          <Button variant="ghost" className="justify-start text-white">
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
