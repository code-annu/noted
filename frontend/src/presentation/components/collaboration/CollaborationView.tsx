import { useState } from "react";
import type { Collaboration } from "../../../domain/entities/collaboration";
import DangerButton from "../common/buttons/DangerButton";
import SecondaryButton from "../common/buttons/SecondaryButton";
import useCollaboration from "../../../application/hook/useCollaboration";

interface CollaborationCardProps {
  collaboration: Collaboration;
  onClick?: () => void; 
}

const CollaborationView: React.FC<CollaborationCardProps> = ({
  collaboration,
  onClick,
}) => {
  const { acceptCollaboration, rejectCollaboration } = useCollaboration();
  const [reacting, setReacting] = useState(false);
  const isAccepted = collaboration.acceptedAt !== null;

  const handleAccept = () => {
    const accept = async () => {
      try {
        setReacting(true);
        await acceptCollaboration(collaboration.id);
      } catch (err) {
        alert(err);
      }
      setReacting(false);
    };
    accept();
  };

  const handleReject = () => {
    const reject = async () => {
      try {
        setReacting(true);
        await rejectCollaboration(collaboration.id);
      } catch (err) {
        alert(err);
      }
      setReacting(false);
    };
    reject();
  };

  // Updated click handler
  const handleClick = () => {
    if (isAccepted && onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`bg-white shadow rounded p-4 flex flex-col space-y-2 hover:shadow-md transition-shadow duration-200 ${
        isAccepted ? "cursor-pointer" : ""
      }`}
      role={isAccepted ? "button" : undefined}
      tabIndex={isAccepted ? 0 : undefined}
      onKeyDown={(e) => {
        if (isAccepted && (e.key === "Enter" || e.key === " ")) {
          handleClick();
        }
      }}
    >
      <h2 className="text-lg font-semibold">{collaboration.note.title}</h2>
      <p>
        Role: <span className="font-medium">{collaboration.role}</span>
      </p>
      <p>
        Invited By:{" "}
        <span className="font-medium">
          {collaboration.invitedBy.fullname} ({collaboration.invitedBy.username}
          )
        </span>
      </p>
      <p>
        Collaborator:{" "}
        <span className="font-medium">
          {collaboration.user.fullname} ({collaboration.user.username})
        </span>
      </p>
      <p>
        Invited At:{" "}
        <span className="font-mono text-sm text-gray-500">
          {new Date(collaboration.invitedAt).toLocaleDateString()}
        </span>
      </p>
      {isAccepted ? (
        <p>
          Accepted At:{" "}
          <span className="font-mono text-sm text-gray-500">
            {new Date(collaboration.acceptedAt!).toLocaleDateString()}
          </span>
        </p>
      ) : (
        <div className="flex space-x-3 pt-2">
          <SecondaryButton
            text="Accept"
            onClick={handleAccept}
            disabled={reacting}
          />
          <DangerButton
            text="Reject"
            onClick={handleReject}
            disabled={reacting}
          />
        </div>
      )}
    </div>
  );
};

export default CollaborationView;
