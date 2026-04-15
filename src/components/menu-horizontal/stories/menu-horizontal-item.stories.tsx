import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { MenuHorizontalItemArgs } from './menu-horizontal.types';
import { getAttributesFromArgs } from '@utils/storybook';
import { TargetType } from '../menu-horizontal.model';

const defaultArgs: MenuHorizontalItemArgs = {
  'badge-label': undefined,
  'badge-max': undefined,
  'badge-value': undefined,
  'disabled': undefined,
  'href': 'https://www.ibercaja.es',
  'external-label': undefined,
  'label': 'Item',
  'selected': undefined,
  'target': undefined,
  'value': undefined,
};

const meta: Meta<MenuHorizontalItemArgs> = {
  title: 'Componentes/Menu Horizontal/Menu Horizontal Item',
  component: 'ath-menu-horizontal',
  parameters: {
    componentSubtitle: 'El componente ath-menu-horizontal-item corresponde a cada ítem interactivo dentro del ath-menu-horizontal.',
  },
  tags: ['autodocs'],
  argTypes: {
    'badge-label': {
      control: { type: 'text' },
      description: 'Indica el texto accesible del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    'badge-max': {
      control: { type: 'number' },
      description: 'Indica el valor máximo del badge',
      table: {
        type: { summary: 'number' },
      },
    },
    'badge-value': {
      control: { type: 'number' },
      description: 'Indica el valor del badge',
      table: {
        type: { summary: 'number' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Indica si el ítem está deshabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'href': {
      control: 'text',
      description: 'Indica la URL a la que apunta este ítem',
      table: {
        type: { summary: 'string' },
      },
    },
    'external-label': {
      control: 'text',
      description: 'Especifica el texto accesible del ítem cuando es un vínculo externo',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Se abre en una nueva ventana' },
      },
    },
    'label': {
      control: 'text',
      description: 'Especifica el texto del ítem',
      table: {
        type: { summary: 'string' },
      },
    },
    'selected': {
      control: { type: 'boolean' },
      description: 'Indica si el ítem está seleccionado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'target': {
      control: { type: 'select' },
      options: [Object.values(TargetType)],
      description: 'Indica el target del vínculo del ítem',
      table: {
        type: { summary: 'TargetTypes' },
        defaultValue: { summary: TargetType.Self },
      },
    },
    'value': {
      control: { type: 'text' },
      description: 'Indica el valor del ítem',
      table: {
        type: { summary: 'any' },
      },
    },
  },
  args: { ...defaultArgs },
};
export default meta;

type Story = StoryObj<MenuHorizontalItemArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    const html = `
     <div class="story__item">
        <ath-menu-horizontal aria-label="Nombre del menú horizontal" has-divider="false">
          <ath-menu-horizontal-item ${attributes}></ath-menu-horizontal-item>
        </ath-menu-horizontal>
    </div>
      `;

    return html;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'w400',
  },
};

export const ConBadge: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs({ ...args });

    const html = `
        <div class="story__item">
            <ath-menu-horizontal aria-label="Nombre del menú horizontal" has-divider="false">
                <ath-menu-horizontal-item ${attributes}></ath-menu-horizontal-item>
            </ath-menu-horizontal>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs, 'badge-value': 3 },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['disabled']);

    const html = `
        <div class="story__item">
            <ath-menu-horizontal aria-label="Nombre del menú horizontal" has-divider="false">
                <ath-menu-horizontal-item ${attributes} disabled></ath-menu-horizontal-item>
            </ath-menu-horizontal>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      exclude: ['selected', 'disabled'],
    },
  },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['selected']);

    const html = `
        <div class="story__item">
            <ath-menu-horizontal aria-label="Nombre del menú horizontal" has-divider="false">
                <ath-menu-horizontal-item ${attributes} selected></ath-menu-horizontal-item>
            </ath-menu-horizontal>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs, selected: true },
  parameters: {
    controls: {
      exclude: ['selected', 'disabled'],
    },
  },
};
