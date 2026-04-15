import { Component, Prop, State, h, Element, JSX, Host, Listen } from '@stencil/core';
import { AccordionExpand, AccordionExpands } from './accordion.model';

@Component({
  tag: 'ath-accordion',
  styleUrl: 'accordion.scss',
  shadow: true,
})
export class AthAccordion {
  /**
   * Indica si se pueden abrir todos los elementos al mismo tiempo
   */
  @Prop({ reflect: true }) expand: AccordionExpand = AccordionExpands.All;

  /**
   * Si es true, se muestra el divisor también en el último ítem.
   */
  @Prop() noLastItemDivider: boolean = false;

  /**
   * Indica una etiqueta accesible para el acordeón
   */
  @Prop() ariaLabel: string | null;

  @State() expandedItems: number[] = []; // Array de índices de ítems expandidos.
  @Element() el: HTMLElement; // Referencia al elemento base del componente.

  @Listen('opened')
  handleOpened(event) {
    this.refreshAccordionitems(event.target);
  }

  private items: HTMLAthAccordionItemElement[] = [];

  componentDidLoad() {
    const slot = this.el.shadowRoot.querySelector('slot');

    if (slot) {
      const assignedElements = slot.assignedElements({ flatten: true }).filter(el => el.tagName.toLowerCase() === 'ath-accordion-item') as HTMLAthAccordionItemElement[];
      this.items = assignedElements;

      this.items.forEach((item, index) => {
        const isLast = index === this.items.length - 1;
        item.noDivider = isLast ? this.noLastItemDivider : false;
      });
    }
  }

  private refreshAccordionitems(activeAccordionItem) {
    if (this.expand === AccordionExpands.One) {
      this.closeOtherAccordionItems(activeAccordionItem);
    }
  }

  private closeOtherAccordionItems(activeAccordionItem) {
    this.items.forEach(item => {
      if (item !== activeAccordionItem && item.expanded) {
        item.close();
      }
    });
  }

  render(): JSX.Element {
    return (
      <Host role="region">
        <div class={`ath-accordion`}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
