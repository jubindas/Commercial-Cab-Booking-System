import { DataTable } from "@/components/data-table"
import LocationDialog from "@/components/LocationDialog"

import { dummyLocations } from "@/table-datas/location-table-datas"
import { columns } from "@/table-columns/location-table-columns"

export default function Location() {
  return (
    <div className="min-h-screen bg-zinc-950 p-6">
   
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-white tracking-wide">Locations</h1>
        <LocationDialog />
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">

        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <span className="font-medium">Show</span>
          <select className="rounded-md px-3 py-2 bg-zinc-800 border border-zinc-700 text-zinc-100 shadow-sm hover:border-zinc-500 transition-colors">
            {[10, 25, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span className="font-medium">entries</span>
        </div>

   
        <div className="flex items-center gap-2 text-sm text-zinc-300">
          <span className="font-medium">Search:</span>
          <input
            type="text"
            placeholder="Type to search..."
            className="border border-zinc-700 rounded-md px-3 py-2 bg-zinc-800 text-zinc-100 placeholder-zinc-500 shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>


      <div className="rounded-lg border border-zinc-700 bg-zinc-900 shadow-lg overflow-hidden">
        <DataTable data={dummyLocations} columns={columns} enablePagination />
      </div>
    </div>
  )
}
