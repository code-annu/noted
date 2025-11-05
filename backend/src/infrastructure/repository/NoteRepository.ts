import { NoteCreate, Note, NoteUpdate } from "../../domain/entities/note";
import { INoteRepository } from "../../domain/repository/INoteRepository";
import { mapToNote } from "../mappers/note-mapper";
import { NoteModel } from "../model/note-model";

export class NoteRepository implements INoteRepository {
  async createNote(noteCreate: NoteCreate): Promise<Note> {
    const note = new NoteModel(noteCreate);
    const savedNote = await note.save();
    return mapToNote(savedNote);
  }

  async getNote(id: string): Promise<Note | null> {
    const noteDocument = await NoteModel.findById(id);
    return noteDocument ? mapToNote(noteDocument) : null;
  }

  async updateNote(id: string, updates: NoteUpdate): Promise<Note | null> {
    const noteDocument = await NoteModel.findByIdAndUpdate(id, updates, {
      new: true,
    });

    return noteDocument ? mapToNote(noteDocument) : null;
  }

  async deleteNote(id: string): Promise<Note | null> {
    const noteDocument = await NoteModel.findByIdAndDelete(id);
    return noteDocument ? mapToNote(noteDocument) : null;
  }

  async listNotesOfUser(userId: string): Promise<Note[]> {
    throw new Error("Method not implemented.");
  }
}
