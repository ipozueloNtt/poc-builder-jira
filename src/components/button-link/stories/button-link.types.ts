export type ButtonLinkArgs = {
  'color': string;
  'size': string;
  'icon': string;
  'icon-position': string;
  'disabled': boolean;
  'defaultSlot': string;
  'aria-label': string;
  'aria-labelledby': string;
  'aria-controls': string;
  'aria-expanded': string;
  'aria-describedby': string;
  'aria-haspopup': string;
  'autofocus': boolean;
  'athClick': (event: CustomEvent<void>) => void;
  'athFocus': (event: CustomEvent<void>) => void;
  'athBlur': (event: CustomEvent<void>) => void;
};
