import { NoteOutputDTO } from "../../application/dto/note-dto";
import { NoteResponse } from "../response/NoteResponse";

export function mapToNoteResponse(noteOutputDTO: NoteOutputDTO): NoteResponse {
  const { id, title, currentContent, createdAt, updatedAt, isPublic } =
    noteOutputDTO.note;

  const { username, fullname } = noteOutputDTO.owner;
  const response: NoteResponse = {
    id: id,
    title: title,
    currentContent: currentContent,
    isPublic: isPublic,
    createdAt: createdAt,
    updatedAt: updatedAt,
    owner: {
      username: username,
      fullname: fullname,
    },
  };

  return response;
}
