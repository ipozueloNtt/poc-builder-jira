import { ValueOf } from '@utils/helper';

export const EmptyStateType = {
  Empty: 'empty',
  SearchNoResults: 'search-no-results',
  Error: 'error',
  Loading: 'loading',
} as const;

export const HeadingSize = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

export type EmptyStateTypes = ValueOf<typeof EmptyStateType>;
export type HeadingSizes = ValueOf<typeof HeadingSize>;
