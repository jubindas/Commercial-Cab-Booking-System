import { Card, CardContent } from "@/components/ui/card"

import { DollarSign, RefreshCw, Wallet, Truck } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-none shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium text-gray-700">Total Membership Sales</h2>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-700 mt-4">₹1,20,000</p>
            <span className="text-xs text-gray-500 mt-1">All-time sales</span>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-none shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium text-gray-700">Renewals</h2>
              <RefreshCw className="h-8 w-8 text-blue-600" />
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold text-blue-700">Upcoming: 12</p>
              <p className="text-lg font-semibold text-red-600">Expired: 5</p>
            </div>
            <span className="text-xs text-gray-500 mt-1">Membership tracking</span>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-indigo-50 to-indigo-100 border-none shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium text-gray-700">Amounts Collected</h2>
              <Wallet className="h-8 w-8 text-indigo-600" />
            </div>
            <p className="text-3xl font-bold text-indigo-700 mt-4">₹95,000</p>
            <span className="text-xs text-gray-500 mt-1">From memberships</span>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-none shadow-lg rounded-2xl">
          <CardContent className="p-6 flex flex-col items-start">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-sm font-medium text-gray-700">Vehicles per Vendor</h2>
              <Truck className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-3xl font-bold text-orange-700 mt-4">3.5 avg</p>
            <span className="text-xs text-gray-500 mt-1">Across all vendors</span>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
