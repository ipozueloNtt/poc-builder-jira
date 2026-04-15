import { ValueOf } from '@utils/helper';

export const UserDetailTypes = {
  Default: 'default',
  Initials: 'initials',
  Image: 'image',
  HideAvatar: 'hide-avatar',
} as const;

export type UserDetailType = ValueOf<typeof UserDetailTypes>;
