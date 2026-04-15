export type InputPasswordAutocomplete = 'current-password' | 'new-password';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputFeedbackType = 'error' | 'success' | 'warning' | 'none';

export const InputPasswordAutocompletes: { [key: string]: InputPasswordAutocomplete } = {
  CurrentPassword: 'current-password',
  NewPassword: 'new-password',
} as const;

export const InputSizes: { [key: string]: InputSize } = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const InputFeedbackTypes: { [key: string]: InputFeedbackType } = {
  Error: 'error',
  Success: 'success',
  Warning: 'warning',
  None: 'none',
} as const;
