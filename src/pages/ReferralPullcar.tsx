import { DataTable } from "@/components/data-table";
import { useAuth } from "@/hooks/useAuth";
import { getSalesmanReferralPullcar } from "@/service/apiSalesman";
import { cityColumns } from "@/table-columns/city-table-columns";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function ReferralPullcar() {
  const { id } = useParams();
  const { token } = useAuth();

  const { data: referralPullcar, isLoading } = useQuery({
    queryKey: ["salesmanReferralPullcar", id],
    queryFn: () => getSalesmanReferralPullcar(id, token),
    enabled: !!id && !!token,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!referralPullcar) return <div>No data found</div>;

  const { count, pullcar_counts = [], vendors = [] } = referralPullcar;

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold text-center mb-6 text-blue-700">
        Pullcar Referral Summary
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
            Pullcar Counts
          </h2>
          {pullcar_counts.length > 0 ? (
            <DataTable data={pullcar_counts} columns={cityColumns} />
          ) : (
            <p className="text-gray-500 text-center">
              No pullcar data available.
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
            <p className="text-gray-500 text-center">No vendor data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
