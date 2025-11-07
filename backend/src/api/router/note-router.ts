import { Router } from "express";
import { NoteController } from "../controller/NoteController";
import { NoteRepository } from "../../infrastructure/repository/NoteRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import {
  NoteCreateInputSchema,
  NoteUpdateInputSchema,
} from "../schema/note-schema";
import { validateRequestBody } from "../middleware/validate-request-body";

export const noteRouter = Router({ mergeParams: true });
const noteController = new NoteController(
  new NoteRepository(),
  new UserRepository()
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
