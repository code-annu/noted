import { NextFunction, Response } from "express";
import { AcceptCollaborationInvitationUsecase } from "../../application/usecase/collaboration/AcceptCollaborationInvitationUsecase";
import { InviteCollaboratorUsecase } from "../../application/usecase/collaboration/InviteCollaboratorUsecase";
import { ICollaborationRepository } from "../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../domain/repository/INoteRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { CollaborationCreateInputDTO } from "../../application/dto/collaboration-dto";
import { mapToCollaborationResponse } from "../mapper/collaboration-response-mapper";
import { ListMyCollaborationsUsecase } from "../../application/usecase/collaboration/ListMyCollaborationsUsecase";
import { ListNoteCollaborationsUsecase } from "../../application/usecase/collaboration/ListNoteCollaborationsUsecase";
import { RejectCollaborationInvitationUsecase } from "../../application/usecase/collaboration/RejectCollaborationInvitationUsecase";

export class CollaborationController {
  private readonly inviteCollaboratorUsecase: InviteCollaboratorUsecase;
  private readonly acceptCollaborationInvitation: AcceptCollaborationInvitationUsecase;
  private readonly listMyCollaborations: ListMyCollaborationsUsecase;
  private readonly listNoteCollaborations: ListNoteCollaborationsUsecase;
  private readonly rejectCollaborationInvitaion: RejectCollaborationInvitationUsecase;

  constructor(
    userRepo: IUserRepository,
    noteRepo: INoteRepository,
    collaborationRepo: ICollaborationRepository
  ) {
    this.inviteCollaboratorUsecase = new InviteCollaboratorUsecase(
      userRepo,
      noteRepo,
      collaborationRepo
    );

    this.acceptCollaborationInvitation =
      new AcceptCollaborationInvitationUsecase(
        userRepo,
        noteRepo,
        collaborationRepo
      );

    this.listMyCollaborations = new ListMyCollaborationsUsecase(
      userRepo,
      noteRepo,
      collaborationRepo
    );

    this.listNoteCollaborations = new ListNoteCollaborationsUsecase(
      userRepo,
      noteRepo,
      collaborationRepo
    );

    this.rejectCollaborationInvitaion =
      new RejectCollaborationInvitationUsecase(userRepo, collaborationRepo);
  }

  async getCollaborations(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.auth?.userId;
      const collaborationOutputs = await this.listMyCollaborations.execute(
        userId!
      );

      res
        .status(200)
        .json(
          collaborationOutputs.map((collaborationOutput) =>
            mapToCollaborationResponse(collaborationOutput)
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async postInviteCollaboration(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) throw new BadRequestError("Note id is required!");

      const data: CollaborationCreateInputDTO = req.body;

      const collaborationOutput = await this.inviteCollaboratorUsecase.execute(
        noteId,
        userId!,
        data
      );

      res.status(201).json(mapToCollaborationResponse(collaborationOutput));
    } catch (error) {
      next(error);
    }
  }

  async patchAcceptCollaboration(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { collaborationId } = req.params;
      if (!collaborationId) {
        throw new BadRequestError("Collaboration id is required");
      }
      const collaborationOutput =
        await this.acceptCollaborationInvitation.execute(
          userId!,
          collaborationId
        );

      res.status(200).json(mapToCollaborationResponse(collaborationOutput));
    } catch (error) {
      next(error);
    }
  }

  async getNoteCollaborations(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { noteId } = req.params;
      if (!noteId) {
        throw new BadRequestError("Note id is required in path parameter");
      }
      const collaborationOutputs = await this.listNoteCollaborations.execute(
        noteId,
        userId!
      );

      res
        .status(200)
        .json(
          collaborationOutputs.map((collaborationOutput) =>
            mapToCollaborationResponse(collaborationOutput)
          )
        );
    } catch (error) {
      next(error);
    }
  }

  async patchRejectCollaborationInvitation(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userId = req.auth?.userId;
      const { collaborationId } = req.params;
      if (!collaborationId) {
        throw new BadRequestError(
          "Collaboration id required in path parameter"
        );
      }

      await this.rejectCollaborationInvitaion.execute(collaborationId, userId!);

      res.status(200).json({ message: "Collaboration is rejected." });
    } catch (error) {
      next(error);
    }
  }
}
