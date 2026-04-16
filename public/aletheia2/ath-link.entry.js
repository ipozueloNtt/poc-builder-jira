import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import './index-DLEKXOBo.js';
import { t as transformIconSize, a as IconType } from './types-Dwt0hPp9.js';

const linkSize = {
    Sm: 'sm',
    Md: 'md',
    Lg: 'lg',
};
const linkTarget = {
    Self: 'self',
    Parent: 'parent',
    Blank: 'blank',
    Top: 'top',
};

const linkCss = ".sc-ath-link-h{display:flex;width:fit-content}.sc-ath-link-h .ath-link.sc-ath-link{text-decoration:none;display:flex;justify-content:center;align-items:center;gap:var(--ath-spacing-between-100);font-family:var(--ath-font-family-primary);font-style:normal;line-height:var(--ath-font-line-height-body);font-weight:var(--ath-font-weight-medium);border-radius:var(--ath-border-radius-2xs);text-decoration-style:solid;text-decoration-skip-ink:none;text-decoration-thickness:auto;text-underline-offset:auto;text-underline-position:from-font;cursor:pointer}.sc-ath-link-h .ath-link.sc-ath-link:focus-visible:not(.ath-link--disabled){outline:none;box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.sc-ath-link-h .ath-link--disabled.sc-ath-link{pointer-events:none;color:var(--ath-color-fg-disabled)}.sc-ath-link-h .ath-link--underline.sc-ath-link{text-decoration-line:underline}.sc-ath-link-h .ath-link.sc-ath-link:not(.ath-link--disabled):not(:visited):not(:hover):not(:active){color:var(--ath-color-fg-primary-default)}.sc-ath-link-h .ath-link.sc-ath-link:visited:not(.ath-link--disabled){color:var(--ath-color-fg-primary-pressed)}.sc-ath-link-h .ath-link.sc-ath-link:hover:not(.ath-link--disabled){color:var(--ath-color-fg-primary-hovered)}.sc-ath-link-h .ath-link.sc-ath-link:active:not(.ath-link--disabled){color:var(--ath-color-fg-primary-pressed)}.sc-ath-link-h .ath-link--sm.sc-ath-link{font-size:var(--ath-font-size-body-sm)}.sc-ath-link-h .ath-link--md.sc-ath-link{font-size:var(--ath-font-size-body-md)}.sc-ath-link-h .ath-link--lg.sc-ath-link{font-size:var(--ath-font-size-body-lg)}";

const AthLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athClick = createEvent(this, "athClick", 7);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
    }
    /**
     * aria-describedby para link
     */
    ariaDescribedby;
    /**
     * aria-label para link
     */
    ariaLabel;
    /**
     * aria-labelledby para link
     */
    ariaLabelledby;
    /**
     * Indica si el link esta deshabilitado
     */
    disabled;
    /**
     * Indica el icono a usar
     */
    icon;
    /**
     * Indica el aria-label para icono
     */
    iconAriaLabel;
    /**
     * Url del destino
     */
    linkHref;
    /**
     * Target para indicar donde se abrira
     */
    linkTarget = linkTarget.Blank;
    /**
     * Tamaño link
     */
    size = linkSize.Md;
    /**
     * Opcion del subrayado
     */
    underline = true;
    /**
     * Additional text to be appended to the aria-label to indicate that this is an external link
     */
    externalLabel;
    /**
     * Emitted when the link is clicked
     */
    athClick;
    /**
     * Emitted when the lin gains focus
     */
    athFocus;
    /**
     * Emitted when the link loses focus
     */
    athBlur;
    get el() { return getElement(this); }
    handleClick = () => {
        this.athClick.emit();
    };
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    setAriaLabel(baseLabel) {
        let label = baseLabel?.trim() || '';
        if (this.linkTarget === linkTarget.Blank) {
            const extra = this.externalLabel || '(enlace externo)';
            label = label ? `${label} ${extra}` : extra;
        }
        else if (this.externalLabel) {
            label = label ? `${label} ${this.externalLabel}` : this.externalLabel;
        }
        return label;
    }
    getClassNames = () => ({
        'ath-link': true,
        [`ath-link--${this.size}`]: !!this.size,
        'ath-link--disabled': this.disabled,
        'ath-link--underline': this.icon ? this.underline : true,
    });
    renderIcon = () => {
        const iconSize = transformIconSize(IconType.Link, this.size);
        return h("ath-icon", { icon: this.icon, size: iconSize, "aria-label": this.iconAriaLabel, color: "inherit" });
    };
    render() {
        const target = '_' + this.linkTarget;
        const linkTabindex = this.el.getAttribute('tabindex') === '-1' || this.disabled ? '-1' : '0';
        return (h(Host, { key: '52e8b0248640e36fec5227921d59e4b6a22a82c3' }, h("a", { key: 'ab089c9a3929f2200cab78a1ca30f701eefe59e3', class: this.getClassNames(), href: this.linkHref, target: target, onClick: this.handleClick, onFocus: this.handleFocus, onBlur: this.handleBlur, tabindex: linkTabindex, "aria-label": this.setAriaLabel(this.ariaLabel), "aria-labelledby": this.ariaLabelledby, "aria-describedby": this.ariaDescribedby, "aria-disabled": this.disabled ? 'true' : 'false' }, h("slot", { key: '9cb46136540cbf36b0a6179bf4882d0e2a2a0656' }), !!this.icon && this.renderIcon())));
    }
};
AthLink.style = linkCss;

export { AthLink as ath_link };
//# sourceMappingURL=ath-link.entry.esm.js.map
