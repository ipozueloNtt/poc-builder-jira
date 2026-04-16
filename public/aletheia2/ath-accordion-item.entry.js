import { r as registerInstance, e as createEvent, h, d as Host } from './index-Bf9CG7gQ.js';

const accordionItemCss = ":host{align-self:stretch}:host .ath-accordion-item{flex-direction:column;justify-content:center;align-items:flex-start;gap:var(--ath-spacing-accordion-item-row-gap);align-self:stretch;background:var(--ath-color-bg-alpha-default)}:host .ath-accordion-item-divider{border-bottom:1px solid var(--ath-color-border-alpha-bolder-default)}:host .ath-accordion-item--header{align-self:stretch;border-left:2px solid transparent;cursor:pointer;padding:var(--ath-spacing-accordion-item-header-padding-y) var(--ath-spacing-accordion-item-header-padding-x)}:host .ath-accordion-item--header:focus-visible{box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset;outline:none}:host .ath-accordion-item--header.disabled{opacity:0.5;pointer-events:none}:host .ath-accordion-item--header:hover{border-left:2px solid var(--ath-color-border-alpha-boldest-default);background:var(--ath-color-bg-alpha-hovered);transition:0.5s}:host .ath-accordion-item--header__button{display:flex;flex-direction:column;align-items:flex-start}:host .ath-accordion-item--header__button:focus-visible{outline:none}:host .ath-accordion-item--header__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-accordion-item-header-col-gap);align-self:stretch}:host .ath-accordion-item--header__content{display:flex;align-items:flex-start;gap:var(--ath-spacing-accordion-item-header-icon-col-gap);flex:1 0 0}:host .ath-accordion-item--header__text{display:flex;padding-top:var(--ath-spacing-accordion-item-header-text-padding-top);flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-accordion-item-header-text-row-gap);flex:1 0 0}:host .ath-accordion-item--header__title{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-heading-6);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-6)}:host .ath-accordion-item--header__subtitle{color:var(--ath-color-accordion-item-header-text-description);font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-accordion-item--panel{display:flex;padding:0;padding-left:var(--ath-spacing-accordion-item-content-padding-y);flex-direction:column;align-items:flex-start;align-self:stretch;overflow:hidden;max-height:0;transition:max-height 0.5s ease, padding 0.5s ease}:host .ath-accordion-item--panel.expanded{overflow:visible;max-height:fit-content;padding:var(--ath-spacing-accordion-item-content-padding-y) var(--ath-spacing-accordion-item-content-padding-x)}:host .ath-accordion-item--chevron ath-icon{color:var(--ath-color-fg-default);transition:transform 0.3s ease-in-out}:host .ath-accordion-item--chevron-rotate ath-icon{transform:rotate(180deg)}:host ::slotted([slot=header-detail]){display:flex;flex-direction:column;gap:var(--ath-spacing-accordion-item-header-text-row-gap);color:var(--ath-color-fg-default);padding:8px;justify-content:center;align-self:stretch}";

let accordionItemsequence = 0;
const AthAccordionItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.opened = createEvent(this, "opened", 7);
    }
    hostId = `item-${++accordionItemsequence}`;
    panelId = `panel-${this.hostId}`;
    /**
     * Title of heading item
     */
    headingText;
    /**
     * Descriprion of heading item
     */
    description;
    /**
     * The accordion item is disabled
     */
    disabled = false;
    /**
     * The accordion item is expanded
     */
    expanded = false;
    /**
     * The accordion item aria-level
     */
    headingLevel = '2';
    /**
     * The accordion item divider bottom
     */
    noDivider = false;
    /**
     * The code of the accordion item's icon
     */
    icon;
    handleDisabled(expanded) {
        if (expanded) {
            this.opened.emit();
        }
    }
    async close() {
        if (!this.disabled) {
            this.expanded = false;
        }
    }
    opened;
    handleToggle() {
        if (!this.disabled) {
            this.expanded = !this.expanded;
        }
    }
    handleKeydown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            this.handleToggle();
        }
    }
    getParentClassNames = () => ({
        'ath-accordion-item': true,
        'ath-accordion-item-divider': !this.noDivider,
    });
    getPanelClassNames = () => ({
        'ath-accordion-item--panel': true,
        'expanded': this.expanded && !this.disabled,
    });
    getHeaderClassNames = () => ({
        'ath-accordion-item--header': true,
        'disabled': this.disabled,
    });
    getChevronClasses = () => ({
        'ath-accordion-item--chevron': true,
        [`ath-accordion-item--chevron-rotate`]: !!this.expanded,
    });
    async componentWillLoad() {
        if (this.disabled) {
            this.expanded = false;
        }
    }
    render() {
        return (h(Host, { key: 'c9d7f24784ac57a22412c7b6ef87d95ec4d1aed8' }, h("div", { key: 'd858cd8eeb5d39fe281156e4c861d827fbfc3084', class: this.getParentClassNames() }, h("div", { key: '660e725363fa4406026b3eb86084055ea44872ee', role: "button", "aria-expanded": this.expanded ? 'true' : 'false', "aria-controls": this.panelId, "aria-disabled": this.disabled ? 'true' : 'false', tabindex: this.disabled ? '-1' : '0', onClick: () => this.handleToggle(), onKeyDown: event => this.handleKeydown(event), class: this.getHeaderClassNames() }, h("span", { key: 'd707186e8ad5479d8c5cd99fc5e86b8c05decb69', id: this.hostId, class: `ath-accordion-item--header__button`, role: "heading", "aria-level": this.headingLevel }, h("div", { key: '85ae012cdff341774cea00eb2cd6d23030087cd5', class: "ath-accordion-item--header__wrapper" }, h("div", { key: '9c0902121ea712492b7df08e107d1ce6ad41f393', class: "ath-accordion-item--header__content" }, this.icon && h("ath-icon", { key: '62815d919af2b12928a8b36ba85a5691bbd1f41f', icon: this.icon }), h("div", { key: '1b4afcfb6caba5fd23e8642a5b73381ef0c95f47', class: "ath-accordion-item--header__text" }, this.headingText && h("span", { key: 'e6bc09e45091f78f8f9a73a19411d34562ccf0a1', class: "ath-accordion-item--header__title" }, this.headingText), this.description && h("span", { key: '175465e3b949e1fa8374878626f1e574f053d585', class: "ath-accordion-item--header__subtitle" }, this.description))), h("slot", { key: 'bd61acf220b8587f8616be5d53abbe05e58ae22f', name: "header-detail" }), h("div", { key: '8cda40885607ce1661862c431284fb84dc480075', class: this.getChevronClasses() }, h("ath-icon", { key: 'ea8ef3904f98e74cb3509365eb63a6f7d7aa32b0', icon: "chevron_down" }))))), h("div", { key: 'b251a161f380d4b2e6bc0785808a79c2ac4cbce7', id: this.panelId, class: this.getPanelClassNames() }, h("slot", { key: 'ae3579d061c7b6f7aebb31d9aa534bee5233c94e' })))));
    }
    static get watchers() { return {
        "expanded": ["handleDisabled"]
    }; }
};
AthAccordionItem.style = accordionItemCss;

export { AthAccordionItem as ath_accordion_item };
//# sourceMappingURL=ath-accordion-item.entry.esm.js.map
