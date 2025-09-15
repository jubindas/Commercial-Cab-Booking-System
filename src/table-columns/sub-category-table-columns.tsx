import type { ColumnDef } from "@tanstack/react-table";

import type { SubCategory } from "@/table-types/sub-category-table-types";

import SubCategoryTableColumnDropdown from "@/table-columns-dropdown/sub-category-table-column-dropdown";

export const subCategoryColumns: ColumnDef<SubCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span className="text-zinc-800">{row.getValue("id")}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Sub Category",
    cell: ({ row }) => (
      <span className="font-medium text-zinc-800">{row.getValue("name")}</span>
    ),
  },
{
  accessorKey: "mainCategory",
  header: "Main Category",
  cell: ({ row }) => (
    <span className="text-zinc-700">
      {row.original.category?.name || "-"}
    </span>
  ),
},

  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-zinc-600">
        {row.getValue("description") || "N/A"}
      </span>
    ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      return <SubCategoryTableColumnDropdown id={row.original.id} rowData={{name: row.original.name || "", description: row.original.description }} />
    },
  },
];
