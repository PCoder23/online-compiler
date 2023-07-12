import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  output: { type: String, required: true },
  userId: { type: String, required: true },
  executionTime: { type: Number, required: true },
  timeStamp: { type: Date, default: Date.now },
});

export default mongoose.model("snippet", snippetSchema);
