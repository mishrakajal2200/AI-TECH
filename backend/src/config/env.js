import dotenv from "dotenv";
import { z } from "zod";

dotenv.config({ path: ".env" });

const envSchema = z.object({
  PORT: z.string().default("5000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  MONGO_URI: z.string(),
  DB_NAME: z.string(),

  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),

  // ✅ FIX HERE
  OPENAI_API_KEY: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
export default env;
