import { ArgTypes } from '@storybook/web-components-vite';
import { RadioButtonArgs } from './radio-button.types';

export const radioButtonArgTypes: Partial<ArgTypes<RadioButtonArgs>> = {
  'checked': {
    control: { type: 'boolean' },
    description: 'Indica si el radio-button esta marcado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el radio-button está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'label': {
    control: { type: 'text' },
    description: 'Define el texto para el radio-button',
    table: { type: { summary: 'string' } },
  },
  'name': {
    control: { type: 'text' },
    description: 'Define el nombre del radio-button',
    table: { type: { summary: 'string' } },
  },
  'readonly': {
    control: { type: 'boolean' },
    description: 'Indica si el radio-button es solo lectura',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'value': {
    control: { type: 'text' },
    description: 'Permite indicar el valor del radio-button',
    table: { type: { summary: 'string' } },
  },

  // Accesibilidad
  'aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del input',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  // Eventos
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco del radiobutton',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athChange': {
    action: 'athChange',
    description: 'Se emite cuando el radiobutton pierde el foco',
    table: { type: { summary: 'EventEmitter<RadioButtonChangeDetail>' }, category: 'EVENTS' },
  },
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en el radiobutton',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
};
