import { TabItem } from '../tabs.model';

export type TabsArgs = {
  'items'?: TabItem[];
  'type': string;
  'list-aria-label': string;
  'actionsSlot': string;
  'defaultSlot': string;
};

export type TabArgs = {
  'disabled': boolean;
  'icon': string;
  'label': string;
  'icon-aria-label': string;
  'selected': boolean;
};

export type PanelArgs = {
  focusable?: boolean;
  label: string;
  actionsSlot: string;
  defaultSlot: string;
};
