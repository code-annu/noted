import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import NoteCollaborationView from "./NoteCollaborationView";
import PrimaryButton from "../common/buttons/PrimaryButton";
import useNoteCollaboration from "../../../application/hook/useNoteCollaboration";
import { handleError } from "../../../util/error-handler-util";
import ErrorMessage from "../common/messages/ErrorMessage";
import TextInput from "../common/inputs/TextInputField";

export enum CollaborationRole {
  VIEWER = "viewer",
  EDITOR = "editor",
}

export const NoteCollaborationsSection: React.FC = () => {
  const noteCollaborations = useSelector(
    (state: RootState) => state.note.currentEditingNoteCollaborations
  );
  const currentEditingNote = useSelector(
    (state: RootState) => state.note.currentEditingNote
  );

  const [collabUsername, setCollabUsername] = useState("");
  const [collabRole, setCollabRole] = useState<CollaborationRole>(
    CollaborationRole.VIEWER
  );
  const [sendingInvitation, setSendingInvitation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { sendNoteCollaborationInvitation } = useNoteCollaboration();

  const handleCreateCollaboration = async () => {
    setError(null);
    setSendingInvitation(true);
    try {
      if (currentEditingNote) {
        await sendNoteCollaborationInvitation(currentEditingNote.id, {
          username: collabUsername.trim(),
          role: collabRole,
        });
        alert("Invitation sent successfully");
      }
    } catch (err) {
      handleError(err, setError);
    }
    setSendingInvitation(false);
  };

  return (
    <aside className="w-80 bg-gray-100 rounded p-4 flex flex-col">
      <h2 className="text-xl font-semibold mb-4">Collaborations</h2>
      <div className="flex flex-col space-y-3 overflow-y-auto">
        {noteCollaborations.length === 0 ? (
          <p className="text-gray-600">No collaborations yet for this note.</p>
        ) : (
          noteCollaborations.map((collab) => (
            <NoteCollaborationView key={collab.id} collaboration={collab} />
          ))
        )}
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Add Collaboration</h3>
        <TextInput
          label="Username"
          placeholder="e.g. random_guy"
          value={collabUsername}
          onChange={(e) => {
            setError(null);
            setCollabUsername(e.target.value);
          }}
          name="username"
          id="username"
        />
        <fieldset className="mb-2 mt-5">
          <legend className="text-sm font-medium mb-1">Role</legend>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="collabRole"
                value={CollaborationRole.VIEWER}
                checked={collabRole === CollaborationRole.VIEWER}
                onChange={() => setCollabRole(CollaborationRole.VIEWER)}
                className="mr-1"
              />
              Viewer
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="collabRole"
                value={CollaborationRole.EDITOR}
                checked={collabRole === CollaborationRole.EDITOR}
                onChange={() => setCollabRole(CollaborationRole.EDITOR)}
                className="mr-1"
              />
              Editor
            </label>
          </div>
        </fieldset>
        <ErrorMessage message={error} />
        <div className="my-5"></div>
        <PrimaryButton
          text="Add"
          onClick={handleCreateCollaboration}
          width="w-full"
          height="py-2"
          disabled={sendingInvitation}
        />
      </div>
    </aside>
  );
};
