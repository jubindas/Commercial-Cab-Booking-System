import { DataTable } from "@/components/data-table";

import { useQuery } from "@tanstack/react-query";

import { getAllPullCars } from "@/service/apiPullcar";

import { useState, useMemo } from "react";

import { pullCarColumns } from "@/table-columns/pull-car-columns";

import type { PullCar } from "@/table-types/pull-car-types";

//import PullCarDialog from "@/components/PullCarDialog";

import LoadingSkeleton from "@/components/LoadingSkeleton";

import GlobalError from "@/components/GlobalError";

export default function PullCar() {
  const [search, setSearch] = useState("");
  const { data: pullcardata, isLoading, isError, error } = useQuery({
    queryKey: ["pullcar"],
    queryFn: getAllPullCars,
  });

  console.log("the pull cars are", pullcardata);

  const sortedData = useMemo(() => {
    if (!pullcardata) return [];
    return [...pullcardata].sort((a: PullCar, b: PullCar) => a.id - b.id);
  }, [pullcardata]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

    if (isError) {
      return <GlobalError error={error} />;
    }

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Pull Car
        </h1>
       {/* <PullCarDialog /> */}
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
        {sortedData && (
          <DataTable
            data={sortedData}
            columns={pullCarColumns}
            enablePagination
          />
        )}
      </div>
    </div>
  );
}
