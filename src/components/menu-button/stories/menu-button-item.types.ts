export type MenuButtonItemArgs = {
  'disabled': boolean;
  'icon': string;
  'name': string;
  'group-name': string;
  'text': string;
  'athSelected'?: (event: CustomEvent<void>) => void;
};

export const ordererArgs: MenuButtonItemArgs = {
  'disabled': undefined,
  'icon': undefined,
  'name': undefined,
  'group-name': undefined,
  'text': undefined,
};
