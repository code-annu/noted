import { useNavigate, useParams } from "react-router-dom";
import useNote from "../../../application/hooks/use-note";
import { useEffect, useState } from "react";
import PrimaryButton from "../../components/common/buttons/PrimaryButton";
import SecondaryButton from "../../components/common/buttons/SecondaryButton";
import DangerButton from "../../components/common/buttons/DangerButton";
import TextInput from "../../components/common/inputs/TextInputField";
import ErrorMessage from "../../components/common/messages/ErrorMessage";
import { AppRoute } from "../../../router";
import useNoteVersion from "../../../application/hooks/use-note-version";
import NoteVersionView from "../../components/notes/NoteVersionView";
import type { NoteVersion } from "../../../domain/entities/note-version";
import NoteVersionDetails from "./NoteVersionDetails";

function EditNotePage() {
  const { noteId } = useParams();

  const { note, error, getNote, updateNote, deleteNote, updating, deleting } =
    useNote();
  const {
    createNoteVersion,
    creatingNoteVersion,
    listNoteVersions,
    noteVersions,
  } = useNoteVersion();

  const [title, setTitle] = useState("");
  const [currentContent, setCurrentContent] = useState("");
  const [noteVersionDetails, setNoteVersionDetails] =
    useState<NoteVersion | null>(null);

  const navigateTo = useNavigate();

  useEffect(() => {
    if (noteId) {
      getNote(noteId);
      listNoteVersions(noteId);
    }
  }, [noteId]);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setCurrentContent(note.currentContent);
    }
  }, [note]);

  if (note == null) {
    return <h1>Fetching note....</h1>;
  }

  const handleSave = () => {
    updateNote(noteId!, { title: title, content: currentContent }).then(() => {
      alert("Note updated");
    });
  };

  const handleSaveNewVersion = () => {
    updateNote(noteId!, { title: title, content: currentContent });
    createNoteVersion({
      noteId: noteId!,
      content: currentContent,
    }).then(() => {
      alert("Note is saved as new version.");
      listNoteVersions(noteId!); // Refresh versions after creating new one
    });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      deleteNote(noteId!)
        .then(() => {
          navigateTo(`${AppRoute.NOTES}`);
        })
        .catch(() => {
          alert("Error deleting note");
        });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Edit your note</h1>
        <div className="flex space-x-4">
          <PrimaryButton
            text="Save"
            onClick={handleSave}
            width="w-24"
            height="py-2"
            disabled={updating}
          />
          <SecondaryButton
            text="Save as New Version"
            onClick={handleSaveNewVersion}
            width="w-48"
            height="py-2"
            disabled={creatingNoteVersion}
          />
          <DangerButton
            text="Delete"
            onClick={handleDelete}
            width="w-24"
            height="py-2"
            disabled={deleting}
          />
        </div>
      </div>
      <div className="space-y-6">
        <TextInput
          label="Title"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title"
          required
        />
        <TextInput
          label="Content"
          id="currentContent"
          name="currentContent"
          value={currentContent}
          onChange={(e) => setCurrentContent(e.target.value)}
          placeholder="Enter note content"
          isTextarea
          rows={15}
          required
        />
        <ErrorMessage message={error} />
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Other versions for this note
        </h2>
        {noteVersions.length === 0 ? (
          <p className="text-gray-600">There are no versions for this note.</p>
        ) : (
          <div className="flex flex-wrap gap-6 justify-start">
            {noteVersions.map((version: NoteVersion) => (
              <NoteVersionView
                key={version.versionNumber}
                noteVersion={version}
                onNoteVersionClick={setNoteVersionDetails}
              />
            ))}
          </div>
        )}
      </div>

      <div className="mt-10">
        <NoteVersionDetails noteVersion={noteVersionDetails} />
      </div>
    </div>
  );
}

export default EditNotePage;
