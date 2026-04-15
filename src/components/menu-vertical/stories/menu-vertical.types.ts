export type MenuVerticalArgs = {
  'appearance': string;
  'aria-label': string;
  'aria-labelledby': string;
  'athSelected'?: (event: CustomEvent<void>) => void;
  'defaultSlot': string;
};

export const orderedArgs: Partial<MenuVerticalArgs> = {
  appearance: undefined,
};

type MenuItemBase = {
  id?: string;
  tagName: string;
  text?: string;
  selected?: boolean;
  disabled?: boolean;
  open?: boolean;
  ariaLabel?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaLabelledby?: string;
  icon?: string;
  value?: string;
  children?: MenuItem[];
};

type MenuItemLink = MenuItemBase & {
  tagName: 'ath-MENU-VERTICAL-ITEM-LINK';
  href?: string;
  target?: 'self' | 'parent' | 'blank' | 'top';
  rel?: string;
  externalLabel?: string;
};

type MenuItemAction = MenuItemBase & {
  tagName: 'ath-MENU-VERTICAL-ITEM-ACTION';
};

export type MenuItem = MenuItemLink | MenuItemAction;
