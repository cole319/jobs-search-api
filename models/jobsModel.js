import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Company name is required"],
    },
    position: {
      type: String,
      required: [true, "Job Position is required"],
      minLength: 100,
    },
    status: {
      type: String,
      enum: ["Pending", "Rejected", "Interview"],
      default: "Pending",
    },
    workType: {
      type: String,
      enum: ["Full-Time", "Part-Time", "Inership", "Contract"],
      default: "Full-Time",
    },
    workLocation: {
      type: String,
      default: "Remote",
      required: [true, "Work Location is required"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Job", jobSchema);
