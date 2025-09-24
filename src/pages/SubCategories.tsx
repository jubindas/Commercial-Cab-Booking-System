import { DataTable } from "@/components/data-table";

import { subCategoryColumns } from "@/table-columns/sub-category-table-columns";

import SubCategoriesDialog from "@/components/SubCategoriesDialog";

import { getSubcategories } from "@/service/apiSubCategory";

import { useQuery } from "@tanstack/react-query";

import type { SubCategory } from "@/table-types/sub-category-table-types";

import LoadingSkeleton from "@/components/LoadingSkeleton";

import { useState } from "react";

export default function SubCategories() {

  const [search, setSearch] = useState("");

  const {
    data: subCategories,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
  });

  if (isLoading) {
    return  <LoadingSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-500">Error: {(error as Error).message}</div>
    );
  }

  const activeSubCategory = subCategories?.filter(
    (sub: SubCategory) => sub.category?.is_active === 1
  );

 
  const filteredSubCategories = activeSubCategory.filter((sub: SubCategory) => {
    const searchLower = search.toLowerCase();
    return (
      sub.name.toLowerCase().includes(searchLower) ||
      (sub.description?.toLowerCase().includes(searchLower) ?? false) ||
      (sub.category?.name.toLowerCase().includes(searchLower) ?? false)
    );
  });

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Sub Category
        </h1>
        <SubCategoriesDialog mode="create" />
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
        {activeSubCategory && (
          <DataTable
            data={filteredSubCategories}
            columns={subCategoryColumns}
            enablePagination
          />
        )}
      </div>
    </div>
  );
}
