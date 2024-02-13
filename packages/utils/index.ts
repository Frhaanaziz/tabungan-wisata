import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { z } from 'zod';
import jwt from 'jsonwebtoken';

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getErrorMessage(error: unknown): string {
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

export function getNestErrorMessage(error: unknown): string {
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

export function getZodErrorMessage(result: z.SafeParseError<any>): string {
  let errorMessage = '';

  result.error.issues.forEach((issue) => {
    errorMessage = errorMessage + issue.path[0] + ': ' + issue.message + '. ';
  });

  return errorMessage;
}

export function getInitials(name?: string | null): string {
  if (!name || name.length === 0) return 'CN';

  const splitName = name.split(' ');

  if (splitName.length === 1) {
    return splitName[0]?.slice(0, 2).toUpperCase() ?? 'CN';
  } else {
    return (
      (splitName?.[0]?.[0] ?? '') + (splitName?.[1]?.[0] ?? '')
    ).toUpperCase();
  }
}

export function checkAccessToken(token: string | undefined): boolean {
  if (!token) return false;

  try {
    const jwtPayload = jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    if (!jwtPayload || typeof jwtPayload === 'string') return false;

    return true;
  } catch (error) {
    console.error('checkAccessToken', error);
    return false;
  }
}

export function formatDate(date: Date | string | number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateWithTime(date: Date | string | number): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(new Date(date));
}

export function getRelativeTimeString(date: Date | number | string): string {
  // Allow dates or times to be passed
  const timeMs =
    typeof date === 'number'
      ? date
      : typeof date === 'string'
        ? new Date(date).getTime()
        : date.getTime();

  // Get the amount of seconds between the given date and now
  const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);

  // Array reprsenting one minute, hour, day, week, month, etc in seconds
  const cutoffs = [
    60,
    3600,
    86400,
    86400 * 7,
    86400 * 30,
    86400 * 365,
    Infinity,
  ];

  // Array equivalent to the above but in the string representation of the units
  const units: Intl.RelativeTimeFormatUnit[] = [
    'second',
    'minute',
    'hour',
    'day',
    'week',
    'month',
    'year',
  ];

  // Grab the ideal cutoff unit
  const unitIndex = cutoffs.findIndex(
    (cutoff) => cutoff > Math.abs(deltaSeconds)
  );

  // Get the divisor to divide from the seconds. E.g. if our unit is "day" our divisor
  // is one day in seconds, so we can divide our seconds by this to get the # of days
  const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

  // Intl.RelativeTimeFormat do its magic
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
  return rtf.format(
    Math.floor(deltaSeconds / (divisor || 1)),
    units[unitIndex] ?? 'second'
  );
}

export function toRupiah(amount: number): string {
  if (!amount) return 'Rp 0';
  return 'Rp ' + amount.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function toRupiahSuffix(amount: number): string {
  if (!amount) return 'Rp 0';

  let formatted = `${amount}`;

  if (amount >= 1000) {
    formatted = (amount / 1000).toFixed(0) + 'k';
  }

  return 'Rp ' + formatted;
}

export function getCloudinaryPublicId(imageUrl: string): string | undefined {
  const url = new URL(imageUrl);
  const pathname = url.pathname;
  const parts = pathname.split('/');
  return parts[parts.length - 1]?.split('.')[0];
}

export function getFirstName(fullName: string): string {
  if (!fullName) return '';

  // Split the full name string into an array of words
  const words = fullName.split(' ');

  // Take the first element of the array as the first name
  const firstName = words[0];

  return firstName ?? '';
}

export function getLastName(fullName: string): string | undefined {
  if (!fullName) return '';

  // Split the full name string into an array of words
  const words = fullName.split(' ');

  // Take the last element of the array as the last name
  const lastName = words[words.length - 1];

  return lastName;
}

export function convertPaymentMethod(paymentMethod: string): string {
  if (!paymentMethod) return '';

  if (paymentMethod.includes('_')) {
    // Jika terdapat underscore, capitalize kedua kata dan buang underscore
    const words = paymentMethod.split('_');
    for (let i = 0; i < words.length; i++) {
      words[i] =
        (words[i]?.charAt(0)?.toUpperCase() ?? '') + words[i]?.slice(1);
    }
    return words.join(' ');
  } else {
    // Jika tidak ada underscore, capitalize saja
    return paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1);
  }
}

export function truncate(text: string, maxChars: number) {
  if (text.length > maxChars) {
    return text.slice(0, maxChars) + '...';
  } else {
    return text;
  }
}

export function getDaysBetweenDates(
  start: Date | number | string,
  end: Date | number | string
): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds

  const diffDays = Math.round(
    Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)
  );

  return diffDays;
}

export function formatDateToShortMonthDay(isoDateString: string | Date) {
  // Buat objek Date dari string ISO
  const date = new Date(isoDateString);

  // Daftar nama bulan dalam bahasa Inggris
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // Ambil bulan dan tanggal dari objek Date
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  // Gabungkan bulan dan tanggal
  const formattedDate = `${month} ${day}`;

  return formattedDate;
}
