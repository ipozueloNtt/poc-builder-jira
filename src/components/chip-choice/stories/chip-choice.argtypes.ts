import { ArgTypes } from '@storybook/web-components-vite';
import { ChipChoiceRole, ChipChoiceSize } from '../chip-choice.model';
import { iconNamesList } from '@utils/storybook';
import { ChipChoiceArgs } from './chip-choice.types';

export const chipChoiceArgTypes: Partial<ArgTypes<ChipChoiceArgs>> = {
  'selected': {
    control: { type: 'boolean' },
    description: 'Indica si el chip esta seleccionado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el chip está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },

  'icon': {
    control: { type: 'select', labels: { '': '--Sin icono--' } },
    options: ['', ...iconNamesList],
    description: 'Indica el nombre del icono a incluir en el chip, que debe existir en la Galería de iconos',
    table: {
      type: { summary: 'string' },
    },
  },

  'label': {
    control: { type: 'text' },
    description: 'Define el texto del chip',
    table: { type: { summary: 'string' } },
  },

  'name': {
    control: { type: 'text' },
    description: 'Nombre del campo para asociar el chip con formularios HTML. Útil para agrupar chips relacionados',
    table: { type: { summary: 'string' } },
  },

  'role': {
    control: { type: 'inline-radio' },
    options: ['checkbox', 'radio'],
    description: 'Indica el rol del chip. Este valor se asigna automáticamente según la propiedad multiple del grupo al que pertenece',
    table: {
      type: { summary: 'ChipChoiceRoles' },
      defaultValue: { summary: ChipChoiceRole.Checkbox },
    },
  },

  'size': {
    control: { type: 'inline-radio' },
    options: ['sm', 'md'],
    description: 'Indica el tamaño del chip',
    table: {
      type: { summary: 'ChipChoiceSizes' },
      defaultValue: { summary: ChipChoiceSize.Medium },
    },
  },

  'value': {
    control: { type: 'text' },
    description: 'Valor asociado al chip que se enviará en formularios HTML cuando esté seleccionado',
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
    control: { type: 'text' },
    description: 'Identificador de la etiqueta que contiene una descripción adicional',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },

  // Eventos
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en el chip',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco del chip',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athChange': {
    action: 'athChange',
    description: 'Se emite cuando el valor del chip cambia',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
};
