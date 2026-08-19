import { Router } from "express";
import MockEndpoint from "../models/MockEndpoint.js";

const router = Router();

router.get("/:userId/*path", async (req, res) => {
  try {
    const pathValue = req.params.path;
    const endpointPath = `/${Array.isArray(pathValue) ? pathValue.join("/") : pathValue}`;
    const endpoint = await MockEndpoint.findOne({ userId: req.params.userId, endpointPath });

    if (!endpoint) return res.status(404).json({
      error: "Mock endpoint not found",
      path: endpointPath
    });

    endpoint.requestCount += 1;
    endpoint.lastAccessedAt = new Date();
    await endpoint.save();

    res.status(endpoint.statusCode).type("application/json").send(JSON.stringify(endpoint.jsonPayload));
  } catch {
    res.status(400).json({ error: "Invalid mock request" });
  }
});

export default router;
