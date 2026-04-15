import { ValueOf } from '@utils/helper';

export const SegmentedControlTypes = {
  Select: 'select',
  Action: 'action',
} as const;

export const SegmentedControlSizes = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
  Extralarge: 'xl',
} as const;

export const SegmentedControlColors = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const SegmentedControlFeedbackType = {
  None: 'none',
  Error: 'error',
} as const;

export const SegmentedControlItemIconPositions = {
  None: 'none',
  Left: 'left',
  Right: 'right',
  IconOnly: 'icon-only',
} as const;

export type SegmentedControlItemChangeSelect = {
  selected: boolean;
};

export type SegmentedControlType = ValueOf<typeof SegmentedControlTypes>;
export type SegmentedControlSize = ValueOf<typeof SegmentedControlSizes>;
export type SegmentedControlColor = ValueOf<typeof SegmentedControlColors>;
export type SegmentedControlFeedback = ValueOf<typeof SegmentedControlFeedbackType>;
export type SegmentedControlItemIconPosition = ValueOf<typeof SegmentedControlItemIconPositions>;
