export type SliderFeedbackType = 'error' | 'none';
export type SliderType = 'default' | 'range';
export type SliderFeedbackErrorCounterType = 'none' | 'from' | 'to' | 'both';

export const SliderFeedbackTypes: { [key: string]: SliderFeedbackType } = {
  Error: 'error',
  None: 'none',
} as const;

export const SliderTypes: { [key: string]: SliderType } = {
  Default: 'default',
  Range: 'range',
} as const;

export const SliderFeedbackErrorCounterTypes: { [key: string]: SliderFeedbackErrorCounterType } = {
  None: 'none',
  From: 'from',
  To: 'to',
  Both: 'both',
} as const;
