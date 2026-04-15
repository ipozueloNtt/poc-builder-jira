export type BadgeTypes = 'dot' | 'numeric';
export type BadgeColorTypes = 'accent' | 'danger' | 'success' | 'warning' | 'info' | 'disabled';

export enum BadgeColor {
  Accent = 'accent',
  Danger = 'danger',
  Success = 'success',
  Warning = 'warning',
  Info = 'info',
  Disabled = 'disabled',
}

export const BADGE_DEFAULT_COLOR = BadgeColor.Accent;
export const BADGE_DEFAULT_TYPE = 'numeric';
export const MAX_VALUE = 999;

export type BadgePositions = 'right' | 'top-right';
