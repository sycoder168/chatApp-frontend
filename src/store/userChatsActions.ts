import { userChatsActions, type UserChat } from "@/store/userChatsSlice.ts";
import { redirect } from "react-router";
import { userActions } from "./userSlice";

function decodeJWT(token: string): { userId: number; username: string } | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return {
      userId: decoded.userId,
      username: decoded.username,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return null;
  }
}

export function fetchUserChats() {
  return async (
    dispatch: (arg0: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload: any;
      type: "user/setUser" | "userChats/setUserChats";
    }) => void,
  ) => {
    // const state = store.getState();
    // const user: UserState = state.user;
    const token = localStorage.getItem("token");
    if (!token) {
      // no token? force login
      throw redirect("/login");
    }

    const decoded = decodeJWT(token);
    if (!decoded) {
      throw redirect("/login");
    }

    dispatch(
      userActions.setUser({
        userId: decoded.userId,
        username: decoded.username,
      }),
    );

    const response = await fetch(
      `http://localhost:8080/user/chats/${decoded.userId}`,
    );

    if (!response.ok) {
      return null;
    }

    const userChats: UserChat[] = await response.json();

    dispatch(userChatsActions.setUserChats(userChats));

    return userChats;
  };
}
