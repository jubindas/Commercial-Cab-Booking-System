import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Suspense, lazy, type ReactNode } from "react";

import { AuthProvider } from "@/provider/authContext";

import { useAuth } from "./hooks/useAuth";
import Vendors from "./pages/Vendors";

const RootLayout = lazy(() => import("@/components/RootLayout"));

const Login = lazy(() => import("@/pages/Login"));

const Location = lazy(() => import("@/pages/Location"));

const Pincode = lazy(() => import("@/pages/Pincode"));

const MainCategories = lazy(() => import("@/pages/MainCategories"));

const SubCategories = lazy(() => import("@/pages/SubCategories"));

const Vendor = lazy(() => import("@/pages/Vendor"));

const State = lazy(() => import("@/pages/State"));

const District = lazy(() => import("@/pages/District"));

const City = lazy(() => import("@/pages/City"));

const Membership = lazy(() => import("@/pages/Membership"));

const VendorsViewDetails = lazy(() => import("@/pages/VendorsViewDetails"));

const CreatedVendors = lazy(() => import("@/pages/CreatedVendors"));

const VendorProfile = lazy(() => import("@/pages/VendorProfile"));

const HistoryVendors = lazy(() => import("@/pages/HistoryVendors"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));

const TotalSalesMan = lazy(() => import("@/pages/TotalSalesMan"));

const TotalUsers = lazy(() => import("@/pages/TotalUsers"));

const SaledMembership = lazy(() => import("@/pages/SaledMembership"));

const UserMembership = lazy(() => import("@/pages/UserMembership"));

const SalesManWallet = lazy(() => import("@/pages/SalesManWallet"));

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Suspense fallback={<div>Loading layout...</div>}>
          <RootLayout />
        </Suspense>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "location",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Location />
          </Suspense>
        ),
      },
      {
        path: "pincode",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Pincode />
          </Suspense>
        ),
      },
      {
        path: "main-category",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <MainCategories />
          </Suspense>
        ),
      },
      {
        path: "sub-category",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SubCategories />
          </Suspense>
        ),
      },
      {
        path: "membership-vendor",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Vendor />
          </Suspense>
        ),
      },
      {
        path: "state",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <State />
          </Suspense>
        ),
      },
      {
        path: "district",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <District />
          </Suspense>
        ),
      },
      {
        path: "city",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <City />
          </Suspense>
        ),
      },
      {
        path: "membership",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Membership />
          </Suspense>
        ),
      },
      {
        path: "created-vendor",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <CreatedVendors />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <VendorProfile />
          </Suspense>
        ),
      },
      {
        path: "history",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HistoryVendors />
          </Suspense>
        ),
      },
      {
        path: "total-salesman",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TotalSalesMan />
          </Suspense>
        ),
      },
      {
        path: "totaluser",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TotalUsers />
          </Suspense>
        ),
      },
      {
        path: "salesman/view-details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SaledMembership />
          </Suspense>
        ),
      },
      {
        path: "user-membership",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <UserMembership />
          </Suspense>
        ),
      },
      {
        path: "salesman/wallet/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SalesManWallet />
          </Suspense>
        ),
      },
      {
        path: "vendors",
        element: <Vendors />,
      },
      {
        path: "/view-details/:id",
        element: (
          <Suspense fallback={<div>Loading vendor details...</div>}>
            <VendorsViewDetails
              vendor={{
                name: "ABC Travels",
                phone: "9876543210",
                idCardImage: "https://example.com/id-card.png",
                addressProofImage: "https://example.com/address-proof.png",
              }}
            />
          </Suspense>
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
