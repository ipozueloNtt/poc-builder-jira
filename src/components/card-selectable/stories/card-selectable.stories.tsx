import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { CardSelectableArgs, cardSelectableOrdererArgs, CardSelectableSlot } from './card-selectable.types';
import { cardSelectableArgTypes } from './card-selectable.argtypes';

const defaultArgs = {
  ...cardSelectableOrdererArgs,
  bodySlot: CardSelectableSlot.bodySlot,
};

const controlsEvents = ['athFocus', 'athBlur', 'athChange'];

const meta: Meta<CardSelectableArgs> = {
  title: 'Componentes/Card Selectable/Card Selectable',
  component: 'ath-card-selectable',
  parameters: {
    actions: { handles: ['athFocus', 'athBlur', 'athChange'] },
    componentSubtitle:
      'La card selectable se puede considerar una variante de la card que permite al usuario seleccionar y deseleccionar de forma visual e intuitiva como si fuese un checkbox o un radiobutton.',
  },
  tags: ['autodocs'],
  argTypes: cardSelectableArgTypes,
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<CardSelectableArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'bodySlot']);

    return `
    <ath-card-selectable ${attributes}>${args.bodySlot ?? ''}</ath-card-selectable>`;
  },
  args: {
    ...defaultArgs,
    'overline': 'Overline',
    'heading-text': 'Heading text',
    'subtitle': 'Subtitle',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400 mt75',
  },
};

export const ConTag: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'bodySlot']);

    return `
    <ath-card-selectable ${attributes}>${args.bodySlot ?? ''}</ath-card-selectable>`;
  },
  args: {
    ...defaultArgs,
    'overline': 'Overline',
    'heading-text': 'Heading text',
    'subtitle': 'Subtitle',
    'tag': 'tag',
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents],
    },
    storyClass: 'flex-col w400 mt75',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'bodySlot']);

    return `
    <ath-card-selectable ${attributes}>${args.bodySlot ?? ''}</ath-card-selectable>`;
  },
  args: {
    ...defaultArgs,
    'disabled': true,
    'overline': 'Overline',
    'heading-text': 'Heading text',
    'subtitle': 'Subtitle',
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'disabled'],
    },
    storyClass: 'flex-col w400 mt75',
  },
};

export const Size: Story = {
  render: args => {
    const sizes = ['sm', 'md'];
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'bodySlot']);
    const html = `
      ${sizes
        .map(
          size => `
        <div class="story__item w400">
          <div class="story__item__label">size: ${size}</div>
          <ath-card-selectable ${attributes} size=${size}>${args.bodySlot ?? ''}</ath-card-selectable>
        </div>`,
        )
        .join('')}`;
    return html;
  },
  args: {
    ...defaultArgs,
    'overline': 'Overline',
    'heading-text': 'Heading text',
    'subtitle': 'Subtitle',
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'size'],
    },
  },
};

export const Type: Story = {
  render: args => {
    const types = ['single', 'multiselect'];
    const attributes = getAttributesFromArgs(args, [...controlsEvents, 'bodySlot']);
    const html = `
      ${types
        .map(
          type => `
        <div class="story__item  w400">
          <div class="story__item__label">type: ${type}</div>
          <ath-card-selectable ${attributes} type=${type}>${args.bodySlot ?? ''}</ath-card-selectable>
        </div>`,
        )
        .join('')}`;
    return html;
  },
  args: {
    ...defaultArgs,
    'overline': 'Overline',
    'heading-text': 'Heading text',
    'subtitle': 'Subtitle',
  },
  parameters: {
    controls: {
      exclude: [...controlsEvents, 'type'],
    },
  },
};
