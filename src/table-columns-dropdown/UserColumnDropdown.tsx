import { Button } from "@/components/ui/button";

import { MoreVertical } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { User } from "@/table-types/user-table-types";

interface props {
  id: number;
  user: User;
}

export default function UserColumnDropdown({ id, user }: props) {
  console.log("user is", user);
  console.log("the id is", id);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 text-zinc-800">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="w-32 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2"
        >
          <div className="flex flex-col space-y-1">
            <Button
              variant="ghost"
              className="justify-start text-zinc-200 hover:bg-zinc-700"
            >
              Edit
            </Button>

            <Button
              variant="ghost"
              className="justify-start text-red-400 hover:bg-red-500 hover:text-zinc-800"
            >
              Disable
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
