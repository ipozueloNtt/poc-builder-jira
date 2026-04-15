import { ValueOf } from '@utils/helper';

export const ListSizes = {
  ExtraSmall: 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const ListOrientation = {
  Vertical: 'vertical',
  Horizontal: 'horizontal',
} as const;

export const ListLinkTarget = {
  Self: 'self',
  Parent: 'parent',
  Blank: 'blank',
  Top: 'top',
} as const;

export type ListSizeType = ValueOf<typeof ListSizes>;
export type ListOrientationType = ValueOf<typeof ListOrientation>;
export type ListLinkTargetType = ValueOf<typeof ListLinkTarget>;
