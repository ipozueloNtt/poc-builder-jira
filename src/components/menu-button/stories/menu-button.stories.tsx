import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { MenuButtonArgs, ordererArgs } from './menu-button.types';
import { ButtonColor, ButtonSize } from 'components/button/button.model';

const defaultArgs: MenuButtonArgs = {
  ...ordererArgs,
};

const meta: Meta<MenuButtonArgs> = {
  title: 'Componentes/Menu Button/Menu Button',
  component: 'ath-menu-button',
  parameters: {
    actions: { handles: ['athAction'] },
    componentSubtitle: 'El componente menu button es un botón que, al ser accionado, despliega un menú con una lista de opciones interactivas.',
  },
  tags: ['autodocs'],
  argTypes: {
    'alignment': {
      control: { type: 'select' },
      options: ['left', 'right'],
      description: 'Define la posición del botón respecto del overlay',
      table: { type: { summary: 'string' } },
    },
    'autofocus': {
      control: 'boolean',
      description: 'Indica si el botón tiene el foco por defecto',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'clear': {
      control: 'boolean',
      description: 'Indica la propiedad clear del botón',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'color': {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Indica la variante de color del botón',
      table: {
        type: { summary: 'ButtonColors' },
        defaultValue: { summary: ButtonColor.Primary },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Indica si el botón está deshabilitado o no',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'icon': {
      control: { type: 'select' },
      options: iconNamesList,
      description: 'Indica el nombre del icono del botón, que debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },
    'open': {
      control: 'boolean',
      description: 'Indica si el overlay se muestra por defecto',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'size': {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Indica el tamaño del botón',
      table: {
        type: { summary: 'ButtonSizes' },
        defaultValue: { summary: ButtonSize.Medium },
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
    // ACCESSIBILIY
    'ath-aria-label': {
      control: { type: 'text' },
      description: 'Indica la etiqueta accesible del botón',
      table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
    },
    // EVENTS
    'athAction': {
      action: 'athAction',
      description: 'Se emite al hacer clic en un item',
      table: {
        type: { summary: 'EventEmitter<HTMLAthMenuButtonItemElement>' },
        category: 'EVENTS',
      },
    },
  },
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<MenuButtonArgs>;

const generateItems = (copies = 7) => {
  let items = '';
  for (let i = 1; i <= copies; i++) {
    items += `<ath-menu-button-item text="Opción ${i}"></ath-menu-button-item>\n`;
  }
  return items;
};

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
      <div class="story__item">
        <ath-menu-button ${attributes}>
          ${generateItems()}
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400 ml200',
  },
};

export const Alignment: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);
    const alignments = ['left', 'right'];

    const html = `
      ${alignments
        .map(
          (alignment, i) => `
              <div class="story__item" style="${i != 0 && 'margin-left: 100px'}">
                <div class="story__item__label" >alignment: ${alignment}</div>
                <ath-menu-button ${attributes} alignment="${alignment}">
                  ${generateItems()}
                </ath-menu-button>
              </div>
          `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
  },
  parameters: {
    controls: {
      include: ['disabled', 'open'],
    },
  },
};

export const Autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
    <div class="story__item">
      <div class="story__item__label">autofocus: ${args.autofocus}</div>
        <ath-menu-button ${attributes}>
          ${generateItems()}
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
    'autofocus': true,
  },
  tags: ['!autodocs'],
  parameters: {
    controls: {
      include: ['autofocus', 'clear', 'color', 'disabled', 'icon', 'size'],
    },
  },
};

export const Clear: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
      <div class="story__item">
        <div class="story__item__label">clear: ${args.clear}</div>
        <ath-menu-button ${attributes}>
          ${generateItems()}
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
    'clear': true,
  },
  parameters: {
    controls: {
      include: ['clear', 'color', 'disabled', 'icon', 'size'],
    },
  },
};

export const Color: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);
    const colors = [ButtonColor.Primary, ButtonColor.Secondary];

    const html = `
      ${colors
        .map(
          color => `
          <div class="story__item">
            <div class="story__item__label">color: ${color}</div>
            <ath-menu-button ${attributes} color="${color}">
              ${generateItems()}
            </ath-menu-button>
          </div>
          `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
  },
  parameters: {
    controls: {
      include: ['clear', 'disabled', 'icon', 'size'],
    },
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
          <div class="story__item">
            <div class="story__item__label">disabled: ${args.disabled}</div>
            <ath-menu-button ${attributes}>
              ${generateItems()}
            </ath-menu-button>
          </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
    'disabled': true,
  },
  parameters: {
    controls: {
      include: ['clear', 'color', 'disabled', 'icon', 'open', 'size'],
    },
  },
};

export const ConIconoMenu: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
          <div class="story__item">
            <div class="story__item__label">Con icono ${args.icon}</div>
            <ath-menu-button ${attributes}>
              ${generateItems()}
            </ath-menu-button>
          </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
    'icon': 'menu',
    'clear': true,
  },
  parameters: {
    controls: {
      include: ['clear', 'color', 'disabled', 'icon', 'open', 'size'],
    },
  },
};

export const Open: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
        <div class="story__item">
          <div class="story__item__label">open: ${args.open}</div>
          <ath-menu-button ${attributes}>
            ${generateItems()}
          </ath-menu-button>
        </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
    'open': true,
  },
  parameters: {
    controls: {
      include: ['disabled', 'open'],
    },
  },
};

export const Size: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);
    const sizes = ['xs', 'sm', 'md', 'lg'];

    const html = `
      ${sizes
        .map(
          size => `
            <div class="story__item">
              <div class="story__item__label">size: ${size}</div>
                <ath-menu-button ${attributes} size="${size}">
                  ${generateItems()}
                </ath-menu-button>
                </div>
          `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
  },
  parameters: {
    controls: {
      include: ['clear', 'color', 'icon', 'disabled', 'open'],
    },
  },
};

export const OverlayMaxHeight: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athAction']);

    return `
        <div class="story__item">
          <ath-menu-button ${attributes}>
            ${generateItems()}
          </ath-menu-button>
        </div>
    `;
  },
  args: {
    ...defaultArgs,
    'ath-aria-label': 'Label',
  },
  parameters: {
    controls: {
      include: ['overlay-max-height'],
    },
  },
};
