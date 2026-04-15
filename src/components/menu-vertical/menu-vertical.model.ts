export type MenuVerticalAppearance = 'primary' | 'secondary';

export const MenuVerticalAppearances: { [key: string]: MenuVerticalAppearance } = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;
