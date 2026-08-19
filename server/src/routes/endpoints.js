import { Router } from "express";
import mongoose from "mongoose";
import MockEndpoint from "../models/MockEndpoint.js";
import { requireAuth } from "../middleware/auth.js";
import { normalizePath, parseJsonPayload } from "../utils/validate.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
  const items = await MockEndpoint.find({ userId: req.user.userId }).sort({ createdAt: -1 });
  res.json({ endpoints: items });
});

router.post("/", async (req, res) => {
  try {
    const endpointPath = normalizePath(req.body.endpointPath);
    const jsonPayload = parseJsonPayload(req.body.jsonPayload);
    const item = await MockEndpoint.create({
      userId: req.user.userId,
      endpointPath,
      jsonPayload,
      description: req.body.description || "",
      statusCode: Number(req.body.statusCode) || 200
    });
    res.status(201).json({ endpoint: item });
  } catch (err) {
    const duplicate = err?.code === 11000;
    res.status(duplicate ? 409 : 400).json({ message: duplicate ? "That endpoint already exists" : err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: "Invalid endpoint id" });
    const endpointPath = normalizePath(req.body.endpointPath);
    const jsonPayload = parseJsonPayload(req.body.jsonPayload);
    const item = await MockEndpoint.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { endpointPath, jsonPayload, description: req.body.description || "", statusCode: Number(req.body.statusCode) || 200 },
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Endpoint not found" });
    res.json({ endpoint: item });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  const item = await MockEndpoint.findOneAndDelete({ _id: req.params.id, userId: req.user.userId });
  if (!item) return res.status(404).json({ message: "Endpoint not found" });
  res.json({ message: "Endpoint deleted" });
});

export default router;
