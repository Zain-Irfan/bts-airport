export const BOOKING_MIN_LEAD_HOURS = 4;

export const BOOKING_DATETIME_ERROR =
  "Please select a date and time at least 4 hours from now.";

export const RETURN_DATETIME_ERROR =
  "Return date and time must be after your outbound journey.";

/** Combine calendar date with `HH:mm` (24h) into a local Date. */
export function combineDateAndTime(date: Date, time: string): Date | null {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time.trim());
  if (!match) return null;
  const hours = Number(match[1]);
  const minutes = Number(match[2]);
  if (hours > 23 || minutes > 59) return null;
  const scheduled = new Date(date);
  scheduled.setHours(hours, minutes, 0, 0);
  return scheduled;
}

export function isAtLeastHoursAhead(
  date: Date,
  time: string,
  hours = BOOKING_MIN_LEAD_HOURS,
  now = new Date(),
): boolean {
  const scheduled = combineDateAndTime(date, time);
  if (!scheduled) return false;
  const earliest = new Date(now.getTime() + hours * 60 * 60 * 1000);
  return scheduled.getTime() >= earliest.getTime();
}

export function getOutboundDatetimeError(date: Date, time: string): string | null {
  if (!time.trim()) return "Please select a time.";
  if (!combineDateAndTime(date, time)) return "Please select a valid time.";
  if (!isAtLeastHoursAhead(date, time)) return BOOKING_DATETIME_ERROR;
  return null;
}

export function getReturnDatetimeError(
  outboundDate: Date,
  outboundTime: string,
  returnDate: Date,
  returnTime: string,
): string | null {
  if (!returnTime.trim()) return "Please select a return time.";
  const outbound = combineDateAndTime(outboundDate, outboundTime);
  const ret = combineDateAndTime(returnDate, returnTime);
  if (!outbound || !ret) return "Please select a valid return date and time.";
  if (ret.getTime() <= outbound.getTime()) return RETURN_DATETIME_ERROR;
  return null;
}

/** Start of today in local time (for calendar `disabled.before`). */
export function startOfToday(): Date {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}
