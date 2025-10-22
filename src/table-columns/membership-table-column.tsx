import type { ColumnDef } from "@tanstack/react-table";

import type { Membership } from "@/table-types/membership-table-types";

import MembershipTableColumnDropdown from "@/table-columns-dropdown/membership-table-column-dropdown";

export const membershipColumns: ColumnDef<Membership>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "sub_category",
    header: "Sub Category",
    cell: ({ row }) => (
      <span className="text-zinc-700 block max-w-25 truncate">
        {row.original.sub_category?.name || "-"}
      </span>
    ),
  },

  {
    accessorKey: "name",
    header: "Membership Name",
    cell: ({ row }) => (
      <span className="text-zinc-700 block max-w-25 truncate">
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span
        className="text-zinc-700 block max-w-25 truncate"
        title={row.getValue("description") || "N/A"}
      >
        {row.getValue("description") || "N/A"}
      </span>
    ),
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span className="text-zinc-700">₹{row.getValue("price")}</span>
    ),
  },
  {
    accessorKey: "discounted_price",
    header: "Discounted Price",
    cell: ({ row }) => (
      <span className="text-zinc-700">₹{row.getValue("discounted_price")}</span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <MembershipTableColumnDropdown
          id={row.original.id}
          rowData={{
            sub_category_id:
              row.original.sub_category?.id ?? row.original.sub_category_id,
            name: row.original.name,
            description: row.original.description,
            price: Number(row.original.price),
            discounted_price: row.original.discounted_price
              ? Number(row.original.discounted_price)
              : 0,
            discounted_percentage: row.original.discounted_percentage ?? 0,
          }}
        />
      );
    },
  },
];
