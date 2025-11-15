import { CollaborationRole } from "../../../domain/entities/collaboration";
import { DatabaseError } from "../../../domain/error/DatabaseError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteOutputDTO, NoteUpdateInputDTO } from "../../dto/note-dto";

export class UpdateNoteUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(
    noteId: string,
    updates: NoteUpdateInputDTO,
    userId: string
  ): Promise<NoteOutputDTO> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    const collaborations =
      await this.collaborationRepo.listCollaborationsOfNote(noteId);

    const filteredCollaborations = collaborations.filter(
      (collaboration) => collaboration.userId === userId
    );

    if (note.ownerId !== userId && filteredCollaborations.length < 1) {
      throw new ForbiddenError("You are not authorized to update this note.");
    }

    if (
      filteredCollaborations.length > 0 &&
      filteredCollaborations[0]!.role !== CollaborationRole.EDITOR
    ) {
      throw new ForbiddenError(
        "You cannot update this note with role as 'viewer'"
      );
    }

    const updatedNote = await this.noteRepo.updateNote(noteId, updates);
    if (!updatedNote) {
      throw new DatabaseError("Unable to update note");
    }

    const owner = await this.userRepo.getUserById(note.ownerId);

    return { note: updatedNote, owner: owner };
  }
}
