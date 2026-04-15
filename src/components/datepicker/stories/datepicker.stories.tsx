import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import { DatepickerArgs } from './datepicker.types';
import { DatepickerColors, DatepickerSizes, DatepickerTypes } from '../datepicker.model';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultDatepickerArgs: DatepickerArgs = {
  'autofocus': undefined,
  'color': DatepickerColors.Primary,
  'disabled': undefined,
  'disabled-dates': undefined,
  'feedback': 'none',
  'feedback-text': undefined,
  'format': 'DD/MM/YYYY',
  'helper-text': undefined,
  'hide-required': undefined,
  'highlighted-dates': undefined,
  'highlighted-weekends': undefined,
  'input-aria-label': undefined,
  'label': undefined,
  'max': undefined,
  'min': undefined,
  'name': undefined,
  'placeholder': undefined,
  'readonly': undefined,
  'required': undefined,
  'size': DatepickerSizes.Medium,
  'submit-on-enter': undefined,
  'tooltip-text': undefined,
  'type': DatepickerTypes.Date,
  'value': undefined,
};

const controlsEvents = ['athFocus', 'athBlur', 'athChange', 'athInput'];
const booleanArgs = ['autofocus', 'disabled', 'readonly', 'required', 'hide-required', 'highlighted-weekends'];

const meta: Meta<DatepickerArgs> = {
  title: 'Componentes/Datepicker',
  component: 'ath-datepicker',
  parameters: {
    componentSubtitle:
      'Se trata de un componente de formulario que permite al usuario seleccionar una fecha a través de un calendario emergente. Permite también seleccionar meses y años.',
    actions: { handles: ['athFocus', 'athBlur', 'athChange', 'athInput'] },
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
      options: Object.values(DatepickerColors),
      description: 'Color del datepicker.',
      table: {
        type: { summary: 'DatepickerColors' },
        defaultValue: { summary: defaultDatepickerArgs.color },
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
      table: { type: { summary: 'string' } },
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
      description: 'Define el texto de la etiqueta',
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
    'placeholder': {
      control: { type: 'text' },
      description: 'Define el texto placeholder',
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
    'hide-required': {
      control: { type: 'boolean' },
      description:
        'En un formulario en el que todos los campos son requeridos puede no ser necesario mostrar el asterisco en cada campo. Con este atributo, el asterisco puede ser mostrado o no aunque el campo sea requerido (required).',
      table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
    },
    'size': {
      control: 'inline-radio',
      options: Object.values(DatepickerSizes),
      description: 'Tamaño del datepicker.',
      table: {
        type: { summary: 'DatepickerSizes' },
        defaultValue: { summary: defaultDatepickerArgs.size },
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
      options: Object.values(DatepickerTypes),
      description: 'Tipo de datepicker.',
      table: {
        type: { summary: 'DatepickerTypes' },
        defaultValue: { summary: defaultDatepickerArgs.type },
      },
    },
    'value': {
      control: { type: 'text' },
      description: 'Define el valor del campo. Debe ser un string de una fecha con formato ISO (ej: "2020-01-21")',
      table: { type: { summary: 'string' } },
    },
    'input-aria-label': {
      control: { type: 'text' },
      description: 'Define el atributo aria-label del input',
      table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
    },
  },
  decorators: [withActions],
  args: { ...defaultDatepickerArgs },
};
export default meta;

type Story = StoryObj<DatepickerArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
    <div class="story__item w400 h500">
        <ath-datepicker ${attributes}></ath-datepicker>
      </div>
    `;
  },
  args: { ...defaultDatepickerArgs, 'helper-text': 'Formato de fecha: DD/MM/AAAA' },
  tags: ['!autodocs'],
};

export const Autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, autofocus: true },
  parameters: {
    controls: { exclude: ['type'] },
  },
  tags: ['!autodocs'],
};

export const Color: Story = {
  render: (args): string => {
    const colors = Object.values(DatepickerColors);
    const attributes = getAttributesFromArgs(args, { exclude: ['color', ...controlsEvents], boolean: booleanArgs });

    return colors
      .map(
        color => `
          <div class="story__item w400 h500">
            <div class="story__item__label">Color: ${color}</div>
            <div>
              <ath-datepicker color="${color}" ${attributes}></ath-datepicker>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultDatepickerArgs },
  parameters: {
    controls: { exclude: ['color'] },
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, disabled: true },
  parameters: {
    controls: { include: ['disabled'] },
  },
};

export const FechasResaltadas: Story = {
  name: 'Fechas resaltadas en el calendario',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerArgs,
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
          <div class="story__item w400 h500" >
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerArgs,
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
          <div class="story__item w400 h500" >
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerArgs,
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
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, 'feedback-text': 'Texto de error', 'feedback': 'error' },
  parameters: {
    controls: { include: ['feedback-text', 'feedback'] },
  },
};

export const ConHelperText: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, 'helper-text': 'Texto de ayuda' },
  parameters: {
    controls: { include: ['helper-text'] },
  },
};

export const ConLabel: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, label: 'Fecha de Alta' },
  parameters: {
    controls: { include: ['label', 'input-aria-label'] },
  },
};

export const Limites: Story = {
  name: 'Límites inferior y superior',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>             
            </div>
          </div>
        `;
  },
  args: {
    ...defaultDatepickerArgs,
    min: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
    max: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-25`,
  },
  parameters: {
    controls: { include: ['min', 'max'] },
  },
};

export const Placeholder: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div class="story__item">
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, placeholder: 'Selecciona una fecha' },
  parameters: {
    controls: { include: ['placeholder'] },
  },
};

export const ReadOnly: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, readonly: true },
  parameters: {
    controls: { include: ['readonly'] },
  },
};

export const Required: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500">
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, 'label': 'Fecha de Alta', 'required': true, 'hide-required': false },
  parameters: {
    controls: { include: ['required', 'hide-required', 'label'] },
  },
};

export const Sizes: Story = {
  render: (args): string => {
    const sizes = Object.values(DatepickerSizes);
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return sizes
      .map(
        size => `
          <div class="story__item w400 h500">
            <div class="story__item__label">Size: ${size}</div>
            <div>
              <ath-datepicker size="${size}" ${attributes}></ath-datepicker>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultDatepickerArgs },
  parameters: {
    controls: { exclude: ['size'] },
  },
};

export const Tooltip: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div style="margin: 60px;">
              <ath-datepicker  ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, 'label': 'label', 'tooltip-text': 'Tooltip de ejemplo' },
  parameters: {
    controls: { include: ['label', 'tooltip-text'] },
  },
};

export const Type: Story = {
  render: (args): string => {
    const types = Object.values(DatepickerTypes);
    const attributes = getAttributesFromArgs(args, { exclude: ['size', ...controlsEvents], boolean: booleanArgs });

    return types
      .map(
        type => `
          <div class="story__item w400 h500">
            <div class="story__item__label">Type: ${type}</div>
            <div>
              <ath-datepicker type="${type}" ${attributes}></ath-datepicker>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultDatepickerArgs },
  parameters: {
    controls: { exclude: ['type'] },
  },
};

export const Value: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div>
              <ath-datepicker ${attributes}></ath-datepicker>
            </div>
          </div>
        `;
  },
  args: { ...defaultDatepickerArgs, value: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-05` },
  parameters: {
    controls: { include: ['value'] },
  },
};
