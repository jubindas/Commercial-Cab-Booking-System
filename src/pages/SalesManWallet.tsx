import { useState } from "react";

export default function SalesManWallet() {
  const [credited, setCredited] = useState(5000);
  const [debited, setDebited] = useState(1500);

  const [requests, setRequests] = useState<
    { id: number; name: string; amount: number; status: string }[]
  >([
    { id: 1, name: "Withdraw ₹1000", amount: 1000, status: "pending" },
    { id: 2, name: "Withdraw ₹500", amount: 500, status: "pending" },
  ]);

  const approveRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "approved" } : req
      )
    );

    const approved = requests.find((req) => req.id === id);
    if (approved) {
      setCredited((prev) => prev + approved.amount);
      setDebited((prev) => prev - approved.amount);
    }
  };

  const rejectRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((req) =>
        req.id === id ? { ...req, status: "rejected" } : req
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900">Salesman Wallet</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-lg font-semibold">Credited Amount</h2>
          <p className="text-green-600 text-xl font-bold">₹{credited}</p>
        </div>

        <div className="bg-white shadow-md p-6 rounded-xl">
          <h2 className="text-lg font-semibold">Debited Amount</h2>
          <p className="text-red-600 text-xl font-bold">₹{debited}</p>
        </div>
      </div>

      <div className="bg-white shadow-md p-6 rounded-xl">
        <h2 className="text-lg font-semibold mb-4">Withdraw Requests</h2>

        {requests.length === 0 ? (
          <p className="text-gray-500">No withdraw requests</p>
        ) : (
          <ul className="space-y-4">
            {requests.map((req) => (
              <li
                key={req.id}
                className="flex justify-between items-center border p-4 rounded-lg"
              >
                <div>
                  <p className="font-medium">{req.name}</p>
                  <p
                    className={`text-sm ${
                      req.status === "approved"
                        ? "text-green-600"
                        : req.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    Status: {req.status}
                  </p>
                </div>

                {req.status === "pending" && (
                  <div className="space-x-2">
                    <button
                      onClick={() => approveRequest(req.id)}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => rejectRequest(req.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
