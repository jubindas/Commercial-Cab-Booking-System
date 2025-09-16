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
  return (
    <div className="min-w-[5] mx-auto bg-white shadow-md rounded-xl p-6 mt-6 border border-zinc-200">
      <h2 className="text-xl font-semibold text-zinc-800 mb-4">Vendor Details</h2>

      <div className="grid gap-4">
        <div>
          <p className="text-sm text-zinc-500">Vendor Name</p>
          <p className="text-base font-medium text-zinc-800">{vendor.name}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Phone Number</p>
          <p className="text-base font-medium text-zinc-800">{vendor.phone}</p>
        </div>

        <div>
          <p className="text-sm text-zinc-500">Aadhaar / Voter ID</p>
          {vendor.idCardImage ? (
            <img
              src={vendor.idCardImage}
              alt="Aadhaar / Voter ID"
              className="w-48 h-28 object-cover rounded-md border border-zinc-300 mt-1"
            />
          ) : (
            <p className="text-sm text-red-500 mt-1">No image available</p>
          )}
        </div>

        <div>
          <p className="text-sm text-zinc-500">Address Proof</p>
          {vendor.addressProofImage ? (
            <img
              src={vendor.addressProofImage}
              alt="Address Proof"
              className="w-48 h-28 object-cover rounded-md border border-zinc-300 mt-1"
            />
          ) : (
            <p className="text-sm text-red-500 mt-1">No image available</p>
          )}
        </div>
      </div>
    </div>
  );
}
