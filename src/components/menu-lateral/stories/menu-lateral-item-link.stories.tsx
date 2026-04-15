import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { MenuLateralItemArgs, ordererArgs } from './menu-lateral-item.types';
import { TargetType } from '../menu-lateral.model';

const defaultArgs: MenuLateralItemArgs = {
  ...ordererArgs,
  icon: 'placeholder',
};

const meta: Meta<MenuLateralItemArgs> = {
  title: 'Componentes/Menu Lateral/Menu Lateral Item/Link',
  component: 'ath-menu-button-item',
  parameters: {
    componentSubtitle: 'El componente ath-menu-button item corresponde a cada item interactivo dentro del ath-menu-lateral.',
  },
  tags: ['autodocs'],
  argTypes: {
    'badge-label': {
      control: { type: 'text' },
      description: 'Texto accesible del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    'badge-max': {
      control: { type: 'text' },
      description: 'Indica el valor máximo que puede tener el contenido del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    'badge-value': {
      control: { type: 'text' },
      description: 'Indica valor del contenido del badge',
      table: {
        type: { summary: 'string' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Indica si el item está deshabilitado o no',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'icon': {
      control: { type: 'select' },
      options: iconNamesList,
      description: 'Indica el nombre del icono a incluir en el botón, que debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },
    'selected': {
      control: 'boolean',
      description: 'Indica si el item está seleccionado o no',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'tooltip-text': {
      control: { type: 'text' },
      description: 'Indica el texto que contiene el tooltip del item',
      table: { type: { summary: 'string' } },
    },
    'external-label': {
      control: { type: 'text' },
      description: 'Indica el texto (oculto) que indica que el link abre una página en una ventana nueva',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Se abre en una nueva ventana' },
      },
    },
    'href': {
      control: { type: 'text' },
      description: 'Indica la URL del link',
      table: { type: { summary: 'string' } },
    },
    'rel': {
      control: { type: 'text' },
      description: 'Especifica la relación con el recurso al que apunta el enlace',
      table: { type: { summary: 'string' } },
    },
    'target': {
      control: { type: 'select' },
      options: ['self', 'blank'],
      description: 'Indica el target del vínculo del item',
      table: {
        type: { summary: 'TargetTypes' },
        defaultValue: { summary: TargetType.Self },
      },
    },
  },
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<MenuLateralItemArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item">
        <ath-menu-lateral aria-label="Menu lateral">
          <ath-menu-lateral-item-link
        ${attributes}
      ></ath-menu-lateral-item-link>
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col',
  },
};

export const ConBadge: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item">
        <ath-menu-lateral aria-label="Menu lateral">
          <ath-menu-lateral-item-link
        ${attributes}
      ></ath-menu-lateral-item-link>
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'badge-label': '1 aviso',
    'badge-max': 10,
    'badge-value': 1,
  },
  parameters: {
    storyClass: 'flex-col',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item">
        <ath-menu-lateral aria-label="Menu lateral">
          <ath-menu-lateral-item-link
        ${attributes}
      ></ath-menu-lateral-item-link>
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    disabled: true,
  },
  parameters: {
    controls: {
      exclude: ['selected'],
    },
    storyClass: 'flex-col',
  },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item">
        <ath-menu-lateral aria-label="Menu lateral">
          <ath-menu-lateral-item-link
        ${attributes}
      ></ath-menu-lateral-item-link>
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    selected: true,
  },
  parameters: {
    controls: {
      exclude: ['disabled'],
    },
    storyClass: 'flex-col',
  },
};

export const ConTooltip: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item" style="width: 100vh">
        <ath-menu-lateral aria-label="Menu lateral" >
          <ath-menu-lateral-item-link
        ${attributes}
      ></ath-menu-lateral-item-link>
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'tooltip-text': 'tooltip',
  },
  parameters: {
    storyClass: 'flex-col',
  },
};
