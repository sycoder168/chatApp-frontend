import ChatWindowHeader from "@/components/ChatWindowHeader.tsx";
import ChatWindowFooter from "@/components/ChatWindowFooter.tsx";
import type { UserState } from "@/store/userSlice.ts";
import store from "@/store";
import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router-dom";

export default function ChatWindow() {
  const activeChatUser: UserState = useLoaderData();

  return (
    <>
      <ChatWindowHeader activeChatUser={activeChatUser} />
      <ChatWindowFooter />
    </>
  );
}

export function loader({ params }: LoaderFunctionArgs) {
  const userId = params.userId;
  const state = store.getState();
  const activeChatUser: UserState | undefined = state.allUsers.users.find(
    (user) => user.userId === Number(userId),
  );

  return activeChatUser;
}
