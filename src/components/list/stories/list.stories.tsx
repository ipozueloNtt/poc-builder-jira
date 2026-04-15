import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { ListLinkTarget, ListOrientation, ListSizes } from '../list.model';

import { ListArgs } from './list.types';

const defaultListArgs: ListArgs = {
  'clickable': false,
  'disabled': false,
  'has-divider': true,
  'orientation': ListOrientation.Vertical,
  'size': ListSizes.Medium,
};

const meta: Meta<ListArgs> = {
  title: 'Componentes/List/List',
  component: 'ath-list',
  argTypes: {
    'clickable': {
      control: 'boolean',
      description: 'Indica si la lista es clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'orientation': {
      control: 'inline-radio',
      options: Object.values(ListOrientation),
      description: 'Orientación de los items de la lista.',
      table: {
        type: { summary: 'ListOrientationType' },
        defaultValue: { summary: defaultListArgs.orientation },
      },
    },
    'size': {
      control: 'inline-radio',
      options: Object.values(ListSizes),
      description: 'Tamaño del item de la lista',
      table: {
        type: { summary: 'ListSizeType' },
        defaultValue: { summary: defaultListArgs.size },
      },
    },
    'has-divider': {
      control: 'boolean',
      description: 'Indica si la lista contiene separadores entre items.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: `${defaultListArgs['has-divider']}` },
      },
    },
    'disabled': {
      control: 'boolean',
      description: 'Indica si la lista esta deshabilitado, este estado solo aplica si la lista es clickable=true',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'aria-label': {
      control: { type: 'text' },
      description: 'Define el texto accesible de la lista',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Define el id del texto accesible para la lista',
      table: { type: { summary: 'string' }, category: 'ACCESSIBILITY' },
    },
  },
  args: { ...defaultListArgs },
  parameters: {
    componentSubtitle: 'La lista es un componente de interfaz que permite realizar una enumeración agrupando un conjunto de ath-list-items.',
    controls: { expanded: true },
    darkMode: {
      stylePreview: true,
    },
  },
};
export default meta;

const getHtmlListItems = (length = 2): string => {
  const items = Array.from({ length }, (_, i) => i + 1);
  return items
    .map(
      index => `
        <ath-list-item 
          heading-level="4"
          heading-text="Title ${index}"
          subtitle="Subtitle ${index}"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          tooltip="Lorem ipsum dolor sit amet."
          >
            <div slot="left-detail"><ath-icon icon="placeholder" color="default" size="sm"></ath-icon></div>
            <div slot="right-detail">
              <span class="ath-h4 ath-color-text--primary">${index * 123},00€</span>
              <span class="ath-body--lg ath-color-text--subtle">${index * 236},00€</span>
              <ath-tag heading-text="Tag ${index}" size="sm" color="secondary"></ath-tag>
              <ath-icon icon="placeholder" color="default" size="sm"></ath-icon>
            </div>
        </ath-list-item>
      `,
    )
    .join('');
};

type Story = StoryObj<ListArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);

    return `
    <div class="ath-color-bg--200 ath-border-radius--sm" style="padding: 60px; width: 100%"> 
    <ath-list ${attributes}>
    ${getHtmlListItems(4)}  
      </ath-list>
     </div>
`;
  },
  args: { ...defaultListArgs },
  tags: ['!autodocs'],
};

export const Orientation: Story = {
  render: (args): string => {
    const orientations = ['vertical', 'horizontal'];
    const attributes = getAttributesFromArgs(args, ['orientation']);

    return orientations
      .map(
        orientation => `
    <div class="ath-color-bg--200 ath-border-radius--sm" style="padding: 60px; width: 100%"> 
          <div class="story__item__label">orientation: ${orientation}</div>
          <ath-list orientation="${orientation}" ${attributes}>
            ${getHtmlListItems(2)}
          </ath-list>
        </div>
      `,
      )
      .join('');
  },
  args: { ...defaultListArgs },
  parameters: {
    controls: {
      exclude: ['orientation'],
    },
  },
};

export const Size: Story = {
  render: (args): string => {
    const sizes = ['sm', 'md', 'lg'];
    const attributes = getAttributesFromArgs(args, ['size']);

    return sizes
      .map(
        size => `
        <div class="ath-color-bg--200 ath-border-radius--sm" style="padding: 60px; min-width: 400px"> 
          <div class="story__item__label">size: ${size}</div>
          <ath-list size="${size}" ${attributes}>
            ${getHtmlListItems(2)}
          </ath-list>
        </div>
      `,
      )
      .join('');
  },
  args: { ...defaultListArgs },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};

export const HasDivider: Story = {
  render: (args): string => {
    const options = ['true', 'false'];
    const attributes = getAttributesFromArgs(args, ['has-divider']);

    return options
      .map(
        option => `
          <div class="ath-color-bg--200 ath-border-radius--sm" style="padding: 60px; width: 100%"> 
            <div class="story__item__label">has-divider: ${option}</div>
            <ath-list has-divider="${option}" ${attributes}>
              ${getHtmlListItems(4)}
            </ath-list>
          </div>
      `,
      )
      .join('');
  },
  args: { ...defaultListArgs },
  parameters: {
    controls: {
      exclude: ['has-divider'],
    },
  },
};

export const AllTypesItems: Story = {
  render: (args): string => {
    const itemsData = [
      { disabled: true, clickable: true },
      { disabled: true, clickable: false },
      { disabled: false, clickable: true, href: 'https://www.google.com/', target: ListLinkTarget.Blank },
      { disabled: false, clickable: true, target: ListLinkTarget.Blank },
    ];

    return `
      <div class="w600">
        <div class="story__item__label">Items Independientes sincronizados opcionalmente</div>
        <ath-list orientation="${args.orientation}" size="${args.size}">
          ${itemsData
            .map(({ disabled, clickable, href, target }, idx) => {
              const attrs = getAttributesFromArgs({ ...args, disabled, clickable, href, target }, { exclude: ['left-detail', 'right-detail'] });

              const leftDetail =
                disabled && clickable
                  ? `<ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon>`
                  : `<ath-icon icon="placeholder" color="default" size="sm"></ath-icon>`;

              const rightDetail =
                disabled && clickable
                  ? `
                    <span class="ath-h4 ath-color-text--disabled">000,00€</span>
                    <span class="ath-body--lg ath-color-text--disabled">000,00€</span>
                    <ath-tag label="Tag" size="sm" color="disabled"></ath-tag>
                    <ath-icon icon="placeholder" color="disabled" size="sm"></ath-icon>
                  `
                  : `
                    <span class="ath-h4 ath-color-text--primary">000,00€</span>
                    <span class="ath-body--lg ath-color-text--subtle">000,00€</span>
                    <ath-tag label="Tag" size="sm" color="secondary"></ath-tag>
                    <ath-icon icon="placeholder" color="default" size="sm"></ath-icon>
                  `;

              return `
                <ath-list-item
                  heading-level="4"
                  heading-text="Title ${idx + 1}"
                  subtitle="Subtitle ${idx + 1}"
                  description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                  tooltip="Lorem ipsum dolor sit amet."
                  ${attrs}
                >
                  <div slot="left-detail">${leftDetail}</div>
                  <div slot="right-detail">${rightDetail}</div>
                </ath-list-item>
              `;
            })
            .join('')}
        </ath-list>
      </div>
    `;
  },
  args: { ...defaultListArgs, disabled: false, clickable: true },
  parameters: {
    controls: { exclude: ['clickable', 'disabled', 'has-divider'] },
  },
};
