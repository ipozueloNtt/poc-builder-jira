import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { C as ChipDismissSize } from './chip-dismiss.model-BzRj1P8g.js';

const chipDismissCss = ":host .ath-chip-dismiss__container{--color:initial}:host .ath-chip-dismiss__container--sm{gap:var(--ath-spacing-chip-dismiss-col-gap-sm);--padding:calc(var(--ath-spacing-chip-dismiss-padding-y-sm) - 1px) var(--ath-spacing-chip-dismiss-padding-x-sm)}:host .ath-chip-dismiss__container--md{gap:var(--ath-spacing-chip-col-gap);--padding:calc(var(--ath-spacing-chip-dismiss-padding-y-md) - 1px) var(--ath-spacing-chip-dismiss-padding-x-md)}:host{display:inline-flex;height:fit-content;width:fit-content}:host .ath-chip-dismiss__container{display:inline-flex;align-items:center;padding:var(--padding);border-radius:var(--ath-border-radius-chip);background:var(--ath-color-chip-dismiss-bg);color:var(--ath-color-chip-dismiss-fg)}:host .ath-chip-dismiss__container--disabled{background:var(--ath-color-bg-alpha-disabled);color:var(--ath-color-fg-disabled)}:host .ath-chip-dismiss__container .ath-chip-dismiss__text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;line-clamp:1;overflow:hidden;text-overflow:ellipsis;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-chip);font-style:normal;font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-chip)}:host .ath-chip-dismiss__container .ath-chip-dismiss__button{display:flex;background-color:transparent;border:none;flex-direction:column;justify-content:center;align-items:center;padding:0px;border-radius:var(--ath-border-radius-chip-dismiss-button);color:var(--ath-color-chip-dismiss-button-icon-default);cursor:pointer}:host .ath-chip-dismiss__container .ath-chip-dismiss__button:hover:enabled{background:var(--ath-color-chip-dismiss-button-bg-hovered);color:var(--ath-color-icon-default)}:host .ath-chip-dismiss__container .ath-chip-dismiss__button:active:enabled{background:var(--ath-color-chip-dismiss-button-bg-pressed);color:var(--ath-color-icon-default)}:host .ath-chip-dismiss__container .ath-chip-dismiss__button:focus:enabled:not(:active),:host .ath-chip-dismiss__container .ath-chip-dismiss__button:focus-visible:enabled:not(:active){box-shadow:0px 0px 0px 2px var(--ath-color-border-inverse-focus);outline:none}:host .ath-chip-dismiss__container .ath-chip-dismiss__button:disabled{border-radius:var(--ath-border-radius-xs);background:var(--ath-color-bg-alpha-default);color:var(--ath-color-fg-disabled);cursor:none}";

const AthChipDismiss = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athDismiss = createEvent(this, "athDismiss", 7);
    }
    get el() { return getElement(this); }
    /**
     * The button is disabled
     */
    disabled = false;
    /**
     * The icon to the left
     */
    icon;
    /**
     * The text in the chip
     */
    headingText;
    /**
     * The accesible label-dismiss attribute in chip dismiss
     */
    labelDismiss = 'Eliminar';
    /**
     * The size of the chip dismiss
     */
    size = ChipDismissSize.Medium;
    /**
     * Emitted when the x icon is clicked
     */
    athDismiss;
    handleDismiss = () => {
        if (!this.disabled) {
            this.athDismiss.emit();
        }
    };
    getSpanClassNames = () => ({
        'ath-chip-dismiss__container': true,
        [`ath-chip-dismiss__container--${this.size}`]: !!this.size,
        'ath-chip-dismiss__container--disabled': this.disabled,
    });
    renderIcon = () => {
        if (this.icon != 'null') {
            return h("ath-icon", { icon: this.icon, size: "xs", color: "inherit" });
        }
    };
    render() {
        return (h(Host, { key: 'ea7591c46145a9b5464c4579f435996a3a5466b5' }, h("span", { key: 'b2020acb80f05c821ad23c88f5736df7d4394ff2', class: this.getSpanClassNames() }, this.icon && this.renderIcon(), h("span", { key: 'f0e2c32ec9e20179cdb30aed20c01723a59b29d1', class: "ath-chip-dismiss__text" }, this.headingText), h("button", { key: '4087fc00609ea3b117fc1148fa5cd1d877cc7459', "aria-label": this.labelDismiss, disabled: this.disabled, class: "ath-chip-dismiss__button", type: "button", onClick: this.handleDismiss }, h("ath-icon", { key: 'a3fbf07bca4c6920a77fd41db46681d93ad036aa', icon: "close_small", size: "xs", color: "inherit" })))));
    }
};
AthChipDismiss.style = chipDismissCss;

export { AthChipDismiss as ath_chip_dismiss };
//# sourceMappingURL=ath-chip-dismiss.entry.esm.js.map
