import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import './index-CEABDCsQ.js';
import { t as transformIconSize, a as IconType } from './types-Dwt0hPp9.js';

const ButtonLinkColor = {
    Primary: 'primary',
    Secondary: 'secondary',
};
const ButtonLinkPosition = {
    Left: 'left',
    Right: 'right',
};
const ButtonLinkSize = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
    Extrasmall: 'xs',
};

const buttonLinkCss = ".ath-button-link__inner:hover{text-decoration-line:underline}.ath-button-link__inner:active{text-decoration-line:underline;color:var(--ath-color-fg-primary-pressed)}.ath-button-link--disabled .ath-button-link__inner:hover{text-decoration-line:none}:host{display:inline-flex;user-select:none}:host .ath-button-link--container{display:inline-flex;font-family:var(--ath-font-family-primary);font-size:var(--font-size);font-weight:var(--ath-font-weight-medium);line-height:var(--ath-font-line-height-body);border-radius:var(--ath-border-radius-2xs);outline:none;transition:background 0.5s;cursor:pointer}:host .ath-button-link--container .ath-button-link__inner{display:inline-flex;justify-content:center;align-items:center;gap:var(--ath-spacing-between-100)}:host .ath-button-link--container.ath-button-link--disabled{box-shadow:none;color:var(--ath-color-fg-disabled);pointer-events:none}:host[disabled]:not([disabled=false]),:host[disabled=true]{cursor:not-allowed}:host(:focus:not(:active)),:host(:focus-visible:not(:active)){outline:none}:host(:focus:not(:active)) .ath-button-link--container,:host(:focus-visible:not(:active)) .ath-button-link--container{outline:2px solid var(--ath-color-border-focus);outline-offset:2px;color:var(--ath-color-fg-primary-default)}:host(:focus:not(:active)) .ath-button-link--container .ath-button-link__inner,:host(:focus-visible:not(:active)) .ath-button-link--container .ath-button-link__inner{text-decoration-line:underline}.ath-button-link--sm{--font-size:var(--ath-font-size-comp-sm)}.ath-button-link--md{--font-size:var(--ath-font-size-comp-md)}.ath-button-link--lg{--font-size:var(--ath-font-size-comp-lg)}:host .ath-button-link--primary:not(.ath-button-link--disabled){color:var(--ath-color-fg-primary-default)}:host .ath-button-link--secondary:not(.ath-button-link--disabled){color:var(--ath-color-fg-default)}:host .ath-button-link--primary:not(.ath-button-link--disabled) :hover{color:var(--ath-color-fg-primary-hovered)}:host .ath-button-link--primary:not(.ath-button-link--disabled){color:var(--ath-color-fg-primary-default)}:host .ath-button-link--secondary:not(.ath-button-link--disabled){color:var(--ath-color-fg-default)}:host .ath-button-link--secondary:not(.ath-button-link--disabled) :hover{color:var(--ath-color-fg-primary-hovered)}";

const AthButtonLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athClick = createEvent(this, "athClick", 7);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
    }
    get el() { return getElement(this); }
    /**
     * The color variant of the button-link
     */
    color = ButtonLinkColor.Primary;
    /**
     * The size of the buton-link
     */
    size = ButtonLinkSize.Medium;
    /**
     * The code of the button-link's icon
     */
    icon;
    /**
     * Icon Position
     */
    iconPosition = ButtonLinkPosition.Left;
    /**
     * The button-link is disabled
     */
    disabled = false;
    async setFocus() {
        if (!this.disabled) {
            this.el.focus();
        }
    }
    /**
     * Emitted when the button-link is clicked
     */
    athClick;
    /**
     * Emitted when the button-link gains focus
     */
    athFocus;
    /**
     * Emitted when the button-link loses focus
     */
    athBlur;
    componentDidLoad() {
        if (this.el.hasAttribute('autofocus') && this.el.getAttribute('autofocus') !== 'false') {
            this.setFocus();
        }
    }
    handleKeyDown(ev) {
        if (['Enter', 'Space'].includes(ev.code)) {
            this.handleClick();
        }
    }
    handleClick = ( /**event: Event*/) => {
        if (!this.disabled) {
            this.athClick.emit();
        }
    };
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    getHostClassNames = () => ({
        'ath-button-link': true,
    });
    getSpanClassNames = () => ({
        'ath-button-link--container': true,
        [`ath-button-link--disabled`]: this.disabled,
        [`ath-button-link--${this.size}`]: !!this.size,
        [`ath-button-link--${this.color}`]: !!this.color,
    });
    renderIcon = () => {
        const iconSize = transformIconSize(IconType.ButtonLink, this.size);
        return h("ath-icon", { icon: this.icon, color: "inherit", size: iconSize });
    };
    render() {
        const hostTabindex = this.el.getAttribute('tabindex') === '-1' ? '-1' : '0';
        return (h(Host, { key: '807a3f1c1ae1d4f8af1f6631753532f9bf738d99', role: "button", class: this.getHostClassNames(), tabindex: this.disabled ? '-1' : hostTabindex, onFocus: this.handleFocus, onBlur: this.handleBlur, onClick: this.handleClick, "aria-disabled": this.disabled ? 'true' : 'false' }, h("span", { key: 'c321d97f7262e1ed23b6236abddfa8bf258ac0a6', class: this.getSpanClassNames(), part: "button-link-styles" }, h("span", { key: '58f3c7530d24b0d5c6d3a4b79a05da83fa26bfe6', class: "ath-button-link__inner" }, this.icon && this.iconPosition === ButtonLinkPosition.Left && this.renderIcon(), h("slot", { key: 'c4c015d37188619222061cf6a8878e72812d791a' }), this.icon && this.iconPosition === ButtonLinkPosition.Right && this.renderIcon()))));
    }
};
AthButtonLink.style = buttonLinkCss;

export { AthButtonLink as ath_button_link };
//# sourceMappingURL=ath-button-link.entry.esm.js.map
