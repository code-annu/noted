import { NoteVersion } from "../../domain/entities/note-version";
import { NoteVersionDocument } from "../model/note-version-model";

export function mapToNoteVersion(
  noteVersionDocument: NoteVersionDocument
): NoteVersion {
  const {
    _id,
    noteId,
    createdAt,
    updatedAt,
    createdBy: creatorId,
    content,
    versionNumber,
  } = noteVersionDocument;

  const noteVersion: NoteVersion = {
    id: _id.toString(),
    noteId: noteId.toString(),
    versionNumber: versionNumber,
    content: content,
    createdBy: creatorId.toString(),
    createdAt: createdAt,
    updatedAt: updatedAt,
  };

  return noteVersion;
}
