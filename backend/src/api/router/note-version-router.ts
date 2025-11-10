import { Router } from "express";
import { NoteVersionRepository } from "../../infrastructure/repository/NoteVersionRepository";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { NoteVersionController } from "../controller/NoteVersionController";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  NoteVersionCreateInputSchema,
  NoteVersionUpdateInputSchema,
} from "../schema/note-version-schema";

export const noteVersionRouter = Router({ mergeParams: true });
const noteVersionController = new NoteVersionController(
  new NoteVersionRepository(),
  new NoteRepository(),
  new UserRepository()
);

noteVersionRouter.post(
  "/",
  validateRequestBody(NoteVersionCreateInputSchema),
  noteVersionController.postNoteVersion.bind(noteVersionController)
);

noteVersionRouter.get(
  "/:noteVersionId",
  noteVersionController.getNoteVersion.bind(noteVersionController)
);

noteVersionRouter.patch(
  "/:noteVersionId",
  validateRequestBody(NoteVersionUpdateInputSchema),
  noteVersionController.patchNoteVersion.bind(noteVersionController)
);
