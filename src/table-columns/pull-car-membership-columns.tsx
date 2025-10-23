import type { ColumnDef } from "@tanstack/react-table";

import type { PullCarMembership } from "@/table-types/pullcar-memberships-types";

import PullCarMembershipDropdown from "@/table-columns-dropdown/pull-car-membership-column-dropdown";

const ellipsisStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "block",
  maxWidth: "150px",
};

export const pullCarMembershipColumns: ColumnDef<PullCarMembership>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>{row.original.name ?? "N/A"}</span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>{row.original.description ?? "N/A"}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>{row.original.price ?? "N/A"}</span>
    ),
  },
  {
    header: "Status",
    cell: ({ row }) => (
      <span>{row.original.is_active ? "Active" : "Disactive"}</span>
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
