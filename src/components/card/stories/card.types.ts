export type CardArgs = {
  'size': string;
  'orientation': string;
  'clickable': boolean;
  'fluid': boolean;
  'width': string;
  'thumbnailSlot'?: string;
  'headerSlot'?: string;
  'bodySlot'?: string;
  'footerSlot'?: string;
  'imgSlot'?: string;
  'max-width': string;
  'tagSlot'?: string;
  'athClick'?: (event: CustomEvent<void>) => void;
  'athFocus'?: (event: CustomEvent<void>) => void;
  'athBlur'?: (event: CustomEvent<void>) => void;
};

export type CardThumbnailArgs = {
  'top-tag': string;
  'bottom-tag': string;
  'type': string;
  'imgThumbnailSlot'?: string;
  'avatarSlot'?: string;
  'highlight-text': string;
};

export type CardHeaderArgs = {
  'heading-text': string;
  'date': string;
  'overline': string;
  'subtitle': string;
};

export enum CardDefaultSlot {
  thumbnailSlot = '<ath-card-thumbnail slot="thumbnail"><img slot="img-thumbnail" alt="texto alternativo de la imagen" src="./assets/images/image.jpg"/></ath-card-thumbnail>',
  headerSlot = '<ath-card-header slot="header" heading-text="Title" date="01/01/9999" subtitle="Subtitle" overline="Overline" ></ath-card-header>',
  bodySlot = '<div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>',
  imgSlot = '<ath-icon slot="img" icon="placeholder"></ath-icon>',
  tagSlot = '<ath-tag slot="tag" heading-text="tag"></ath-tag>',
  imgThumbnailSlot = '<img slot="img-thumbnail" alt="texto alternativo de la imagen" src="./assets/images/image.jpg">',
  avatarSlot = '<div slot="avatar" style="background: #E8E3FF; height: 100%; width: 100%; display: flex; text-align: center; align-items: center;">avatar slot</div>',
}
