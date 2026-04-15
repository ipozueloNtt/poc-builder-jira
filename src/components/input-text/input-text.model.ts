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

export interface InputTextAttributes {
  'icon'?: string | undefined;
  'iconPosition'?: string | undefined;
  'type'?: string | undefined;
  'required'?: string | undefined;
  'disabled'?: string | undefined;
  'readonly'?: string | undefined;
  'hasClear'?: string | undefined;
  'labelClearButton'?: string | undefined;

  'autocomplete'?: string | undefined;
  'form'?: string | undefined;
  'formnovalidate'?: boolean | undefined;
  'id': string | undefined;
  'inputmode'?: string | undefined;
  'list'?: string | undefined;
  'max'?: string | undefined;
  'maxlength'?: string | undefined;
  'min'?: string | undefined;
  'minlength'?: string | undefined;
  'name'?: string | undefined;
  'pattern'?: string | undefined;
  'placeholder'?: string | undefined;
  'spellcheck'?: string | undefined;
  'step'?: string | undefined;
  'value'?: string | undefined;

  'aria-label'?: string | undefined;
  'aria-required'?: string | undefined;
  'aria-invalid'?: string | undefined;
  'aria-describedby'?: string | undefined;
  'aria-disabled'?: string | undefined;
  'aria-readonly'?: string | undefined;
}
