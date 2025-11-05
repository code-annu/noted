import { Document, model, Types, Schema } from "mongoose";

export interface NoteDocument extends Document {
  _id: Types.ObjectId;
  title: string;
  currentContent: string;
  ownerId: Types.ObjectId;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NoteSchema = new Schema<NoteDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      maxLength: [200, "Title cannot exceed the length of 200"],
      trim: true,
    },
    currentContent: {
      type: String,
      required: [true, "Content is required"],
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      required: [true, "OwnerId is required"],
      ref: "User",
    },
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Optional: Add indexes, virtuals, methods etc.
// NoteSchema.index({ ownerId: 1, title: 1 });

export const NoteModel = model<NoteDocument>("Note", NoteSchema);
