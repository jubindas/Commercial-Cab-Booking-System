import { DataTable } from "@/components/data-table";
import GlobalError from "@/components/GlobalError";

import LoadingSkeleton from "@/components/LoadingSkeleton";

import MembershipDialog from "@/components/MembershipDialog";

import { getMemberships } from "@/service/apiMembership";

import { getSubcategories } from "@/service/apiSubCategory";

import { membershipColumns } from "@/table-columns/membership-table-column";

import type { Membership } from "@/table-types/membership-table-types";

import type { SubCategory } from "@/table-types/sub-category-table-types";

import { useQuery } from "@tanstack/react-query";

import { useState } from "react";

export default function Membership() {
  const [search, setSearch] = useState("");

  const { data: membershipData, isLoading, isError, error } = useQuery({
    queryKey: ["membership"],
    queryFn: getMemberships,
  });

  const { data: subCategories } = useQuery({
    queryKey: ["subcategories"],
    queryFn: getSubcategories,
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }


    if (isError) {
      return <GlobalError error={error} />;
    }


  const visibleSubCategories = subCategories?.filter(
    (sub: SubCategory) => sub.category?.is_active === 1
  );

  const visibleMemberships =
    membershipData?.filter((membership: Membership) =>
      (visibleSubCategories || []).some(
        (sub: Membership) => sub.id === membership.sub_category?.id
      )
    ) || [];

  const sortedMemberships = [...visibleMemberships].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const filteredMemberships = sortedMemberships.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (membership: any) => {
      const searchLower = search.toLowerCase();
      return (
        membership.name.toLowerCase().includes(searchLower) ||
        (membership.description?.toLowerCase().includes(searchLower) ??
          false) ||
        (membership.sub_category?.name.toLowerCase().includes(searchLower) ??
          false)
      );
    }
  );

  return (
    <div className="min-h-screen p-6 bg-zinc-100">
      <div className="flex flex-col mt-10 md:flex-row items-start md:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-zinc-700 tracking-tight">
          Membership
        </h1>
        <MembershipDialog mode="create" />
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
        {visibleMemberships && (
          <DataTable
            data={filteredMemberships}
            columns={membershipColumns}
            enablePagination
          />
        )}
      </div>
    </div>
  );
}
