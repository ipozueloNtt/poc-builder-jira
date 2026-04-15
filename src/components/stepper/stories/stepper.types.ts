export type StepperArgs = {
  'clickable': boolean;
  'collapse-label': string;
  'completed-label': string;
  'aria-live-message': string;
  'ath-aria-label': string;
  'ath-role': string;
  'error-label': string;
  'expand-label': string;
  'heading-icon': string;
  'heading-text': string;
  'orientation': string;
  'readonly': boolean;
  'size': string;
  'start-from': number;
  'athSelect'?: (event: CustomEvent<void>) => void;
};

export const orderedArgs: StepperArgs = {
  'clickable': undefined,
  'collapse-label': undefined,
  'completed-label': undefined,
  'aria-live-message': undefined,
  'ath-aria-label': undefined,
  'ath-role': undefined,
  'error-label': undefined,
  'expand-label': undefined,
  'heading-icon': undefined,
  'heading-text': undefined,
  'orientation': undefined,
  'readonly': undefined,
  'size': undefined,
  'start-from': undefined,
};
