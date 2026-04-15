export type ChipDismissArgs = {
  'disabled': boolean;
  'icon': string;
  'heading-text': string;
  'size': string;
  'label-dismiss': string;
  'athDismiss': (event: CustomEvent<void>) => void;
};
