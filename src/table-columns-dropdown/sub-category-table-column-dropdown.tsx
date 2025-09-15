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

import { deleteSubcategory } from "@/service/apiSubCategory";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { useState } from "react";

import SubCategoriesDialog from "@/components/SubCategoriesDialog";

interface Props {
  id: string | number;
  rowData?: {
    name: string;
    code: string;
    category_id: number;
    description?: string;
  };
}

export default function SubCategoryTableColumnDropdown({ id, rowData }: Props) {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);

  const deleteSubCategoryMutation = useMutation({
    mutationFn: (subCategoryId: string | number) =>
      deleteSubcategory(Number(subCategoryId)),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
      console.log("Subcategory deleted:", data);
      toast("The Subcategory has been deleted.");
    },

    onError: (err) => {
      console.error("Failed to delete subcategory:", err);
      toast.error("Failed to delete subcategory");
    },
  });

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-800">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-32 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2"
        >
          <div className="flex flex-col space-y-1">
            <SubCategoriesDialog
              mode="edit"
              id={id}
              initialData={
                rowData
                  ? { ...rowData, description: rowData.description || "" }
                  : undefined
              }
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
              className="justify-start text-red-400 hover:bg-red-500 hover:text-zinc-800"
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
              Are you sure you want to delete this subcategory?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteSubCategoryMutation.mutate(id)}
              disabled={deleteSubCategoryMutation.isPending}
              className="bg-red-500"
            >
              {deleteSubCategoryMutation.isPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
