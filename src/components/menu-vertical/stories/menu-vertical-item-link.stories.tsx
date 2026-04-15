import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { menuVerticalItemLinkArgTypes } from './menu-vertical.argtypes';
import { MenuVerticalItemLinkArgs, orderedArgs } from './menu-vertical-item-link.types';

const defaultArgs = {
  ...orderedArgs,
};

const meta: Meta<MenuVerticalItemLinkArgs> = {
  title: 'Componentes/Menu Vertical/Menu Vertical Item/Link',
  component: 'ath-menu-vertical-item-action',
  parameters: {
    componentSubtitle: 'Componente interactivo para abrir una url',
    actions: { handles: ['athSelected'] },
  },
  argTypes: menuVerticalItemLinkArgTypes,
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<MenuVerticalItemLinkArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
      <ath-menu-vertical-item-link ${attributes}></ath-menu-vertical-item-link>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    text: 'Link',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w200',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
      <ath-menu-vertical-item-link ${attributes}></ath-menu-vertical-item-link>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    text: 'Link',
    disabled: true,
  },
  parameters: {
    storyClass: 'flex-col w200',
    controls: {
      exclude: ['disabled'],
    },
  },
};

export const Icon: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
      <ath-menu-vertical-item-link ${attributes}>
      </ath-menu-vertical-item-link>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    icon: 'home_estrecha',
    text: 'Link',
  },
  parameters: {
    storyClass: 'flex-col w200',
  },
};

export const Nivel1: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
      <ath-menu-vertical-item-link ${attributes}>
      </ath-menu-vertical-item-link>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    text: 'Nivel 1 (link)',
  },
  parameters: {
    storyClass: 'flex-col',
  },
};

export const Nivel2: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
      <ath-menu-vertical-item-action text="Nivel 1 (action)" open>
        <ath-menu-vertical-item-link ${attributes}>
        </ath-menu-vertical-item-link>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    text: 'Nivel 2 (link)',
  },
  parameters: {
    storyClass: 'flex-col',
    controls: {
      exclude: ['icon'],
    },
  },
};

export const Nivel3: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
      <ath-menu-vertical-item-action text="Nivel 1 (action)">
        <ath-menu-vertical-item-action text="Nivel 2  (action)" open>
          <ath-menu-vertical-item-link ${attributes}>
          </ath-menu-vertical-item-link>
        </ath-menu-vertical-item-action>
      </ath-menu-vertical-item-action>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    text: 'Nivel 3 (link)',
  },
  parameters: {
    storyClass: 'flex-col',
    controls: {
      exclude: ['icon'],
    },
  },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <ath-menu-vertical>
        <ath-menu-vertical-item-link ${attributes}></ath-menu-vertical-item-link>
    </ath-menu-vertical>`;
  },
  args: {
    ...defaultArgs,
    text: 'Título',
    selected: 'true',
  },
  parameters: {
    storyClass: 'flex-col w200',
  },
};
