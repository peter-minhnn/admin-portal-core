import { formatDate } from 'date-fns';

export function formatDateTime(
  date?: Date,
  format: string = 'DD/MM/YYYY'
): string {
  if (!date) return '';
  return formatDate(date, format);
}
