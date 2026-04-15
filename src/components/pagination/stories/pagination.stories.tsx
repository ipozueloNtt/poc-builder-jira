import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { withActions } from 'storybook/actions/decorator';

type PaginationArgs = {
  'no-end-buttons': boolean;
  'no-jump-buttons': boolean;
  'no-items-count': boolean;
  'no-items-selector': boolean;
  'items-selector': string;
  'items-per-page': number;
  'current-page': number;
  'total-items': number;
  'disabled': boolean;
  'ath-aria-label': string;
  'athPaginate'?: (event: CustomEvent<void>) => void;
  'athItemsPerPageChange'?: (event: CustomEvent<void>) => void;
};

const defaultPaginationArgs: PaginationArgs = {
  'no-end-buttons': undefined,
  'no-jump-buttons': undefined,
  'no-items-count': undefined,
  'no-items-selector': undefined,
  'items-selector': '[5, 10, 20]',
  'items-per-page': 10,
  'current-page': undefined,
  'total-items': 100,
  'disabled': undefined,
  'ath-aria-label': 'Paginación de resultados',
};

const eventControls = ['athPaginate', 'athItemsPerPageChange'];

const meta: Meta<PaginationArgs> = {
  title: 'Componentes/Pagination',
  component: 'ath-pagination',
  argTypes: {
    'no-end-buttons': {
      control: 'boolean',
      description: 'Oculta el botón para ir a la primera o última página',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'no-jump-buttons': {
      control: 'boolean',
      description: 'Oculta los botones para ir al siguiente o anterior bloque de páginas',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'no-items-count': {
      control: 'boolean',
      description: 'Oculta la cantidad de elementos hasta la página seleccionada y el total',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'no-items-selector': {
      control: 'boolean',
      description: 'Oculta el selector de elementos por página',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'items-selector': {
      control: 'object',
      description: 'Opciones para el selector de elementos por página. Debe ser un string que contenga un array de números positivos.',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: '[5, 10, 20]' },
      },
    },
    'items-per-page': {
      control: 'number',
      description: 'Número de elementos por página. Debe estar incluido en las opciones permitidas en `items-selector`.',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '10' },
      },
    },
    'current-page': {
      control: 'number',
      description: 'Página actual',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    'total-items': {
      control: 'number',
      description: 'Número total de elementos',
      table: {
        type: { summary: 'number' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Desactiva la paginación',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'ath-aria-label': {
      control: 'text',
      description: 'Texto accesible para el componente de paginación',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
      },
    },
    'athPaginate': {
      action: 'athPaginate',
      description: 'Se emite al cambiar de página',
      table: { type: { summary: 'EventEmitter<number>' }, category: 'EVENTS' },
    },
    'athItemsPerPageChange': {
      action: 'athItemsPerPageChange',
      description: 'Se emite al cambiar el número de elementos por página',
      table: { type: { summary: 'EventEmitter<number>' }, category: 'EVENTS' },
    },
  },
  args: { ...defaultPaginationArgs },
  parameters: {
    componentSubtitle:
      'Componente de paginación que permite navegar a través de conjuntos de datos divididos en páginas, con opciones personalizables de navegación y visualización. ' +
      'En caso de mostrarse en pantalla pequeña, algunos elementos se ocultarán automáticamente para mejorar la experiencia de usuario.',
    controls: { expanded: true },
    darkMode: { stylePreview: true },
    backgrounds: { disable: true },
    actions: { handles: [...eventControls] },
  },
  decorators: [withActions],
};

export default meta;

type Story = StoryObj<PaginationArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...eventControls]);
    return `<ath-pagination ${attributes}></ath-pagination>`;
  },
  args: { ...defaultPaginationArgs },
  tags: ['!autodocs'],
};

export const NoEndButtons: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...eventControls]);
    return `<ath-pagination ${attributes}></ath-pagination>`;
  },
  args: { ...defaultPaginationArgs, 'no-end-buttons': true },
  parameters: {
    controls: {
      exclude: ['no-end-buttons', 'no-jump-buttons', 'items-selector', 'items-per-page', 'total-items'],
    },
  },
};

export const NoJumpButtons: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...eventControls]);
    return `<ath-pagination ${attributes}></ath-pagination>`;
  },
  args: { ...defaultPaginationArgs, 'no-jump-buttons': true },
  parameters: {
    controls: {
      exclude: ['no-end-buttons', 'no-jump-buttons', 'items-selector', 'items-per-page', 'total-items'],
    },
  },
};

export const NoItemsCount: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...eventControls]);
    return `<ath-pagination ${attributes}></ath-pagination>`;
  },
  args: { ...defaultPaginationArgs, 'no-items-count': true },
  parameters: {
    controls: {
      exclude: ['no-items-count', 'no-items-selector', 'items-selector', 'items-per-page', 'total-items'],
    },
  },
};

export const NoItemsSelector: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...eventControls]);
    return `<ath-pagination ${attributes}></ath-pagination>`;
  },
  args: { ...defaultPaginationArgs, 'no-items-selector': true },
  parameters: {
    controls: { exclude: ['no-end-buttons', 'no-jump-buttons', 'no-items-count', 'no-items-selector', 'total-items'] },
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...eventControls]);
    return `<ath-pagination ${attributes}></ath-pagination>`;
  },
  args: { ...defaultPaginationArgs, disabled: true },
  parameters: {
    controls: {
      exclude: ['disabled', 'no-end-buttons', 'no-jump-buttons', 'no-items-count', 'no-items-selector', 'current-page', 'items-selector', 'items-per-page', 'total-items'],
    },
  },
};
