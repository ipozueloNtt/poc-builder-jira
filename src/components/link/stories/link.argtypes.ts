import { ArgTypes } from '@storybook/web-components-vite';
import { linkSize, linkTarget } from '../link.model';
import { iconNamesList } from '@utils/storybook';
import { LinkArgs } from './link.types';

export const linkArgTypes: Partial<ArgTypes<LinkArgs>> = {
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el link está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'icon': {
    control: { type: 'select', labels: { '': '--Sin icono--' } },
    options: ['', ...iconNamesList],
    description: 'Icono el icono a usar si es necesario',
    table: { type: { summary: 'string' } },
  },
  'icon-aria-label': {
    control: { type: 'text' },
    description: 'Indica el texto accesible para el icono',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },

  'link-href': {
    control: { type: 'text' },
    description: 'Define el url del link',
    table: { type: { summary: 'string' } },
  },

  'link-target': {
    control: { type: 'select' },
    options: ['self', 'parent', 'blank', 'top'],
    description: 'Define el target del link',
    table: { type: { summary: 'LinkTarget' } },
    defaultValue: { summary: linkTarget.Blank },
  },

  'size': {
    control: { type: 'inline-radio' },
    options: ['sm', 'md', 'lg'],
    description: 'Define el tamaño del link',
    table: { type: { summary: 'LinkSize' } },
    defaultValue: { summary: linkSize.Md },
  },

  'underline': {
    control: { type: 'boolean' },
    description: 'Indica si el texto del link tiene subrayado. Sólo es posible quitar el subrayado si el link va acompañado de icono.',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
  },

  // Accesibilidad
  'aria-describedby': {
    control: { type: 'text' },
    description: 'Define el id de la descripcion para link',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },
  'aria-label': {
    control: { type: 'text' },
    description: 'Define el texto accesible del link',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },
  'aria-labelledby': {
    control: { type: 'text' },
    description: 'Define el id del texto accesible para el link',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  // Eventos
  'athClick': {
    action: 'athFocus',
    description: 'Se emite al hacer click en el link',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en el link',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco del link',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },

  'defaultSlot': {
    control: { type: 'text' },
    description: 'Default slot para el texto del link',
    table: { type: { summary: 'Slot' }, category: 'SLOTS' },
  },
};
