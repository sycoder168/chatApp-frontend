import type { UserState } from "@/store/userSlice.ts";
import { createSlice } from "@reduxjs/toolkit";

export interface Message {
  messageId: number;
  senderId: number;
  chatId: number;
  content: string;
  seen: boolean;
}

export interface UserChat {
  user: UserState;
  chatId: number;
  messages: Message[];
}

export interface UserChats {
  userChats: UserChat[];
}

const initialState: UserChats = {
  userChats: [],
};

const userChatsSlice = createSlice({
  name: "userChats",
  initialState,
  reducers: {
    setUserChats: (state, action: { payload: UserChat[]; type: string }) => {
      state.userChats = action.payload;
    },
    addMessageToChat: (state, action: { payload: Message; type: string }) => {
      const newMessage = action.payload;
      const chat = state.userChats.find(
        (uc) => uc.chatId === newMessage.chatId,
      );
      if (chat) {
        chat.messages.push(newMessage);
      }
    },
  },
});

export default userChatsSlice;

export const userChatsActions = userChatsSlice.actions;
