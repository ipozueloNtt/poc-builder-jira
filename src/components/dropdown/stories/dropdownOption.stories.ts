import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DropdownOptionsArgs } from './dropdown.types';
import { getAttributesFromArgs, iconNamesList, orderObjectByAttributes } from '@utils/storybook';

const excludeArgs = ['left-asset', 'right-asset', 'defaultSlot'];
const booleanArgs = ['disabled', 'selected', 'option-group'];

const defaultDropdownOptionArgs: DropdownOptionsArgs = orderObjectByAttributes({
  'name': undefined,
  'value': undefined,
  'text': undefined,
  'selected': undefined,
  'disabled': undefined,
  'icon': undefined,
  'option-group': undefined,
  'selected-aria-label': undefined,
});

const meta: Meta<DropdownOptionsArgs> = {
  title: 'Componentes/Dropdown/Dropdown Option',
  component: 'ath-dropdown',
  argTypes: {
    'disabled': {
      control: { type: 'boolean' },
      description: 'Mostrar tooltip el dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'icon': {
      control: { type: 'select', labels: { '': '--Sin icono--' } },
      options: ['', ...iconNamesList],
      description: 'Indica el nombre del icono a incluir en la opción, que debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },
    'name': {
      control: 'text',
      description: 'Indica el nombre para el dropdown option',
    },
    'option-group': {
      control: { type: 'boolean' },
      description: 'Indica si el option es grupo',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'selected': {
      control: { type: 'boolean' },
      description: 'Indica si esta seleccionado el dropdown',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'selected-aria-label': {
      control: 'text',
      description: 'Etiqueta de accesibilidad para la opción seleccionada',
      table: { category: 'ACCESSIBILITY', type: { summary: 'string' }, defaultValue: { summary: 'seleccionada' } },
    },
    'text': {
      control: 'text',
      description: 'Indica el texto del dropdown option',
    },
    'value': {
      control: 'text',
      description: 'Indica el valor del dropdown option',
    },

    // Slots
    'defaultSlot': {
      control: 'text',
      name: 'defaultSlot',
      description: 'Slot predeterminado para añadir hijos <ath-dropdown-option> cuando se asigne option-group=true indicando que esta opción agrupa a otras.',
      table: { category: 'SLOTS', type: { summary: 'ath-dropdown-option' } },
    },
    'left-asset': {
      control: 'text',
      name: 'left-asset',
      description: 'Contenido izquierdo del dropdown option, destinado para añadir icono, imagen o avatar',
      table: { category: 'SLOTS' },
    },
    'right-asset': {
      control: 'text',
      name: 'right-asset',
      description: 'Contenido del dropdown, que debe ser para descripcion + badge',
      table: { category: 'SLOTS' },
    },
  },
  args: { ...defaultDropdownOptionArgs },
};
export default meta;

type Story = StoryObj<DropdownOptionsArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: excludeArgs, boolean: booleanArgs });

    return `
    <div style="width: 100%">
      <ath-dropdown open placeholder='Selecciona una opcion' dropdown-aria-label='Dropdown'>
        <ath-dropdown-option ${attributes}>
          ${args['left-asset'] ? `<div slot="left-asset">${args['left-asset']}</div>` : ''}
          ${args.defaultSlot ? args.defaultSlot : ''}
          ${args['right-asset'] ? `<div slot="right-asset">${args['right-asset']}</div>` : ''}
        </ath-dropdown-option>
      </ath-dropdown>
    <div>
    `;
  },
  args: { ...defaultDropdownOptionArgs, text: 'Opción 1' },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'h130',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: excludeArgs, boolean: booleanArgs });

    return `
      <div style="width: 100%">
        <ath-dropdown open placeholder="Selecciona una opcion" dropdown-aria-label='Dropdown'>
            <ath-dropdown-option ${attributes}>
              ${args['left-asset'] ? `<div slot="left-asset">${args['left-asset']}</div>` : ''}
              ${args.defaultSlot ? args.defaultSlot : ''}
              ${args['right-asset'] ? `<div slot="right-asset">${args['right-asset']}</div>` : ''}
            </ath-dropdown-option>
        </ath-dropdown>
      <div>
      `;
  },
  args: { ...defaultDropdownOptionArgs, disabled: true, text: 'Option' },
  parameters: {
    storyClass: 'h130',
    controls: {
      exclude: [],
    },
  },
};

export const OptionGroup: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: excludeArgs, boolean: booleanArgs });

    return `
      <div style="width: 100%">
        <ath-dropdown open placeholder="Selecciona una opcion" dropdown-aria-label='Dropdown'>
            <ath-dropdown-option ${attributes}>
              ${args['left-asset'] ? `<div slot="left-asset">${args['left-asset']}</div>` : ''}
              ${args.defaultSlot ? args.defaultSlot : ''}
              ${args['right-asset'] ? `<div slot="right-asset">${args['right-asset']}</div>` : ''}
            </ath-dropdown-option>
        </ath-dropdown>
      <div>
      `;
  },
  args: { ...defaultDropdownOptionArgs, 'option-group': true, 'text': 'Option' },
  parameters: {
    storyClass: 'h130',
    controls: {
      exclude: [],
    },
  },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: excludeArgs, boolean: booleanArgs });
    return `
      <div style="width: 100%">
        <ath-dropdown open placeholder="Selecciona una opcion" dropdown-aria-label='Dropdown'>
            <ath-dropdown-option ${attributes}>
              ${args['left-asset'] ? `<div slot="left-asset">${args['left-asset']}</div>` : ''}
              ${args.defaultSlot ? args.defaultSlot : ''}
              ${args['right-asset'] ? `<div slot="right-asset">${args['right-asset']}</div>` : ''}
            </ath-dropdown-option>
        </ath-dropdown>
      <div>
      `;
  },
  args: { ...defaultDropdownOptionArgs, selected: true, text: 'Option' },
  parameters: {
    storyClass: 'h130',
    controls: {
      exclude: [],
    },
  },
};

export const ConIcono: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: excludeArgs, boolean: booleanArgs });

    return `
      <div style="width: 100%">
        <ath-dropdown open placeholder="Selecciona una opcion" dropdown-aria-label='Dropdown'>
            <ath-dropdown-option ${attributes}>
              ${args['left-asset'] ? `<div slot="left-asset">${args['left-asset']}</div>` : ''}
            </ath-dropdown-option>
        </ath-dropdown>
      <div>
      `;
  },
  args: {
    ...defaultDropdownOptionArgs,
    text: 'Option',
    icon: 'placeholder',
  },
  parameters: {
    storyClass: 'h130',
    controls: {
      exclude: [],
    },
  },
};

export const ConAssetSlots: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: excludeArgs, boolean: booleanArgs });

    return `
      <div style="width: 100%">
        <ath-dropdown open placeholder="Selecciona una opcion" dropdown-aria-label='Dropdown'>
            <ath-dropdown-option ${attributes}>
              ${args['left-asset'] ? `<div slot="left-asset">${args['left-asset']}</div>` : ''}
              ${args.defaultSlot ? args.defaultSlot : ''}
              ${args['right-asset'] ? `<div slot="right-asset">${args['right-asset']}</div>` : ''}
            </ath-dropdown-option>
        </ath-dropdown>
      <div>
      `;
  },
  args: {
    ...defaultDropdownOptionArgs,
    'text': 'Option',
    'left-asset': '<ath-avatar size="xs" type="image"><img slot="img" alt="texto alternativo de la imagen" src="./assets/images/person-picture.png"/></ath-avatar>',
    'right-asset': '<ath-badge color="accent" label="Mensajes pendientes" position="right" type="numeric" value="5"></ath-badge>',
  },
  parameters: {
    storyClass: 'h130',
    controls: {
      exclude: [],
    },
  },
};
