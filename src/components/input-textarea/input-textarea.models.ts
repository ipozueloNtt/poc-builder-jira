export type InputTextType = 'text' | 'email' | 'search' | 'url' | 'tel';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputIconPosition = 'left' | 'right';
export type InputFeedbackType = 'error' | 'none';

export const InputTextTypes: { [key: string]: InputTextType } = {
  Text: 'text',
  Email: 'email',
  Search: 'search',
  Url: 'url',
  Tel: 'tel',
} as const;

export const InputSizes: { [key: string]: InputSize } = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const InputIconPositions: { [key: string]: InputIconPosition } = {
  Left: 'left',
  Right: 'right',
} as const;

export const InputFeedbackTypes: { [key: string]: InputFeedbackType } = {
  Error: 'error',
  None: 'none',
} as const;
