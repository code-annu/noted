export interface NoteVersion {
  id: string;
  noteId: string;
  versionNumber: number;
  content: String;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    username: string;
    fullname: string;
  } | null;
}

export interface NoteVersionCreate {
  noteId: string;
  content: string;
}

export interface NoteVersionUpdate {
  content?: string;
}
