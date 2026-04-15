import { MenuHorizontalItem } from '../menu-horizontal-item/menu-horizontal-item.model';
import { TargetTypes } from '../menu-horizontal.model';

export type MenuHorizontalArgs = {
  'items'?: MenuHorizontalItem[];
  'ath-aria-label'?: string;
  'has-divider'?: boolean;
  'defaultSlot': string;
  'athSelected'?: (event: CustomEvent<void>) => void;
};

export type MenuHorizontalItemArgs = {
  'badge-label'?: string;
  'badge-max'?: number;
  'badge-value'?: number;
  'disabled': boolean;
  'external-label': string;
  'href': string;
  'label': string;
  'selected': boolean;
  'target': TargetTypes;
  'value': string;
};
