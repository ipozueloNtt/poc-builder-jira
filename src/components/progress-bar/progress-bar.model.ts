import { ValueOf } from '@utils/helper';

export const ProgressBarLabelAlignment = {
    Inline: 'inline',
    Stack: 'stack',
} as const;

export type ProgressBarLabelAlignmentType = ValueOf<typeof ProgressBarLabelAlignment>;