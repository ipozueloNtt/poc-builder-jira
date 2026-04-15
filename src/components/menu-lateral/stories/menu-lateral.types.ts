import { AthMenuLateralItemAction } from '../menu-lateral-item/menu-lateral-item-action';
import { AthMenuLateralItemLink } from '../menu-lateral-item/menu-lateral-item-link';

export type MenuLateralArgs = {
  'aria-label'?: string;
  'athSelected'?: (event: CustomEvent<HTMLAthMenuLateralItemActionElement | HTMLAthMenuLateralItemLinkElement>) => void;
  'items'?: AthMenuLateralItemAction[] | AthMenuLateralItemLink[];
};

export const ordererArgs: MenuLateralArgs = {};
