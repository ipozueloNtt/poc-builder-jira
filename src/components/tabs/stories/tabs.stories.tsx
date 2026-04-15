import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabsArgs } from './tabs.types';
import { getAttributesFromArgs } from '@utils/storybook';
import { TabItem } from '../tabs.model';

const sampleTabWithPanel = (index, isDisabled = false) => {
  const disabled = isDisabled ? 'disabled="true"' : '';

  return `
  <ath-tab id="tab${index}" label="Tab ${index}" ${disabled}></ath-tab>
  <ath-panel slot="panel" label="Título del contenido de la Tab ${index}">
    <div slot="actions">
        <ath-button icon-position="icon-only" icon="download" clear size="md" aria-label="download" color="secondary"></ath-button>
        <ath-button icon-position="icon-only" icon="settings" clear size="md" aria-label="settings" color="secondary"></ath-button>
    </div>
    <span class="ath-color-text--default">Contenido de Tab 1</span>
  </ath-panel>
`;
};

const defaultArgs: TabsArgs = {
  'items': undefined,
  'type': 'underline',
  'list-aria-label': 'Listado de tabs disponibles',
  'actionsSlot': undefined,
  'defaultSlot': undefined,
};

const items: TabItem[] = [
  { id: 'tab1', label: 'Tab 1', icon: 'close' },
  { id: 'tab2', label: 'Tab 2', icon: 'close' },
  { id: 'tab3', label: 'Tab 3', icon: 'close', disabled: true },
];

const meta: Meta<TabsArgs> = {
  title: 'Componentes/Tabs/Tabs',
  component: 'ath-tabs',
  tags: ['autodocs'],
  argTypes: {
    'items': {
      control: 'object',
      description: 'Array de objetos TabItem para definir las tabs',
      table: {
        type: { summary: 'Object' },
      },
    },
    'type': {
      control: 'select',
      options: ['underline', 'box'],
      description: 'Indica el tipo de las tabs',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'underline' },
      },
    },
    // Accesibilidad
    'list-aria-label': {
      control: 'text',
      description: 'Añade una etiqueta accesible al conjunto de las tabs',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    // SLOTS
    'actionsSlot': {
      control: 'text',
      name: 'actions',
      description:
        'Contenido para el slot de las acciones. Incluye todo aquel contenido del panel que esté dentro del la etiqueta con slot "actions". Dicho contenido ha de constar de elementos interactivos. Ej: <ath-button>.',
      table: {
        type: { summary: 'html' },
        category: 'SLOTS',
      },
    },
    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      description: 'Contenido para el slot por defecto. Incluye todo aquel contenido del panel que NO esté dentro del la etiqueta con slot "actions".',
      table: {
        type: { summary: 'string' },
        category: 'SLOTS',
      },
    },
  },
  args: { ...defaultArgs },
  parameters: {
    darkMode: { stylePreview: true },
    backgrounds: { disable: true },
    componentSubtitle:
      'El componente ath-tabs es el contenedor de ath-tab (item clicable) y de ath-panel, espacio para el contenido de la tab. Este componente estructura y define la apariencia y estilos de su contenido.',
  },
};

export default meta;

type Story = StoryObj<TabsArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    const html = `
        <ath-tabs ${attributes}>
          ${sampleTabWithPanel(1)}
          ${sampleTabWithPanel(2)}
          ${sampleTabWithPanel(3)}
          ${sampleTabWithPanel(4)}
        </ath-tabs>
     </div>
      `;

    return html;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w500',
  },
};

export const ErrorEnLaCantidadDePanels: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args);

    return `
              <div class="story__item__label">En caso de haber un número menor de paneles que tabs, se muestra un error en el inspector. Compruébelo pulsando F12.</div>
                <ath-tabs ${attributes}>
                  ${sampleTabWithPanel(1)}
                  
                  <ath-tab id="tab2" label="Tab 2"></ath-tab>
                  <ath-tab id="tab3" label="Tab 3"></ath-tab>
                  <ath-tab id="tab4" label="Tab 4" disabled="true"></ath-tab>
                </ath-tabs>
              </div>
          `;
  },
  args: { ...defaultArgs },
  parameters: {
    storyClass: 'flex-col w500',
  },
};

export const ConPropiedadItems: Story = {
  render: args => {
    const argsWithTabItems = { ...args, items: JSON.stringify(items) };
    const attributes = getAttributesFromArgs(argsWithTabItems);

    return `
              <div class="story__item__label">Opcionalmente, las tabs pueden definirse como un Items[].</div>
                <ath-tabs ${attributes}>
                  ${sampleTabWithPanel(1)}
                  ${sampleTabWithPanel(2)}
                </ath-tabs>
              </div>
          `;
  },
  args: { ...defaultArgs, items: [...items] },
  parameters: {
    storyClass: 'flex-col w500',
  },
};

export const ScrollHorizontal: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args);

    const tabsHtml = `
            <div class="story__item__label">En el caso de que la anchura del conjunto de tabs supere la anchura del componente, se puede manejar el scroll.</div>
              <ath-tabs ${attributes}>
                ${sampleTabWithPanel(1)}
                ${sampleTabWithPanel(2)}
                ${sampleTabWithPanel(3)}
                ${sampleTabWithPanel(4, true)}
                ${sampleTabWithPanel(5, true)}
                ${sampleTabWithPanel(6, true)}
              </ath-tabs>
            </div>
          `;

    return tabsHtml;
  },
  args: { ...defaultArgs },
  parameters: {
    storyClass: 'flex-col w500',
  },
};

export const TypeBox: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args);

    return `
              <div class="story__item__label">Tipo: ${args.type}</div>
                <ath-tabs ${attributes}>
                ${sampleTabWithPanel(1)}
                ${sampleTabWithPanel(2)}
                ${sampleTabWithPanel(3)}
                ${sampleTabWithPanel(4)}
                </ath-tabs>
            </div>
          `;
  },
  args: { ...defaultArgs, type: 'box' },
  parameters: {
    docs: {
      description: {
        story:
          'Cuando hay más tabs que espacio disponible, se mostrarán botones a la deracha y/o izquierda que permiten mejorar la navegación. El siguiente contenedor tiene 400p de ancho.',
      },
      storyClass: 'flex-col w500',
    },
  },
};
