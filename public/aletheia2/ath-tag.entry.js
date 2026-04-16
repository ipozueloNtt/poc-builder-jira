import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const TagColor = {
    Primary: 'primary',
    Secondary: 'secondary',
    Accent: 'accent',
    Danger: 'danger',
    Success: 'success',
    Warning: 'warning',
    Disabled: 'disabled',
};
const TagSize = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
};
const TAG_DEFAULT_COLOR = TagColor.Primary;
const TAG_DEFAULT_SIZE = TagSize.Medium;

const tagCss = ":host .ath-tag--primary{background-color:var(--ath-color-tag-bg-primary);color:var(--ath-color-tag-fg-primary)}:host .ath-tag--secondary{background-color:var(--ath-color-tag-bg-secondary);color:var(--ath-color-tag-fg-secondary)}:host .ath-tag--accent{background-color:var(--ath-color-bg-accent-default);color:var(--ath-color-tag-fg-accent)}:host .ath-tag--danger{background-color:var(--ath-color-bg-danger-default);color:var(--ath-color-tag-fg-danger)}:host .ath-tag--warning{background-color:var(--ath-color-bg-warning-default);color:var(--ath-color-tag-fg-warning)}:host .ath-tag--success{background-color:var(--ath-color-bg-success-default);color:var(--ath-color-tag-fg-success)}:host .ath-tag--disabled{background-color:var(--ath-color-bg-alpha-disabled);color:var(--ath-color-fg-disabled)}:host .ath-tag--sm{font-size:var(--ath-font-size-comp-sm);padding:var(--ath-spacing-tag-padding-y-sm) var(--ath-spacing-tag-padding-x);line-height:var(--ath-font-line-height-comp-sm)}:host .ath-tag--md{font-size:var(--ath-font-size-comp-md);padding:var(--ath-spacing-tag-padding-y-sm) var(--ath-spacing-tag-padding-x);line-height:var(--ath-font-line-height-comp-md)}:host .ath-tag--lg{font-size:var(--ath-font-size-comp-md);padding:var(--ath-spacing-tag-padding-y-md) var(--ath-spacing-tag-padding-x);line-height:var(--ath-font-line-height-comp-md)}:host{display:inline-block}:host .ath-tag{display:flex;align-items:center;font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-medium);gap:var(--ath-spacing-tag-col-gap);border-radius:var(--ath-border-radius-tag)}:host .ath-tag--container{display:flex;align-items:center}";

const AthTag = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Color del tag acompañando al propósito del mensaje
     **/
    color = TAG_DEFAULT_COLOR;
    /**
     * Tamaño del tag
     **/
    size = TAG_DEFAULT_SIZE;
    /**
     * Icono
     */
    icon;
    /**
     * Texto que se visualiza dentro del tag
     **/
    headingText;
    getClassNames = () => ({
        'ath-tag': true,
        [`ath-tag--${this.color}`]: !!this.color,
        [`ath-tag--${this.size}`]: !!this.size,
    });
    get el() { return getElement(this); }
    render() {
        return (h(Host, { key: 'a5cd81ec782aa3f7e2c299a5b37be81ccbabf668' }, h("div", { key: 'a84cffbc6eec90a6ec916939da38216e223beffa', class: "ath-tag-container" }, h("span", { key: '0f05a084af588fcf80a3288aa96f268cfdff9e4c', class: this.getClassNames() }, this.icon && h("ath-icon", { key: '528954ea0f35a61884bd1eb0d2f7557ce798e286', size: "xs", icon: this.icon, color: "inherit" }), h("span", { key: '768ea50b95ca5c7bfcc1bf05455ee9dad99443d0' }, this.headingText ?? h("slot", { key: 'd0c2b3647da87a1996b359d3b1938dcedbfcfc01' }))))));
    }
};
AthTag.style = tagCss;

export { AthTag as ath_tag };
//# sourceMappingURL=ath-tag.entry.esm.js.map
