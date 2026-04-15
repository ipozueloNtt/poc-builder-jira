import { ValueOf } from '@utils/helper';

export const DatepickerSizes = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const DatepickerTypes = {
  Date: 'date',
  Month: 'month',
  Year: 'year',
} as const;

export const DatepickerColors = {
  Primary: 'primary',
  Accent: 'accent',
} as const;

export const DatepickerFeedbacks = {
  None: 'none',
  Error: 'error',
} as const;

export type DatepickerSize = ValueOf<typeof DatepickerSizes>;
export type DatepickerType = ValueOf<typeof DatepickerTypes>;
export type DatepickerColor = ValueOf<typeof DatepickerColors>;
export type DatepickerFeedback = ValueOf<typeof DatepickerFeedbacks>;
 