import type { ColumnDef } from "@tanstack/react-table";
import type { Vendor } from "@/table-types/vendors-table-types";
import VendorTableColumnDropdown from "@/table-columns-dropdown/vendor-table-column-dropdown";

export const vendorColumns: ColumnDef<Vendor>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Vendor Name",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("email") || "N/A"}</span>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <span className="text-zinc-700">{row.getValue("phone")}</span>
    ),
  },
  {
    accessorKey: "address_proof",
    header: "Address Proof",
    cell: ({ row }) => {
      const addressProof = row.getValue("address_proof");

      const isApproved = !!addressProof;
      const badgeColor = isApproved
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800";
      const text = isApproved ? "Approved" : "Not Approved";

      return (
        <span
          className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${badgeColor}`}
        >
          {text}
        </span>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <VendorTableColumnDropdown vendor={row.original} />,
  },
];
