import { ValueOf } from '../../utils/helper/index';

export const ActionBarAlignments = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
  Justify: 'justify',
} as const;

export const ActionBarSizes = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export type ActionBarAlignment = ValueOf<typeof ActionBarAlignments>;
export type ActionBarSize = ValueOf<typeof ActionBarSizes>;
