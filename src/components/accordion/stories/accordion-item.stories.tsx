import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { AccordionItemArgs } from './accordion.types';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';

const defaultArgs: AccordionItemArgs = {
  'description': 'Description',
  'defaultSlot': `<p class="ath-body--sm ath-color-text--default">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
  'disabled': false,
  'expanded': false,
  'heading-level': '2',
  'header-detail': undefined,
  'icon': undefined,
  'heading-text': 'Title',
};

const meta: Meta<AccordionItemArgs> = {
  title: 'Componentes/Accordion/Accordion Item',
  component: 'ath-accordion-item',
  argTypes: {
    'heading-text': {
      control: 'text',
      description: 'Indica el título para la cabecera',
    },
    'icon': {
      control: { type: 'select' },
      options: ['', ...iconNamesList],
      description: 'Icono a mostrar junto al título de la cabecera',
    },
    'description': {
      control: 'text',
      description: 'Descripción para la cabecera',
    },
    'disabled': {
      control: 'boolean',
      description: 'Deshabilita el elemento de acordeón',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'expanded': {
      control: 'boolean',
      description: 'Muestra el elemento abierto',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'heading-level': {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6],
      description: 'Nivel de encabezado para el título de la cabecera, valor entre 1 y 6',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: '2' },
      },
    },
    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      description: 'Contenido del elemento de acordeón',
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
    },
    'header-detail': {
      control: 'text',
      name: 'header-detail',
      description: 'Contenido a incluir en la cabecera',
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
    },
  },
  args: { ...defaultArgs },
};
export default meta;

type Story = StoryObj<AccordionItemArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'header-detail']);

    return `
      <div style="width: 500px">
        <ath-accordion>
          <ath-accordion-item ${attributes}>
           ${
             args['header-detail']
               ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
               : ''
           }
            ${args.defaultSlot}
          </ath-accordion-item>
        </ath-accordion>
      </div>
    `;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'disabled']);
    return `
        <div class="story__item w500">
          <div class="story__item__label">Accordion con un item deshabilitado</div>
          <ath-accordion>
            <ath-accordion-item ${attributes}>
                  ${
                    args['header-detail']
                      ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                      : ''
                  }
                   ${args.defaultSlot}
            </ath-accordion-item>
            <ath-accordion-item disabled="true" ${attributes} >
                ${
                  args['header-detail'] &&
                  `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                }
                 ${args.defaultSlot}
            </ath-accordion-item>
            <ath-accordion-item ${attributes}>
              ${
                args['header-detail']
                  ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                  : ''
              }
               ${args.defaultSlot}
          </ath-accordion-item>
          </ath-accordion>
        </div>
    `;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['disabled', 'expanded', 'defaultSlot', 'header-detail'],
    },
  },
};

export const Expanded: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'expanded', 'header-detail']);
    return `
        <div class="story__item w500">
          <div class="story__item__label">Accordion con un item expandido</div>
          <ath-accordion>
            <ath-accordion-item expanded ${attributes}>
               ${
                 args['header-detail']
                   ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                   : ''
               }
              <p class="ath-body--sm ath-color-text--default">Contenido enabled y expanded.</p>
             ${args.defaultSlot}
            </ath-accordion-item>
            <ath-accordion-item ${attributes}>
               ${
                 args['header-detail']
                   ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                   : ''
               }
              ${args.defaultSlot}
            </ath-accordion-item>
            <ath-accordion-item ${attributes}>
               ${
                 args['header-detail']
                   ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                   : ''
               }
               ${args.defaultSlot}
            </ath-accordion-item>
          </ath-accordion>
        </div>
    `;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['expanded'],
    },
  },
};

export const ConHeaderDetail: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'expanded', 'header-detail']);
    return `
        <div class="story__item w500">
          <ath-accordion>
            <ath-accordion-item ${attributes}>
               ${
                 args['header-detail']
                   ? `<div slot="header-detail">
                ${args['header-detail']}
              </div>`
                   : ''
               }
              ${args.defaultSlot}
            </ath-accordion-item>
          </ath-accordion>
        </div>
    `;
  },
  args: { ...defaultArgs, 'header-detail': `<span class="ath-h6">Productos</span>\n<span class="ath-body--md">38</span> ` },
};
