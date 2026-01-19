import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.resolve(process.cwd(), ".env"),
});

import app from "./app.js";
import connectDB from "./config/db.js";
import env from "./config/env.js";
import logger from "./config/logger.js";

const startServer = async () => {
  await connectDB();

  app.listen(env.PORT, () => {
    logger.info(
      `🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`
    );
  });
};

startServer();
