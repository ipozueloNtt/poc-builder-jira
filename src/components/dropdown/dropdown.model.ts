export type dropdownSizes = 'lg' | 'md' | 'sm';
export type dropdownFeedbackTypes = 'none' | 'error';

export enum dropdownSize {
  Lg = 'lg',
  Md = 'md',
  Sm = 'sm',
}

export enum dropdownFeedbackType {
  None = 'none',
  Error = 'error',
}

export interface ActionListItem {
  text: string;
  value: string;
  selected: boolean;
  disabled: boolean;
  optionGroup: boolean;
  icon: string;
}
