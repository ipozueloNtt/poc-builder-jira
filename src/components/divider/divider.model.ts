import { ValueOf } from '@utils/helper';

export const DividerOrientation = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;

export const DividerSize = {
  Medium: 'md',
  Small: 'sm',
} as const;

export const DividerColor = {
  Bold: 'bold',
  Bolder: 'bolder',
  Boldest: 'boldest',
} as const;

export type DividerOrientationType = ValueOf<typeof DividerOrientation>;
export type DividerSizeType = ValueOf<typeof DividerSize>;
export type DividerColorType = ValueOf<typeof DividerColor>;

export const DIVIDER_DEFAULT_ORIENTATION = DividerOrientation.Horizontal;
export const DIVIDER_DEFAULT_SIZE = DividerSize.Medium;
export const DIVIDER_DEFAULT_COLOR = DividerColor.Bold;
