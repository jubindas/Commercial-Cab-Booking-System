import type { ColumnDef } from "@tanstack/react-table";
import type { PullCar } from "@/table-types/pull-car-types";
import PullCarTableColumnsDropdown from "@/table-columns-dropdown/pull-car-dropdown";

export const pullCarColumns: ColumnDef<PullCar>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active ? "text-zinc-800" : "text-red-700 line-through"
        }
      >
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Car Name",
    cell: ({ row }) => (
      <span
        className={`font-medium ${
          row.original.is_active ? "text-zinc-800" : "text-red-700 line-through"
        }`}
      >
        {row.original.name}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active
            ? "text-zinc-700 block max-w-15 truncate"
            : "text-red-700 italic block max-w-15 truncate"
        }
      >
        {row.original.description || "No description"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active ? "text-zinc-700" : "text-red-700 line-through"
        }
      >
        {row.original.price || "-"}
      </span>
    ),
  },
  {
    accessorKey: "capacity",
    header: "Capacity",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active ? "text-zinc-700" : "text-red-700 line-through"
        }
      >
        {row.original.capacity}
      </span>
    ),
  },
  {
    accessorKey: "location_start",
    header: "From",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active ? "text-zinc-700" : "text-red-700 line-through"
        }
      >
        {row.original.location_start}
      </span>
    ),
  },
  {
    accessorKey: "location_end",
    header: "To",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active ? "text-zinc-700" : "text-red-700 line-through"
        }
      >
        {row.original.location_end}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <PullCarTableColumnsDropdown id={row.original.id} row={row.original} />
    ),
  },
];
