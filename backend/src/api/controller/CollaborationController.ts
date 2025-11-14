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

export class CollaborationController {
  private readonly inviteCollaboratorUsecase: InviteCollaboratorUsecase;
  private readonly acceptCollaborationInvitation: AcceptCollaborationInvitationUsecase;

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
}
