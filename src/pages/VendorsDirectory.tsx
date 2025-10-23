/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { vendorColumns } from "@/table-columns/vendor-table-columns";

import { useQuery } from "@tanstack/react-query";

import { getAllvendors } from "@/service/apiVendors";

import type { Vendor } from "@/table-types/vendors-table-types";

import VendorDialog from "@/components/VendorsDialog";

import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function VendorsDirectory() {
  const { data, isLoading } = useQuery({
    queryKey: ["vendors"],
    queryFn: getAllvendors,
  });


  const [searchTerm, setSearchTerm] = useState("");

  let filteredData =
    data?.filter((vendor: Vendor) => {
      const search = searchTerm.toLowerCase();
      return (
        vendor.name?.toLowerCase().includes(search) ||
        vendor.email?.toLowerCase().includes(search) ||
        vendor.phone?.toString().includes(search) ||
        vendor.address?.toLowerCase().includes(search)
      );
    }) || [];

  filteredData = filteredData.sort((a: any, b: any) => b.id - a.id);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Vendors Directory
        </h1>
        <VendorDialog />
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        {filteredData.length > 0 ? (
          <DataTable
            data={filteredData}
            columns={vendorColumns}
            enablePagination
          />
        ) : (
          <p className="text-center p-6 text-zinc-500">
            {searchTerm
              ? "No matching vendors found."
              : "No vendors available."}
          </p>
        )}
      </div>
    </div>
  );
}
