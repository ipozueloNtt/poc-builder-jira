export type menuItemLinkTarget = 'self' | 'parent' | 'blank' | 'top';

export const menuItemLinkTargets: { [key: string]: menuItemLinkTarget } = {
  Self: 'self',
  Parent: 'parent',
  Blank: 'blank',
  Top: 'top',
} as const;
