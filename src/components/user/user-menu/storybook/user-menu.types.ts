import { UserMenuType } from '../user-menu.model';

export type UserMenuArgs = {
  'initials': string;
  'open': boolean;
  'defaultSlot': string;
  'src-image': string;
  'type': UserMenuType;
  'user-name': string;
  'athAction'?: (event: CustomEvent<void>) => void;
};

export const ordererArgs: Partial<UserMenuArgs> = {
  'initials': undefined,
  'open': undefined,
  'defaultSlot': `<ath-menu-button-item icon="placeholder" text="Opción1"></ath-menu-button-item>
  <ath-menu-button-item icon="placeholder" text="Opción2"></ath-menu-button-item>
  <ath-menu-button-item icon="placeholder" text="Opción3"></ath-menu-button-item>`,
  'src-image': './assets/images/person-shadow.png',
  'type': undefined,
  'user-name': undefined,
};
