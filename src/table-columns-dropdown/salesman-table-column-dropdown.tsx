import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

import type { TotalSalesMan } from "@/table-types/total-sales-man-table-type";

type Props = {
  salesman: TotalSalesMan;
};

export default function SalesmanTableColumnDropdown({ salesman }: Props) {
  const navigate = useNavigate();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className="h-8 w-8 p-0 text-zinc-800 hover:text-zinc-800"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-40 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2 rounded-lg"
      >
        <div className="flex flex-col space-y-1">
          <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-800"
            onClick={() =>
              navigate(`/salesman/wallet/${salesman.id}`, {
                state: { salesman },
              })
            }
          >
            Wallet
          </Button>

          <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-800"
            onClick={() => alert(`edit clickd ${salesman.id}` )
            }
          >
            Edit
          </Button>

          <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-800"
            onClick={() => alert(`Disable salesman ${salesman.id}?`)}
          >
            Disable
          </Button>

          <Button
            variant="ghost"
            className="justify-start text-red-400 hover:bg-zinc-800"
            onClick={() => alert(`Delete salesman ${salesman.id}?`)}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
