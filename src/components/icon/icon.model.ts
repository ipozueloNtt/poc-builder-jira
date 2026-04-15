import { ValueOf } from '@utils/helper';

export type IconColorTypes = ValueOf<typeof IconColor>;

export const IconColor = {
  Inherit: 'inherit',
  Default: 'default',
  Primary: 'primary',
  Accent: 'accent',
  Error: 'error',
  Success: 'success',
  Warning: 'warning',
  Info: 'info',
  Inverse: 'inverse',
  Disabled: 'disabled',
} as const;
