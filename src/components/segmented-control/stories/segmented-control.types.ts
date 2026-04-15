import { SegmentedControlColors, SegmentedControlFeedbackType, SegmentedControlItemChangeSelect, SegmentedControlSizes, SegmentedControlTypes } from '../segmented-control.model';

export type SegmentedControlArgs = {
  'color': string;
  'disabled': boolean;
  'feedback': string;
  'feedback-text': string;
  'helper-text': string;
  'label': string;
  'required': boolean;
  'hide-required': boolean;
  'required-aria-label': string;
  'size': string;
  'tooltip-text': string;
  'tooltip-width': number;
  'type': string;
  'value': string;
  'aria-label': string;
  'athChangeValue'?: (event: CustomEvent<SegmentedControlItemChangeSelect>) => void;
};

export const defaultArgs: Partial<SegmentedControlArgs> = {
  'color': SegmentedControlColors.Primary,
  'disabled': false,
  'feedback': SegmentedControlFeedbackType.None,
  'feedback-text': undefined,
  'helper-text': undefined,
  'label': 'Label',
  'required': false,
  'hide-required': undefined,
  'required-aria-label': undefined,
  'size': SegmentedControlSizes.Medium,
  'tooltip-text': undefined,
  'tooltip-width': undefined,
  'type': SegmentedControlTypes.Select,
  'aria-label': undefined,
  'value': undefined,
};
