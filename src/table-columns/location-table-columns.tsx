import type { ColumnDef } from "@tanstack/react-table";

import type { Location } from "@/table-types/location-table-types";

import LocationTableColumnDropdown from "@/table-columns-dropdown/location-table-column-dropdown";

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Location",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "latitude",
    header: "LATITUDE",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">
        {row.getValue("latitude") || "N/A"}
      </span>
    ),
  },

  {
    accessorKey: "longitude",
    header: "LONGITUDE",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">
        {row.getValue("longitude") || "N/A"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <LocationTableColumnDropdown
          id={row.original.id}
          rowData={{
            cityId: row.original.city_id,
            name: row.original.name,
            longitude: row.original.longitude || "",
            latitude: row.original.latitude || "",
          }}
        />
      );
    },
  },
];
