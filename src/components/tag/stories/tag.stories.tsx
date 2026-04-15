import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TagArgs } from './tag.types';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { TagColor, TagSize } from '../tag.model';

const defaultArgs = {
  'heading-text': 'Caducada',
};

const iconList = ['', ...iconNamesList];

const meta: Meta<TagArgs> = {
  title: 'Componentes/Tag',
  component: 'ath-tag',
  tags: ['autodocs'],
  argTypes: {
    'color': {
      control: 'radio',
      description: 'Color basado en el propósito del mensaje',
      options: Object.values(TagColor),
      table: {
        type: { summary: 'tagColorTypes' },
        defaultValue: { summary: 'primary' },
      },
    },
    'size': {
      control: 'radio',
      description: 'Tamaño del componente tag',
      options: Object.values(TagSize),
      table: {
        type: { summary: 'tagSizes' },
        defaultValue: { summary: 'md' },
      },
    },

    'heading-text': {
      control: 'text',
      description: 'Contenido de texto del componente tag',
    },
    'heading-level': {
      control: { type: 'select', labels: { undefined: '--Sin heading-level--' } },
      options: [undefined, 1, 2, 3, 4, 5, 6],
      description: 'Nivel de encabezado para el texto del tag, valor entre 1 y 6, sólo en caso de ser necesario',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
      },
    },
    'icon': {
      control: { type: 'select', labels: { '': '--Sin icono--' } },
      options: iconList,
      description: 'Icono que se muestra a la izquierda del heading-text/slot',
      table: {
        type: { summary: 'string' },
      },
    },
    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      table: {
        category: 'SLOTS',
        type: { summary: 'string' },
      },
      description: 'Slot para el contenido del tag, sólo es visible si no tiene heading-text configurado',
    },
  },

  args: {
    color: 'primary',
    size: 'md',
  },
  parameters: {
    componentSubtitle: 'Para poder visualizar el componente ath-tag es necesario definir un heading-text o slot de texto como contenido.',
    controls: { expanded: true },
  },
};

export default meta;

type Story = StoryObj<TagArgs>;

export const Playground: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);

    return `
  <ath-tag ${attributes}><slot></slot></ath-tag>
`;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
};

export const Color: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['color', 'defaultSlot']);
    const colors = ['primary', 'secondary', 'accent', 'danger', 'warning', 'success', 'disabled'];

    return colors
      .map(
        color => `
        <div class="story__item">
          <div class="story__item__label">Color: ${color}</div>
          <ath-tag ${attributes} color="${color}">${args.defaultSlot} </ath-tag>
        </div>`,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['color'],
    },
  },
};
export const Size: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['size', 'defaultSlot']);
    const sizes = ['sm', 'md', 'lg'];

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label">Size: ${size}</div>
          <ath-tag ${attributes} size="${size}"></ath-tag>
        </div>`,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};

export const Icon: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);

    return `
      <div class="story__item">
        <ath-tag ${attributes}></ath-tag>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    icon: 'exclamation',
  },
};
