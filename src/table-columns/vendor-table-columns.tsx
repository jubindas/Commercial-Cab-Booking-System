import type { ColumnDef } from "@tanstack/react-table";

import { Switch } from "@/components/ui/switch";

import type { Vendor } from "@/table-types/vendor-table-types";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";



import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";


export const vendorColumns: ColumnDef<Vendor>[] = [

  

  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "Vendor Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => <span>{row.getValue("phone")}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => {
      const vendor = row.original;
      const enabled = vendor.status === "Active";

      return (
        <div className="flex items-center gap-2">
          <Switch
            checked={enabled}
            onCheckedChange={(value) =>
              alert(
                `${vendor.name} is now ${value ? "Active" : "Inactive"}`
              )
            }
          />
          <span>{enabled ? "Active" : "Inactive"}</span>
        </div>
      );
    },
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
            className="w-36 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl"
          >
            <div className="flex flex-col space-y-1">
                 <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-800"
            onClick={() => {}}
          >
            View Details
          </Button>
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
