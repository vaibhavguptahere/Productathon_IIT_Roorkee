import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetLeads,
  handleGetLeadById,
  handleUpdateLeadStatus,
  handleScanLeads,
} from "./routes/leads";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Leads API
  app.get("/api/leads", handleGetLeads);
  app.get("/api/leads/:id", handleGetLeadById);
  app.post("/api/leads/:id/status", handleUpdateLeadStatus);

  // AI Scan API
  app.post("/api/leads/scan", handleScanLeads);

  return app;
}
