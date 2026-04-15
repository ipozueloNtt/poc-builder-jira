export type TooltipColors = 'primary' | 'secondary';
export type TooltipPositions = 'top' | 'bottom' | 'left' | 'right' | 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
export type TooltipTriggers = 'hover' | 'click';

export const TooltipColor = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const TooltipPosition = {
  Top: 'top',
  Right: 'right',
  Bottom: 'bottom',
  Left: 'left',
  TopLeft: 'top-left',
  TopRight: 'top-right',
  BottomLeft: 'bottom-left',
  BottomRight: 'bottom-right',
} as const;

export const TooltipTrigger = {
  Hover: 'hover',
  Click: 'click',
} as const;
