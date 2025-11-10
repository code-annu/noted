import React, { useEffect } from "react";
import useNote from "../../../application/hooks/use-note";
import CreateNoteComp from "../../components/notes/CreateNoteComp";
import type { Note } from "../../../domain/entities/note";
import NoteView from "../../components/notes/NoteView";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

const NotesPage: React.FC = () => {
  const { listMyNotes, myNotes, createdNote, createNote, creating } = useNote();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (createdNote) {
      navigateTo(`${AppRoute.NOTES}/${createdNote.id}`);
    }
  }, [createdNote]);

  useEffect(() => {
    listMyNotes();
  }, []);

  const handleCreateNewNote = () => {
    createNote({ title: "Untitled", content: "" });
  };

  if (myNotes.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50">
        <p className="mb-4 text-lg font-semibold text-gray-700">
          You don't have any notes yet.
        </p>
        <CreateNoteComp />
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-white max-w-6xl mx-auto">
      {/* Header row */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">All notes</h2>
        <PrimaryButton
          text="Create New Note"
          onClick={handleCreateNewNote}
          width="w-48"
          disabled={creating}
        />
      </div>

      {/* Notes grid */}
      <div className="flex flex-wrap gap-6 justify-start">
        {myNotes.map((note: Note) => (
          <div key={note.id} className="shrink-0">
            <NoteView note={note} />
          </div>
        ))}
        <div className="shrink-0">
          <CreateNoteComp />
        </div>
      </div>
    </div>
  );
};

export default NotesPage;
