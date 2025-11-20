import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TextInput from "../../components/common/inputs/TextInputField";
import type { Note } from "../../../domain/entities/note";
import useNote from "../../../application/hook/useNote";
import { CenteredLoadingMessage } from "../../components/common/messages/CenteredLoadingMessage";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import ErrorMessage from "../../components/common/messages/ErrorMessage";
import { handleError } from "../../../util/error-handler-util";
import { AppRoute } from "../../../router";
import DangerButton from "../../components/common/buttons/DangerButton";
import SecondaryButton from "../../components/common/buttons/SecondaryButton";

export const NoteEditorPage: React.FC = () => {
  const { noteId } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const { getNote, updateNote, deleteNote } = useNote();

  const [isSaved, setIsSaved] = useState(true);
  const [loadingNote, setLoadingNote] = useState(false);
  const [noteData, setNoteData] = useState({ title: "", content: "" });
  const [error, setError] = useState<string | null>(null);
  const [deletingNote, setDeletingNote] = useState(false);
  const [savingAsNewVersion, setSavingAsNewVersion] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const getNoteById = async () => {
      if (noteId) {
        setLoadingNote(true);
        try {
          const result = await getNote(noteId);
          setNote(result);
          setNoteData({ title: result.title, content: result.currentContent });
        } catch (err) {}
        setLoadingNote(false);
      }
    };
    getNoteById();
  }, []);

  const handleNoteDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNoteData((prev) => ({ ...prev, [name]: value }));
    setIsSaved(false);
  };

  const handleSave = async () => {
    if (noteId) {
      setIsSaved(true);
      try {
        const updatedNote = await updateNote(noteId, {
          title: noteData.title,
          content: noteData.content,
        });
        setNote(updatedNote);
        alert("Note is saved");
      } catch (err) {
        handleError(err, setError);
      }
    }
  };

  const handleDeleteNote = async () => {
    try {
      setDeletingNote(true);
      const result = confirm("Do you really want to delete this note?");
      if (result) {
        await deleteNote(noteId!);
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
  };

  if (loadingNote) {
    return (
      <CenteredLoadingMessage message="Hold on preparing your note....." />
    );
  }

  if (!note) {
    return (
      <div className="flex justify-center items-center h-full mt-16">
        <p className="text-2xl text-gray-700">Note not found!</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 rounded-lg shadow-lg bg-linear-to-br from-white to-gray-50 min-h-[500px] flex flex-col">
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
