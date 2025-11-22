import { useDispatch } from "react-redux";
import { setCollaborations } from "../../features/collaboration/collaborationSlice";
import { GetMyCollaborationsUsecase } from "../usecase/collaboration/GetMyCollaborationsUsecase";
import { CollaborationRepository } from "../../data/repository/CollaborationRepository";
import { AcceptCollaborationUsecase } from "../usecase/collaboration/AcceptCollaborationUsecase";
import { RejectCollaborationUsecase } from "../usecase/collaboration/RejectCollaborationUsecase";

function useCollaboration() {
  const collaborationRepo = new CollaborationRepository();
  const dispatch = useDispatch();

  const getMyCollaborations = async () => {
    const getMyCollaborationsUsecase = new GetMyCollaborationsUsecase(
      collaborationRepo
    );
    const myCollaborations = await getMyCollaborationsUsecase.execute();
    dispatch(setCollaborations({ collaborations: myCollaborations }));
  };

  const acceptCollaboration = async (collaborationId: string) => {
    const acceptCollaborationUsecase = new AcceptCollaborationUsecase(
      collaborationRepo
    );
    await acceptCollaborationUsecase.execute(collaborationId);

    const getMyCollaborationsUsecase = new GetMyCollaborationsUsecase(
      collaborationRepo
    );
    const myCollaborations = await getMyCollaborationsUsecase.execute();

    dispatch(setCollaborations({ collaborations: myCollaborations }));
  };

  const rejectCollaboration = async (collaborationId: string) => {
    const rejectCollaborationUsecase = new RejectCollaborationUsecase(
      collaborationRepo
    );
    await rejectCollaborationUsecase.execute(collaborationId);

    const getMyCollaborationsUsecase = new GetMyCollaborationsUsecase(
      collaborationRepo
    );
    const myCollaborations = await getMyCollaborationsUsecase.execute();

    dispatch(setCollaborations({ collaborations: myCollaborations }));
  };

  return { getMyCollaborations, acceptCollaboration, rejectCollaboration };
}

export default useCollaboration;
