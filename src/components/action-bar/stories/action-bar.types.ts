import { ActionBarSize, ActionBarAlignment } from 'components';

export type ActionBarArgs = {
  'alignment': ActionBarAlignment;
  'aria-label': string;
  'aria-labelledby': string;
  'size': ActionBarSize;
  'defaultSlot': string;
};

export const ordererArgs: Partial<ActionBarArgs> = {
  'aria-label': undefined,
  'aria-labelledby': undefined,
  'alignment': undefined,
  'size': undefined,
  'defaultSlot': '',
};
