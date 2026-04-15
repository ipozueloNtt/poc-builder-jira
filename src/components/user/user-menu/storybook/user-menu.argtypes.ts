import { ArgTypes } from '@storybook/web-components-vite';
import { UserMenuArgs } from './user-menu.types';
import { UserMenuTypes } from '../user-menu.model';

export const UserMenuArgTypes: Partial<ArgTypes<UserMenuArgs>> = {
  'initials': {
    control: { type: 'text' },
    description: 'Define las iniciales, cuando el type es "initials". Si no se define, se identificarán las iniciales por el user-name',
    table: { type: { summary: 'string' } },
  },
  'open': {
    control: 'boolean',
    description: 'Indica si el menú está abierto',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },
  'src-image': {
    control: { type: 'text' },
    description: 'Indica la url de la imagen de usuario, cuando el type es "image"',
    table: { type: { summary: 'string' } },
  },

  'type': {
    control: { type: 'select', labels: { '': '--Sin tipo definido--' } },
    options: Object.values(UserMenuTypes),
    description:
      'Indica el tipo de avatar. Si no se especifica el tipo, el componente detecta cuál debe emplear en función de la información que se le proporciona (según este orden de preferencia: 1º src-image, 2º initials, 3º user-name). Si no se especifica el tipo y tampoco se proporciona ni src-image ni initials ni user-name, muestra el estado default. El type hide-avatar oculta el avatar.',
    table: { type: { summary: 'UserMenuType' }, defaultValue: { summary: UserMenuTypes.Default } },
  },

  'user-name': {
    control: { type: 'text' },
    description: 'Indica el nombre del usuario',
    table: { type: { summary: 'string' } },
  },

  //Slot
  'defaultSlot': {
    name: 'default slot',
    control: 'text',
    description: 'Slot para incluir las opciones del menu, con elementos <ath-menu-button-item>. [Ver propiedades](/?path=/docs/componentes-menu-button-menu-button-item--docs)',
    table: { category: 'SLOTS', type: { summary: '<ath-menu-button-item>' } },
  },

  'athAction': {
    action: 'athAction',
    description: 'Se emite al hacer clic en un item',
    table: {
      type: { summary: 'EventEmitter<HTMLAthMenuButtonItemElement>' },
      category: 'EVENTS',
    },
  },
};
