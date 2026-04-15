export type LinkTargetTypes = 'self' | 'blank';
export type MenuLateralItemTypes = 'action' | 'link';

export const TargetType = {
  Blank: 'blank',
  Self: 'self',
} as const;

export const MenuLateralItemType = {
  Action: 'action',
  Link: 'link',
} as const;

export type MenuLateralItem = {
  ariaLabel?: string;
  badgeLabel?: string;
  badgeMax?: number;
  badgeValue?: number;
  disabled?: boolean;
  icon?: string;
  name: string;
  selected?: boolean;
  tooltipText?: string;
  externalLabel?: string;
  href?: string;
  rel?: string;
  target?: LinkTargetTypes;
  type?: MenuLateralItemTypes;
};

export type MenuLateralItemVM = {
  id: string;
  ariaLabel?: string;
  badgeLabel?: string;
  badgeMax?: number;
  badgeValue?: number;
  disabled?: boolean;
  icon?: string;
  name: string;
  selected?: boolean;
  tooltipText?: string;
  externalLabel?: string;
  href?: string;
  rel?: string;
  target?: string;
  type: MenuLateralItemTypes;
};
