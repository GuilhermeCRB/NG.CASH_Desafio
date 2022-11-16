import { NextFunction, Request, Response } from "express";

import { AppError, errorTypeToStatusCode, isAppError } from "../utils/errorUtils.js";

export function errorHandlerMiddleware(error: Error | AppError, req: Request, res: Response, next: NextFunction) {
  console.log(error);

  if (isAppError(error)) {
    return res.status(errorTypeToStatusCode(error.type)).send(error.message);
  }

  res.status(500).send("Parece que algo deu errado. Por favor, tente novamente mais tarde.");
}
