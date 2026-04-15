import type { Meta, StoryObj } from '@storybook/web-components-vite';

import { getAttributesFromArgs } from '@utils/storybook';
import { AlertArgs } from './alert.types';
import { AlertColor, AlertType } from '../alert.model';

const defaultArgs = {
  'color': 'info',
  'description': 'Descripción del mensaje',
  'has-close': true,
  'heading-text': 'Título del mensaje',
  'defaultSlot': 'Contenido adicional',
  'slotButton': '<ath-button slot="button">Botón</ath-button>',
  'type': 'section',
};

let timer: ReturnType<typeof setInterval>;
const clearTimer = () => {
  if (timer) {
    clearInterval(timer);
  }
};

const meta: Meta<AlertArgs> = {
  title: 'Componentes/Alert',
  component: 'ath-alert',
  tags: ['autodocs'],
  argTypes: {
    'heading-text': {
      control: 'text',
      description: 'Titulo del alert',
      table: {
        type: { summary: 'string' },
      },
    },
    'heading-level': {
      control: 'number',
      description:
        'Define el nivel de heading asignado al título del alerta. Los valores entre 1 y 6 corresponde a &lt;h1&gt; ... &lt;h6&gt;. Para el valor 0 se asigna una etiqueta &lt;p&gt;.',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'number' },
        defaultValue: { summary: '6' },
      },
    },
    'description': {
      control: 'text',
      description: 'Descripción del alert',
      table: {
        type: { summary: 'string' },
      },
    },
    'color': {
      control: 'select',
      options: ['warning', 'info', 'success', 'danger'],
      description: 'Indica el color del alert',
      table: {
        type: { summary: 'AlertColors' },
        defaultValue: { summary: AlertColor.Info },
      },
    },
    'type': {
      control: 'select',
      options: ['page', 'section'],
      description: 'Indica el tipo de alert',
      table: {
        type: { summary: 'AlertType' },
        defaultValue: { summary: AlertType.Section },
      },
    },
    'has-close': {
      control: 'boolean',
      description: 'Indica si se muestra un botón cerrar',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'true' },
      },
    },
    'close-aria-label': {
      control: 'text',
      description: 'Etiqueta de accesibilidad para el botón de cerrar',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'string' },
        defaultValue: { summary: 'Cerrar alerta' },
      },
    },
    'is-urgent': {
      control: 'boolean',
      description: 'Por defecto, la alerta tiene un role=status. Si el mensaje se considera urgente (is-urgent), se cambia a role=alert',
      table: {
        category: 'ACCESSIBILITY',
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    'defaultSlot': {
      name: 'default slot',
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
      description: 'Slot para el contenido del alert',
    },
    'slotButton': {
      name: 'button',
      control: 'text',
      table: { category: 'SLOTS', type: { summary: 'HTML' } },
      description: 'Slot para ath-button',
    },
  },
  args: { ...defaultArgs },
  parameters: {
    controls: { sort: 'alpha' },
    componentSubtitle:
      'Se recomienda utilizar para presentar contenido relevante para el usuario. En cuestiones de accesibilidad, si este elemento se actualiza durante el flujo de navegación del usuario, entonces, será leído por los lectores de pantalla, ya sea añadiendo la información a la cola de lectura o de manera inmediata.  ',
  },
};
export default meta;

type Story = StoryObj<AlertArgs>;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['slotButton', 'defaultSlot']);
    clearTimer();

    return `
    <ath-alert ${attributes}>
      ${args.defaultSlot}
      ${args.slotButton}
    </ath-alert>
    `;
  },
  args: { ...defaultArgs },
  parameters: {
    storyClass: 'flex-col w600',
  },
  tags: ['!autodocs'],
};

export const Color: Story = {
  render: args => {
    const colors = ['warning', 'danger', 'success', 'info'];
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'slotButton', 'color']);
    clearTimer();

    const html = colors.map(
      color => `
          <div class="story__item w250">
            <div class="story__item__label">Color: ${color}</div>
            <ath-alert color="${color}" ${attributes}>
              ${args.defaultSlot}
              ${args.slotButton}</ath-alert>
          </div>
      `,
    );
    return html.join('');
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['color'],
    },
  },
};

export const ContainerSize440: Story = {
  name: 'Container-size < 440px',
  render: args => {
    const attributes = getAttributesFromArgs(args, ['slotButton', 'defaultSlot']);
    clearTimer();

    return `
    <div class="story__item w400">
      <div class="story__item__label"><b>Alert type ${args.type}</b> en contenedor de tamaño < 440px </div>
      <ath-alert ${attributes}>
        ${args.defaultSlot}
        ${args.slotButton}
      </ath-alert>
    </div>
    `;
  },
  args: { ...defaultArgs },
};

export const TypeSection: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'slotButton', 'type']);
    clearTimer();

    const styles = ['', 'width: 400px'];
    const html = `
        ${styles
          .map(
            style => `
                <div class="story__item" style="${style}">
                  <div class="story__item__label">Alert type section, en contenedor de tamaño ${style.length > 0 ? '<' : '>'} 440px</div>
                  <ath-alert type="section" ${attributes}>
                    ${args.defaultSlot ?? undefined}
                    ${args.slotButton ?? undefined}
                  </ath-alert>
                </div>
        `,
          )
          .join('')}
    `;
    return html;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['type'],
    },
    storyClass: 'flex-col w600',
  },
};

export const TypePage: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['slotButton', 'type', 'defaultSlot']);
    clearTimer();

    const styles = ['', 'width: 400px'];
    const html = `
        ${styles
          .map(
            style => `
                <div class="story__item" style="${style}">
                  <div class="story__item__label">Alert type page, en contenedor de tamaño ${style.length > 0 ? '<' : '>'} 440px</div>
                  <ath-alert type="page" ${attributes}>
                    ${args.defaultSlot}
                    ${args.slotButton}
                  </ath-alert>
                </div>
             `,
          )
          .join('')}
    `;
    return html;
  },
  args: { ...defaultArgs },
  parameters: {
    controls: {
      exclude: ['type'],
    },
    storyClass: 'flex-col w600',
  },
};

export const OnlySlot: Story = {
  render: args => {
    const attributes = getAttributesFromArgs(args, ['defaultSlot', 'slotButton', 'label', 'description']);
    clearTimer();

    timer = setInterval(() => {
      const counter = document.querySelector('#counter');
      if (counter) {
        counter.textContent = getCurrentTime();
      }
    }, 1000);

    return `
      <div class="story__item">
        <div class="story__item__label">Alert type page, en contenedor con tamaño > 440px</div>
        <ath-alert type="page" ${attributes}>
          ${args.defaultSlot}
        </ath-alert>
      </div>
    `;
  },
  args: { ...defaultArgs, defaultSlot: '<span class="ath-text--bold" id="counter"></span> Indica el motivo del contador' },
  parameters: {
    controls: {
      exclude: ['label', 'description', 'slot button'],
    },
    storyClass: 'flex-col w600',
  },
};

function getCurrentTime(): string {
  const date = new Date();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');

  return hour + ':' + minutes + ':' + seconds;
}
