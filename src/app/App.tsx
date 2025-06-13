import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import RootLayout, { loader as rootLoader } from "../pages/RootLayout.tsx";
import Login from "@/pages/Login.tsx";
import { ThemeProvider } from "@/components/theme-provider.tsx";
import Signup from "@/pages/Signup.tsx";
import Home, { loader as homeLoader } from "@/pages/Home.tsx";
import ChatWindow, {
  loader as chatWindowLoader,
} from "@/components/ChatWindow.tsx";
import NoChatWindow from "@/components/NoChatWindow.tsx";
import { useEffect } from "react";
import { connectWebSocket, disconnectWebSocket } from "@/lib/websocket.ts";
import { useDispatch, useSelector } from "react-redux";
import type { UserState } from "@/store/userSlice.ts";
import type { AllUsers } from "@/store/allUsersSlice.ts";
import {
  userChatsActions,
  type Message,
  type UserChats,
} from "@/store/userChatsSlice.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to={"/login"} />,
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
        loader: homeLoader,
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
    (state: {
      user: UserState;
      allUsers: AllUsers;
      userChats: UserChats;
    }): UserState => state.user,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      connectWebSocket(user.userId, (message: Message) => {
        console.log("Received Message", message);
        // Optionally store in Redux/Zustand state
        dispatch(userChatsActions.addMessageToChat(message));
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
