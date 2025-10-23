import { useState } from "react";
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
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { toggleUserMembershipApproval } from "@/service/apiUserMembership";

interface Props {
  id: number;
  rowData: { is_membership_approved: boolean; name: string };
  token: string | null;
}

export default function UserMembershipActionDropdown({
  id,
  rowData,
  token,
}: Props) {
  const queryClient = useQueryClient();
  const [isApproved, setIsApproved] = useState(rowData.is_membership_approved);

  const approveMutation = useMutation({
    mutationFn: () => toggleUserMembershipApproval(id, isApproved, token),
    onSuccess: () => {
      setIsApproved(true);
      queryClient.invalidateQueries({ queryKey: ["user-membership"] });
      toast.success(`${rowData.name} membership approved!`);
    },
    onError: () => {
      toast.error("Failed to approve membership");
    },
  });

  const handleAction = () => {
    approveMutation.mutate();
  };

  const buttonText = isApproved ? "Disapprove" : "Approve";
  const buttonColor = isApproved
    ? "text-red-500 hover:bg-red-500 hover:text-white"
    : "text-green-400 hover:bg-green-500 hover:text-white";
  const isPending = approveMutation.isPending;

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
        className="w-32 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2"
      >
        <div className="flex flex-col space-y-1">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className={`justify-start ${buttonColor}`}
              >
                {buttonText}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm {buttonText}</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to {buttonText.toLowerCase()}{" "}
                  <span className="font-semibold">{rowData.name}</span>{" "}
                  membership?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleAction}
                  disabled={isPending}
                  className={isApproved ? "bg-red-500" : "bg-green-500"}
                >
                  {isPending ? `${buttonText}ing...` : buttonText}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
