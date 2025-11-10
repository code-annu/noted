import { Response, NextFunction } from "express";
import { CreateNewNoteVersionUsecase } from "../../application/usecase/noteversion/CreateNewNoteVersionUsecase";
import { UpdateNoteVersionUsecase } from "../../application/usecase/noteversion/UpdateNoteVersionUsecase";
import { GetNoteVersionUsecase } from "../../application/usecase/noteversion/GetNoteVersionUsecase";
import { INoteVersionRepository } from "../../domain/repository/INoteVersionRepository";
import { INoteRepository } from "../../domain/repository/INoteRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import {
  NoteVersionCreateInputDTO,
  NoteVersionUpdateInputDTO,
} from "../../application/dto/note-version-dto";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { mapToNoteVersionResponse } from "../mapper/note-version-response-mapper";
import { ListVersionsOfNoteUsecase } from "../../application/usecase/noteversion/ListVersionsOfNoteUsecase";

export class NoteVersionController {
  private readonly createNoteVersionUsecase: CreateNewNoteVersionUsecase;
  private readonly updateNoteVersionUsecase: UpdateNoteVersionUsecase;
  private readonly getNoteVersionUsecase: GetNoteVersionUsecase;
  private readonly listVersionsOfNoteUsecase: ListVersionsOfNoteUsecase;

  constructor(
    noteVersionRepo: INoteVersionRepository,
    noteRepo: INoteRepository,
    userRepo: IUserRepository
  ) {
    this.createNoteVersionUsecase = new CreateNewNoteVersionUsecase(
      noteVersionRepo,
      noteRepo,
      userRepo
    );
    this.updateNoteVersionUsecase = new UpdateNoteVersionUsecase(
      noteVersionRepo,
      userRepo
    );
    this.getNoteVersionUsecase = new GetNoteVersionUsecase(
      noteVersionRepo,
      userRepo
    );

    this.listVersionsOfNoteUsecase = new ListVersionsOfNoteUsecase(
      noteVersionRepo,
      noteRepo,
      userRepo
    );
  }

  async postNoteVersion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const data: NoteVersionCreateInputDTO = req.body;
      const noteVersionOutput = await this.createNoteVersionUsecase.execute(
        userId!,
        data
      );
      res.status(201).json(mapToNoteVersionResponse(noteVersionOutput));
    } catch (error) {
      next(error);
    }
  }

  async getNoteVersion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteVersionId } = req.params;
      if (!noteVersionId) {
        throw new BadRequestError("Note version id is required");
      }
      const noteVersionOutput = await this.getNoteVersionUsecase.execute(
        noteVersionId,
        userId!
      );
      res.status(200).json(mapToNoteVersionResponse(noteVersionOutput));
    } catch (error) {
      next(error);
    }
  }

  async patchNoteVersion(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const data: NoteVersionUpdateInputDTO = req.body;
      const { noteVersionId } = req.params;
      if (!noteVersionId) {
        throw new BadRequestError("Note version id is required");
      }

      const noteVersionOutput = await this.updateNoteVersionUsecase.execute(
        noteVersionId,
        data,
        userId!
      );
      res.status(200).json(mapToNoteVersionResponse(noteVersionOutput));
    } catch (error) {
      next(error);
    }
  }

  async listNoteVersions(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id required");

      const noteVersionsOutput = await this.listVersionsOfNoteUsecase.execute(
        noteId,
        userId!
      );
      res
        .status(200)
        .json(
          noteVersionsOutput.map((noteVersionOutput) =>
            mapToNoteVersionResponse(noteVersionOutput)
          )
        );
    } catch (error) {
      next(error);
    }
  }
}
