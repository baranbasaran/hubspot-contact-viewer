import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Define required environment variables
const requiredEnvVars = ["HUBSPOT_API_KEY", "PORT"] as const;

// Define configuration interface
interface Config {
  hubspotApiKey: string;
  port: number;
  nodeEnv: "development" | "production" | "test";
}

// Validate environment variables
function validateEnvVars(): void {
  const missingVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}`
    );
  }
}

// Parse and validate configuration
function parseConfig(): Config {
  validateEnvVars();

  const port = parseInt(process.env.PORT || "3001", 10);
  if (isNaN(port)) {
    throw new Error("PORT must be a valid number");
  }

  return {
    hubspotApiKey: process.env.HUBSPOT_API_KEY!,
    port,
    nodeEnv: (process.env.NODE_ENV || "development") as Config["nodeEnv"],
  };
}

// Export validated configuration
const config = parseConfig();

export default config;
