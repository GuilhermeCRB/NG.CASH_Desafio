type ErrorType = 'not_found' | 'bad_request';

export interface AppError {
  type: ErrorType;
  message: string | string[];
}

export function isAppError(error: object): error is AppError {
  return (error as AppError).type !== undefined;
}

export function errorTypeToStatusCode(type: ErrorType) {
  if (type === 'not_found') return 404;
  if (type === 'bad_request') return 400;
}

export function notFoundError(message?: string): AppError {
  return { type: 'not_found', message: message ?? '' };
}

export function badRequestError(message?: string | string[]): AppError {
  return { type: 'bad_request', message: message ?? '' };
}
