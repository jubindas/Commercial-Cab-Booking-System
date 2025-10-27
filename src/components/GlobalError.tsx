/* eslint-disable @typescript-eslint/no-explicit-any */
import { AlertTriangle } from "lucide-react";

interface GlobalErrorProps {
  error: any;
}

export default function GlobalError({ error }: GlobalErrorProps) {
  const statusCode =
    error?.response?.status || error?.status || "Unknown Status";
  const message =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred. Please try again later.";

  return (
    <div className="flex items-center justify-center min-h-[70vh] bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-10 max-w-lg w-full text-center transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-center mb-5">
          <div className="bg-red-50 p-4 rounded-full shadow-inner">
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 mb-3">
          Something went wrong
        </h2>

        <p className="text-gray-500 mb-1">
          <span className="font-medium text-gray-700">Status:</span>{" "}
          {statusCode}
        </p>

        <p className="text-gray-600 mb-8 leading-relaxed">{message}</p>

        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center justify-center px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg shadow-md transition-all duration-200 focus:ring-2 focus:ring-red-400 focus:outline-none"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
