import { Request, Response, NextFunction } from 'express';
import { stripHtml } from 'string-strip-html';

export function sanitizeInputs() {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.body) {
      const object = req.body;
      res.locals.body = sanitizeObject(object);
    }

    next();
  };
}

function sanitizeObject(object: any) {
  const sanitizedObject = {};
  const keys = Object.getOwnPropertyNames(object);

  keys.forEach((key) => {
    if (object[key]) {
      sanitizedObject[key] = stripHtml(object[key]).result;
    }
  });

  return sanitizedObject;
}
