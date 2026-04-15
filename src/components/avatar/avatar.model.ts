export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';
export type AvatarType = undefined | 'default' | 'initials' | 'image';

export const AvatarSizes = {
  ExtraSmall: 'xs',
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const AvatarTypes = {
  Default: 'default',
  Initials: 'initials',
  Image: 'image',
} as const;
