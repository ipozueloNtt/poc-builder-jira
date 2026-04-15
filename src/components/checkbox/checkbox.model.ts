export type FeedbackTypes = 'none' | 'error' | 'success';
export type CheckboxValues = 'indeterminate' | 'true' | 'false';

export enum FeedbackType {
  None = 'none',
  Error = 'error',
  Success = 'success',
}

export enum CheckboxValue {
  Indeterminate = 'indeterminate',
  True = 'true',
  False = 'false',
}

export enum CheckIconValue {
  Check = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.1822 7.26903C18.5859 7.64592 18.6076 8.27871 18.2308 8.68241L11.1154 16.3041C10.5362 16.9245 9.55827 16.9413 8.95821 16.3412L5.29287 12.6756C4.90236 12.2851 4.90238 11.6519 5.29291 11.2614C5.68345 10.8709 6.31661 10.8709 6.70713 11.2614L10.0066 14.5611L16.7688 7.31759C17.1457 6.91389 17.7785 6.89215 18.1822 7.26903Z" fill="currentColor"/>
    </svg>
    `,
  Indeterminate = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12C6 11.4477 6.44772 11 7 11H17C17.5523 11 18 11.4477 18 12C18 12.5523 17.5523 13 17 13H7C6.44772 13 6 12.5523 6 12Z" fill="currentColor"/>
    </svg>
    `,
}

export interface CheckboxChangeEventDetail {
  label: string;
  name: string;
  value: CheckboxValues;
}
