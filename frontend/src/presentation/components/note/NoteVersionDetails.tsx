import React from "react";
import type { NoteVersion } from "../../../domain/entities/note-version";

type NoteVersionDetailsProps = {
  noteVersion?: NoteVersion | null;
};

const NoteVersionDetails: React.FC<NoteVersionDetailsProps> = ({
  noteVersion,
}) => {
  if (!noteVersion) return null;

  return (
    <div className="p-8 border rounded-lg bg-white shadow-lg max-w-4xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 border-b pb-2 border-gray-200">
        Version {noteVersion.versionNumber} Details
      </h2>

      <div className="grid grid-cols-1 gap-y-4 text-gray-700">
        <div>
          <p>
            <span className="font-semibold text-gray-900">Created By:</span>{" "}
            {noteVersion.createdBy
              ? `${noteVersion.createdBy.fullname} (${noteVersion.createdBy.username})`
              : "Unknown"}
          </p>
          <p>
            <span className="font-semibold text-gray-900">Created At:</span>{" "}
            {new Date(noteVersion.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">Content:</h3>
        <pre className="whitespace-pre-wrap bg-gray-50 p-6 rounded-lg border border-gray-300 text-gray-800 font-mono shadow-sm">
          {noteVersion.content}
        </pre>
      </div>
    </div>
  );
};

export default NoteVersionDetails;
