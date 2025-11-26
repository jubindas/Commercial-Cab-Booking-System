/* eslint-disable @typescript-eslint/no-explicit-any */
import GlobalError from "@/components/GlobalError";

import LoadingSkeleton from "@/components/LoadingSkeleton";

import { useAuth } from "@/hooks/useAuth";

import { getUserMembership } from "@/service/apiUserMembership";

import { useQuery } from "@tanstack/react-query";

import { useParams, useNavigate } from "react-router-dom";

import {
  Layers,
  Phone,
  User,
  ArrowLeft,
  Package,
  InfoIcon,
} from "lucide-react";

export default function UserMembershipsDetails() {
  const { id } = useParams();
  const membershipId = Number(id);
  const navigate = useNavigate();

  const { token } = useAuth();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-membership", membershipId],
    queryFn: () => getUserMembership(token),
    enabled: !!token,
  });

  const membership = data?.find((m: any) => m.id === membershipId);

  if (isLoading) return <LoadingSkeleton />;
  if (isError) return <GlobalError error={error} />;
  if (!membership) return <div>No membership found.</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-md border hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <h1 className="text-2xl font-bold flex items-center gap-2">
          <InfoIcon className="w-6 h-6 text-blue-600" />
          Membership Details
        </h1>
      </div>

      <div className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Package className="w-5 h-5 text-purple-600" /> Membership Information
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="Membership ID" value={membership.id} />
          <Info label="Name" value={membership.membership?.name} />
          <Info label="Price" value={`₹ ${membership.price}`} />
          <Info
            label="Discounted Price"
            value={`₹ ${membership.membership?.discounted_price}`}
          />

          <Info label="Quantity" value={membership.quantity} />
          <Info label="Member Limit" value={membership.member} />

          <Info
            label="Purchased At"
            value={formatDate(membership.purchased_at)}
          />
          <Info label="Expires At" value={formatDate(membership.expires_at)} />

          <div>
            <span className="text-gray-500 text-xs">Status</span>
            <span
              className={`px-3 py-1 mt-1 inline-block rounded-full text-xs font-medium ${
                membership.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {membership.status}
            </span>
          </div>

          <div>
            <span className="text-gray-500 text-xs">Approved</span>
            <span
              className={`px-3 py-1 mt-1 inline-block rounded-full text-xs font-medium ${
                membership.is_membership_approved
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {membership.is_membership_approved ? "Approved" : "Pending"}
            </span>
          </div>

          <Info label="Payment Method" value={membership.payment_method} />
        </div>
      </div>

      <div className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" /> User Information
        </h2>

        <div className="flex items-center gap-4 p-4 rounded-lg border bg-gray-50">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-100">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <p className="text-lg font-semibold">{membership.user?.name}</p>
            <p className="text-sm text-gray-600">{membership.user?.email}</p>
            <p className="text-sm text-gray-600">
              <Phone className="inline w-4 h-4 mr-1" />
              {membership.user?.phone}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info label="User ID" value={membership.user?.id} />
          <Info label="Role" value={membership.user?.role} />
          <Info
            label="Alternate Phone"
            value={membership.user?.alternative_phone_number}
          />
          <Info label="Address" value={membership.user?.address} />
        </div>
      </div>

      <div className="bg-white border rounded-lg p-5 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Layers className="w-5 h-5 text-green-600" /> Category Information
        </h2>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <Info
            label="Sub Category"
            value={membership.membership?.sub_category?.name}
          />
          <Info
            label="Category"
            value={membership.membership?.sub_category?.category?.name}
          />
          <Info
            label="Description"
            value={membership.membership?.sub_category?.description}
          />
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex flex-col">
      <span className="text-gray-500 text-2xl">{label}</span>
      <span className="font-medium text-gray-900 text-2xl">{value ?? "—"}</span>
    </div>
  );
}

function formatDate(dateString: string) {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}
