import { Meta, StoryObj } from '@storybook/web-components-vite';
import { EmptyStateType, HeadingSize } from '../empty-state.model';
import { getAttributesFromArgs } from '@utils/storybook';

type EmptyStateArgs = {
  'type': string;
  'hide-image': boolean;
  'heading-text': string;
  'heading-size': string;
  'heading-level': number;
  'description': string;
  'bodySlot'?: string;
  'footerSlot'?: string;
  'loading-label'?: string;
};

const defaultEmptyStateArgs: EmptyStateArgs = {
  'type': EmptyStateType.Empty,
  'hide-image': false,
  'heading-text': undefined,
  'heading-size': undefined,
  'heading-level': undefined,
  'description': undefined,
  'bodySlot': undefined,
  'footerSlot': undefined,
};

const meta: Meta<EmptyStateArgs> = {
  title: 'Componentes/Empty State',
  component: 'ath-empty-state',
  argTypes: {
    'type': {
      control: 'select',
      options: Object.values(EmptyStateType),
      description: 'Define el tipo del empty state',
      table: {
        type: { summary: 'EmptyStateType' },
        defaultValue: { summary: 'empty' },
      },
    },
    'hide-image': {
      control: 'boolean',
      description: 'Determina si la imagen se debe ocultar o no, excepto en el tipo loading',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'heading-text': {
      control: 'text',
      description: 'Texto de la cabecera',
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-size': {
      control: 'inline-radio',
      options: Object.values(HeadingSize),
      description: 'Define el tamaño del texto de la cabecera, valores disponibles `sm`, `md`, y `lg` ',
      table: {
        type: { summary: 'HeadingSize' },
        defaultValue: { summary: 'sm' },
      },
    },
    'description': {
      control: 'text',
      description: 'Texto para la descripción del empty state',
      table: {
        type: { summary: 'string' },
      },
    },
    'bodySlot': {
      control: 'text',
      name: 'body',
      description: 'Slot para añadir texto',
      table: { category: 'SLOTS', type: { summary: 'text / ath-button / ath-link' } },
    },
    'footerSlot': {
      control: 'text',
      name: 'footer',
      description: 'Slot para añadir texto o 1 o 2 <ath-button>',
      table: { category: 'SLOTS', type: { summary: 'text / ath-button' } },
    },
    'heading-level': {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Nivel de encabezado para el título de la cabecera, valor entre 1 y 6',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    'loading-label': {
      control: 'text',
      description: 'Etiqueta accesible para el estado de carga (solo en type="loading")',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
        defaultValue: { summary: 'Cargando...' },
      },
    },
  },
  args: { ...defaultEmptyStateArgs },
  parameters: {
    componentSubtitle: 'El componente empty state sirve para indicar al usuario que no hay contenido disponible para mostrar.',
    controls: { expanded: true },
    darkMode: { stylePreview: true },
    backgrounds: { disabled: true },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<EmptyStateArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['bodySlot', 'footerSlot']);

    return `
    <ath-empty-state ${attributes}>
     ${args.bodySlot ? `<div slot="body">${args.bodySlot}</div>` : ''}
      ${args.footerSlot ? `<div slot="footer">${args.footerSlot}</div>` : ''}
    </ath-empty-state>
    `;
  },
  args: {
    'type': 'empty',
    'heading-text': 'Heading Text',
    'heading-size': 'sm',
    'heading-level': 4,
    'description': 'Description',
    'bodySlot': '<div class="ath-body--sm">Contenido del body slot</div>',
    'footerSlot': `<ath-button>Button 1</ath-button> <ath-button color="secondary">Button 2</ath-button>`,
  },
  parameters: {
    storyClass: 'flex-col w800',
  },
  tags: ['!autodocs'],
};

export const Types: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args);
    const type = Object.values(EmptyStateType);

    const html = type.map(
      typeValue => `
          <div class="story__item w400">
            <div class="story__item__label" style="text-align: center;">type: ${typeValue}</div>
            <ath-empty-state type="${typeValue}" ${attributes} heading-text="Heading Text" description="Description"></ath-empty-state>
          </div>
        `,
    );
    return html.join('');
  },
  args: { ...defaultEmptyStateArgs },
  parameters: {
    controls: { exclude: ['type', 'hide-image', 'heading-text', 'heading-level', 'description', 'heading-size'] },
    storyClass: 'flex',
  },
};

export const HideImage: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-empty-state hide-image="true" ${attributes}>
      <div slot="body" class="ath-body--sm">
        Contenido del body slot
      </div>
      <div slot="footer">
        <ath-button>Button 1</ath-button>
        <ath-button color="secondary">Button 2</ath-button>
      </div>
    </ath-empty-state>`;
  },
  args: { ...defaultEmptyStateArgs, 'heading-text': 'Heading Text', 'heading-level': 2, 'description': 'Description' },
  parameters: {
    controls: { exclude: ['hide-image'] },
    storyClass: 'flex-col w800',
  },
};

export const ConBodySlot: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-empty-state ${attributes}>
      <div slot="body">
        <div class="ath-body--sm">Contenido del body slot</div>
      </div>
    </ath-empty-state>`;
  },
  args: { ...defaultEmptyStateArgs, 'heading-text': 'Heading Text', 'heading-level': 2, 'description': 'Description Text' },
  parameters: {
    controls: { exclude: ['hide-image', 'heading-text', 'heading-level', 'heading-size', 'description'] },
    storyClass: 'flex-col w800',
  },
};

export const ConFooterSlot: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-empty-state ${attributes}>
      <div slot="footer">
        <ath-button>Button 1</ath-button>
        <ath-button color="secondary">Button 2</ath-button>
      </div>
    </ath-empty-state>`;
  },
  args: { ...defaultEmptyStateArgs },
  parameters: {
    controls: { exclude: ['hide-image', 'heading-text', 'heading-level', 'heading-size', 'description'] },
    storyClass: 'flex-col w800',
  },
};
