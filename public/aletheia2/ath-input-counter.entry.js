import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import './index-DLEKXOBo.js';
import { a as FcInputElement } from './index-8mh0qKYc.js';
import { t as transformIconSize, a as IconType } from './types-Dwt0hPp9.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const InputCounterFeedbackTypes = {
    Error: 'error',
    None: 'none',
};
const InputCounterSizes = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
};

const inputCounterCss = ":host .ath-input__field--size-sm{--input-padding-x:var(--ath-spacing-input-field-padding-x-sm);--input-padding-y:var(--ath-spacing-input-field-padding-y-sm)}:host .ath-input__field--size-md{--input-padding-x:var(--ath-spacing-input-field-padding-x-md);--input-padding-y:var(--ath-spacing-input-field-padding-y-md)}:host .ath-input__field--size-lg{--input-padding-x:var(--ath-spacing-input-field-padding-x-lg);--input-padding-y:var(--ath-spacing-input-field-padding-y-lg)}:host .ath-button_comp--size-xs{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-sm{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-md{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-lg{--button-padding:var(--ath-spacing-button-padding-around-sm)}:host{display:inline-block;font-family:var(--font-family);width:100%}:host .ath-input{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;flex-wrap:wrap;row-gap:var(--ath-spacing-input-row-gap);width:100%}:host .wrapper{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-addons-row-gap);align-self:stretch;width:100%}:host .ath-input .ath-input__field{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:var(--ath-spacing-input-field-col-gap);align-self:stretch;border:1px solid var(--ath-color-input-border-default);border-radius:var(--input-border-radius);background:var(--ath-color-input-bg-default);padding:calc(var(--input-padding-y) - 1px) calc(var(--input-padding-x) - 1px)}:host .ath-input .ath-input__field:focus-within:not(:has(>button:focus)){box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset;border:1px solid transparent;border-radius:var(--input-border-radius)}:host .ath-input .ath-input__field--error{border-color:var(--ath-color-border-danger-default)}:host .ath-input .ath-input__field--success{border-color:var(--ath-color-border-success-default)}:host .ath-input .ath-input__field--warning{border-color:var(--ath-color-border-warning-default)}:host .ath-input .ath-input__field--readonly{border:1px solid transparent;position:relative;background:none}:host .ath-input .ath-input__field--readonly::after{content:\"\";position:absolute;bottom:1px;width:100%;height:1px;background-color:var(--ath-color-input-border-default)}:host .ath-input .ath-input__field--readonly{border-radius:var(--ath-border-radius-input-readonly)}:host .ath-input .ath-input__field--readonly:focus-within{border:1px solid transparent}:host .ath-input .ath-input__field--readonly:focus-within::after{background-color:transparent}:host .ath-input .ath-input__field--readonly .ath-input__text--value{color:var(--ath-color-fg-default)}:host .ath-input .ath-input__field--disabled{background:var(--ath-color-bg-alpha-disabled);border-color:var(--ath-color-border-alpha-disabled)}:host .ath-input__text--value{flex:1 0 0;overflow:hidden;color:var(--ath-color-fg-default);text-overflow:ellipsis;font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-regular);font-size:var(--ath-font-size-input-text);line-height:var(--ath-font-line-height-input-text);border:none;width:100%;background-color:transparent;padding:0px var(--ath-spacing-input-text-padding-x)}:host .ath-input__text--value:focus{outline:1px solid transparent;border:none}:host .ath-input--unit{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-text);font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-input-text)}:host .ath-input--unit--disabled{color:var(--ath-color-fg-disabled)}:host input[type=password]::-ms-reveal,:host input[type=password]::-ms-clear{display:none}:host input::-webkit-outer-spin-button,:host input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}:host input[type=number]{-moz-appearance:textfield;appearance:textfield}:host .ath-visibility-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host .ath-button_comp{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}:host .ath-button_comp:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}:host .ath-button_comp:hover{background:var(--ath-color-bg-alpha-hovered)}:host .ath-button_comp:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}:host .ath-button_comp--disabled{pointer-events:none;color:var(--ath-color-button-icon-disabled)}:host .ath-input__label{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}:host .ath-input__label__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}:host .ath-input__label ath-icon{color:var(--ath-color-fg-default)}:host .ath-input__label .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}:host .ath-input__label ath-button{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}:host .ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}:host .ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}:host .ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}:host .padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}:host{--input-border-radius:var(--ath-border-radius-input-default)}:host .ath-input-counter{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-row-gap)}:host .ath-input-counter__wrapper{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-addons-row-gap);align-self:stretch}:host .ath-input-counter__counter{display:flex;align-items:center;gap:var(--ath-spacing-input-counter-col-gap);align-self:stretch}";

let inputCounterSequence = 0;
const AthInputCounter = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        this.athChange = createEvent(this, "athChange", 7);
        this.athInput = createEvent(this, "athInput", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    inputId = `ath-input-count-${inputCounterSequence++}`;
    labelId = `${this.inputId}-label`;
    inputHintId = `${this.inputId}-hint`;
    inputFeedbackId = `${this.inputId}-feedback`;
    inputEl;
    initialValue;
    get el() { return getElement(this); }
    internals;
    /**
     * If true, the controls are not visible.
     */
    hideControls = false;
    /**
     * If true, the user cannot interact with the input.
     */
    disabled = false;
    /**
     * The type of the feedback. If 'error' the error feedback will be shown.
     */
    feedback = InputCounterFeedbackTypes.None;
    /**
     * The message for the feedback.
     */
    feedbackText;
    /**
     * Message to help the user fill the input value.
     */
    helperText;
    /**
     * The aria-label attribute of the input.
     */
    inputAriaLabel;
    /**
     * Represents the caption of the input.
     */
    label;
    /**
     * Represents the maximum number of the input.
     */
    max;
    /**
     * Represents the minimum number of the input.
     */
    min;
    /**
     * The name of the input. Submitted with the form as part of a name/value pair.
     */
    name;
    /**
     * Instructional text that shows before the input has a value.
     */
    placeholder;
    /**
     * If true, the user cannot modify the value.
     */
    readonly = false;
    /**
     * If true, the user must fill in a value before submitting a form.
     */
    required = false;
    /**
     * If true, the * asterisk will be hidden when the input is required.
     */
    hideRequired = false;
    /**
     * Specifies the size of the input.
     */
    size = InputCounterSizes.Medium;
    /**
     * Specifies the interval between legal numbers in an <input> element.
     */
    step = 1;
    /**
     * Specifies text for tooltip.
     */
    tooltipText;
    /**
     * Specifies width for tooltip.
     */
    tooltipWidth;
    /**
     * Specifies the unit for the input.
     */
    unit;
    /**
     * Specifies the accesible unit for the input.
     */
    unitAriaLabel;
    /**
     * Current value of the form control. Submitted with the form as part of a name/value pair.
     */
    value;
    /**
     * Emitted when the input gains focus.
     */
    athFocus;
    /**
     * Emitted when the input loses focus.
     */
    athBlur;
    /**
     * Emitted when the value has changed.
     * This event doesn't fire until the control loses focus.
     */
    athChange;
    /**
     * Emitted every time the value is updated by introducing a change.
     */
    athInput;
    watchDisabled() {
        this.updateReadonly();
    }
    updateValue() {
        this.value = this.value ?? '';
        if (this.inputEl && this.value !== this.inputEl.value) {
            this.inputEl.value = this.value || '';
            this.setInputValue(this.value);
        }
    }
    componentDidLoad() {
        this.setInputValue(this.value);
        this.inputEl.value = this.value;
    }
    componentWillLoad() {
        this.updateReadonly();
        this.value = this.value ?? '';
        this.initialValue = this.value;
    }
    formResetCallback() {
        this.value = this.initialValue;
        this.setInputValue(this.initialValue);
        this.handleInput();
    }
    setInputValue(value) {
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(value);
            this.internals.checkValidity();
        }
    }
    updateReadonly() {
        if (this.disabled) {
            this.readonly = false;
        }
    }
    handleDown = () => this.setValue(this.getPreviousValue());
    handleUp = () => this.setValue(this.getNextValue());
    setValue(value) {
        this.value = value;
        this.inputEl.value = this.value;
        this.athInput.emit(this.value);
        this.athChange.emit(this.value);
    }
    getPreviousValue = () => {
        if (+this.value > this.max) {
            return this.max.toString();
        }
        const rest = (+this.value - (this.min || 0)) % this.step;
        const previous = +this.value - (rest === 0 ? this.step : rest);
        const value = previous < this.min ? this.min : previous;
        return value.toString();
    };
    getNextValue = () => {
        if (+this.value < this.min) {
            return this.min.toString();
        }
        const rest = (+this.value - (this.min || 0)) % this.step;
        const next = +this.value + (this.step - rest);
        const value = next > this.max ? +this.value : next < this.min ? this.min : next;
        return value.toString();
    };
    getInputProps = () => ({
        inputId: this.inputId,
        type: 'number',
        name: this.name,
        placeholder: this.placeholder,
        value: this.value,
        required: this.required,
        disabled: this.disabled,
        readonly: this.readonly,
        min: this.min,
        max: this.max,
        step: this.step,
        inputAriaLabel: this.inputAriaLabel,
        labelId: this.labelId,
        helperText: this.helperText,
        feedback: this.feedback === InputCounterFeedbackTypes.None ? undefined : this.feedback,
        feedbackText: this.feedbackText,
        size: this.size,
        unit: this.unit,
        unitAriaLabel: this.unitAriaLabel,
        onInput: () => this.handleInput(),
        onFocus: () => this.handleFocus(),
        onBlur: () => this.handleBlur(),
        onChange: () => this.handleChange(),
        onInputRef: (el) => (this.inputEl = el),
    });
    handleInput = () => {
        this.value = this.inputEl.value;
        this.athInput.emit(this.value.toString());
    };
    handleChange = () => {
        this.athChange.emit(this.inputEl.value);
    };
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    getLabelProps = () => ({
        id: this.labelId,
        htmlForId: this.inputId,
        label: this.label,
        required: this.required,
        showRequired: !this.hideRequired,
        tooltipText: this.tooltipText,
        tooltipWidth: this.tooltipWidth,
    });
    getHelperTextProps = () => {
        return {
            id: this.inputHintId,
            text: !!this.helperText ? this.helperText.trim() : '',
        };
    };
    getFeedbackProps = () => ({
        id: this.inputFeedbackId,
        type: this.feedback,
        text: this.feedbackText,
    });
    handleButtonClick = type => {
        if (!this.disabled && !this.readonly) {
            if (this.value === '' || this.value === undefined)
                this.value = '0';
            if (type === 'add') {
                this.handleUp();
            }
            else {
                this.handleDown();
            }
        }
    };
    renderButton = icon => {
        const size = transformIconSize(IconType.Input, this.size);
        let actionDisabled = false;
        const disabled = this.disabled || this.readonly;
        if (icon === 'add' && this.max && +this.value >= this.max) {
            actionDisabled = true;
        }
        else if (icon === 'remove' && (this.min || this.min == 0) && +this.value <= this.min) {
            actionDisabled = true;
        }
        return (h("ath-button", { tabindex: "-1", size: size, icon: icon, iconPosition: "icon-only", color: "secondary", disabled: disabled || actionDisabled, onClick: () => this.handleButtonClick(icon), "aria-hidden": "true", onMouseDown: (ev) => {
                ev.preventDefault();
                ev.stopPropagation();
            }, onFocus: (ev) => {
                ev.preventDefault();
            } }));
    };
    renderInput = () => {
        const labelProps = this.getLabelProps();
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        const inputProps = this.getInputProps();
        return (h("div", { class: "ath-input-counter" }, !!this.label && h(FcInputLabel, { ...labelProps }), h("div", { class: "ath-input-counter__wrapper" }, h("div", { class: "ath-input-counter__counter" }, !this.hideControls && this.renderButton('remove'), h("div", { class: "ath-input" }, h(FcInputElement, { ...inputProps })), !this.hideControls && this.renderButton('add')), !!this.helperText && h(FcInputHelperText, { ...helperTextProps }), this.feedback !== InputCounterFeedbackTypes.None && !this.disabled && !this.readonly && h(FcInputFeedback, { ...feedbackProps }))));
    };
    render() {
        return h(Host, { key: 'ca985fd8cda9089f2270d6d2deb4a3cc03f9b965' }, this.renderInput());
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["watchDisabled"],
        "value": ["updateValue"]
    }; }
};
AthInputCounter.style = inputCounterCss;

export { AthInputCounter as ath_input_counter };
//# sourceMappingURL=ath-input-counter.entry.esm.js.map
