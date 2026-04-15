import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { CardArgs, CardDefaultSlot } from './card.types';
import { getAttributesFromArgs } from '@utils/storybook';
import { cardArgTypes } from './card.argtypes';

const defaultCardArgs: Partial<CardArgs> = {
  'bodySlot': CardDefaultSlot.bodySlot,
  'clickable': undefined,
  'fluid': undefined,
  'footerSlot': undefined,
  'headerSlot': CardDefaultSlot.headerSlot,
  'imgSlot': CardDefaultSlot.imgSlot,
  'orientation': undefined,
  'max-width': undefined,
  'size': undefined,
  'thumbnailSlot': CardDefaultSlot.thumbnailSlot,
  'tagSlot': CardDefaultSlot.tagSlot,
  'width': undefined,
};

const events = ['athFocus', 'athBlur', 'athClick'];

const widthClass = (args: Partial<CardArgs>) => {
  if (!!args.width) {
    return '';
  }

  return args.orientation == 'horizontal' ? 'w700' : 'w500';
};

const meta: Meta<CardArgs> = {
  title: 'Componentes/Card/Card',
  component: 'ath-card',
  parameters: {
    actions: { handles: events },
    componentSubtitle: 'Las cards permiten a los usuarios visualizar detalles específicos sobre un mismo tema de forma agrupada y ordenada dentro de un contenedor.',
  },
  tags: ['autodocs'],
  argTypes: cardArgTypes,
  decorators: [withActions],
  args: { ...defaultCardArgs },
};
export default meta;

type Story = StoryObj<CardArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', ...events]);
    return `
      <div class="story__item ${widthClass(args)}">
        <ath-card ${attributes}>
          ${args.thumbnailSlot ?? ''}
          ${args.headerSlot ?? ''}
          ${args.bodySlot ?? ''}
          ${args.imgSlot ?? ''}
          ${args.tagSlot ?? ''}
          ${args.footerSlot ?? ''}
        </ath-card>
      </div>
    `;
  },
  args: { ...defaultCardArgs },
  parameters: {
    storyClass: 'flex-col',
  },
  tags: ['!autodocs'],
};

export const Clickable: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', 'size', ...events]);

    return `
        <div class="story__item ${widthClass(args)}">
          <div class="story__item__label">Clickable</div>
          <ath-card ${attributes} clickable='true'>
            ${args.thumbnailSlot ?? ''}
            ${args.headerSlot ?? ''}
            ${args.bodySlot ?? ''}
            ${args.imgSlot ?? ''}
            ${args.tagSlot ?? ''}
            ${args.footerSlot ?? ''}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardArgs, orientation: 'vertical' },
  parameters: {
    controls: {
      include: ['orientation', 'thumbnail', 'body', 'header', 'footer', 'img', 'tag'],
    },
    storyClass: 'flex-row',
  },
};

export const Fluid: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', ...events]);

    return `
        <div class="story__item ${widthClass(args)}">
          <div class="story__item__label">Fluid: true</div>
          <ath-card ${attributes} fluid>
            ${args.thumbnailSlot ?? ''}
            ${args.headerSlot ?? ''}
            ${args.bodySlot ?? ''}
            ${args.imgSlot ?? ''}
            ${args.tagSlot ?? ''}
            ${args.footerSlot ?? ''}
          </ath-card>
        </div>

        <div class="story__item ${widthClass(args)}">
          <div class="story__item__label">Fluid: false</div>
          <ath-card ${attributes}">
            ${args.thumbnailSlot ?? ''}
            ${args.headerSlot ?? ''}
            ${args.bodySlot ?? ''}
            ${args.imgSlot ?? ''}
            ${args.tagSlot ?? ''}
            ${args.footerSlot ?? ''}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardArgs },
  parameters: {
    controls: {
      include: ['thumbnail', 'orientation'],
    },
    storyClass: 'flex-row',
  },
};

export const Orientation: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', 'orientation', ...events]);
    return `
      <div class="story__item">
        <div class="story__item__label">Orientation: vertical</div>
        <ath-card ${attributes} width="500px">
          ${args.thumbnailSlot ?? ''}
          ${args.headerSlot ?? ''}
          ${args.bodySlot ?? ''}
          ${args.imgSlot ?? ''}
          ${args.tagSlot ?? ''}
          ${args.footerSlot ?? ''}
        </ath-card>
      </div>
      <div class="story__item">
        <div class="story__item__label">Orientation: horizontal</div>
        <ath-card ${attributes} orientation="horizontal" width="750px">
          ${args.thumbnailSlot ?? ''}
          ${args.headerSlot ?? ''}
          ${args.bodySlot ?? ''}
          ${args.imgSlot ?? ''}
          ${args.tagSlot ?? ''}
          ${args.footerSlot ?? ''}
        </ath-card>
      </div>
      `;
  },
  args: { ...defaultCardArgs },
  parameters: {
    controls: {
      include: ['thumbnail', 'body', 'header', 'footer', 'img', 'tag'],
    },
    storyClass: 'flex-row',
  },
};

export const SinThumbnail: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', 'orientation', ...events, 'width']);
    return `<div class="story__item">
              <div class="story__item__label">Orientation: vertical</div>
              <ath-card ${attributes}>
                ${args.headerSlot ?? ''}
                ${args.bodySlot ?? ''}
                ${args.imgSlot ?? ''}
                ${args.tagSlot ?? ''}
                ${args.footerSlot ?? ''}
              </ath-card>
            </div>
      `;
  },
  args: { ...defaultCardArgs, size: 'sm', orientation: 'vertical' },
  parameters: {
    controls: {
      exclude: ['thumbnailSlot', 'fluid'],
    },
    storyClass: 'flex-row w450',
  },
};

export const Size: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', 'size', 'width', ...events]);

    return `
        <div class="story__item ${widthClass(args)}">
          <div class="story__item__label">Size: sm</div>
            <ath-card ${attributes} size="sm" >
              ${args.thumbnailSlot ?? ''}
              ${args.headerSlot ?? ''}
              ${args.bodySlot ?? ''}
              ${args.imgSlot ?? ''}
              ${args.tagSlot ?? ''}
              ${args.footerSlot ?? ''}
            </ath-card>
        </div>
        <div class="story__item ${widthClass(args)}">
        <div class="story__item__label">Size: md</div>
          <ath-card ${attributes} size="md">
            ${args.thumbnailSlot ?? ''}
            ${args.headerSlot ?? ''}
            ${args.bodySlot ?? ''}
            ${args.imgSlot ?? ''}
            ${args.tagSlot ?? ''}
            ${args.footerSlot ?? ''}
          </ath-card>
        </div>
      `;
  },
  args: { ...defaultCardArgs, orientation: 'vertical' },
  parameters: {
    controls: {
      include: ['orientation', 'thumbnail', 'body', 'header', 'footer', 'img', 'tag'],
    },
    storyClass: 'flex-row',
  },
};

export const WidthAuto: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['thumbnailSlot', 'bodySlot', 'headerSlot', 'footerSlot', 'imgSlot', 'tagSlot', 'size', 'width', ...events]);

    return `
        <div class="story__item">
          <div class="story__item__label">Width: Se ajusta al contenedor</div>
            <ath-card ${attributes}>
              ${args.thumbnailSlot ?? ''}
              ${args.headerSlot ?? ''}
              ${args.bodySlot ?? ''}
              ${args.imgSlot ?? ''}
              ${args.tagSlot ?? ''}
              ${args.footerSlot ?? ''}
            </ath-card>
        </div>
        <div class="story__item">
      `;
  },
  args: { ...defaultCardArgs, orientation: 'vertical', fluid: false },
  parameters: {
    controls: {
      include: ['orientation', 'fluid', 'thumbnail', 'body', 'header', 'footer', 'img', 'tag'],
    },
    storyClass: 'flex-row',
  },
};
