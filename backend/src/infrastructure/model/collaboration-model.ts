import { Document, Types, model, Schema } from "mongoose";

export interface CollaborationDocument extends Document {
  _id: Types.ObjectId;
  notedId: Types.ObjectId;
  userId: Types.ObjectId; // the collaborator user
  role: string; // e.g., "editor", "viewer"
  invitedBy: Types.ObjectId; // user who invited
  acceptedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

const CollaborationSchema = new Schema<CollaborationDocument>(
  {
    notedId: {
      type: Schema.Types.ObjectId,
      required: [true, "DocumentId is required"],
      ref: "Note", // or the document model name you use
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "UserId is required"],
      ref: "User",
    },
    role: {
      type: String,
      required: [true, "Role is required"],
      enum: {
        values: ["editor", "viewer"],
        message: "Role must be 'editor' or 'viewer'",
      },
      trim: true,
    },
    invitedBy: {
      type: Schema.Types.ObjectId,
      required: [true, "InvitedBy is required"],
      ref: "User",
    },
    acceptedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

// Optional: Example index for fast lookup of collaborators for a document/user
// CollaboratorSchema.index({ documentId: 1, userId: 1 }, { unique: true });

export const CollaborationModel = model<CollaborationDocument>(
  "Collaboration",
  CollaborationSchema
);
