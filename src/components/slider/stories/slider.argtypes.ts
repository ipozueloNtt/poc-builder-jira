import { ArgTypes } from '@storybook/web-components-vite';
import { SliderArgs } from './slider.types';

export const SliderArgTypes: Partial<ArgTypes<SliderArgs>> = {
  'counter-width': {
    control: { type: 'text' },
    description: 'Indica el ancho del input-counter',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'auto' } },
  },
  'detail-first': {
    control: { type: 'text' },
    description: 'Define el texto del primer detalle del slider',
    table: { type: { summary: 'string' } },
  },
  'detail-last': {
    control: { type: 'text' },
    description: 'Define el texto del último detalle del slider',
    table: { type: { summary: 'string' } },
  },
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el slider está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'feedback': {
    control: { type: 'inline-radio' },
    options: ['none', 'error'],
    description: 'Indica si se muestra el mensaje de error',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'none' } },
  },
  'feedback-counter': {
    control: { type: 'inline-radio' },
    options: ['none', 'from', 'to', 'both'],
    description: 'Indica si el error es del primer input-counter, del segundo o ambas',
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
  'label-group': {
    control: { type: 'text' },
    description: 'Define el texto del label del slider',
    table: { type: { summary: 'string' } },
  },
  'max': {
    control: { type: 'number' },
    description: 'Especifica el máximo número del slider',
    table: { type: { summary: 'number' } },
  },
  'min': {
    control: { type: 'number' },
    description: 'Especifica el mínimo número del slider',
    table: { type: { summary: 'number' } },
  },
  'name': {
    control: { type: 'text' },
    description: 'Define el nombre del slider',
    table: { type: { summary: 'string' } },
  },
  'readonly': {
    control: { type: 'boolean' },
    description: 'Indica si el slider solo puede ser leído',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'required': {
    control: { type: 'boolean' },
    description: 'Indica si el slider es requerido',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'show-required': {
    control: { type: 'boolean' },
    description:
      'En un formulario en el que todos los campos son requeridos puede no ser necesario mostrar el asterisco en cada campo. Con este atributo, el asterisco puede ser mostrado o no aunque el campo sea requerido (required="true").',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
  },
  'step': {
    control: { type: 'number' },
    description: 'Especifica el número de incremento del slider',
    table: { type: { summary: 'number' } },
  },
  'stepped': {
    control: { type: 'boolean' },
    description: 'Especifica si el slider tiene marcadores de pasos (steps)',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'type': {
    control: { type: 'inline-radio' },
    options: ['default', 'range'],
    description: 'indica el tipo de slider',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'default' } },
  },
  'tooltip-text': {
    control: { type: 'text' },
    description: 'Permite añadir un tooltip al label especificando el texto de dicho tooltip',
    table: { type: { summary: 'string' } },
  },
  'unit': {
    control: { type: 'text' },
    description: 'Permite indicar la unidad del slider',
    table: { type: { summary: 'string' } },
  },
  'value': {
    control: { type: 'text' },
    description: 'Permite indicar el valor actual del slider se puede usar "12" o "[2, 10]" para type range',
    table: { type: { summary: 'string' } },
  },

  // Accesibilidad
  'from-aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del primer input-counter (en caso de ser type range es obligatorio rellenarlo)',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  'group-aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del slider',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  'to-aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del segundo input-counter (en caso de ser type range es obligatorio rellenarlo)',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  'value-text': {
    control: { type: 'text' },
    description: 'Define el atributo aria-valuetext de la manecillas del slider',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },

  // Eventos
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco dentro del slider',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco del slider',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athChange': {
    action: 'athChange',
    description: 'Se emite cuando el valor del slider cambia',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
};
