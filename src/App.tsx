import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Suspense, lazy, type ReactNode } from "react";

import { AuthProvider } from "@/provider/authContext";

import { useAuth } from "./hooks/useAuth";

import VendorsDirectory from "./pages/VendorsDirectory";

import VendorsViewDetails from "./pages/VendorsViewDetails";

import UserPoolCarMembership from "./pages/UserPoolCarMembership";
import UserMembershipsDetails from "./pages/UserMembershipsDetails";

const RootLayout = lazy(() => import("@/components/RootLayout"));

const Login = lazy(() => import("@/pages/Login"));

const Location = lazy(() => import("@/pages/Location"));

const Pincode = lazy(() => import("@/pages/Pincode"));

const MainCategories = lazy(() => import("@/pages/MainCategories"));

const SubCategories = lazy(() => import("@/pages/SubCategories"));

const State = lazy(() => import("@/pages/State"));

const District = lazy(() => import("@/pages/District"));

const City = lazy(() => import("@/pages/City"));

const VendorProfile = lazy(() => import("@/pages/VendorProfile"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));

const TotalSalesMan = lazy(() => import("@/pages/TotalSalesMan"));

const PerticulerMembership = lazy(() => import("@/pages/PerticulerMembership"));

const Memberships = lazy(() => import("@/pages/Memberships"));

const SalesManReferral = lazy(() => import("@/pages/SalesManReferral"));

const ViewDetailsSalesmen = lazy(() => import("@/pages/ViewDetailsSalesmen"));

const PullCar = lazy(() => import("@/pages/PullCar"));

const ViewPullCarDetails = lazy(() => import("@/pages/ViewPullCarDetails"));

const PullcarMembership = lazy(() => import("@/pages/PullcarMembership"));

const UserMembership = lazy(() => import("@/pages/UserMembership"));

const User = lazy(() => import("@/pages/User"));

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

const router = createBrowserRouter([
  {
    path: "login",
    element: (
      <Suspense fallback={<div>Loading login...</div>}>
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
        index: true,
        element: (
          <Suspense fallback={<div>Loading dashboard...</div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "location",
        element: (
          <Suspense fallback={<div>Loading location...</div>}>
            <Location />
          </Suspense>
        ),
      },
      {
        path: "pincode",
        element: (
          <Suspense fallback={<div>Loading pincode...</div>}>
            <Pincode />
          </Suspense>
        ),
      },
      {
        path: "main-category",
        element: (
          <Suspense fallback={<div>Loading main categories...</div>}>
            <MainCategories />
          </Suspense>
        ),
      },
      {
        path: "sub-category",
        element: (
          <Suspense fallback={<div>Loading subcategories...</div>}>
            <SubCategories />
          </Suspense>
        ),
      },
      {
        path: "state",
        element: (
          <Suspense fallback={<div>Loading states...</div>}>
            <State />
          </Suspense>
        ),
      },
      {
        path: "district",
        element: (
          <Suspense fallback={<div>Loading districts...</div>}>
            <District />
          </Suspense>
        ),
      },
      {
        path: "city",
        element: (
          <Suspense fallback={<div>Loading cities...</div>}>
            <City />
          </Suspense>
        ),
      },
      {
        path: "membership-details/:id",
        element: (
          <Suspense fallback={<div>Loading membership details...</div>}>
            <PerticulerMembership />
          </Suspense>
        ),
      },
      {
        path: "view-details/referrals/:id",
        element: (
          <Suspense fallback={<div>Loading referral details...</div>}>
            <SalesManReferral />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<div>Loading profile...</div>}>
            <VendorProfile />
          </Suspense>
        ),
      },
      {
        path: "total-salesman",
        element: (
          <Suspense fallback={<div>Loading total salesmen...</div>}>
            <TotalSalesMan />
          </Suspense>
        ),
      },
      {
        path: "membership",
        element: (
          <Suspense fallback={<div>Loading memberships...</div>}>
            <Memberships />
          </Suspense>
        ),
      },
      {
        path: "view-details/salesmen/:id",
        element: (
          <Suspense fallback={<div>Loading salesman details...</div>}>
            <ViewDetailsSalesmen />
          </Suspense>
        ),
      },
      {
        path: "vendors",
        element: (
          <Suspense fallback={<div>Loading vendors...</div>}>
            <VendorsDirectory />
          </Suspense>
        ),
      },
      {
        path: "vendor/view-details/:id",
        element: (
          <Suspense fallback={<div>Loading vendors...</div>}>
            <VendorsViewDetails />
          </Suspense>
        ),
      },

      {
        path: "pool-car-membership",
        element: (
          <Suspense fallback={<div>Loading pull car membership...</div>}>
            <PullcarMembership />
          </Suspense>
        ),
      },
      {
        path: "pool-car",
        element: (
          <Suspense fallback={<div>Loading pull cars...</div>}>
            <PullCar />
          </Suspense>
        ),
      },
      {
        path: "view-details/pull-cars/:id",
        element: (
          <Suspense fallback={<div>Loading pull car details...</div>}>
            <ViewPullCarDetails />
          </Suspense>
        ),
      },
      {
        path: "/users/pool-car-membership",
        element: (
          <Suspense fallback={<div>Loading user memberships...</div>}>
            <UserPoolCarMembership />
          </Suspense>
        ),
      },
      {
        path: "user-membership",
        element: (
          <Suspense fallback={<div>Loading user memberships...</div>}>
            <UserMembership />
          </Suspense>
        ),
      },
      {
        path: "/user-membership-details/:id",
        element: (
          <Suspense fallback={<div>Loading users...</div>}>
           <UserMembershipsDetails />
          </Suspense>
        ),
      },

      {
        path: "user",
        element: (
          <Suspense fallback={<div>Loading users...</div>}>
            <User />
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
