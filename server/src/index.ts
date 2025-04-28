import express from "express";
import cors from "cors";
import config from "./config";
import contactsRouter from "./routes/contacts.routes";
import companiesRouter from "./routes/companies.routes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    environment: config.nodeEnv,
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/contacts", contactsRouter);
app.use("/api/companies", companiesRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: "Not Found",
    path: req.path,
    timestamp: new Date().toISOString(),
  });
});

// Error handling middleware
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(`[${new Date().toISOString()}] Error:`, {
      message: err.message,
      stack: config.nodeEnv === "development" ? err.stack : undefined,
      path: req.path,
      method: req.method,
    });

    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message:
        config.nodeEnv === "development"
          ? err.message
          : "An unexpected error occurred",
      timestamp: new Date().toISOString(),
    });
  }
);

// Start server
app.listen(config.port, () => {
  console.log(
    `Server is running in ${config.nodeEnv} mode on port ${config.port}`
  );
});
