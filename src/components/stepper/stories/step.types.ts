export type StepArgs = {
  'action-text': string;
  'disabled': boolean;
  'feedback': string;
  'heading-text': string;
  'is-collapsable': boolean;
  'is-complete': boolean;
  'is-expanded': boolean;
  'readonly': boolean;
  'selected': boolean;
  'number': number;
  'athClick'?: (event: CustomEvent<void>) => void;
  'defaultSlot': string;
};

export const ordererArgs: StepArgs = {
  'action-text': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'heading-text': undefined,
  'is-collapsable': undefined,
  'is-complete': undefined,
  'is-expanded': undefined,
  'readonly': undefined,
  'selected': undefined,
  'number': undefined,
  'defaultSlot': undefined,
};
