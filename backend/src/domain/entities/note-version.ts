export interface NoteVersion {
  _id: string;
  documentId: string; // ref to Documents._id
  versionNumber: Number; // e.g., 1, 2, 3…
  content: String; // snapshot of content at that version
  createdAt: Date;
  createdBy: string;
}
