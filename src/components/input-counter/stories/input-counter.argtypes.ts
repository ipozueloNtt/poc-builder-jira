import { ArgTypes } from '@storybook/web-components-vite';
import { InputCounterSizes } from '../input-counter.model';
import { InputCounterArgs } from './input-counter.types';

export const inputCounterArgTypes: Partial<ArgTypes<InputCounterArgs>> = {
  'hide-controls': {
    control: { type: 'boolean' },
    description: 'Indica si se ocultan los controles',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el input está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'feedback': {
    control: { type: 'inline-radio' },
    options: ['none', 'error'],
    description: 'Indica si se muestra el mensaje de error',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'none' } },
  },
  'feedback-text': {
    control: { type: 'text' },
    description: 'Define el texto de error',
    table: { type: { summary: 'string' } },
  },
  'helper-text': {
    control: { type: 'text' },
    description: 'Define el texto de ayuda',
    table: { type: { summary: 'string' } },
  },
  'label': {
    control: { type: 'text' },
    description: 'Define el texto del label del input',
    table: { type: { summary: 'string' } },
  },
  'max': {
    control: { type: 'number' },
    description: 'Especifica el máximo número del input',
    table: { type: { summary: 'number' } },
  },
  'min': {
    control: { type: 'number' },
    description: 'Especifica el mínimo número del input',
    table: { type: { summary: 'number' } },
  },
  'name': {
    control: { type: 'text' },
    description: 'Define el nombre del input',
    table: { type: { summary: 'string' } },
  },
  'placeholder': {
    control: { type: 'text' },
    description: 'Especifica el placeholder',
    table: { type: { summary: 'string' } },
  },
  'readonly': {
    control: { type: 'boolean' },
    description: 'Indica si el input solo puede ser leído',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'required': {
    control: { type: 'boolean' },
    description: 'Indica si el input es requerido',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'hide-required': {
    control: { type: 'boolean' },
    description:
      'En un formulario en el que todos los campos son requeridos puede no ser necesario mostrar el asterisco en cada campo. Con este atributo, el asterisco puede ser ocultado o no aunque el campo sea requerido (required).',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'size': {
    control: { type: 'inline-radio' },
    options: ['sm', 'md', 'lg'],
    description: 'Indica el tamaño del input',
    table: {
      type: { summary: 'InputSize' },
      defaultValue: { summary: InputCounterSizes.Medium },
    },
  },
  'step': {
    control: { type: 'number' },
    description: 'Especifica el número de incremento del input',
    table: { type: { summary: 'number' } },
  },
  'tooltip-text': {
    control: { type: 'text' },
    description: 'Permite añadir un tooltip al label especificando el texto de dicho tooltip',
    table: { type: { summary: 'string' } },
  },
  'tooltip-width': {
    control: { type: 'number' },
    description: 'Especifica la anchura máxima de la linea del texto del tooltip. El valor 0 indica que no hay anchura máxima definida.',
    table: { type: { summary: 'number' } },
  },
  'unit': {
    control: { type: 'text' },
    description: 'Permite indicar la unidad del input',
    table: { type: { summary: 'string' } },
  },
  'value': {
    control: { type: 'text' },
    description: 'Permite indicar el valor actual del input',
    table: { type: { summary: 'string' } },
  },

  // Accesibilidad
  'input-aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del input',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },
  'unit-aria-label': {
    control: { type: 'text' },
    description: 'Permite indicar un texto accesible para la unidad del input',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  // Eventos
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en el input',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco del input',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athChange': {
    action: 'athChange',
    description: 'Se emite el valor actual del input cuando este cambia (al perder el foco).',
    table: { type: { summary: 'EventEmitter<string>' }, category: 'EVENTS' },
  },
  'athInput': {
    action: 'athInput',
    description: 'Se emite cuando el valor del input cambia sin necesidad de perder el foco. Se activa con cada pulsación de teclado, corte, pegado, etc.',
    table: { type: { summary: 'EventEmitter<string>' }, category: 'EVENTS' },
  },
};
