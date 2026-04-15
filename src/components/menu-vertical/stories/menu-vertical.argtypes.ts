import { ArgTypes } from '@storybook/web-components-vite';
import { MenuVerticalArgs } from './menu-vertical.types';
import { MenuVerticalItemActionArgs } from './menu-vertical-item-action.types';
import { MenuVerticalItemLinkArgs } from './menu-vertical-item-link.types';
import { iconNamesList } from '@utils/storybook';

export const menuVerticalArgTypes: Partial<ArgTypes<MenuVerticalArgs>> = {
  'appearance': {
    control: { type: 'select' },
    options: ['primary', 'secondary'],
    description: 'Indica la apariencia del menú vertical',
    table: {
      defaultValue: { summary: 'primary' },
    },
  },
  'aria-label': {
    control: { type: 'text' },
    description: 'Etiqueta de accesibilidad para describir el menú',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },
  'aria-labelledby': {
    control: { type: 'text' },
    description: 'Identificador del elemento que contiene la etiqueta de accesibilidad que describe el menú',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },
  'athSelected': {
    action: 'athSelected',
    description: 'Se emite al hacer clic en un item',
    table: {
      type: { summary: 'EventEmitter<MenuItem>' },
      category: 'EVENTS',
    },
  },
  'defaultSlot': {
    control: 'text',
    name: 'default slot',
    description: 'Contenido para el slot por defecto del menú vertical.',
    table: {
      type: { summary: 'string' },
      category: 'SLOTS',
    },
  },
};

export const menuVerticalItemActionArgTypes: Partial<ArgTypes<MenuVerticalItemActionArgs>> = {
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el ítem está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'icon': {
    control: { type: 'select', labels: { '': '--Sin icono--' } },
    options: ['', ...iconNamesList],
    description: 'Indica el nombre del icono a incluir en el menú, que debe existir en la galería de iconos. Esta propiedad solo es aplicable a los ítems en el nivel 1.',
    table: {
      type: { summary: 'string' },
    },
  },

  'selected': {
    control: { type: 'boolean' },
    description: 'Indica si el botón del menú está seleccionado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'text': {
    control: { type: 'text' },
    description: 'Define el texto del boton',
    table: { type: { summary: 'string' } },
  },

  'value': {
    control: { type: 'text' },
    description: 'Valor identificativo del ítem',
    table: { type: { summary: 'string' } },
  },

  // Accesibilidad
  'aria-label': {
    control: { type: 'text' },
    description: 'Etiqueta de accesibilidad para describir el elemento',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },
};

export const menuVerticalItemLinkArgTypes: Partial<ArgTypes<MenuVerticalItemLinkArgs>> = {
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el botón del menú está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'external-label': {
    control: { type: 'text' },
    description: 'Indica la etiqueta de enlaces externos',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'Se abre en una nueva ventana' } },
  },

  'href': {
    control: { type: 'text' },
    description: 'Indica la URL',
    table: { type: { summary: 'string' } },
  },

  'icon': {
    control: { type: 'select', labels: { '': '--Sin icono--' } },
    options: ['', ...iconNamesList],
    description:
      'Indica el nombre del icono a incluir en el item, que debe existir en la galería de iconos. Esta propiedad se debe aplicar siempre a los ítems en el nivel 1. En caso de no especificarse se aplicará automáticamente el icono "placeholder"',
    table: {
      type: { summary: 'string' },
    },
  },

  'rel': {
    control: { type: 'text' },
    description: 'Indica la relación entre la página actual y la de destino',
    table: { type: { summary: "'stylesheet' | 'prev' | 'next' | 'nofollow' | 'sponsored' | 'ugc'" } },
  },

  'selected': {
    control: { type: 'boolean' },
    description: 'Indica si el botón del menú está seleccionado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'target': {
    control: { type: 'select' },
    options: ['blank', 'self'],
    description: 'Indica si la URL debe abrirse en la misma ventana o en una nueva',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'blank' },
    },
  },

  'text': {
    control: { type: 'text' },
    description: 'Define el texto del boton',
    table: { type: { summary: 'string' } },
  },

  'value': {
    control: { type: 'text' },
    description: 'Valor identificativo del ítem',
    table: { type: { summary: 'string' } },
  },

  // Accesibilidad
  'aria-label': {
    control: { type: 'text' },
    description: 'Etiqueta de accesibilidad para describir el elemento',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },

  'aria-labelledby': {
    control: 'text',
    description: 'Identificador del elemento que contiene la etiqueta de accesibilidad que describe al botón',
    table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
  },
};
