import logger from "../config/logger.js";

const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  logger.error(err.message, err.stack);

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    errors: err.errors || [],
  });
};

export default errorMiddleware;
