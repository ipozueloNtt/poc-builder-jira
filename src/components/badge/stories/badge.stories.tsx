import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { BadgeArgs, sortedBadgeArgs } from './badge.types';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultArgs = {
  ...sortedBadgeArgs,
  color: 'accent',
  label: 'Mensajes pendientes',
  type: 'numeric',
  value: 5,
  defaultSlot: ' <ath-button>Button</ath-button>',
};

const meta: Meta<BadgeArgs> = {
  title: 'Componentes/Badge',
  component: 'ath-badge',
  argTypes: {
    'distance-x': {
      control: 'number',
      description: 'Desplazamiento horizontal personalizado del badge desde su posición por defecto',
      table: {
        type: { summary: 'number' },
      },
    },
    'distance-y': {
      control: 'number',
      description: 'Desplazamiento vertical personalizado del badge desde su posición por defecto',
      table: {
        type: { summary: 'number' },
      },
    },
    'color': {
      control: 'radio',
      description: 'Color semántico que indica el propósito o estado del badge',
      options: ['accent', 'danger', 'warning', 'success', 'info', 'disabled'],
      table: {
        type: { summary: 'BadgeColorTypes' },
        defaultValue: { summary: 'accent' },
      },
    },
    'label': {
      control: 'text',
      description: 'Etiqueta de accesibilidad que describe el propósito del badge para lectores de pantalla',
      table: {
        category: 'Accessibility',
      },
    },
    'max': {
      if: { arg: 'type', eq: 'numeric' },
      control: { type: 'number', min: 0, max: 999 },
      description: 'Valor máximo a mostrar. Si `value` lo supera, se mostrará "+{max}" (ej: +99)',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '999' },
      },
    },
    'position': {
      control: 'radio',
      description: 'Ubicación del badge relativa al elemento contenido en el slot',
      options: ['right', 'top-right'],
      table: {
        type: { summary: 'BadgePositions' },
        defaultValue: { summary: 'top-right' },
      },
    },
    'type': {
      control: 'radio',
      description: 'Tipo de badge: punto decorativo o numérico con valor',
      options: ['dot', 'numeric'],
      table: {
        type: { summary: 'BadgeTypes' },
        defaultValue: { summary: 'numeric' },
      },
    },
    'value': {
      if: { arg: 'type', eq: 'numeric' },
      control: 'number',
      description: 'Número a mostrar dentro del badge cuando `type` es `numeric`',
      table: {
        type: { summary: 'number' },
      },
    },
    'defaultSlot': {
      name: 'default slot',
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
      description: 'Elemento sobre el cual se posicionará el badge (botón, icono, texto, etc.)',
    },
  },

  args: { ...defaultArgs },
  parameters: {
    componentSubtitle:
      'Los badges son pequeños indicadores visuales que se superponen a otros elementos para mostrar ' +
      'notificaciones, contadores o estados. Pueden ser de tipo punto (decorativo) o numérico (con valor). ' +
      'Se posicionan automáticamente respecto al elemento contenido en el slot y solo admiten un elemento hijo.',
    controls: { sort: 'alpha' },
  },
};

export default meta;

type Story = StoryObj<BadgeArgs>;

export const Playground: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);
    return `
      <ath-badge ${attributes}>
        ${args.defaultSlot}
      </ath-badge>
    `;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
};

export const Type: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['type', 'defaultSlot']);
    const types = ['dot', 'numeric'];
    return types
      .map(
        type => `
          <div class="story__item">
            <div class="story__item__label">type: ${type}</div>
            <ath-badge type="${type}" ${attributes}>
              ${args.defaultSlot}
            </ath-badge>
          </div>
        `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['type', 'label', 'distance-x', 'distance-y'],
    },
  },
};

export const Color: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['color', 'defaultSlot']);
    const colors = ['accent', 'danger', 'warning', 'success', 'info', 'disabled'];
    return colors
      .map(
        color => `
          <div class="story__item">
            <div class="story__item__label">color: ${color}</div>
            <ath-badge ${attributes} color="${color}">
              ${color !== 'disabled' ? args.defaultSlot : '<ath-button disabled>Disabled Button</ath-button>'}
            </ath-badge>
          </div>
        `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['color', 'label', 'distance-x', 'distance-y'],
    },
  },
};

export const Position: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['position', 'defaultSlot']);
    const positions = ['right', 'top-right'];
    return positions
      .map(
        position => `
          <div class="story__item">
            <div class="story__item__label">position: ${position}</div>
            <ath-badge position="${position}"${attributes}>
              ${args.defaultSlot}
            </ath-badge>
          </div> 
        `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['color', 'label', 'position'],
    },
  },
};
