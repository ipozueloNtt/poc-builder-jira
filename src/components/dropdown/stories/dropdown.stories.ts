import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { DropdownArgs } from './dropdown.types';
import { getAttributesFromArgs, orderObjectByAttributes } from '@utils/storybook';
import { dropdownSize } from '../dropdown.model';
import { withActions } from 'storybook/actions/decorator';
import { dropdownArgTypes } from './dropdown.argtypes';

const booleanArgs = ['disabled', 'multiselect', 'open', 'readonly', 'required', 'search', 'show-chips'];
const eventControls = ['athChange', 'athFocus', 'athBlur'];

const defaultDropdownArgs: DropdownArgs = orderObjectByAttributes({
  'announce-result-text': undefined,
  'dropdown-aria-label': 'dropdown',
  'name': undefined,
  'helper-text': undefined,
  'readonly': undefined,
  'disabled': undefined,
  'multiselect': undefined,
  'required': undefined,
  'hide-required': undefined,
  'feedback': undefined,
  'feedback-text': undefined,
  'label': undefined,
  'nochips-text': 'Seleccionadas',
  'noresult-text': 'sin resultado',
  'open': false,
  'placeholder': 'Selecciona una opción',
  'search': undefined,
  'search-placeholder': 'Buscar ',
  'search-aria-label': 'Buscar la opción deseada',
  'size': undefined,
  'show-chips': undefined,
  'tooltip-text': undefined,
  'tooltip-width': undefined,
  'width': '300px',
  'overlay-max-height': '236px',
  'value': undefined,
});

const defaultStoryControls = [
  'name',
  'tooltip-text',
  'helper-text',
  'readonly',
  'disabled',
  'multiselect',
  'show-chips',
  'required',
  'hide-required',
  'width',
  'overlay-max-height',
  'search',
  'search-placeholder',
  'feedback',
  'feedback-text',
  'size',
  'label',
];

const meta: Meta<DropdownArgs> = {
  title: 'Componentes/Dropdown/Dropdown',
  component: 'ath-dropdown',
  tags: ['autodocs'],
  argTypes: dropdownArgTypes,
  args: { ...defaultDropdownArgs },
  parameters: {
    controls: { sort: 'alpha' },
    actions: { handles: [...eventControls] },
    componentSubtitle: 'Permite seleccionar una o varias opciones dentro del listado proporcionado.',
  },
  decorators: [withActions],
};
export default meta;

type Story = StoryObj<DropdownArgs>;

const getHtmlDropdownOptions = (length = 5, grupo = false): string => {
  const items = Array.from({ length }, (_, i) => i + 1);
  const optionName = (grupo, index) => `${grupo ? 'Grupo' : ''} Opción ${index}`;
  return items
    .map(
      index => `<ath-dropdown-option text="${optionName(grupo, index)}" value="${optionName(grupo, index)}"></ath-dropdown-option>
          `,
    )
    .join('');
};

const getHtmlSelectGroupOptions = (length = 1): string => {
  const items = Array.from({ length }, (_, i) => i + 1);
  return items
    .map(
      index => `<ath-dropdown-option text="Grupo ${index}" option-group=true>
             ${getHtmlDropdownOptions(2, true)}
          </ath-dropdown-option>
      `,
    )
    .join('');
};

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });

    return `
      <div style="width: 100%">
        <ath-dropdown ${attributes}>
          ${getHtmlDropdownOptions()}
          ${getHtmlSelectGroupOptions()}
        </ath-dropdown>
      </div>
    `;
  },
  args: { ...defaultDropdownArgs },
  tags: ['!autodocs'],
  parameters: {
    controls: {
      exclude: ['defaultSlot'],
    },
    storyClass: 'flex-col w400 mt75',
  },
};

export const ConBusqueda: Story = {
  name: 'Con Búsqueda',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: [...eventControls, 'label'], boolean: booleanArgs });
    return `
        <div class="story__item" style="width:100%">
          <ath-dropdown label='search: ${args.search}' ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: {
    'search-placeholder': 'Buscar...',
    'search': true,
  },
  parameters: {
    controls: {
      include: ['search-placeholder', 'announce-result-text', 'search', 'noresult-text'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConFeedback: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown label='feedback: ${args.feedback}' ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: { ...defaultDropdownArgs, 'feedback': 'error', 'feedback-text': 'feedback text' },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['name', 'multiselect', 'show-chips', 'required', 'search', 'search-text', 'label'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConHelperText: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: { ...defaultDropdownArgs, 'helper-text': 'helper text', 'label': 'Con helper text' },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['name', 'multiselect', 'show-chips', 'required', 'width', 'overlay-max-height', 'search'],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConTooltip: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown label='Con Tooltip Text' ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: { ...defaultDropdownArgs, 'tooltip-text': 'tooltip text' },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['label', 'name', 'multiselect', 'show-chips', 'required', 'width', 'overlay-max-height', 'search', 'search-placeholder'],
    },
    storyClass: 'flex-col w400 mt75',
  },
};

export const Disabled: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
      <div class="story__item">
        <ath-dropdown label='disabled: ${args.disabled}' ${attributes}>
          ${getHtmlDropdownOptions()}
          ${getHtmlSelectGroupOptions()}
        </ath-dropdown>
      </div>
    `;
  },
  args: { ...defaultDropdownArgs, disabled: true },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: [
        'label',
        'size',
        'feedback',
        'feedback-text',
        'name',
        'tooltip-text',
        'readonly',
        'multiselect',
        'show-chips',
        'required',
        'width',
        'overlay-max-height',
        'search',
        'search-placeholder',
      ],
    },
    storyClass: 'flex-col w400',
  },
};

export const Multiselect: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown label='multiselect: ${args.multiselect}' ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: { ...defaultDropdownArgs, multiselect: true },
  parameters: {
    controls: {
      include: [...defaultStoryControls, 'announce-result-text'],
      exclude: ['label', 'name', 'tooltip-text', 'helper-text', 'readonly', 'disabled', 'required'],
    },
    storyClass: 'flex-col w400',
  },
};

export const Readonly: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown label='readonly: ${args.readonly}' ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>
        `;
  },
  args: { ...defaultDropdownArgs, readonly: true },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: [
        'label',
        'size',
        'feedback',
        'feedback-text',
        'name',
        'tooltip-text',
        'helper-text',
        'disabled',
        'multiselect',
        'show-chips',
        'required',
        'width',
        'overlay-max-height',
        'search',
        'search-placeholder',
      ],
    },
    storyClass: 'flex-col w400',
  },
};

export const ConChips: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown label='show-chips: ${args['show-chips']}' ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: { ...defaultDropdownArgs, 'multiselect': true, 'show-chips': true },
  parameters: {
    controls: {
      include: [...defaultStoryControls, 'announce-result-text'],
      exclude: [
        'label',
        'feedback',
        'feedback-text',
        'name',
        'tooltip-text',
        'helper-text',
        'readonly',
        'disabled',
        'required',
        'width',
        'overlay-max-height',
        'search-placeholder',
      ],
    },
    storyClass: 'flex-col w400',
  },
};

export const Size: Story = {
  render: (args): string => {
    const sizeValues = [dropdownSize.Sm, dropdownSize.Md, dropdownSize.Lg];
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return sizeValues
      .map(
        size => `
        <div class="story__item">
          <ath-dropdown label="size: ${size}" size="${size}" ${attributes}>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`,
      )
      .join('');
  },
  args: { ...defaultDropdownArgs },
  parameters: {
    controls: {
      include: [...defaultStoryControls],
      exclude: ['label', 'size', 'feedback', 'feedback-text', 'name', 'tooltip-text', 'helper-text', 'readonly', 'disabled', 'required', 'width', 'overlay-max-height'],
    },
    storyClass: 'flex-col w400',
  },
};

export const WidthYOverlayMaxHeight: Story = {
  name: 'Width y Overlay max height',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, { exclude: eventControls, boolean: booleanArgs });
    return `
        <div class="story__item">
          <ath-dropdown ${attributes} label='overlay-max-height: ${args['overlay-max-height']}, width: ${args.width}'>
            ${getHtmlDropdownOptions()}
            ${getHtmlSelectGroupOptions()}
          </ath-dropdown>
        </div>`;
  },
  args: { ...defaultDropdownArgs, 'overlay-max-height': '140px' },
  parameters: {
    controls: {
      include: [...defaultStoryControls, 'announce-result-text'],
      exclude: [
        'hide-required',
        'multiselect',
        'search',
        'show-chips',
        'size',
        'label',
        'feedback',
        'feedback-text',
        'name',
        'tooltip-text',
        'helper-text',
        'readonly',
        'disabled',
        'required',
        'search-placeholder',
      ],
    },
    storyClass: 'flex-col w400',
  },
};
