import React from "react";
import type { NoteVersion } from "../../../domain/entities/note-version";

type NoteVersionDetailsProps = {
  noteVersion?: NoteVersion | null;
};

const NoteVersionDetails: React.FC<NoteVersionDetailsProps> = ({
  noteVersion,
}) => {
  if (noteVersion == null) return;

  return (
    <div className="p-6 border rounded bg-white shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">
        Version {noteVersion.versionNumber} Details
      </h2>
      <p className="mb-2">
        <strong>Version ID:</strong> {noteVersion.id}
      </p>
      <p className="mb-2">
        <strong>Note ID:</strong> {noteVersion.noteId}
      </p>
      <p className="mb-2">
        <strong>Created By:</strong> {noteVersion.createdBy}
      </p>
      <p className="mb-2">
        <strong>Created At:</strong>{" "}
        {new Date(noteVersion.createdAt).toLocaleString()}
      </p>
      <p className="mb-2">
        <strong>Updated At:</strong>{" "}
        {new Date(noteVersion.updatedAt).toLocaleString()}
      </p>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Content:</h3>
        <div className="whitespace-pre-wrap bg-gray-100 p-4 rounded border border-gray-300 text-gray-800">
          {noteVersion.content}
        </div>
      </div>
    </div>
  );
};

export default NoteVersionDetails;
