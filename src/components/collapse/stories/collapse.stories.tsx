import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { withActions } from 'storybook/actions/decorator';
import { getAttributesFromArgs } from '@utils/storybook';

type CollapseArgs = {
  show: boolean;
  defaultSlot: string;
  athCollapseState: (event: CustomEvent<{ id: string; isExpanded: boolean }>) => void;
  athToggleCollapse: (event: CustomEvent<string>) => void;
};

const defaultCollapseArgs: CollapseArgs = {
  show: false,
  defaultSlot: '<p class="ath-body--md">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>',
  athCollapseState: () => {},
  athToggleCollapse: () => {},
};

const meta: Meta<CollapseArgs> = {
  title: 'Componentes/Collapse',
  component: 'ath-collapse',
  argTypes: {
    show: {
      control: 'boolean',
      description: 'Indica si el componente está expandido por defecto',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    defaultSlot: {
      control: 'text',
      name: 'slot por defecto',
      description: 'Contenido del componente a colapsar',
      table: {
        category: 'SLOTS',
        type: { summary: 'html' },
      },
    },
    athCollapseState: {
      action: 'athCollapseState',
      description: 'Evento que se emite cuando el componente se expande o colapsa. El `detail` contiene el id del componente y su estado.',
      table: {
        category: 'EVENTS',
        type: { summary: 'Event', detail: 'CustomEvent<{ id: string; isExpanded: boolean }>' },
      },
    },
    athToggleCollapse: {
      action: 'athToggleCollapse',
      description:
        'Evento para expandir o colapsar el componente. El `detail` debe ser el id del componente `ath-collapse` a controlar. ' +
        'En este ejemplo, está siendo lanzado por el componente `ath-section-title`.',
      table: {
        category: 'EVENTS',
        type: { summary: 'Event', detail: 'CustomEvent<string>' },
      },
    },
  },
  args: { ...defaultCollapseArgs },
  parameters: {
    componentSubtitle:
      'Permite mostrar u ocultar contenido de forma dinámica. Se puede controlar mediante otro componente como el ath-section-title, pero también se puede controlar manualmente lanzando un evento athToggleCollapse.',
    actions: {
      handles: ['athCollapseState', 'athToggleCollapse'],
    },
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<CollapseArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'athCollapseState', 'athToggleCollapse']);

    return `
      <div class="story__item" style="width: 100%; padding: 0;">
        <ath-section-title 
          heading-text="Section Title" 
          collapsable
          collapse-target="collapse-example">
        </ath-section-title>
        <ath-collapse ${attributes} id="collapse-example">
          ${args.defaultSlot}
        </ath-collapse>
      </div>
    `;
  },
  args: { ...defaultCollapseArgs },
  tags: ['!autodocs'],
};

export const Show: Story = {
  render: (args): string => {
    const showList = [false, true];
    return showList
      .map(
        (show, index) => `
          <div class="story__item w400">
            <div class="story__item__label">show: ${show}</div>
            <ath-section-title   
              heading-text="Section Title"       
              collapsable
              collapse-target="collapsable-${index}">
            </ath-section-title>
            <ath-collapse id="collapsable-${index}"${show ? ' show' : ''}>
              ${args.defaultSlot || `<p class="ath-body--md">Este es un contenido ${show ? 'expandido' : 'colapsado'} por defecto.</p>`}
            </ath-collapse>
          </div>
        `,
      )
      .join('');
  },
  args: { ...defaultCollapseArgs, defaultSlot: undefined },
  parameters: {
    controls: {
      exclude: ['show', 'athCollapseState'],
    },
  },
};
