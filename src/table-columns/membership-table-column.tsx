
import type { ColumnDef } from "@tanstack/react-table";
import type { Membership } from "@/table-types/membership-table-types";

export const membershipColumns: ColumnDef<Membership>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-zinc-700">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "subCategoryName",
    header: "Sub Category",
    cell: ({ row }) => <span className="text-zinc-700">{row.getValue("subCategoryName")}</span>,
  },
  {
    accessorKey: "name",
    header: "Membership Name",
    cell: ({ row }) => <span className="text-zinc-700">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="text-zinc-700">{row.getValue("description")}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span className="text-zinc-700">₹{row.getValue("price")}</span>,
  },
  {
    accessorKey: "discounted_price",
    header: "Discounted Price",
    cell: ({ row }) => <span className="text-zinc-700">₹{row.getValue("discounted_price")}</span>,
  },
  {
    accessorKey: "discounted_percentage",
    header: "Discount %",
    cell: ({ row }) => <span className="text-zinc-700">{row.getValue("discounted_percentage")}%</span>,
  },
];
