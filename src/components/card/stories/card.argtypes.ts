import { ArgTypes } from '@storybook/web-components-vite';
import { CardArgs } from './card.types';
import { CardSize, CardOrientation } from '../card.model';

export const cardArgTypes: Partial<ArgTypes<CardArgs>> = {
  'bodySlot': {
    control: 'text',
    name: 'body',
    description: 'Slot para añadir texto u otros elementos dentro de la card',
    table: { category: 'SLOTS', type: { summary: 'string' } },
  },

  'clickable': {
    control: 'boolean',
    description: 'Indica si la card es clickable',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'size': {
    control: 'inline-radio',
    options: ['sm', 'md'],
    description: 'Tamaño de la card',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: CardSize.Small },
    },
  },

  'fluid': {
    control: 'boolean',
    description: 'Indica si el thumbnail de la card es fluido, es decir, que crece en función del ratio de la imagen.',
    table: {
      type: { summary: 'boolean' },
      defaultValue: { summary: 'false' },
    },
  },

  'footerSlot': {
    control: 'text',
    name: 'footer',
    description: 'Slot para añadir texto, 1 o 2 <ath-button>, o link a la card',
    table: { category: 'SLOTS', type: { summary: 'text / ath-button / ath-link' } },
  },

  'headerSlot': {
    control: 'text',
    name: 'header',
    description: 'Slot se utiliza para elemento <ath-card-header>',
    table: { category: 'SLOTS', type: { summary: 'ath-card-header' } },
  },

  'imgSlot': {
    control: 'text',
    name: 'img',
    description: 'Slot para añadir un <ath-icon>',
    table: { category: 'SLOTS', type: { summary: 'ath-icon' } },
  },

  'orientation': {
    control: 'inline-radio',
    options: ['vertical', 'horizontal'],
    description: 'Indica la orientación de la card',
    table: {
      type: { summary: 'string' },
      defaultValue: { summary: CardOrientation.Vertical },
    },
  },

  'max-width': {
    control: 'text',
    name: 'max-width',
    description: 'Define el ancho máximo de la card',
    table: {
      type: { summary: 'string' },
    },
  },

  'tagSlot': {
    control: 'text',
    name: 'tag',
    description: 'Slot para añadir un <ath-tag>',
    table: { category: 'SLOTS', type: { summary: 'ath-tag' } },
  },

  'thumbnailSlot': {
    control: 'text',
    name: 'thumbnail',
    description: 'Slot para un elemento <ath-card-thumbnail>',
    table: { category: 'SLOTS', type: { summary: 'ath-card-thumbnail' } },
  },

  'width': {
    control: 'text',
    name: 'width',
    description: 'Define el ancho de la card',
    table: {
      type: { summary: 'string' },
    },
  },

  // Eventos
  'athClick': {
    action: 'athFocus',
    description: 'Se emite al hacer click en la card cuando clickable es true',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athFocus': {
    action: 'athFocus',
    description: 'Se emite al hacer foco en la card cuando clickable es true',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athBlur': {
    action: 'athBlur',
    description: 'Se emite al quitar el foco de la card cuando clickable es true',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
};
