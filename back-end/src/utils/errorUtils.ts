type ErrorType = 'bad_request' | 'unauthorized' | 'not_found' | 'conflict' | 'internal_server';

export interface AppError {
  type: ErrorType;
  message: string | string[];
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: ErrorType) {
  if (type === 'bad_request') return 400;
  if (type === 'unauthorized') return 401;
  if (type === 'not_found') return 404;
  if (type === 'conflict') return 409;
  if (type === 'internal_server') return 500;
}

export function badRequestError(message?: string | string[]): AppError {
  return { type: 'bad_request', message: message ?? '' };
}

export function unauthorizedError(message?: string): AppError {
  return { type: 'unauthorized', message: message ?? '' };
}

export function notFoundError(message?: string): AppError {
  return { type: 'not_found', message: message ?? '' };
}

export function conflictError(message?: string): AppError {
  return { type: 'conflict', message: message ?? '' };
}

export function internalServerError(message?: string): AppError {
  return { type: 'internal_server', message: message ?? '' };
}
