
export interface NoteCreateInputDTO {
  title: string;
  currentContent: string;
  ownerId: string;
}

export interface NoteUpdateInputDTO
  extends Pick<NoteCreateInputDTO, "title" | "currentContent"> {}

export interface NoteOutputDTO {
  id: string;
  title: string;
  currentContent: string;
  ownerId: string;
  isPublic: Boolean;
  createdAt: Date;
  updatedAt: Date;
}
