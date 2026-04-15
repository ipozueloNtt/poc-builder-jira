import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { ActionBarArgs, ordererArgs } from './action-bar.types';
import { actionBarArgTypes } from './action-bar.argtypes';
import { getAttributesFromArgs } from '@utils/storybook';
import { slotContent, slotContentButtons, slotContentNoButtons, slotContentWithDividers } from './defaultSlotContent';

const defaultArgs = {
  ...ordererArgs,
  defaultSlot: slotContent,
};

// Función para generar atributos de accesibilidad
const getAccessibilityAttributes = (args: ActionBarArgs) => ({
  'aria-describedby': args['aria-describedby'],
  'aria-label': args['aria-label'],
});

const meta: Meta<ActionBarArgs> = {
  title: 'Componentes/ActionBar',
  component: 'ath-action-bar',
  args: { ...defaultArgs },
  argTypes: actionBarArgTypes,
  parameters: {
    storyClass: 'flex-col w-full',
    componentSubtitle: 'Action-bar es un componente que agrupa un conjunto de acciones relacionadas en una disposición horizontal.',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<ActionBarArgs>;

export const Playground: Story = {
  render: (args): string => {
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['defaultSlot'],
    );

    return `
        <div class="story__item">
          <ath-action-bar ${attributes}>
              ${args.defaultSlot}
          </ath-action-bar>
        </div>`;
  },
  args: {
    ...defaultArgs,
    defaultSlot: slotContent,
  },
  tags: ['!autodocs'],
};

export const Alignment: Story = {
  render: (args): string => {
    const alignments = ['left', 'center', 'right', 'justify'];
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['defaultSlot'],
    );

    return alignments
      .map(
        alignment => `
          <div class="story__item">
            <div class="story__item__label">Alignment: ${alignment}</div>
            <ath-action-bar ${attributes} alignment="${alignment}">
                ${args.defaultSlot}
            </ath-action-bar>
          </div>
        `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    controls: {
      exclude: ['alignment'],
    },
  },
  tags: ['autodocs'],
};

export const Size: Story = {
  render: (args): string => {
    const sizes = ['sm', 'md', 'lg'];
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['defaultSlot'],
    );

    return sizes
      .map(
        size => `
          <div class="story__item">
            <div class="story__item__label">Size: ${size}</div>
            <ath-action-bar  ${attributes} size="${size}">
                ${args.defaultSlot}
            </ath-action-bar>
         </div>
        `,
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
  tags: ['autodocs'],
};

export const ConDividers: Story = {
  render: (args): string => {
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['defaultSlot'],
    );

    return `
        <div class="story__item">
          <ath-action-bar ${attributes}>
              ${args.defaultSlot}
          </ath-action-bar>
        </div>`;
  },
  args: {
    ...defaultArgs,
    defaultSlot: slotContentWithDividers,
  },
  tags: ['autodocs'],
};

export const ComponentesBoton: Story = {
  name: 'Integrando componentes tipo botón',
  render: (args): string => {
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['defaultSlot'],
    );

    return `
        <div class="story__item">
          <ath-action-bar ${attributes}>
              ${args.defaultSlot}
        </div>`;
  },
  args: {
    ...defaultArgs,
    defaultSlot: slotContentButtons,
  },
  tags: ['autodocs'],
};

export const OtrosComponentes: Story = {
  name: 'Otros componentes admitidos',
  render: (args): string => {
    const accessibilityAttrs = getAccessibilityAttributes(args);
    const attributes = getAttributesFromArgs(
      {
        ...args,
        ...accessibilityAttrs,
      },
      ['defaultSlot'],
    );

    return `
        <div class="story__item">
          <ath-action-bar ${attributes}>
              ${args.defaultSlot}
          </ath-action-bar>
        </div>`;
  },
  args: {
    ...defaultArgs,
    defaultSlot: slotContentNoButtons,
  },
  tags: ['autodocs'],
};
