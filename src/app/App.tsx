import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import RootLayout, { loader as rootLoader } from "../pages/RootLayout.tsx";
import Login from "@/pages/Login.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Signup from "@/pages/Signup.tsx";
import Home from "@/pages/Home.tsx";
import ChatWindow, {
  loader as chatWindowLoader,
} from "@/components/ChatWindow.tsx";
import NoChatWindow from "@/components/NoChatWindow.tsx";
import { useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket.ts";
import { useSelector } from "react-redux";
import type { UserState } from "@/store/userSlice.ts";
import type { AllUsers } from "@/store/allUsersSlice.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/signup"} />,
        loader: rootLoader,
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
        children: [
          {
            index: true,
            element: <NoChatWindow />,
          },
          {
            path: "chat/:userId",
            element: <ChatWindow />,
            loader: chatWindowLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  const user = useSelector(
    (state: { user: UserState; allUsers: AllUsers }): UserState => state.user,
  );

  useEffect(() => {
    if (user) {
      connectWebSocket(user.userId, (message) => {
        console.log("Received Message", message);
        // Optionally store in Redux/Zustand state
      });
    }

    return () => {
      disconnectWebSocket();
    };
  }, [user]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
