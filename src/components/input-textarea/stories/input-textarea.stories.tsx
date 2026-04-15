import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { InputTextareaArgs, ordererArgs } from './input-textarea.types';
import { InputSizes } from '../input-textarea.models';
import { inputTextArgTypes } from 'components/input-text/stories/input-text.argtypes';

const controlsEvents = ['athBlur', 'athChange', 'athFocus', 'athInput'];
const booleanArgs = ['autofocus', 'disabled', 'counter', 'readonly', 'required', 'hide-required'];

const defaultArgs: InputTextareaArgs = {
  ...ordererArgs,
  label: 'Label',
  name: 'textarea',
  rows: 5,
};

const meta: Meta<InputTextareaArgs> = {
  title: 'Componentes/Input Textarea',
  component: 'ath-input-textarea',
  parameters: {
    componentSubtitle: 'El componente input textarea permite realizar entradas de texto que se extienden a lo largo de varias líneas.',
    actions: { handles: [...controlsEvents] },
  },
  tags: ['autodocs'],
  argTypes: {
    'autofocus': inputTextArgTypes.autofocus,
    'autocomplete': inputTextArgTypes.autocomplete,
    'counter': inputTextArgTypes.counter,
    'disabled': inputTextArgTypes.disabled,
    'feedback': inputTextArgTypes.feedback,
    'feedback-text': inputTextArgTypes['feedback-text'],
    'helper-text': inputTextArgTypes['helper-text'],
    'input-tabindex': inputTextArgTypes['input-tabindex'],
    'label': inputTextArgTypes.label,
    'maxlength': inputTextArgTypes.maxlength,
    'name': inputTextArgTypes.name,
    'placeholder': inputTextArgTypes.placeholder,
    'readonly': inputTextArgTypes.readonly,
    'required': inputTextArgTypes.required,
    'rows': {
      control: { type: 'number' },
      description: 'Especifica la altura visible del textarea (Expresado en número de lineas)',
      table: { type: { summary: 'number' } },
    },
    'hide-required': inputTextArgTypes['hide-required'],
    'size': inputTextArgTypes.size,
    'tooltip-text': inputTextArgTypes['tooltip-text'],
    'tooltip-width': inputTextArgTypes['tooltip-width'],

    // Accesibility
    'counter-label': inputTextArgTypes['counter-label'],
    'input-aria-label': inputTextArgTypes['input-aria-label'],

    // Eventos
    'athFocus': inputTextArgTypes.athFocus,
    'athBlur': inputTextArgTypes.athBlur,
    'athChange': inputTextArgTypes.athChange,
    'athInput': inputTextArgTypes.athInput,

    // Métodos
    'setFocus': inputTextArgTypes.setFocus,
  },
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<InputTextareaArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
    `;
  },
  args: {
    ...defaultArgs,
    'label': 'Label',
    'feedback': 'error',
    'feedback-text': 'Error feedback text',
    'helper-text': 'Helper text to complete the field',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400 mt75',
  },
};

export const Autofocus: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, autofocus: true },
  tags: ['!autodocs'],
  parameters: {
    controls: {
      include: ['autofocus'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConCounter: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, counter: true },
  parameters: {
    controls: {
      include: ['maxlength', 'counter-label', 'feedback', 'feedback-text', 'helper-text'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      include: ['label', 'feedback', 'feedback-text', 'helper-text', 'value'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConFeedback: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, 'feedback': 'error', 'feedback-text': 'Feedback text' },
  parameters: {
    controls: {
      include: ['feedback', 'feedback-text', 'helper-text', 'counter', 'maxlength'],
    },
    storyClass: 'flex-col w400',
  },
};

export const NoEnfocable: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, 'input-tabindex': '-1' },
  parameters: {
    controls: {
      include: ['input-tabindex'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConHelperText: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, 'helper-text': 'Helper text to complete the field' },
  parameters: {
    controls: {
      include: ['feedback', 'feedback-text', 'helper-text', 'counter', 'maxlength'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConLabel: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, label: 'Label' },
  parameters: {
    controls: {
      include: ['label', 'input-aria-label', 'required', 'hide-required', 'tooltip-text', 'tooltip-width'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Placeholder: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, placeholder: 'Placeholder', value: '' },
  parameters: {
    controls: {
      include: ['placeholder'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ReadOnly: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}'></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, readonly: true },
  parameters: {
    controls: {
      include: ['readonly'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Required: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, label: 'Label', required: true },
  parameters: {
    controls: {
      include: ['required', 'hide-required', 'label', 'tooltip-text'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Size: Story = {
  render: args => {
    const sizes = [InputSizes.Small, InputSizes.Medium, InputSizes.Large];

    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    const html = `
        ${sizes
          .map(
            size => `
              <div class="story__item">
                <div class="story__item__label">Size: ${size}</div>
                <ath-input-textarea ${attributes} size="${size}"></ath-input-textarea>
              </div>`,
          )
          .join('')}
    `;
    return html;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: ['placeholder', 'icon', 'icon-position'],
    },
  },
};

export const ConTooltip: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-input-textarea ${attributes}></ath-input-textarea>
            </div>
          `;
  },
  args: { ...defaultArgs, 'tooltip-text': 'This is a tooltip', 'label': 'Label' },
  parameters: {
    controls: {
      include: ['label', 'required', 'hide-required', 'tooltip-text', 'tooltip-width'],
    },
    storyClass: 'flex-col w400 mt50',
  },
};
