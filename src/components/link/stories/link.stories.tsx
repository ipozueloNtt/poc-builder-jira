import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { linkSize } from '../link.model';
import { linkArgTypes } from './link.argtypes';
import { LinkArgs, ordererArgs } from './link.types';
import { withActions } from 'storybook/actions/decorator';

const defaultArgs = {
  ...ordererArgs,
};

const controlsEvents = ['athClick', 'athFocus', 'athBlur'];

const meta: Meta<LinkArgs> = {
  title: 'Componentes/Link',
  component: 'ath-link',
  parameters: {
    componentSubtitle:
      'También conocido como enlace, es un componente interactivo que permite a los usuarios navegar a otra página, sección o recurso dentro o fuera de una interfaz digital.',
    actions: { handles: ['athClick', 'athFocus', 'athBlur'] },
  },
  argTypes: linkArgTypes,
  args: { ...defaultArgs },
  decorators: [withActions],
};

export default meta;

type Story = StoryObj<LinkArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, controlsEvents);

    return `
    <ath-link ${attributes}>${args.defaultSlot}</ath-link>`;
  },
  args: {
    ...defaultArgs,
    defaultSlot: 'Link',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400',
  },
};

export const ConIcono: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);
    return `
            <div class="story__item">
              <div class="story__item__label">icon: external_link_comp</div>
              <ath-link ${attributes}>${args.defaultSlot}</ath-link>
            </div>
          `;
  },
  args: { ...defaultArgs, icon: 'external_link_comp', defaultSlot: 'Link' },
  parameters: {
    controls: {
      include: ['icon', 'icon-aria-label', 'defaultSlot', 'underline'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);
    return `
            <div class="story__item">
              <div class="story__item__label">Disabled</div>
              <ath-link ${attributes}>${args.defaultSlot}</ath-link>
            </div>
          `;
  },
  args: { ...defaultArgs, disabled: true, defaultSlot: 'Link' },
  parameters: {
    controls: {
      include: ['disabled', 'defaultSlot', 'icon', 'size', 'underline'],
    },
    storyClass: 'flex-col w400',
  },
};

export const SinSubrayado: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);
    return `
            <div class="story__item">
              <div class="story__item__label">underline: false</div>
              <ath-link ${attributes} >${args.defaultSlot}</ath-link>
            </div>
          `;
  },
  args: { ...defaultArgs, underline: false, defaultSlot: 'Link', icon: 'external_link_comp' },
  parameters: {
    controls: {
      include: ['underline', 'defaultSlot', 'size', 'disabled'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Size: Story = {
  render: args => {
    const sizes = [linkSize.Sm, linkSize.Md, linkSize.Lg];

    const attributes = getAttributesFromArgs(args, ['size', 'defaultSlot']);
    const html = `
        ${sizes
          .map(
            size => `
              <div class="story__item">
            ${
              size
                ? `
                  <div class="story__item">
                    <div class="story__item__label">Size: ${size}</div>
                    <ath-link ${attributes} size="${size}">${args.defaultSlot}</ath-link>
                  </div>
                `
                : ''
            }
            </div>`,
          )
          .join('')}
          `;
    return html;
  },
  args: { ...defaultArgs, defaultSlot: 'Link', icon: 'external_link_comp' },
  parameters: {
    controls: {
      include: ['icon', 'icon-aria-label', 'defaultSlot', 'size', 'disabled', 'underline'],
    },
  },
};
