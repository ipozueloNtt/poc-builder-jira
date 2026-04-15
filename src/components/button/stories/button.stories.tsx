import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ButtonArgs } from './button.types';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { ButtonColor, ButtonIconPosition, ButtonSize, ButtonType } from '../button.model';
import { withActions } from 'storybook/actions/decorator';

const defaultArgs = {
  color: 'primary',
  defaultSlot: 'Continuar',
  size: 'md',
};

const defaultStoryControls = ['color', 'size', 'clear', 'icon-position', 'icon', 'disabled', 'defaultSlot', 'full-width'];

// Función para generar atributos de accesibilidad
const getAccessibilityAttributes = (args: ButtonArgs) => ({
  'aria-controls': args['aria-controls'],
  'aria-describedby': args['aria-describedby'],
  'aria-expanded': args['aria-expanded'],
  'aria-haspopup': args['aria-haspopup'],
  'aria-pressed': args['aria-pressed'],
  'aria-label': args['aria-label'],
});

const meta: Meta<ButtonArgs> = {
  title: 'Componentes/Button',
  component: 'ath-button',
  tags: ['autodocs'],
  argTypes: {
    'color': {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Indica la variante de color del botón',
      table: {
        type: { summary: 'ButtonColors' },
        defaultValue: { summary: ButtonColor.Primary },
      },
    },
    'clear': {
      control: 'boolean',
      description: 'Indica si el botón tiene relleno',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'icon-position': {
      control: { type: 'inline-radio' },
      options: ['none', 'left', 'right', 'icon-only'],
      description: 'Indica la posición del icono del botón',
      table: {
        type: { summary: 'ButtonIconPositions' },
        defaultValue: { summary: ButtonIconPosition.None },
      },
    },
    'icon': {
      control: { type: 'select', labels: { '': '--Sin icono--' } },
      options: ['', ...iconNamesList],
      description: 'Indica el nombre del icono a incluir en el botón, que debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },
    'disabled': {
      control: { type: 'boolean' },
      description: 'Indica si el botón está en estado deshabilitado',
    },

    'defaultSlot': {
      name: 'default slot',
      description: 'Slot para incluir el texto del botón',
      table: { type: { summary: 'string' }, category: 'SLOT' },
    },
    'full-width': {
      control: 'boolean',
      description: 'Indica si el botón se ajusta al ancho de su contenedor',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'size': {
      control: 'inline-radio',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Indica el tamaño del botón',
      table: {
        type: { summary: 'ButtonSizes' },
        defaultValue: { summary: ButtonSize.Medium },
      },
    },
    'type': {
      control: 'select',
      options: ['button', 'submit', 'reset'],
      description: 'Indica el tipo de botón',
      table: {
        type: { summary: 'ButtonType' },
        defaultValue: { summary: ButtonType.Button },
      },
    },
    'autofocus': {
      control: { type: 'boolean' },
      description: 'Indica si se debe forzar el foco en el botón',
      table: { type: { summary: 'boolean' }, category: 'Accessibility' },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Define un texto como nombre accesible del botón',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Define uno o varios identificadores que contienen el texto a utilizar como nombre accesible del botón',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-describedby': {
      control: { type: 'text' },
      description: 'Define uno o varios identificadores que contienen un texto a utilizar como descripción del botón',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-controls': {
      control: { type: 'text' },
      description: 'Define un identificador de un elemento cuya visibilidad controla el botón ',
      table: { type: { summary: 'string' }, category: 'Accessibility' },
    },
    'aria-expanded': {
      control: { type: 'boolean' },
      description: 'Define si el elemento controlado por el botón está expandido o collapsado ',
      table: {
        type: { summary: 'boolean' },
        category: 'Accessibility',
      },
    },
    'aria-haspopup': {
      control: { type: 'text' },
      description: 'Indica si el botón controla un elemento popup interactivo y su tipo.',
      table: {
        type: { summary: 'menu | listbox | tree | grid | dialog | true' },
        defaultValue: { summary: ButtonIconPosition.None },
        category: 'Accessibility',
      },
    },
    'athClick': {
      action: 'athClick',
      description: 'Se emite al hacer clic en el botón',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athFocus': {
      action: 'athFocus',
      description: 'Se emite al hacer foco en el botón',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athBlur': {
      action: 'athBlur',
      description: 'Se emite al quitar el foco del botón',
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
    backgrounds: { disabled: true },
    controls: { sort: 'alpha' },
    componentSubtitle: 'Se adapta a diferentes contextos visuales y funcionales, manteniendo consistencia, accesibilidad y comportamiento esperado en todos los productos.',
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<ButtonArgs>;

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

    return `<ath-button ${attributes}>${args.defaultSlot}</ath-button>`;
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
          <ath-button ${attributes} color="${color}">${args.defaultSlot}</ath-button>
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
    const sizes = ['xs', 'sm', 'md', 'lg'];
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'size']);

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label">Size: ${size}</div>
          <ath-button ${attributes} size="${size}">${args.defaultSlot}</ath-button>
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

export const Clear: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'clear']);

    return `
        <div class="story__item">
          <ath-button ${attributes} clear="true">${args.defaultSlot}</ath-button>
        </div>`;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['clear'],
    },
  },
};

export const WithIcon: Story = {
  name: 'Icon Position',
  render: (args): string => {
    const iconPositions = ['none', 'left', 'right', 'icon-only'];
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'icon-position']);

    return iconPositions
      .map(
        position => `
        <div class="story__item">
          <div class="story__item__label">Icon Position: ${position}</div>
          <ath-button ${attributes} icon-position="${position}" >${args.defaultSlot}</ath-button>
        </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs, icon: 'download' },
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
          <ath-button ${attributes} disabled="true">${args.defaultSlot}</ath-button>
        </div>`;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['disabled'],
    },
  },
};

export const Autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);

    return `
        <div class="story__item">
          <ath-button ${attributes} >${args.defaultSlot}</ath-button>
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

export const FullWidth: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot']);

    return `
        <div class="story__item" style="width: 440px">
         <div class="story__item__label">Contenedor de 440px</div>
          <ath-button ${attributes} >${args.defaultSlot}</ath-button>
        </div>`;
  },
  args: { ...defaultArgs, 'full-width': true },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
    },
  },
};
