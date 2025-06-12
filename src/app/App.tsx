import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import RootLayout from "../pages/RootLayout.tsx";
import Login from "@/pages/Login.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Signup from "@/pages/Signup.tsx";
import Home from "@/pages/Home.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/signup"} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
