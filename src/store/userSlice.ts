import { createSlice } from "@reduxjs/toolkit";

// Utility to decode JWT
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

export interface UserState {
  userId: number;
  username: string;
}

// Check for token in localStorage
const token = localStorage.getItem("token");
const decodedUser = token ? decodeJWT(token) : null;

const initialState: UserState = {
  userId: decodedUser?.userId || 0,
  username: decodedUser?.username || "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.username = action.payload.username;
    },

    logout: (state) => {
      state.userId = 0;
      state.username = "";
      localStorage.removeItem("token");
    },
  },
});

export default userSlice;
export const userActions = userSlice.actions;
