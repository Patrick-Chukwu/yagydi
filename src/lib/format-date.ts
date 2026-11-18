const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/** Format a YYYY-MM-DD string without locale-dependent APIs. */
export function formatDisplayDate(isoDate: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match) return isoDate;

  const year = match[1];
  const month = MONTHS[Number(match[2]) - 1];
  const day = Number(match[3]);
  if (!year || !month || Number.isNaN(day)) return isoDate;
  return `${day} ${month} ${year}`;
}
