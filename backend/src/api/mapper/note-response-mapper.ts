import { NoteOutputDTO } from "../../application/dto/note-dto";
import { NoteResponse } from "../response/NoteResponse";

export function mapToNoteResponse(noteOutput: NoteOutputDTO): NoteResponse {
  const { id, title, currentContent, isPublic, createdAt, updatedAt } =
    noteOutput.note;

  const noteOwner = noteOutput.owner;

  const noteResponse: NoteResponse = {
    id: id,
    title: title,
    currentContent: currentContent,
    isPublic: isPublic,
    createdAt: createdAt,
    updatedAt: updatedAt,
    owner: noteOwner
      ? { username: noteOwner.username, fullname: noteOwner.fullname }
      : null,
  };

  return noteResponse;
}
