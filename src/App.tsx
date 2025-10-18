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

import PullCar from "./pages/PullCar";

import ViewPullCarDetails from "./pages/ViewPullCarDetails";

import ViewDetailsSalesmen from "./pages/ViewDetailsSalesmen";

import SalesManReferral from "./pages/SalesManReferral";

import PullcarMembership from "./pages/PullcarMembership";

import UserMembership from "./pages/UserMembership";
import User from "./pages/User";

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

const VendorProfile = lazy(() => import("@/pages/VendorProfile"));

const Dashboard = lazy(() => import("@/pages/Dashboard"));

const TotalSalesMan = lazy(() => import("@/pages/TotalSalesMan"));

const PerticulerMembership = lazy(() => import("@/pages/PerticulerMembership"));

const Memberships = lazy(() => import("@/pages/Memberships"));

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
        path: "/membership-details/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <PerticulerMembership />
          </Suspense>
        ),
      },
      {
        path: "/view-details/referrals/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SalesManReferral />
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
        path: "total-salesman",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <TotalSalesMan />
          </Suspense>
        ),
      },

      {
        path: "membership",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <Memberships />
          </Suspense>
        ),
      },
      {
        path: "/view-details/salesmen/:id",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ViewDetailsSalesmen />
          </Suspense>
        ),
      },

      {
        path: "vendors",
        element: <Vendors />,
      },
      {
        path: "pull-car-membership",
        element: <PullcarMembership />,
      },
      {
        path: "pull-car",
        element: <PullCar />,
      },
      {
        path: "/view-details/pull-cars/:id",
        element: (
          <Suspense fallback={<div>Loading vendor details...</div>}>
            <ViewPullCarDetails />
          </Suspense>
        ),
      },
      {
        path: "/user-membership",
        element: (
          <Suspense fallback={<div>Loading vendor details...</div>}>
            <UserMembership />
          </Suspense>
        ),
      },
      {
        path: "/user",
        element: (
          <Suspense fallback={<div> Loading user .key. </div>}>
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
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
    </QueryClientProvider>
  );
}

export default App;
