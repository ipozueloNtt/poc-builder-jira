import { ArgTypes } from '@storybook/web-components-vite';
import { ModalSize, ModalAppearance } from '../modal.model';
import { ModalArgs } from './modal.types';

const ModalAppearances = Object.values(ModalAppearance);
const ModalSizes = Object.values(ModalSize);

export const modalArgTypes: Partial<ArgTypes<ModalArgs>> = {
  'appearance': {
    control: { type: 'select' },
    options: ModalAppearances,
    description: 'Indica la ilustración que utiliza cuando isAlert=true',
    table: { type: { summary: 'ModalAppareance' }, defaultValue: { summary: ModalAppearance.Error } },
  },
  'autofocus': {
    control: { type: 'boolean' },
    description: 'Indica si al abrirse la modal, se enfocará el primer elemento interactivo (que no sea el botón X de cerrar).',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
  },
  'click-outside-close': {
    control: { type: 'boolean' },
    description: 'Indica si la modal se cerrará al hacer click fuera de ella',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'full-screen': {
    control: { type: 'boolean' },
    description: 'Indica si la modal ocupará toda la pantalla',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'has-close': {
    control: { type: 'boolean' },
    description: 'Indica si dispone de botón X (cerrar)',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'true' } },
  },
  'has-divider': {
    control: { type: 'boolean' },
    description: 'Indica si hay un divider entre el encabezado y los slots',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'heading-text': {
    control: { type: 'text' },
    description: 'Indica el texto del título',
    table: { type: { summary: 'string' } },
  },
  'is-alert': {
    control: { type: 'boolean' },
    description: 'Indica si la modal es del tipo Alert, en este caso aplica el role="dialogAlert" que interrumpe el flujo de lectores de pantalla',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'max-height': {
    control: { type: 'text' },
    description: 'Indica la altura máxima de la modal',
    table: { type: { summary: 'string' } },
  },
  'max-width': {
    control: { type: 'text' },
    description: 'Indica la anchura máxima de la modal. Si se requieren px fijos, se recomienda utilizar uno de estos valores: 288px, 340px, 640px o 960px',
    table: { type: { summary: 'string' } },
  },
  'open': {
    control: { type: 'boolean' },
    description: 'Indica si la modal está visible por defecto',
    table: { type: { summary: 'boolean' }, defaultValue: { summary: 'false' } },
  },
  'size': {
    control: { type: 'radio' },
    options: ModalSizes,
    description: 'Indica el tamaño de la modal, lo cual afecta directamente a los espaciados',
    table: { type: { summary: 'ModalSize' }, defaultValue: { summary: ModalSize.Medium } },
  },
  'subtitle-text': {
    control: { type: 'text' },
    description: 'Indica el texto del subtítulo',
    table: { type: { summary: 'string' } },
  },
  //  Slots
  'defaultBodySlot': {
    control: 'text',
    name: 'body',
    description: 'Contenido del slot Body',
    table: { category: 'SLOTS', type: { summary: 'HTML' } },
  },
  'defaultFooterSlot': {
    control: 'text',
    name: 'footer',
    description: 'Contenido del slot Footer',
    table: { category: 'SLOTS', type: { summary: 'HTML' } },
  },
  // Accesibilidad
  'close-aria-label': {
    control: { type: 'text' },
    description: 'Define el texto accesible del botón X (cerrar)',
    table: {
      type: { summary: 'string' },
      category: 'ACCESSIBILITY',
    },
  },
  'heading-level': {
    control: 'number',
    description:
      'Define el nivel de heading asignado al título del modal. Los valores entre 1 y 6 corresponden a &lt;h1&gt; ... &lt;h6&gt;. Para el valor 0 se asigna una etiqueta &lt;p&gt;.',
    table: {
      category: 'ACCESSIBILITY',
      type: { summary: 'number' },
      defaultValue: { summary: '2' },
    },
  },
  // Eventos
  'athOpened': {
    action: 'athOpened',
    description: 'Se emite al abrirse la modal',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  'athClosed': {
    action: 'athClosed',
    description: 'Se emite al cerrarse la modal',
    table: { type: { summary: 'EventEmitter<void>' }, category: 'EVENTS' },
  },
  // Methods
  'openModal': {
    description: 'Método que permite abrir la modal',
    table: { type: { summary: 'Function<void>' }, category: 'METHODS' },
  },
  'closeModal': {
    description: 'Método que permite cerrar la modal',
    table: { type: { summary: 'Function<void>' }, category: 'METHODS' },
  },
};
