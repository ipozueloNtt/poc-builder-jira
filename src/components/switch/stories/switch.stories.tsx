import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { SwitchArgs } from './switch.types';
import { withActions } from 'storybook/actions/decorator';

const defaultSwitchArgs: SwitchArgs = {
  'disabled': undefined,
  'name': 'SwitchName',
  'readonly': undefined,
  'selected': undefined,
  'athFocus': undefined,
  'athBlur': undefined,
  'athChange': undefined,
  'aria-label': 'Etiqueta',
  'aria-labelledby': undefined,
  'aria-describedby': undefined,
  'setFocus': undefined,
};

const meta: Meta<SwitchArgs> = {
  title: 'Componentes/Switch',
  component: 'ath-switch',
  argTypes: {
    'disabled': {
      control: 'boolean',
      description: 'Bloquea la interacción con el switch',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'selected': {
      control: 'boolean',
      description: 'Indica si el switch está seleccionado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'readonly': {
      control: 'boolean',
      description: 'Indica si el switch es de solo lectura',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'name': {
      control: 'text',
      description: 'Nombre para identificar el switch',
      table: {
        type: { summary: 'string' },
      },
    },
    'athFocus': {
      action: 'athFocus',
      description: 'Evento emitido al enfocar el switch',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athBlur': {
      action: 'athBlur',
      description: 'Evento emitido al desenfocar el switch',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athChange': {
      action: 'athChange',
      description: 'Evento emitido al cambiar el estado del switch',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Atributo ARIA que proporciona una etiqueta accesible para el switch',
      table: {
        type: { summary: 'string' },
        category: 'Accessibility',
      },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Atributo ARIA que indica uno o varios IDs con los elementos que proporcionan una etiqueta accesible para el switch',
      table: {
        type: { summary: 'string' },
        category: 'Accessibility',
      },
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'Atributo ARIA que indica uno o varios IDs con los elementos que proporcionan una descripción para el switch',
      table: {
        type: { summary: 'string' },
        category: 'Accessibility',
      },
    },

    'setFocus': {
      description: 'Hace focus en el switch',
      table: { type: { summary: '() => Promise<void>' }, category: 'Methods' },
      control: false,
    },
  },
  args: { ...defaultSwitchArgs },
  parameters: {
    componentSubtitle: 'Es un componente que permite alternar entre dos estados, similar a un botón de encendido/apagado.',
    darkMode: { stylePreview: true },
    actions: {
      handles: ['athFocus', 'athBlur', 'athChange'],
    },
    backgrounds: { disable: true },
  },
  tags: ['autodocs'],
  decorators: [withActions],
};
export default meta;
type Story = StoryObj<SwitchArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athFocus', 'athBlur', 'athChange']);
    return `<ath-switch ${attributes}></ath-switch>`;
  },
  args: { ...defaultSwitchArgs },
  tags: ['!autodocs'],
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `<ath-switch ${attributes}></ath-switch>`;
  },
  args: {
    ...defaultSwitchArgs,
    disabled: true,
  },
  parameters: {
    controls: {
      include: ['disabled', 'selected'],
    },
  },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `<ath-switch ${attributes}></ath-switch>`;
  },
  args: {
    ...defaultSwitchArgs,
    selected: true,
  },
  parameters: {
    controls: {
      include: ['selected'],
    },
  },
};

export const Readonly: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `<ath-switch ${attributes}></ath-switch>`;
  },
  args: {
    ...defaultSwitchArgs,
    readonly: true,
  },
  parameters: {
    controls: {
      include: ['readonly', 'selected'],
    },
  },
};
