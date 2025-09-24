import { User, Phone, IdCard, Home } from "lucide-react";

import { useParams } from "react-router-dom";

interface Vendor {
  name: string;
  phone: string;
  idCardImage: string;
  addressProofImage: string;
}

interface Props {
  vendor: Vendor;
}

export default function VendorsViewDetails({ vendor }: Props) {
  const { id } = useParams();
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6 border border-zinc-200">
      <h2 className="text-2xl font-bold text-zinc-800 mb-6 border-b pb-3">
        Vendor Details
      </h2>

      <div className="grid gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <User className="w-4 h-4" />
              <span className="text-sm">Vendor Name</span>
            </div>
            <p className="text-base font-medium text-zinc-800">
              {id}-{vendor.name}
            </p>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-zinc-500 mb-1">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Phone Number</span>
            </div>
            <p className="text-base font-medium text-zinc-800">
              {vendor.phone}
            </p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-1">
            <IdCard className="w-4 h-4" />
            <span className="text-sm">Aadhaar / Voter ID</span>
          </div>
          {vendor.idCardImage ? (
            <img
              src={vendor.idCardImage}
              alt="Aadhaar / Voter ID"
              className="w-full max-w-xs h-36 object-cover rounded-lg border border-zinc-300 shadow-sm"
            />
          ) : (
            <p className="text-sm text-red-500 mt-1">No image available</p>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 text-zinc-500 mb-1">
            <Home className="w-4 h-4" />
            <span className="text-sm">Address Proof</span>
          </div>
          {vendor.addressProofImage ? (
            <img
              src={vendor.addressProofImage}
              alt="Address Proof"
              className="w-full max-w-xs h-36 object-cover rounded-lg border border-zinc-300 shadow-sm"
            />
          ) : (
            <p className="text-sm text-red-500 mt-1">No image available</p>
          )}
        </div>
      </div>
    </div>
  );
}
