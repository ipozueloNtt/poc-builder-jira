import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { MenuLateralArgs, ordererArgs } from './menu-lateral.types';
import { combinedItems, imperativeItems } from './data-source';

const defaultArgs: MenuLateralArgs = {
  ...ordererArgs,
};

const meta: Meta<MenuLateralArgs> = {
  title: 'Componentes/Menu Lateral/Menu Lateral',
  component: 'ath-menu-lateral',
  parameters: {
    actions: { handles: ['athSelected'] },
    componentSubtitle:
      'Menu Lateral es un componente a modo de panel vertical que proporciona al usuario la posibilidad de navegar entre secciones, generalmente ubicado en el lado izquierdo o derecho de la pantalla. Admite <ath-menu-lateral-item-action> y <ath-menu-lateral-item-link> como subcomponentes hijo, los cuales pueden convivir a la vez en un mismo <ath-menu-lateral>. Ambos presentan exactamente el mismo aspecto.',
  },
  tags: ['autodocs'],
  argTypes: {
    // Items
    'items': {
      control: 'object',
      description: 'Array de objetos MenuLateralItemAction y MenuLateralItemLink para definir los menuitem',
      table: {
        type: { summary: 'Object' },
      },
    },
    // Accesibilidad
    'aria-label': {
      control: 'text',
      description: 'Añade una etiqueta accesible al menu',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    // Eventos
    'athSelected': {
      action: 'athSelected',
      description: 'Se emite al hacer clic en un item',
      table: {
        type: { summary: 'EventEmitter<string>' },
        category: 'EVENTS',
      },
    },
  },
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<MenuLateralArgs>;

const generateItems = (copies = 3) => {
  let itemsAction = '';
  for (let i = 1; i <= copies; i++) {
    itemsAction += `<ath-menu-lateral-item-action
        icon="placeholder"
        tooltip-text="Action ${i}"
        name="action n${i}"
      ></ath-menu-lateral-item-action>\n`;
  }
  let itemsLink = '';
  for (let i = 1; i <= copies; i++) {
    itemsLink += `<ath-menu-lateral-item-link
        icon="placeholder"
        tooltip-text="Link ${i}"
        name="link n${i}"
        href="http://www.ibercaja.es"
      ></ath-menu-lateral-item-link>\n`;
  }
  return itemsAction + itemsLink;
};

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelected']);

    return `
      <div class="story__item">
        <ath-menu-lateral ${attributes} aria-label="Menu lateral">
          ${generateItems()}
        </ath-menu-lateral>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    storyClass: 'flex-col',
  },
};

export const ItemsCombinados: Story = {
  render: (): string => {
    return combinedItems;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    storyClass: 'flex-col',
  },
};

export const ConPropiedadItems: Story = {
  render: (): string => {
    const itemsJson = JSON.stringify(imperativeItems);

    return `
          <div class="story__item">
            <ath-menu-lateral aria-label="Menu lateral" items='${itemsJson}'}>
            </ath-menu-lateral>
          </div>`;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    storyClass: 'flex-col',
  },
};
