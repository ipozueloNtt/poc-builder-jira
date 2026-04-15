export type linkSizes = 'sm' | 'md' | 'lg';
export type linkTargets = 'self' | 'parent' | 'blank' | 'top';

export const linkSize = {
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
} as const;

export const linkTarget = {
  Self: 'self',
  Parent: 'parent',
  Blank: 'blank',
  Top: 'top',
} as const;
