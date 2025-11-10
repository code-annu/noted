export interface NoteVersion {
  id: string;
  noteId: string; // ref to Documents._id
  versionNumber: number; // e.g., 1, 2, 3…
  content: String; // snapshot of content at that version
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteVersionCreate {
  noteId: string;
  versionNumber: number;
  content: string;
  createdBy: string;
}

export interface NoteVersionUpdate {
  content: string | undefined;
}
