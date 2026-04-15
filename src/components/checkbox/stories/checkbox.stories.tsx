import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CheckboxArgs } from './checkbox.types';
import { getAttributesFromArgs } from '@utils/storybook';
import { withActions } from 'storybook/actions/decorator';

const controlEvents = ['athChange', 'athFocus', 'athBlur'];
const booleanArgs = ['autofocus', 'checked', 'disabled', 'indeterminate', 'readonly', 'required', 'hide-required'];

const defaultArgs: CheckboxArgs = {
  'aria-label': 'Descripción checkbox',
  'autofocus': undefined,
  'checked': undefined,
  'disabled': undefined,
  'feedback': undefined,
  'feedback-text': undefined,
  'helper-text': undefined,
  'indeterminate': undefined,
  'label': undefined,
  'name': undefined,
  'readonly': undefined,
  'required': undefined,
  'hide-required': true,
  'value': 'false',
  'athChange': () => {},
  'athFocus': () => {},
  'athBlur': () => {},
};

const meta: Meta<CheckboxArgs> = {
  title: 'Componentes/Checkbox/Checkbox',
  component: 'ath-checkbox',
  argTypes: {
    'autofocus': {
      control: 'boolean',
      description: 'Indica si el checkbox tiene inicialmente el foco',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'checked': {
      control: 'boolean',
      description: 'Indica si el checkbox está marcado por defecto',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Indica si el checkbox está deshabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'feedback': {
      control: 'select',
      options: ['none', 'error'],
      description: 'Especifica el tipo de feedback visual del checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'none' },
      },
    },
    'feedback-text': {
      control: 'text',
      description: 'Define el texto del mensaje de error',
      table: {
        type: { summary: 'string' },
      },
    },
    'helper-text': {
      control: 'text',
      description: 'Define el texto de ayuda que se muestra debajo del checkbox',
      table: {
        type: { summary: 'string' },
      },
    },
    'indeterminate': {
      control: 'boolean',
      description: 'Indica si el checkbox está en estado indeterminado por defecto',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'label': {
      control: 'text',
      description: 'Define el texto del label del checkbox',
      table: {
        type: { summary: 'string' },
      },
    },
    'name': {
      control: 'text',
      description: 'Define el nombre del checkbox para su identificación en formularios',
      table: {
        type: { summary: 'string' },
      },
    },
    'readonly': {
      control: 'boolean',
      description: 'Indica si el checkbox es de solo lectura',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'required': {
      control: 'boolean',
      description: 'Indica si el checkbox es obligatorio',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'hide-required': {
      control: 'boolean',
      description:
        'En un formulario en el que todos los campos son requeridos puede no ser necesario mostrar el asterisco en cada campo. Con este atributo, el asterisco puede ser mostrado o no aunque el campo sea requerido (required).',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'value': {
      control: 'select',
      options: ['true', 'false', 'indeterminate'],
      description: 'Especifica el valor actual del checkbox',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'false' },
      },
    },
    // ACCESSIBILITY
    'aria-label': {
      control: 'text',
      description: 'Atributo ARIA que proporciona una etiqueta accesible para el checkbox',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    // EVENTS
    'athChange': {
      action: 'athChange',
      description: 'Evento emitido al cambiar el estado del checkbox',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athFocus': {
      action: 'athFocus',
      description: 'Evento emitido al hacer foco en el checkbox',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athBlur': {
      action: 'athBlur',
      description: 'Evento emitido al desenfocar el checkbox',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    // METHODS
    'setFocus': {
      description: 'Método público que permite establecer el foco en el checkbox',
      table: {
        type: { summary: 'Function<void>' },
        category: 'METHODS',
      },
      control: false,
    },
  },
  args: { ...defaultArgs },
  parameters: {
    actions: { handles: [...controlEvents] },
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<CheckboxArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
      <div class="story__item">
        <ath-checkbox ${attributes}></ath-checkbox>
      </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox' },
  parameters: {
    controls: {
      exclude: [],
    },
    storyClass: 'flex-col w500',
  },
  tags: ['!autodocs'],
};

export const Autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
      <div class="story__item">
        <div class="story__item__label">Autofocus: ${args.autofocus}</div>
        <ath-checkbox ${attributes}></ath-checkbox>
      </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox', autofocus: true },
  parameters: {
    controls: {
      include: ['autofocus', 'label', 'setFocus'],
    },
    storyClass: 'flex-col w500',
  },
  tags: ['!autodocs'],
};

export const Checked: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
        <div class="story__item__label">Checked: ${args.checked}</div>
        <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox', checked: true },
  parameters: {
    controls: {
      include: ['checked', 'disabled', 'label', 'readonly'],
    },
    storyClass: 'flex-col w500',
  },
};

export const ConFeedback: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
      <div class="story__item__label">Con Feedback</div>
      <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, 'label': 'checkbox', 'feedback': 'error', 'feedback-text': 'Feedback text example' },
  parameters: {
    controls: {
      include: ['feedback', 'feedback-text', 'label'],
    },
    storyClass: 'flex-col w500',
  },
};

export const ConHelperText: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
      <div class="story__item__label">Con Helper Text</div>
      <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, 'label': 'checkbox', 'helper-text': 'Helper Text' },
  parameters: {
    controls: {
      include: ['helper-text', 'label', 'feedback', 'feedback-text'],
    },
    storyClass: 'flex-col w500',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
      <div class="story__item__label">Disabled: ${args.disabled}</div>
      <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox', disabled: true },
  parameters: {
    controls: {
      include: ['checked', 'disabled', 'label', 'readonly'],
    },
    storyClass: 'flex-col w500',
  },
};

export const Indeterminate: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
      <div class="story__item__label">Indeterminate: ${args.indeterminate}</div>
      <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox', indeterminate: true },
  parameters: {
    controls: {
      include: ['indeterminate', 'label'],
    },
    storyClass: 'flex-col w500',
  },
};

export const ReadOnly: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
      <div class="story__item__label">Read Only: ${args['readonly']}</div>
      <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox', readonly: true },
  parameters: {
    controls: {
      include: ['disabled', 'label', 'readonly'],
    },
    storyClass: 'flex-col w500',
  },
};

export const Required: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...controlEvents, 'setFocus'], boolean: booleanArgs });
    return `
    <div class="story__item">
      <div class="story__item__label">Required: ${args.required}</div>
      <ath-checkbox ${attributes}></ath-checkbox>
    </div>
    `;
  },
  args: { ...defaultArgs, label: 'checkbox', required: true },
  parameters: {
    controls: {
      include: ['label', 'required', 'hide-required'],
    },
    storyClass: 'flex-col w500',
  },
};
