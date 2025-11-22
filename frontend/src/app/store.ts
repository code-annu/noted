import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/authSlice";
import { noteReducer } from "../features/note/noteSlice";
import { collaborationReducer } from "../features/collaboration/collaborationSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
    collaboration: collaborationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
