import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { TableAlignment, TableFrozen } from '../table.model';

type TableHeaderItemArgs = {
  'alignment': string;
  'cell-width': string;
  'frozen': string;
  'has-interactivity': boolean;
  'defaultSlot': string;
};

const defaultTableHeaderItemArgs: TableHeaderItemArgs = {
  'alignment': TableAlignment.Left,
  'cell-width': 'auto',
  'frozen': TableFrozen.None,
  'has-interactivity': false,
  'defaultSlot': 'Header Item',
};

const meta: Meta<TableHeaderItemArgs> = {
  title: 'Componentes/Table/Table Header Item',
  component: 'ath-table-header-item',
  argTypes: {
    'alignment': {
      control: 'inline-radio',
      options: Object.values(TableAlignment),
      description: 'Alineación de la columna',
      table: {
        type: { summary: 'TableAlignmentType' },
        defaultValue: { summary: defaultTableHeaderItemArgs.alignment },
      },
    },
    'cell-width': {
      control: 'text',
      description: 'Ancho de la columna (px, %, auto)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: defaultTableHeaderItemArgs['cell-width'] },
      },
    },
    'frozen': {
      control: 'inline-radio',
      options: Object.values(TableFrozen),
      description: 'Indica si esta columna está fijada',
      table: {
        type: { summary: 'TableFrozenType' },
        defaultValue: { summary: defaultTableHeaderItemArgs.frozen },
      },
    },
    'has-interactivity': {
      control: 'boolean',
      description:
        'Indica si esta columna contiene elementos interactivos (menús, botones, enlaces, etc.). Deshabilitará los eventos de clic de fila en las celdas de esta columna.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: String(defaultTableHeaderItemArgs['has-interactivity']) },
      },
    },
    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      description: 'Contenido de la celda',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
  },
  args: { ...defaultTableHeaderItemArgs },
  parameters: {
    componentSubtitle:
      'Componente de celda de cabecera para tablas, permitiendo personalizar el ancho, alineación y otras propiedades. Mediante su uso en un contexto de tabla, dichas propiedades son propagadas al resto de filas de la misma columna.',
  },
};
export default meta;

type Story = StoryObj<TableHeaderItemArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
  <div class="story__item">
    <ath-table-header>
      <ath-table-header-item ${attributes}>
        ${args.defaultSlot}
      </ath-table-header-item>
    </ath-table-header>
  </div>`;
  },
  args: { ...defaultTableHeaderItemArgs },
  tags: ['!autodocs'],
};

export const CellWidth: Story = {
  name: 'Ancho de columna',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['cell-width', 'defaultSlot']);
    const widths = ['75px', '300px', '150px', 'auto (100% / 4 = 25%)'];

    return `
    <ath-table-header>
    ${widths
      .map(
        width => `
      <ath-table-header-item cell-width="${width}" ${attributes}>
        ${width}
      </ath-table-header-item>
`,
      )
      .join('')}
    </ath-table-header>
`;
  },
  argTypes: {
    'cell-width': {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Puede ajustarse el ancho de la columna mediante el atributo `cell-width`, que acepta valores como `px` o `%`. Por defecto, el valor es `auto`, calculando proporcionalmente el ancho entre el número de columnas.',
      },
    },
  },
};

export const Alignment: Story = {
  name: 'Alineación',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['alignment', 'defaultSlot']);
    const alignments = Object.values(TableAlignment);

    return `
  <div class="story__item" style="width: 100%">
    <ath-table-header>
      ${alignments
        .map(
          alignment => `
      <ath-table-header-item alignment="${alignment}" ${attributes}>
        ${alignment}
      </ath-table-header-item>
`,
        )
        .join('')}
    </ath-table-header>
  </div>`;
  },
  argTypes: {
    alignment: {
      control: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'La alineación de la columna puede ajustarse mediante el atributo `alignment`.',
      },
    },
  },
};
