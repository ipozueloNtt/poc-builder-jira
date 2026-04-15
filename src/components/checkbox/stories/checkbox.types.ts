import { CheckboxChangeEventDetail } from '../checkbox.model';

export type CheckboxArgs = {
  'autofocus': boolean;
  'aria-label': string;
  'checked': boolean;
  'disabled': boolean;
  'athChange'?: (event: CustomEvent<void>) => void;
  'athClick'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'feedback': string;
  'feedback-text': string;
  'helper-text': string;
  'indeterminate': boolean;
  'label': string;
  'name': string;
  'readonly': boolean;
  'required': boolean;
  'hide-required': boolean;
  'value': string;
  'setFocus'?: () => void;
};

export type CheckboxGroupArgs = {
  'aria-label': string;
  'defaultSlot'?: string;
  'disabled': boolean;
  'feedback': string;
  'feedback-text': string;
  'helper-text'?: string;
  'label': string;
  'name': string;
  'readonly': boolean;
  'show-required': boolean;
  'tooltip-text': string;
  'required-aria-label': string;
  'athChecked'?: (event: CustomEvent<CheckboxChangeEventDetail[]>) => void;
};
