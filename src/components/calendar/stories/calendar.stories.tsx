import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import { CalendarArgs } from './calendar.types';
import { CalendarColors, CalendarTypes } from '../calendar.model';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultCalendarArgs: CalendarArgs = {
  'color': CalendarColors.Primary,
  'disabled-dates': undefined,
  'highlighted-dates': undefined,
  'highlighted-weekends': false,
  'max': undefined,
  'min': undefined,
  'selected': undefined,
  'type': CalendarTypes.Date,
};

const controlsEvents = ['athChange'];
const booleanArgs = ['highlighted-weekends'];

const meta: Meta<CalendarArgs> = {
  title: 'Componentes/Calendar',
  component: 'ath-calendar',
  parameters: {
    componentSubtitle: 'El componente calendar permite a los usuarios visualizar y seleccionar fechas de forma clara e interactiva.',
    actions: { handles: ['athChange'] },
    controls: { expanded: true },
    darkMode: {
      stylePreview: true,
    },
    backgrounds: { disable: true },
  },
  argTypes: {
    'color': {
      control: 'inline-radio',
      options: Object.values(CalendarColors),
      description: 'Color del calendar.',
      table: {
        type: { summary: 'CalendarColors' },
        defaultValue: { summary: defaultCalendarArgs.color },
      },
    },
    'disabled-dates': {
      control: { type: 'text' },
      description:
        "Define las fechas que se deshabilitan en el calendario. Debe ser un string que contenga un array de fechas en formato ISO (Por ejemplo: \"['2020-01-21', '2020-01-22']\")",
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
    'selected': {
      control: { type: 'text' },
      description: 'Define la fecha seleccionada del campo. Debe ser un string de una fecha con formato ISO (ej: "2020-01-21")',
      table: { type: { summary: 'string' } },
    },
    'type': {
      control: 'inline-radio',
      options: Object.values(CalendarTypes),
      description: 'Tipo de calendario.',
      table: {
        type: { summary: 'CalendarTypes' },
        defaultValue: { summary: defaultCalendarArgs.type },
      },
    },
  },
  decorators: [withActions],
  args: { ...defaultCalendarArgs },
};
export default meta;

type Story = StoryObj<CalendarArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
    <div class="story__item w400 h500">
        <ath-calendar ${attributes}></ath-calendar>
      </div>
    `;
  },
  args: { ...defaultCalendarArgs },
  tags: ['!autodocs'],
};

export const Color: Story = {
  render: (args): string => {
    const colors = Object.values(CalendarColors);
    const attributes = getAttributesFromArgs(args, { exclude: ['color', ...controlsEvents], boolean: booleanArgs });

    return colors
      .map(
        color => `
          <div class="story__item w400 h500">
            <div class="story__item__label">Color: ${color}</div>
            <div>
              <ath-calendar color="${color}" ${attributes}></ath-calendar>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultCalendarArgs },
  parameters: {
    controls: { exclude: ['color'] },
  },
};

export const FechasResaltadas: Story = {
  name: 'Fechas resaltadas en el calendario',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div>
              <ath-calendar ${attributes}></ath-calendar>
            </div>
          </div>
        `;
  },
  args: {
    ...defaultCalendarArgs,
    'highlighted-dates': `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-15', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-16']`,
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
              <ath-calendar ${attributes}></ath-calendar>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultCalendarArgs,
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
              <ath-calendar ${attributes}></ath-calendar>              
            </div>
          </div>
        `;
  },
  args: {
    ...defaultCalendarArgs,
    'disabled-dates': `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-15', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-16']`,
  },
  parameters: {
    controls: { include: ['disabled-dates'] },
  },
};

export const Limites: Story = {
  name: 'Límites inferior y superior',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div>
              <ath-calendar ${attributes}></ath-calendar>             
            </div>
          </div>
        `;
  },
  args: {
    ...defaultCalendarArgs,
    min: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-01`,
    max: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-25`,
  },
  parameters: {
    controls: { include: ['min', 'max'] },
  },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
          <div class="story__item w400 h500" >
            <div>
              <ath-calendar ${attributes}></ath-calendar>
            </div>
          </div>
        `;
  },
  args: { ...defaultCalendarArgs, selected: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-05` },
  parameters: {
    controls: { include: ['selected'] },
  },
};

export const Type: Story = {
  render: (args): string => {
    const types = Object.values(CalendarTypes);
    const attributes = getAttributesFromArgs(args, { exclude: ['size', ...controlsEvents], boolean: booleanArgs });

    return types
      .map(
        type => `
          <div class="story__item w400 h500">
            <div class="story__item__label">Type: ${type}</div>
            <div>
              <ath-calendar type="${type}" ${attributes}></ath-calendar>
            </div>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultCalendarArgs },
  parameters: {
    controls: { exclude: ['type'] },
  },
};
