import { DataTable } from "@/components/data-table";
import { useQuery } from "@tanstack/react-query";
import { salesReferralPullCar } from "@/service/apiSalesman";
import { useState } from "react";
import { pullCarColumns } from "@/table-columns/pull-car-columns";
import type { PullCar } from "@/table-types/pull-car-types";
import PullCarDialog from "@/components/PullCarDialog";
import { useAuth } from "@/hooks/useAuth";

export default function SalesManReferralPullCar(id: number) {
  const [search, setSearch] = useState("");

  const { token } = useAuth();

  const {
    data: pullcarReferralData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["salesReferralPullCar"],
    queryFn: () => salesReferralPullCar(id, token),
    enabled: !!id && !!token,
  });

  console.log("Salesman Referral PullCar data:", pullcarReferralData);

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Salesman Referral Pull Cars
        </h1>
        <PullCarDialog mode="create" />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="font-medium">Show</span>
          <select className="rounded-md px-3 py-2 bg-white border border-zinc-300 text-zinc-800 shadow-sm hover:border-zinc-400 transition-colors">
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="font-medium">Entries</span>
        </div>

        <div className="flex items-center gap-2 text-sm text-zinc-700">
          <span className="font-medium">Search:</span>
          <input
            type="text"
            placeholder="Type to search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        {isLoading ? (
          <div className="p-6 text-center text-zinc-500">Loading...</div>
        ) : error ? (
          <div className="p-6 text-center text-red-500">Error loading data</div>
        ) : pullcarReferralData ? (
          <DataTable
            data={pullcarReferralData as PullCar[]}
            columns={pullCarColumns}
            enablePagination
          />
        ) : (
          <div className="p-6 text-center text-zinc-500">No data available</div>
        )}
      </div>
    </div>
  );
}
