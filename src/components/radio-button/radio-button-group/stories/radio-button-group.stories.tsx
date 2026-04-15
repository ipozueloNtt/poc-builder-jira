import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { RadioButtonGroupArgs, ordererArgs } from './radio-button-group.types';
import { radioButtonGroupArgTypes } from './radio-button-group.argtypes';

const controlsEvents = ['athChangeValue'];
const booleanArgs = ['disabled', 'readonly', 'show-required'];

const defaultArgs = {
  ...ordererArgs,
  label: 'Label',
  name: 'radio-button-group',
};

const meta: Meta<RadioButtonGroupArgs> = {
  title: 'Componentes/Radio Button/Radio Button Group',
  component: 'ath-radio-button-group',

  args: { ...defaultArgs },
  argTypes: radioButtonGroupArgTypes,
  decorators: [withActions],
  parameters: {
    actions: { handles: [...controlsEvents] },
    componentSubtitle: 'Componente que agrupa y gestiona la selección de Radio Buttons.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<RadioButtonGroupArgs>;

const generateRadioButtons = (n = 3) => {
  let radioButtons = '';
  for (let i = 0; i < n; i++) {
    radioButtons += `<ath-radio-button label="Radio ${i + 1}" value="Radio ${i + 1}"></ath-radio-button>`;
  }
  return radioButtons;
};

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
    <ath-radio-button-group ${attributes}>
      ${generateRadioButtons()}
    </ath-radio-button-group>`;
  },
  args: {
    ...defaultArgs,
    label: 'Label',
    name: 'radio-button',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400',
  },
};

export const ConFeedback: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-radio-button-group ${attributes}>
                ${generateRadioButtons()}
              </ath-radio-button-group>
            </div>
          `;
  },
  args: { ...defaultArgs, 'feedback-text': 'Ejemplo Feedback', 'feedback': 'error' },
  parameters: {
    controls: {
      include: ['feedback-text', 'feedback', 'helper-text', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConHelper: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-radio-button-group ${attributes}>
                ${generateRadioButtons()}
              </ath-radio-button-group>
            </div>
          `;
  },
  args: { ...defaultArgs, 'helper-text': 'Ejemplo Helper' },
  parameters: {
    controls: {
      include: ['feedback-text', 'feedback', 'helper-text', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConTooltip: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-radio-button-group ${attributes}>
                ${generateRadioButtons()}
              </ath-radio-button-group>
            </div>
          `;
  },
  args: { ...defaultArgs, 'tooltip-text': 'Tooltip' },
  parameters: {
    controls: {
      include: ['show-required', 'tooltip-text', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-radio-button-group ${attributes}>
                ${generateRadioButtons()}
              </ath-radio-button-group>
            </div>
          `;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      include: ['disabled', 'readonly', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Orientation: Story = {
  render: args => {
    const orientations = ['vertical', 'horizontal'];
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return orientations
      .map(
        orientation => `
            <div class="story__item">
              <ath-radio-button-group ${attributes} orientation="${orientation}">
                ${generateRadioButtons()}
              </ath-radio-button-group>
            </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: ['disabled', 'readonly', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ReadOnly: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-radio-button-group ${attributes}>
                ${generateRadioButtons()}
              </ath-radio-button-group>
            </div>
          `;
  },
  args: { ...defaultArgs, readonly: true },
  parameters: {
    controls: {
      include: ['disabled', 'readonly', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};
