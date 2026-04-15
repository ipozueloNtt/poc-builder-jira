export type CalendarArgs = {
  'color': string;
  'disabled-dates': string;
  'highlighted-dates': string;
  'highlighted-weekends': boolean;
  'max': string;
  'min': string;
  'selected': string;
  'type': string;
  'athChange'?: (event: CustomEvent<void>) => void;
};
