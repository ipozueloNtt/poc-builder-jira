import { ValueOf } from '@utils/helper';

export const AccordionExpands = {
  All: 'all',
  One: 'one',
} as const;

export type AccordionExpand = ValueOf<typeof AccordionExpands>;
