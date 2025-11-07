import { useState } from "react";
import { NoteRepository } from "../../data/repository/NoteRepository";
import type { Note, NoteCreate, NoteUpdate } from "../../domain/entities/note";
import { CreateNewNoteUsecase } from "../usecase/note/CreateNewNoteUsecase";
import { handleError } from "../../util/error-handler-util";
import { ListMyNotesUsecase } from "../usecase/note/ListMyNotesUsecase";
import { GetNoteUsecase } from "../usecase/note/GetNoteUsecase";
import { UpdateNoteUsecase } from "../usecase/note/UpdateNoteUsecas";
import { DeleteNoteUsecase } from "../usecase/note/DeleteNoteUsecase";

function useNote() {
  const noteRepo = new NoteRepository();
  const [createdNote, setCreatedNote] = useState<Note | null>();
  const [error, setError] = useState<string | null>(null);
  const [myNotes, setMyNotes] = useState<Note[]>([]);
  const [note, setNote] = useState<Note | null>(null);

  const createNote = async (noteCreate: NoteCreate) => {
    const createNoteUsecase = new CreateNewNoteUsecase(noteRepo);
    try {
      const note = await createNoteUsecase.execute(noteCreate);
      console.log(note);
      setCreatedNote(note);
    } catch (err) {
      console.log(err);
      handleError(err, setError);
    }
  };

  const listMyNotes = async () => {
    const getMyNotesUsecase = new ListMyNotesUsecase(noteRepo);
    try {
      const notes = await getMyNotesUsecase.execute();
      console.log(notes);
      setMyNotes(notes);
    } catch (err) {
      console.log(err);
      handleError(err, setError);
    }
  };

  const getNote = async (noteId: string) => {
    const getNoteUsecase = new GetNoteUsecase(noteRepo);
    try {
      const note = await getNoteUsecase.execute(noteId);
      setNote(note);
    } catch (err) {
      console.log(err);
      handleError(err, setError);
    }
  };

  const updateNote = async (noteId: string, updates: NoteUpdate) => {
    const updateNoteUsecase = new UpdateNoteUsecase(noteRepo);
    try {
      const note = await updateNoteUsecase.execute(noteId, updates);
      setNote(note);
    } catch (err) {
      console.log(err);
      handleError(err, setError);
    }
  };

  const deleteNote = async (noteId: string) => {
    const deleteNoteUsecase = new DeleteNoteUsecase(noteRepo);
    try {
      const note = await deleteNoteUsecase.execute(noteId);
      setNote(note);
    } catch (err) {
      console.log(err);
      handleError(err, setError);
    }
  };

  return {
    createNote,
    createdNote,
    listMyNotes,
    myNotes,
    note,
    getNote,
    updateNote,
    deleteNote,
    error,
  };
}

export default useNote;
