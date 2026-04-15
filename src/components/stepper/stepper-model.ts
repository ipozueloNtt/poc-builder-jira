export type StepperOrientationType = 'horizontal' | 'vertical';
export type StepperSizeType = 'sm' | 'md';

export const StepperOrientation = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;

export const StepperSize = {
  Small: 'sm',
  Medium: 'md',
} as const;
