import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { TooltipTriggerArgs } from './tooltip.types';

const defaultArgs = {
  icon: 'info',
  size: 'lg',
};

const tooltipAttributes = getAttributesFromArgs({
  'heading-text': 'This is a tooltip',
  'position': 'right',
  'has-arrow': true,
  'color': 'primary',
  'trigger': 'hover',
  'max-width': 0,
});

const iconSizes = ['xs', 'sm', 'md', 'lg'];

const meta: Meta<TooltipTriggerArgs> = {
  title: 'Componentes/Tooltip/Tooltip Trigger',
  component: 'ath-tooltip-trigger',
  tags: ['autodocs'],
  argTypes: {
    'icon': {
      control: { type: 'select' },
      options: iconNamesList,
      description: 'Icono que se mostrará para desencadenar el tooltip ',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'info' },
      },
    },
    'size': {
      control: 'inline-radio',
      options: iconSizes,
      description: 'Tamaño del icono',
      table: {
        type: { summary: 'IconSizeTypes' },
        defaultValue: { summary: 'lg' },
      },
    },
    'aria-label': {
      control: 'text',
      description: 'Etiqueta que describe al icono para lectores de pantalla ',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Más información' },
        category: 'ACCESSIBILITY',
      },
    },
    'athClick': {
      action: 'athClick',
      description: 'Se emite cuando se hace clic en el icono',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athFocus': {
      action: 'athFocus',
      description: 'Se emite cuando el icono recibe el foco',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
    'athBlur': {
      action: 'athBlur',
      description: 'Se emite cuando el icono pierde el foco',
      table: {
        type: { summary: 'EventEmitter<void>' },
        category: 'EVENTS',
      },
    },
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    componentSubtitle: 'Utiliza este componente como slot del tooltip cuando necesites desencadenarlo desde un icono.',
    darkMode: {
      stylePreview: true,
    },
    backgrounds: { disable: true },
    actions: {
      handles: ['athClick', 'athFocus', 'athBlur'],
    },
  },
  decorators: [withActions],
};

export default meta;

type Story = StoryObj<TooltipTriggerArgs>;

export const Playground: Story = {
  render: args => {
    const attributes = getAttributesFromArgs({
      icon: args['icon'],
      size: args['size'],
    });

    const html = `
    <div class="story__item">
        <ath-tooltip ${tooltipAttributes}>
            <ath-tooltip-trigger ${attributes} aria-label="Más información"/>
        </ath-tooltip>
    </div>
    `;
    return html;
  },
  args: {
    ...defaultArgs,
  },
  tags: ['!autodocs'],
};

export const Size: Story = {
  render: args => {
    const attributes = getAttributesFromArgs({
      icon: args['icon'],
    });
    const sizes = ['xs', 'sm', 'md', 'lg'];
    return sizes
      .map(
        size => `
          <div class="story__item">
            <div class="story__item__label">Size: ${size}</div>
            <ath-tooltip ${tooltipAttributes}>
              <ath-tooltip-trigger ${attributes}  size="${size}" aria-label="Más información"></ath-tooltip-trigger>
            </ath-tooltip>
        </div>`,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['size'],
    },
  },
};
