import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { SliderArgs, ordererArgs } from './slider.types';
import { SliderArgTypes } from './slider.argtypes';

const defaultArgs = {
  ...ordererArgs,
  'label-group': 'Label',
  'name': 'slider',
};

const controlsEvents = ['athFocus', 'athBlur', 'athChange'];

const meta: Meta<SliderArgs> = {
  title: 'Componentes/Slider',
  component: 'ath-slider',
  parameters: {
    actions: { handles: ['athFocus', 'athBlur', 'athChange'] },
    componentSubtitle: 'Es un componente que permite seleccionar un valor o un rango dentro de un intervalo continuo, arrastrando un control sobre una pista.',
  },
  tags: ['autodocs'],
  argTypes: SliderArgTypes,
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<SliderArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, controlsEvents);

    return `
    <ath-slider ${attributes}></ath-slider>`;
  },
  args: {
    ...defaultArgs,
    'label-group': 'Pagar préstamo en...',
    'group-aria-label': 'Slider',
    'from-aria-label': 'Indica los plazos',
    'feedback': 'error',
    'detail-first': '12 meses',
    'detail-last': '96 meses',
    'min': 12,
    'max': 96,
    'step': 12,
    'unit': 'meses',
    'value-text': 'meses',
    'stepped': true,
    'feedback-text': 'Error feedback text',
    'helper-text': 'Helper text to complete the field',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400 mt75',
  },
};

export const ConDetails: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);

    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: {
    ...defaultArgs,
    'tooltip-text': 'This is a tooltip',
    'detail-first': 'First detail',
    'detail-last': 'Last detail',
    'group-aria-label': 'Slider',
    'label-group': 'Label',
  },
  parameters: {
    controls: {
      include: ['label-group', 'detail-first', 'detail-last', 'required', 'show-required', 'tooltip-text', 'group-aria-label'],
    },
    storyClass: 'flex-col w400 mt50',
  },
};

export const ConTooltip: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);

    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: { ...defaultArgs, 'tooltip-text': 'This is a tooltip', 'label-group': 'Label', 'group-aria-label': 'Slider' },
  parameters: {
    controls: {
      include: ['label-group', 'required', 'show-required', 'tooltip-text', 'group-aria-label'],
    },
    storyClass: 'flex-col w400 mt50',
  },
};

export const ConUnit: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);

    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: { ...defaultArgs, 'label-group': 'Label', 'unit': 'unit', 'value': '12', 'group-aria-label': 'Slider' },
  parameters: {
    controls: {
      include: ['unit', 'type', 'value', 'group-aria-label'],
    },
    storyClass: 'flex-col w400 mt50',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);
    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: { ...defaultArgs, 'disabled': true, 'value': '1', 'group-aria-label': 'Slider' },
  parameters: {
    controls: {
      include: ['disabled', 'tooltip', 'helper-text', 'unit', 'group-aria-label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Feedback: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);
    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: {
    ...defaultArgs,
    'label-group': 'Label',
    'feedback': 'error',
    'feedback-text': 'Error feedback text',
    'feedback-counter': 'from',
    'group-aria-label': 'Slider',
  },
  parameters: {
    controls: {
      include: ['feedback', 'feedback-text', 'feedback-counter', 'type', 'group-aria-label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ReadOnly: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);
    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: { ...defaultArgs, 'readonly': true, 'value': '12', 'group-aria-label': 'Slider' },
  parameters: {
    controls: {
      include: ['readonly', 'unit', 'value', 'group-aria-label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Required: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);
    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: { ...defaultArgs, 'label-group': 'Label', 'required': true, 'group-aria-label': 'Slider' },
  parameters: {
    controls: {
      include: ['required', 'show-required', 'label-group', 'tooltip-text', 'group-aria-label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Stepped: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);
    return `
            <div class="story__item">
              <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: { ...defaultArgs, 'label-group': 'Label', 'step': 10, 'stepped': true, 'group-aria-label': 'Slider' },
  parameters: {
    controls: {
      include: ['label-group', 'min', 'max', 'step', 'stepped', 'group-aria-label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Range: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, controlsEvents);
    return `
            <div class="story__item">
                <ath-slider ${attributes}></ath-slider>
            </div>
          `;
  },
  args: {
    ...defaultArgs,
    'group-aria-label': 'Importe inicial',
    'from-aria-label': 'Importe de inicio',
    'to-aria-label': 'Importe final',
    'type': 'range',
    'label-group': 'Importe inicial',
    'feedback': 'error',
    'detail-first': '0 Euros',
    'detail-last': '2000 Euros',
    'min': 0,
    'max': 2000,
    'unit': '€',
    'value-text': 'Euros',
    'feedback-text': 'Error feedback text',
    'helper-text': 'Helper text to complete the field',
  },
  parameters: {
    storyClass: 'flex-col w400',
  },
};
