import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { ChipChoiceArgs } from './chip-choice.types';
import { ChipChoiceSize } from '../chip-choice.model';
import { chipChoiceArgTypes } from './chip-choice.argtypes';

const defaultArgs = {
  label: 'Label',
  size: 'md',
  role: 'checkbox',
};

const controlsEvents = ['athFocus', 'athBlur', 'athChange'];
const booleanArgs = ['disabled', 'selected'];

const meta: Meta<ChipChoiceArgs> = {
  title: 'Componentes/Chip Choice/Chip Choice',
  component: 'ath-chip-choice',
  parameters: {
    componentSubtitle:
      'Componente interactivo para selección de opciones con apariencia de chip. ' +
      'Permite al usuario seleccionar o deseleccionar una opción específica. ' +
      'Ideal para filtros, etiquetas seleccionables u opciones de configuración. ' +
      'Es necesario que el componente esté dentro de un ath-chip-choice-group para funcionar correctamente.',
    controls: { expanded: true, sort: 'alpha' },
    actions: { handles: controlsEvents },
  },
  tags: ['autodocs'],
  argTypes: chipChoiceArgTypes,
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<ChipChoiceArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });

    return `<ath-chip-choice ${attributes}></ath-chip-choice>`;
  },
  args: {
    ...defaultArgs,
    label: 'Label',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col',
  },
};

export const Selected: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
  <div class="story__item">
    <div class="story__item__label">selected: true</div>
    <ath-chip-choice ${attributes}></ath-chip-choice>
  </div>`;
  },
  args: { ...defaultArgs, selected: true },
  parameters: {
    controls: {
      exclude: [...controlsEvents],
    },
    storyClass: 'flex-col',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
  <div class="story__item">
    <div class="story__item__label">disabled: true</div>
    <ath-chip-choice ${attributes}></ath-chip-choice>
  </div>`;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'disabled'],
    },
    storyClass: 'flex-col',
  },
};

export const Icon: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    return `
  <div class="story__item">
    <div class="story__item__label">icon: ${args.icon}</div>
    <ath-chip-choice ${attributes}></ath-chip-choice>
  </div>`;
  },
  args: { ...defaultArgs, icon: 'placeholder' },
  parameters: {
    controls: {
      exclude: [...controlsEvents],
    },
    storyClass: 'flex-col',
  },
};

export const Size: Story = {
  render: args => {
    const sizes = [ChipChoiceSize.Small, ChipChoiceSize.Medium];

    const attributes = getAttributesFromArgs(args, { exclude: controlsEvents, boolean: booleanArgs });
    const html = `
${sizes
  .map(
    size => `
  <div class="story__item">
    <div class="story__item__label">size: ${size}</div>
    <ath-chip-choice ${attributes} size=${size}></ath-chip-choice>
  </div>`,
  )
  .join('')}`;
    return html;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'size'],
    },
  },
};
