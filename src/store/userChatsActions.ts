import { userChatsActions, type UserChat } from "@/store/userChatsSlice.ts";
import { type UserState } from "@/store/userSlice";
import store from "@/store/index";

export function fetchUserChats() {
  return async (
    dispatch: (arg0: {
      payload: UserChat[];
      type: "userChats/setUserChats";
    }) => void,
  ) => {
    const state = store.getState();
    const user: UserState = state.user;
    const response = await fetch(
      `http://localhost:8080/user/chats/${user.userId}`,
    );

    if (!response.ok) {
      return null;
    }

    const userChats: UserChat[] = await response.json();

    dispatch(userChatsActions.setUserChats(userChats));

    return userChats;
  };
}
