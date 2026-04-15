import { ArgTypes } from '@storybook/web-components-vite';
import { UserDetailArgs } from './user-detail.types';
import { UserDetailTypes } from '../user-detail.model';

export const userDetailArgTypes: Partial<ArgTypes<UserDetailArgs>> = {
  'clickable': {
    control: { type: 'boolean' },
    description: 'Indica si ath-user-detail es clickable',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'description': {
    control: { type: 'text' },
    description: 'Define una descripción',
    table: { type: { summary: 'string' } },
  },

  'initials': {
    control: { type: 'text' },
    description: 'Iniciales del usuario. Se muestra cuando el type es initials. Si no se define, se usan las iniciales que se identifican a partir del user-name',
    table: { type: { summary: 'string' } },
  },

  'src-image': {
    control: { type: 'text' },
    description: 'Indica la ruta de la imagen. Se muestra cuando el type es image.',
    table: { type: { summary: 'string' } },
  },

  'type': {
    control: { type: 'select', labels: { '': '--Sin tipo definido--' } },
    options: Object.values(UserDetailTypes),
    description:
      'Indica el tipo de avatar. Si no se especifica el tipo, el componente detecta cuál debe emplear en función de la información que se le proporciona (según este orden de preferencia: 1º src-image, 2º initials, 3º user-name). Si no se especifica el tipo y tampoco se proporciona ni src-image ni initials ni user-name, muestra el estado default. El type hide-avatar oculta el avatar',
    table: { type: { summary: 'UserDetailType' }, defaultValue: { summary: UserDetailTypes.Default } },
  },

  'user-name': {
    control: { type: 'text' },
    description: 'Indica el nombre del usuario',
    table: { type: { summary: 'string' } },
  },

  'defaultSlot': {
    name: 'default slot',
    control: { type: 'text' },
    description: 'Slot para incluir contenido adicional',
    table: {
      category: 'SLOTS',
    },
  },

  // Events
  'athAction': {
    action: 'athAction',
    description: 'Se emite cuando clickable es true y se pulsa el botón que contiene el user-name',
    table: {
      type: { summary: 'EventEmitter<void>' },
      category: 'EVENTS',
    },
  },

  //Accesibility
  'button-aria-label': {
    control: { type: 'text' },
    description: 'Aria label for button-link',
    table: {
      category: 'SLOTS',
    },
  },
};
