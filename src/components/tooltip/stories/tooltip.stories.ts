import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { TooltipArgs } from './tooltip.types';
import { Playground as PlaygroundTrigger } from './tooltip-trigger.stories';

const defaultArgs: Partial<TooltipArgs> = {
  'color': 'primary',
  'has-arrow': true,
  'heading-text': 'This is a tooltip',
  'position': 'right',
  'trigger': 'hover',
  'defaultSlot': `<ath-button>Button</ath-button>`,
};

const meta: Meta<TooltipArgs> = {
  title: 'Componentes/Tooltip/Tooltip',
  component: 'ath-tooltip',
  tags: ['autodocs'],
  argTypes: {
    'color': {
      control: 'radio',
      options: ['primary', 'secondary'],
      description: 'Define el color de fondo del tooltip',
      table: {
        type: { summary: 'TooltipColors' },
        defaultValue: { summary: 'primary' },
      },
    },
    'has-arrow': {
      control: 'boolean',
      description: 'Indica si el tooltip lleva indicador de flecha',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    'heading-text': {
      control: 'text',
      description: 'Contenido del tooltip',
      table: {
        type: { summary: 'string' },
      },
    },
    'position': {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right', 'top-right', 'top-left', 'bottom-right', 'bottom-left'],
      description: 'Posicionamiento del tooltip respecto del elemento que lo activa',
      table: {
        type: { summary: 'TooltipPositions' },
        defaultValue: { summary: 'right' },
      },
    },
    'trigger': {
      control: 'radio',
      options: ['hover', 'click'],
      description: 'Define el comportamiento que activa el tooltip',
      table: {
        type: { summary: 'TooltipTriggers' },
        defaultValue: { summary: 'hover' },
      },
    },
    'max-width': {
      control: 'number',
      description: 'Ancho máximo del contenedor del Tooltip. Dejar el valor a 0 para ancho completo.',
      table: {
        type: { summary: 'number' },
      },
    },
    'defaultSlot': {
      name: 'default slot',
      control: 'text',
      description: 'Slot para el elemento que activará al tooltip',
      table: {
        category: 'SLOTS',
        type: { summary: 'string' },
      },
    },
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    darkMode: {
      stylePreview: true,
    },
    backgrounds: { disable: true },
    layout: 'centered',
    componentSubtitle:
      'Proporciona información adicional al usuario al interactuar con un elemento que lo activa, como un botón o un tooltip trigger. El elemento que lo activa se incorpora como slot del tooltip.',
  },
};

export default meta;

type Story = StoryObj<TooltipArgs>;

export const Playground: Story = {
  render: args => {
    const attributes = getAttributesFromArgs({
      'heading-text': args['heading-text'],
      'position': args['position'],
      'has-arrow': args['has-arrow'],
      'color': args['color'],
      'trigger': args['trigger'],
      'max-width': args['max-width'],
    });

    const html = `
      <div class="story__item h130">
        <ath-tooltip ${attributes}>
          ${args.defaultSlot}
        </ath-tooltip>
      </div>
    `;
    return html;
  },
  args: {
    ...defaultArgs,
    position: 'bottom',
    trigger: 'hover',
  },
  tags: ['!autodocs'],
};

export const Position: Story = {
  render: args => {
    const { 'heading-text': athHeadingText, 'has-arrow': hasArrow, color, 'max-width': maxWidth, trigger } = args;
    const positions = ['top-left', 'top', 'top-right', 'left', '', 'right', 'bottom-left', 'bottom', 'bottom-right'];
    const html = `
        ${positions
          .map(
            position => `
          <div class="story__item">
            ${
              position
                ? `
                  <div class="story__item__label text-center">Position: ${position}</div>
                  <div style="justify-self:center; ">
                    <ath-tooltip heading-text="${athHeadingText}" position=${position} has-arrow="${hasArrow}" color="${color}" max-width="${maxWidth}" trigger="${trigger}">
                      ${args.defaultSlot}
                    </ath-tooltip>
                  </div>`
                : ''
            }
          </div>
        `,
          )
          .join('')}
    `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: { include: ['heading-text', 'has-arrow', 'color', 'trigger', 'max-width'] },
    storyClass: 'grid grid-cols-3 h500 grid-rows-3 text-center',
  },
};

export const HasArrow: Story = {
  render: args => {
    const { 'heading-text': athHeadingText, position, color, 'max-width': maxWidth, trigger } = args;
    const hasArrows = [
      { value: true, headingText: 'With arrow' },
      { value: false, headingText: 'Without arrow' },
    ];
    const html = `
      ${hasArrows
        .map(
          hasArrow => `
          <div class="story__item center-item">
            <div class="story__item__label">${hasArrow.headingText}</div>
            <ath-tooltip heading-text="${athHeadingText}" position="${position}" has-arrow="${hasArrow.value}" color="${color}" max-width="${maxWidth}" trigger="${trigger}">
               ${args.defaultSlot}
            </ath-tooltip>
          </div>`,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: { include: ['heading-text', 'position', 'color', 'trigger', 'max-width'] },
    storyClass: 'grid grid-cols-2',
  },
};

export const color: Story = {
  render: args => {
    const { 'heading-text': athHeadingText, position, 'has-arrow': hasArrow, trigger, 'max-width': maxWidth } = args;
    const colors = ['primary', 'secondary'];
    const html = `
      ${colors
        .map(
          color => `
          <div class="story__item center-item">
            <div class="story__item__label">Color: ${color}</div>
            <ath-tooltip
              heading-text="${athHeadingText}"
              position="${position}" 
              has-arrow="${hasArrow}"
              color="${color}"
              trigger="${trigger}"
              max-width="${maxWidth}"
            >
               ${args.defaultSlot}
            </ath-tooltip>
          </div>
        `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: { include: ['heading-text', 'position', 'has-arrow', 'trigger', 'max-width'] },
    storyClass: 'grid grid-cols-2',
  },
};

export const trigger: Story = {
  render: args => {
    const { 'heading-text': athHeadingText, position, 'has-arrow': hasArrow, color, 'max-width': maxWidth } = args;
    const triggers = ['hover', 'click'];
    const html = `
      ${triggers
        .map(
          trigger => `
          <div class="story__item center-item">
            <div class="story__item__label">Trigger: ${trigger}</div>
            <ath-tooltip
              heading-text="${athHeadingText}"
              position="${position}" 
              has-arrow="${hasArrow}"
              color="${color}"
              trigger="${trigger}"
              max-width="${maxWidth}"
            >
               ${args.defaultSlot}
            </ath-tooltip>
          </div>
        `,
        )
        .join('')}
      `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: { include: ['heading-text', 'position', 'has-arrow', 'color', 'max-width'] },
    storyClass: 'grid grid-cols-2',
  },
};

export const maxWidth: Story = {
  render: args => {
    const { 'has-arrow': hasArrow, position, color, trigger, 'max-width': maxWidth } = args;
    const headingTexts = [
      'El producto está vinculado a un préstamo',
      'Valoramos la posición de la inversión en los fondos multiplicando el número de participaciones que tenemos en cada fondo por el último valor liquidativo conocido',
    ];
    const widths = ['Width = 0', 'Width > 0'];
    const html = `
      <div class="story__item center-item">
        <div class="story__item__label">${widths[0]}</div>
        <ath-tooltip heading-text = "${headingTexts[0]}" position="${position}"  has-arrow="${hasArrow}" color = "${color}" trigger = "${trigger}" max-width="0">
           ${args.defaultSlot}
        </ath-tooltip>
      </div>
      <div class="story__item center-item">
        <div class="story__item__label">${widths[1]}</div>
        <ath-tooltip heading-text = "${headingTexts[1]}" position="${position}"  has-arrow="${hasArrow}" color = "${color}" trigger = "${trigger}" max-width=${maxWidth}>
           ${args.defaultSlot}
        </ath-tooltip>
      </div>
      `;
    return html;
  },
  args: {
    ...defaultArgs,
    'max-width': 200,
    'heading-text': 'This is a tooltip. This is a tooltip.',
  },
  parameters: {
    controls: { include: ['position', 'has-arrow', 'color', 'trigger', 'max-width'] },
    storyClass: 'grid grid-cols-2 h250',
  },
};

export const IconTrigger: Story = {
  render: args => {
    const { 'heading-text': athHeadingText, 'has-arrow': hasArrow, position, color, 'max-width': maxWidth, trigger } = args;
    const { icon, size } = PlaygroundTrigger.args;
    const html = `
      <div class="story__item center-item">
        <ath-tooltip heading-text="${athHeadingText}" position="${position}" has-arrow="${hasArrow}" color="${color}" max-width="${maxWidth}" trigger="${trigger}">
          <ath-tooltip-trigger icon="${icon}" size="${size}" />
        </ath-tooltip>
      </div>
    `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: { include: ['heading-text', 'position', 'has-arrow', 'color', 'max-width'] },
    docs: {
      description: {
        story:
          'El componente ath-tooltip puede contener el componente ath-tooltip-trigger para mostrar un icono que active el tooltip. Es la opción más recomendada para cumplir con los requisitos de accesibilidad si se opta por este elemento. Para más ejemplos y detalles, ver [Tooltip Trigger](/docs/components-tooltip-tooltip-trigger--docs).',
      },
    },
  },
};
