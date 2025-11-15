import { NextFunction, Response } from "express";
import { CreateNewNoteUsecase } from "../../application/usecase/note/CreateNewNoteUsecase";
import { DeleteNoteUsecase } from "../../application/usecase/note/DeleteNoteUsecase";
import { GetNoteUsecase } from "../../application/usecase/note/GetNoteUsecase";
import { UpdateNoteUsecase } from "../../application/usecase/note/UpdateNoteUsecase";
import { INoteRepository } from "../../domain/repository/INoteRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { ListNotesOfUserUsecase } from "../../application/usecase/note/ListNotesOfUserUsecase";
import { INoteVersionRepository } from "../../domain/repository/INoteVersionRepository";
import { mapToNoteResponse } from "../mapper/note-response-mapper";
import { ICollaborationRepository } from "../../domain/repository/ICollaborationRepository";

export class NoteController {
  private readonly createNewNoteUsecase: CreateNewNoteUsecase;
  private readonly getNoteUsecase: GetNoteUsecase;
  private readonly updateNoteUsecase: UpdateNoteUsecase;
  private readonly deleteNoteUsecase: DeleteNoteUsecase;
  private readonly listNotesOfUserUsecase: ListNotesOfUserUsecase;

  constructor(
    noteRepo: INoteRepository,
    userRepo: IUserRepository,
    noteVersionRepo: INoteVersionRepository,
    collaborationRepo: ICollaborationRepository
  ) {
    this.createNewNoteUsecase = new CreateNewNoteUsecase(noteRepo, userRepo);
    this.getNoteUsecase = new GetNoteUsecase(
      noteRepo,
      userRepo,
      collaborationRepo
    );
    this.updateNoteUsecase = new UpdateNoteUsecase(
      noteRepo,
      userRepo,
      collaborationRepo
    );
    this.deleteNoteUsecase = new DeleteNoteUsecase(
      noteRepo,
      userRepo,
      noteVersionRepo
    );
    this.listNotesOfUserUsecase = new ListNotesOfUserUsecase(
      noteRepo,
      userRepo
    );
  }

  async postNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { title, content } = req.body;
      const noteOutput = await this.createNewNoteUsecase.execute({
        title: title,
        currentContent: content,
        ownerId: userId!,
      });
      res.status(201).json(mapToNoteResponse(noteOutput));
    } catch (error) {
      next(error);
    }
  }

  async getNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id required");

      const noteOutput = await this.getNoteUsecase.execute(noteId, userId!);
      res.status(200).json(mapToNoteResponse(noteOutput));
    } catch (error) {
      next(error);
    }
  }

  async patchNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id required");

      const { title, content } = req.body;
      const noteOutput = await this.updateNoteUsecase.execute(
        noteId,
        { title: title, currentContent: content },
        userId!
      );
      res.status(200).json(mapToNoteResponse(noteOutput));
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id required");

      const noteOutput = await this.deleteNoteUsecase.execute(noteId, userId!);
      res.status(200).json(mapToNoteResponse(noteOutput));
    } catch (error) {
      next(error);
    }
  }

  async listMyNotes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const notesOutput = await this.listNotesOfUserUsecase.execute(userId!);
      res
        .status(200)
        .json(notesOutput.map((noteOutput) => mapToNoteResponse(noteOutput)));
    } catch (error) {
      next(error);
    }
  }
}
