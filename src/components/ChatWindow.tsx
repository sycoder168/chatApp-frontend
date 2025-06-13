import ChatWindowHeader from "@/components/ChatWindowHeader.tsx";
import ChatWindowFooter from "@/components/ChatWindowFooter.tsx";
// import type { UserState } from "@/store/userSlice.ts";
import store, { type GlobalState } from "@/store";
// import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router-dom";
import type { UserChat } from "@/store/userChatsSlice";
import MessageBubble from "./MessageBubble";
import { ScrollArea } from "./ui/scroll-area";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export default function ChatWindow() {
  // const activeUserChat: UserChat = useLoaderData();
  const params = useParams();
  const userChats = useSelector(
    (state: GlobalState) => state.userChats.userChats,
  );
  const activeUserChat: UserChat | undefined = userChats.find(
    (userChat) => userChat.user.userId === Number(params.userId),
  );

  return (
    <>
      {/* <ChatWindowHeader activeUserChat={activeUserChat} />
      <ChatWindowFooter
        chatId={activeUserChat.chatId}
        receiverId={activeUserChat.user.userId}
      /> */}
      <div className="flex flex-col h-screen">
        {/* HEADER */}
        <ChatWindowHeader activeUserChat={activeUserChat} />
        <ScrollArea className="flex-1 p-4 overflow-y-auto">
          <div className="flex flex-col gap-2">
            {activeUserChat?.messages?.map((msg, index) => (
              <MessageBubble
                key={index}
                message={msg.content}
                isOwnMessage={msg.senderId === store.getState().user.userId}
              />
            ))}
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <ChatWindowFooter
          chatId={activeUserChat?.chatId}
          receiverId={activeUserChat?.user?.userId}
        />
      </div>
    </>
  );
}

export function loader({ params }: LoaderFunctionArgs) {
  const userId = params.userId;
  const state = store.getState();
  // const activeChatUser: UserState | undefined = state.allUsers.users.find(
  //   (user) => user.userId === Number(userId),
  // );
  const activeUserChat = state.userChats.userChats.find(
    (userChat) => userChat.user.userId === Number(userId),
  );

  return activeUserChat;
}
