import type { ColumnDef } from "@tanstack/react-table";

import type { District } from "@/table-types/district-table-types";

import DistrictTableColumnDropdown from "@/table-columns-dropdown/district-table-column-dropdown";

export const disctrictColumns: ColumnDef<District>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "DISTRICT",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "code",
    header: "DISTRICT CODE",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.original.code || "N/A"}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DistrictTableColumnDropdown
        id={row.original.id}
        rowData={{
          stateId: row.original.state_id,
          name: row.original.name,
          code: row.original.code || "",
        }}
      />
    ),
  },
];
