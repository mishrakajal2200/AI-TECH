import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import authRoutes from "./routes/auth.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import analysisRoutes from "./routes/analysis.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import fixRoutes from "./routes/fix.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

/* -------------------- Global Middlewares -------------------- */
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(helmet());  
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

/* -------------------- Routes -------------------- */
app.use("/auth", authRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/fix", fixRoutes);


/* -------------------- Error Handler -------------------- */
app.use(errorMiddleware);

export default app;
