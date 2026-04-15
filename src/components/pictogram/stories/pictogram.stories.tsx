import { Meta, StoryObj } from '@storybook/web-components-vite';
import { PictogramArgs } from './pictogram.types';
import { getAttributesFromArgs, pictogramNamesList } from '@utils/storybook';
import { PictogramSizeType } from '../pictogram.model';

const defaultArgs = {
  size: 'sm',
  name: 'illu_cnmv',
};

const pictogramSizes = Object.values(PictogramSizeType);

const meta: Meta<PictogramArgs> = {
  title: 'Componentes/Pictogram',
  component: 'ath-pictogram',
  tags: ['autodocs'],
  argTypes: {
    'size': {
      control: 'inline-radio',
      options: pictogramSizes,
      description: 'Define el tamaño del pictograma',
      table: { type: { summary: 'PictogramSizeType' }, defaultValue: { summary: 'md' } },
    },
    'name': {
      control: { type: 'select' },
      options: pictogramNamesList,
      description: 'Indica el nombre del pictograma que se mostrará',
      table: { type: { summary: 'string' } },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Define un texto como nombre accesible del pictograma, si contiene información relevante',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Define uno o varios identificadores que contienen el texto a utilizar como nombre accesible del pictograma, si contiene información relevante',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    componentSubtitle: 'Permite renderizar cualquier pictograma disponible en la Galería de pictrogramas mediante su nombre como atributo. ',
  },
};
export default meta;

type Story = StoryObj<PictogramArgs>;

export const Playground: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args);

    return `<div class="ds-sb-item">
      <ath-pictogram ${attributes}></ath-pictogram>
      ${args['aria-labelledby'] ? `<span id="${args['aria-labelledby']}"></span>` : ''}

    </div>`;
  },
  args: {
    name: pictogramNamesList[0],
  },
  tags: ['!autodocs'],
};

export const Size: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['size']);
    const sizes = Object.values(PictogramSizeType);

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label">Size: ${size}</div>
          <ath-pictogram ${attributes} size="${size}"></ath-pictogram>
        </div>`,
      )
      .join('');
  },
  args: {
    name: pictogramNamesList[0],
  },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};

export const Accesibility: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args);

    return `<div class="ds-sb-item">
      <ath-pictogram ${attributes}></ath-pictogram>
    </div>`;
  },
  args: {
    'name': pictogramNamesList[0],
    'aria-label': 'Demo',
  },
  parameters: {
    controls: {
      exclude: ['name', 'aria-label'],
    },
  },
  tags: ['!autodocs'],
};
