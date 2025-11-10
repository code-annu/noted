export interface NoteVersionResponse {
  id: string;
  noteId: string;
  versionNumber: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: {
    username: string;
    fullname: string;
  } | null;
}
