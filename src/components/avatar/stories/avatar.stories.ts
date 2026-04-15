import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { AvatarArgs, ordererArgs } from './avatar.types';
import { avatarArgTypes } from './avatar.argtypes';

const defaultArgs = {
  ...ordererArgs,
};

const meta: Meta<AvatarArgs> = {
  title: 'Componentes/Avatar',
  component: 'ath-avatar',

  args: { ...defaultArgs },
  argTypes: avatarArgTypes,
  parameters: {
    componentSubtitle: 'Un Avatar es un componente visual que representa a una persona, entidad o contenido mediante una imagen, ilustración, iniciales o ícono.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<AvatarArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgSlot']);

    return `
    <div class="story__item">
      <ath-avatar ${attributes}>
      ${args.type === 'image' || args.type === '' ? args.imgSlot : ''}
      </ath-avatar>
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

export const ConImagen: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgSlot']);

    return `
    <div class="story__item">
      <ath-avatar ${attributes}>
      ${args.type === 'image' || args.type === '' ? args.imgSlot : ''}
      </ath-avatar>
    </div>`;
  },
  args: {
    ...defaultArgs,
    type: 'image',
    size: 'md',
  },
  parameters: {
    controls: {
      include: ['img', 'size'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConAvatarName: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgSlot']);

    return `
    <div class="story__item">
      <ath-avatar ${attributes}>
      ${args.type === 'image' || args.type === '' ? args.imgSlot : ''}
      </ath-avatar>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'avatar-name': 'Pablo Ignacio Casales',
    'type': 'initials',
    'size': 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'El componente avatar puede calcular las iniciales de avatar-name en caso de que la propiedad initials no este rellenado.',
      },
    },
    controls: {
      include: ['initials', 'size', 'avatar-name'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConIniciales: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['imgSlot']);

    return `
    <div class="story__item">
      <ath-avatar ${attributes}>
      ${args.type === 'image' || args.type === '' ? args.imgSlot : ''}
      </ath-avatar>
    </div>`;
  },
  args: {
    ...defaultArgs,
    initials: 'gc',
    type: 'initials',
    size: 'md',
  },
  parameters: {
    controls: {
      include: ['initials', 'size', 'avatar-name'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Size: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['size', 'imgSlot']);
    const sizes = ['xs', 'sm', 'md', 'lg'];

    const html = `
      ${sizes
        .map(
          size => `
              <div class="story__item">
                <div class="story__item__label" >Size: ${size}</div>
                <ath-avatar ${attributes} size="${size}">
                  ${args.type === 'image' || args.type === '' ? args.imgSlot : ''}
                </ath-avatar>
              </div>
          `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['size'],
    },
    storyClass: 'flex-row w400',
  },
};

export const Type: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['type', 'imgSlot', 'initials']);
    const types = ['default', 'initials', 'image'];

    const html = `
      ${types
        .map(
          type => `
              <div class="story__item">
                <div class="story__item__label" >Type: ${type}</div>
                <ath-avatar ${attributes} type="${type}" ${type === 'initials' ? 'initials=' + args.initials : ''}>
                  ${args.type === 'image' || args.type === '' ? args.imgSlot : ''}
                </ath-avatar>
              </div>
          `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
    initials: 'GC',
  },
  parameters: {
    controls: {
      exclude: ['type'],
    },
    storyClass: 'flex-row w400',
  },
};
