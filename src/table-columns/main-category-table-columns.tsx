import type { ColumnDef } from "@tanstack/react-table";


import type { MainCategory } from "@/table-types/main-category-table-types";
import MainCategoryTableColumnDropdown from "@/table-columns-dropdown/main-category-table-column-dropdown";



export const columns: ColumnDef<MainCategory>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => ( <span className="text-zinc-800">{row.getValue("id")}</span> ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => ( <span className="font-medium text-zinc-800">{row.getValue("name")}</span> ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => ( <span className="text-zinc-800"> {row.getValue("description") || "N/A"} </span> ),
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {

      return <MainCategoryTableColumnDropdown id={row.original.id} rowData={{name: row.original.name || "", description: row.original.description || ""}}/>
    },
  },
];
