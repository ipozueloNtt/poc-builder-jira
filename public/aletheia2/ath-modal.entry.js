import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { b as FcPictogram, F as FcButtonComp } from './index-8mh0qKYc.js';
import { B as ButtonIconPosition } from './button.model-Cy_pPkIg.js';
import './index-DLEKXOBo.js';
import { g as getHeading } from './heading-wtmkpk46.js';
import { I as IconSize } from './types-Dwt0hPp9.js';
import './fc-label-CpydWJ5O.js';
import './icon.model-D_uLkZWw.js';

const ModalAppearance = {
    Error: 'error',
    Info: 'info',
    Success: 'success',
    Warning: 'warning',
};
const ModalSize = {
    Small: 'sm',
    Medium: 'md',
};

const modalCss = ".ath-scroll{overflow:auto}.ath-overflow-hidden{overflow:hidden}.ath-overflow-x-hidden{overflow-x:hidden}.ath-overflow-y-hidden{overflow-y:hidden}@supports (-moz-appearance: none){.ath-scroll{scrollbar-width:thin;scrollbar-color:var(--ath-color-bg-alpha-bolder-default) var(--ath-color-scroll-track-bg)}.ath-scroll:hover{scrollbar-color:var(--ath-color-bg-alpha-bolder-hovered) var(--ath-color-scroll-track-bg)}}.ath-scroll::-webkit-scrollbar{width:var(--ath-sizing-scroll);height:var(--ath-sizing-scroll)}.ath-scroll::-webkit-scrollbar-track{background-color:var(--ath-color-scroll-track-bg)}.ath-scroll::-webkit-scrollbar-thumb{background-color:var(--ath-color-bg-alpha-bolder-default);border-radius:var(--ath-border-radius-scroll)}.ath-scroll::-webkit-scrollbar-thumb:hover{background-color:var(--ath-color-bg-alpha-bolder-hovered)}.ath-scroll::-webkit-scrollbar-button{display:none}:host .ath-modal--sm{--padding:var(--ath-spacing-modal-padding-around-sm)}:host .ath-modal--md{--padding:var(--ath-spacing-modal-padding-around-md)}:host .ath-button_comp--size-xs{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-sm{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-md{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-lg{--button-padding:var(--ath-spacing-button-padding-around-sm)}.ath-button_comp{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.ath-button_comp:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.ath-button_comp:hover{background:var(--ath-color-bg-alpha-hovered)}.ath-button_comp:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.ath-button_comp--disabled{pointer-events:none;color:var(--ath-color-button-icon-disabled)}:host{z-index:1000}:host .backdrop{position:fixed;top:0;left:0;bottom:0;right:0;background:var(--ath-color-bg-surface-scrim);display:flex;justify-content:center;align-items:center;z-index:9999}:host .ath-modal{display:flex;flex-direction:column;position:relative;padding:var(--padding);gap:var(--ath-spacing-modal-row-gap-sm);border-radius:var(--ath-border-radius-modal-default);border:1px solid var(--ath-color-modal-border);background:var(--ath-color-bg-surface-secondary-subtlest);box-shadow:var(--ath-box-shadow-position-x-0) var(--ath-box-shadow-position-y-4) var(--ath-box-shadow-blur-4) var(--ath-box-shadow-spread-0) var(--ath-color-drop-shadow-default);align-items:flex-start;min-width:288px;margin:16px}:host .ath-modal:focus-visible{border:none}:host .ath-modal-header{display:flex;align-self:stretch;justify-content:space-between;align-items:flex-start;gap:var(--ath-spacing-modal-row-gap-sm)}:host .ath-modal-header:focus-visible{outline:none}:host .ath-modal-header img{width:104px;height:104px}:host .ath-modal-header-text{display:flex;flex-direction:column;gap:var(--ath-spacing-modal-header-text-row-gap);word-break:break-word}:host .ath-modal-header-text:focus :focus-visible :focus-within{outline:none}:host .ath-modal-header-text-title{align-items:flex-start;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-heading-2);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-2);margin:0px}:host .ath-modal-header-text-subtitle{align-items:flex-start;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-heading-4);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-4)}:host .ath-modal-header--alert{display:flex;flex-direction:column;align-items:center;gap:var(--ath-spacing-modal-header-row-gap-alert)}:host .ath-modal-header--alert .ath-modal-header-close{position:absolute;top:var(--ath-spacing-around-250);right:var(--ath-spacing-around-250)}:host .ath-modal-header--alert .ath-modal-header-text-title{align-self:center}:host .ath-modal-header--alert .ath-modal-header-text-subtitle{align-self:center}:host .ath-modal--fullscreen{margin:unset;border-radius:var(--ath-border-radius-modal-full-screen);margin:unset;position:fixed;left:0px;top:0px;right:0;bottom:0}:host .ath-modal ath-divider{width:100%}:host .ath-modal .scrollable-slot{max-height:60vh}:host .ath-modal:focus-visible{outline:none}";

const AthModal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athOpened = createEvent(this, "athOpened", 7);
        this.athClosed = createEvent(this, "athClosed", 7);
    }
    get el() { return getElement(this); }
    /**
     * Indicates the illustration used when the prop isAlert is set to true
     */
    appearance = ModalAppearance.Error;
    /**
     * Indicates whether the modal should automatically focus the first interactive element
     */
    autofocus = true;
    /**
     * Indicates whether the modal should close when clicking outside
     */
    clickOutsideClose = false;
    /**
     * Indicates whether the modal will occupy the full screen
     */
    fullScreen = false;
    /**
     * Indicates whether the modal has a close (X) button
     */
    hasClose = true;
    /**
     * Indicates whether there is a divider between the header and the slots
     */
    hasDivider = false;
    /**
     * Indicates the heading level of the title
     */
    headingLevel = 2;
    /**
     * Indicates the title text
     */
    headingText;
    /**
     * Indicates whether the modal has role "Alert", and interrupts the screen reader flow
     */
    isAlert = false;
    /**
     * Indicates the maximum height of the modal
     */
    maxHeight;
    /**
     * Indicates the maximum width of the modal
     */
    maxWidth;
    /**
     * Indicates whether the modal is displayed by default
     */
    open = false;
    /**
     * Differentiates the modal size between sm and md
     */
    size = ModalSize.Medium;
    /**
     * Indicates the subtitle text
     */
    subtitleText;
    // ACCESSIBILITY
    /**
     * Accessible text for the close (X) button
     */
    closeAriaLabel;
    // EVENTS
    /**
     * Emitted when the modal is opened
     */
    athOpened;
    // EVENTS
    /**
     * Emitted when the modal is closed
     */
    athClosed;
    /**
     * Method to open the modal
     */
    async openModal() {
        this.open = true;
        this.previouslyFocusedElement = this.getDeepActiveElement();
        requestAnimationFrame(() => {
            this.focusableElements = this.findFocusableElements();
            if (this.autofocus) {
                this.focusFirstElement();
            }
            else {
                this.blurOuterElement();
            }
            this.athOpened.emit();
        });
    }
    /**
     * Method to close the modal
     */
    async closeModal() {
        this.open = false;
        if (this.previouslyFocusedElement) {
            this.previouslyFocusedElement.focus();
        }
        this.athClosed.emit();
    }
    previouslyFocusedElement = null;
    focusableElements = [];
    handleKeyDown(e) {
        if (this.open) {
            if (e.key === 'Escape') {
                this.closeModal();
            }
            if (e.key === 'Tab') {
                if (this.focusableElements.length !== 0) {
                    this.trapFocus(e);
                }
                else {
                    e.preventDefault();
                }
            }
        }
    }
    findFocusableElements() {
        const results = new Set();
        const focusableSelector = [
            'button:not([disabled]):not([tabindex="-1"])',
            'a[href]:not([tabindex="-1"])',
            'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
            'select:not([disabled]):not([tabindex="-1"])',
            'textarea:not([disabled]):not([tabindex="-1"])',
            'details:not([tabindex="-1"])',
            'area[href]:not([tabindex="-1"])',
            '[contentEditable=true]:not([tabindex="-1"])',
            'iframe:not([tabindex="-1"])',
            '[tabindex]:not([tabindex="-1"])',
        ].join(',');
        const visited = new WeakSet();
        const traverse = (node) => {
            if (!node || visited.has(node))
                return;
            visited.add(node);
            if (node instanceof HTMLElement) {
                const style = window.getComputedStyle(node);
                const isVisible = style.display !== 'none' && style.visibility !== 'hidden';
                if (isVisible && node.matches(focusableSelector)) {
                    results.add(node);
                }
                if (node.shadowRoot) {
                    traverse(node.shadowRoot);
                }
                const shadow = node.shadowRoot;
                if (shadow) {
                    shadow.querySelectorAll(focusableSelector).forEach(el => {
                        if (el instanceof HTMLElement && window.getComputedStyle(el).display !== 'none') {
                            results.add(el);
                        }
                    });
                }
            }
            node.childNodes.forEach(traverse);
            if (typeof HTMLSlotElement !== 'undefined' && node instanceof HTMLSlotElement) {
                node.assignedNodes({ flatten: true }).forEach(traverse);
            }
        };
        traverse(this.el.shadowRoot ?? this.el);
        return Array.from(results);
    }
    focusFirstElement = () => {
        if (this.focusableElements.length > 0) {
            if (this.focusableElements.length > 1 && this.hasClose) {
                this.focusableElements[1].focus();
            }
            else {
                this.focusableElements[0].focus();
            }
        }
    };
    blurOuterElement = () => {
        const modal = this.el.shadowRoot?.querySelector('.ath-modal');
        modal?.focus();
    };
    componentDidLoad() {
        if (this.open) {
            this.openModal();
        }
    }
    trapFocus = e => {
        if (this.focusableElements.length === 0)
            return;
        const first = this.focusableElements[0];
        const last = this.focusableElements[this.focusableElements.length - 1];
        const realActiveElement = this.getDeepActiveElement();
        if (e.shiftKey) {
            if (realActiveElement === first) {
                e.preventDefault();
                last.focus();
            }
        }
        else {
            if (realActiveElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    };
    getDeepActiveElement(doc = document) {
        let active = doc.activeElement;
        while (active?.shadowRoot && active.shadowRoot.activeElement) {
            active = active.shadowRoot.activeElement;
        }
        return active;
    }
    handleBackdropClick = (e) => {
        if (e.target === e.currentTarget && this.clickOutsideClose) {
            this.closeModal();
        }
    };
    getAccesibilityAttributes = () => ({
        'role': this.isAlert ? 'alertdialog' : 'dialog',
        'aria-describedby': this.subtitleText ? 'subtitleTextId' : undefined,
        'aria-labelledby': this.headingText ? 'headlineTextId' : undefined,
        'aria-modal': 'true',
        'tabindex': '-1',
    });
    getDialogClassNames = () => ({
        'ath-modal': true,
        'ath-modal--fullscreen': this.fullScreen,
        [`ath-modal--${this.size}`]: !!this.size,
    });
    getHeaderClassNames = () => ({
        'ath-modal-header': true,
        'ath-modal-header--alert': this.isAlert,
    });
    getDialogStyle = () => ({
        maxHeight: this.maxHeight || 'unset',
        maxWidth: this.maxWidth || 'unset',
    });
    renderHeading = () => {
        const HeadingTitle = getHeading(this.headingLevel);
        return (h(HeadingTitle, { class: "ath-modal-header-text-title", id: "headlineTextId" }, this.headingText));
    };
    renderHeadingSubtitle = () => {
        return (h("div", { class: "ath-modal-header-text-subtitle", id: "subtitleTextId" }, this.subtitleText));
    };
    render() {
        if (!this.open) {
            return h(Host, null);
        }
        return (h(Host, null, h("div", { class: "backdrop", onClick: this.handleBackdropClick }, h("div", { ...this.getAccesibilityAttributes(), class: this.getDialogClassNames(), style: this.getDialogStyle() }, h("div", { class: this.getHeaderClassNames() }, this.isAlert && h(FcPictogram, { name: `illu_${this.appearance}_msg` }), h("div", { class: "ath-modal-header-text" }, this.headingText && this.renderHeading(), this.subtitleText && this.renderHeadingSubtitle()), this.hasClose && (h("div", { class: "ath-modal-header-close" }, h(FcButtonComp, { icon: "close_small", color: "default", iconPosition: ButtonIconPosition.IconOnly, size: IconSize.Small, onClick: () => this.closeModal(), buttonAriaLabel: this.closeAriaLabel })))), this.hasDivider && h("ath-divider", null), h("div", { class: "scrollable-slot ath-scroll" }, h("slot", { name: "body" })), h("slot", { name: "footer" })))));
    }
};
AthModal.style = modalCss;

export { AthModal as ath_modal };
//# sourceMappingURL=ath-modal.entry.esm.js.map
