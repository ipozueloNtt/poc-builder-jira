import { ValueOf } from '@utils/helper';

export const UserMenuTypes = {
  Default: 'default',
  Initials: 'initials',
  Image: 'image',
  HideAvatar: 'hide-avatar',
} as const;

export type UserMenuType = ValueOf<typeof UserMenuTypes>;
