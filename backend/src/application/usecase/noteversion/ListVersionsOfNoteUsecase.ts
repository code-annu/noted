import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { ICollaborationRepository } from "../../../domain/repository/ICollaborationRepository";
import { INoteRepository } from "../../../domain/repository/INoteRepository";
import { INoteVersionRepository } from "../../../domain/repository/INoteVersionRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NoteVersionOutputDTO } from "../../dto/note-version-dto";

export class ListVersionsOfNoteUsecase {
  constructor(
    private readonly noteVersionRepo: INoteVersionRepository,
    private readonly noteRepo: INoteRepository,
    private readonly userRepo: IUserRepository,
    private readonly collaborationRepo: ICollaborationRepository
  ) {}

  async execute(
    noteId: string,
    userId: string
  ): Promise<NoteVersionOutputDTO[]> {
    const user = await this.userRepo.getUserById(userId);
    if (!user) throw new NotFoundError("User not found!");

    const note = await this.noteRepo.getNote(noteId);
    if (!note) throw new NotFoundError("Note not found!");

    const noteCollaborations =
      await this.collaborationRepo.listCollaborationsOfNote(noteId);

    const collaborator = noteCollaborations.find(
      (noteCollaboration) => noteCollaboration.userId === userId
    );

    if (
      note.ownerId !== user.id &&
      collaborator === null &&
      collaborator === undefined
    ) {
      throw new ForbiddenError(
        "You are not authorized view versions for this note."
      );
    }

    const noteVersions = await this.noteVersionRepo.listAllNoteVersions(noteId);
    const noteVersionsOutput: NoteVersionOutputDTO[] = [];

    for (const noteVersion of noteVersions) {
      const createdBy = await this.userRepo.getUserById(noteVersion.createdBy);
      noteVersionsOutput.push({
        noteVersion: noteVersion,
        createdBy: createdBy,
      });
    }

    return noteVersionsOutput;
  }
}
