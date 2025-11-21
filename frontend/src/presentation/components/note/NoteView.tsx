import React from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import type { Note } from "../../../domain/entities/note";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

type NoteViewProps = {
  note: Note;
};

const NoteView: React.FC<NoteViewProps> = ({ note }) => {
  const navigateTo = useNavigate();
  const navigateToEditNote = () => {
    navigateTo(`${AppRoute.NOTES}/${note.id}`);
  };

  return (
    <div
      className="border rounded p-4 w-48 h-48 bg-gray-50 shadow-sm cursor-pointer flex flex-col items-center justify-center space-y-3"
      onClick={navigateToEditNote}
    >
      <div>
        {note.isPublic ? (
          <AiFillUnlock className="text-green-600 text-3xl" title="Public" />
        ) : (
          <AiFillLock className="text-red-600 text-3xl" title="Private" />
        )}
      </div>
      <div className="text-center">
        <p className="font-semibold text-gray-800 text-lg">{note.title}</p>
        <p className="text-xs text-gray-500 mt-1">
          Created: {new Date(note.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default NoteView;
