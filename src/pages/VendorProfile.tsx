import { useQuery } from "@tanstack/react-query";
import { vendorMe } from "@/service/user";
import { useAuth } from "@/hooks/useAuth";
import {
  User,
  Phone,
  Mail,
  Home,
  IdCard,
  Calendar,
  CreditCard,
} from "lucide-react";

const BASE_URL = "https://bhara.eucivi.in/";

export default function VendorProfile() {
  const { token } = useAuth();

  const {
    data: vendor,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => vendorMe(token),
    enabled: !!token,
  });

  if (isLoading)
    return <p className="text-center mt-10 text-zinc-600">Loading profile...</p>;
  if (isError || !vendor)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load vendor profile.
      </p>
    );

  return (
    <div className="max-w-5xl mx-auto mt-12 mb-12 px-6">
    
      <div className="bg-gradient-to-r from-zinc-900 to-zinc-400 text-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-2">Vendor Profile</h1>
        <p className="text-lg opacity-90">Manage and verify your details</p>
      </div>

      <div className="bg-white shadow-lg rounded-2xl border border-zinc-200 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-8 p-8">
         
          <div>
            <h2 className="text-xl font-semibold text-zinc-800 mb-4 border-b pb-2">
              Personal Information
            </h2>
            <ProfileRow icon={<User />} label="Name" value={vendor.name} />
            <ProfileRow icon={<Phone />} label="Phone" value={vendor.phone} />
            <ProfileRow
              icon={<Phone />}
              label="Alternative Phone"
              value={vendor.alternative_phone_number || "-"}
            />
            <ProfileRow icon={<Mail />} label="Email" value={vendor.email} />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-800 mb-4 border-b pb-2">
              Account Details
            </h2>
            <ProfileRow
              icon={<CreditCard />}
              label="Membership ID"
              value={vendor.current_membership_id || "N/A"}
            />
            <ProfileRow
              icon={<Calendar />}
              label="Created At"
              value={new Date(vendor.created_at).toLocaleDateString()}
            />
            <ProfileRow icon={<Home />} label="Address" value={vendor.address} />
          </div>
        </div>

        <div className="bg-zinc-50 border-t border-zinc-200 px-8 py-6">
          <h2 className="text-xl font-semibold text-zinc-800 mb-6">
            Uploaded Documents
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
           
            <div>
              <p className="flex items-center gap-2 text-zinc-600 font-medium mb-2">
                <IdCard className="w-5 h-5" /> ID Proof
              </p>
              {vendor.id_proof ? (
                <img
                  src={BASE_URL + vendor.id_proof}
                  alt="ID Proof"
                  className="w-full h-48 object-cover rounded-lg border border-zinc-300 shadow-sm"
                />
              ) : (
                <p className="text-red-500 text-sm">No ID proof available</p>
              )}
            </div>

            <div>
              <p className="flex items-center gap-2 text-zinc-600 font-medium mb-2">
                <Home className="w-5 h-5" /> Address Proof
              </p>
              {vendor.address_proof ? (
                <img
                  src={BASE_URL + vendor.address_proof}
                  alt="Address Proof"
                  className="w-full h-48 object-cover rounded-lg border border-zinc-300 shadow-sm"
                />
              ) : (
                <p className="text-red-500 text-sm">No address proof available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center mb-4">
      <span className="text-purple-500 mr-2">{icon}</span>
      <span className="text-zinc-600 font-medium w-40">{label}:</span>
      <span className="text-zinc-800 font-semibold">{value}</span>
    </div>
  );
}
