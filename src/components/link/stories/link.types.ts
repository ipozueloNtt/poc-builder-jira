export type LinkArgs = {
  'aria-describedby': string;
  'aria-label': string;
  'aria-labelledby': string;
  'defaultSlot'?: string;
  'disabled': boolean;
  'icon': string;
  'icon-aria-label': string;
  'link-href': string;
  'link-target': string;
  'size': string;
  'underline': boolean;
  'athClick'?: (event: CustomEvent<void>) => void;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
};

export const ordererArgs: Partial<LinkArgs> = {
  'aria-describedby': undefined,
  'aria-label': undefined,
  'aria-labelledby': undefined,
  'disabled': undefined,
  'icon': undefined,
  'icon-aria-label': undefined,
  'link-href': undefined,
  'link-target': undefined,
  'size': undefined,
  'underline': undefined,
  'defaultSlot': undefined,
};
