import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import { DatepickerRangeArgs } from './datepicker-range.types';
import { DatepickerRangeColors, DatepickerRangeSizes, DatepickerRangeTypes } from '../datepicker-range.model';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultDatepickerRangeArgs: DatepickerRangeArgs = {
  'autofocus': undefined,
  'color': DatepickerRangeColors.Primary,
  'disabled': undefined,
  'disabled-dates': undefined,
  'feedback': 'none',
  'feedback-text': undefined,
  'format': 'DD/MM/YYYY',
  'helper-text': undefined,
  'hide-panel': undefined,
  'hide-required': undefined,
  'highlighted-dates': undefined,
  'highlighted-weekends': undefined,
  'input-aria-label-start': undefined,
  'input-aria-label-end': undefined,
  'label': undefined,
  'label-start': undefined,
  'label-end': undefined,
  'max': undefined,
  'min': undefined,
  'name': undefined,
  'placeholder-start': undefined,
  'placeholder-end': undefined,
  'readonly': undefined,
  'required': undefined,
  'required-start': undefined,
  'required-end': undefined,
  'size': DatepickerRangeSizes.Medium,
  'submit-on-enter': undefined,
  'tooltip-text': undefined,
  'type': DatepickerRangeTypes.Date,
  'value': undefined,
};

const controlsEvents = ['athFocus', 'athBlur', 'athChange'];
const booleanArgs = ['autofocus', 'disabled', 'readonly', 'required', 'required-start', 'required-end', 'hide-panel', 'hide-required', 'highlighted-weekends'];

const meta: Meta<DatepickerRangeArgs> = {
  title: 'Componentes/Datepicker Range',
  component: 'ath-datepicker-range',
  parameters: {
    componentSubtitle:
      'Se trata de un componente de formulario que permite al usuario seleccionar un rango de fechas a través de un calendario emergente. Permite también seleccionar rangos de meses o de años.',
    actions: { handles: ['athFocus', 'athBlur', 'athChange'] },
    controls: { expanded: true },
    darkMode: {
      stylePreview: true,
    },
    backgrounds: { disable: true },
  },
  argTypes: {
    'autofocus': {
      control: { type: 'boolean' },
      description: 'Indica si el input tiene inicialmente el foco',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'color': {
      control: 'inline-radio',
      options: Object.values(DatepickerRangeColors),
      description: 'Color del datepicker.',
      table: {
        type: { summary: 'DatepickerRangeColors' },
        defaultValue: { summary: defaultDatepickerRangeArgs.color },
      },
    },
    'disabled': {
      control: { type: 'boolean' },
      description: 'Indica si el input está deshabilitado',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'disabled-dates': {
      control: { type: 'text' },
      description:
        "Define las fechas que se deshabilitan en el calendario. Debe ser un string que contenga un array de fechas en formato ISO (Por ejemplo: \"['2020-01-21', '2020-01-22']\")",
      table: { type: { summary: 'string' } },
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
    'format': {
      control: { type: 'text' },
      description: 'Define el formato de fecha (ej: dd/mm/yyyy)',
      table: { type: { summary: 'string' }, defaultValue: { summary: 'DD/MM/YYYY' } },
    },
    'helper-text': {
      control: { type: 'text' },
      description: 'Define el texto de ayuda. Se recomienda utilizar para indicar el formato de fecha al usuario',
      table: { type: { summary: 'string' } },
    },
    'highlighted-dates': {
      control: { type: 'text' },
      description:
        "Define las fechas que se resaltan en el calendario. Debe ser un string que contenga un array de fechas en formato ISO (Por ejemplo: \"['2020-01-21', '2020-01-22']\")",
      table: { type: { summary: 'string' } },
    },
    'highlighted-weekends': {
      control: { type: 'boolean' },
      description: 'Indica si los fines de semana deben ser resaltados en el calendario.',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'label': {
      control: { type: 'text' },
      description: 'Define el texto de la etiqueta del datepicker-range',
      table: { type: { summary: 'string' } },
    },
    'label-start': {
      control: { type: 'text' },
      description: 'Define el texto de la etiqueta de comienzo de rango',
      table: { type: { summary: 'string' } },
    },
    'label-end': {
      control: { type: 'text' },
      description: 'Define el texto de la etiqueta de final de rango',
      table: { type: { summary: 'string' } },
    },
    'max': {
      control: { type: 'text' },
      description: 'Define el valor máximo seleccionable. Debe ser un string de una fecha con formato ISO (ej: "2020-01-21")',
      table: { type: { summary: 'string' } },
    },
    'min': {
      control: { type: 'text' },
      description: 'Define el valor mínimo seleccionable. Debe ser un string de una fecha con formato ISO (ej: "2020-01-21")',
      table: { type: { summary: 'string' } },
    },
    'name': {
      control: { type: 'text' },
      description: 'Define el nombre del datepicker',
      table: { type: { summary: 'string' } },
    },
    'placeholder-start': {
      control: { type: 'text' },
      description: 'Define el texto placeholder',
      table: { type: { summary: 'string' } },
    },
    'placeholder-end': {
      control: { type: 'text' },
      description: 'Define el texto placeholder para el final',
      table: { type: { summary: 'string' } },
    },
    'readonly': {
      control: { type: 'boolean' },
      description: 'Indica si el input es de solo lectura',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'required': {
      control: { type: 'boolean' },
      description: 'Indica si el campo es obligatorio',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'required-start': {
      control: { type: 'boolean' },
      description: 'Indica si el campo inicio de rango es obligatorio',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'required-end': {
      control: { type: 'boolean' },
      description: 'Indica si el campo fin de rango es obligatorio',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'hide-panel': {
      control: { type: 'boolean' },
      description: 'Indica si se quiere ocultar el panel de la derecha',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'hide-required': {
      control: { type: 'boolean' },
      description:
        'En un formulario en el que todos los campos son requeridos puede no ser necesario mostrar el asterisco en cada campo. Con este atributo, el asterisco puede ser mostrado o no aunque el campo sea requerido (required).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'size': {
      control: 'inline-radio',
      options: Object.values(DatepickerRangeSizes),
      description: 'Tamaño del datepicker.',
      table: {
        type: { summary: 'DatepickerRangeSizes' },
        defaultValue: { summary: defaultDatepickerRangeArgs.size },
      },
    },
    'submit-on-enter': {
      control: { type: 'boolean' },
      description: 'Indica si se debe lanzar el submit del formulario al pulsar la tecla Enter en el input',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'tooltip-text': {
      control: { type: 'text' },
      description: 'Define el texto del tooltip',
      table: { type: { summary: 'string' } },
    },
    'type': {
      control: 'inline-radio',
      options: Object.values(DatepickerRangeTypes),
      description: 'Tipo de datepicker.',
      table: {
        type: { summary: 'DatepickerRangeTypes' },
        defaultValue: { summary: defaultDatepickerRangeArgs.type },
      },
    },
    'value': {
      control: { type: 'text' },
      description:
        "Define el valor del campo. Debe ser un array de strings de fechas con formato ISO, donde el primer elemento será el comienzo de rango, y el segundo será el final de rango. (ej: \"['2020-01-21', '2020-01-22']\")",
      table: { type: { summary: 'string' } },
    },
    'input-aria-label-start': {
      control: { type: 'text' },
      description: 'Define el atributo aria-label del input de inicio de rango',
      table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
    },
    'input-aria-label-end': {
      control: { type: 'text' },
      description: 'Define el atributo aria-label del input de fin de rango',
      table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
    },
  },
  decorators: [withActions],
  args: { ...defaultDatepickerRangeArgs },
};
export default meta;

type Story = StoryObj<DatepickerRangeArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
    <div class="story__item w600 h500">
        <ath-datepicker-range ${attributes}></ath-datepicker-range>
      </div>
    `;
  },
  args: { ...defaultDatepickerRangeArgs, 'helper-text': 'Formato de fecha: DD/MM/AAAA' },
  tags: ['!autodocs'],
};

export const Autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, autofocus: true },
  parameters: {
    controls: { exclude: ['type'] },
  },
  tags: ['!autodocs'],
};

export const Color: Story = {
  render: (args): string => {
    const colors = Object.values(DatepickerRangeColors);
    const attributes = getAttributesFromArgs(args, { exclude: ['color', ...controlsEvents], boolean: booleanArgs });

    return colors
      .map(
        color => `
          <div class="story__item w600 h500">
            <div class="story__item__label">Color: ${color}</div>
            <div>
              <ath-datepicker-range color="${color}" ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultDatepickerRangeArgs },
  parameters: {
    controls: { exclude: ['color'] },
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, disabled: true },
  parameters: {
    controls: { include: ['disabled'] },
  },
};

export const FechasResaltadas: Story = {
  name: 'Fechas resaltadas en el calendario',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500" >
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    'highlighted-dates': `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`,
  },
  parameters: {
    controls: { include: ['highlighted-dates'] },
  },
};

export const FinesDeSemanaResaltados: Story = {
  name: 'Fines de semana resaltados en el calendario',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500" >
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    'highlighted-weekends': true,
  },
  parameters: {
    controls: { include: ['highlighted-weekends'] },
  },
};

export const FechasDeshabilitadas: Story = {
  name: 'Fechas deshabilitadas en el calendario',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500" >
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    'disabled-dates': `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`,
  },
  parameters: {
    controls: { include: ['disabled-dates'] },
  },
};

export const ConFeedback: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, 'feedback-text': 'Texto de error', 'feedback': 'error' },
  parameters: {
    controls: { include: ['feedback-text', 'feedback'] },
  },
};

export const ConHelperText: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, 'helper-text': 'Texto de ayuda' },
  parameters: {
    controls: { include: ['helper-text'] },
  },
};

export const ConLabel: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, 'label': 'Rango de Fechas', 'label-start': 'Fecha de Inicio', 'label-end': 'Fecha de Fin' },
  parameters: {
    controls: { include: ['label', 'input-aria-label-start', 'input-aria-label-end', 'label-start', 'label-end'] },
  },
};

export const Limites: Story = {
  name: 'Límites inferior y superior',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500" >
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>             
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    min: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
    max: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-25`,
  },
  parameters: {
    controls: { include: ['min', 'max'] },
  },
};

export const OcultarPanel: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, 'hide-panel': true },
  parameters: {
    controls: { include: ['hide-panel'] },
  },
};

export const Placeholder: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div class="story__item">
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    'placeholder-start': 'Inicio de rango',
    'placeholder-end': 'Fin de rango',
  },
  parameters: {
    controls: { include: ['placeholder-start', 'placeholder-end'] },
  },
};

export const ReadOnly: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, readonly: true },
  parameters: {
    controls: { include: ['readonly'] },
  },
};

export const Required: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500">
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    'label': 'Fecha de Alta',
    'required': true,
    'hide-required': false,
    'required-start': true,
    'required-end': true,
  },
  parameters: {
    controls: { include: ['required', 'required-start', 'required-end', 'hide-required', 'label'] },
  },
};

export const Sizes: Story = {
  render: (args): string => {
    const sizes = Object.values(DatepickerRangeSizes);
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return sizes
      .map(
        size => `
          <div class="story__item w600 h500">
            <div class="story__item__label">Size: ${size}</div>
            <div>
              <ath-datepicker-range size="${size}" ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultDatepickerRangeArgs },
  parameters: {
    controls: { exclude: ['size'] },
  },
};

export const Tooltip: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500" >
            <div style="margin: 60px;">
              <ath-datepicker-range  ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerRangeArgs, 'label': 'label', 'tooltip-text': 'Tooltip de ejemplo' },
  parameters: {
    controls: { include: ['label', 'tooltip-text'] },
  },
};

export const Type: Story = {
  render: (args): string => {
    const types = Object.values(DatepickerRangeTypes);
    const attributes = getAttributesFromArgs(args, { exclude: ['size', ...controlsEvents], boolean: booleanArgs });

    return types
      .map(
        type => `
          <div class="story__item w600 h500">
            <div class="story__item__label">Type: ${type}</div>
            <div>
              <ath-datepicker-range type="${type}" ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultDatepickerRangeArgs },
  parameters: {
    controls: { exclude: ['type'] },
  },
};

export const Value: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w600 h500" >
            <div>
              <ath-datepicker-range ${attributes}></ath-datepicker-range>
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerRangeArgs,
    value: `['${new Date().getFullYear()}-${new Date().getMonth() + 1}-05', '${new Date().getFullYear()}-${new Date().getMonth() + 1}-15']`,
  },
  parameters: {
    controls: { include: ['value'] },
  },
};
