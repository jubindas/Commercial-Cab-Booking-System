import React, { useState } from "react";

import { useQuery } from "@tanstack/react-query";

import axios from "axios";

import {
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
} from "lucide-react";
import VendorDialog from "@/components/VendorsDialog";

interface State {
  id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface District {
  id: number;
  state_id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface City {
  id: number;
  district_id: number;
  name: string;
  code: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface Location {
  id: number;
  city_id: number;
  name: string;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface PinCode {
  id: number;
  location_id: number;
  pin_code: string;
  area_name: string;
  fallback_pin_codes: string[];
  status: string;
  created_at: string;
  updated_at: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

interface SubCategory {
  id: number;
  category_id: number;
  name: string;
  description: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  category: Category;
}

interface Membership {
  id: number;
  sub_category_id: number;
  name: string;
  description: string;
  price: string;
  discounted_price: string;
  discounted_percentage: number;
  quantity: number;
  member: number;
  created_at: string;
  updated_at: string;
  sub_category: SubCategory;
}

interface MembershipHistory {
  id: number;
  user_id: number;
  membership_id: number;
  quantity: number;
  member: number;
  price: string;
  total_price: string;
  purchased_at: string;
  expires_at: string;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  membership: Membership;
}

interface Vendor {
  id: number;
  name: string;
  email: string;
  phone: string;
  alternative_phone_number: string | null;
  role: string;
  address: string;
  state_id: number;
  district_id: number;
  city_id: number;
  location_id: number;
  pin_code_id: number;
  id_proof: string | null;
  address_proof: string | null;
  created_at: string;
  updated_at: string;
  state: State;
  district: District;
  city: City;
  location: Location;
  pin_code: PinCode;
  membership_histories: MembershipHistory[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  service: any;
}

interface VendorsResponse {
  success: boolean;
  data: Vendor[];
  count: number;
}

type SortKey = "name" | "created_at";

type SortDirection = "asc" | "desc";

type FilterStatus = "all" | "verified" | "pending";

interface SortConfig {
  key: SortKey | null;
  direction: SortDirection;
}

const Vendors: React.FC = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const [filterStatus, setFilterStatus] = useState<FilterStatus>("all");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  const vendors = useQuery<VendorsResponse>({
    queryKey: ["vendors_new"],
    queryFn: async () => {
      const response = await axios.get<VendorsResponse>(
        `https://api.bhara.co.in/api/vendors`
      );
      console.log(response.data);
      return response.data;
    },
  });

  const vendorData: Vendor[] = vendors.data?.data || [];

  const filteredVendors = vendorData.filter((vendor: Vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone.includes(searchTerm);

    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "verified" &&
        vendor.id_proof &&
        vendor.address_proof) ||
      (filterStatus === "pending" &&
        (!vendor.id_proof || !vendor.address_proof));

    return matchesSearch && matchesFilter;
  });

  const sortedVendors = [...filteredVendors].sort((a: Vendor, b: Vendor) => {
    if (!sortConfig.key) return 0;

    let aValue: string | number | Date = a[sortConfig.key];
    let bValue: string | number | Date = b[sortConfig.key];

    if (sortConfig.key === "created_at") {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (key: SortKey): void => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const toggleRow = (vendorId: number): void => {
    setExpandedRow(expandedRow === vendorId ? null : vendorId);
  };

  const getActiveMembership = (
    memberships: MembershipHistory[]
  ): MembershipHistory | null => {
    return (
      memberships?.find((m) => m.status === "active") ||
      memberships?.[0] ||
      null
    );
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedVendors = sortedVendors.slice(startIndex, endIndex);

  const totalPages = Math.ceil(sortedVendors.length / itemsPerPage);

  if (vendors.isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (vendors.error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center">
          <p className="text-xl font-semibold">Error loading vendors</p>
          <p className="text-sm mt-2">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Vendors Directory
            </h1>
            <p className="text-gray-600">
              Total vendors: {vendorData.length} | Showing:{" "}
              {filteredVendors.length}
            </p>
          </div>
          <VendorDialog />
        </div>

        <div className="bg-white rounded-lg shadow p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={filterStatus}
                onChange={(e) =>
                  setFilterStatus(e.target.value as FilterStatus)
                }
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Vendors</option>
                <option value="verified">Verified Only</option>
                <option value="pending">Pending Verification</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("name")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Vendor Details</span>
                      {sortConfig.key === "name" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Verification Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Membership
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort("created_at")}
                      className="flex items-center space-x-1 hover:text-gray-700"
                    >
                      <span>Join Date</span>
                      {sortConfig.key === "created_at" &&
                        (sortConfig.direction === "asc" ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        ))}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedVendors.map((vendor: Vendor) => {
                  const activeMembership = getActiveMembership(
                    vendor.membership_histories
                  );
                  return (
                    <React.Fragment key={vendor.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {vendor.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {vendor.id}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center mb-1">
                              <Mail className="h-3 w-3 mr-1 text-gray-400" />
                              {vendor.email}
                            </div>
                            <div className="flex items-center">
                              <Phone className="h-3 w-3 mr-1 text-gray-400" />
                              {vendor.phone}
                            </div>
                            {vendor.alternative_phone_number && (
                              <div className="flex items-center text-xs text-gray-500 mt-1">
                                <Phone className="h-3 w-3 mr-1" />
                                {vendor.alternative_phone_number}
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            <div className="flex items-center mb-1">
                              <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                              {vendor.city?.name || "N/A"}
                            </div>
                            <div className="text-xs text-gray-500">
                              {vendor.state?.name} ({vendor.state?.code})
                            </div>
                            {vendor.pin_code && (
                              <div className="text-xs text-gray-500">
                                PIN: {vendor.pin_code.pin_code}
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="space-y-1">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                vendor.id_proof
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              ID: {vendor.id_proof ? "Verified" : "Pending"}
                            </span>
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                vendor.address_proof
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              Address:{" "}
                              {vendor.address_proof ? "Verified" : "Pending"}
                            </span>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          {activeMembership ? (
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">
                                {activeMembership.membership?.name || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ₹{activeMembership.total_price}
                              </div>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                  activeMembership.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {activeMembership.status}
                              </span>
                            </div>
                          ) : (
                            <span className="text-xs text-gray-500">
                              No membership
                            </span>
                          )}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(vendor.created_at).toLocaleDateString()}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => toggleRow(vendor.id)}
                            className="text-blue-600 hover:text-blue-900 flex items-center"
                          >
                            {expandedRow === vendor.id ? (
                              <>
                                Hide Details{" "}
                                <ChevronUp className="h-4 w-4 ml-1" />
                              </>
                            ) : (
                              <>
                                View Details{" "}
                                <ChevronDown className="h-4 w-4 ml-1" />
                              </>
                            )}
                          </button>
                        </td>
                      </tr>

                      {expandedRow === vendor.id && (
                        <tr className="bg-gray-50">
                          <td colSpan={7} className="px-6 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {/* Complete Address */}
                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Complete Address
                                </h4>
                                <p className="text-sm text-gray-600 mb-1">
                                  {vendor.address}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {vendor.district?.name}, {vendor.city?.name}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {vendor.state?.name} -{" "}
                                  {vendor.pin_code?.pin_code}
                                </p>
                                {vendor.pin_code?.area_name && (
                                  <p className="text-xs text-gray-500">
                                    Area: {vendor.pin_code.area_name}
                                  </p>
                                )}
                              </div>

                              {vendor.location && (
                                <div>
                                  <h4 className="font-semibold text-gray-900 mb-2">
                                    Location Details
                                  </h4>
                                  <p className="text-sm text-gray-600 mb-1">
                                    {vendor.location.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    Lat: {vendor.location.latitude}, Lng:{" "}
                                    {vendor.location.longitude}
                                  </p>
                                  {vendor.pin_code?.fallback_pin_codes?.length >
                                    0 && (
                                    <div className="mt-2">
                                      <p className="text-xs text-gray-500">
                                        Fallback PINs:
                                      </p>
                                      <p className="text-xs text-gray-600">
                                        {vendor.pin_code.fallback_pin_codes.join(
                                          ", "
                                        )}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              <div>
                                <h4 className="font-semibold text-gray-900 mb-2">
                                  Membership History (
                                  {vendor.membership_histories?.length || 0})
                                </h4>
                                {vendor.membership_histories?.length > 0 ? (
                                  <div className="space-y-2 max-h-32 overflow-y-auto">
                                    {vendor.membership_histories.map(
                                      (
                                        membership: MembershipHistory,
                                        index: number
                                      ) => (
                                        <div
                                          key={index}
                                          className="border border-gray-200 rounded p-2"
                                        >
                                          <p className="text-xs font-medium text-gray-900">
                                            {membership.membership?.name}
                                          </p>
                                          <p className="text-xs text-gray-500">
                                            {
                                              membership.membership
                                                ?.sub_category?.category?.name
                                            }{" "}
                                            →{" "}
                                            {
                                              membership.membership
                                                ?.sub_category?.name
                                            }
                                          </p>
                                          <div className="flex justify-between items-center mt-1">
                                            <span className="text-xs text-gray-600">
                                              ₹{membership.total_price}
                                            </span>
                                            <span
                                              className={`px-1 py-0.5 text-xs rounded ${
                                                membership.status === "active"
                                                  ? "bg-green-100 text-green-800"
                                                  : "bg-gray-100 text-gray-800"
                                              }`}
                                            >
                                              {membership.status}
                                            </span>
                                          </div>
                                          <p className="text-xs text-gray-500 mt-1">
                                            Expires:{" "}
                                            {new Date(
                                              membership.expires_at
                                            ).toLocaleDateString()}
                                          </p>
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-xs text-gray-500">
                                    No memberships found
                                  </p>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-between items-center px-6 py-4 bg-white border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex space-x-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        currentPage === i + 1
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-blue-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-gray-700 hover:bg-blue-50 border-gray-300"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>

          {filteredVendors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No vendors found matching your criteria
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Vendors;
