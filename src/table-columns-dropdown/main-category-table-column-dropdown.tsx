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

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { toggleCategoryStatus } from "@/service/apiCategory";

import MainCategoryDialog from "@/components/MainCategoryDialog";

interface Props {
  id: string | number;
  rowData?: { name: string; description: string; is_active: boolean };
}

export default function MainCategoryTableColumnDropdown({
  id,
  rowData,
}: Props) {
  const queryClient = useQueryClient();

  const toggleMutation = useMutation({
    mutationFn: ({
      id,
      isActive,
    }: {
      id: string | number;
      isActive: boolean;
    }) => toggleCategoryStatus(String(id), isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(`${rowData?.name} status updated.`);
    },
    onError: (err) => {
      console.error("Failed to update category status:", err);
      toast.error("Failed to update category status");
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
        className="w-32 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2"
      >
        <div className="flex flex-col space-y-1">
          <MainCategoryDialog
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
                  rowData?.is_active
                    ? "text-red-400 hover:bg-red-500"
                    : "text-green-400 hover:bg-green-500"
                } hover:text-zinc-800`}
              >
                {rowData?.is_active ? "Disable" : "Enable"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {rowData?.is_active ? "Confirm Disable" : "Confirm Enable"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to{" "}
                  {rowData?.is_active ? "disable" : "enable"}{" "}
                  <span className="font-semibold">{rowData?.name}</span>?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    toggleMutation.mutate({ id, isActive: !rowData?.is_active })
                  }
                  disabled={toggleMutation.isPending}
                  className={rowData?.is_active ? "bg-red-500" : "bg-green-500"}
                >
                  {toggleMutation.isPending
                    ? rowData?.is_active
                      ? "Disabling..."
                      : "Enabling..."
                    : rowData?.is_active
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
