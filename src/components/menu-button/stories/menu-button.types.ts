export type MenuButtonArgs = {
  'alignment': string;
  'autofocus': boolean;
  'clear': boolean;
  'color': string;
  'disabled': boolean;
  'icon': string;
  'open': boolean;
  'size': string;
  'overlay-max-height': string;
  'ath-aria-label': string;
  'athAction'?: (event: CustomEvent<void>) => void;
};

export const ordererArgs: MenuButtonArgs = {
  'alignment': undefined,
  'autofocus': undefined,
  'clear': undefined,
  'color': undefined,
  'disabled': undefined,
  'icon': undefined,
  'open': undefined,
  'size': undefined,
  'overlay-max-height': undefined,
  'ath-aria-label': undefined,
};
