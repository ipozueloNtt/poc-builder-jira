import { ArgTypes } from '@storybook/web-components-vite';
import { AvatarArgs } from './avatar.types';
import { AvatarSizes, AvatarTypes } from '../avatar.model';

export const avatarArgTypes: Partial<ArgTypes<AvatarArgs>> = {
  'avatar-name': {
    control: { type: 'text' },
    description: 'Define nombre del avatar',
    table: { type: { summary: 'string' } },
  },

  'initials': {
    control: { type: 'text' },
    description: 'Define las iniciales',
    table: { type: { summary: 'string' } },
  },
  'size': {
    control: 'inline-radio',
    options: ['xs', 'sm', 'md', 'lg'],
    description: 'Indica el tamaño del avatar',
    table: { type: { summary: 'AvatarSizes' }, defaultValue: { summary: AvatarSizes.Medium } },
  },
  'type': {
    control: { type: 'select', labels: { '': '--Sin tipo definido--' } },
    options: ['', 'default', 'initials', 'image'],
    description:
      'Indica el tipo de avatar. Si no se especifica el tipo, el componente detecta cuál debe emplear en función de la información que se le proporciona (según este orden de preferencia: 1º slot img, 2º initials, 3º avatar-name). Si no se especifica el tipo y tampoco se proporciona ni image ni initials ni avatar-name, muestra el estado default.',
    table: { type: { summary: 'AvatarTypes' }, defaultValue: { summary: AvatarTypes.Default } },
  },

  //Slot
  'imgSlot': {
    control: 'text',
    name: 'img',
    description: 'Slot para un elemento <img>',
    table: { category: 'SLOTS', type: { summary: 'img' } },
  },

  //Accessibility
  'aria-label': {
    control: 'text',
    description: 'Define un texto como nombre accesible, en caso de no rellenar aria-label, ath-avatar usara avatar-name como nombre accesible si este esta rellenado',
    table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
  },

  'aria-labelledby': {
    control: 'text',
    description: 'Identificador del elemento que contiene la etiqueta de accesibilidad que describe al avatar',
    table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
  },
};
