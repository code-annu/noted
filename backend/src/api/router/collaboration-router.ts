import { Router } from "express";
import { CollaborationController } from "../controller/CollaborationController";
import { CollaborationRepository } from "../../infrastructure/repository/CollaborationRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";

export const collaborationRouter = Router();
const collaborationController = new CollaborationController(
  new UserRepository(),
  new NoteRepository(),
  new CollaborationRepository()
);

collaborationRouter.patch(
  "/:collaborationId/accept",
  collaborationController.patchAcceptCollaboration.bind(collaborationController)
);
