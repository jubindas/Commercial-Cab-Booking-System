import type { ColumnDef } from "@tanstack/react-table";
import type { PullCarMembership } from "@/table-types/pullcar-memberships-types";
import PullCarMembershipDropdown from "@/table-columns-dropdown/pull-car-membership-column-dropdown";

export const pullCarMembershipColumns: ColumnDef<PullCarMembership>[] = [
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
    header: "Membership Name",
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
    accessorKey: "is_active",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_active
            ? "text-green-600 font-semibold"
            : "text-red-600 font-semibold"
        }
      >
        {row.original.is_active ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <PullCarMembershipDropdown
        id={row.original.id.toString()}
        rowData={row.original}
      />
    ),
  },
];
