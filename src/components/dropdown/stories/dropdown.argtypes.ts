import { ArgTypes } from '@storybook/web-components-vite';
import { dropdownFeedbackType, dropdownSize } from '../dropdown.model';
import { DropdownArgs } from './dropdown.types';

export const dropdownArgTypes: Partial<ArgTypes<DropdownArgs>> = {
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el dropdown esta deshabilitado',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'feedback': {
    control: 'inline-radio',
    options: [dropdownFeedbackType.None, dropdownFeedbackType.Error],
    description: 'Indica el tipo de feedback',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: 'none' },
    },
  },

  'feedback-text': {
    control: 'text',
    description: 'Indica el texto del feedback',
    table: {
      type: { summary: 'string' },
    },
  },

  'helper-text': {
    control: 'text',
    description: 'Indica el texto para el texto de ayuda',
    table: {
      type: { summary: 'string' },
    },
  },

  'label': {
    control: 'text',
    description: 'Indica el texto para el Label del dropdown',
    table: {
      type: { summary: 'string' },
    },
  },

  'multiselect': {
    control: { type: 'boolean' },
    description: 'Indica si el dropdown es multiselección',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'name': {
    control: 'text',
    description: 'Indica el nombre para el dropdown',
    table: {
      type: { summary: 'string' },
    },
  },

  'nochips-text': {
    control: 'text',
    description: 'Indica el texto al seleccionar una opción con multiselect=true y show-chips=false',
    table: {
      type: { summary: 'string' },
    },
  },

  'noresult-text': {
    control: 'text',
    description: 'Indica el texto a mostrar cuando el buscador no encuentre resultados',
    table: {
      type: { summary: 'string' },
    },
  },

  'open': {
    control: 'boolean',
    description: 'Indica si el dropdown se muestra abierto por defecto',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'placeholder': {
    control: 'text',
    description: 'texto para el placeholder',
    table: {
      type: { summary: 'string' },
    },
  },

  'readonly': {
    control: { type: 'boolean' },
    description: 'Indica si el dropdown es de solo lectura',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'required': {
    control: { type: 'boolean' },
    description: 'Indica si es obligatiorio el dropdown',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'hide-required': {
    control: { type: 'boolean' },
    description: 'Indica si se muestra la marca de obligatorio en la etiqueta',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'search': {
    control: { type: 'boolean' },
    description: 'Indica si el dropdown muestra input de búsqueda',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'search-placeholder': {
    control: { type: 'text' },
    description: 'Placeholder para el input de búsqueda',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: '' },
    },
  },

  'show-chips': {
    control: { type: 'boolean' },
    description: 'Indica si el dropdown muestras chips y solo es aplicable si multiselect es true',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'size': {
    control: 'inline-radio',
    options: [dropdownSize.Sm, dropdownSize.Md, dropdownSize.Lg],
    description: 'Indica el tamaño del dropdown',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: dropdownSize.Md },
    },
  },

  'tooltip-text': {
    control: 'text',
    description: 'Indica el texto para el tooltip en el label',
    table: {
      type: { summary: 'string' },
    },
  },

  'tooltip-width': {
    control: 'number',
    description: 'Indica el ancho para el texto del tooltip en el label. 0 sin límite',
    table: {
      type: { summary: 'number' },
      defaultValue: { summary: '0' },
    },
  },

  'value': {
    control: 'text',
    description: 'Indica el valor inicial del dropdown',
    table: {
      type: { summary: 'string' },
    },
  },

  'width': {
    control: 'text',
    description: 'Indica la anchura del dropdown',
    table: {
      type: { summary: 'string' },
    },
  },
  'overlay-max-height': {
    control: 'text',
    description: 'Indica la altura máxima del overlay del dropdown',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: '236px' },
    },
  },

  // Accesibility
  'dropdown-aria-label': {
    control: 'text',
    description: 'Etiqueta accesible para el dropdown para cuando no exista un label visible',
    table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
  },
  'search-aria-label': {
    control: 'text',
    description: 'Etiqueta accesible para el buscador del dropdown.' + '<br> Se usa cuando search=true',
    table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
  },
  'announce-result-text': {
    control: 'text',
    description: 'Etiqueta accesible para anunciar en el lector de pantalla los resultados del buscador. ' + '<br> [total] se reemplaza por el número de elementos de la lista',
    table: {
      category: 'ACCESSIBILITY',
      type: { summary: 'string' },
      defaultValue: { summary: 'Hay [total] elementos en la lista' },
    },
  },

  // Slots
  'defaultSlot': {
    control: 'text',
    name: 'default',
    description: 'Contenido del dropdown, que debe ser uno o varios elementos <ath-dropdown-option>',
    table: { category: 'SLOTS', type: { summary: 'ath-dropdown-option' } },
  },

  // Events
  'athChange': {
    action: 'athChange',
    description: 'Se emite al detectar cambios dentro del dropdown',
    table: {
      type: { summary: 'EventEmitter<void>' },
      category: 'EVENTS',
    },
  },

  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en el dropdown',
    table: {
      type: { summary: 'EventEmitter<void>' },
      category: 'EVENTS',
    },
  },

  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco del dropdown',
    table: {
      type: { summary: 'EventEmitter<void>' },
      category: 'EVENTS',
    },
  },
};
