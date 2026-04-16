import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const AccordionExpands = {
    All: 'all',
    One: 'one',
};

const accordionCss = ":host .ath-accordion{width:100%;display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-accordion-line-row-gap)}";

const AthAccordion = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Indica si se pueden abrir todos los elementos al mismo tiempo
     */
    expand = AccordionExpands.All;
    /**
     * Si es true, se muestra el divisor también en el último ítem.
     */
    noLastItemDivider = false;
    /**
     * Indica una etiqueta accesible para el acordeón
     */
    ariaLabel;
    expandedItems = []; // Array de índices de ítems expandidos.
    get el() { return getElement(this); }
    handleOpened(event) {
        this.refreshAccordionitems(event.target);
    }
    items = [];
    componentDidLoad() {
        const slot = this.el.shadowRoot.querySelector('slot');
        if (slot) {
            const assignedElements = slot.assignedElements({ flatten: true }).filter(el => el.tagName.toLowerCase() === 'ath-accordion-item');
            this.items = assignedElements;
            this.items.forEach((item, index) => {
                const isLast = index === this.items.length - 1;
                item.noDivider = isLast ? this.noLastItemDivider : false;
            });
        }
    }
    refreshAccordionitems(activeAccordionItem) {
        if (this.expand === AccordionExpands.One) {
            this.closeOtherAccordionItems(activeAccordionItem);
        }
    }
    closeOtherAccordionItems(activeAccordionItem) {
        this.items.forEach(item => {
            if (item !== activeAccordionItem && item.expanded) {
                item.close();
            }
        });
    }
    render() {
        return (h(Host, { key: 'd881d8f9f3e84d6f81d82ca8bfa17e1ea67ebe0c', role: "region" }, h("div", { key: 'e48101c49f648b1795d78f3864175c9d9035c8bf', class: `ath-accordion` }, h("slot", { key: 'ec91ba758f3d23a8de548056bcf6926450ab07af' }))));
    }
};
AthAccordion.style = accordionCss;

export { AthAccordion as ath_accordion };
//# sourceMappingURL=ath-accordion.entry.esm.js.map
