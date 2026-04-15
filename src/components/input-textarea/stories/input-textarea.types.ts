export type InputTextareaArgs = {
  'size': string;
  'name': string;
  'label': string;
  'autofocus': boolean;
  'autocomplete': string;
  'counter': boolean;
  'counter-label': string;
  'disabled': boolean;
  'feedback': string;
  'feedback-text': string;
  'helper-text': string;
  'input-aria-label': string;
  'input-tabindex': string;
  'maxlength': number;
  'placeholder': string;
  'readonly': boolean;
  'required': boolean;
  'rows'?: number;
  'hide-required': boolean;
  'tooltip-text': string;
  'tooltip-width': 0;
  'value': string;

  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athChange'?: (event: CustomEvent<void>) => void;
  'athInput'?: (event: CustomEvent<void>) => void;
  'setFocus'?: () => void;
};

export const ordererArgs: InputTextareaArgs = {
  'autofocus': undefined,
  'autocomplete': undefined,
  'counter': undefined,
  'counter-label': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'feedback-text': undefined,
  'helper-text': undefined,
  'input-aria-label': undefined,
  'input-tabindex': undefined,
  'label': undefined,
  'maxlength': undefined,
  'name': undefined,
  'placeholder': undefined,
  'readonly': undefined,
  'required': undefined,
  'rows': undefined,
  'hide-required': undefined,
  'size': undefined,
  'tooltip-text': undefined,
  'tooltip-width': undefined,
  'value': undefined,
};
