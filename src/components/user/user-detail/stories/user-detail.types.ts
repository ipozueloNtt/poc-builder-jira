export type UserDetailArgs = {
  'button-aria-label': string;
  'clickable': boolean;
  'description': string;
  'initials': string;
  'src-image': string;
  'type': string;
  'user-name': string;
  'defaultSlot': string;
  'athAction': (event: CustomEvent<void>) => void;
};

export const ordererArgs: Partial<UserDetailArgs> = {
  'button-aria-label': undefined,
  'clickable': undefined,
  'description': undefined,
  'initials': undefined,
  'src-image': undefined,
  'type': undefined,
  'defaultSlot': `<div>Default Slot</div>`,
  'user-name': undefined,
};
