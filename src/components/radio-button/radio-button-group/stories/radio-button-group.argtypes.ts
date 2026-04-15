import { ArgTypes } from '@storybook/web-components-vite';
import { RadioButtonGroupArgs } from './radio-button-group.types';

export const radioButtonGroupArgTypes: Partial<ArgTypes<RadioButtonGroupArgs>> = {
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el grupo está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'feedback': {
    control: { type: 'inline-radio' },
    options: ['none', 'error'],
    description: 'Indica si se muestra el mensaje de error',
    table: { type: { summary: 'FeedbackType' }, defaultValue: { summary: 'none' } },
  },
  'feedback-text': {
    control: { type: 'text' },
    description: 'Define el texto para el texto feedback',
    table: { type: { summary: 'string' } },
  },
  'helper-text': {
    control: { type: 'text' },
    description: 'Define el texto para el helper',
    table: { type: { summary: 'string' } },
  },
  'label': {
    control: { type: 'text' },
    description: 'Define el texto para el label',
    table: { type: { summary: 'string' } },
  },
  'name': {
    control: { type: 'text' },
    description: 'Define el nombre del grupo',
    table: { type: { summary: 'string' } },
  },
  'orientation': {
    control: { type: 'inline-radio' },
    options: ['vertical', 'horizontal'],
    description: 'Indica la horientación del grupo',
    table: { type: { summary: 'OrientationType' }, defaultValue: { summary: 'vertical' } },
  },
  'readonly': {
    control: { type: 'boolean' },
    description: 'Indica si los radio-button son solo de lectura',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'show-required': {
    control: { type: 'boolean' },
    description: 'Indica si se muestra el asterisco',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'tooltip-text': {
    control: { type: 'text' },
    description: 'Define el texto para el tooltip',
    table: { type: { summary: 'string' } },
  },
  'tooltip-width': {
    control: { type: 'number' },
    description: 'Define el ancho del tooltip',
    table: { type: { summary: 'number' } },
  },

  // Eventos
  'athChangeValue': {
    action: 'athChangeValue',
    description: 'Se emite cuando cualquier radio-button cambia su valor',
    table: { type: { summary: 'EventEmitter<string>' }, category: 'EVENTS' },
  },

  // Accesibilidad
  'aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del input',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  'required-aria-label': {
    control: { type: 'text' },
    description: 'Define el texto accesible del asterisco',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },
};
