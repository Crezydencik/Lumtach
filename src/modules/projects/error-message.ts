import { ZodError } from 'zod';

export function getProjectErrorMessage(error: unknown, fallback: string) {
  if (error instanceof ZodError) {
    const firstIssue = error.issues[0];

    if (!firstIssue) {
      return fallback;
    }

    return firstIssue.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}
