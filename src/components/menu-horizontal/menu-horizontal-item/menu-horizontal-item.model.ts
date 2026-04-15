import { TargetTypes } from '../menu-horizontal.model';

export type MenuHorizontalItem = {
  badgeLabel?: string;
  badgeMax?: number;
  badgeValue?: number;
  disabled?: boolean;
  externalLabel?: string;
  href?: string;
  id: string;
  label: string;
  rel?: string;
  selected?: boolean;
  target?: TargetTypes;
  value?: any;
};
