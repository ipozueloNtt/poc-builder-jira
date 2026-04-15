import { LinkTargetTypes } from '../menu-lateral.model';

export type MenuLateralItemArgs = {
  'badge-label': string;
  'badge-max': number;
  'badge-value': number;
  'disabled': boolean;
  'icon': string;
  'name': string;
  'selected': boolean;
  'tooltip-text': string;
  'external-label': string;
  'href': string;
  'rel': string;
  'target': LinkTargetTypes;
};

export const ordererArgs: MenuLateralItemArgs = {
  'badge-label': undefined,
  'badge-max': undefined,
  'badge-value': undefined,
  'disabled': undefined,
  'icon': undefined,
  'name': undefined,
  'selected': undefined,
  'tooltip-text': undefined,
  'external-label': undefined,
  'href': undefined,
  'rel': undefined,
  'target': undefined,
};
