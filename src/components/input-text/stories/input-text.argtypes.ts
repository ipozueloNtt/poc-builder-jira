import { ArgTypes } from '@storybook/web-components-vite';
import { InputSizes, InputTextTypes } from '../input-text.model';
import { iconNamesList } from '@utils/storybook';
import { InputTextArgs } from './input-text.types';

export const inputTextArgTypes: Partial<ArgTypes<InputTextArgs>> = {
  'autofocus': {
    control: { type: 'boolean' },
    description: 'Indica si el input tiene inicialmente el foco',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'autocomplete': {
    control: { type: 'text' },
    description:
      'Indica al navegador el tipo de información del usuario que proporciona el campo, para permitir autocompletado. ' +
      '<br> Se recomienda consultar en MDN la lista de valores permitidos',
    table: { type: { summary: 'string' } },
  },
  'counter': {
    control: { type: 'boolean' },
    description: 'Indica si hay contador de caracteres',
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
  'has-clear': {
    control: { type: 'boolean' },
    description: 'Indica si se incluye un botón para limpiar el valor del input',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'helper-text': {
    control: { type: 'text' },
    description: 'Define el texto de ayuda',
    table: { type: { summary: 'string' } },
  },
  'icon': {
    control: { type: 'select', labels: { '': '--Sin icono--' } },
    options: ['', ...iconNamesList],
    description: 'Indica un icono para ser mostrado a un lado del input',
    table: { type: { summary: 'string' } },
  },
  'icon-position': {
    control: { type: 'inline-radio' },
    options: ['left', 'right'],
    description: 'Especifica la posición del icono respecto del input. (Excepción: El tipo Search no permite añadir un icono a la derecha).',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'left' } },
  },
  'label': {
    control: { type: 'text' },
    description: 'Define el texto del label del input',
    table: { type: { summary: 'string' } },
  },
  'maxlength': {
    control: { type: 'number' },
    description: 'Especifica la longitud máxima del texto del input',
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
    description: 'Indica si el input solo puede ser leido',
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
      'En un formulario en el que todos los campos son requeridos puede no ser necesario mostrar el asterisco en cada campo. Con este atributo, el asterisco puede ser mostrado o no aunque el campo sea requerido (required).',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
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
  'type': {
    control: { type: 'select' },
    options: ['text', 'search', 'url', 'email', 'tel'],
    description: 'Indica el tipo de contenido del input',
    table: {
      type: { summary: 'InputTextType' },
      defaultValue: { summary: InputTextTypes.Text },
    },
  },
  'size': {
    control: { type: 'inline-radio' },
    options: ['sm', 'md', 'lg'],
    description: 'Indica el tamaño del input',
    table: {
      type: { summary: 'InputSize' },
      defaultValue: { summary: InputSizes.Medium },
    },
  },
  'submit-on-enter': {
    control: { type: 'boolean' },
    description: 'Indica si se debe lanzar el submit del formulario al pulsar la tecla Enter en el input',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'value': {
    control: { type: 'text' },
    description: 'Permite indicar el valor actual del input',
    table: { type: { summary: 'string' } },
  },

  // Accesibilidad
  'clear-button-aria-label': {
    control: { type: 'text' },
    description: 'Define el texto accesible del botón de borrado del input',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },
  'counter-label': {
    control: { type: 'text' },
    description:
      'Permite cambiar el texto accesible del contador. Los términos [length], [max] y [rest] serán sustituídos automáticamente por el nº de de caracteres empleados, el máximo permitido y el nº de caracteres restantes',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
      defaultValue: { summary: '[length] de [max] caracteres. Quedan [rest]' },
    },
  },
  'input-aria-label': {
    control: { type: 'text' },
    description: 'Define el atributo aria-label del input',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
  },
  'input-tabindex': {
    control: { type: 'inline-radio' },
    options: ['-1', '0'],
    description: 'Indica si el input y el botón pueden recibir el foco con teclado',
    table: { type: { summary: 'string' }, category: 'ACCESSIBILITY', defaultValue: { summary: '0' } },
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
    description: 'Se emite cuando el valor del input cambia y se pierde el foco',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athClear': {
    action: 'athClear',
    description: 'Se emite al pulsar el botón Clear',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athInput': {
    action: 'athInput',
    description: 'Se emite cuando el valor del input cambia sin necesidad de perder el foco. Se activa con cada pulsación de teclado, corte, pegado, etc.',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },

  // Métodos
  'setFocus': {
    description: 'Método público que permite establecer el foco en el elemento input.',
    table: { type: { summary: 'Function<void>' }, category: 'METODOS' },
  },
};
