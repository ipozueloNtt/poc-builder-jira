import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ButtonLinkArgs } from './button-link.types';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { ButtonLinkColor, ButtonLinkSize, ButtonLinkPosition } from '../button-link.model';
import { withActions } from 'storybook/actions/decorator';

const defaultArgs = {
  color: 'primary',
  defaultSlot: 'Reestablecer',
  size: 'md',
};

const defaultStoryControls = ['color', 'size', 'icon', 'disabled', 'defaultSlot'];

// Función para generar atributos de accesibilidad
const getAccessibilityAttributes = (args: ButtonLinkArgs) => ({
  'aria-controls': args['aria-controls'],
  'aria-describedby': args['aria-describedby'],
  'aria-haspopup': args['aria-haspopup'],
  'aria-pressed': args['aria-pressed'],
  'aria-label': args['aria-label'],
});

const meta: Meta<ButtonLinkArgs> = {
  title: 'Componentes/Button Link',
  component: 'ath-button-link',
  tags: ['autodocs'],
  argTypes: {
    'color': {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Indica la variante de color del button link',
      table: {
        type: { summary: 'ButtonLinkColors' },
        defaultValue: { summary: ButtonLinkColor.Primary },
      },
    },
    'icon': {
      control: { type: 'select', labels: { '': '--Sin icono--' } },
      options: ['', ...iconNamesList],
      description: 'Indica el nombre del icono a incluir en el button link, que debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },

    'icon-position': {
      control: 'inline-radio',
      options: ['left', 'right'],
      description: 'Indica la posición del icono',
      table: {
        type: { summary: 'ButtonLinkPosition' },
        defaultValue: { summary: ButtonLinkPosition.Left },
      },
    },

    'disabled': {
      control: { type: 'boolean' },
      description: 'Indica si el button link está en estado deshabilitado',
    },

    'defaultSlot': {
      name: 'default slot',
      description: 'Slot para incluir el texto del button link',
      table: { type: { summary: 'string' }, category: 'SLOT' },
    },
    'size': {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
      description: 'Indica el tamaño del button link',
      table: {
        type: { summary: 'ButtonLinkSizes' },
        defaultValue: { summary: ButtonLinkSize.Medium },
      },
    },
    'autofocus': {
      control: { type: 'boolean' },
      description: 'Indica si se debe forzar el foco en el button link',
      table: { type: { summary: 'boolean' }, category: 'Accessibility' },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Define un texto como nombre accesible del button link',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Define uno o varios identificadores que contienen el texto a utilizar como nombre accesible del button link',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'Define uno o varios identificadores que contienen un texto a utilizar como descripción del button link',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-controls': {
      control: { type: 'text' },
      description: 'Define un identificador de un elemento cuya visibilidad controla el button link ',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-expanded': {
      control: { type: 'text' },
      description: 'Indica si el elemento con contenido desplegable, como un menú desplegable o un acordeón, está expandido o colapsado.',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-haspopup': {
      control: { type: 'text' },
      description: 'Indica si el elemento tiene menú emergente',
      table: { type: { summary: 'false | true | menu | listbox | tree | grid | dialog' }, category: 'Accessibility' },
    },
    'athClick': {
      action: 'athClick',
      description: 'Se emite al hacer clic en el button link',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athFocus': {
      action: 'athFocus',
      description: 'Se emite al hacer foco en el button link',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athBlur': {
      action: 'athBlur',
      description: 'Se emite al quitar el foco del button link',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
  },
  args: { ...defaultArgs },
  parameters: {
    actions: { handles: ['athClick', 'athFocus', 'athBlur'] },
    darkMode: { stylePreview: true },
    backgrounds: { disable: true },
    controls: { sort: 'alpha' },
    componentSubtitle: 'Se adapta a diferentes contextos visuales y funcionales, manteniendo consistencia, accesibilidad y comportamiento esperado en todos los productos.',
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<ButtonLinkArgs>;

export const Playground: Story = {
  render: (args): string => {
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['athClick', 'athBlur', 'athFocus', 'defaultSlot'],
    );

    return `<ath-button-link ${attributes}>${args.defaultSlot}</ath-button-link>`;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
};

export const Color: Story = {
  render: (args): string => {
    const colors = ['primary', 'secondary'];
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'color']);

    return colors
      .map(
        color => `
        <div class="story__item">
          <div class="story__item__label">Color: ${color}</div>
          <ath-button-link ${attributes} color="${color}">${args.defaultSlot}</ath-button-link>
        </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['color'],
    },
  },
};

export const Size: Story = {
  render: (args): string => {
    const sizes = ['sm', 'md', 'lg'];
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'size']);

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label">Size: ${size}</div>
          <ath-button-link ${attributes} size="${size}">${args.defaultSlot}</ath-button-link>
        </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['size'],
    },
  },
};

export const Icon: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);

    return `
      <div class="story__item">
        <ath-button-link ${attributes}>${args.defaultSlot}</ath-button-link>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    icon: 'reload_double',
  },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['icon'],
    },
  },
};

export const IconPosition: Story = {
  render: (args): string => {
    const positions = ['left', 'right'];
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'icon-position']);

    return positions
      .map(
        position => `
        <div class="story__item">
          <div class="story__item__label">Icon position: ${position}</div>
          <ath-button-link ${attributes} icon-position="${position}">${args.defaultSlot}</ath-button-link>
        </div>`,
      )
      .join('');
  },

  args: {
    ...defaultArgs,
    icon: 'reload_double',
  },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['icon-position'],
    },
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'disabled']);

    return `
        <div class="story__item">
          <ath-button-link ${attributes} disabled="true">${args.defaultSlot}</ath-button-link>
        </div>`;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
    },
  },
};

export const Autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);

    return `
        <div class="story__item">
          <ath-button-link ${attributes} >${args.defaultSlot}</ath-button-link>
        </div>`;
  },
  args: { ...defaultArgs, autofocus: true },
  tags: ['!autodocs'],
  parameters: {
    controls: {
      include: [...defaultStoryControls],
    },
  },
};
