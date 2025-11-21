import React, { useEffect, useState } from "react";
import type { Note } from "../../../domain/entities/note";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import { useNavigate } from "react-router-dom";
import useNote from "../../../application/hook/useNote";
import NoteView from "../../components/note/NoteView";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import { CenteredLoadingMessage } from "../../components/common/messages/CenteredLoadingMessage";
import { AppRoute } from "../../../router";

const NotesPage: React.FC = () => {
  const { listMyNotes, createNote } = useNote();
  const myNotes = useSelector((state: RootState) => state.note.myNotes);
  const [creatingNote, setCreatingNote] = useState(false);
  const navigateTo = useNavigate();

  const handleCreateNewNote = async () => {
    setCreatingNote(true);
    try {
      const createdNote = await createNote({ title: "Untitled", content: "" });
      navigateTo(`${AppRoute.NOTES}/${createdNote.id}`);
    } catch (err) {
      alert(err);
    }
    setCreatingNote(false);
  };

  useEffect(() => {
    listMyNotes();
  }, []);

  if (myNotes === null) {
    return <CenteredLoadingMessage message="Loading you notes...." />;
  }

  if (myNotes.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-gray-50">
        <p className="mb-4 text-lg font-semibold text-gray-700">
          You don't have any notes yet.
        </p>

        <PrimaryButton
          text="Create New Note"
          onClick={handleCreateNewNote}
          width="w-48"
          disabled={creatingNote}
        />
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
          disabled={creatingNote}
        />
      </div>

      {/* Notes grid */}
      <div className="flex flex-wrap gap-6 justify-start">
        {myNotes.map((note: Note) => (
          <div key={note.id} className="shrink-0">
            <NoteView note={note} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
