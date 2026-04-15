import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { RadioButtonArgs, ordererArgs } from './radio-button.types';
import { radioButtonArgTypes } from './radio-button.argtypes';

const defaultArgs = {
  ...ordererArgs,
  label: 'Label',
  name: 'radio-button',
};

const eventsControls = ['athFocus', 'athBlur', 'athChange'];
const booleanArgs = ['disabled', 'readonly', 'show-required'];

const meta: Meta<RadioButtonArgs> = {
  title: 'Componentes/Radio Button/Radio Button',
  component: 'ath-radio-button',

  args: { ...defaultArgs },
  argTypes: radioButtonArgTypes,
  decorators: [withActions],
  parameters: {
    actions: { handles: [...eventsControls] },
    componentSubtitle: 'Elementos de formulario que permiten a los usuarios seleccionar una única opción sobre el resto de forma excluyente.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<RadioButtonArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventsControls, boolean: booleanArgs });

    return `
    <div class="story__item">
      <ath-radio-button ${attributes}></ath-radio-button>
    </div>`;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    storyClass: 'flex-col w400',
  },
  tags: ['!autodocs'],
};

export const Checked: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: eventsControls, boolean: booleanArgs });

    return `
            <div class="story__item">
              <ath-radio-button ${attributes}'></ath-radio-button>
            </div>
          `;
  },
  args: { ...defaultArgs, checked: true },
  parameters: {
    controls: {
      include: ['readonly', 'checked', 'disabled'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: eventsControls, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-radio-button ${attributes} ></ath-radio-button>
            </div>
          `;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      include: ['disabled', 'checked', 'readonly'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ReadOnly: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: eventsControls, boolean: booleanArgs });
    return `
            <div class="story__item">
              <ath-radio-button ${attributes}'></ath-radio-button>
            </div>
          `;
  },
  args: { ...defaultArgs, readonly: true },
  parameters: {
    controls: {
      include: ['disabled', 'readonly', 'checked'],
    },
    storyClass: 'flex-col w400',
  },
};
