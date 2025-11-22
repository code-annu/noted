import { useDispatch } from "react-redux";
import { CollaborationRepository } from "../../data/repository/CollaborationRepository";
import type { CollaborationCreate } from "../../domain/entities/collaboration";
import { CreateNoteCollaborationUsecase } from "../usecase/collaboration/CreateNoteCollaborationUsecase";
import { setCurrentEditingNoteCollaborations } from "../../features/note/noteSlice";
import { GetNoteCollaborationsUsecase } from "../usecase/collaboration/GetNoteCollaborationsUsecase";
import { GetMyCollaborationsUsecase } from "../usecase/collaboration/GetMyCollaborationsUsecase";
import { setCollaborations } from "../../features/collaboration/collaborationSlice";

function useNoteCollaboration() {
  const collaborationRepo = new CollaborationRepository();
  const dispatch = useDispatch();

  const sendNoteCollaborationInvitation = async (
    noteId: string,
    collaborationCreate: CollaborationCreate
  ) => {
    const createNoteCollaborationUsecase = new CreateNoteCollaborationUsecase(
      collaborationRepo
    );
    await createNoteCollaborationUsecase.execute(noteId, collaborationCreate);
  };

  const listNoteCollaborations = async (noteId: string) => {
    const listNoteCollaborationsUsecase = new GetNoteCollaborationsUsecase(
      collaborationRepo
    );
    const collaborations = await listNoteCollaborationsUsecase.execute(noteId);

    dispatch(
      setCurrentEditingNoteCollaborations({ collaborations: collaborations })
    );
  };

  const getMyCollaborations = async () => {
    const getMyCollaborationsUsecase = new GetMyCollaborationsUsecase(
      collaborationRepo
    );
    const myCollaborations = await getMyCollaborationsUsecase.execute();
    dispatch(setCollaborations({ collaborations: myCollaborations }));
  };

  return {
    sendNoteCollaborationInvitation,
    listNoteCollaborations,
    getMyCollaborations,
  };
}

export default useNoteCollaboration;
