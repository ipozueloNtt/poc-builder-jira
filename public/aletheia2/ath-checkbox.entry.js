import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { C as CheckboxValue, F as FeedbackType, a as CheckIconValue } from './checkbox.model-DynFLFRk.js';
import './index-8mh0qKYc.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const checkboxCss = ":host{--background:var(--ath-color-checkbox-bg-default);--border:1px solid var(--ath-color-checkbox-border-default);--font-weight-label:var(--ath-font-weight-regular)}:host .ath-checkbox--checked{--border:1px solid var(--ath-color-checkbox-border-checked);--background:var(--ath-color-checkbox-bg-checked);--ico-color:var(--ath-color-checkbox-icon-default);--font-weight-label:var(--ath-font-weight-medium)}:host .ath-checkbox--checked.ath-checkbox--disabled{--color:var(--ath-color-fg-disabled);--border:1px solid var(--ath-color-border-alpha-disabled);--background:var(--ath-color-bg-alpha-boldest-disabled);--color:var(--ath-color-fg-disabled)}:host .ath-checkbox--checked.ath-checkbox--read-only{--border:1px solid var(--ath-color-checkbox-border-readonly);--background:var(--ath-color-checkbox-bg-readonly);--ico-color:var(--ath-color-checkbox-icon-readonly);cursor:not-allowed}:host .ath-checkbox--indeterminate{--font-weight-label:var(--ath-font-weight-checkbox-indeterminated);--border:1px solid var(--ath-color-checkbox-border-indeterminated);--background:var(--ath-color-checkbox-bg-indeterminated);--ico-color:var(--ath-color-checkbox-icon-default)}:host .ath-checkbox--indeterminate.ath-checkbox--disabled{--color:var(--ath-color-fg-disabled);--border:1px solid var(--ath-color-border-alpha-disabled);--background:var(--ath-color-bg-alpha-boldest-disabled);--color:var(--ath-color-fg-disabled)}:host .ath-checkbox--indeterminate.ath-checkbox--read-only{--border:1px solid var(--ath-color-checkbox-border-readonly);--background:var(--ath-color-checkbox-bg-readonly);--ico-color:var(--ath-color-checkbox-icon-readonly);cursor:not-allowed}:host .ath-checkbox--disabled{--color:var(--ath-color-fg-disabled);--border:1px solid var(--ath-color-border-alpha-boldest-disabled);--background:var(--ath-color-bg-alpha-disabled)}:host .ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}:host .ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}:host .ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}:host .padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}:host .ath-checkbox .ath-input__label__wrapper{cursor:pointer}:host .ath-checkbox:focus-within .ath-checkbox-indicator{outline:none;box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}:host .ath-checkbox{display:flex;align-items:flex-start;gap:var(--ath-spacing-between-100);color:var(--ath-color-fg-default);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-label);font-style:normal;font-weight:var(--font-weight-label);line-height:var(--ath-font-line-height-input-label);cursor:pointer;transition:background 0.5s}:host .ath-checkbox--read-only{cursor:not-allowed}:host .ath-checkbox--read-only .ath-input__label__wrapper{cursor:not-allowed}:host .ath-checkbox--disabled{cursor:not-allowed}:host .ath-checkbox--disabled .ath-input__label__wrapper{cursor:not-allowed;color:var(--ath-color-fg-disabled)}:host .ath-checkbox:focus{outline:none}:host .ath-checkbox-indicator{display:flex;align-items:center;justify-content:center;position:relative;margin:0px;box-sizing:border-box;min-height:var(--ath-sizing-checkbox-box-height);min-width:var(--ath-sizing-checkbox-box-width);max-height:var(--ath-sizing-checkbox-box-height);max-width:var(--ath-sizing-checkbox-box-width);border-radius:var(--ath-border-radius-checkbox);border:var(--border);background:var(--background);color:var(--ico-color)}:host .ath-checkbox-indicator svg{flex-shrink:0}:host .ath-checkbox__wrapper{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-checkbox-addons-row-gap);align-self:stretch}:host .ath-checkbox__wrapper .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}";

let checkboxSequence = 0;
const AthCheckBox = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        this.athChange = createEvent(this, "athChange", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    checkboxId = `checkbox-${++checkboxSequence}`;
    helperTextId = `${this.checkboxId}-helper-text`;
    feedbackId = `${this.checkboxId}-feedback`;
    /**
     * Name of the checkbox (necessary for forms)
     */
    name;
    /**
     * Value of the checkbox
     */
    value = CheckboxValue.False;
    /**
     * If the checkbox is checked by default
     */
    checked = false;
    /**
     * If the checkbox is indeterminate by default
     */
    indeterminate = false;
    /**
     * If it is disabled
     */
    disabled = false;
    /**
     * If it is required
     */
    required = false;
    /**
     * If the required character is shown in the label
     */
    hideRequired = false;
    /**
     * Label of the checkbox
     */
    label;
    /**
     * Accessible text when there is no visible label
     */
    ariaLabel;
    /**
     * Text below the checkbox (helper text)
     */
    helperText;
    /**
     * Type of feedback
     */
    feedback = FeedbackType.None;
    /**
     * Text of the feedback
     */
    feedbackText;
    /**
     * If it is read-only
     */
    readonly = false;
    /**
     * If the element is focused
     */
    autofocus = false;
    /**
     * Emitted when the checkbox gains focus
     */
    athFocus;
    /**
     * Emitted when the checkbox loses focus
     */
    athBlur;
    /**
     * Emitted when the checkbox change
     */
    athChange;
    watchValue(value) {
        this.setInputValue(value);
    }
    async setFocus() {
        if (!this.disabled) {
            const checkboxDiv = this.el.shadowRoot.querySelector('.ath-checkbox');
            checkboxDiv.focus();
        }
    }
    get el() { return getElement(this); }
    internals;
    elInput;
    initialValue;
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        requestAnimationFrame(() => {
            if (!this.el.contains(document.activeElement)) {
                this.athBlur.emit();
            }
        });
    };
    handleClick = () => {
        if (!this.disabled && !this.readonly) {
            this.toggleChecked();
            this.emitChangeEvent();
        }
        this.setFocus();
    };
    emitChangeEvent() {
        const selectedCheckboxEventDetail = {
            label: this.label,
            name: this.name,
            value: this.value,
        };
        this.athChange.emit(selectedCheckboxEventDetail);
    }
    toggleChecked() {
        this.value = this.value === CheckboxValue.True ? CheckboxValue.False : CheckboxValue.True;
    }
    handleKeyDown(event) {
        if (!this.readonly && (event.key === ' ' || event.key === 'Enter')) {
            event.preventDefault();
            this.handleClick();
        }
    }
    getLabelProps = () => ({
        htmlForId: this.checkboxId,
        label: this.label,
        required: this.required,
        showRequired: !this.hideRequired,
    });
    getInputClassNames = () => ({
        'ath-checkbox': true,
        'ath-checkbox--read-only': this.readonly && !this.disabled,
        'ath-checkbox--checked': this.value === CheckboxValue.True,
        'ath-checkbox--indeterminate': this.value === CheckboxValue.Indeterminate,
        'ath-checkbox--disabled': this.disabled,
    });
    getAriaAttributes() {
        const ariaDescribedBy = [];
        if (!!this.helperText) {
            ariaDescribedBy.push(this.helperTextId);
        }
        if (this.feedback !== FeedbackType.None) {
            ariaDescribedBy.push(this.feedbackId);
        }
        return {
            'aria-label': !!this.ariaLabel ? this.ariaLabel : undefined,
            'aria-disabled': this.disabled ? 'true' : 'false',
            'aria-required': this.required ? 'true' : 'false',
            'aria-invalid': this.feedback === FeedbackType.Error ? 'true' : undefined,
            'aria-describedby': ariaDescribedBy.join(' '),
            'aria-checked': this.value === CheckboxValue.Indeterminate ? 'mixed' : this.value,
        };
    }
    getActionAttributes() {
        return {
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onKeyDown: event => this.handleKeyDown(event),
            onClick: this.handleClick,
        };
    }
    getFeedbackProps = () => ({
        id: this.feedbackId,
        type: this.feedback,
        text: this.feedbackText,
    });
    getHelperTextProps = () => {
        return {
            id: this.helperTextId,
            text: !!this.helperText ? this.helperText.trim() : '',
        };
    };
    checkValue() {
        if (this.value == CheckboxValue.True) {
            return CheckIconValue.Check;
        }
        else if (this.value == CheckboxValue.Indeterminate) {
            return CheckIconValue.Indeterminate;
        }
    }
    setInputValue(value) {
        const inputValue = value || 'false';
        if (this.elInput) {
            this.elInput.indeterminate = false;
            this.elInput.checked = false;
            if (inputValue === CheckboxValue.True) {
                this.elInput.checked = true;
            }
            else if (inputValue === CheckboxValue.Indeterminate) {
                this.elInput.indeterminate = true;
            }
        }
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(inputValue);
            this.internals.checkValidity();
        }
    }
    componentWillLoad() {
        if (this.checked)
            this.value = CheckboxValue.True;
        if (this.indeterminate)
            this.value = CheckboxValue.Indeterminate;
    }
    componentDidLoad() {
        this.initialValue = this.value;
        this.setInputValue(this.value);
        if (!!this.autofocus) {
            this.setFocus();
        }
    }
    formResetCallback() {
        this.value = this.initialValue;
        this.setInputValue(this.initialValue);
        this.emitChangeEvent();
    }
    render() {
        const ariaAttributes = this.getAriaAttributes();
        const actionAttributes = this.getActionAttributes();
        const labelProps = this.getLabelProps();
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        return (h(Host, { key: '4b8d266f222098198ea1fbe9889a03fe4f19749b' }, h("div", { key: 'e04228e227ac28e5b3c84389fbbb9c512a9a4f83', role: "checkbox", class: this.getInputClassNames(), ...actionAttributes, ...ariaAttributes, tabindex: !!this.disabled ? '-1' : '0' }, h("div", { key: 'dac561ab0608d6e52a1ff92e41e1f4ccdbe8b4b2', class: "ath-checkbox-indicator", id: this.checkboxId, innerHTML: this.checkValue(), tabindex: "-1" }), h("div", { key: '5fbfc53b27ee57cba16bc13816bb2f24186c4420', class: "ath-checkbox__wrapper" }, h("input", { key: 'b7f3292bf6606dc3093424ff3342394ae344f8a1', ref: el => (this.elInput = el), type: "hidden", name: this.name, value: this.value, disabled: this.disabled }), !!this.label && h(FcInputLabel, { key: '328bc4ffec2c2eb53e893e68cd5b565db86590f0', ...labelProps }), !!this.helperText && h(FcInputHelperText, { key: '913b023493ddc2b0f02b77843d7663ecb042676c', ...helperTextProps }), this.feedback === 'error' && !this.disabled && !this.readonly && h(FcInputFeedback, { key: 'e68f5f562d2c455d545a73915f50fc1025d7fec6', ...feedbackProps })))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["watchValue"]
    }; }
};
AthCheckBox.style = checkboxCss;

export { AthCheckBox as ath_checkbox };
//# sourceMappingURL=ath-checkbox.entry.esm.js.map
