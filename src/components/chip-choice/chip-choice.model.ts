import { ValueOf } from '@utils/helper';

export type ChipChoiceSizes = ValueOf<typeof ChipChoiceSize>;
export type ChipChoiceRoles = ValueOf<typeof ChipChoiceRole>;

export const ChipChoiceSize = {
  Medium: 'md',
  Small: 'sm',
} as const;

export const ChipChoiceRole = {
  Checkbox: 'checkbox',
  Radio: 'radio',
} as const;
