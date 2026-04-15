import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { MenuButtonItemArgs, ordererArgs } from './menu-button-item.types';

const defaultArgs: MenuButtonItemArgs = {
  ...ordererArgs,
  text: 'Opción',
};

const meta: Meta<MenuButtonItemArgs> = {
  title: 'Componentes/Menu Button/Menu Button Item',
  component: 'ath-menu-button-item',
  parameters: {
    actions: { handles: ['athSelected'] },
    componentSubtitle: 'El componente ath-menu-button item corresponde a cada item interactivo dentro del ath-menu-button.',
  },
  tags: ['autodocs'],
  argTypes: {
    'disabled': {
      control: 'boolean',
      description: 'Indica si el item está deshabilitado o no',
      table: {
        type: { summary: 'boolean' },
      },
    },
    'icon': {
      control: { type: 'select' },
      options: iconNamesList,
      description: 'Indica el nombre del icono a incluir en el botón, que debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },
    'name': {
      control: 'text',
      description: 'Indica el nombre para el menu-button-item',
    },
    'group-name': {
      control: { type: 'text' },
      description: 'Indica el nombre del grupo al que pertence, en caso de que se quiera agrupar este menu-button-item',
      table: {
        type: { summary: 'string' },
      },
    },
    'text': {
      control: { type: 'text' },
      description: 'Indica el texto que contiene el item',
      table: { type: { summary: 'string' } },
    },
    // EVENTS
    'athSelected': {
      action: 'athSelected',
      description:
        'El componente ath-menu-button-item emite el evento athSelected cuando es seleccionado con ratón o teclado, pero el elemento ath-menu-button detiene su propagación, por lo que no es posible escucharlo en estas historias ni mostrarlo en la pestaña Actions.',
      table: {
        type: { summary: 'EventEmitter<HTMLAthMenuButtonItemElement>' },
        category: 'EVENTS',
      },
    },
  },
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<MenuButtonItemArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelected']);

    return `
      <div class="story__item">
        <ath-menu-button icon="menu" ath-aria-label="Texto descriptivo" open="true">
          <ath-menu-button-item ${attributes}></ath-menu-button-item>
        </ath-menu-button>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w400',
  },
};

export const Disabled: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['athSelected']);
    return `
        <div class="story__item">
          <div class="story__item__label">disabled: ${args.disabled}</div>
          <ath-menu-button icon="menu" ath-aria-label="Texto descriptivo" open="true">
            <ath-menu-button-item ${attributes}></ath-menu-button-item>
          </ath-menu-button>
          </div>
        </div>
    `;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      exclude: ['group-name', 'athSelected'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConIcono: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['athSelected']);

    return `
          <div class="story__item">
            <div class="story__item__label">icon: ${args.icon}</div>
            <ath-menu-button icon="menu" ath-aria-label="Texto descriptivo" open="true">
              <ath-menu-button-item ${attributes}></ath-menu-button-item>
            </ath-menu-button>
          </div>
    `;
  },
  args: { ...defaultArgs, icon: 'placeholder' },
  parameters: {
    controls: {
      exclude: ['group-name', 'athSelected'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Agrupado: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['athSelected']);
    return `
        <div class="story__item">
          <div class="story__item__label">Agrupado</div>   
            <ath-menu-button open clear ath-aria-label="Label">
              <ath-menu-button-item ${attributes}></ath-menu-button-item>
              <ath-menu-button-item text="Opción 2"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 3" group-name="Group"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 4" group-name="Group"></ath-menu-button-item>
              <ath-menu-button-item text="Opción 5"></ath-menu-button-item>
            </ath-menu-button>
        </div>
    `;
  },
  args: { ...defaultArgs, text: 'Opción 1' },
  parameters: {
    docs: {
      description: {
        component:
          'Nota: El evento athSelected es interceptado por el padre ath-menu-button, y evita su propagación, para luego transmitir el evento athAction. Por este motivo, no se visualizará athClick en la pestaña de Actions.',
      },
    },
    controls: {
      exclude: ['group-name', 'athSelected'],
    },

    storyClass: 'flex-col w00',
  },
};
