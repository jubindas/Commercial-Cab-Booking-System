import { getMembershipById } from "@/service/apiMembership";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  CalendarIcon,
  TagIcon,
  CurrencyDollarIcon,
  UsersIcon,
  StarIcon,
  ClockIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";

export default function PerticulerMembership() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["membership", id],
    queryFn: () => getMembershipById(Number(id)),
    enabled: !!id,
  });

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">Error loading membership data.</p>
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6">
      <div className="bg-gradient-to-r from-zinc-500 to-zinc-600 text-white rounded-xl p-6 shadow-lg flex items-center gap-4">
        <StarIcon className="w-12 h-12 text-zinc-200" />
        <div>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p className="text-md mt-1">{data.description}</p>
        </div>
      </div>

      
      <div className="bg-white mt-6 shadow-md rounded-xl p-6 hover:shadow-xl transition">
        <h2 className="text-2xl font-bold text-gray-700 mb-4 flex items-center gap-2">
          <TagIcon className="w-6 h-6 text-purple-500" /> Sub-category Info
        </h2>
        <p>
          <span className="font-semibold">Name:</span> {data.sub_category?.name}
        </p>
        <p>
          <span className="font-semibold">Description:</span>{" "}
          {data.sub_category?.description}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-3 py-0.5 rounded-full text-black text-sm ${
              data.sub_category?.is_active ? "bg-green-400" : "bg-red-400"
            }`}
          >
            {data.sub_category?.is_active ? "Active" : "Inactive"}
          </span>
        </p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-3 hover:shadow-xl transition">
          <CurrencyDollarIcon className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Price</p>
            <p className="text-lg font-semibold">₹{data.price}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-3 hover:shadow-xl transition">
          <TagIcon className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Discounted Price</p>
            <p className="text-lg font-semibold">
              ${data.discounted_price} ({data.discounted_percentage}%)
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-3 hover:shadow-xl transition">
          <UsersIcon className="w-8 h-8 text-blue-500" />
          <div>
            <p className="text-gray-500 text-sm">Quantity</p>
            <p className="text-lg font-semibold">{data.quantity}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-3 hover:shadow-xl transition">
          <CubeIcon className="w-8 h-8 text-pink-500" />
          <div>
            <p className="text-gray-500 text-sm">Commission Amount</p>
            <p className="text-lg font-semibold">${data.commission_amount}</p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-3 hover:shadow-xl transition">
          <ClockIcon className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Created At</p>
            <p className="text-lg font-semibold">
              {new Date(data.created_at).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-xl p-5 flex items-center gap-3 hover:shadow-xl transition">
          <CalendarIcon className="w-8 h-8 text-red-500" />
          <div>
            <p className="text-gray-500 text-sm">Updated At</p>
            <p className="text-lg font-semibold">
              {new Date(data.updated_at).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

    

   
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => window.history.back()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
        >
          <CalendarIcon className="w-5 h-5" /> Back
        </button>
      </div>
    </div>
  );
}
