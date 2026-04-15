import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { PanelArgs } from './tabs.types';
import { getAttributesFromArgs } from '@utils/storybook';

const defaultArgs: PanelArgs = {
  focusable: undefined,
  label: 'Título del panel',
  actionsSlot: '',
  defaultSlot: '',
};

const sampleActionsSlot = `
  <ath-button icon-position="icon-only" icon="download" clear size="md" aria-label="download" color="secondary" (athClick)="downloadPDF()"></ath-button>
  <ath-button icon-position="icon-only" icon="settings" clear size="md" aria-label="settings" color="secondary" (athClick)="showFilters()></ath-button>
`;

const loremIpsum = `<span class="ath-color-text--default">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>`;

const meta: Meta<PanelArgs> = {
  title: 'Componentes/Tabs/Panel',
  component: 'ath-tabs',
  tags: ['autodocs'],
  argTypes: {
    focusable: {
      control: 'boolean',
      description:
        'Indica si el panel puede recibir foco por medio de teclado. <br/>La propiedad focusable debe tener valor <b>true</b> cuando el contenido del panel <b>no contenga</b> ningún elemento interactivo. Y deberá dar valor <b>false</b> cuando <b>contenga</b> elementos interactivos como enlaces y botones.',
      table: {
        type: { summary: 'boolean' },
      },
    },
    label: {
      control: 'text',
      description: 'Título del panel',
    },
    // TABS
    actionsSlot: {
      control: 'text',
      name: 'actions',
      description:
        'Contenido para el slot de las acciones. Incluye todo aquel contenido del panel que esté dentro del la etiqueta con slot "actions". Dicho contenido ha de constar de elementos interactivos. Ej: <ath-button>.',
      table: {
        type: { summary: 'html' },
        category: 'SLOTS',
      },
    },
    defaultSlot: {
      control: 'text',
      name: 'default',
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
  },
};
export default meta;

type Story = StoryObj<PanelArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'actionsSlot']);

    const html = `
                <div class="story__item">
                    <ath-panel slot="panel" ${attributes}>
                      <div slot="actions">
                        ${args.actionsSlot}
                      </div>
                      ${args.defaultSlot}
                    </ath-panel>
                </div>
      `;

    return html;
  },
  args: { ...defaultArgs, defaultSlot: loremIpsum },
  tags: ['!autodocs'],
};

export const Focusable: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'actionsSlot']);

    const html = `
                <div class="story__item">
                    <div class="story__item__label">Focusable</div>
                    <ath-panel slot="panel" ${attributes}>
                      <div slot="actions">
                        ${args.actionsSlot}
                      </div>
                      ${args.defaultSlot}
                    </ath-panel>
                </div>
        `;

    return html;
  },
  args: { ...defaultArgs, focusable: true, defaultSlot: loremIpsum },
};

export const PanelConAcciones: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'actionsSlot']);

    const html = `
                <div class="story__item">
                  <div class="story__item__label">Panel con Acciones</div>
                    <ath-panel slot="panel" ${attributes}>
                      <div slot="actions">
                        ${args.actionsSlot}
                      </div>
                      ${args.defaultSlot}
                    </ath-panel>
                </div>
        `;

    return html;
  },
  args: { ...defaultArgs, focusable: false, defaultSlot: loremIpsum, actionsSlot: sampleActionsSlot },
};
