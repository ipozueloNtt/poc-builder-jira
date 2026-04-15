import { ValueOf } from '@utils/helper';

export type TagColorTypes = ValueOf<typeof TagColor>;
export type TagSizes = ValueOf<typeof TagSize>;

export const TagColor = {
  Primary: 'primary',
  Secondary: 'secondary',
  Accent: 'accent',
  Danger: 'danger',
  Success: 'success',
  Warning: 'warning',
  Disabled: 'disabled',
} as const;

export const TagSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const TAG_DEFAULT_COLOR = TagColor.Primary;
export const TAG_DEFAULT_SIZE = TagSize.Medium;
