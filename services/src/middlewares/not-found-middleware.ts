// src/middlewares/notFoundHandler.ts
import { Request, Response, NextFunction } from 'express';

/**
 * Middleware to handle unregistered (404) routes.
 * This should be placed after all other routes and regular middlewares.
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    success: false,
    status: 404,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    suggestion: 'Please check the API documentation or verify the endpoint URL.',
  });
};