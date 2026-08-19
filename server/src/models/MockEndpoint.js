import mongoose from "mongoose";

const mockEndpointSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  endpointPath: { type: String, required: true, trim: true },
  jsonPayload: { type: mongoose.Schema.Types.Mixed, required: true },
  description: { type: String, default: "", maxlength: 200 },
  statusCode: { type: Number, default: 200, min: 100, max: 599 },
  requestCount: { type: Number, default: 0 },
  lastAccessedAt: { type: Date, default: null }
}, { timestamps: true });

mockEndpointSchema.index({ userId: 1, endpointPath: 1 }, { unique: true });

export default mongoose.model("MockEndpoint", mockEndpointSchema);
