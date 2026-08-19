import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import endpointRoutes from "./routes/endpoints.js";
import mockRoutes from "./routes/mock.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL?.split(",").map(x => x.trim()) || "*" }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));
app.use(rateLimit({ windowMs: 60_000, limit: 120 }));

app.get("/health", (_req, res) => res.json({ status: "ok", service: "devmock-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/endpoints", endpointRoutes);
app.use("/mock", mockRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

async function start() {
  if (!process.env.MONGODB_URI || !process.env.JWT_SECRET) {
    throw new Error("MONGODB_URI and JWT_SECRET must be configured");
  }
  await mongoose.connect(process.env.MONGODB_URI);
  app.listen(port, "0.0.0.0", () =>
  console.log(`DevMock API running on port ${port}`)
);
}

start().catch(err => {
  console.error(err);
  process.exit(1);
});
