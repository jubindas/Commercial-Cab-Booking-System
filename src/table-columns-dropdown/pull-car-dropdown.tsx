import type { PullCar } from "@/table-types/pull-car-types";
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { disablePullCar } from "@/service/apiPullcar";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  row: PullCar;
}

export default function PullCarTableColumnsDropdown({ id, row }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const toggleMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      disablePullCar(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pullcar"] });
      toast.success(
        `${row.name || "Pull Car"} ${
          row.is_active ? "disabled" : "enabled"
        } successfully`
      );
    },
    onError: (err) => {
      console.error("Failed to update pull car status:", err);
      toast.error("Failed to update pull car status");
    },
  });

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
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              className="justify-start text-zinc-200 hover:bg-zinc-700"
              onClick={() => viewDetails(id)}
            >
              View Details
            </Button>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  className={`justify-start ${
                    row.is_active
                      ? "text-red-400 hover:bg-red-500"
                      : "text-green-400 hover:bg-green-500"
                  }`}
                >
                  {row.is_active ? "Disable" : "Enable"}
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent className="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {row.is_active ? "Confirm Disable" : "Confirm Enable"}
                  </AlertDialogTitle>
                  <p className="text-sm text-zinc-700 mt-1">
                    Are you sure you want to{" "}
                    {row.is_active ? "disable" : "enable"}{" "}
                    <span className="font-semibold">{row.name}</span>?
                  </p>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() =>
                      toggleMutation.mutate({
                        id: id.toString(),
                        isActive: !row.is_active,
                      })
                    }
                    disabled={toggleMutation.isPending}
                    className={row.is_active ? "bg-red-500" : "bg-green-500"}
                  >
                    {toggleMutation.isPending
                      ? row.is_active
                        ? "Disabling..."
                        : "Enabling..."
                      : row.is_active
                      ? "Disable"
                      : "Enable"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
