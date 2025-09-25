import type { ColumnDef } from "@tanstack/react-table";


import type { MainCategory } from "@/table-types/main-category-table-types";

import MainCategoryTableColumnDropdown from "@/table-columns-dropdown/main-category-table-column-dropdown";


export const columns: ColumnDef<MainCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <span
        className={row.original.is_active ? "text-zinc-800" : "text-red-700 line-through"}
      >
        {row.getValue("id")}
      </span>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span
        className={`font-medium ${
          row.original.is_active ? "text-zinc-800" : "text-red-700 line-through"
        }`}
      >
        {row.getValue("name")}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span
        className={row.original.is_active ? "text-zinc-800 block max-w-15 truncate" : "text-red-700 italic block max-w-15 truncate"}
      >
        {row.getValue("description") || "N/A"}
      </span>
    ),
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <MainCategoryTableColumnDropdown
          id={row.original.id}
          rowData={{
            name: row.original.name || "",
            description: row.original.description || "",
            is_active: row.original.is_active || false,
          }}
        />
      );
    },
  },
];
