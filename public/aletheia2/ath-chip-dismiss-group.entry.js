import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { C as ChipDismissSize } from './chip-dismiss.model-BzRj1P8g.js';

const chipDismissGroupCss = ":host{display:flex;align-items:center;align-content:center;gap:var(--ath-spacing-chip-group-row-gap) var(--ath-spacing-chip-group-col-gap);flex-wrap:wrap;width:100%}";

const AthChipDismissGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Weather the chips are disabled
     */
    disabled;
    /**
     * The generic size of the chips
     */
    size = ChipDismissSize.Medium;
    /**
     * The width of the group
     */
    width;
    handleChipDismiss(event) {
        const chipEl = event.target;
        chipEl.remove();
    }
    get host() { return getElement(this); }
    componentDidLoad() {
        this.setChipsDisabled();
        this.setChipsSize();
    }
    setChipsDisabled() {
        if (this.disabled !== undefined) {
            const chips = this.host.querySelectorAll('ath-chip-dismiss');
            if (!chips)
                return;
            chips.forEach(chip => {
                const currentDisabled = chip.getAttribute('disabled');
                if (currentDisabled === null) {
                    chip.setAttribute('disabled', this.disabled.toString());
                }
            });
        }
    }
    setChipsSize() {
        if (!!this.size) {
            const chips = this.host.querySelectorAll('ath-chip-dismiss');
            if (!chips)
                return;
            chips.forEach((chip) => {
                const currentSize = chip.getAttribute('size');
                if (!currentSize && this.size) {
                    chip.size = this.size;
                }
            });
        }
    }
    render() {
        return (h(Host, { key: 'd1412d3613ba24369a79a9cb93707e9f0bfdf990', role: "group", style: this.width ? { width: this.width } : undefined }, h("slot", { key: 'f0fc0ce6b61ba5a33311c4b2e8046f9176417c62' })));
    }
};
AthChipDismissGroup.style = chipDismissGroupCss;

export { AthChipDismissGroup as ath_chip_dismiss_group };
//# sourceMappingURL=ath-chip-dismiss-group.entry.esm.js.map
