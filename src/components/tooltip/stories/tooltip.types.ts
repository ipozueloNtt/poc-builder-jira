export type TooltipArgs = {
  'color': string;
  'defaultSlot': string;
  'has-arrow': boolean;
  'heading-text': string;
  'position': string;
  'max-width': number;
  'trigger': string;
  'trigger-text': string;
};

export type TooltipTriggerArgs = {
  'icon': string;
  'size': string;
  'aria-label': string;
  'athClick': () => void;
  'athFocus': () => void;
  'athBlur': () => void;
};
