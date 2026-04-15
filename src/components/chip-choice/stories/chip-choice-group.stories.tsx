import { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { withActions } from 'storybook/actions/decorator';
import { ChipDismissSize } from 'components/chip-dismiss/chip-dismiss.model';
import { ChipChoiceGroupArgs } from './chip-choice-group.types';
import { ChipChoiceSize } from '../chip-choice.model';

const booleanArgs = ['disabled', 'multiple'];

const defaultArgs: ChipChoiceGroupArgs = {
  'disabled': undefined,
  'name': 'test',
  'multiple': false,
  'size': undefined,
  'width': undefined,
  'aria-label': undefined,
  'aria-labelledby': undefined,
};

const generateChips = count => {
  return Array.from({ length: count }, (_, i) => `      <ath-chip-choice label="Chip ${i + 1}" icon="placeholder"></ath-chip-choice>`).join('\n');
};

const meta: Meta<ChipChoiceGroupArgs> = {
  title: 'Componentes/Chip Choice/Chip Choice Group',
  component: 'ath-chip-choice-group',
  tags: ['autodocs'],
  argTypes: {
    'disabled': {
      control: { type: 'boolean' },
      description: 'Deshabilita todos los chips del grupo, impidiendo la interacción del usuario. Cuando está activo, las chips no responderán a eventos de click o teclado.',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'multiple': {
      control: { type: 'boolean' },
      description: 'Indica si se permite selección múltiple de chips',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'name': {
      control: { type: 'text' },
      description:
        'Nombre del grupo para asociar las chips en formularios. Todas las chips del grupo compartirán este nombre, permitiendo el comportamiento de radio button cuando multiple=false.',
      table: {
        type: { summary: 'string' },
      },
    },
    'size': {
      control: { type: 'inline-radio' },
      description: 'Indica el tamaño por defecto de las chips',
      options: ['sm', 'md'],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: ChipChoiceSize.Medium },
      },
    },
    'width': {
      control: { type: 'text' },
      description:
        'Define el ancho del componente usando cualquier valor CSS válido (px, %, em, rem, etc.). ' +
        'Si no se especifica, el componente se ajustará automáticamente al ancho de su contenedor padre. ' +
        'Ejemplos: "300px", "50%", "20rem".',
      table: {
        type: { summary: 'string' },
      },
    },
    // ACCESIBILIDAD
    'aria-label': {
      control: { type: 'text' },
      description: 'Proporciona una etiqueta accesible al grupo',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    'aria-labelledby': {
      control: { type: 'text' },
      description: 'Proporciona la referencia al elemento que aportará la etiqueta accesible',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    // Events
    'athChangeValue': {
      action: 'athChangeValue',
      description: 'Emite un array con los elementos chip-choice seleccionados, cada vez que cambia un chip',
      table: {
        type: { summary: 'EventEmitter<HTMLAthChipChoiceElement[]>' },
        category: 'EVENTS',
      },
    },
  },
  args: { ...defaultArgs },
  decorators: [withActions],
  parameters: {
    actions: { handles: ['athChangeValue'] },
    controls: { expanded: true, sort: 'alpha' },
    componentSubtitle: 'Componente contenedor para agrupaciones de componentes ath-chip-choice',
  },
};
export default meta;

type Story = StoryObj<ChipChoiceGroupArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: booleanArgs });
    return `
  <div class="story__item">
    <ath-chip-choice-group ${attributes}>
${generateChips(5)}
    </ath-chip-choice-group>
  </div>`;
  },
  args: { ...defaultArgs },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col w600',
  },
};

export const Multiple: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: booleanArgs });

    return `
  <div class="story__item">
    <div class="story__item__label">multiple: true</div>
    <ath-chip-choice-group ${attributes}>
${generateChips(5)}
    </ath-chip-choice-group>
  </div>`;
  },
  args: { ...defaultArgs, multiple: true },
  parameters: {
    controls: {
      include: ['size', 'width'],
      exclude: ['multiple', 'name', 'athChangeValue'],
    },
    storyClass: 'flex-col w600',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: booleanArgs });

    return `
  <div class="story__item">
    <div class="story__item__label">disabled: ${args['disabled']}</div>
    <ath-chip-choice-group ${attributes} disabled>
${generateChips(5)}
    </ath-chip-choice-group>
  </div>`;
  },
  args: { ...defaultArgs, disabled: true },
  parameters: {
    controls: {
      exclude: ['disabled', 'aria-label', 'aria-labelledby', 'athChangeValue'],
    },
    storyClass: 'flex-col w600',
  },
};

export const Sizes: Story = {
  render: (args): string => {
    const sizes = [ChipDismissSize.Small, ChipDismissSize.Medium];
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: booleanArgs });

    return sizes
      .map(
        size => `
  <div class="story__item">
    <div class="story__item__label">size: ${size}</div>
    <ath-chip-choice-group ${attributes} size="${size}">
${generateChips(5)}
    </ath-chip-choice-group>
  </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['size', 'athChangeValue'],
    },
    storyClass: 'flex-col w600',
  },
};

export const Width: Story = {
  render: (args): string => {
    const widths = ['200px', '100%'];
    const attributes = getAttributesFromArgs(args, { exclude: ['athChangeValue'], boolean: booleanArgs });

    return widths
      .map(
        width => `
  <div class="story__item">
    <div class="story__item__label">width: ${width}</div>
    <ath-chip-choice-group ${attributes} width="${width}">
${generateChips(5)}
    </ath-chip-choice-group>
  </div>`,
      )
      .join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['width', 'athChangeValue'],
    },
    storyClass: 'flex-col w600',
  },
};

export const Accesibilidad: Story = {
  render: (args): string => {
    const multipleAttr = args.multiple ? 'multiple' : '';

    return `
  <div class="story__item">
    <div id="range" class="ath-body--md ath-spacing-mb--xs">Selecciona un periodo:</div>
    <form action="#">
      <ath-chip-choice-group ${multipleAttr} aria-labelledby="range" size="md">
        <ath-chip-choice icon="calendar" selected label="Hoy"></ath-chip-choice>
        <ath-chip-choice icon="calendar" label="Esta semana"></ath-chip-choice>
        <ath-chip-choice icon="calendar" label="Este mes"></ath-chip-choice>
        <ath-chip-choice icon="calendar" label="Este año"></ath-chip-choice>
      </ath-chip-choice-group>
    </form>
  </div>`;
  },
  args: { ...defaultArgs, multiple: false },
  parameters: {
    controls: {
      include: ['multiple'],
    },
    storyClass: 'flex-col w600',
    docs: {
      description: {
        story: 'Puedes agrupar chips dentro de un formulario y con una etiqueta accesible asociada a un texto existente.',
      },
    },
  },
};
