export type ChipChoiceGroupArgs = {
  'disabled': boolean;
  'multiple': boolean;
  'name': string;
  'size': string;
  'width': string;
  'aria-label': string;
  'aria-labelledby': string;
  'athChangeValue'?: (event: CustomEvent<HTMLAthChipChoiceElement[]>) => void;
};
