import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSalesmenById } from "@/service/apiSalesman";

import {
  FaEnvelope,
  FaPhone,
  FaUserTie,
  FaIdBadge,
  FaUsers,
} from "react-icons/fa";

export default function ViewDetailsSalesmen() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: salesman,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["salesman", id],
    queryFn: () => getSalesmenById(id!),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen text-zinc-600">
        Loading salesman details...
      </div>
    );

  if (isError || !salesman)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-600">
        Failed to load salesman details.
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-zinc-50 flex justify-center items-start">
      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-3xl">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 border-b border-zinc-200 pb-4">
          <div className="flex items-center gap-4">
            <FaUserTie className="text-red-500 text-3xl" />
            <h1 className="text-3xl font-bold text-zinc-900">
              {salesman.name}
            </h1>
          </div>
          <span className="text-sm text-zinc-500">ID: #{salesman.id}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <DetailCard
            icon={<FaEnvelope className="text-blue-500 text-2xl" />}
            label="Email"
            value={salesman.email}
          />

          <DetailCard
            icon={<FaPhone className="text-green-500 text-2xl" />}
            label="Phone"
            value={salesman.phone}
          />

          <DetailCard
            icon={<FaUsers className="text-purple-500 text-2xl" />}
            label="Referrals Count"
            value={salesman.referrals_count}
          />

          <DetailCard
            icon={<FaIdBadge className="text-yellow-500 text-2xl" />}
            label="Sales Unique ID"
            value={salesman.sales_unique_id}
          />
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 rounded-xl bg-zinc-200 text-zinc-900 font-semibold hover:bg-zinc-300 transition"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="flex items-center p-5 bg-zinc-50 rounded-xl shadow hover:shadow-md transition gap-4">
      {icon}
      <div>
        <p className="text-sm text-zinc-500">{label}</p>
        <p className="text-lg font-semibold text-zinc-900">{value}</p>
      </div>
    </div>
  );
}
