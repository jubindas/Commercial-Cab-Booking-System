import { DataTable } from "@/components/data-table";

import { stateColumns } from "@/table-columns/state-table-columns";

const stateData = [
  { id: 1, name: "Assam", code: "AS" },
  { id: 2, name: "Arunachal Pradesh", code: "AR" },
  { id: 3, name: "Nagaland", code: "NL" },
  { id: 4, name: "Meghalaya", code: "ML" },
  { id: 5, name: "Manipur", code: "MN" },
  { id: 6, name: "Mizoram", code: "MZ" },
  { id: 7, name: "Tripura",   code: "TR" },
  { id: 8, name: "Sikkim", code: "SK" },
  { id: 9, name: "West Bengal", code: "WB" },
  { id: 10, name: "Bihar", code: "BR" },
];

export default function HistoryVendors() {

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          History
        </h1>
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
            className="border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        <DataTable data={stateData} columns={stateColumns} enablePagination />
      </div>
    </div>
  );
}
