import type { ColumnDef } from "@tanstack/react-table"

import type { VendorsHistory } from "../table-types/history-vendor-types";


export const vendorColumns: ColumnDef<VendorsHistory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-zinc-800">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "VENDOR NAME",
    cell: ({ row }) => <span className="text-zinc-800">{row.original.name}</span>,
  },
  {
    accessorKey: "code",
    header: "CODE",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.original.code || "N/A"}</span>
    ),
  },
 
 
  
]
