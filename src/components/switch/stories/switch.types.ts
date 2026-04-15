export type SwitchArgs = {
  'disabled': boolean;
  'name': string;
  'readonly': boolean;
  'selected': boolean;
  'athFocus': (event: CustomEvent<void>) => void;
  'athBlur': (event: CustomEvent<void>) => void;
  'athChange': (event: CustomEvent<void>) => void;
  'aria-label': string;
  'aria-labelledby': string;
  'aria-describedby': string;
  'setFocus': () => Promise<void>;
};
