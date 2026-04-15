import { ArgTypes } from '@storybook/web-components-vite';
import { ActionBarArgs } from './action-bar.types';
import { ActionBarAlignments, ActionBarSizes } from '../action-bar.model';

export const actionBarArgTypes: Partial<ArgTypes<ActionBarArgs>> = {
  'alignment': {
    control: { type: 'inline-radio' },
    options: Object.values(ActionBarAlignments),
    description: 'Indica la alineación horizontal de los componentes hijos',
    table: { type: { summary: 'ActionBarAlignmentType' }, defaultValue: { summary: ActionBarAlignments.Left } },
  },
  'size': {
    control: { type: 'inline-radio' },
    options: Object.values(ActionBarSizes),
    description: 'Indica el tamaño de los componentes hijos',
    table: { type: { summary: 'ActionBarSizeType' }, defaultValue: { summary: ActionBarSizes.Medium } },
  },
  'defaultSlot': {
    control: 'text',
    name: 'default slot',
    description: 'Slot por defecto',
    table: {
      category: 'SLOTS',
      type: { summary: 'html' },
    },
  },
  'aria-label': {
    control: { type: 'text' },
    description: 'Define un texto como nombre accesible del action bar',
    table: { type: { summary: 'string' }, category: 'Accessibility' },
  },
  'aria-labelledby': {
    control: { type: 'text' },
    description: 'Define uno o varios identificadores que contienen el texto a utilizar como nombre accesible del action bar',
    table: { type: { summary: 'string' }, category: 'Accessibility' },
  },
};
