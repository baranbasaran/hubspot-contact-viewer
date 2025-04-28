import { Response } from "express";
import { ApiResponse, ErrorResponse } from "../types/common.types";

export class ResponseHandler {
  static success<T>(res: Response, data: T, statusCode: number = 200): void {
    const response: ApiResponse<T> = {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(response);
  }

  static error(res: Response, error: unknown, statusCode: number = 500): void {
    const errorMessage =
      error instanceof Error ? error.message : "An unexpected error occurred";
    const errorResponse: ErrorResponse = {
      success: false,
      error: errorMessage,
      timestamp: new Date().toISOString(),
    };
    res.status(statusCode).json(errorResponse);
  }

  static validationError(res: Response, message: string): void {
    this.error(res, message, 400);
  }

  static notFound(res: Response, message: string = "Resource not found"): void {
    this.error(res, message, 404);
  }
}
