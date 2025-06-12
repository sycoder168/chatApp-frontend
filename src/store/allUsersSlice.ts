import { createSlice } from "@reduxjs/toolkit";
import type { UserState } from "@/store/userSlice.ts";

interface AllUsers {
  users: UserState[];
}

const initialState: AllUsers = {
  users: [],
};

const allUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export default allUsersSlice;

export const allUsersActions = allUsersSlice.actions;
