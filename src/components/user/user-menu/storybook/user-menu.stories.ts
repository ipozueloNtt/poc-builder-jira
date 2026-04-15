import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { UserMenuArgs, ordererArgs } from './user-menu.types';
import { UserMenuArgTypes } from './user-menu.argtypes';
import { AvatarTypes } from 'components/avatar/avatar.model';

const defaultArgs = {
  ...ordererArgs,
};

const meta: Meta<UserMenuArgs> = {
  title: 'Componentes/User/User Menu',
  component: 'ath-user-menu',
  decorators: [withActions],
  args: { ...defaultArgs },
  argTypes: UserMenuArgTypes,
  parameters: {
    actions: { handles: ['athAction'] },
    componentSubtitle: 'Nos da información sobre el usuario y está preparado para desplegar un menú de opciones cuando se interactúa con él.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<UserMenuArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-menu ${attributes}>
      ${args.defaultSlot != undefined ? args.defaultSlot : ''}
      </ath-user-menu>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'José Antonio',
    'src-image': undefined,
  },
  parameters: {
    storyClass: 'flex-col w400 h200',
  },
  tags: ['autodocs'],
};

export const Open: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-menu ${attributes}>
      ${args.defaultSlot != undefined ? args.defaultSlot : ''}
      </ath-user-menu>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'José Antonio',
    'open': true,
    'src-image': undefined,
  },
  parameters: {
    storyClass: 'flex-col w400 h200',
  },
  tags: ['autodocs'],
};

export const ConImagen: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-menu ${attributes}>
      ${args.defaultSlot != undefined ? args.defaultSlot : ''}
      </ath-user-menu>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'José Antonio',
  },
  parameters: {
    storyClass: 'flex-col w400 h200',
    controls: {
      exclude: ['initials', 'type'],
    },
  },
  tags: ['autodocs'],
};

export const ConIniciales: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athAction']);

    return `
    <div class="story__item">
      <ath-user-menu ${attributes}>
      ${args.defaultSlot != undefined ? args.defaultSlot : ''}
      </ath-user-menu>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'user-name': 'José Antonio',
    'type': AvatarTypes.Initials,
    'initials': 'JA',
  },
  parameters: {
    storyClass: 'flex-col w400 h200',
  },
  tags: ['autodocs'],
};

export const Type: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['type', 'defaultSlot', 'src-image', 'athAction']);
    const types = ['default', 'initials', 'image', 'hide-avatar'];

    const html = `
      ${types
        .map(
          type => `
              <div class="story__item">
                <div class="story__item__label" >Type: ${type}</div>
                <ath-user-menu ${attributes} type="${type}" ${type === 'image' ? 'src-image="' + args['src-image'] + '"' : ''}>
                   ${args.defaultSlot != undefined ? args.defaultSlot : ''}
                </ath-user-menu>
              </div>
          `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
    'user-name': 'José Antonio',
  },
  parameters: {
    controls: {
      exclude: ['type', 'src-image'],
    },
    storyClass: 'flex-row h200',
  },
};
