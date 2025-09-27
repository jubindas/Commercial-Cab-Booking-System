import type { ColumnDef } from "@tanstack/react-table";

import type { Pincode } from "@/table-types/pincode-table-types";

import PincodeTableColumnsDropdown from "@/table-columns-dropdown/pincode-table-columns-dropdown";

export const pincodeColumns: ColumnDef<Pincode>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "pin_code",
    header: "Pincode",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.original.pin_code}</span>
    ),
  },
  {
    accessorKey: "area_name",
    header: "Area Name",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.original.area_name || "N/A"}</span>
    ),
  },
  {
    accessorKey: "fallback_pin_codes",
    header: "Fallback Pincodes",
    cell: ({ row }) => (
      <span className="text-zinc-800">
        {row.original.fallback_pin_codes?.length
          ? row.original.fallback_pin_codes.join(", ")
          : "N/A"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <PincodeTableColumnsDropdown
        id={row.original.id}
        rowData={{
          locId: row.original.location_id,
          name: row.original.area_name || "",
          pinCode: row.original.pin_code || "",
          fallBackPincodes: row.original.fallback_pin_codes || [],
        }}
      />
    ),
  },
];
