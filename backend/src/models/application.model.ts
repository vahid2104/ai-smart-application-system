import mongoose, { Document, Schema, Types } from "mongoose";

export type ApplicationStatus = "pending" | "approved" | "rejected";

export interface IApplication extends Document {
  vacancy: Types.ObjectId;
  candidateName: string;
  candidateEmail: string;
  coverLetter: string;
  cvFileName: string;
  cvFileUrl?: string;
  status: ApplicationStatus;
  aiScore?: number;
  matchedSkills: string[];
  missingSkills: string[];
  aiSummary?: string;
  aiRecommendation?: string;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    vacancy: {
      type: Schema.Types.ObjectId,
      ref: "Vacancy",
      required: true,
    },
    candidateName: {
      type: String,
      required: true,
      trim: true,
    },
    candidateEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    coverLetter: {
      type: String,
      required: true,
      trim: true,
    },
    cvFileName: {
      type: String,
      required: true,
      trim: true,
    },
    cvFileUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    aiScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    matchedSkills: {
      type: [String],
      default: [],
    },
    missingSkills: {
      type: [String],
      default: [],
    },
    aiSummary: {
      type: String,
      trim: true,
    },
    aiRecommendation: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model<IApplication>(
  "Application",
  applicationSchema
);

export default Application;