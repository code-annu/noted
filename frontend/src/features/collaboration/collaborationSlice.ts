import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Collaboration } from "../../domain/entities/collaboration";

interface CollaborationState {
  collaborations: Collaboration[];
}

const initialState: CollaborationState = {
  collaborations: [],
};

const collaborationSlice = createSlice({
  name: "collaboration",
  initialState: initialState,
  reducers: {
    setCollaborations: (
      state,
      action: PayloadAction<{ collaborations: Collaboration[] }>
    ) => {
      state.collaborations = action.payload.collaborations;
    },
    addCollaboration: (
      state,
      action: PayloadAction<{ collaboration: Collaboration }>
    ) => {
      state.collaborations.push(action.payload.collaboration);
    },
  },
});

export const { setCollaborations, addCollaboration } =
  collaborationSlice.actions;

export const collaborationReducer = collaborationSlice.reducer;
