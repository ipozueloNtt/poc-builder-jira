import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { SegmentedControlArgs, defaultArgs } from './segmented-control.types';
import { segmentedControlArgTypes } from './segmented-control.argtypes';
import { SegmentedControlColors, SegmentedControlSizes, SegmentedControlTypes } from '../segmented-control.model';

const meta: Meta<SegmentedControlArgs> = {
  title: 'Componentes/Segmented Control/Segmented Control',
  component: 'ath-segmented-control',

  args: { ...defaultArgs },
  argTypes: segmentedControlArgTypes,
  decorators: [withActions],
  parameters: {
    actions: { handles: ['athChangeValue'] },
    componentSubtitle: 'Componente de control segmentado que permite seleccionar entre múltiples opciones.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<SegmentedControlArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <ath-segmented-control ${attributes}>
    <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
    <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
    <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
  </ath-segmented-control>
`;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400',
  },
};

export const Sizes: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['size', 'athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });
    const sizes = Object.values(SegmentedControlSizes);
    return sizes
      .map(
        size => `
  <div class="story__item" style="width: 400px;">
    <div class="story__item__label">size: ${size}</div>
    <ath-segmented-control size="${size}" ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `,
      )
      .join('');
  },
  parameters: {
    controls: {
      include: ['color', 'disabled', 'type'],
    },
    storyClass: 'grid grid-cols-2 justify-around',
  },
};

export const Types: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['type', 'athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });
    const types = Object.values(SegmentedControlTypes);

    return types
      .map(
        type => `
  <div class="story__item" style="width: 400px;">
    <div class="story__item__label">type: ${type}</div>
    <ath-segmented-control type="${type}" ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `,
      )
      .join('');
  },
  args: {
    'helper-text': 'Este es un texto de ayuda para el usuario',
    'feedback': 'error',
    'feedback-text': 'Este es un mensaje de feedback de error',
  },
  parameters: {
    controls: {
      include: ['size', 'color', 'disabled'],
    },
    storyClass: 'flex justify-around',
  },
};

export const Colors: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['color', 'athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });
    const colors = Object.values(SegmentedControlColors);

    return colors
      .map(
        color => `
  <div class="story__item">
    <div class="story__item__label">color: ${color}</div>
    <ath-segmented-control color="${color}" ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `,
      )
      .join('');
  },
  parameters: {
    controls: {
      exclude: ['color'],
    },
    storyClass: 'flex justify-around',
  },
};

export const Icons: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item">
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item icon="arrow_left" icon-position="left">icon-position: left</ath-segmented-control-item>
      <ath-segmented-control-item icon="home_estrecha" icon-position="icon-only" title="icon-position: icon-only"></ath-segmented-control-item>
      <ath-segmented-control-item icon="arrow_right" icon-position="right">icon-position: right</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: ['color', 'disabled', 'size', 'type'],
    },
    storyClass: 'flex-col w450',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item">
    <div class="story__item__label">disabled: true</div>
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      include: ['color', 'size'],
    },
    storyClass: 'flex-col w400',
  },
};

export const DisabledItems: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item">
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item disabled>Opción 2 (disabled)</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: ['color', 'size', 'disabled'],
    },
    storyClass: 'flex-col w400',
  },
};

export const HelperText: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item">
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: { ...defaultArgs, 'helper-text': 'Este es un texto de ayuda para el usuario' },
  parameters: {
    controls: {
      include: ['helper-text', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Feedback: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item">
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: { ...defaultArgs, 'feedback': 'error', 'feedback-text': 'Debes seleccionar una opción válida' },
  parameters: {
    controls: {
      include: ['feedback', 'feedback-text', 'helper-text'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Required: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item">
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: { 'required': true, 'hide-required': false },
  parameters: {
    controls: {
      include: ['required', 'hide-required', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Tooltip: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: ['disabled', 'required', 'hideRequired'] });

    return `
  <div class="story__item" style="width: 400px;">
    <ath-segmented-control ${attributes}>
      <ath-segmented-control-item>Opción 1</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 2</ath-segmented-control-item>
      <ath-segmented-control-item>Opción 3</ath-segmented-control-item>
    </ath-segmented-control>
  </div>
    `;
  },
  args: {
    ...defaultArgs,
    'type': SegmentedControlTypes.Select,
    'tooltip-text': 'Esto es un tooltip de ejemplo',
    'tooltip-width': 300,
  },
  parameters: {
    controls: {
      include: ['tooltip-text', 'tooltip-width', 'label'],
    },
    storyClass: 'justify-around mt75',
  },
};
