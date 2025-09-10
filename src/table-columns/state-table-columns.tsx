import type { ColumnDef } from "@tanstack/react-table"
import type { State } from "@/table-types/state-table-types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
    cell: () => (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 text-zinc-800" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 bg-zinc-800 border border-zinc-700 p-2">
          <div className="flex flex-col">
            <Button variant="ghost" className="justify-start text-zinc-200 hover:bg-zinc-700">
              Edit
            </Button>
            <Button variant="ghost" className="justify-start text-red-500 hover:bg-zinc-700">
              Delete
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    ),
  },
]
