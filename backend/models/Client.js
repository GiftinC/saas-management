import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  domain: { type: String },
  plan: { type: String, default: "Free" },
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Client", clientSchema);
