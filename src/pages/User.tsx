import { useState } from "react";

import { DataTable } from "@/components/data-table";

import { getAllUsers } from "@/service/user";

import { userColumns } from "@/table-columns/users-table-columns";

import { useQuery } from "@tanstack/react-query";

import type { User } from "@/table-types/user-table-types";
import LoadingSkeleton from "@/components/LoadingSkeleton";

export default function User() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });

  console.log("the users are", data);

  const users: User[] = Array.isArray(data) ? data : [];

  const userData = users.filter((user: User) => user.role === "User");

  console.log("the filterd data is", userData);

  const filteredData = userData.filter((user: User) => {
    const searchLower = searchTerm.toLowerCase();

    return (
      user.name.toLowerCase().includes(searchLower) ||
      (user.email?.toLowerCase().includes(searchLower) ?? false)
    );
  });

  console.log("Filtered users:", filteredData);


  
    if (isLoading) {
      return <LoadingSkeleton />;
    }

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Users
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search..."
            className="border border-zinc-300 rounded-md px-3 py-2 bg-white text-zinc-800 placeholder-zinc-400 shadow-sm focus:ring-2 focus:ring-zinc-500 focus:outline-none transition-all w-64"
          />
        </div>
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white shadow-md overflow-hidden">
        {data && (
          <DataTable
            data={filteredData}
            columns={userColumns}
            enablePagination
          />
        )}
      </div>
    </div>
  );
}
