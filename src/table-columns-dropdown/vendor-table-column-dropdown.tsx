import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";

type Props = {
  id: number | string;
  status?: "Active" | "Inactive";
};

export default function VendorTableColumnDropdown({ id, status }: Props) {
  const isActive = status === "Active";
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
        className="w-44 bg-zinc-900 text-zinc-100 border border-zinc-800 shadow-xl p-2 rounded-lg"
      >
        <div className="flex flex-col space-y-1">
          {/* Navigate to view details page */}
          <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-800"
            onClick={() => navigate(`/view-details/${id}`)}
          >
            View Details
          </Button>

          {/* Enable / Disable toggle */}
          <Button
            variant="ghost"
            className="justify-start text-zinc-200 hover:bg-zinc-800"
            onClick={() =>
              alert(
                `${id} is now ${
                  isActive ? "Inactive (Disabled)" : "Active (Enabled)"
                }`
              )
            }
          >
            {isActive ? "Disable" : "Enable"}
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
