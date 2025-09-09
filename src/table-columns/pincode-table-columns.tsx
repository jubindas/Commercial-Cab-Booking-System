import type { ColumnDef } from "@tanstack/react-table"
import type { Pincode } from "@/table-types/pincode-table-types"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export const pincodeColumns: ColumnDef<Pincode>[] = [
  {
    accessorKey: "pincode",
    header: "Pincode",
    cell: ({ row }) => <span className="text-zinc-100">{row.original.pincode}</span>,
  },
  {
    accessorKey: "fallBackPincode",
    header: "Fallback Pincodes",
    cell: ({ row }) => (
      <span className="text-zinc-300">
        {row.original.fallBackPincode.join(", ")}
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
            <MoreHorizontal className="h-4 w-4 text-zinc-400" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-32 bg-zinc-800 border border-zinc-700 p-2">
          <div className="flex flex-col">
            <Button variant="ghost" className="justify-start text-zinc-100 hover:bg-zinc-700">
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
