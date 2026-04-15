import { h } from '@stencil/core';
import React from 'react';
import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { CardSelectableGroupArgs, cardSelectableGroupOrdererArgs, CardSelectableSlot } from './card-selectable.types';
import { cardSelectableGroupArgTypes } from './card-selectable-group.argtypes';

const SubtitleWithLink: React.FC = () => (
  <div>
    Componente contenedor para agrupaciones de componentes ath-card-selectable dentro de una{' '}
    <a href="/?path=/docs/utilidades-foundations-grid-general--docs" target="_blank">
      Grid
    </a>
    .
  </div>
);

const defaultArgs = {
  ...cardSelectableGroupOrdererArgs,
  defaultSlot: CardSelectableSlot.defaultSlot,
};

const controlsEvents = ['athValueChanged'];

const meta: Meta<CardSelectableGroupArgs> = {
  title: 'Componentes/Card Selectable/Card Selectable Group',
  component: 'ath-card-selectable-group',
  parameters: {
    actions: { handles: ['athValueChanged'] },
    componentSubtitle: <SubtitleWithLink />,
  },
  tags: ['autodocs'],
  argTypes: cardSelectableGroupArgTypes,
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<CardSelectableGroupArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'defaultSlot']);

    return `
    <ath-card-selectable-group ${attributes}>
      ${args.defaultSlot ?? ''}
    </ath-card-selectable-group>`;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col mt75',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'defaultSlot']);

    return `
    <ath-card-selectable-group ${attributes}>
      ${args.defaultSlot ?? ''}
    </ath-card-selectable-group>`;
  },
  args: {
    ...defaultArgs,
    disabled: true,
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'disabled'],
    },
    storyClass: 'flex-col mt75',
  },
};

export const Size: Story = {
  render: args => {
    const sizes = ['sm', 'md'];
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'defaultSlot']);
    const html = `
      ${sizes
        .map(
          size => `
        <div class="story__item">
          <div class="story__item__label">size: ${size}</div>
          <ath-card-selectable-group ${attributes} size=${size}>
            ${args.defaultSlot ?? ''}
          </ath-card-selectable-group>
        </div>`,
        )
        .join('')}`;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'size'],
    },
  },
};

export const Multiple: Story = {
  render: args => {
    const types = [true, false];
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'defaultSlot']);
    const html = `
      ${types
        .map(
          type => `
        <div class="story__item flex-row">
          <div class="story__item__label">multiple: ${type}</div>
          <ath-card-selectable-group ${attributes} multiple=${type}>
            ${args.defaultSlot ?? ''}
          </ath-card-selectable-group>
        </div>`,
        )
        .join('')}`;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'multiple'],
    },
  },
};
