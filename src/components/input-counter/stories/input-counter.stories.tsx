import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { InputCounterArgs, ordererArgs } from './input-counter.types';
import { InputCounterSizes } from '../input-counter.model';
import { inputCounterArgTypes } from './input-counter.argtypes';

const defaultArgs = {
  ...ordererArgs,
  label: 'Label',
  name: 'input-counter',
};

const controlsEvents = ['athFocus', 'athBlur', 'athChange', 'athInput'];
const booleanArgs = ['hide-controls', 'disabled', 'readonly', 'required', 'hide-required'];

const meta: Meta<InputCounterArgs> = {
  title: 'Componentes/Input Counter',
  component: 'ath-input-counter',
  parameters: {
    actions: { handles: [...controlsEvents] },
    componentSubtitle: 'Se trata de un componente de formulario que permite al usuario aumentar o disminuir un valor numérico mediante controles incrementales.',
  },
  tags: ['autodocs'],
  argTypes: inputCounterArgTypes,
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<InputCounterArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
    <ath-input-counter ${attributes}></ath-input-counter>`;
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

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, disabled: true, value: '1' },
  parameters: {
    controls: {
      include: ['disabled', 'tooltip', 'helper-text', 'size', 'unit'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConFeedback: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, 'feedback': 'error', 'feedback-text': 'Feedback text' },
  parameters: {
    controls: {
      include: ['feedback', 'feedback-text', 'helper-text', 'unit', 'size', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConHelperText: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, 'helper-text': 'Helper text to complete the field' },
  parameters: {
    controls: {
      include: ['helper-text', 'feedback', 'feedback-text', 'unit', 'size', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConTooltip: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, 'tooltip-text': 'This is a tooltip', 'label': 'Label' },
  parameters: {
    controls: {
      include: ['label', 'required', 'show-required', 'tooltip-text', 'tooltip-width'],
    },
    storyClass: 'flex-col w400 mt50',
  },
};

export const ConUnit: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, 'label': 'Tiempo invertido', 'unit': 'h', 'unit-aria-label': 'horas' },
  parameters: {
    controls: {
      include: ['unit', 'unit-aria-label', 'placeholder'],
    },
    storyClass: 'flex-col w400 mt50',
  },
};

export const Placeholder: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, placeholder: 'Placeholder', value: '' },
  parameters: {
    controls: {
      include: ['placeholder', 'unit'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ReadOnly: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}'></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, readonly: true },
  parameters: {
    controls: {
      include: ['readonly', 'unit'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Required: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, label: 'Label', required: true },
  parameters: {
    controls: {
      include: ['required', 'show-required', 'label', 'tooltip-text'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Size: Story = {
  render: args => {
    const sizes = Object.values(InputCounterSizes);

    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    const html = `
        ${sizes
          .map(
            size => `
                      <div class="story__item">
            ${
              size
                ? `
                      <div class="story__item">
                        <div class="story__item__label">Size: ${size}</div>
                        <ath-input-counter ${attributes} size="${size}"></ath-input-counter>
                      </div>
                    `
                : ''
            }
            </div>`,
          )
          .join('')}
          `;
    return html;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: ['placeholder', 'helper-text', 'feedback', 'feedback-text', 'label', 'tootlip'],
    },
  },
};

export const SinControls: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-counter ${attributes}></ath-input-counter>
            </div>
          `;
  },
  args: { ...defaultArgs, 'hide-controls': true },
  parameters: {
    controls: {
      include: ['hide-controls', 'feedback', 'feedback-text', 'helper-text'],
    },
    storyClass: 'flex-col w400',
  },
};
