import type { ColumnDef } from "@tanstack/react-table";
import type { PullCar } from "@/table-types/pull-car-types";

import PullCarTableColumnsDropdown from "@/table-columns-dropdown/pull-car-dropdown";

export const pullCarColumns: ColumnDef<PullCar>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Car Name",
    cell: ({ row }) => (
      <span className="text-zinc-800 font-medium">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "desc",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-zinc-700">
        {row.original.desc || "No description"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <PullCarTableColumnsDropdown
        id={row.original.id}
        rowData={{
          id: row.original.id,
          name: row.original.name || "",
          desc: row.original.desc || "",
        }}
      />
    ),
  },
];
