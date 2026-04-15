import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CardDefaultSlot, CardHeaderArgs } from './card.types';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultCardHeaderArgs: Partial<CardHeaderArgs> = {
  'date': '01/01/9999',
  'heading-text': 'Oscar Ortiz Fernández',
  'subtitle': '75 años',
  'overline': 'Particulares',
};

const meta: Meta<CardHeaderArgs> = {
  title: 'Componentes/Card/Card Header',
  component: 'ath-accordion',
  argTypes: {
    'date': {
      control: 'text',
      description: 'Fecha de la card',
      table: {
        type: { summary: 'string' },
      },
    },

    'heading-text': {
      control: 'text',
      description: 'Título de la card',
      table: {
        type: { summary: 'string' },
      },
    },

    'subtitle': {
      control: 'text',
      description: 'Subtítulo de la card',
      table: {
        type: { summary: 'string' },
      },
    },

    'overline': {
      control: 'text',
      description: 'Overline de la card',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: { ...defaultCardHeaderArgs },
  parameters: {
    componentSubtitle: 'Este componente se utiliza para introducir los encabezados para la card, en el slot header de ath-card',
  },
};
export default meta;

type Story = StoryObj<CardHeaderArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item">
        <ath-card>
         <ath-card-header ${attributes} slot="header"></ath-card-header>
        </ath-card>
      </div>
    `;
  },
  args: { ...defaultCardHeaderArgs },
  parameters: {
    storyClass: 'flex-row w400',
  },
  tags: ['!autodocs'],
};

export const ConThumbnail: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
      <div class="story__item">
        <ath-card>
          ${CardDefaultSlot.thumbnailSlot}
         <ath-card-header ${attributes} slot="header">
         </ath-card-header>
        </ath-card>
      </div>
    `;
  },
  args: { ...defaultCardHeaderArgs },
  parameters: {
    controls: {
      include: ['overline'],
    },
    storyClass: 'flex-row w400',
  },
};
