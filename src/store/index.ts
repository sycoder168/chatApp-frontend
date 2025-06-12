import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/userSlice.ts";
import allUsersSlice from "@/store/allUsersSlice.ts";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    allUsers: allUsersSlice.reducer,
  },
});

export default store;
