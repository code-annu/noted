import React, { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import NoteVersionView from "./NoteVersionView";
import type { NoteVersion } from "../../../domain/entities/note-version";
import NoteVersionDetails from "./NoteVersionDetails";

export const NoteVersionsSection: React.FC = () => {
  const noteVersions = useSelector(
    (state: RootState) => state.note.currentEditingNoteVersions
  );

  const [noteVersionDetails, setNoteVersionDetails] =
    useState<NoteVersion | null>(null);

  if (noteVersions.length < 1) {
    return (
      <div className="text-center text-gray-500 py-6">No versions found</div>
    );
  }

  return (
    <div className="flex justify-center items-center my-5 flex-col">
      <section className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Other versions for this note
        </h2>
        <div className="flex flex-wrap gap-6 justify-start">
          {noteVersions.map((version: NoteVersion) => (
            <NoteVersionView
              key={version.versionNumber}
              noteVersion={version}
              onNoteVersionClick={(noteVersion: NoteVersion) => {
                setNoteVersionDetails(noteVersion);
              }}
            />
          ))}
        </div>
      </section>

      <div className="mt-10">
        <NoteVersionDetails noteVersion={noteVersionDetails} />
      </div>
    </div>
  );
};
