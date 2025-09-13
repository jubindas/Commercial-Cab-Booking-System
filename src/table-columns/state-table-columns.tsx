import type { ColumnDef } from "@tanstack/react-table"
import type { State } from "@/table-types/state-table-types"
import StateTablCcolumnDropdown from "@/table-columns-dropdown/state-table-column-dropdown"


export const stateColumns: ColumnDef<State>[] = [
      {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <span className="text-zinc-800">{row.getValue("id")}</span>,
  },
  {
    accessorKey: "name",
    header: "STATE",
    cell: ({ row }) => <span className="text-zinc-800">{row.original.name}</span>,
  },
  {
    accessorKey: "code",
    header: "STATE CODE",
    cell: ({ row }) => (
      <span className="text-zinc-800">
        {row.original.code || "N/A"}
      </span>
    ),
  },
 {
  id: "actions",
  header: "Actions",
  cell: ({ row }) => (
    <StateTablCcolumnDropdown
      id={row.original.id}
      rowData={{ name: row.original.name, code: row.original.code }}
    />
  ),
}

]
