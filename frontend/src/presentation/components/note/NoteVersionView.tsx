import React from "react";
import type { NoteVersion } from "../../../domain/entities/note-version";

type NoteVersionViewProps = {
  noteVersion: NoteVersion;
  onNoteVersionClick?: (noteVersion: NoteVersion) => void;
};

const NoteVersionView: React.FC<NoteVersionViewProps> = ({
  noteVersion,
  onNoteVersionClick,
}) => {
  return (
    <div
      onClick={() => {
        if (onNoteVersionClick != null) onNoteVersionClick(noteVersion);
      }}
      className="border rounded p-4 w-48 h-48 bg-gray-50 shadow-sm cursor-default flex flex-col items-center justify-center space-y-3"
    >
      <div>
        <p className="font-semibold text-gray-800 text-lg">
          Version: {noteVersion.versionNumber}
        </p>
      </div>
      <div className="text-center">
        <p className="text-xs text-gray-500 mt-1">
          Created: {new Date(noteVersion.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NoteVersionView;
