import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNote from "../../../application/hook/useNote";
import { CenteredLoadingMessage } from "../../components/common/messages/CenteredLoadingMessage";
import { NoteEditorSection } from "../../components/note/NoteEditorSection";
import { NoteVersionsSection } from "../../components/note/NoteVersionsSection";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import useNoteVersion from "../../../application/hook/useNoteVersion";
import { NoteCollaborationsSection } from "../../components/note/NoteCollaborationsSection";
import useNoteCollaboration from "../../../application/hook/useNoteCollaboration";

export const NoteEditorPage: React.FC = () => {
  const { noteId } = useParams();
  const [preparingNote, setPreparingNote] = useState(false);
  const currentEditingNote = useSelector(
    (state: RootState) => state.note.currentEditingNote
  );

  const { getNote } = useNote();
  const { listNoteVersions } = useNoteVersion();
  const { listNoteCollaborations } = useNoteCollaboration();

  useEffect(() => {
    const prepareNote = async () => {
      setPreparingNote(true);
      try {
        await getNote(noteId!);
        await listNoteVersions(noteId!);
        await listNoteCollaborations(noteId!);
      } catch (err) {}
      setPreparingNote(false);
    };
    prepareNote();
  }, []);

  if (preparingNote) {
    return (
      <CenteredLoadingMessage message="Hold on preparing your note....." />
    );
  }

  if (!currentEditingNote) {
    return (
      <div className="flex justify-center items-center h-full mt-16">
        <p className="text-2xl text-gray-700">Note not found!</p>
      </div>
    );
  }

  return (
    <div className="flex my-10 mx-5">
      <div className="flex-1">
        <NoteEditorSection />
        <NoteVersionsSection />
      </div>
      <div className="w-1/4 ml-4">
        <NoteCollaborationsSection />
      </div>
    </div>
  );
};
