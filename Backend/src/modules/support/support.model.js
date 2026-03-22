import mongoose from "mongoose";

const supportSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"] },
    email: { type: String, required: [true, "Email is required"] },
    subject: { type: String, required: [true, "Subject is required"] },
    message: { type: String, required: [true, "Message is required"] },
    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },
  },
  { timestamps: true },
);

const Support =
  mongoose.models.Support || mongoose.model("Support", supportSchema);
export default Support;
