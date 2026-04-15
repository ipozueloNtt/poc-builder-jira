import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ListItemArgs } from './list.types';
import { getAttributesFromArgs } from '@utils/storybook';
import { ListLinkTarget } from '../list.model';

const defaultArgs: ListItemArgs = {
  'clickable': false,
  'disabled': false,
  'description':
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'external-label': undefined,
  'href': undefined,
  'target': undefined,
  'rel': undefined,
  'heading-text': 'Título del item',
  'heading-level': 4,
  'subtitle': 'Subtítulo del item',
  'tooltip': 'Tooltip del item',
  'tooltip-max-width': 240,
  'left-detail': '<div slot="left-detail"><ath-icon icon="placeholder" color="default" size="sm"></ath-icon></div>',
  'right-detail':
    '<div slot="right-detail"><span class="ath-h4 ath-color-text--primary">000,00€</span><span class="ath-body--lg ath-color-text--subtle">000,00€</span><ath-tag label="Tag" size="sm" color="secondary"></ath-tag><ath-icon icon="placeholder" color="default" size="sm"></ath-icon><ath-badge type="dot" color="accent" label="Mensajes pendientes" value="5">000,00</ath-badge></div>',
};

const meta: Meta<ListItemArgs> = {
  title: 'Componentes/List/List Item',
  component: 'ath-list-item',
  argTypes: {
    'clickable': {
      control: 'boolean',
      description: 'Indica si el item de lista es clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'href': {
      control: 'text',
      description: 'URL de destino a la que redirige el item cuando es clickable',
      table: {
        type: { summary: 'string' },
      },
    },
    'target': {
      control: 'select',
      options: Object.values(ListLinkTarget),
      description: 'Especifica dónde se abre el enlace',
      table: {
        type: { summary: 'ListLinkTargetType' },
        defaultValue: { summary: ListLinkTarget.Blank },
      },
    },
    'rel': {
      control: 'text',
      description: 'Valor del atributo rel para los enlaces',
      table: {
        type: { summary: 'string' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Indica si el item esta deshabilitado, este estado solo aplica si el item es "clickable"',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'external-label': {
      control: 'text',
      description: 'Texto complementario para "aria-label", indica si el enlace se abre en una nueva ventana en caso de enlaces con target="blank"',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Se abre una ventana nueva' },
      },
    },
    'heading-text': {
      control: 'text',
      description: 'Indica el texto para el título del list item. Si no se indica, no se mostrará el título',
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-level': {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Nivel de encabezado para el título de la cabecera, admite valores entre 0 a 6, siendo 0 una etiqueta <p> y de 1 a 6, <h1>...<h6>',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    'subtitle': {
      control: 'text',
      description: 'Indica el subtítulo para el list item. Si no se indica, no se mostrará el subtítulo',
      table: {
        type: { summary: 'string' },
      },
    },
    'description': {
      control: 'text',
      description: 'Indica la descripción el list item. Si no se indica, no se mostrará la descripción',
      table: {
        type: { summary: 'string' },
      },
    },
    'tooltip': {
      control: 'text',
      description: 'Indica el contenido del tooltip el list item. Si no se indica, no se mostrará el tooltip',
    },
    'tooltip-max-width': {
      control: 'number',
      description: 'Ancho máximo del tooltip. Informar con 0 para que el tooltip no tenga un ancho máximo',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '240' },
      },
    },
    'left-detail': {
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
      description: 'Slot para el contenido del detalle izquierdo',
    },
    'right-detail': {
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
      description: 'Slot para el contenido del detalle derecho',
    },
    'ath-aria-label': {
      control: { type: 'text' },
      description: 'Define el texto accesible de los items cuando son clickable',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
  },
  args: { ...defaultArgs },
};
export default meta;

type Story = StoryObj<ListItemArgs>;

export const Playground: Story = {
  render: (args): string => {
    const leftDetailContent =
      args.disabled && args.clickable ? ` <div slot="left-detail"><ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon></div>` : args['left-detail'];

    const rightDetailContent =
      args.disabled && args.clickable
        ? `  <div slot="right-detail"> <span class="ath-h4 ath-color-text--disabled">000,00€</span>
        <span class="ath-body--lg ath-color-text--disabled">000,00€</span>
        <ath-tag label="Tag" size="sm" color="disabled"></ath-tag>
        <ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon></div>`
        : args['right-detail'];

    const attributes = getAttributesFromArgs(args, {
      exclude: ['left-detail', 'right-detail'],
    });

    return `
      <div class="w600">
        <ath-list>
          <ath-list-item ${attributes}>
            ${leftDetailContent}
           ${rightDetailContent}
          </ath-list-item>
        </ath-list>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    clickable: false,
  },
  tags: ['!autodocs'],
};

export const Disabled: Story = {
  render: (args): string => {
    const leftDetailContent =
      args.disabled && args.clickable ? ` <div slot="left-detail"><ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon></div>` : args['left-detail'];

    const rightDetailContent =
      args.disabled && args.clickable
        ? `  <div slot="right-detail"> <span class="ath-h4 ath-color-text--disabled">000,00€</span>
        <span class="ath-body--lg ath-color-text--disabled">000,00€</span>
        <ath-tag label="Tag" size="sm" color="disabled"></ath-tag>
        <ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon></div>`
        : args['right-detail'];

    const attributes = getAttributesFromArgs(args, {
      exclude: ['left-detail', 'right-detail'],
      boolean: ['clickable'],
    });

    return `
      <div class="w600">
      <div class="story__item__label">List Item deshabilitado</div>
        <ath-list>
          <ath-list-item ${attributes}>
           ${leftDetailContent}
           ${rightDetailContent}
          </ath-list-item>
        </ath-list>
      </div>
    `;
  },
  args: { ...defaultArgs, disabled: true, clickable: true },
};

export const Clickable: Story = {
  render: (args): string => {
    const leftDetailContent =
      args.disabled && args.clickable ? ` <div slot="left-detail"><ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon></div>` : args['left-detail'];

    const rightDetailContent =
      args.disabled && args.clickable
        ? `  <div slot="right-detail"> <span class="ath-h4 ath-color-text--disabled">000,00€</span>
        <span class="ath-body--lg ath-color-text--disabled">000,00€</span>
        <ath-tag label="Tag" size="sm" color="disabled"></ath-tag>
        <ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon></div>`
        : args['right-detail'];

    const attributes = getAttributesFromArgs(
      {
        ...args,
        disabled: args.disabled && args.clickable,
        clickable: true,
        href: 'https://www.google.com/',
        target: ListLinkTarget.Blank,
      },
      { exclude: ['left-detail', 'right-detail'], boolean: ['clickable', 'disabled'] },
    );

    return `
      <div class="w600">
      <div class="story__item__label">List Item clickable</div>
        <ath-list>
          <ath-list-item ${attributes}>
            ${leftDetailContent}
           ${rightDetailContent}
          </ath-list-item>
        </ath-list>
      </div>
    `;
  },
  args: { ...defaultArgs, clickable: true, href: 'https://www.google.com/', target: ListLinkTarget.Blank },
};

export const ContainerSize440: Story = {
  name: 'Container-size < 440px',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['left-detail', 'right-detail']);

    return `
      <div class="w400">
        <ath-list>
          <ath-list-item ${attributes}>
            ${args['left-detail']}
            ${args['right-detail']}
          </ath-list-item>
        </ath-list>
      </div>
    `;
  },
  args: { ...defaultArgs },
};
