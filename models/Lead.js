import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    employees: {
      type: Number,
      required: true,
    },

    contact: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    score: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      default: "New",
    },

    verified: {
      type: Boolean,
      default: true,
    },

    source: {
      type: String,
      default: "Manual",
    },
  },
  {
    timestamps: true,
  }
);

const Lead =
  mongoose.models.Lead ||
  mongoose.model("Lead", LeadSchema);

export default Lead;