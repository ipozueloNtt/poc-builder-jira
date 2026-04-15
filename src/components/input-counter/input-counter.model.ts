export type InputCounterFeedbackType = 'error' | 'none';

export type InputCounterSize = 'sm' | 'md' | 'lg';

export const InputCounterFeedbackTypes: { [key: string]: InputCounterFeedbackType } = {
  Error: 'error',
  None: 'none',
} as const;

export const InputCounterSizes: { [key: string]: InputCounterSize } = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;
