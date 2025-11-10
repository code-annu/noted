export interface NoteVersion {
  id: string;
  noteId: string;
  versionNumber: number;
  content: String;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteVersionCreate {
  noteId: string;
  content: string;
}

export interface NoteVersionUpdate {
  content?: string;
}
