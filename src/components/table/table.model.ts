import { ValueOf } from '@utils/helper';
import { CheckboxValues } from '../checkbox/checkbox.model';

export type TableSelectionChangeEvent = { selectedIndexes: number[]; selectedValues: any[] };
export type TableRowSelectionChangeEvent = { selected: boolean };

export type TableClickEvent = { rowIndex: number; rowValue: any; rowId?: string };
export type TableRowClickEvent = { rowValue: any; rowId?: string };

export type TableSelectAllChangeEvent = { selectAll: boolean; state: CheckboxValues };

export const TableSize = {
  Small: 'sm',
  Medium: 'md',
  Large: 'lg',
} as const;

export const TableColor = {
  Primary: 'primary',
  Secondary: 'secondary',
} as const;

export const TableFrozen = {
  None: 'none',
  First: 'first',
  Last: 'last',
} as const;

export const TableAlignment = {
  Left: 'left',
  Center: 'center',
  Right: 'right',
} as const;

export const TableStriping = {
  None: 'none',
  Rows: 'rows',
  Columns: 'columns',
} as const;

export const TableSelectable = {
  None: 'none',
  Single: 'single',
  Multiple: 'multiple',
} as const;

export type TableSizeType = ValueOf<typeof TableSize>;
export type TableColorType = ValueOf<typeof TableColor>;
export type TableFrozenType = ValueOf<typeof TableFrozen>;
export type TableAlignmentType = ValueOf<typeof TableAlignment>;
export type TableStripingType = ValueOf<typeof TableStriping>;
export type TableSelectableType = ValueOf<typeof TableSelectable>;
