import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { TabArgs } from './tabs.types';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';

const defaultArgs: TabArgs = {
  'disabled': false,
  'icon': undefined,
  'label': 'Tab',
  'icon-aria-label': 'Descripción del icono',
  'selected': false,
};

const meta: Meta<TabArgs> = {
  title: 'Componentes/Tabs/Tab',
  component: 'ath-tabs',
  tags: ['autodocs'],
  argTypes: {
    'disabled': {
      control: 'boolean',
      description: 'Indica si la tab está deshabilitada',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'icon': {
      control: { type: 'select' },
      options: iconNamesList,
      description: 'Especifica el icono',
      table: {
        type: { summary: 'string' },
      },
    },
    'label': {
      control: 'text',
      description: 'Especifica el texto de la tab',
    },
    'selected': {
      control: { type: 'boolean' },
      description: 'Indica si la tab está seleccionada',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    // Accesibilidad
    'icon-aria-label': {
      control: 'text',
      description: 'Añade una etiqueta accesible al icono de la tab',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
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

type Story = StoryObj<TabArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    const html = `
        <ath-tabs style="width: fit-content;">
          <ath-tab id="tab1" ${attributes}"></ath-tab>
          <ath-panel slot="panel" label="Título del contenido de la Tab 1">
          </ath-panel>

          <ath-tab id="tab2" label="..."></ath-tab>
          <ath-panel slot="panel" label="Título del contenido de la Tab 2">
          </ath-panel>
          
          <ath-tab id="tab3" label="..."></ath-tab>
          <ath-panel slot="panel" label="Título del contenido de la Tab 3">
          </ath-panel>
        </ath-tabs>
      `;

    return html;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'w400',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs({ ...args });

    const html = `
        <div class="story__item">
        <div class="story__item__label">Disabled: ${args.disabled}</div>
          <ath-tabs style="width: fit-content;">
            <ath-tab id="tab1" ${attributes}"></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 1">
            </ath-panel>

            <ath-tab id="tab2" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 2">
            </ath-panel>
            
            <ath-tab id="tab3" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 3">
            </ath-panel>
          </ath-tabs>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs, disabled: true },
};

export const ConIcon: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    const html = `
        <div class="story__item">
        <div class="story__item__label">With Icon</div>
          <ath-tabs style="width: fit-content;">
            <ath-tab id="tab1" ${attributes}></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 1">
            </ath-panel>

            <ath-tab id="tab2" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 2">
            </ath-panel>
            
            <ath-tab id="tab3" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 3">
            </ath-panel>
          </ath-tabs>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs, icon: 'check' },
};

export const TypeBox: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    const html = `
        <div class="story__item">
        <div class="story__item__label">El tipo Box de las tabs se activa por medio de la propiedad type del componente Tabs.</div>
          <ath-tabs type="box" style="width: fit-content;">
            <ath-tab id="tab1" ${attributes}"></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 1">
            </ath-panel>

            <ath-tab id="tab2" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 2">
            </ath-panel>
            
            <ath-tab id="tab3" label="..." ></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 3">
            </ath-panel>
          </ath-tabs>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs },
};

export const Selected: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    const html = `
        <div class="story__item">
        <div class="story__item__label">Selected: ${args.selected}</div>
          <ath-tabs style="width: fit-content;">
            <ath-tab id="tab1" ${attributes}"></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 1">
            </ath-panel>

            <ath-tab id="tab2" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 2">
            </ath-panel>
            
            <ath-tab id="tab3" label="..."></ath-tab>
            <ath-panel slot="panel" label="Título del contenido de la Tab 3">
            </ath-panel>
          </ath-tabs>
        </div>
      `;

    return html;
  },
  args: { ...defaultArgs, selected: true },
};
