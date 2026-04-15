export type ButtonLinkColors = 'primary' | 'secondary';
export type ButtonLinkPositions = 'left' | 'right';
export type ButtonLinkSizes = 'lg' | 'md' | 'sm' | 'xs';

export const ButtonLinkColor = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const ButtonLinkPosition = {
  Left: 'left',
  Right: 'right',
} as const;

export const ButtonLinkSize = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
  Extrasmall: 'xs',
} as const;
