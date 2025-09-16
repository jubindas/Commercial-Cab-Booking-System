interface Vendor {
  name: string;
  phone: string;
  idCard: string;
}

interface Props {
  vendor: Vendor;
}

export default function VendorsViewDetails({ vendor }: Props) {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-6 border border-zinc-200">
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
          <p className="text-base font-medium text-zinc-800">{vendor.idCard}</p>
        </div>
      </div>
    </div>
  );
}
