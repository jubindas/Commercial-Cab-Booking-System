import type { ColumnDef } from "@tanstack/react-table";
import type { Membership } from "@/table-types/membership-table-types";
import UserMembershipActionDropdown from "@/table-columns-dropdown/UserMembershipActionDropdown";

const ellipsisStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "block",
  maxWidth: "150px",
};

export const membershipColumns: ColumnDef<Membership>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.getValue("id")}</span>,
  },
  {
    accessorKey: "membership.name",
    header: "Membership",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>
        {row.original.membership?.name ?? "N/A"}
      </span>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <span>{row.getValue("quantity")}</span>,
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const statusColor =
        status === "active"
          ? "bg-green-100 text-green-800"
          : status === "inactive"
          ? "bg-gray-100 text-gray-800"
          : status === "pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-blue-100 text-blue-800";

      return (
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      );
    },
  },
  {
    accessorKey: "payment_method",
    header: "Pay Method",
    cell: ({ row }) => <span>{row.getValue("payment_method")}</span>,
  },
  {
    header: "Approval",
    cell: ({ row }) => (
      <span>
        {row.original.is_membership_approved ? "Approved" : "Pending"}
      </span>
    ),
  },
  {
    id: "user",
    header: "User",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>{row.original.user.email}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <UserMembershipActionDropdown
        id={row.original.id.toString()}
        rowData={row.original}
      />
    ),
  },
];
