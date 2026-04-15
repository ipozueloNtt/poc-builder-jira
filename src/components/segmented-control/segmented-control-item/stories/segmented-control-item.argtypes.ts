import { ArgTypes } from '@storybook/web-components-vite';
import { SegmentedControlItemArgs } from './segmented-control-item.types';
import { SegmentedControlItemIconPositions } from '../../segmented-control.model';

export const segmentedControlItemArgTypes: Partial<ArgTypes<SegmentedControlItemArgs>> = {
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el ítem está deshabilitado',
    table: { type: { summary: 'boolean' } },
  },
  'icon-position': {
    control: { type: 'inline-radio' },
    options: Object.values(SegmentedControlItemIconPositions),
    description: 'Posición del icono en el ítem',
    table: { type: { summary: 'SegmentedControlItemIconPosition' } },
  },
  'icon': {
    control: { type: 'text' },
    description: 'Nombre del icono a mostrar, que debe existir en la Galería de iconos',
    table: { type: { summary: 'string' } },
  },
  'selected': {
    control: { type: 'boolean' },
    description: 'Indica si el ítem está seleccionado',
    table: { type: { summary: 'boolean' } },
  },
  'value': {
    control: { type: 'text' },
    description: 'Indica el valor del ítem, utilizado en ath-segmented-control de tipo select',
    table: { type: { summary: 'string' } },
  },
  'defaultSlot': {
    control: { type: 'text' },
    description: 'Contenido del slot por defecto',
    table: {
      type: { summary: 'string' },
      category: 'SLOTS',
    },
  },
  'athChange': {
    action: 'athChange',
    description: 'Evento emitido cuando el ítem cambia de estado',
    table: {
      type: { summary: 'Event', detail: '(event: CustomEvent<SegmentedControlItemChangeSelect>)' },
      category: 'Events',
    },
  },
};
