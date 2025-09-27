import type { ColumnDef } from "@tanstack/react-table";

import type { Membership } from "@/table-types/membership-table-types";

export const membershipColumns: ColumnDef<Membership>[] = [
  {
    accessorKey: "membership_id",
    header: "Membership ID",
    cell: ({ row }) => <span>{row.getValue("membership_id")}</span>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <span>{row.getValue("quantity")}</span>,
  },
  {
    accessorKey: "member",
    header: "Member",
    cell: ({ row }) => <span>{row.getValue("member")}</span>,
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>{row.getValue("price")}</span>,
  },
  {
    accessorKey: "total_price",
    header: "Total Price",
    cell: ({ row }) => <span>{row.getValue("total_price")}</span>,
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => <span>{row.getValue("notes") ?? "N/A"}</span>,
  },
];
