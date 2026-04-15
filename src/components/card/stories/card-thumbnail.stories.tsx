import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CardThumbnailArgs, CardDefaultSlot } from './card.types';
import { getAttributesFromArgs } from '@utils/storybook';
import { ThumbnailType } from '../card-thumbnail/card-thumbnail.model';

const defaultCardThumbnailArgs: CardThumbnailArgs = {
  'avatarSlot': CardDefaultSlot.avatarSlot,
  'bottom-tag': undefined,
  'highlight-text': undefined,
  'imgThumbnailSlot': CardDefaultSlot.imgThumbnailSlot,
  'top-tag': undefined,
  'type': ThumbnailType.Default,
};

const meta: Meta<CardThumbnailArgs> = {
  title: 'Componentes/Card/Card Thumbnail',
  component: 'ath-card-thumbnail',
  argTypes: {
    'avatarSlot': {
      control: 'text',
      name: 'avatar',
      description: 'slot img para añadir avatar al thumbnail de la card.' + '<br>Solo para type="avatar"',
      table: { category: 'SLOTS', type: { summary: 'img' } },
    },

    'bottom-tag': {
      control: 'text',
      description: 'Texto bottom tag para el thumbnail de la card.' + '<br>Solo para type="default"',
      table: {
        type: { summary: 'string' },
      },
    },

    'highlight-text': {
      control: 'text',
      description: 'Texto highlight para el thumbnail de la card.' + '<br>Solo para type="highlight"',
      table: {
        type: { summary: 'string' },
      },
    },

    'imgThumbnailSlot': {
      control: 'text',
      name: 'img-thumbnail',
      description: 'slot img-thumbnail para añadir img al thumbnail de la card',
      table: { category: 'SLOTS', type: { summary: 'img' } },
    },

    'top-tag': {
      control: 'text',
      description: 'Texto top tag para el thumbnail de la card.' + '<br>Solo para type="default"',
      table: {
        type: { summary: 'string' },
      },
    },

    'type': {
      control: 'select',
      options: ['default', 'highlight', 'avatar'],
      description: 'Tipo de thumbnail de la card',
      table: {
        type: { summary: 'default|highlight|avatar' },
        defaultValue: { summary: ThumbnailType.Default },
      },
    },
  },
  args: { ...defaultCardThumbnailArgs },
  parameters: {
    componentSubtitle: 'Este componente se utiliza para introducir la imagen y caracteristicas, en el slot thumbnail de ath-card',
  },
};
export default meta;

type Story = StoryObj<CardThumbnailArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgThumbnailSlot', 'avatarSlot']);

    return `
      <div class="story__item">
        <ath-card>
          <ath-card-thumbnail slot="thumbnail" ${attributes}>
            ${args.imgThumbnailSlot}
            ${args.avatarSlot}
          </ath-card-thumbnail>
         ${CardDefaultSlot.bodySlot}
        </ath-card>
      </div>
    `;
  },
  args: { ...defaultCardThumbnailArgs },
  parameters: {
    controls: {
      exclude: [],
    },
    storyClass: 'flex-row w400',
  },
  tags: ['!autodocs'],
};

export const Tags: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgThumbnailSlot', 'avatarSlot', 'type']);

    return `
        <div class="story__item">
          <div class="story__item__label">Default</div>
          <ath-card>
            <ath-card-thumbnail slot="thumbnail" ${attributes}>
              ${args.imgThumbnailSlot ?? ''}
              ${args.avatarSlot ?? ''}
            </ath-card-thumbnail>
          ${CardDefaultSlot.bodySlot ?? ''}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardThumbnailArgs, 'top-tag': 'Top tag', 'bottom-tag': 'Bottom tag' },
  parameters: {
    controls: {
      include: ['top-tag', 'bottom-tag'],
    },
    storyClass: 'flex-row w400',
  },
  tags: [],
};

export const Types: Story = {
  render: (args): string => {
    const types = ['default', 'highlight', 'avatar'];
    const attributes = getAttributesFromArgs(args, ['imgThumbnailSlot', 'avatarSlot', 'type']);

    return types
      .map(
        type => `
        <div class="story__item">
          <div class="story__item__label">Type: ${type}</div>
          <ath-card>
            <ath-card-thumbnail slot="thumbnail" type=${type} ${attributes}>
              ${args.imgThumbnailSlot}
              ${args.avatarSlot}
            </ath-card-thumbnail>
          ${CardDefaultSlot.bodySlot}
          </ath-card>
        </div>
      `,
      )
      .join('');
  },
  args: { ...defaultCardThumbnailArgs, 'highlight-text': 'Highlight', 'top-tag': 'Top tag', 'bottom-tag': 'Bottom tag' },
  parameters: {
    controls: {
      exclude: ['type'],
    },
    storyClass: 'flex-row w400',
  },
  tags: [],
};

export const TypeHighligth: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgThumbnailSlot', 'avatarSlot', 'type']);

    return `
        <div class="story__item">
          <div class="story__item__label">Type Highlight</div>
          <ath-card>
            <ath-card-thumbnail slot="thumbnail" type="highlight" ${attributes}>
              ${args.imgThumbnailSlot}
              ${args.avatarSlot}
            </ath-card-thumbnail>
          ${CardDefaultSlot.bodySlot}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardThumbnailArgs, 'highlight-text': 'Highlight' },
  parameters: {
    controls: {
      include: ['highlight-text'],
    },
    storyClass: 'flex-row w400',
  },
  tags: [],
};

export const TypeAvatar: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgThumbnailSlot', 'avatarSlot', 'type']);

    return `
        <div class="story__item">
          <div class="story__item__label">Type Avatar</div>
          <ath-card>
            <ath-card-thumbnail slot="thumbnail" type="avatar" ${attributes}>
              ${args.imgThumbnailSlot}
              ${args.avatarSlot}
            </ath-card-thumbnail>
          ${CardDefaultSlot.bodySlot}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardThumbnailArgs },
  parameters: {
    controls: {
      include: ['avatar'],
    },
    storyClass: 'flex-row w400',
  },
  tags: [],
};

export const ConHeaderYBody: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgThumbnailSlot', 'avatarSlot']);

    return `
        <div class="story__item">
          <div class="story__item__label">Con componentes header y body</div>
          <ath-card>
            <ath-card-thumbnail slot="thumbnail" ${attributes}>
              ${args.imgThumbnailSlot}
              ${args.avatarSlot}
            </ath-card-thumbnail>
            ${CardDefaultSlot.headerSlot}
            ${CardDefaultSlot.bodySlot}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardThumbnailArgs },
  parameters: {
    storyClass: 'flex-row w400',
  },
  tags: [],
};
