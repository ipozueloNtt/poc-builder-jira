export type TabsType = 'underline' | 'box';

export const TabsTypes = {
  Underline: 'underline',
  Box: 'box',
} as const;

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  icon?: string;
  iconAriaLabel?: string;
  selected?: boolean;
}
