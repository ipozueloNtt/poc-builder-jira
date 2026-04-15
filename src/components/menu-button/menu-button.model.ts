export type Alignments = 'left' | 'right';

export enum Alignment {
  Left = 'left',
  Right = 'right',
}

export type MenuButtonItem = {
  disabled?: boolean;
  icon?: string;
  selected?: boolean;
  text: string;
};
