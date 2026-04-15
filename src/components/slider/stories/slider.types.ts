export type SliderArgs = {
  'from-aria-label': string;
  'group-aria-label': string;
  'to-aria-label': string;
  'counter-width': string;
  'detail-first': string;
  'detail-last': string;
  'disabled': boolean;
  'feedback': string;
  'feedback-counter': string;
  'feedback-text': string;
  'helper-text': string;
  'label-group': string;
  'max': number;
  'min': number;
  'name': string;
  'readonly': boolean;
  'required': boolean;
  'show-required': boolean;
  'step': number;
  'stepped': boolean;
  'type': string;
  'tooltip-text': string;
  'unit': string;
  'value': string;
  'value-text': string;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athChange'?: (event: CustomEvent<void>) => void;
};

export const ordererArgs: Partial<SliderArgs> = {
  'from-aria-label': undefined,
  'group-aria-label': undefined,
  'to-aria-label': undefined,
  'counter-width': undefined,
  'detail-first': undefined,
  'detail-last': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'feedback-counter': undefined,
  'feedback-text': undefined,
  'helper-text': undefined,
  'label-group': undefined,
  'max': undefined,
  'min': undefined,
  'name': undefined,
  'readonly': undefined,
  'required': undefined,
  'show-required': undefined,
  'step': undefined,
  'stepped': undefined,
  'type': undefined,
  'tooltip-text': undefined,
  'unit': undefined,
  'value': undefined,
  'value-text': undefined,
};
