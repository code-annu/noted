import { NextFunction, Response } from "express";
import { CreateNewNoteUsecase } from "../../application/usecase/note/CreateNewNoteUsecase";
import { DeleteNoteUsecase } from "../../application/usecase/note/DeleteNoteUsecase";
import { GetNoteUsecase } from "../../application/usecase/note/GetNoteUsecase";
import { UpdateNoteUsecase } from "../../application/usecase/note/UpdateNoteUsecase";
import { INoteRepository } from "../../domain/repository/INoteRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import { mapToNoteResponse } from "../mapper/note-mapper";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { ListNotesOfUserUsecase } from "../../application/usecase/note/ListNotesOfUserUsecase";

export class NoteController {
  private readonly createNewNoteUsecase: CreateNewNoteUsecase;
  private readonly getNoteUsecase: GetNoteUsecase;
  private readonly updateNoteUsecase: UpdateNoteUsecase;
  private readonly deleteNoteUsecase: DeleteNoteUsecase;
  private readonly listNotesOfUserUsecase: ListNotesOfUserUsecase;

  constructor(noteRepo: INoteRepository, userRepo: IUserRepository) {
    this.createNewNoteUsecase = new CreateNewNoteUsecase(noteRepo, userRepo);
    this.getNoteUsecase = new GetNoteUsecase(noteRepo, userRepo);
    this.updateNoteUsecase = new UpdateNoteUsecase(noteRepo, userRepo);
    this.deleteNoteUsecase = new DeleteNoteUsecase(noteRepo, userRepo);
    this.listNotesOfUserUsecase = new ListNotesOfUserUsecase(noteRepo, userRepo);
  }

  async postNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { title, content } = req.body;
      const noteOutputDTO = await this.createNewNoteUsecase.execute({
        title: title,
        currentContent: content,
        ownerId: userId!,
      });
      res.status(201).json(mapToNoteResponse(noteOutputDTO));
    } catch (error) {
      next(error);
    }
  }

  async getNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id required");

      const noteOutputDTO = await this.getNoteUsecase.execute(noteId, userId!);
      res.status(200).json(mapToNoteResponse(noteOutputDTO));
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
      const noteOutputDTO = await this.updateNoteUsecase.execute(
        noteId,
        { title: title, currentContent: content },
        userId!
      );
      res.status(200).json(mapToNoteResponse(noteOutputDTO));
    } catch (error) {
      next(error);
    }
  }

  async deleteNote(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id required");

      const noteOutputDTO = await this.deleteNoteUsecase.execute(
        noteId,
        userId!
      );
      res.status(200).json(mapToNoteResponse(noteOutputDTO));
    } catch (error) {
      next(error);
    }
  }

  async listMyNotes(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const notes = await this.listNotesOfUserUsecase.execute(userId!);
      res.status(200).json(notes);
    } catch (error) {
      next(error);
    }
  }
}
