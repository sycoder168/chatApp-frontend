import { configureStore } from "@reduxjs/toolkit";
import userSlice, { type UserState } from "@/store/userSlice.ts";
import allUsersSlice, { type AllUsers } from "@/store/allUsersSlice.ts";
import userChatsSlice, { type UserChats } from "@/store/userChatsSlice.ts";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    allUsers: allUsersSlice.reducer,
    userChats: userChatsSlice.reducer,
  },
});

export interface GlobalState {
  user: UserState;
  allUsers: AllUsers;
  userChats: UserChats;
}

export default store;
