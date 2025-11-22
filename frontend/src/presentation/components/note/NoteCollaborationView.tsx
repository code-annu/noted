import type React from "react";
import type { Collaboration } from "../../../domain/entities/collaboration";

interface NoteCollaborationViewProps {
  collaboration: Collaboration;
}

const NoteCollaborationView: React.FC<NoteCollaborationViewProps> = ({
  collaboration,
}) => {
  return (
    <div className="bg-white p-3 rounded shadow flex flex-col space-y-1">
      <p className="font-semibold">{collaboration.user.fullname}</p>
      <p className="text-sm text-gray-600">@{collaboration.user.username}</p>
    </div>
  );
};

export default NoteCollaborationView;
