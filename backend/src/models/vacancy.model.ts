import mongoose, { Document, Schema } from "mongoose";

export interface IVacancy extends Document {
  title: string;
  department: string;
  location: string;
  type: string;
  level: string;
  description: string;
  requiredSkills: string[];
  responsibilities: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const vacancySchema = new Schema<IVacancy>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    level: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    requiredSkills: {
      type: [String],
      required: true,
      default: [],
    },
    responsibilities: {
      type: [String],
      required: true,
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Vacancy = mongoose.model<IVacancy>("Vacancy", vacancySchema);

export default Vacancy;