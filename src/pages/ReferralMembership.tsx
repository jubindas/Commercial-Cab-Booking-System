import { DataTable } from "@/components/data-table";

import { useAuth } from "@/hooks/useAuth";

import { getSalesmanReferral } from "@/service/apiSalesman";

import { cityColumns } from "@/table-columns/city-table-columns";

import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router-dom";

export default function ReferralMembership() {
  const { id } = useParams();
  const { token } = useAuth();

  const { data: referralMembership, isLoading } = useQuery({
    queryKey: ["salesmanReferral", id],
    queryFn: () => getSalesmanReferral(id, token),
    enabled: !!id && !!token,
  });

  if (isLoading)
    return (
      <div className=" mt-25 min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  if (!referralMembership) return <div>No data found</div>;

  const { count, membership_counts = [], vendors = [] } = referralMembership;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Membership Referral Summary
      </h1>

      <div className="mb-8 flex justify-center">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 w-60 text-center shadow-sm">
          <p className="text-lg font-medium text-gray-700">Total Count</p>
          <p className="text-4xl font-bold text-blue-600 mt-2">{count}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Membership Counts
          </h2>
          {membership_counts.length > 0 ? (
            <DataTable data={membership_counts} columns={cityColumns} />
          ) : (
            <p className="text-gray-500 text-center">
              No membership data available.
            </p>
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center">
            Vendors
          </h2>
          {vendors.length > 0 ? (
            <DataTable data={vendors} columns={cityColumns} />
          ) : (
            <p className="text-gray-500 text-center">
              No membership data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
