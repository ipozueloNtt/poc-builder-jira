import { ValueOf } from '@utils/helper';

export const ModalAppearance = {
  Error: 'error',
  Info: 'info',
  Success: 'success',
  Warning: 'warning',
} as const;

export const ModalSize = {
  Small: 'sm',
  Medium: 'md',
} as const;

export type ModalAppearanceType = ValueOf<typeof ModalAppearance>;
export type ModalSizeType = ValueOf<typeof ModalSize>;
