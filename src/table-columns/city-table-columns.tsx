import type { ColumnDef } from "@tanstack/react-table";

import type { City } from "@/table-types/city-table-types";

import CityTableColumnDropdown from "@/table-columns-dropdown/city-table-column-dropdown";

export const cityColumns: ColumnDef<City>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "CITY",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.original.name}</span>
    ),
  },
  {
    accessorKey: "code",
    header: "City Code",
    cell: ({ row }) => row.original.code || "-",
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <CityTableColumnDropdown
        id={row.original.id}
        rowData={{
          districtId: row.original.district_id,
          name: row.original.name,
          code: row.original.code ?? "",
        }}
      />
    ),
  },
];
