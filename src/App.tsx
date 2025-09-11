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

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  if (token) return <Navigate to="/login" replace />;
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
      { path: "home", element: <h2>hi home</h2> },
      { path: "location", element: <Location /> },
      { path: "pincode", element: <Pincode /> },
      { path: "main-category", element: <MainCategories /> },
      { path: "sub-category", element: <SubCategories /> },
      { path: "vendor", element: <Vendor /> },
      { path: "state", element: <State /> },
      { path: "district", element: <District /> },
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
