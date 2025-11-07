export interface Note {
  id: string;
  title: string;
  currentContent: string;
  ownerId: string;
  isPublic: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface NoteCreate {
  title: string;
  content: string;
}

export interface NoteUpdate extends Partial<NoteCreate> {}
