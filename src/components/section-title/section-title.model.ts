import { ValueOf } from '@utils/helper';

export const SectionTitleColor = {
  Accent: 'accent',
  Primary: 'primary',
} as const;

export const SectionTitleOption = {
  Default: 'default',
  Icon: 'icon',
  Pictogram: 'pictogram',
} as const;

export const HeadingSize = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

export type SectionTitleColorType = ValueOf<typeof SectionTitleColor>;
export type SectionTitleOptionType = ValueOf<typeof SectionTitleOption>;
export type HeadingSizes = ValueOf<typeof HeadingSize>;
