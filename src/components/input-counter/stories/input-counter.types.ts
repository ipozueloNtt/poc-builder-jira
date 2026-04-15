export type InputCounterArgs = {
  'hide-controls': boolean;
  'disabled': boolean;
  'feedback': string;
  'feedback-text': string;
  'helper-text': string;
  'input-aria-label': string;
  'label': string;
  'max': number;
  'min': number;
  'name': string;
  'placeholder': string;
  'readonly': boolean;
  'required': boolean;
  'hide-required': boolean;
  'size': string;
  'step': number;
  'tooltip-text': string;
  'tooltip-width': number;
  'unit': string;
  'unit-aria-label': string;
  'value': string;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athChange'?: (event: CustomEvent<void>) => void;
  'athInput'?: (event: CustomEvent<void>) => void;
};

export const ordererArgs: Partial<InputCounterArgs> = {
  'hide-controls': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'feedback-text': undefined,
  'helper-text': undefined,
  'input-aria-label': undefined,
  'label': undefined,
  'max': undefined,
  'min': undefined,
  'name': undefined,
  'placeholder': undefined,
  'readonly': undefined,
  'required': undefined,
  'hide-required': undefined,
  'size': undefined,
  'step': undefined,
  'tooltip-text': undefined,
  'tooltip-width': undefined,
  'unit': undefined,
  'unit-aria-label': undefined,
  'value': undefined,
};
