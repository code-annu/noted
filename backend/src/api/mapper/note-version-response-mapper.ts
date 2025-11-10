import { NoteVersionOutputDTO } from "../../application/dto/note-version-dto";
import { NoteVersionResponse } from "../response/NoteVersionResponse";

export function mapToNoteVersionResponse(
  noteVersionOutput: NoteVersionOutputDTO
): NoteVersionResponse {
  const { id, noteId, versionNumber, content, createdAt, updatedAt } =
    noteVersionOutput.noteVersion;
  const createdBy = noteVersionOutput.createdBy;
  const noteVersionRes: NoteVersionResponse = {
    id: id,
    noteId: noteId,
    versionNumber: versionNumber,
    content: content,
    createdAt: createdAt,
    updatedAt: updatedAt,
    createdBy: createdBy
      ? { username: createdBy.username, fullname: createdBy.fullname }
      : null,
  };

  return noteVersionRes;
}
