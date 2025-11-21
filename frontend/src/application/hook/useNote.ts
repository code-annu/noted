import { useDispatch } from "react-redux";
import { NoteRepository } from "../../data/repository/NoteRepository";
import { ListMyNotesUsecase } from "../usecase/note/ListMyNotesUsecase";
import {
  addNote,
  setCurrentEditingNote,
  setNotes,
} from "../../features/note/noteSlice";
import type { Note, NoteCreate, NoteUpdate } from "../../domain/entities/note";
import { CreateNewNoteUsecase } from "../usecase/note/CreateNewNoteUsecase";
import { GetNoteUsecase } from "../usecase/note/GetNoteUsecase";
import { UpdateNoteUsecase } from "../usecase/note/UpdateNoteUsecase";
import { DeleteNoteUsecase } from "../usecase/note/DeleteNoteUsecase";

function useNote() {
  const noteRepo = new NoteRepository();
  const dispatch = useDispatch();

  const listMyNotes = async () => {
    const listMyNotesUsecase = new ListMyNotesUsecase(noteRepo);
    const notes = await listMyNotesUsecase.execute();
    dispatch(setNotes({ notes: notes }));
  };

  const createNote = async (noteCreate: NoteCreate): Promise<Note> => {
    const createNoteUsecase = new CreateNewNoteUsecase(noteRepo);
    const note = await createNoteUsecase.execute(noteCreate);
    dispatch(addNote({ note: note }));
    return note;
  };

  const getNote = async (noteId: string): Promise<Note> => {
    const getNoteUsecase = new GetNoteUsecase(noteRepo);
    const note = await getNoteUsecase.execute(noteId);
    dispatch(setCurrentEditingNote({ note: note }));
    return note;
  };

  const updateNote = async (
    noteId: string,
    updates: NoteUpdate
  ): Promise<Note> => {
    const updateNoteUsecase = new UpdateNoteUsecase(noteRepo);
    const note = await updateNoteUsecase.execute(noteId, updates);
    dispatch(setCurrentEditingNote({ note: note }));
    return note;
  };

  const deleteNote = async (noteId: string): Promise<Note> => {
    const deleteNoteUsecase = new DeleteNoteUsecase(noteRepo);
    const deletedNote = await deleteNoteUsecase.execute(noteId);
    dispatch(setCurrentEditingNote({ note: null }));
    return deletedNote;
  };

  return { listMyNotes, createNote, getNote, updateNote, deleteNote };
}

export default useNote;
