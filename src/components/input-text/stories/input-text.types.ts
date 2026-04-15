export type InputTextArgs = {
  'autofocus': boolean;
  'autocomplete': string;
  'clear-button-aria-label': string;
  'counter': boolean;
  'counter-label': string;
  'disabled': boolean;
  'feedback': string;
  'feedback-text': string;
  'has-clear': boolean;
  'helper-text': string;
  'icon': string;
  'icon-position': string;
  'input-aria-label': string;
  'input-tabindex': string;
  'label': string;
  'maxlength': number;
  'name': string;
  'placeholder': string;
  'readonly': boolean;
  'required': boolean;
  'hide-required': boolean;
  'size': string;
  'submit-on-enter': boolean;
  'tooltip-text': string;
  'tooltip-width': number;
  'type': string;
  'value': string;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athChange'?: (event: CustomEvent<void>) => void;
  'athClear'?: (event: CustomEvent<void>) => void;
  'athInput'?: (event: CustomEvent<void>) => void;
  'setFocus'?: () => void;
};

export const ordererArgs: Partial<InputTextArgs> = {
  'autofocus': undefined,
  'autocomplete': undefined,
  'clear-button-aria-label': undefined,
  'counter': undefined,
  'counter-label': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'feedback-text': undefined,
  'has-clear': undefined,
  'helper-text': undefined,
  'icon': undefined,
  'icon-position': undefined,
  'input-aria-label': undefined,
  'input-tabindex': undefined,
  'label': undefined,
  'maxlength': undefined,
  'name': undefined,
  'placeholder': undefined,
  'readonly': undefined,
  'required': undefined,
  'hide-required': undefined,
  'size': undefined,
  'tooltip-text': undefined,
  'tooltip-width': undefined,
  'type': undefined,
  'value': undefined,
};
