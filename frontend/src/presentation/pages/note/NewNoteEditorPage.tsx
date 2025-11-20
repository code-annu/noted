import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useNote from "../../../application/hook/useNote";
import { CenteredLoadingMessage } from "../../components/common/messages/CenteredLoadingMessage";
import { NoteEditorSection } from "../../components/note/NoteEditorSection";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export const NewNoteEditorPage: React.FC = () => {
  const { noteId } = useParams();
  const { getNote } = useNote();
  const [preparingNote, setPreparingNote] = useState(false);
  const currentEditingNote = useSelector(
    (state: RootState) => state.note.currentEditingNote
  );

  useEffect(() => {
    const prepareNote = async () => {
      setPreparingNote(true);
      try {
        await getNote(noteId!);
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
    <div>
      <NoteEditorSection />
    </div>
  );
};
