import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { ChipDismissArgs } from './chip-dismiss.types';
import { withActions } from 'storybook/actions/decorator';
import { ChipDismissSize } from '../chip-dismiss.model';

const defaultArgs = {
  'disabled': undefined,
  'icon': undefined,
  'heading-text': 'Chip',
  'label-dismiss': 'Eliminar',
  'size': undefined,
};

const meta: Meta<ChipDismissArgs> = {
  title: 'Componentes/Chip Dismiss/Chip Dismiss',
  component: 'ath-chip-dismiss',
  tags: ['autodocs'],
  argTypes: {
    'disabled': {
      control: { type: 'boolean' },
      description: 'Indica si el botón del chip-dismiss está deshabilitado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'icon': {
      control: { type: 'select' },
      description: 'Indica el nombre del icono a incluir en el botón, que debe existir en la Galería de iconos',
      options: iconNamesList,
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-text': {
      control: { type: 'text' },
      description: 'Indica el texto de la etiqueta del chip-dismiss',
      table: {
        type: { summary: 'string' },
      },
    },
    'size': {
      control: { type: 'inline-radio' },
      description: 'Indica el tamaño del chip-dismiss',
      options: ['sm', 'md'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'md' },
      },
    },
    // ACCESIBILIDAD
    'label-dismiss': {
      control: { type: 'text' },
      description: 'Indica la etiqueta accesible del botón dismiss',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
        defaultValue: { summary: 'Eliminar' },
      },
      // EVENTOS
    },
    'athDismiss': {
      action: 'athDismiss',
      description: 'Se emite el evento al hacer clic en el botón del chip-dismiss',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
  },
  args: { ...defaultArgs },
  parameters: {
    actions: { handles: ['athDismiss'] },
    componentSubtitle:
      'Se utiliza para mostrar información breve y contextual con la opción de ser eliminado por el usuario. Es ideal para representar etiquetas, filtros activos o elementos seleccionados. ',
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<ChipDismissArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athDismiss']);
    return `<ath-chip-dismiss ${attributes}></ath-chip-dismiss>`;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athDismiss']);

    return `
      <div class="story__item">
        <div class="story__item__label">Disabled: ${args.disabled}</div>
        <ath-chip-dismiss ${attributes}></ath-chip-dismiss>
      </div>
    `;
  },
  args: { ...defaultArgs, disabled: true },
};

export const ConIcon: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athDismiss']);

    return `
      <div class="story__item">
        <div class="story__item__label">Con Icon</div>
        <ath-chip-dismiss ${attributes}></ath-chip-dismiss>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    icon: 'info',
  },
};

export const Sizes: Story = {
  render: (args): string => {
    const sizes = [ChipDismissSize.Small, ChipDismissSize.Medium];
    const attributes = getAttributesFromArgs(args, ['size', 'athDismiss']);

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label">Size: ${size}</div>
          <ath-chip-dismiss size="${size}" ${attributes}></ath-chip-dismiss>
        </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};
