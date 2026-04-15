import { ValueOf } from '@utils/helper';

export const ButtonExpandableSizesTypes = {
  Large: 'lg',
  Medium: 'md',
  Small: 'sm',
} as const;

export const ButtonExpandableSizes = ButtonExpandableSizesTypes;
export type ButtonExpandableSizesType = ValueOf<typeof ButtonExpandableSizes>;
