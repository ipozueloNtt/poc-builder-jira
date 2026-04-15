export type AlertColors = 'info' | 'danger' | 'warning' | 'success';
export type AlertColorsClose = 'info' | 'error' | 'warning' | 'success';
export type AlertTypes = 'section' | 'page';

export const AlertColor = {
  Info: 'info',
  Danger: 'danger',
  Warning: 'warning',
  Success: 'success',
} as const;

export const AlertColorClose = {
  Info: 'info',
  Danger: 'error',
  Warning: 'warning',
  Success: 'success',
} as const;

export const AlertType = {
  Page: 'page',
  Section: 'section',
} as const;
