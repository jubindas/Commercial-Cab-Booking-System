import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "@/components/RootLayout";

import Ragistration from "@/pages/Registration";

import Location from "./pages/Location";

import Pincode from "@/pages/Pincode"


const router = createBrowserRouter([
  {
    path: "ragistration",  element: <Ragistration />,
  },
  {
    path: "/",  element: <RootLayout />,
    children: [{ path: "/home", element: <h2>hi home</h2> },
      { path: "/location", element: <Location /> },
      { path: "/pincode",  element: <Pincode /> }
    ],
  },
]);


function App() {
  return <RouterProvider router={router} />;
}

export default App;
