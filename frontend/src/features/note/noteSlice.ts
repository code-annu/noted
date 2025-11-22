import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Note } from "../../domain/entities/note";
import type { NoteVersion } from "../../domain/entities/note-version";
import type { Collaboration } from "../../domain/entities/collaboration";

interface NoteState {
  myNotes: Note[] | null;
  currentEditingNote: Note | null;
  currentEditingNoteVersions: NoteVersion[];
  currentEditingNoteCollaborations: Collaboration[];
}

const initialState: NoteState = {
  myNotes: null,
  currentEditingNote: null,
  currentEditingNoteVersions: [],
  currentEditingNoteCollaborations: [],
};

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    addNote: (state, action: PayloadAction<{ note: Note }>) => {
      if (state.myNotes == null) {
        state.myNotes = [action.payload.note];
      } else {
        state.myNotes.push(action.payload.note);
      }
    },
    setNotes: (state, action: PayloadAction<{ notes: Note[] }>) => {
      state.myNotes = action.payload.notes;
    },
    setCurrentEditingNote: (
      state,
      action: PayloadAction<{ note: Note | null }>
    ) => {
      state.currentEditingNote = action.payload.note;
    },
    setCurrentEditingNoteVersions: (
      state,
      action: PayloadAction<{ versions: NoteVersion[] }>
    ) => {
      state.currentEditingNoteVersions = action.payload.versions;
    },
    addCurrentEditingNoteVersion: (
      state,
      action: PayloadAction<{ version: NoteVersion }>
    ) => {
      state.currentEditingNoteVersions.push(action.payload.version);
    },
    setCurrentEditingNoteCollaborations: (
      state,
      action: PayloadAction<{ collaborations: Collaboration[] }>
    ) => {
      state.currentEditingNoteCollaborations = action.payload.collaborations;
    },
  },
});

export const {
  setNotes,
  addNote,
  setCurrentEditingNote,
  setCurrentEditingNoteVersions,
  addCurrentEditingNoteVersion,
  setCurrentEditingNoteCollaborations,
} = noteSlice.actions;
export const noteReducer = noteSlice.reducer;
