import { Note } from "../../domain/entities/note";
import { NoteDocument } from "../model/note-model";

export function mapToNote(noteDocument: NoteDocument): Note {
  const {
    _id,
    title,
    currentContent,
    createdAt,
    updatedAt,
    ownerId,
    isPublic,
  } = noteDocument;
  const note: Note = {
    id: _id.toString(),
    title: title,
    currentContent: currentContent,
    createdAt: createdAt,
    updatedAt: updatedAt,
    ownerId: ownerId.toString(),
    isPublic: isPublic,
  };
  return note;
}
