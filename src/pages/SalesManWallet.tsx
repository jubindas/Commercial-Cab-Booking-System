import { useState } from "react";

export default function SalesManWallet() {
  const [credited, setCredited] = useState(5000);
  const [debited, setDebited] = useState(1500);

  const [requests, setRequests] = useState<
    { id: number; name: string; amount: number; status: string; date: string }[]
  >([
    { id: 1, name: "Withdraw ₹1000", amount: 1000, status: "pending", date: "2025-10-01" },
    { id: 2, name: "Withdraw ₹500", amount: 500, status: "pending", date: "2025-10-02" },
  ]);

  const [activeCard, setActiveCard] = useState<
    "credited" | "requests" | "withdrawn" | null
  >("credited");

  const approveRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "approved" } : req))
    );

    const approved = requests.find((req) => req.id === id);
    if (approved) {
      setCredited((prev) => prev + approved.amount);
      setDebited((prev) => prev - approved.amount);
    }
  };

  const rejectRequest = (id: number) => {
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "rejected" } : req))
    );
  };

  const totalWithdrawn = requests
    .filter((r) => r.status === "approved")
    .reduce((acc, r) => acc + r.amount, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-zinc-900">UserName Wallet</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
        <div
          className={`cursor-pointer rounded-xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl ${
            activeCard === "credited"
              ? "bg-purple-600 text-white"
              : "bg-white text-zinc-900"
          }`}
          onClick={() =>
            setActiveCard(activeCard === "credited" ? null : "credited")
          }
        >
          <h2 className="text-lg font-semibold mb-2">Credited Amount</h2>
          <p
            className={`text-2xl font-bold ${
              activeCard === "credited" ? "text-white" : "text-green-600"
            }`}
          >
            ₹{credited}
          </p>
        </div>

        <div
          className={`cursor-pointer rounded-xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl ${
            activeCard === "requests"
              ? "bg-purple-600 text-white"
              : "bg-white text-zinc-900"
          }`}
          onClick={() =>
            setActiveCard(activeCard === "requests" ? null : "requests")
          }
        >
          <h2 className="text-lg font-semibold mb-2">Withdraw Requests</h2>
          <p
            className={`text-2xl font-bold ${
              activeCard === "requests" ? "text-white" : "text-yellow-600"
            }`}
          >
            {requests.filter((r) => r.status === "pending").length}
          </p>
        </div>

        <div
          className={`cursor-pointer rounded-xl p-6 shadow-lg transition transform hover:-translate-y-1 hover:shadow-2xl ${
            activeCard === "withdrawn"
              ? "bg-purple-600 text-white"
              : "bg-white text-zinc-900"
          }`}
          onClick={() =>
            setActiveCard(activeCard === "withdrawn" ? null : "withdrawn")
          }
        >
          <h2 className="text-lg font-semibold mb-2">Total Withdrawn</h2>
          <p
            className={`text-2xl font-bold ${
              activeCard === "withdrawn" ? "text-white" : "text-red-600"
            }`}
          >
            ₹{totalWithdrawn}
          </p>
        </div>
      </div>

      {activeCard && (
        <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300">
          {activeCard === "credited" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Credited Amount History
              </h3>

              <div className="bg-zinc-100 rounded-xl shadow p-4 space-y-2">
                <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2 text-gray-700">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Source</div>
                </div>

                {[
                  { id: 1, date: "2025-10-01", amount: 2000, source: "Sale A" },
                  { id: 2, date: "2025-10-03", amount: 1500, source: "Sale B" },
                  { id: 3, date: "2025-10-05", amount: 1500, source: "Sale C" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-3 gap-4 py-2 border-b last:border-b-0 items-center"
                  >
                    <div className="text-gray-600">{item.date}</div>
                    <div className="text-green-600 font-bold">
                      ₹{item.amount}
                    </div>
                    <div className="text-gray-800">{item.source}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeCard === "requests" && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Withdraw Requests</h3>
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
          )}

          {activeCard === "withdrawn" && (
            <div>
              <h3 className="text-xl font-semibold mb-4 text-center">
                Withdrawn History
              </h3>

              <div className="bg-white rounded-xl shadow p-4 space-y-2">
                {/* Header */}
                <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2 text-gray-700">
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                  <div>Action By</div>
                </div>

                {/* Data Rows */}
                {requests
                  .filter((r) => r.status === "approved")
                  .map((item) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-4 gap-4 py-2 border-b last:border-b-0 items-center"
                    >
                      <div className="text-gray-600">
                        {item?.date || "2025-10-01"}
                      </div>
                      <div className="text-red-600 font-bold">
                        ₹{item.amount}
                      </div>
                      <div
                        className={`font-medium ${
                          item.status === "approved"
                            ? "text-green-600"
                            : item.status === "rejected"
                            ? "text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        {item.status}
                      </div>
                      <div className="text-gray-800">{item.name}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
