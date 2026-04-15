import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { withActions } from 'storybook/actions/decorator';
import { ButtonExpandableSizesTypes, ButtonExpandableSizesType } from '../button-expandable.model';

type ButtonExpandableArgs = {
  'collapse-target'?: string;
  'icon'?: string;
  'disabled'?: boolean;
  'size': ButtonExpandableSizesType;
  'defaultSlot': string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
  'tabindex'?: number;
  'athToggleCollapse': (event: CustomEvent<string>) => void;
};

const iconList = ['', ...iconNamesList];

const defaultButtonExpandableArgs: ButtonExpandableArgs = {
  size: ButtonExpandableSizesTypes.Large,
  defaultSlot: 'Button expandable',
  athToggleCollapse: () => {},
};

const meta: Meta<ButtonExpandableArgs> = {
  title: 'Componentes/Button Expandable',
  component: 'ath-section-title',
  argTypes: {
    'collapse-target': {
      control: 'text',
      description: 'Identificador del componente ath-collapse del que se quiere controlar la visibilidad',
      table: {
        type: { summary: 'string' },
      },
    },
    'icon': {
      control: 'select',
      options: iconList,
      description: 'Icono que se muestra a la izquierda del slot de texto',
      table: {
        type: { summary: 'string' },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Deshabilita el botón',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'size': {
      control: 'inline-radio',
      options: Object.values(ButtonExpandableSizesTypes),
      description: 'Tamaño del botón expandible',
      table: {
        type: { summary: 'ButtonSizes' },
        defaultValue: { summary: ButtonExpandableSizesTypes.Large },
      },
    },

    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      description: 'Texto del botón',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
    'aria-label': {
      control: 'text',
      description: 'Etiqueta de accesibilidad para lectores de pantalla',
      table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
    },
    'aria-labelledby': {
      control: 'text',
      description: 'Identificador del elemento que contiene la etiqueta de accesibilidad que describe al botón',
      table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
    },
    'aria-describedby': {
      control: 'text',
      description: 'Identificador del elemento que contiene la descripción del botón',
      table: { category: 'ACCESSIBILITY', type: { summary: 'string' } },
    },
    'tabindex': {
      control: 'number',
      description: 'Orden de tabulación',
      table: { category: 'ACCESSIBILITY', type: { summary: 'number' } },
    },
    'athToggleCollapse': {
      action: 'athToggleCollapse',
      description: 'Se emite cuando se hace clic en el botón de colapsar/expandir, indicando el identificador del componente ath-collapse asociado',
      table: {
        type: { summary: 'EventEmitter<string>' },
        category: 'EVENTS',
      },
    },
  },
  args: { ...defaultButtonExpandableArgs },
  parameters: {
    componentSubtitle: 'Botón que permite expandir o contraer contenido relacionado. Se recomienda utilizar con el componente Collapse para gestionar fácilmente su visibilidad.',
    actions: {
      handles: ['athToggleCollapse'],
    },
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<ButtonExpandableArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athToggleCollapse']);

    return `
      <div style="width: 100%">
        <ath-button-expandable ${attributes} collapse-target="collapse-playground">
          ${args.defaultSlot || ''}
        </ath-button-expandable>
        <ath-collapse id="collapse-playground" style="padding: 20px 0;">
          <p>Este el contenido del componente Collapse</p>
        </ath-collapse>
      </div>
    `;
  },
  args: { ...defaultButtonExpandableArgs },
  tags: ['!autodocs'],
};

export const Icon: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athToggleCollapse']);

    return `
      <div class="story__item w400" style="margin-bottom: 20px;">
        <ath-button-expandable ${attributes} collapse-target="collapse-icon"">
          Button expandable
        </ath-button-expandable>
        <ath-collapse id="collapse-icon" style="padding: 20px 0;">
          <p class="ath-color-text--default">Este el contenido del componente Collapse.</p>
        </ath-collapse>
      </div>
    `;
  },
  args: { ...defaultButtonExpandableArgs, icon: 'placeholder' },
  parameters: {},
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['disabled', 'defaultSlot', 'athToggleCollapse']);

    return `
      <div class="story__item w400" style="margin-bottom: 20px;">
        <ath-button-expandable ${attributes} collapse-target="collapse-disabled" disabled>
          Button expandable
        </ath-button-expandable>
        <ath-collapse id="collapse-disabled" style="padding: 20px 0;">
          <p class="ath-color-text--default">Este el contenido del componente Collapse.</p>
        </ath-collapse>
      </div>
    `;
  },
  args: { ...defaultButtonExpandableArgs, icon: 'placeholder' },
  parameters: {
    controls: {
      exclude: ['icon', 'disabled'],
    },
  },
};

export const Size: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['size', 'defaultSlot', 'athToggleCollapse']);
    const sizes = Object.values(ButtonExpandableSizesTypes);

    return sizes
      .map(
        (size, index) => `
          <div class="story__item " style="margin-bottom: 20px; min-width: 370px">
            <div class="story__item__label">Size: ${size}</div>
            <ath-button-expandable ${attributes} collapse-target="collapse-size-${index}" size="${size}">
              Button expandable
            </ath-button-expandable>
            <ath-collapse id="collapse-size-${index}" style="padding: 20px 0;">
              <p class="ath-color-text--default">Este el contenido del componente Collapse.</p>
            </ath-collapse>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultButtonExpandableArgs },
  parameters: {
    storyClass: 'grid-start grid-cols-2 ',
    controls: {
      exclude: ['size'],
    },
  },
};
