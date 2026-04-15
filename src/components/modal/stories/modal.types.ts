import { ModalAppearanceType, ModalSizeType } from '../modal.model';

export type ModalArgs = {
  'appearance': ModalAppearanceType;
  'autofocus': boolean;
  'click-outside-close': boolean;
  'defaultBodySlot': string;
  'defaultFooterSlot': string;
  'full-screen': boolean;
  'has-close': boolean;
  'has-divider': boolean;
  'heading-text': string;
  'is-alert': boolean;
  'max-height': string;
  'max-width': string;
  'open': boolean;
  'size': ModalSizeType;
  'subtitle-text': string;
  'close-aria-label': string;
  'heading-level': number;
  'athOpened'?: (event: CustomEvent<void>) => void;
  'athClosed'?: (event: CustomEvent<void>) => void;
  'openModal'?: () => void;
  'closeModal'?: () => void;
};

export const orderedArgs: Partial<ModalArgs> = {
  'appearance': undefined,
  'autofocus': undefined,
  'click-outside-close': undefined,
  'defaultBodySlot': '',
  'defaultFooterSlot': '',
  'full-screen': undefined,
  'has-close': undefined,
  'has-divider': undefined,
  'heading-text': undefined,
  'is-alert': undefined,
  'max-height': undefined,
  'max-width': undefined,
  'open': undefined,
  'size': undefined,
  'subtitle-text': undefined,
  'close-aria-label': undefined,
  'heading-level': undefined,
};
