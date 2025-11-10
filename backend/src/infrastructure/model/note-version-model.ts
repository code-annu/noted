import { Types, Schema, Document, model } from "mongoose";

export interface NoteVersionDocument extends Document {
  _id: Types.ObjectId;
  noteId: Types.ObjectId; // Reference to Note._id
  versionNumber: number; // e.g., 1, 2, 3...
  content: string; // Snapshot of content at that version
  createdBy: Types.ObjectId; // Reference to User._id who created this version
  createdAt: Date;
  updatedAt: Date;
}

const NoteVersionSchema = new Schema<NoteVersionDocument>(
  {
    noteId: {
      type: Schema.Types.ObjectId,
      required: [true, "noteId is required"],
      ref: "Note",
    },
    versionNumber: {
      type: Number,
      required: [true, "versionNumber is required"],
      min: [1, "versionNumber must be at least 1"],
    },
    content: {
      type: String,
      required: [true, "content is required"],
      trim: true,
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, "createdBy is required"],
      ref: "User",
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt
  }
);

// Optional: Add indexes, methods, virtuals as needed
// For example, indexing by noteId + versionNumber can improve lookup performance
// NoteVersionSchema.index({ noteId: 1, versionNumber: 1 }, { unique: true });

export const NoteVersionModel = model<NoteVersionDocument>(
  "NoteVersion",
  NoteVersionSchema
);
