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
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-zinc-700">
        {row.original.description || "No description"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.original.price || "-"}</span>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.original.capacity}</span>
    ),
  },
  {
    accessorKey: "journey_start_time",
    header: "Start Time",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.original.journey_start_time}</span>
    ),
  },
  {
    accessorKey: "location_start",
    header: "From",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.original.location_start}</span>
    ),
  },
  {
    accessorKey: "location_end",
    header: "To",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.original.location_end}</span>
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
          description: row.original.description || "",
          price: row.original.price,
          capacity: row.original.capacity,
          journey_start_time: row.original.journey_start_time,
          location_start: row.original.location_start,
          location_end: row.original.location_end,
          car_details: row.original.car_details || "",
          image1: row.original.image1 || null,
          image2: row.original.image2 || null,
          image3: row.original.image3 || null,
          image4: row.original.image4 || null,
          created_at: row.original.created_at || "",
        }}
      />
    ),
  },
];
