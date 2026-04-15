import { ArgTypes } from '@storybook/web-components-vite';
import { SegmentedControlArgs } from './segmented-control.types';
import { SegmentedControlColors, SegmentedControlFeedbackType, SegmentedControlSizes, SegmentedControlTypes } from '../segmented-control.model';

export const segmentedControlArgTypes: Partial<ArgTypes<SegmentedControlArgs>> = {
  'color': {
    control: { type: 'inline-radio' },
    options: Object.values(SegmentedControlColors),
    description: 'Color del segmented control',
    table: { type: { summary: 'SegmentedControlColor' }, defaultValue: { summary: SegmentedControlColors.Primary } },
  },
  'disabled': {
    control: { type: 'boolean' },
    description: 'Indica si el segmented control está deshabilitado',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'feedback': {
    control: { type: 'inline-radio' },
    options: Object.values(SegmentedControlFeedbackType),
    description: 'Tipo de feedback a mostrar, solo para tipo select.',
    table: { type: { summary: 'SegmentedControlFeedback' }, defaultValue: { summary: SegmentedControlFeedbackType.None } },
  },
  'feedback-text': {
    control: { type: 'text' },
    description: 'Define el texto para el feedback, solo para tipo select.',
    table: { type: { summary: 'string' } },
  },
  'helper-text': {
    control: { type: 'text' },
    description: 'Define el texto de ayuda, solo para tipo select.',
    table: { type: { summary: 'string' } },
  },
  'label': {
    control: { type: 'text' },
    description: 'Define el texto para el label, solo para tipo select.',
    table: { type: { summary: 'string' } },
  },
  'required': {
    control: { type: 'boolean' },
    description: 'Indica si el campo es requerido, solo para tipo select.',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'hide-required': {
    control: { type: 'boolean' },
    description: 'Indica si se muestra el asterisco de requerido en el caso de que `required` sea `true`',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'size': {
    control: { type: 'inline-radio' },
    options: Object.values(SegmentedControlSizes),
    description: 'Tamaño del segmented control',
    table: { type: { summary: 'SegmentedControlSize' }, defaultValue: { summary: SegmentedControlSizes.Medium } },
  },
  'tooltip-text': {
    control: { type: 'text' },
    description: 'Texto del tooltip a mostrar junto al label, solo para tipo select.',
    table: { type: { summary: 'string' } },
  },
  'tooltip-width': {
    control: { type: 'number' },
    description: 'Ancho del tooltip (en píxeles). Un valor de `0` indica que el tooltip no tiene ancho definido y se ajusta al contenido',
    table: { type: { summary: 'number' } },
  },
  'type': {
    control: { type: 'inline-radio' },
    options: Object.values(SegmentedControlTypes),
    description: 'Tipo del segmented control. `select` muestra label/helper/feedback. `action` siempre tiene una opción seleccionada y no muestra label/helper/feedback.',
    table: { type: { summary: 'SegmentedControlType' }, defaultValue: { summary: SegmentedControlTypes.Select } },
  },
  'aria-label': {
    control: { type: 'text' },
    description: 'Texto para lectores de pantalla cuando el label no es visible. Recomendable usar con el tipo action',
    table: { type: { summary: 'string' }, category: 'Accessibility' },
  },
  'required-aria-label': {
    control: { type: 'text' },
    description: 'Texto para lectores de pantalla cuando se muestra la marca de obligatorio, solo para tipo select.',
    table: { type: { summary: 'string' }, defaultValue: { summary: 'Obligatorio' }, category: 'Accessibility' },
  },
  'athChangeValue': {
    action: 'athChangeValue',
    description: 'Evento emitido cuando se selecciona un ítem',
    table: {
      type: { summary: 'Event', detail: '(event: CustomEvent<SegmentedControlItem>)' },
      category: 'Events',
    },
  },
};
