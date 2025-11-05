export interface NoteResponse {
  id: string;
  title: string;
  currentContent: String;
  isPublic: Boolean;
  createdAt: Date;
  updatedAt: Date;
  owner: {
    username: string;
    fullname: string;
  };
}
