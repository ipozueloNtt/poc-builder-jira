import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { C as ChipChoiceRole, a as ChipChoiceSize } from './chip-choice.model-B-mKsPHZ.js';
import './index-DLEKXOBo.js';
import { t as transformIconSize, a as IconType } from './types-Dwt0hPp9.js';

const chipChoiceCss = ":host .ath-chip-choice__container{--chip-border:1px solid var(--ath-color-border-alpha-boldest-default);--chip-color:var(--ath-color-fg-default);--chip-icon-color:var(--ath-color-icon-default);--chip-background:trasparent;--chip-box-shadow:none}:host .ath-chip-choice__container--sm{--chip-padding:calc(var(--ath-spacing-chip-choice-padding-y-sm) - 1px) calc(var(--ath-spacing-chip-choice-padding-x-sm) - 1px)}:host .ath-chip-choice__container--md{--chip-padding:calc(var(--ath-spacing-chip-choice-padding-md) - 1px)}:host .ath-chip-choice__container:hover:not(.ath-chip-choice__container--checked){--chip-background:var(--ath-color-bg-alpha-boldest-hovered);--chip-border:1px solid transparent;--chip-color:var(--ath-color-chip-choice-fg-hovered);--chip-icon-color:var(--ath-color-chip-choice-icon-hovered)}:host .ath-chip-choice__container:active:not(.ath-chip-choice__container--checked){--chip-background:var(--ath-color-bg-alpha-boldest-pressed);--chip-border:1px solid transparent;--chip-color:var(--ath-color-chip-choice-fg-pressed);--chip-icon-color:var(--ath-color-chip-choice-icon-pressed)}:host .ath-chip-choice__container--disabled{--chip-background:var(--ath-color-bg-alpha-disabled);--chip-color:var(--ath-color-fg-disabled);--chip-icon-color:var(--ath-color-icon-disabled);--chip-border:1px solid transparent;pointer-events:none}:host .ath-chip-choice__container--checked{--chip-background:var(--ath-color-chip-choice-bg-selected);--chip-border:1px solid transparent;--chip-color:var(--ath-color-chip-choice-fg-selected-default);--chip-icon-color:var(--ath-color-chip-choice-icon-selected-default)}:host(:focus-visible){outline:none}:host(:focus-visible) .ath-chip-choice__container{outline:none}:host(:focus-visible) .ath-chip-choice__container:not(.ath-chip-choice__container--checked){--chip-box-shadow:0px 0px 0px 2px var(--ath-color-border-focus);--chip-border:1px solid transparent}:host(:focus-visible) .ath-chip-choice__container--checked{--chip-box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus);--chip-color:var(--ath-color-chip-choice-fg-selected-focus);--chip-border:1px solid transparent}:host{display:inline-flex;width:fit-content}:host .ath-chip-choice__container{display:inline-flex;align-items:center;gap:var(--ath-spacing-chip-col-gap);border-radius:var(--ath-border-radius-chip);padding:var(--chip-padding);color:var(--chip-color);border:var(--chip-border);background:var(--chip-background);box-shadow:var(--chip-box-shadow);cursor:pointer;user-select:none}:host .ath-chip-choice__container ath-icon{color:var(--chip-icon-color)}:host .ath-chip-choice__text{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;line-clamp:1;overflow:hidden;text-overflow:ellipsis;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-chip);font-style:normal;font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-chip)}";

const AthChipChoice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChange = createEvent(this, "athChange", 7);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    initialValue;
    get el() { return getElement(this); }
    internals;
    /**
     * Indica si el chip esta seleccionado
     */
    selected = false;
    /**
     * Indica si el chip esta deshabilitado
     */
    disabled = false;
    /**
     * Indica el nombre del icono a usar
     */
    icon;
    /**
     * Texto del chip
     */
    label;
    /**
     * The chip name for HTML Form API
     */
    name;
    /**
     * The role of the chip
     */
    role = ChipChoiceRole.Checkbox;
    /**
     * Indica el tamaño del chip (sm/md)
     */
    size = ChipChoiceSize.Medium;
    /**
     * The chip value for HTML Form API
     */
    value;
    watchSelectedHandler(newValue) {
        if (this.isCheckbox() && !this.disabled) {
            this.visualSelected = newValue;
            this.el.focus();
            this.setInputValue();
        }
    }
    athChange;
    athFocus;
    athBlur;
    visualSelected = false;
    async select() {
        if (!this.disabled) {
            this.visualSelected = true;
            this.el.focus();
        }
    }
    async unselect() {
        if (!this.disabled) {
            this.visualSelected = false;
            this.el.blur();
        }
    }
    handleKeydown(e) {
        if (e.code === 'Space' || e.code === 'Enter') {
            this.toogleValueChip();
            e.stopPropagation();
        }
    }
    handleMouseDown(e) {
        if (this.disabled) {
            e.preventDefault();
        }
    }
    componentDidLoad() {
        if (!this.value) {
            this.value = this.label;
        }
        this.initialValue = this.selected;
        if (this.isCheckbox() && !this.disabled) {
            this.setInputValue();
        }
    }
    formResetCallback() {
        if (this.isCheckbox() && !this.disabled) {
            this.setValueChip(this.initialValue);
        }
    }
    isCheckbox() {
        return this.role === ChipChoiceRole.Checkbox;
    }
    handleClick = () => {
        this.toogleValueChip();
        this.select();
    };
    handleFocus = () => {
        if (!this.disabled) {
            this.athFocus.emit();
        }
    };
    handleBlur = () => {
        if (!this.disabled) {
            this.athBlur.emit();
        }
    };
    toogleValueChip() {
        this.setValueChip(!this.selected);
    }
    setValueChip(value) {
        if (!this.disabled && this.selected !== value) {
            this.selected = value;
            this.athChange.emit(this.el);
            this.setInputValue();
        }
    }
    setInputValue() {
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals?.setFormValue(this.selected ? this.value : undefined);
            this.internals?.checkValidity();
        }
    }
    getHostAttributes = () => {
        return {
            'tabindex': this.visualSelected && !this.disabled ? '0' : '-1',
            'aria-disabled': this.disabled ? 'true' : undefined,
            'aria-checked': this.selected ? 'true' : 'false',
            'onClick': this.handleClick,
            'onFocus': this.handleFocus,
            'onBlur': this.handleBlur,
        };
    };
    getHostClassNames = () => ({
        'ath-chip-choice': true,
    });
    getContainerClassNames = () => ({
        'ath-chip-choice__container': true,
        [`ath-chip-choice__container--${this.size}`]: true,
        'ath-chip-choice__container--disabled': this.disabled,
        [`ath-chip-choice__container--checked`]: this.selected && !this.disabled,
    });
    renderIcon = () => {
        return h("ath-icon", { icon: this.icon, size: transformIconSize(IconType.Chipchoice, this.size), color: "inherit" });
    };
    render() {
        return (h(Host, { key: '8716554478e6979ddef99d8699df590c76fe039a', ...this.getHostAttributes(), class: this.getHostClassNames() }, h("span", { key: '0ff0277762dd1a9c82c83d9bc24e2e62a86d01e4', class: this.getContainerClassNames() }, !!this.icon && this.renderIcon(), h("span", { key: 'd21507abcc0d3a4b4f0176456d19a865b254004e', class: "ath-chip-choice__text" }, this.label))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "selected": ["watchSelectedHandler"]
    }; }
};
AthChipChoice.style = chipChoiceCss;

export { AthChipChoice as ath_chip_choice };
//# sourceMappingURL=ath-chip-choice.entry.esm.js.map
