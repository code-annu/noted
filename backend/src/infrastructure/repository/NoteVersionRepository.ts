import {
  NoteVersionCreate,
  NoteVersion,
  NoteVersionUpdate,
} from "../../domain/entities/note-version";
import { INoteVersionRepository } from "../../domain/repository/INoteVersionRepository";
import { mapToNoteVersion } from "../mappers/note-version-mapper";
import { NoteModel } from "../model/note-model";
import { NoteVersionModel } from "../model/note-version-model";

export class NoteVersionRepository implements INoteVersionRepository {
  async createNoteVersion(
    noteVersionCreate: NoteVersionCreate
  ): Promise<NoteVersion> {
    const noteVersion = new NoteVersionModel(noteVersionCreate);
    const noteVersionDocument = await noteVersion.save();
    return mapToNoteVersion(noteVersionDocument.toObject());
  }

  async getNoteVersion(id: string): Promise<NoteVersion | null> {
    const noteVersionDocument = await NoteVersionModel.findById(id);
    return noteVersionDocument
      ? mapToNoteVersion(noteVersionDocument.toObject())
      : null;
  }

  async updateNoteVersion(
    id: string,
    updates: NoteVersionUpdate
  ): Promise<NoteVersion | null> {
    const updatedNoteVersionDocument = await NoteVersionModel.findByIdAndUpdate(
      id,
      updates,
      { new: true }
    );
    return updatedNoteVersionDocument
      ? mapToNoteVersion(updatedNoteVersionDocument.toObject())
      : null;
  }

  async deleteNoteVersion(id: string): Promise<NoteVersion | null> {
    const deleteNoteVersionDocument = await NoteVersionModel.findByIdAndDelete(
      id
    );
    return deleteNoteVersionDocument
      ? mapToNoteVersion(deleteNoteVersionDocument.toObject())
      : null;
  }

  async listAllNoteVersions(noteId: string): Promise<NoteVersion[]> {
    const noteVersionDocuments = await NoteVersionModel.find({
      noteId: noteId,
    });

    const noteVersions = noteVersionDocuments.map((noteVersionDocument) => {
      return mapToNoteVersion(noteVersionDocument);
    });

    return noteVersions;
  }
}
