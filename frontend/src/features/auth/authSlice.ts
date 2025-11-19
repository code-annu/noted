import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../domain/entities/user";

interface AuthState {
  user: User | null;
}

const initialState: AuthState = { user: null };

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User | null }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
