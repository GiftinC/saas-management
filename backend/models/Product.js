import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: String,
  status: { type: String, default: "Active" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Product", productSchema);
