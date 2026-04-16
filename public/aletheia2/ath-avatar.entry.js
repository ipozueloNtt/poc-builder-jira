import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { A as AvatarSizes, a as AvatarTypes } from './avatar.model-CWqczPfG.js';

const avatarCss = ":host{display:flex;width:fit-content;height:fit-content}:host .ath-avatar--xs{height:var(--ath-sizing-avatar-height-xs);width:var(--ath-sizing-avatar-width-xs)}:host .ath-avatar--xs ::slotted([slot=img]){height:var(--ath-sizing-avatar-height-xs);width:var(--ath-sizing-avatar-width-xs)}:host .ath-avatar--xs svg{flex-shrink:0;height:var(--ath-sizing-avatar-height-xs);width:var(--ath-sizing-avatar-width-xs)}:host .ath-avatar--xs .ath-avatar--initials{font-size:var(--ath-font-size-heading-6);line-height:var(--ath-font-line-height-heading-6)}:host .ath-avatar--sm{height:var(--ath-sizing-avatar-height-sm);width:var(--ath-sizing-avatar-width-sm)}:host .ath-avatar--sm ::slotted([slot=img]){height:var(--ath-sizing-avatar-height-sm);width:var(--ath-sizing-avatar-width-sm)}:host .ath-avatar--sm svg{flex-shrink:0;height:var(--ath-sizing-avatar-height-sm);width:var(--ath-sizing-avatar-width-sm)}:host .ath-avatar--sm .ath-avatar--initials{font-size:var(--ath-font-size-heading-5);line-height:var(--ath-font-line-height-heading-5)}:host .ath-avatar--md{height:var(--ath-sizing-avatar-height-md);width:var(--ath-sizing-avatar-width-md)}:host .ath-avatar--md ::slotted([slot=img]){height:var(--ath-sizing-avatar-height-md);width:var(--ath-sizing-avatar-width-md)}:host .ath-avatar--md svg{flex-shrink:0;height:var(--ath-sizing-avatar-height-md);width:var(--ath-sizing-avatar-width-md)}:host .ath-avatar--md .ath-avatar--initials{font-size:var(--ath-font-size-heading-2);line-height:var(--ath-font-line-height-heading-2)}:host .ath-avatar--lg{height:var(--ath-sizing-avatar-height-lg);width:var(--ath-sizing-avatar-width-lg)}:host .ath-avatar--lg ::slotted([slot=img]){height:var(--ath-sizing-avatar-height-lg);width:var(--ath-sizing-avatar-width-lg)}:host .ath-avatar--lg svg{flex-shrink:0;height:var(--ath-sizing-avatar-height-lg);width:var(--ath-sizing-avatar-width-lg)}:host .ath-avatar--lg .ath-avatar--initials{font-size:var(--ath-font-size-heading-1);line-height:var(--ath-font-line-height-heading-1)}:host .ath-avatar--default{background:var(--ath-color-avatar-default-bg)}:host .ath-avatar svg{fill:var(--ath-color-avatar-default-bg)}:host .ath-avatar--initials{background:var(--ath-color-avatar-initials-bg)}:host .ath-avatar{display:flex;flex-direction:column;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-avatar);font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-heading);overflow:hidden}:host .ath-avatar--image{background:var(--ath-color-bg-secondary-subtlest-default)}:host .ath-avatar .ath-avatar--initials{display:flex;justify-content:center;align-items:center;color:var(--ath-color-avatar-initials-fg)}";

const AthAvatar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Initials to display in the avatar.
     */
    initials;
    /**
     * Size of the avatar.
     */
    size = AvatarSizes.Medium;
    /**
     * Type of avatar (image or initials).
     */
    type;
    /**
     * Name used to generate initials if none are provided.
     */
    avatarName;
    /**
     * The aria-labelledby attribute of the icon
     */
    ariaLabelledby;
    get el() { return getElement(this); }
    avatarClassType;
    getClassNames = () => ({
        'ath-avatar': true,
        [`ath-avatar--${this.size}`]: true,
    });
    hasImage() {
        return !!this.el.querySelector('img');
    }
    getInitials = () => {
        if (this.initials) {
            this.avatarClassType = 'initials';
            return h("span", { class: "ath-avatar--initials" }, this.initials.toUpperCase().slice(0, 2));
        }
        else if (this.avatarName) {
            this.avatarClassType = 'initials';
            const initials = this.avatarName
                .split(' ')
                .map(word => word.charAt(0).toUpperCase())
                .slice(0, 2)
                .join('');
            return h("span", { class: "ath-avatar--initials" }, initials);
        }
        return null;
    };
    renderContent = () => {
        // If type is defined and is image, Check for image
        if (this.type === AvatarTypes.Image && this.hasImage()) {
            this.avatarClassType = 'image';
            return h("slot", { name: "img" });
        }
        // If type is defined and is initials, check for initials
        if (this.type === AvatarTypes.Initials) {
            return this.getInitials() || this.renderDefaultImg();
        }
        // If type is undefined, check in priority order (image>initials).
        if (!this.type) {
            if (this.hasImage()) {
                this.avatarClassType = 'image';
                return h("slot", { name: "img" });
            }
            const initialsContent = this.getInitials();
            if (initialsContent) {
                return initialsContent;
            }
        }
        // Fallback to default image
        return this.renderDefaultImg();
    };
    componentDidLoad() {
        const athAvatar = this.el.shadowRoot.querySelector('.ath-avatar');
        athAvatar.classList.add('ath-avatar--' + (this.avatarClassType || 'default'));
    }
    renderDefaultImg = () => {
        const theme = document.body.dataset.theme || 'core';
        const assetsPath = `assets/images/pictograms/${theme}/`;
        return (h("svg", { focusable: "false", "aria-hidden": "true", viewBox: "0 0 32 32" }, h("use", { xlinkHref: `${assetsPath}illu_male.svg` })));
    };
    hasAriaLabel() {
        const ariaLabel = this.el.getAttribute('aria-label');
        return !!ariaLabel?.trim();
    }
    hasAriaLabelledBy() {
        return !this.hasAriaLabel() && !!this.ariaLabelledby?.trim();
    }
    getHostAttributes() {
        const ariaLabel = this.el.getAttribute('aria-label');
        const hasLabel = this.hasAriaLabel() || this.hasAriaLabelledBy();
        const currentAriaLabel = this.hasAriaLabel() ? ariaLabel.trim() : !!this.avatarName ? this.avatarName : undefined;
        return {
            'aria-label': currentAriaLabel,
            'role': hasLabel ? 'img' : !!this.avatarName ? 'img' : undefined,
        };
    }
    render() {
        return (h(Host, { key: '5aaf3cac8997537ef51ff13ec93a647901f18c0e', ...this.getHostAttributes() }, h("div", { key: '2a51706b04e7d0334ebf972ea05a9fc3664ce849', class: this.getClassNames() }, this.renderContent())));
    }
};
AthAvatar.style = avatarCss;

export { AthAvatar as ath_avatar };
//# sourceMappingURL=ath-avatar.entry.esm.js.map
