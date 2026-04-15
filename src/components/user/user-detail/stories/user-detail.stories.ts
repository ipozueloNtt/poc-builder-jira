import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import { UserDetailArgs, ordererArgs } from './user-detail.types';
import { userDetailArgTypes } from './user-detail.argtypes';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultArgs = {
  ...ordererArgs,
};

const meta: Meta<UserDetailArgs> = {
  title: 'Componentes/User/User Detail',
  component: 'ath-avatar',

  args: { ...defaultArgs },
  argTypes: userDetailArgTypes,
  parameters: {
    actions: { handles: ['athAction'] },
    componentSubtitle: 'Contiene información extra sobre el usuario. El título puede ser clickable o no.',
  },
  decorators: [withActions],
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<UserDetailArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-detail ${attributes}>
        ${args.defaultSlot}
      </ath-user-detail>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'Francisco José',
    'description': 'Description',
  },
  parameters: {
    storyClass: 'flex-col w400',
  },
  tags: ['!autodocs'],
};

export const Clickable: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-detail ${attributes}>
        ${args.defaultSlot}
      </ath-user-detail>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'Francisco José',
    'description': 'Description',
    'clickable': true,
  },
  argTypes: {
    clickable: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'flex-col w400',
  },
};

export const ConImagen: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-detail ${attributes}>
        ${args.defaultSlot}
      </ath-user-detail>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'Francisco José',
    'description': 'Description',
    'src-image': './assets/images/person-shadow.png',
  },
  argTypes: {
    clickable: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'flex-col w400',
    controls: {
      exclude: ['initials', 'type'],
    },
  },
};

export const Type: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction', 'type', 'src-image']);
    const types = ['default', 'image', 'initials', 'hide-avatar'];
    return types
      .map(
        type => `
          <div class="story__item" style="padding: 20px; gap: 50px">
            <div class="story__item__label">Type: ${type}</div>
            <ath-user-detail ${attributes} type="${type}" ${type === 'image' ? 'src-image="' + args['src-image'] + '"' : ''}>
              ${args.defaultSlot}
            </ath-user-detail>
          </div>
        `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
    'user-name': 'Francisco José',
    'description': 'Description',
    'src-image': './assets/images/person-shadow.png',
  },
  argTypes: {
    type: {
      control: false,
    },
  },
  parameters: {
    storyClass: 'flex-row',
  },
};
