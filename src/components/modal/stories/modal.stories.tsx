import type { Meta, StoryObj } from '@storybook/web-components-vite';
import { getAttributesFromArgs } from '@utils/storybook';
import { ModalArgs, orderedArgs } from './modal.types';
import { withActions } from 'storybook/actions/decorator';
import { modalArgTypes } from './modal.argtypes';
import { shortText, longText, mediumText } from './slotSampleContent';
import { ModalAppearance } from '../modal.model';

const defaultArgs = {
  ...orderedArgs,
};

const controlsEvents = ['athOpened', 'athClosed'];

const meta: Meta<ModalArgs> = {
  title: 'Componentes/Modal',
  component: 'ath-modal',
  parameters: {
    componentSubtitle: 'Ventana emergente que aparece sobre el contenido principal para captar la atención del usuario y requerir una acción antes de continuar.',
    actions: { handles: controlsEvents },
  },
  argTypes: modalArgTypes,
  args: { ...defaultArgs },
  decorators: [
    withActions,
    storyFn => {
      const html = storyFn();

      return `
      ${html}   
        <script>
        // Permite ejecutar la acción a través del teclado
          (function () {
            document.addEventListener('athClick', function(event) {
              const target = event.target;
              if (target && typeof target.click === 'function') {
                target.click();
              }
            });
          })();
        </script>
      `;
    },
  ],
};

export default meta;

type Story = StoryObj<ModalArgs>;

const bodySlotDiv = args => `<div slot="body">
            ${args.defaultBodySlot}
         </div>`;
const footerSlotDiv = args => `<div slot="footer">
        ${args.defaultFooterSlot}
      </div>`;

export const Playground: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
    <div class="story__item">
      <ath-button onClick="document.getElementById('playground-modal').openModal()">Abrir modal</ath-button>
    
      <ath-modal ${attributes} id="playground-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${args.defaultFooterSlot ?? ''}        
      </ath-modal>
    </div>`;
  },
  args: {
    ...defaultArgs,
    'close-aria-label': 'Cerrar',
    'defaultBodySlot': shortText,
    'defaultFooterSlot': `<div slot="footer" style="display: flex; justify-content: center; gap: 8px">
            <ath-button onClick="document.getElementById('playground-modal').closeModal()" aria-label="aceptar">Aceptar</ath-button>
            <ath-button color="secondary" onClick="document.getElementById('playground-modal').closeModal()" aria-label="cancelar">Cancelar</ath-button>
        </div>`,
    'has-close': true,
    'has-divider': true,
    'heading-text': 'Título',
    'open': true,
    'subtitle-text': 'Subtítulo',
  },
  tags: ['!autodocs'],
  parameters: { storyClass: 'h500' },
};

export const AlertAppearance: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs({ ...args }, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);
    const appearances = Object.values(ModalAppearance);

    return appearances
      .map(
        (appearance, index) => `
       <div class="story__item">
        <div class="story__item__label">${index == 0 ? `is-alert: ${args['is-alert']}` : ''}<br>appearance: ${appearance}</div>
          <ath-button class="alert-button" onClick="document.getElementById('alert-${appearance}').openModal()">Abrir Modal</ath-button>
          <ath-modal ${attributes} id="alert-${appearance}" appearance="${appearance}" heading-text="Appearance: ${appearance}">
          ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
          ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
          </ath-modal>
      </div>
      `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
    'has-close': true,
    'is-alert': true,
    'max-width': '40%',
    'subtitle-text': 'Modal Subtitle',
  },
  parameters: {
    storyClass: 'h500 section',
    controls: {
      exclude: ['heading-text', 'appearance', 'is-alert', 'close-aria-label', 'athClosed', 'athOpened', 'closeModal', 'openModal', 'open'],
    },
  },
};

export const Size: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs({ ...args }, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    const sizes = ['sm', 'md'];

    return sizes
      .map(
        size => `
        <div class="story__item">
          <div class="story__item__label"><br>size: ${size}</div>
           <ath-button class="alert-button" onClick="document.getElementById('modal-${size}').openModal()">Abrir Modal</ath-button>
           <ath-modal id="modal-${size}" ${attributes} size="${size}" heading-text="Modal size ${size}">
              ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
              ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
            </ath-modal>
       </div>      
      `,
      )
      .join('');
  },
  args: {
    ...defaultArgs,
    'has-close': true,
    'defaultBodySlot': mediumText,
    'subtitle-text': 'Modal Subtitle',
  },
  parameters: {
    storyClass: 'h500 section',
    controls: {
      exclude: ['heading-text', 'size', 'is-alert', 'close-aria-label', 'athClosed', 'athOpened', 'closeModal', 'openModal', 'open', 'appearance'],
    },
  },
};

export const autofocus: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('autofocus-modal').openModal()">Abrir modal</ath-button>
      </div>
      <ath-modal ${attributes} id="autofocus-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
      </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'autofocus': true,
    'defaultBodySlot': mediumText,
    'heading-text': 'Título',
    'open': true,
    'has-close': true,
    'subtitle-text': 'Subtítulo',
    'defaultFooterSlot': `<div slot="footer" style="display: flex; justify-content: center; gap: 8px">
            <ath-button onClick="document.getElementById('autofocus-modal').closeModal()" aria-label="Cerrar">Cerrar</ath-button>
        </div>`,
  },
  parameters: {
    controls: {
      exclude: [
        'appearance',
        'click-outside-close',
        'close-aria-label',
        'full-screen',
        'has-divider',
        'heading-text',
        'is-alert',
        'max-height',
        'max-width',
        'size',
        'subtitle-text',
        'athClosed',
        'athOpened',
        'closeModal',
        'openModal',
      ],
    },
    storyClass: 'h500',
  },
  tags: ['!autodocs'],
};

export const ClickOutsideClose: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('click-outside-modal').openModal()">Abrir modal</ath-button>
      </div>
    <ath-modal ${attributes} id="click-outside-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
    </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'click-outside-close': true,
    'close-aria-label': 'Cerrar',
    'heading-text': 'Título',
    'max-width': '40%',
    'open': true,
    'subtitle-text': 'Subtítulo',
    'defaultFooterSlot': `<div slot="footer" style="display: flex; justify-content: center; gap: 8px">
            <ath-button onClick="document.getElementById('click-outside-modal').closeModal()" aria-label="aceptar">Aceptar</ath-button>
            <ath-button color="secondary" onClick="document.getElementById('click-outside-modal').closeModal()" aria-label="cancelar">Cancelar</ath-button>
        </div>`,
  },
  parameters: {
    controls: {
      exclude: ['click-outside-close', 'has-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open'],
    },
    storyClass: 'h500',
  },
};

export const FullScreen: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('fusllscreen-modal').openModal()">Abrir modal</ath-button>
      </div>
    <ath-modal ${attributes} id="fusllscreen-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
    </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'full-screen': true,
    'has-close': true,
    'heading-text': 'Título',
    'open': true,
    'subtitle-text': 'Subtítulo',
    'defaultFooterSlot': `<div slot="footer" style="display: flex; justify-content: center; gap: 8px">
            <ath-button onClick="document.getElementById('fusllscreen-modal').closeModal()" aria-label="aceptar">Aceptar</ath-button>
            <ath-button color="secondary" onClick="document.getElementById('fusllscreen-modal').closeModal()" aria-label="cancelar">Cancelar</ath-button>
        </div>`,
  },
  parameters: {
    controls: {
      exclude: ['click-outside-close', 'has-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open', 'max-height', 'max-width'],
    },
    storyClass: 'h500',
  },
};

export const HasClose: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('has-close-modal').openModal()">Abrir modal</ath-button>
      </div>
    <ath-modal ${attributes} id="has-close-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
    </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'close-aria-label': 'Cerrar',
    'has-close': true,
    'heading-text': 'Título',
    'max-width': '40%',
    'open': true,
    'subtitle-text': 'Subtítulo',
    'defaultFooterSlot': `<div slot="footer" style="display: flex; justify-content: center; gap: 8px">
            <ath-button onClick="document.getElementById('has-close-modal').closeModal()" aria-label="aceptar">Aceptar</ath-button>
            <ath-button color="secondary" onClick="document.getElementById('has-close-modal').closeModal()" aria-label="cancelar">Cancelar</ath-button>
        </div>`,
  },
  parameters: {
    controls: {
      exclude: ['has-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open', 'max-height', 'max-width'],
    },
    storyClass: 'h500',
  },
};

export const HasDivider: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('has-divider-modal').openModal()">Abrir modal</ath-button>
      </div>
    <ath-modal ${attributes} id="has-divider-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
    </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'defaultBodySlot': shortText,
    'has-close': true,
    'has-divider': true,
    'heading-text': 'Título',
    'max-width': '40%',
    'open': true,
    'subtitle-text': 'Subtítulo',
  },
  parameters: {
    controls: {
      exclude: ['click-outside-close', 'has-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open', 'max-height', 'max-width', 'autofocus'],
    },
    storyClass: 'h500',
  },
};

export const MaxWidth: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('modal-max-width').openModal()">Abrir modal</ath-button>
      </div>
    <ath-modal ${attributes} id="modal-max-width">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
    </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'defaultBodySlot': shortText,
    'has-close': true,
    'heading-text': 'Título',
    'max-width': '640px',
    'open': true,
    'subtitle-text': 'Subtítulo',
  },
  parameters: {
    controls: {
      exclude: ['click-outside-close', 'has-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open', 'autofocus', 'full-screen'],
    },
    storyClass: 'h500',
  },
};

export const MaxHeight: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('max-height-modal').openModal()">Abrir modal</ath-button>
      </div>
    <ath-modal ${attributes} id="max-height-modal">
        ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
        ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
    </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'defaultBodySlot': mediumText,
    'has-close': true,
    'heading-text': 'Título',
    'max-height': '500px',
    'open': true,
    'subtitle-text': 'Subtítulo',
  },
  parameters: {
    controls: {
      exclude: ['click-outside-close', 'has-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open', 'autofocus', 'full-screen'],
    },
    storyClass: 'h500',
  },
};

export const ScrollEnBody: Story = {
  render: (args): string => {
    const attributes = getAttributesFromArgs(args, ['athOpened', 'athClosed', 'defaultBodySlot', 'defaultFooterSlot']);

    window.addEventListener(
      'DOMContentLoaded',
      () => {
        const sentinel = document.createElement('div');
        sentinel.setAttribute('tabindex', '0');
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.style.position = 'absolute';
        sentinel.style.width = '0';
        sentinel.style.height = '0';
        sentinel.style.overflow = 'hidden';
        sentinel.id = 'focus-sentinel';
        document.body.prepend(sentinel);
        setTimeout(() => {
          sentinel.focus();
        }, 300);
      },
      { once: true },
    );

    return `
      <div class="story__item">
        <ath-button onClick="document.getElementById('scroll-modal').openModal()">Abrir modal</ath-button>
      </div>
      <ath-modal ${attributes} id="scroll-modal">
          ${!!args.defaultBodySlot ? bodySlotDiv(args) : ''}
          ${!!args.defaultFooterSlot ? footerSlotDiv(args) : ''}
      </ath-modal>`;
  },
  args: {
    ...defaultArgs,
    'defaultBodySlot': longText,
    'defaultFooterSlot': `<div slot="footer" style="display: flex; justify-content: center; gap: 8px">
            <ath-button onClick="document.getElementById('scroll-modal').closeModal()" aria-label="cerrar">Cerrar</ath-button>
        </div>`,
    'heading-text': 'Título',
    'max-height': '60%',
    'max-width': '40%',
    'open': true,
    'subtitle-text': 'Subtítulo',
  },
  parameters: {
    storyClass: 'h500',
    controls: {
      exclude: ['click-outside-close', 'close-aria-label', 'athOpened', 'athClosed', 'closeModal', 'openModal', 'open'],
    },
  },
};
