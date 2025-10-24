/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { getVendorById } from "@/service/apiVendors";
import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Home,
  ArrowLeft,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function VendorsViewDetails() {
  const { id } = useParams();
  const [showMemberships, setShowMemberships] = useState(false);
  const BASE_URL = "https://api.bhara.co.in/";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["vendor", id],
    queryFn: () => getVendorById(id),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-100">
        <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50">
        <p className="text-lg text-red-500 font-semibold mb-4">
          Failed to load vendor details.
        </p>
        <Link
          to="/vendors"
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition"
        >
          <ArrowLeft size={18} /> Back to Vendors
        </Link>
      </div>
    );
  }

  const vendor = data;

  console.log("Vendor Data:", vendor);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-100 via-white to-zinc-50 py-16 px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden">
        <div className="bg-blue-500 text-white px-10 py-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <ShieldCheck size={32} className="text-white/90" />
            <h1 className="text-3xl font-extrabold tracking-tight">
              {vendor.name || "Vendor Details"}
            </h1>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-base font-semibold ${
              vendor.status === "active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-700"
            }`}
          >
            {vendor.status}
          </span>
        </div>

        <div className="p-10 grid md:grid-cols-2 gap-10">
          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-zinc-700 flex items-center gap-3">
              <User size={20} className="text-blue-600" /> Contact Information
            </h2>
            <div className="bg-zinc-50 rounded-2xl p-6 space-y-3 text-zinc-700 shadow-md">
              <p className="flex items-center gap-3 text-md">
                <Mail size={18} className="text-blue-500" />{" "}
                {vendor.email || "N/A"}
              </p>
              <p className="flex items-center gap-3 text-md">
                <Phone size={18} className="text-blue-500" />{" "}
                {vendor.phone || "N/A"}
              </p>
              <p className="flex items-center gap-3 text-md">
                <Phone size={18} className="text-blue-300" />{" "}
                {vendor.alternative_phone_number || "N/A"}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h2 className="text-xl font-semibold text-zinc-700 flex items-center gap-3">
              <MapPin size={20} className="text-blue-600" /> Address Details
            </h2>
            <div className="bg-zinc-50 rounded-2xl p-6 space-y-2 text-zinc-700 shadow-md">
              <p>
                <strong>Address:</strong> {vendor.address || "N/A"}
              </p>
              <p>
                <strong>City:</strong> {vendor.city?.name || "N/A"}
              </p>
              <p>
                <strong>District:</strong> {vendor.district?.name || "N/A"}
              </p>
              <p>
                <strong>State:</strong> {vendor.state?.name || "N/A"}
              </p>
              <p>
                <strong>Pin Code:</strong> {vendor.pin_code?.pin_code || "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-10 mt-6">
          <h2 className="text-xl font-semibold text-zinc-700 flex items-center gap-3 mb-5">
            <FileText size={20} className="text-blue-600" /> Documents
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-zinc-50 p-6 rounded-2xl shadow-md flex flex-col items-center">
              <p className="font-medium text-zinc-700 mb-3 text-lg">ID Proof</p>
              {vendor.id_proof ? (
                <img
                  src={`${BASE_URL}${vendor.id_proof}`}
                  alt="ID Proof"
                  className="w-72 h-48 object-cover rounded-xl border"
                />
              ) : (
                <p className="text-zinc-500">No ID proof uploaded</p>
              )}
            </div>
            <div className="bg-zinc-50 p-6 rounded-2xl shadow-md flex flex-col items-center">
              <p className="font-medium text-zinc-700 mb-3 text-lg">
                Address Proof
              </p>
              {vendor.address_proof ? (
                <img
                  src={`${BASE_URL}${vendor.address_proof}`}
                  alt="Address Proof"
                  className="w-72 h-48 object-cover rounded-xl border"
                />
              ) : (
                <p className="text-zinc-500">No address proof uploaded</p>
              )}
            </div>
          </div>
        </div>

        <div className="px-10 py-8">
          <h2 className="text-xl font-semibold text-zinc-700 flex items-center gap-3 mb-5">
            <Home size={20} className="text-blue-400" /> Membership History
            <button
              onClick={() => setShowMemberships(!showMemberships)}
              className="ml-auto bg-blue-400 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              {showMemberships ? (
                <ChevronUp size={20} />
              ) : (
                <ChevronDown size={20} />
              )}
            </button>
          </h2>
          {showMemberships && vendor.membership_histories.length > 0 ? (
            <div className="overflow-x-auto bg-zinc-50 rounded-2xl shadow-md p-6">
              <table className="min-w-full divide-y divide-zinc-200 text-zinc-700">
                <thead className="bg-zinc-100 text-md font-semibold">
                  <tr>
                    <th className="px-5 py-3 text-left">Membership</th>
                    <th className="px-5 py-3 text-left">Description</th>
                    <th className="px-5 py-3 text-left">Purchased At</th>
                    <th className="px-5 py-3 text-left">Expires At</th>
                    <th className="px-5 py-3 text-left">Price</th>
                    <th className="px-5 py-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200">
                  {vendor.membership_histories.map((m: any) => (
                    <tr key={m.id} className="hover:bg-zinc-100 transition">
                      <td className="px-5 py-3">
                        {m.membership?.name || "N/A"}
                      </td>
                      <td className="px-5 py-3">
                        {m.membership?.description || "N/A"}
                      </td>
                      <td className="px-5 py-3">
                        {new Date(m.purchased_at).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3">
                        {m.expires_at
                          ? new Date(m.expires_at).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td className="px-5 py-3 font-semibold text-green-700">
                        ₹{m.total_price || "0.00"}
                      </td>
                      <td className="px-5 py-3 capitalize">
                        {m.status || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : showMemberships ? (
            <p className="text-zinc-500">No membership history found.</p>
          ) : null}
        </div>

        <div className="px-10 py-6 flex justify-end">
          <Link
            to="/vendors"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700 transition text-lg font-semibold"
          >
            <ArrowLeft size={20} /> Back to Vendors
          </Link>
        </div>
      </div>
    </div>
  );
}
