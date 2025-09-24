import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import RootLayout from "@/components/RootLayout";

import Login from "@/pages/Login";

import Location from "./pages/Location";

import Pincode from "@/pages/Pincode";

import MainCategories from "./pages/MainCategories";

import SubCategories from "./pages/SubCategories";

import Vendor from "./pages/Vendor";

import { AuthProvider } from "@/provider/authContext";

import { useAuth } from "./hooks/useAuth";

import type { ReactNode } from "react";

import State from "./pages/State";

import District from "./pages/District";

import City from "@/pages/City";

import Membership from "./pages/Membership";

import VendorsViewDetails from "./pages/VendorsViewDetails";

import CreatedVendors from "./pages/CreatedVendors";

import VendorProfile from "./pages/VendorProfile";

import HistoryVendors from "./pages/HistoryVendors";

import Dashboard from "./pages/Dashboard";

import TotalSalesMan from "./pages/TotalSalesMan";

import TotalUsers from "./pages/TotalUsers";

import SaledMembership from "./pages/SaledMembership";

import UserMembership from "./pages/UserMembership";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "location", element: <Location /> },
      { path: "pincode", element: <Pincode /> },
      { path: "main-category", element: <MainCategories /> },
      { path: "sub-category", element: <SubCategories /> },
      { path: "membership-vendor", element: <Vendor /> },
      { path: "state", element: <State /> },
      { path: "district", element: <District /> },
      { path: "city", element: <City /> },
      { path: "membership", element: <Membership /> },
      { path: "created-vendor", element: <CreatedVendors /> },
      { path: "profile", element: <VendorProfile /> },
      { path: "history", element: <HistoryVendors /> },
      { path: "total-salesman", element: <TotalSalesMan /> },
      { path: "totaluser", element: <TotalUsers /> },
      { path: "salesman/view-details/:id", element: <SaledMembership /> },
      { path: "user-membership", element: <UserMembership /> },
      {
        path: "/view-details/:id",
        element: (
          <VendorsViewDetails
            vendor={{
              name: "ABC Travels",
              phone: "9876543210",
              idCardImage:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fstackoverflow.com%2Fquestions%2F69250540%2Fhow-to-read-decode-secure-qr-code-on-indian-aadhaar-card-image&psig=AOvVaw2kN6po89V0dmiZcS75XMln&ust=1758097212557000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOj2wNPs3I8DFQAAAAAdAAAAABAE",
              addressProofImage:
                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.indiamart.com%2Fproddetail%2Faddress-proof-6237315530.html%3Fsrsltid%3DAfmBOooCQXgnc9mGFmlOscCgaz4PycaQDOhCwuWt9YaBnzeVYYFTdF1y&psig=AOvVaw2WlIPMfdsskNsi4oXZXgF2&ust=1758097293551000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCICh5fns3I8DFQAAAAAdAAAAABAE",
            }}
          />
        ),
      },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
