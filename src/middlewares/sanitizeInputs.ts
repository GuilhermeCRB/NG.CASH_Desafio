import { Request, Response, NextFunction } from 'express';
import { stripHtml } from 'string-strip-html';

export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  if (req.body) {
    const object = req.body;
    res.locals.body = sanitizeObject(object);
  }

  if (req.query) {
    const object = req.query;
    res.locals.query = sanitizeObject(object);
  }

  next();
}

function sanitizeObject(object: any) {
  const sanitizedObject = {};
  const keys = Object.getOwnPropertyNames(object);

  for (const key of keys) {
    if (object[key]) {
      sanitizedObject[key] = stripHtml(object[key]).result;
    }
  }

  return sanitizedObject;
}
