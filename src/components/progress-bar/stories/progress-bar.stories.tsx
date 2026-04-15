import { Meta, StoryObj } from '@storybook/web-components-vite';
import { ProgressBarLabelAlignment } from '../progress-bar.model';
import { getAttributesFromArgs } from '@utils/storybook';

type ProgressBarArgs = {
  'infinite': boolean;
  'label-alignment': string;
  'label-left': string;
  'label-right': string;
  'max': number;
  'min': number;
  'value': number;
  'value-text': string;
  'ath-aria-label': string;
};

const defaultProgressBarArgs: ProgressBarArgs = {
  'infinite': undefined,
  'label-alignment': ProgressBarLabelAlignment.Stack,
  'label-left': undefined,
  'label-right': undefined,
  'max': 100,
  'min': 0,
  'value': 50,
  'value-text': undefined,
  'ath-aria-label': 'Progress bar',
};

const meta: Meta<ProgressBarArgs> = {
  title: 'Componentes/Progress Bar',
  component: 'ath-progress-bar',
  argTypes: {
    'infinite': {
      control: 'boolean',
      description: 'Determina si la barra de progreso es infinita o no.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'label-alignment': {
      control: 'inline-radio',
      options: Object.values(ProgressBarLabelAlignment),
      description: 'Alineación de las etiquetas de la barra de progreso',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'stack' },
      },
    },
    'label-left': {
      control: 'text',
      description: 'Texto de la etiqueta izquierda',
      table: {
        type: { summary: 'string' },
      },
    },
    'label-right': {
      control: 'text',
      description: 'Texto de la etiqueta derecha. Esta etiqueta no se muestra si la propiedad `label-alignment` es `inline`',
      table: {
        type: { summary: 'string' },
      },
    },
    'max': {
      control: 'number',
      description: 'Valor máximo',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '100' },
      },
    },
    'min': {
      control: 'number',
      description: 'Valor mínimo',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    'value': {
      control: 'number',
      description: 'Valor actual',
      table: {
        type: { summary: 'number' },
      },
    },
    'value-text': {
      control: 'text',
      description: 'Etiqueta accesible para el valor actual (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    'ath-aria-label': {
      control: 'text',
      description: 'Etiqueta accesible para la barra de progreso',
      table: {
        type: { summary: 'string' },
        category: 'Accessibility',
      },
    },
  },
  args: { ...defaultProgressBarArgs },
  parameters: {
    componentSubtitle: 'Es un componente visual que indica el avance de una operación en curso ',
    controls: { expanded: true },
    darkMode: {
      stylePreview: true,
    },
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ProgressBarArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `<ath-progress-bar ${attributes}></ath-progress-bar>`;
  },
  args: { ...defaultProgressBarArgs },
  tags: ['!autodocs'],
};

export const Infinite: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `<ath-progress-bar ${attributes}></ath-progress-bar>`;
  },
  args: { ...defaultProgressBarArgs, infinite: true },
  parameters: {
    controls: { exclude: ['ath-aria-label', 'min', 'max', 'value'] },
  },
};

export const LabelLeft: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `
      <ath-progress-bar label-left="${args['label-left']}" ${attributes}></ath-progress-bar>
    `;
  },
  args: { ...defaultProgressBarArgs, 'label-left': 'Left Label' },
  parameters: {
    controls: { exclude: ['ath-aria-label'] },
    storyClass: '',
  },
};

export const LabelRight: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `
      <ath-progress-bar label-right="${args['label-right']}" ${attributes}></ath-progress-bar>
    `;
  },
  args: { ...defaultProgressBarArgs, 'label-right': 'Right Label' },
  parameters: {
    controls: { exclude: ['ath-aria-label'] },
    storyClass: '',
  },
};

export const LabelAlignment: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    const labelAlignments = Object.values(ProgressBarLabelAlignment);

    return labelAlignments
      .map(
        alignment => `
        <div class="story__item w-full">
          <div class="story__item__label">label-alignment: ${alignment}</div>
          <ath-progress-bar label-alignment="${alignment}" ${attributes}></ath-progress-bar>
        </div>
      `,
      )
      .join('');
  },
  args: { ...defaultProgressBarArgs, 'label-left': 'Left Label', 'label-right': 'Right Label' },
  parameters: {
    controls: { exclude: ['label-alignment'] },
    storyClass: '',
  },
};

export const MinMaxAndCurrentValue: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `<div class="story__item w-full">
              <div class="story__item__label">value: ${args.value}</div>
              <ath-progress-bar value="${args.value}" ${attributes}></ath-progress-bar>
            </div>`;
  },
  args: {
    ...defaultProgressBarArgs,
    'value': 33,
    'min': 10,
    'max': 150,
    'label-left': 'Valor mínimo 10',
    'label-right': 'Valor máximo 150',
  },
  parameters: {
    controls: { exclude: ['infinite', 'ath-aria-label'] },
    storyClass: '',
  },
};
