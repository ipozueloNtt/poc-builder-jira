import { withActions } from 'storybook/actions/decorator';
import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs, iconNamesList } from '@utils/storybook';
import { StepperArgs, orderedArgs } from './stepper.types';
import { StepRole } from '../step/step-model';

const defaultArgs: StepperArgs = {
  ...orderedArgs,
};

const meta: Meta<StepperArgs> = {
  title: 'Componentes/Stepper/Stepper',
  component: 'ath-stepper',
  parameters: {
    actions: { handles: ['athSelect'] },
    componentSubtitle: 'El componente stepper muestra el progreso de un proceso o experiencia mediante pasos numerados',
  },
  tags: ['autodocs'],
  argTypes: {
    'clickable': {
      control: 'boolean',
      description: 'Indica si el stepper es interactivo. Su valor se inyecta a la propiedad clickable de los step',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    'heading-icon': {
      control: { type: 'select', labels: { '': '--Sin icono--' } },
      options: ['', ...iconNamesList],
      description: 'Indica el icono que acompaña al título del stepper (si es que se desea icono). Solo se mostrará si el heading-text está definido.',
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-text': {
      control: 'text',
      description: 'Indica el texto del título del stepper (opcional)',
      table: {
        type: { summary: 'string' },
      },
    },
    'orientation': {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
      description: 'Establece la disposición de los items del stepper. Si es horizontal, los steps se muestran en una fila, si es vertical, se muestran en una columna',
      table: { type: { summary: 'stepperOrientationType' }, defaultValue: { summary: 'horizontal' } },
    },
    'readonly': {
      control: 'boolean',
      description: 'Indica todos los pasos del stepper son del tipo readonly. Inyecta su valor a la propiedad readonly de los step',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'size': {
      control: 'inline-radio',
      options: ['sm', 'md'],
      description: 'Indica el tamaño de los steps. Inyecta su valor a la propiedad size de los step',
      table: {
        type: { summary: 'stepperSizeType' },
        defaultValue: { summary: 'md' },
      },
    },
    'start-from': {
      control: 'number',
      description: 'Indica el número del primer identificador, a partir del cual se generan el resto',
      table: {
        type: { summary: 'number' },
        defaultValue: { summary: '1' },
      },
    },
    // ACCESSIBILITY
    'collapse-label': {
      control: { type: 'text' },
      description: 'Define el texto accesible del chevron cuando su función es colapsar',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Colapsar paso [number]' },
        category: 'ACCESSIBILITY',
      },
    },
    'completed-label': {
      control: { type: 'text' },
      description: 'Define el texto accesible del estado completado',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Completado' },
        category: 'ACCESSIBILITY',
      },
    },
    'ath-aria-label': {
      control: { type: 'text' },
      description:
        'Define el texto accesible del step, útil cuando el stepper es interactivo. Permite el uso de las variables siguientes: [number], [total], [heading-text], [action-text] y [state-label]. Ej: Paso [number] de [total], [heading-text], selecciona para [action-text], [state-label]',
      table: {
        type: { summary: 'string' },
        category: 'ACCESSIBILITY',
      },
    },
    'aria-live-message': {
      control: { type: 'text' },
      description:
        'Mensaje accesible anunciado cuando se cambie el paso seleccionado. Sólo aplicable cuando clickable es false. Permite el uso de las variables siguientes: [number], [total], [heading-text] y [state-label]. Ej: Paso [number] de [total], [heading-text], [state-label]',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Paso actual [number]' },
        category: 'ACCESSIBILITY',
      },
    },
    'ath-role': {
      control: { type: 'select' },
      description: 'Indica si el step es un boton o un enlace',
      options: [StepRole.Button, StepRole.Link],
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: StepRole.Button },
        category: 'ACCESSIBILITY',
      },
    },
    'error-label': {
      control: { type: 'text' },
      description: 'Define el texto accesible del estado error',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Error' },
        category: 'ACCESSIBILITY',
      },
    },
    'expand-label': {
      control: { type: 'text' },
      description: 'Define el texto accesible del estado chevron cuando su función es expandir ',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'Expandir paso [number]' },
        category: 'ACCESSIBILITY',
      },
    },
    // EVENTS
    'athSelect': {
      action: 'athSelect',
      description: 'El componente ath-stepper emite el evento athStepper cuando un step es seleccionado con ratón o teclado',
      table: {
        type: { summary: 'EventEmitter<HTMLAthStepElement>' },
        category: 'EVENTS',
      },
    },
  },
  decorators: [withActions],
  args: { ...defaultArgs },
};

export default meta;

type Story = StoryObj<StepperArgs>;

const generateSteps = (copies = 5) => {
  let items =
    '  <ath-step heading-text="Heading text" action-text="Editar" is-collapsable selected><span class="ath-body--sm ath-color-text--default">Contenido del slot</span></ath-step>\n';
  for (let i = 1; i <= copies; i++) {
    items += `          <ath-step heading-text="Heading text" action-text="Editar" is-collapsable><span class="ath-body--sm ath-color-text--default">Contenido del slot</span></ath-step>\n`;
  }
  return items;
};

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return `
      <div class="story__item">
        <ath-stepper ${attributes}>
        ${generateSteps()}
        </ath-stepper>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'heading-icon': 'loan',
    'heading-text': 'HEADING TEXT',
  },
  tags: ['!autodocs'],
  parameters: {
    storyClass: 'flex-col',
  },
};

export const Clickable: Story = {
  name: 'Clickable false',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return `
      <div class="story__item">
        <ath-stepper ${attributes}>
         ${generateSteps()}
        </ath-stepper>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    clickable: false,
  },
  parameters: {
    storyClass: 'flex-col',
    controls: {
      exclude: ['clickable'],
    },
  },
};

export const Size: Story = {
  render: (args): string => {
    const sizes = ['sm', 'md'];
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return sizes
      .map(
        size => `
        <div> 
            <div class="story__item">
            <div class="story__item__label">size: ${size}</div>
            <ath-stepper ${attributes} size="${size}">
                ${generateSteps()}
                </ath-stepper>
            </div>
      </div>
      `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
  },
  parameters: {
    storyClass: 'flex-col',
    controls: {
      exclude: ['size'],
    },
  },
};

export const StartFrom: Story = {
  name: 'Start from 3',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return `
      <div class="story__item">
        <ath-stepper ${attributes}>
          ${generateSteps()}
        </ath-stepper>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    'readonly': true,
    'start-from': 3,
  },
  parameters: {
    storyClass: 'flex-col',
  },
};

export const ConTituloEIcono: Story = {
  name: 'Con título e icono',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return `
        <div> 
            <div class="story__item">
            <ath-stepper ${attributes}>
                ${generateSteps()}
                </ath-stepper>
            </div>
      </div>
      `;
  },
  args: {
    ...defaultArgs,
    'heading-icon': 'loan',
    'heading-text': 'HEADING TEXT',
  },
  parameters: {
    storyClass: 'flex-col',
    controls: {
      exclude: ['size'],
    },
  },
};

export const Vertical: Story = {
  name: 'Orientación vertical',
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return `
      <div class="story__item">
        <ath-stepper ${attributes}>
          ${generateSteps()}
        </ath-stepper>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    orientation: 'vertical',
  },
  parameters: {
    storyClass: 'flex-col h500',
    controls: { exclude: ['orientation'] },
  },
};

export const Readonly: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athSelect']);

    return `
      <div class="story__item">
        <ath-stepper ${attributes}>
          ${generateSteps()}
        </ath-stepper>
      </div>
    `;
  },
  args: {
    ...defaultArgs,
    readonly: true,
  },
  parameters: {
    storyClass: 'flex-col',
  },
};
