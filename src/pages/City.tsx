/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataTable } from "@/components/data-table";

import { cityColumns } from "@/table-columns/city-table-columns";

import { getCities } from "@/service/apiCities";

import { useQuery } from "@tanstack/react-query";

import CityDialog from "@/components/CityDialog";

import LoadingSkeleton from "@/components/LoadingSkeleton";

import { useState } from "react";

import type { City } from "@/table-types/city-table-types";

export default function City() {
  const [search, setSearch] = useState("");

  const { data: cityData, isLoading } = useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
  });

  const city = cityData
    ?.slice()
    .sort((a: any, b: any) => a.name.localeCompare(b.name));

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  const filteredCities = city.filter(
    (city: City) =>
      city.name?.toLowerCase().includes(search.toLowerCase()) ||
      city.code?.toLowerCase().includes(search.toLowerCase()) ||
      city.status?.includes(search)
  );

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Cities
        </h1>
        <CityDialog mode="create" />
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
        {city && (
          <DataTable
            data={filteredCities}
            columns={cityColumns}
            enablePagination
          />
        )}
      </div>
    </div>
  );
}
