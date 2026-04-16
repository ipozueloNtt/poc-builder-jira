import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const ActionBarAlignments = {
    Left: 'left',
    Center: 'center',
    Right: 'right',
    Justify: 'justify',
};
const ActionBarSizes = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
};

const actionBarCss = ":host .ath-action-bar{display:inline-flex;width:100%;align-items:center;gap:var(--ath-spacing-action-bar-col-gap)}:host .ath-action-bar--alignment-left{justify-content:flex-start}:host .ath-action-bar--alignment-center{justify-content:center}:host .ath-action-bar--alignment-right{justify-content:flex-end}:host .ath-action-bar--alignment-justify{justify-content:space-between}";

const AthActionBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /**
     * Indicates the alignment of the inner components
     */
    alignment = ActionBarAlignments.Left;
    /**
     * Indicates the size of the inner components
     */
    size = ActionBarSizes.Medium;
    componentDidLoad() {
        this.injectToChildren();
    }
    handlePropChange() {
        this.injectToChildren();
    }
    injectToChildren() {
        const slot = this.el.shadowRoot.querySelector('slot');
        if (!slot)
            return;
        const assignedElements = slot.assignedElements ? slot.assignedElements() : [];
        assignedElements.forEach(child => {
            const tag = child.tagName.toLowerCase();
            if (tag === 'ath-badge') {
                child.children[0] && (child.children[0].size = this.size);
            }
            if (tag === 'ath-divider') {
                child.style.height = this.getDividerHeightToken();
                child.color = 'boldest';
                child.orientation = 'vertical';
                child.size = 'sm';
            }
            else if (tag === 'ath-button' ||
                tag === 'ath-button-expandable' ||
                tag === 'ath-button-link' ||
                tag === 'ath-link' ||
                tag === 'ath-menu-button' ||
                tag === 'ath-segmented-control') {
                child.size = this.size;
            }
            else if (tag === 'ath-tooltip') {
                child.children[0] && child.children[0].children[0] && (child.children[0].children[0].size = this.size);
            }
        });
    }
    getDividerHeightToken = () => {
        return `var(--ath-sizing-action-bar-divider-height-${this.size})`;
    };
    getClassNames = () => ({
        'ath-action-bar': true,
        [`ath-action-bar--alignment-${this.alignment}`]: !!this.alignment,
    });
    render() {
        return (h(Host, { key: '92d9af9fdb2c9775641827b04b8aff818e83262b', role: "toolbar" }, h("div", { key: '88440c26e30fd92fd336d1f96cf282939de2e3bb', class: this.getClassNames() }, h("slot", { key: '7ce71a2832b2dcae526a0ccd09e78a8b1400154e' }))));
    }
    static get watchers() { return {
        "size": ["handlePropChange"]
    }; }
};
AthActionBar.style = actionBarCss;

export { AthActionBar as ath_action_bar };
//# sourceMappingURL=ath-action-bar.entry.esm.js.map
