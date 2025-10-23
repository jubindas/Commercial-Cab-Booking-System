import UserPoolCarMembershipDropdown from "@/table-columns-dropdown/UserPoolCarMembershipDropdown";
import type { ColumnDef } from "@tanstack/react-table";

interface UserMembership {
  id: number;
  name: string;
  price: string;
  payment_method: string;
  status: string;
  is_membership_approved: boolean;
  purchased_at: string;
  user: {
    name: string;
    email: string;
    phone: string;
  };
}

const ellipsisStyle = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  display: "block",
  maxWidth: "150px",
};

export const userPoolCarMembershipColumns: ColumnDef<UserMembership>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span>{row.original.id}</span>,
  },
  {
    accessorKey: "name",
    header: "Membership Name",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>{row.original.name ?? "N/A"}</span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <span>₹{row.original.price}</span>,
  },
  {
    accessorKey: "payment_method",
    header: "Payment",
    cell: ({ row }) => <span>{row.original.payment_method ?? "N/A"}</span>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <span
        className={
          row.original.status === "active" ? "text-green-600" : "text-red-600"
        }
      >
        {row.original.status}
      </span>
    ),
  },
  {
    id: "approval",
    header: "Approval",
    cell: ({ row }) => (
      <span
        className={
          row.original.is_membership_approved
            ? "text-green-600 font-medium"
            : "text-yellow-600 font-medium"
        }
      >
        {row.original.is_membership_approved ? "Approved" : "Pending"}
      </span>
    ),
  },
  {
    id: "user_name",
    header: "User Name",
    cell: ({ row }) => (
      <span style={ellipsisStyle}>{row.original.user?.name ?? "N/A"}</span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <UserPoolCarMembershipDropdown
        id={row.original.id.toString()}
        rowData={row.original}
      />
    ),
  },
];
