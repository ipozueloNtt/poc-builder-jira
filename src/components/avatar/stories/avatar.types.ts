export type AvatarArgs = {
  'size': string;
  'type': string;
  'avatar-name': string;
  'initials': string;
  'imgSlot': string;
  'aria-label': string;
  'aria-labelledby': string;
};

export const ordererArgs: Partial<AvatarArgs> = {
  'size': undefined,
  'type': undefined,
  'avatar-name': undefined,
  'initials': undefined,
  'imgSlot': '<img slot="img" alt="texto alternativo de la imagen" src="./assets/images/person-shadow.png">',
  'aria-label': undefined,
  'aria-labelledby': undefined,
};
