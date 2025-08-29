import {DateTime} from 'luxon';

export function formatDate(date: Date | string | number): string {
  return DateTime.fromJSDate(new Date(date)).toLocaleString(DateTime.DATE_MED);
}