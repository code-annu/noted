import { Router } from "express";
import { NoteController } from "../controller/NoteController";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import {
  NoteCreateInputSchema,
  NoteUpdateInputSchema,
} from "../schema/note-schema";
import { validateRequestBody } from "../middleware/validate-request-body";
import { NoteVersionRepository } from "../../infrastructure/repository/NoteVersionRepository";
import { NoteVersionController } from "../controller/NoteVersionController";
import { CollaborationController } from "../controller/CollaborationController";
import { CollaborationRepository } from "../../infrastructure/repository/CollaborationRepository";
import { CollaborationCreateInputSchema } from "../schema/collaboration-schema";

export const noteRouter = Router({ mergeParams: true });

const noteController = new NoteController(
  new NoteRepository(),
  new UserRepository(),
  new NoteVersionRepository()
);

const noteVersionController = new NoteVersionController(
  new NoteVersionRepository(),
  new NoteRepository(),
  new UserRepository()
);

const collaborationController = new CollaborationController(
  new UserRepository(),
  new NoteRepository(),
  new CollaborationRepository()
);

noteRouter.post(
  "/",
  validateRequestBody(NoteCreateInputSchema),
  noteController.postNote.bind(noteController)
);

noteRouter.get("/:noteId", noteController.getNote.bind(noteController));

noteRouter.patch(
  "/:noteId",
  validateRequestBody(NoteUpdateInputSchema),
  noteController.patchNote.bind(noteController)
);

noteRouter.delete("/:noteId", noteController.deleteNote.bind(noteController));

noteRouter.get("/", noteController.listMyNotes.bind(noteController));

noteRouter.get(
  "/:noteId/versions",
  noteVersionController.listNoteVersions.bind(noteVersionController)
);

noteRouter.post(
  "/:noteId/invite",
  validateRequestBody(CollaborationCreateInputSchema),
  collaborationController.postInviteCollaboration.bind(collaborationController)
);
