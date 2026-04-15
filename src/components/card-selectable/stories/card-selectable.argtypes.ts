import { ArgTypes } from '@storybook/web-components-vite';
import { CardSelectableArgs } from './card-selectable.types';
import { CardSelectableSize, CardSelectableType } from '../card-selectable.model';

export const cardSelectableArgTypes: Partial<ArgTypes<CardSelectableArgs>> = {
  'disabled': {
    control: 'boolean',
    description: 'Indica si la card-selectable está en estado deshabilitado.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'heading-text': {
    control: 'text',
    description: 'Titulo de la card-selectable.',
    table: {
      type: { summary: 'string' },
    },
  },

  'subtitle': {
    control: 'text',
    description: 'Subtítulo de la card-selectable.',
    table: {
      type: { summary: 'string' },
    },
  },

  'tag': {
    control: 'text',
    description: 'Tag para la card-selectable.',
    table: {
      type: { summary: 'string' },
    },
  },

  'overline': {
    control: 'text',
    description: 'Overline de la card-selectable.',
    table: {
      type: { summary: 'string' },
    },
  },

  'selected': {
    control: 'boolean',
    description: 'Indica si la card-selectable está seleccionada.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'size': {
    control: 'inline-radio',
    options: Object.values(CardSelectableSize),
    description: 'Tamaño de la card-selectable.',
    table: {
      type: { summary: 'CardSelectableSizes' },
      defaultValue: { summary: CardSelectableSize.Small },
    },
  },

  'type': {
    control: 'inline-radio',
    options: Object.values(CardSelectableType),
    description: 'Indica el tipo de card-selectable',
    table: {
      type: { summary: 'CardSelectableTypes' },
      defaultValue: { summary: CardSelectableType.Single },
    },
  },

  // Slots
  'bodySlot': {
    control: 'text',
    name: 'body',
    description: 'Slot para añadir texto u otros elementos dentro de la card-selectable.',
    table: { category: 'SLOTS', type: { summary: 'string' } },
  },

  // Eventos
  'athChange': {
    action: 'athChange',
    description: 'Se emite al hacer click en la card-selectable.',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en la card-selectable.',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco de la card-selectable.',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },

  // Accesibilidad

  'aria-label': {
    control: 'text',
    description: 'Proporciona una etiqueta accesible a la card, es obligatorio en caso de que la propiedad headline no este rellena.',
    table: {
      category: 'ACCESSIBILITY',
      type: { summary: 'string' },
    },
  },
};
