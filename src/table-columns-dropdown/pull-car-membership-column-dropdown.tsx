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
import PullcarMembershipDialog from "@/components/PullcarMembershipDialog";
import { disablePullCarMembership } from "@/service/apiPullcarMembership";
import type { PullCarMembership } from "@/table-types/pullcar-memberships-types";
import { useAuth } from "@/hooks/useAuth";

interface Props {
  id: string;
  rowData: PullCarMembership;
}

export default function PullCarMembershipDropdown({ id, rowData }: Props) {
  const queryClient = useQueryClient();

  const { token } = useAuth();

  const toggleMutation = useMutation({
    mutationFn: (isActive: boolean) =>
      disablePullCarMembership(id, isActive, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pullcar-memberships"] });
      toast.success(
        `${rowData.name} ${
          rowData.is_active ? "disabled" : "enabled"
        } successfully`
      );
    },
    onError: (err) => {
      console.error("Failed to update membership status:", err);
      toast.error("Failed to update membership status");
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
        <div className="flex flex-col">
          <PullcarMembershipDialog
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
                className={`justify-start ${
                  rowData.is_active
                    ? "text-red-400 hover:bg-red-500"
                    : "text-green-400 hover:bg-green-500"
                }`}
              >
                {rowData.is_active ? "Disable" : "Enable"}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white text-zinc-900">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {rowData.is_active ? "Confirm Disable" : "Confirm Enable"}
                </AlertDialogTitle>
                <p className="text-sm text-zinc-700 mt-1">
                  Are you sure you want to{" "}
                  {rowData.is_active ? "disable" : "enable"}{" "}
                  <span className="font-semibold">{rowData.name}</span>?
                </p>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => toggleMutation.mutate(!rowData.is_active)}
                  disabled={toggleMutation.isPending}
                  className={rowData.is_active ? "bg-red-500" : "bg-green-500"}
                >
                  {toggleMutation.isPending
                    ? rowData.is_active
                      ? "Disabling..."
                      : "Enabling..."
                    : rowData.is_active
                    ? "Disable"
                    : "Enable"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </PopoverContent>
    </Popover>
  );
}
