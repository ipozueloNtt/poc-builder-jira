export type InputPasswordArgs = {
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
  'label-hide-password': string;
  'label-show-password': string;
  'input-tabindex': string;
  'maxlength': number;
  'placeholder': string;
  'readonly': boolean;
  'required': boolean;
  'hide-required': boolean;
  'submit-on-enter': boolean;
  'tooltip-text': string;
  'tooltip-width': 0;
  'value': string;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athChange'?: (event: CustomEvent<void>) => void;
  'athInput'?: (event: CustomEvent<void>) => void;
  'setFocus'?: () => void;
};

export const ordererArgs: InputPasswordArgs = {
  'autofocus': undefined,
  'autocomplete': undefined,
  'counter': undefined,
  'counter-label': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'feedback-text': undefined,
  'helper-text': undefined,
  'label-hide-password': undefined,
  'label-show-password': undefined,
  'input-tabindex': undefined,
  'label': undefined,
  'maxlength': undefined,
  'name': undefined,
  'placeholder': undefined,
  'readonly': undefined,
  'required': undefined,
  'hide-required': undefined,
  'size': undefined,
  'submit-on-enter': undefined,
  'tooltip-text': undefined,
  'tooltip-width': undefined,
  'value': undefined,
};
