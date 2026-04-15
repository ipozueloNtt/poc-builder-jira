import { ValueOf } from '@utils/helper';

export const DatepickerRangeSizes = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const DatepickerRangeTypes = {
  Date: 'date',
  Month: 'month',
  Year: 'year',
} as const;

export const DatepickerRangeColors = {
  Primary: 'primary',
  Accent: 'accent',
} as const;

export const DatepickerRangeFeedbacks = {
  None: 'none',
  Error: 'error',
} as const;

export enum DatepickerRangeFocusState {
  Start,
  End,
  None,
}

export type DatepickerRangeSize = ValueOf<typeof DatepickerRangeSizes>;
export type DatepickerRangeType = ValueOf<typeof DatepickerRangeTypes>;
export type DatepickerRangeColor = ValueOf<typeof DatepickerRangeColors>;
export type DatepickerRangeFeedback = ValueOf<typeof DatepickerRangeFeedbacks>;
