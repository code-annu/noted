import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import TextInput from "../common/inputs/TextInputField";
import ErrorMessage from "../common/messages/ErrorMessage";
import PrimaryButton from "../common/buttons/PrimaryButton";
import SecondaryButton from "../common/buttons/SecondaryButton";
import DangerButton from "../common/buttons/DangerButton";
import useNote from "../../../application/hook/useNote";
import { handleError } from "../../../util/error-handler-util";
import { AppRoute } from "../../../router";
import useNoteVersion from "../../../application/hook/useNoteVersion";

export const NoteEditorSection: React.FC = () => {
  const currentEditingNote = useSelector(
    (state: RootState) => state.note.currentEditingNote
  );
  const { updateNote, deleteNote } = useNote();
  const { createNoteVersion } = useNoteVersion();

  if (!currentEditingNote) return <div></div>;

  const [isSaved, setIsSaved] = useState(true);
  const [noteData, setNoteData] = useState({
    title: currentEditingNote.title,
    content: currentEditingNote.currentContent,
  });
  const [error, setError] = useState<string | null>(null);
  const [deletingNote, setDeletingNote] = useState(false);
  const [savingAsNewVersion, setSavingAsNewVersion] = useState(false);
  const navigateTo = useNavigate();

  const handleNoteDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    setIsSaved(true);
    try {
      await updateNote(currentEditingNote.id, {
        title: noteData.title,
        content: noteData.content,
      });
      alert("Note is saved");
    } catch (err) {
      handleError(err, setError);
    }
  };

  const handleDeleteNote = async () => {
    try {
      setDeletingNote(true);
      const result = confirm("Do you really want to delete this note?");
      if (result) {
        await deleteNote(currentEditingNote.id);
        alert("Note is deleted successfully");
        navigateTo(`${AppRoute.NOTES}`);
      }
    } catch (err) {
      handleError(err, setError);
    }
    setDeletingNote(false);
  };

  const handleSaveAsNewVersion = async () => {
    setSavingAsNewVersion(true);
    setIsSaved(true);
    try {
      await updateNote(currentEditingNote.id, {
        title: noteData.title,
        content: noteData.content,
      });
      await createNoteVersion({
        noteId: currentEditingNote.id,
        content: noteData.content,
      });
      alert("A version is saved for this note");
    } catch (err) {}
    setSavingAsNewVersion(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg bg-linear-to-br from-white to-gray-50 min-h-[500px] flex flex-col">
      <h1 className="text-4xl font-bold mb-8 text-gray-900 tracking-wide">
        Edit Your Note
      </h1>
      <div className="flex flex-col space-y-8 grow">
        <TextInput
          label="Title"
          id="note-title"
          name="title"
          value={noteData.title}
          onChange={handleNoteDataChange}
          placeholder="Enter note title"
          required
        />
        <div className="flex flex-col">
          <TextInput
            label="Content"
            id="note-content"
            name="content"
            value={noteData.content}
            onChange={handleNoteDataChange}
            placeholder="Enter note content"
            isTextarea
            rows={15}
            required
          />
          <p className="text-sm text-gray-400 mt-1 text-right select-none">
            {noteData.content.length} characters
          </p>
        </div>
        <ErrorMessage message={error} />
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            <PrimaryButton
              onClick={handleSave}
              text={isSaved ? "Saved" : "Save"}
              disabled={isSaved}
              width="w-30"
            />
            <SecondaryButton
              text="Save as new Version"
              width="w-50"
              disabled={savingAsNewVersion}
              onClick={handleSaveAsNewVersion}
            />
            <DangerButton
              text="Delete"
              width="w-30"
              disabled={deletingNote}
              onClick={handleDeleteNote}
            />
          </div>

          {!isSaved && (
            <p className="text-sm text-yellow-600 font-medium select-none">
              Unsaved changes
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
