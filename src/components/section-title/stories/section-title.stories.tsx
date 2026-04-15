import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList, pictogramNamesList } from '@utils/storybook';
import { withActions } from 'storybook/actions/decorator';
import { HeadingSize, SectionTitleColor, SectionTitleOption, SectionTitleOptionType } from '../section-title.model';

type SectionTitleArgs = {
  'color': string;
  'heading-text': string;
  'heading-level'?: number;
  'heading-size': string;
  'heading-overline'?: number;
  'collapsable'?: boolean;
  'collapse-target'?: string;
  'overline'?: string;
  'tooltip'?: string;
  'tooltip-label'?: string;
  'type'?: SectionTitleOptionType;
  'icon'?: string;
  'pictogram'?: string;
  'defaultSlot'?: string;
  'athToggleCollapse'?: (event: CustomEvent<string>) => void;
};

const defaultSectionTitleArgs: SectionTitleArgs = {
  'color': SectionTitleColor.Primary,
  'heading-text': 'Section Title',
  'heading-level': undefined,
  'heading-size': undefined,
  'heading-overline': undefined,
  'type': 'default',
  'pictogram': 'search',
  'icon': 'card',
};

const meta: Meta<SectionTitleArgs> = {
  title: 'Componentes/Section Title',
  component: 'ath-section-title',
  argTypes: {
    'type': {
      control: 'select',
      options: Object.values(SectionTitleOption),
      description: 'Define el tipo de decoración visual del título: icono, pictograma o línea decorativa',
      table: {
        type: { summary: `SectionTitleOptionType` },
        defaultValue: { summary: `default` },
      },
    },
    'icon': {
      control: { type: 'select', labels: { '': '--Sin icono--' } },
      options: ['', ...iconNamesList],
      description: 'Indica el nombre del icono a incluir en el Section-title si es de tipo icon, debe existir en la Galería de iconos',
      table: {
        type: { summary: 'string' },
      },
    },

    'pictogram': {
      control: { type: 'select', labels: { '': '--Sin pictograma--' } },
      options: ['', ...pictogramNamesList],
      description: 'Nombre del pictograma a mostrar cuando type es "pictogram"',
      table: {
        type: { summary: 'string' },
      },
    },
    'color': {
      control: 'select',
      options: Object.values(SectionTitleColor),
      description: 'Color asignado al elemento decorativo tipo default y al texto "overline"',
      table: {
        type: { summary: 'SectionTitleColors' },
        defaultValue: { summary: SectionTitleColor.Primary },
      },
    },
    'heading-text': {
      control: 'text',
      description: 'Título de la sección',
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-size': {
      control: 'inline-radio',
      options: Object.values(HeadingSize),
      description: 'Define el tamaño del título, valores disponibles `sm`, `md`, y `lg` ',
      table: {
        type: { summary: 'HeadingSize' },
        defaultValue: { summary: 'sm' },
      },
    },
    'heading-level': {
      control: { type: 'range', min: 0, max: 6, step: 1 },
      description:
        'Nivel del heading asignado al título. Los valores entre 1 y 6 corresponde a &lt;h1&gt; ... &lt;h6&gt;. Para el valor 0 se asigna una etiqueta &lt;p&gt;. El comportamiento es meramente semántico, no afectando al estilo visual',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: '4' },
      },
    },
    'overline': {
      control: 'text',
      description: 'Texto sobre el título, usualmente dedicado a categorizar el contenido',
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-overline': {
      control: { type: 'range', min: 0, max: 6, step: 1 },
      description:
        'Nivel del heading asignado al overline. Los valores entre 1 y 6 corresponde a &lt;h1&gt; ... &lt;h6&gt;. Para el valor 0 se asigna una etiqueta &lt;p&gt;. El comportamiento es meramente semántico, no afectando al estilo visual',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: '0' },
      },
    },
    'collapsable': {
      control: 'boolean',
      description: 'Activa la funcionalidad de colapsar/expandir el contenido de la sección, mostrando un icono de flecha para indicar el estado',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'collapse-target': {
      control: 'text',
      description: 'Identificador del componente ath-collapse del que se quiere controlar la visibilidad',
      table: {
        type: { summary: 'string' },
      },
    },
    'tooltip': {
      control: 'text',
      description: 'Texto del tooltip, si se quiere incluir',
      table: {
        type: { summary: 'string' },
      },
    },
    'tooltip-label': {
      control: 'text',
      description: 'Etiqueta de accesibilidad para el tooltip trigger',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
        defaultValue: { summary: 'Más información' },
      },
    },
    'defaultSlot': {
      control: 'text',
      name: 'default slot',
      description: 'Contenido adicional del título',
      table: { category: 'SLOTS', type: { summary: 'html' } },
    },
    'athToggleCollapse': {
      action: 'athToggleCollapse',
      description: 'Se emite cuando se hace clic en el botón de colapsar/expandir, indicando el identificador del componente ath-collapse asociado',
      table: {
        type: { summary: 'EventEmitter<string>' },
        category: 'EVENTS',
      },
    },
  },
  args: { ...defaultSectionTitleArgs },
  parameters: {
    componentSubtitle:
      'Identifica y organiza secciones dentro de una interfaz de usuario. Proporciona una estructura clara y jerárquica, permitiendo a los usuarios comprender fácilmente la organización del contenido.',
    actions: {
      handles: ['athToggleCollapse'],
    },
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<SectionTitleArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athToggleCollapse']);
    return `
      <div style="width: 100%"> 
        <ath-section-title ${attributes}>
          ${args.defaultSlot || ''}
        </ath-section-title>
      </div>
    `;
  },
  args: { ...defaultSectionTitleArgs },
  parameters: {
    controls: {
      exclude: ['defaultSlot'],
    },
  },
  tags: ['!autodocs'],
};

export const Type: Story = {
  render: (args): string => {
    const types = Object.values(SectionTitleOption);
    const attributes = getAttributesFromArgs(args, ['type', 'defaultSlot', 'pictogram-name', 'icon']);

    return types
      .map(type => {
        const extraAttrs = type === 'icon' ? `icon="${args.icon}"` : type === 'pictogram' ? `pictogram="${args['pictogram']}"` : '';

        return `
          <div class="story__item w400" style="margin-bottom: 20px;">
            <div class="story__item__label">Type: ${type}</div>
            <ath-section-title
              ${attributes}
              type="${type}"
              ${extraAttrs}>
              ${args.defaultSlot || ''}
            </ath-section-title>
          </div>
        `;
      })
      .join('');
  },
  parameters: {
    controls: {
      exclude: ['type', 'athToggleCollapse', 'heading-level', 'heading-size', 'heading-overline', 'tooltip-label', 'collapse-target'],
    },
  },
};
export const HeadingSizes: Story = {
  render: (args): string => {
    const sizes = Object.values(HeadingSize);
    const attributes = getAttributesFromArgs(args, ['size', 'heading-level', 'heading-overline', 'tooltip-label', 'defaultSlot']);

    return sizes
      .map(
        size => `
          <div class="story__item w400" style="margin-bottom: 20px;">
            <div class="story__item__label">Heading-size: ${size}</div>
            <ath-section-title ${attributes} heading-size="${size}">
              ${args.defaultSlot || ''}
            </ath-section-title>
          </div>
        `,
      )
      .join('');
  },
  parameters: {
    controls: {
      exclude: ['type', 'color', 'type', 'icon', 'pictogram', 'athToggleCollapse', 'heading-level', 'heading-size', 'heading-overline', 'tooltip-label', 'collapse-target'],
    },
  },
};

export const Colors: Story = {
  render: (args): string => {
    const colors = Object.values(SectionTitleColor);
    const attributes = getAttributesFromArgs(args, ['color', 'heading-level', 'heading-overline', 'tooltip-label', 'defaultSlot']);

    return colors
      .map(
        color => `
          <div class="story__item w400" style="margin-bottom: 20px;">
            <div class="story__item__label">Color: ${color}</div>
            <ath-section-title ${attributes} color="${color}">
              ${args.defaultSlot || ''}
            </ath-section-title>
          </div>
        `,
      )
      .join('');
  },
  parameters: {
    controls: {
      exclude: ['color', 'type', 'icon', 'pictogram', 'athToggleCollapse', 'heading-level', 'heading-size', 'heading-overline', 'tooltip-label', 'collapse-target'],
    },
  },
};

export const Overline: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `
      <div class="story__item w400">
        <ath-section-title ${attributes}>
        </ath-section-title>
      </div>
    `;
  },
  args: { ...defaultSectionTitleArgs, overline: 'Contenido del overline' },
  parameters: {
    controls: {
      exclude: ['collapsable', 'color', 'athToggleCollapse', 'heading-level', 'heading-size', 'heading-overline', 'tooltip-label', 'collapse-target', 'tooltip'],
    },
  },
};

export const Tooltip: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args);
    return `
      <div class="story__item w400">
        <ath-section-title ${attributes}>
        </ath-section-title>
      </div>
    `;
  },
  args: { ...defaultSectionTitleArgs, tooltip: 'Contenido del tooltip' },
  parameters: {
    controls: {
      exclude: ['color', 'athToggleCollapse', 'heading-level', 'heading-size', 'heading-overline', 'tooltip-label', 'collapse-target'],
    },
  },
};

export const Collapsable: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['color', 'heading-level', 'heading-overline', 'tooltip-label']);
    const collapsables = [false, true];

    return collapsables
      .map(
        (collapse, index) => `
          <div class="story__item w400">
            <div class="story__item__label">Show: ${collapse}</div>
            <ath-section-title ${attributes} collapsable collapse-target="collapsable-${index}"> ${args.defaultSlot || ''}
            </ath-section-title>
            <ath-collapse class="ath-body--md" id="collapsable-${index}" ${collapse ? 'show' : ''} style="padding: 20px 0">
              <p>Este es un contenido colapsado por defecto.</p>
            </ath-collapse>
          </div>
        `,
      )
      .join('');
  },
  parameters: {
    docs: {
      description: {
        story:
          'El componente section-title puede controlar un componente ath-collapse asociado mediante el atributo collapse-target. Para más ejemplos y detalles sobre el componente ath-collapse, ver [Collapse](/docs/componentes-collapse--docs).',
      },
    },
    controls: {
      exclude: ['color', 'athToggleCollapse', 'heading-level', 'heading-size', 'heading-overline', 'tooltip-label', 'collapse-target'],
    },
  },
};
