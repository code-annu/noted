export interface Note {
  id: string;
  title: string;
  currentContent: string;
  ownerId: string;
  isPublic: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreate
  extends Pick<Note, "title" | "currentContent" | "isPublic" | "ownerId"> {}

export interface NoteUpdate
  extends Partial<Pick<Note, "title" | "currentContent" | "isPublic">> {}
