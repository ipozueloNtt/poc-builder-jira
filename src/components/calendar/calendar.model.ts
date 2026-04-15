import { ValueOf } from '@utils/helper';

export const CalendarTypes = {
  Date: 'date',
  Month: 'month',
  Year: 'year',
} as const;

export const CalendarColors = {
  Primary: 'primary',
  Accent: 'accent',
} as const;

export type CalendarType = ValueOf<typeof CalendarTypes>;
export type CalendarColor = ValueOf<typeof CalendarColors>;
 