import { ListOrientationType, ListSizeType } from '../list.model';

export type ListArgs = {
  'clickable': boolean;
  'disabled': boolean;
  'has-divider': boolean;
  'orientation': ListOrientationType;
  'size': ListSizeType;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export type ListItemArgs = {
  'description': string;
  'disabled': boolean;
  'clickable': boolean;
  'ath-aria-label'?: string;
  'external-label': string;
  'heading-text': string;
  'heading-level': number;
  'href'?: string;
  'left-detail': string;
  'rel'?: string;
  'right-detail': string;
  'subtitle': string;
  'target'?: string;
  'tooltip': string;
  'tooltip-max-width': number;
};
