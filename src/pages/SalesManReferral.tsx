import { useState } from "react";

import { FaUser, FaCar } from "react-icons/fa";

import ReferralMembership from "./ReferralMembership";

import ReferralPullcar from "./ReferralPullcar";

export default function SalesManReferral() {
  const [activeTab, setActiveTab] = useState<"membership" | "pullcars">(
    "membership"
  );

  return (
    <div className="p-6 flex flex-col items-center">
      <div className="flex gap-6 mb-8 justify-center">
        <div
          onClick={() => setActiveTab("membership")}
          className={`flex items-center gap-3 p-6 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
            activeTab === "membership"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <FaUser size={30} />
          <div>
            <h3 className="text-lg font-semibold">Referral Membership</h3>
            <p className="text-sm">View all referred members</p>
          </div>
        </div>

        <div
          onClick={() => setActiveTab("pullcars")}
          className={`flex items-center gap-3 p-6 rounded-xl shadow-lg cursor-pointer transition-transform transform hover:scale-105 ${
            activeTab === "pullcars"
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800"
          }`}
        >
          <FaCar size={30} />
          <div>
            <h3 className="text-lg font-semibold">Referral Pull Cars</h3>
            <p className="text-sm">View all referred cars</p>
          </div>
        </div>
      </div>

      <div>
        {activeTab === "membership" && <ReferralMembership />}

        {activeTab === "pullcars" && <ReferralPullcar />}
      </div>
    </div>
  );
}
