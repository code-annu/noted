export interface NoteVersionCreateInputDTO {
  noteId: string;
  content: string;
}

export interface NoteVersionUpdateInputDTO {
  content?: string;
}

export interface NoteVersionOutputDTO {
  id: string;
  noteId: string;
  versionNumber: number;
  content: String;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
