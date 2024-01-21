import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { z } from 'zod';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown) {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong, please try again later.';
  }

  return message;
}

export function getNestErrorMessage(error: unknown) {
  let message: string;

  if (
    error instanceof Error &&
    'response' in error &&
    error.response &&
    (error.response as { data: any }).data
  ) {
    if (typeof (error.response as { data: any }).data.message === 'string') {
      message = (error.response as { data: any }).data.message;
    } else {
      message = (error.response as { data: any }).data.message[0];
    }
  } else {
    message = 'Something went wrong, please try again later.';
  }

  return message;
}

export function getZodErrorMessage(result: z.SafeParseError<any>) {
  let errorMessage = '';

  result.error.issues.forEach((issue) => {
    errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
  });

  return errorMessage;
}

export function getInitials(name?: string | null) {
  if (!name || name.length === 0) return 'CN';

  const splitName = name.split(' ');

  if (splitName.length === 1) {
    return splitName[0]?.slice(0, 2).toUpperCase();
  } else {
    return (
      (splitName?.[0]?.[0] ?? '') + (splitName?.[1]?.[0] ?? '')
    ).toUpperCase();
  }
}

export function checkAccessToken(token: string) {
  try {
    const jwtPayload = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    if (!jwtPayload || typeof jwtPayload === 'string') return false;

    return true;
  } catch (error) {
    return false;
  }
}

export function formatDate(date: Date | string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateWithTime(date: Date | string | number) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(date));
}

export function toRupiah(amount: number) {
  return 'Rp ' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
