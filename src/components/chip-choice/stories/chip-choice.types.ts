export type ChipChoiceArgs = {
  'aria-label': string;
  'aria-labelledby': string;
  'selected': boolean;
  'disabled': boolean;
  'icon': string;
  'label': string;
  'name': string;
  'role': string;
  'size': string;
  'value': string;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
  'athChange'?: (event: CustomEvent<void>) => void;
};
