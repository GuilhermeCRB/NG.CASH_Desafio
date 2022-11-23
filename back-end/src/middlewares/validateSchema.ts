import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { badRequestError } from '../utils/errorUtils.js';

export function validateSchema(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(res.locals.body, { abortEarly: false });
    if (error) {
      throw badRequestError(error.details.map((detail) => detail.message));
    }

    next();
  };
}
