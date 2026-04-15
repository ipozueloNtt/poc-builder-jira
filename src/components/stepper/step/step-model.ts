export type StepAlignmentType = 'left' | 'center';
export type StepFeedbackType = 'none' | 'error';
export type StepSizeType = 'sm' | 'md';
export type StepRoleType = 'button' | 'link';

export const StepAlignment = {
  Left: 'left',
  Center: 'center',
} as const;

export const StepFeedback = {
  None: 'none',
  Error: 'error',
} as const;

export const StepSize = {
  Sm: 'sm',
  Md: 'md',
} as const;

export const StepRole = {
  Button: 'button',
  Link: 'link',
} as const;
