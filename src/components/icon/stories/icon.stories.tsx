import { Meta, StoryObj } from '@storybook/web-components-vite';
import { IconArgs } from './icon.types';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { IconSize } from '@utils/helper';
import { IconColor } from '../icon.model';

const defaultArgs = {
  size: 'sm',
  color: 'default',
  icon: 'add',
};

const iconSizes = Object.values(IconSize);

const meta: Meta<IconArgs> = {
  title: 'Componentes/Icon',
  component: 'ath-icon',
  tags: ['autodocs'],
  argTypes: {
    'size': {
      control: 'inline-radio',
      options: iconSizes,
      description: 'Define el tamaño del icono',
      table: { type: { summary: 'IconSizeTypes' }, defaultValue: { summary: 'md' } },
    },
    'icon': {
      control: { type: 'select' },
      options: iconNamesList,
      description: 'Indica el nombre del icono que se mostrará',
      table: { type: { summary: 'string' } },
    },
    'color': {
      control: 'radio',
      description: 'Color del icono',
      options: Object.values(IconColor),
      table: {
        type: { summary: 'iconColorTypes' },
        defaultValue: { summary: 'default' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Define un texto como nombre accesible del icono, si contiene información relevante',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Define uno o varios identificadores que contienen el texto a utilizar como nombre accesible del icono, si contiene información relevante',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    componentSubtitle: 'Permite renderizar cualquier icono disponible en la Galería de iconos mediante su nombre como atributo. ',
  },
};
export default meta;

type Story = StoryObj<IconArgs>;

export const Playground: Story = {
  render: args => {
    const attributes = getAttributesFromArgs({
      'icon': args.icon,
      'color': args.color,
      'size': args.size,
      'aria-label': args['aria-label'] || undefined,
      'aria-labelledby': args['aria-labelledby'] || undefined,
    });
    return `<div class="ds-sb-item">
      <ath-icon ${attributes}></ath-icon>
      <span id="${args['aria-labelledby']}"></span>
    </div>`;
  },
  tags: ['!autodocs'],
};
export const Size: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['size']);
    const sizes = ['xs', 'sm', 'md', 'lg'];

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label">Size: ${size}</div>
          <ath-icon ${attributes} size="${size}"></ath-icon>
        </div>`,
      )
      .join('');
  },
  args: {
    size: 'md',
    color: 'default',
  },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};
export const Color: Story = {
  render: (args): string => {
    const colors = ['default', 'primary', 'info', 'accent', 'error', 'warning', 'success', 'inverse', 'disabled'];

    return colors
      .map(
        color => `
          <div class="story__item">
            <div class="story__item__label">Color: ${color}</div>
            <ath-icon icon="${args.icon}" size="${args.size}" color="${color}"></ath-icon>
          </div>`,
      )
      .join('');
  },
  args: {
    size: 'md',
    color: 'primary',
  },
  parameters: {
    controls: {
      exclude: ['color'],
    },
  },
};
