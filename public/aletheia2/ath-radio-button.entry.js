import { r as registerInstance, e as createEvent, h, d as Host } from './index-Bf9CG7gQ.js';
import './index-8mh0qKYc.js';
import { F as FcInputLabel } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const radioButtonCss = ":host .ath-radiobutton{--border:1px solid var(--ath-color-radiobutton-border-default);--background:var(--ath-color-radiobutton-bg-default);--color:var(--ath-color-fg-default);--font-weight:var(--ath-font-weight-regular);--after-background-color:none}:host .ath-radiobutton--checked{--font-weight:var(--ath-font-weight-medium);--background:var(--ath-color-radiobutton-bg-default)}:host .ath-radiobutton--checked:not(.ath-radiobutton--read-only):not(.ath-radiobutton--disabled){--border:none;--after-box-shadow:0px 0px 0px 7px var(--ath-color-radiobutton-bg-checked);--after-background-color:var(--ath-color-radiobutton-bg-default)}:host .ath-radiobutton--read-only{cursor:not-allowed;--background:var(--ath-color-radiobutton-bg-readonly);--border:1px solid var(--ath-color-radiobutton-border-readonly);--color:var(--ath-color-fg-default)}:host .ath-radiobutton--read-only .ath-radiobutton-item{cursor:not-allowed}:host .ath-radiobutton--read-only .ath-input__label{cursor:not-allowed}:host .ath-radiobutton--read-only.ath-radiobutton--checked{--background:var(--ath-color-radiobutton-bg-readonly);--border:1px solid var(--ath-color-radiobutton-border-readonly);--after-background-color:var(--ath-color-radiobutton-bg-checked)}:host .ath-radiobutton--read-only.ath-radiobutton--checked .ath-radiobutton-item{cursor:not-allowed}:host .ath-radiobutton--read-only.ath-radiobutton--checked .ath-input__label{cursor:not-allowed}:host .ath-radiobutton--disabled{cursor:not-allowed;--background:var(--ath-color-radiobutton-bg-disabled-default);--border:1px solid var(--ath-color-radiobutton-border-disabled);--color:var(--ath-color-text---disabled, var(--ath-color-fg-disabled))}:host .ath-radiobutton--disabled .ath-radiobutton-item{cursor:not-allowed}:host .ath-radiobutton--disabled .ath-input__label{cursor:not-allowed}:host .ath-radiobutton--checked.ath-radiobutton--disabled{--border:none;--after-box-shadow:0px 0px 0px 7px var(--ath-color-radiobutton-bg-disabled-checked);--after-background-color:var(--ath-color-radiobutton-indicator-disabled)}:host .ath-radiobutton--checked.ath-radiobutton--disabled .ath-radiobutton-item{cursor:not-allowed}:host .ath-radiobutton{display:flex;align-items:flex-start;gap:var(--ath-spacing-radiobutton-col-gap);align-self:stretch}:host .ath-radiobutton:focus-visible{border:none;outline:none}:host .ath-radiobutton-item{height:var(--ath-sizing-radiobutton-height);width:var(--ath-sizing-radiobutton-width);max-height:var(--ath-sizing-radiobutton-height);max-width:var(--ath-sizing-radiobutton-width);min-height:var(--ath-sizing-radiobutton-height);min-width:var(--ath-sizing-radiobutton-width);border-radius:var(--ath-border-radius-radiobutton);box-sizing:border-box;cursor:pointer;background:var(--background);border:var(--border)}:host .ath-radiobutton-item:focus-visible{outline:none;box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}:host .ath-radiobutton{position:relative}:host .ath-radiobutton-item::after{position:absolute;top:12px;left:12px;transform:translate(-50%, -50%);content:\"\";width:10px;max-width:10px;height:10px;max-height:10px;border-radius:100%;background-color:var(--after-background-color);box-shadow:var(--after-box-shadow)}:host .ath-radiobutton .ath-input__label{color:var(--color);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-label);font-style:normal;font-weight:var(--font-weight);line-height:var(--ath-font-line-height-input-label)}";

let radioButtonSequence = 0;
const AthRadioButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        this.athChange = createEvent(this, "athChange", 7);
    }
    radioButtonId = `radio-button-${++radioButtonSequence}`;
    /**
     * Indicates if it is checked by default
     */
    checked = false;
    /**
     * Indicates if it is disabled
     */
    disabled = false;
    /**
     * Label text
     */
    label;
    /**
     * Indicates the name of the radioButton
     */
    name;
    /**
     * Indicates if it is read-only
     */
    readonly = false;
    /**
     * Indicates the value of the radioButton
     */
    value;
    // ACCESIBILIDAD
    /**
     * Accessible text (aria-label)
     */
    ariaLabel;
    // EVENTOS
    /**
     * Emitted when the radio-button receives focus
     */
    athFocus;
    /**
     * Emitted when the radio-button loses focus
     */
    athBlur;
    /**
     * Emitted when there is a change in the input state
     */
    athChange;
    async unCheck() {
        this.checked = false;
    }
    async setFocus() {
        this.elRadioButton.focus();
        this.handleClick();
    }
    async setTabindex(tabIndex) {
        this.tabIndex = tabIndex;
    }
    elRadioButton;
    tabIndex;
    componentWillLoad() {
        this.tabIndex = this.checked ? 0 : -1;
    }
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    handleClick = () => {
        if (!this.disabled && !this.readonly && !this.checked) {
            this.checked = true;
            this.tabIndex = 0;
            this.handleChange();
        }
    };
    handleChange = () => {
        const detail = {
            checked: this.checked,
            value: this.value,
        };
        this.athChange.emit(detail);
    };
    handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleClick();
        }
    }
    getLabelProps = () => ({
        htmlForId: this.radioButtonId,
        label: this.label,
    });
    getInputClassNames = () => ({
        'ath-radiobutton': true,
        'ath-radiobutton--read-only': this.readonly && !this.disabled,
        'ath-radiobutton--checked': this.checked,
        'ath-radiobutton--disabled': this.disabled,
    });
    getAriaAttributes() {
        return {
            'role': 'radio',
            'aria-disabled': this.disabled ? 'true' : 'false',
            'aria-label': this.ariaLabel ? this.ariaLabel : this.label,
            'aria-checked': this.checked ? 'true' : 'false',
            'ref': (el) => (this.elRadioButton = el),
        };
    }
    getActionAttributes() {
        return {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onClick: this.handleClick,
            onKeyDown: event => this.handleKeyDown(event),
        };
    }
    renderRadio = () => {
        const ariaAttributes = this.getAriaAttributes();
        const actionAttributes = this.getActionAttributes();
        const labelProps = this.getLabelProps();
        return (h("div", { class: this.getInputClassNames() }, h("span", { tabindex: this.disabled ? -1 : this.tabIndex, ...ariaAttributes, class: "ath-radiobutton-item", id: this.radioButtonId, ...actionAttributes }), !!this.label && (h("span", { onClick: this.handleClick }, h(FcInputLabel, { ...labelProps })))));
    };
    render() {
        return h(Host, { key: '86a19d18eee5481665a5b1b093557f21aed6fa46' }, " ", this.renderRadio(), " ");
    }
};
AthRadioButton.style = radioButtonCss;

export { AthRadioButton as ath_radio_button };
//# sourceMappingURL=ath-radio-button.entry.esm.js.map
