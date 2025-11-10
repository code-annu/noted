export interface Note {
  id: string;
  title: string;
  currentContent: string;
  isPublic: Boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    username: string;
    fullname: string;
  };
}

export interface NoteCreate {
  title: string;
  content: string;
}

export interface NoteUpdate extends Partial<NoteCreate> {}
