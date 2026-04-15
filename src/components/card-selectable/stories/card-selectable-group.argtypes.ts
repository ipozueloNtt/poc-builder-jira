import { ArgTypes } from '@storybook/web-components-vite';
import { CardSelectableGroupArgs } from './card-selectable.types';
import { CardSelectableGroupSize } from '../card-selectable-group/card-selectable-group.model';

export const cardSelectableGroupArgTypes: Partial<ArgTypes<CardSelectableGroupArgs>> = {
  'disabled': {
    control: 'boolean',
    description: 'Indica si el grupo está en estado deshabilitado.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'multiple': {
    control: 'boolean',
    description: 'Indica si la selección de cards hijos es de tipo múltiple.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'size': {
    control: 'inline-radio',
    options: Object.values(CardSelectableGroupSize),
    description: 'Tamaño de las card-selectable.',
    table: {
      type: { summary: 'CardSelectableGroupSize' },
      defaultValue: { summary: CardSelectableGroupSize.Small },
    },
  },

  // Slots
  'defaultSlot': {
    control: 'text',
    name: 'default slot',
    description: 'Slot para añadir Grid Layout con cards selectable.',
    table: { category: 'SLOTS', type: { summary: 'string' } },
  },

  // Eventos
  'athValueChanged': {
    action: 'athValueChanged',
    description: 'Se emite al hacer click en la card-selectable.',
    table: { type: { summary: 'EventEmitter<HTMLAthCardSelectableElement[]>' }, category: 'EVENTS' },
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

  'aria-labelledby': {
    control: 'text',
    description: 'proporciona un nombre accesible a un elemento tomando el contenido de uno o más elementos referenciados por sus IDs.',
    table: {
      category: 'ACCESSIBILITY',
      type: { summary: 'string' },
    },
  },
};
