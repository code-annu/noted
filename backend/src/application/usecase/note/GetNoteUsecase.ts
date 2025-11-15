import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteOutputDTO } from "../../dto/note-dto";

export class GetNoteUsecase {
  constructor(
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(noteId: string, userId: string): Promise<NoteOutputDTO> {
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
      throw new ForbiddenError("You are not authorized to view this note.");
    }

    const owner = await this.userRepo.getUserById(note.ownerId);

    return { note: note, owner: owner };
  }
}
