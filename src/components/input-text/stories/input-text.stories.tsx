import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { InputTextArgs, ordererArgs } from './input-text.types';
import { InputSizes } from '../input-text.model';
import { inputTextArgTypes } from './input-text.argtypes';

const defaultArgs = {
  ...ordererArgs,
  label: 'Label',
  name: 'input-text',
  type: 'text',
};

const controlsEvents = ['athFocus', 'athBlur', 'athClear', 'athChange', 'athInput'];
const booleanArgs = ['autofocus', 'disabled', 'counter', 'has-clear', 'readonly', 'required', 'hide-required', 'submit-on-enter'];

const meta: Meta<InputTextArgs> = {
  title: 'Componentes/Input Text',
  component: 'ath-input-text',
  parameters: {
    actions: { handles: [...controlsEvents] },
    componentSubtitle: 'Recomendado para campos de formulario de texto libre. Cuenta con propiedades para mostrar feedback, textos de ayuda, contador de caracteres, entre otros. ',
  },
  tags: ['autodocs'],
  argTypes: inputTextArgTypes,
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<InputTextArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
    <ath-input-text ${attributes}></ath-input-text>`;
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
              <div class="story__item__label">Autofocus</div>
              <ath-input-text ${attributes}></ath-input-text>
            </div>
  `;
  },
  args: { ...defaultArgs, autofocus: true },
  tags: ['!autodocs'], // Remove story from Doc to do not force focus to this input
  parameters: {
    controls: {
      include: ['autofocus'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConClearButton: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, 'has-clear': true, 'value': 'Value' },
  parameters: {
    controls: {
      include: ['disabled', 'size', 'icon', 'icon-position', 'clear-button-aria-label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConCounter: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, counter: true, maxlength: 150 },
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
              <ath-input-text ${attributes} disabled></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, disabled: true, value: 'abc' },
  parameters: {
    controls: {
      include: ['disabled', 'has-clear'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConFeedback: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, 'feedback': 'error', 'tooltip-text': 'Feedback text' },
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
              <ath-input-text ${attributes}></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, 'input-tabindex': '-1' },
  parameters: {
    controls: {
      include: ['has-clear', 'input-tabindex'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConHelperText: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes} helper-text="Helper text to complete the field"></ath-input-text>
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

export const ConIcon: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, 'icon': 'scope', 'icon-position': 'left' },
  parameters: {
    controls: {
      include: ['icon', 'icon-position', 'size', 'type'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConLabel: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
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
              <ath-input-text ${attributes}></ath-input-text>
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
              <ath-input-text ${attributes}></ath-input-text>
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
              <ath-input-text ${attributes}></ath-input-text>
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

export const SearchType: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
            </div>
          `;
  },
  args: { ...defaultArgs, type: 'search' },
  parameters: {
    controls: {
      include: ['icon', 'icon-position', 'size', 'type'],
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
            ${
              size
                ? `
                      <div class="story__item">
                        <div class="story__item__label">Size: ${size}</div>
                        <ath-input-text ${attributes} size="${size}"></ath-input-text>
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
      include: ['placeholder', 'icon', 'icon-position', 'type'],
    },
  },
};

export const ConTooltip: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-input-text ${attributes}></ath-input-text>
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
