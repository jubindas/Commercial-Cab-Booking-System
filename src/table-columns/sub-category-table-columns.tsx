import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { SubCategory } from "@/table-types/sub-category-table-types";

export const subCategoryColumns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Sub Category",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "mainCategory",
    header: "Main Category",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("mainCategory")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-zinc-600">
        {row.getValue("description") || "N/A"}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const subCategory = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0 text-zinc-800 hover:text-zinc-800"
            >
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent
            align="end"
            className="w-32 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl"
          >
            <div className="flex flex-col space-y-1">
              <Button
                variant="ghost"
                className="justify-start text-zinc-200 hover:bg-zinc-800"
                onClick={() => alert(`Edit ${subCategory.name}`)}
              >
                Edit
              </Button>
              <Button
                variant="ghost"
                className="justify-start text-red-400 hover:bg-red-500 hover:text-zinc-800"
                onClick={() => alert(`Delete ${subCategory.name}`)}
              >
                Delete
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
];
