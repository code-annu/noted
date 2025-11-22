import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";
import type { Collaboration } from "../../../domain/entities/collaboration";
import CollaborationView from "../../components/collaboration/CollaborationView";
import useCollaboration from "../../../application/hook/useCollaboration";
import { CenteredLoadingMessage } from "../../components/common/messages/CenteredLoadingMessage";
import { useNavigate } from "react-router-dom";
import { AppRoute } from "../../../router";

export const CollaborationsPage: React.FC = () => {
  const collaborations = useSelector(
    (state: RootState) => state.collaboration.collaborations
  );
  const { getMyCollaborations } = useCollaboration();

  const [loadingCollaborations, setLoadingCollaborations] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const listCollaborations = async () => {
      setLoadingCollaborations(true);
      try {
        await getMyCollaborations();
      } catch (err) {}
      setLoadingCollaborations(false);
    };

    listCollaborations();
  }, []);

  if (loadingCollaborations) {
    return <CenteredLoadingMessage message="Loading collaborations...." />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">My Collaborations</h1>
      {collaborations.length === 0 ? (
        <p className="text-gray-600">No collaborations found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {collaborations.map((collab: Collaboration) => (
            <div
              key={collab.id}
              className="shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <CollaborationView
                collaboration={collab}
                onClick={() => {
                  navigateTo(`${AppRoute.NOTES}/${collab.note.id}`);
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
