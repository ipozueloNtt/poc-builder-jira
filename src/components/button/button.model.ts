export type ButtonColors = 'primary' | 'secondary';
export type ButtonSizes = 'lg' | 'md' | 'sm' | 'xs';
export type ButtonTypes = 'submit' | 'button' | 'reset';
export type ButtonIconPositions = 'none' | 'left' | 'right' | 'icon-only';
export type ButtonFills = 'solid' | 'clear';

export const ButtonColor = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const ButtonSize = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
  Extrasmall: 'xs',
} as const;

export const ButtonType = {
  Submit: 'submit',
  Button: 'button',
  Reset: 'reset',
} as const;

export const ButtonFill = {
  Solid: 'solid',
  Clear: 'clear',
} as const;

export enum ButtonIconPosition {
  None = 'none',
  Left = 'left',
  Right = 'right',
  IconOnly = 'icon-only',
}
