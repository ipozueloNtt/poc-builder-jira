import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { MenuHorizontalArgs } from './menu-horizontal.types';
import { withActions } from 'storybook/actions/decorator';
import { TargetTypes } from '../menu-horizontal.model';

const defaultArgs: MenuHorizontalArgs = {
  'items': undefined,
  'ath-aria-label': 'Menú de navegación principal',
  'defaultSlot': undefined,
};

const meta: Meta<MenuHorizontalArgs> = {
  title: 'Componentes/Menu Horizontal/Menu Horizontal',
  component: 'ath-menu-horizontal',
  parameters: {
    componentSubtitle: 'Es un componente de navegación que organiza enlaces principales en una sola fila, permitiendo al usuario moverse entre diferentes páginas o secciones.',
    actions: { handles: ['athSelected'] },
  },
  tags: ['autodocs'],
  decorators: [withActions],
  argTypes: {
    'has-divider': {
      control: 'boolean',
      description: 'Indica si el menú horizontal tiene una línea divisoria en su parte inferior',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    'items': {
      control: 'object',
      description: `Array de objetos para generar los ítems del menú horizontal de forma imperativa.
      Si se utiliza, se ignora el contenido del slot por defecto.

Cada objeto debe tener la siguiente estructura:
- \`label\` (string): texto visible del ítem.
- \`selected\` (boolean, opcional): si el ítem está seleccionado.
- \`disabled\` (boolean, opcional): si el ítem está deshabilitado.
- \`href\` (string, opcional): URL del ítem.
- \`target\` (string, opcional): target del enlace (blank, self, parent, top).
- \`badgeLabel\`, \`badgeValue\`, \`badgeMax\`, \`externalLabel\`, \`rel\` (opcionales): propiedades adicionales para badges y enlaces externos.
- \`value\` (any, opcional): valor del ítem.

Ejemplo:

    [
      { label: "Inicio", selected: true },
      { label: "Posición global" },
      { label: "Cobros/Pagos", disabled: true}
    ]
`,
      table: {
        type: { summary: 'MenuHorizontalItem[]' },
      },
    },
    // SLOTS
    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      description: 'Contenido de los ítems del menú horizontal',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
    // ACCESSIBILITY
    'ath-aria-label': {
      control: { type: 'text' },
      description: 'Indica la etiqueta accesible del menú horizontal',
      table: { type: { summary: 'string' } },
    },
    // ACTIONS
    'athSelected': {
      action: 'athSelected',
      description: 'Se emite al seleccionar un ítem',
      table: {
        type: { summary: 'EventEmitter<MenuHorizontalItem>' },
        category: 'EVENTS',
      },
    },
  },
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<MenuHorizontalArgs>;

const generateItems = (copies = 1) => {
  let items = '';
  for (let i = 1; i <= copies; i++) {
    items += `          <ath-menu-horizontal-item label="Ítem ${i}" href="https://www.ibercaja.es" target="blank"></ath-menu-horizontal-item>\n`;
  }
  return items;
};
const items = [
  { id: '1', label: 'Ítem 1', selected: true, href: 'https://www.ibercaja.es', target: 'blank' as TargetTypes },
  { id: '2', label: 'Ítem 2', value: 'item-2' },
  { id: '3', label: 'Ítem 3', value: 'item-3', disabled: true },
];

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athSelected']);

    return `
  <div class="story__item">
    <ath-menu-horizontal ${attributes}>
      ${
        args.defaultSlot ||
        `<ath-menu-horizontal-item label="Inicio" value="inicio"></ath-menu-horizontal-item>
      <ath-menu-horizontal-item label="Posición Global" value="posicion-global"></ath-menu-horizontal-item>
      <ath-menu-horizontal-item label="Cobros/Pagos" value="cobros-pagos"></ath-menu-horizontal-item>
      <ath-menu-horizontal-item label="Contratar" value="contratar"></ath-menu-horizontal-item>
      <ath-menu-horizontal-item label="Haz tus números" value="haz-tus-numeros"></ath-menu-horizontal-item>`
      }
    </ath-menu-horizontal>
  </div>`;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col',
  },
};

export const ConDivider: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athSelected', 'has-divider']);

    return `
    <div class="story__item">
      <div class="story__item__label">Has divider: true</div>
        <ath-menu-horizontal ${attributes} has-divider>
${generateItems(5)}        </ath-menu-horizontal>
    </div>
    <div class="story__item">
      <div class="story__item__label">Has divider: false</div>
        <ath-menu-horizontal ${attributes} has-divider="false">
${generateItems(5)}        </ath-menu-horizontal>
    </div>`;
  },
  args: {
    ...defaultArgs,
  },
  argTypes: {
    defaultSlot: { table: { disable: true } },
  },
  tags: ['autodocs'],
  parameters: {
    storyClass: 'flex-col',
    controls: {
      exclude: ['defaultSlot', 'athSelected'],
    },
  },
};

export const ScrollAutomatico: Story = {
  name: 'Scroll automático',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athSelected']);

    return `
    <div class="story__item">
      <ath-menu-horizontal ${attributes}>
${generateItems(20)}      </ath-menu-horizontal>
    </div>`;
  },
  args: {
    ...defaultArgs,
  },
  argTypes: {
    defaultSlot: { table: { disable: true } },
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        story: 'Cuando los ítems desbordan su contenedor, se genera el scroll automático.',
      },
    },
    storyClass: 'flex-col',
    controls: {
      exclude: ['defaultSlot', 'athSelected'],
    },
  },
};

export const ConPropiedadItems: Story = {
  render: args => {
    const itemsJson = JSON.stringify(items);
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athSelected', 'items']);

    return `
  <div class="story__item">
    <ath-menu-horizontal items='${itemsJson}' ${attributes}>
    </ath-menu-horizontal>
    </div>
  </div>`;
  },
  args: { ...defaultArgs, items: [...items] },
  argTypes: {
    defaultSlot: { table: { disable: true } },
  },
  parameters: {
    docs: {
      description: {
        story: 'Opcionalmente, los ítems pueden definirse como un MenuHorizontalItem[].',
      },
    },
    storyClass: 'flex-col',
    controls: {
      exclude: ['defaultSlot', 'athSelected'],
    },
  },
};
