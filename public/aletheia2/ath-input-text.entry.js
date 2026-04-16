import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { I as InputTextTypes, d as InputFeedbackTypes, e as InputIconPositions, f as InputSizes, a as FcInputElement, c as FcInputCounter } from './index-8mh0qKYc.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const inputTextCss = ":host .ath-input__field--size-sm{--input-padding-x:var(--ath-spacing-input-field-padding-x-sm);--input-padding-y:var(--ath-spacing-input-field-padding-y-sm)}:host .ath-input__field--size-md{--input-padding-x:var(--ath-spacing-input-field-padding-x-md);--input-padding-y:var(--ath-spacing-input-field-padding-y-md)}:host .ath-input__field--size-lg{--input-padding-x:var(--ath-spacing-input-field-padding-x-lg);--input-padding-y:var(--ath-spacing-input-field-padding-y-lg)}:host .ath-button_comp--size-xs{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-sm{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-md{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-lg{--button-padding:var(--ath-spacing-button-padding-around-sm)}:host{display:inline-block;font-family:var(--ath-font-family-primary);width:100%}:host .ath-input{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;flex-wrap:wrap;row-gap:var(--ath-spacing-input-row-gap);width:100%}:host .wrapper{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-addons-row-gap);align-self:stretch;width:100%}:host .ath-input .ath-input__field{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:var(--ath-spacing-input-field-col-gap);align-self:stretch;border:1px solid var(--ath-color-input-border-default);border-radius:var(--input-border-radius);background:var(--ath-color-input-bg-default);padding:calc(var(--input-padding-y) - 1px) calc(var(--input-padding-x) - 1px)}:host .ath-input .ath-input__field:focus-within:not(:has(>button:focus)){box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset;border:1px solid transparent;border-radius:var(--input-border-radius)}:host .ath-input .ath-input__field--error{border-color:var(--ath-color-border-danger-default)}:host .ath-input .ath-input__field--success{border-color:var(--ath-color-border-success-default)}:host .ath-input .ath-input__field--warning{border-color:var(--ath-color-border-warning-default)}:host .ath-input .ath-input__field--readonly{border:1px solid transparent;position:relative;background:none}:host .ath-input .ath-input__field--readonly::after{content:\"\";position:absolute;bottom:1px;width:100%;height:1px;background-color:var(--ath-color-input-border-default)}:host .ath-input .ath-input__field--readonly{border-radius:var(--ath-border-radius-input-readonly)}:host .ath-input .ath-input__field--readonly:focus-within{border:1px solid transparent}:host .ath-input .ath-input__field--readonly:focus-within::after{background-color:transparent}:host .ath-input .ath-input__field--readonly .ath-input__text--value{color:var(--ath-color-fg-default)}:host .ath-input .ath-input__field--disabled{background:var(--ath-color-bg-alpha-disabled);border-color:var(--ath-color-border-alpha-disabled)}:host .ath-input__text--value{flex:1 0 0;overflow:hidden;color:var(--ath-color-fg-default);text-overflow:ellipsis;font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-regular);font-size:var(--ath-font-size-input-text);line-height:var(--ath-font-line-height-input-text);border:none;width:100%;background-color:transparent;padding:0px var(--ath-spacing-input-text-padding-x)}:host .ath-input__text--value:focus{outline:1px solid transparent;border:none}:host .ath-input--unit{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-text);font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-input-text)}:host .ath-input--unit--disabled{color:var(--ath-color-fg-disabled)}:host input[type=password]::-ms-reveal,:host input[type=password]::-ms-clear{display:none}:host input::-webkit-outer-spin-button,:host input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}:host input[type=number]{-moz-appearance:textfield;appearance:textfield}:host .ath-visibility-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host .ath-button_comp{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}:host .ath-button_comp:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}:host .ath-button_comp:hover{background:var(--ath-color-bg-alpha-hovered)}:host .ath-button_comp:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}:host .ath-button_comp--disabled{pointer-events:none;color:var(--ath-color-button-icon-disabled)}:host .ath-input__label{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}:host .ath-input__label__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}:host .ath-input__label ath-icon{color:var(--ath-color-fg-default)}:host .ath-input__label .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}:host .ath-input__label ath-button{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}:host .ath-input__counter{display:flex;justify-content:flex-end;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);text-align:right;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-visibility-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host .ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}:host .ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}:host .ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}:host .padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}:host{--input-border-radius:var(--ath-border-radius-input-default)}:host([disabled]:not([disabled=false])) .ath-input__field,:host([readonly]:not([readonly=false])) .ath-input__field{cursor:not-allowed}:host([disabled]:not([disabled=false])) .ath-input__field input,:host([readonly]:not([readonly=false])) .ath-input__field input{cursor:not-allowed}";

let inputSequence = 0;
const AthInputText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        this.athChange = createEvent(this, "athChange", 7);
        this.athClear = createEvent(this, "athClear", 7);
        this.athInput = createEvent(this, "athInput", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    inputId = `ath-input-${inputSequence++}`;
    inputHintId;
    inputFeedbackId;
    inputEl;
    initialValue;
    get el() { return getElement(this); }
    internals;
    /**
     * The type of the input
     */
    type = InputTextTypes.Text;
    /**
     * Whether the input will be autocompleted.
     */
    autocomplete;
    /**
     * Whether the input is focused on page load.
     */
    autofocus;
    /**
     * Shows a counter
     */
    counter;
    /**
     * SThe label of the counter
     */
    counterLabel = '[length] de [max] caracteres. Quedan [rest]';
    /**
     * If true, the user cannot interact with the input.
     */
    disabled = false;
    watchDisabled() {
        this.updateReadonly();
    }
    /**
     * The aria-label attribute of the input
     */
    inputAriaLabel;
    /**
     * Set tabindex
     */
    inputTabindex = '0';
    /**
     * The type of the feedback. If 'error' the error feedback will be shown
     */
    feedback = InputFeedbackTypes.None;
    /**
     * The feedback message.
     */
    feedbackText;
    /**
     * Include a button to clear the value
     */
    hasClear = false;
    /**
     * Message to help the user fills the input value
     */
    helperText;
    /**
     * The icon name for the input's icon
     */
    icon;
    /**
     * The icon position
     */
    iconPosition = InputIconPositions.Left;
    /**
     * Represents the caption of the input
     */
    label;
    /**
     * The label and aria-label of the clear button
     */
    clearButtonAriaLabel = 'Borrar';
    /**
     * Specifies the maximum number of characters allowed in the input element
     */
    maxlength;
    /**
     * The name of the input. Submitted with the form as part of a name/value pair
     */
    name;
    /**
     * Specifies a regular expression that the input element's value is checked
     */
    pattern;
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
     * The size of the input
     */
    size = InputSizes.Medium;
    /**
     * If true, the * asterisk will be hidden when required = true.
     */
    hideRequired = false;
    /**
     * If true, submit the form when pressing Enter in the input field and the input is inside a form
     */
    submitOnEnter = false;
    /**
     * The text to be shown in the tooltip
     */
    tooltipText;
    /**
     * The max width to the text in the tooltip
     */
    tooltipWidth;
    /**
     * Current value of the form control. Submitted with the form as part of a name/value pair.
     */
    value;
    updateValue() {
        if (this.inputEl) {
            this.setInputValue(this.value);
        }
    }
    /**
     * Method to set the focus on the input element
     */
    async setFocus() {
        if (this.inputEl) {
            this.inputEl.focus();
        }
    }
    /**
     * Emitted when the input gains focus
     */
    athFocus;
    /**
     * Emitted when the input loses focus
     */
    athBlur;
    /**
     * Emitted when the value has changed.
     * This event doesn't fire until the control loses focus.
     */
    athChange;
    /**
     * Emitted when the component is cleared
     */
    athClear;
    /**
     * Emitted every time the value is updated by introducing a change
     */
    athInput;
    inputType;
    componentWillLoad() {
        this.inputHintId = `${this.inputId}-hint`;
        this.inputFeedbackId = `${this.inputId}-feedback`;
        this.inputType = this.type;
        this.validateType();
        this.updateReadonly();
    }
    componentDidLoad() {
        this.initialValue = this.value || '';
        this.setInputValue(this.initialValue);
        if (this.autofocus) {
            this.setFocus();
        }
    }
    formResetCallback() {
        this.inputEl.value = this.initialValue || '';
        this.handleInput();
        this.handleChange();
    }
    setInputValue(value) {
        const inputValue = value || '';
        if (this.inputEl.value !== inputValue) {
            this.inputEl.value = inputValue;
        }
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(inputValue);
            this.internals.checkValidity();
        }
    }
    validateType() {
        const validTypes = [InputTextTypes.Text, InputTextTypes.Password, InputTextTypes.Email, InputTextTypes.Url, InputTextTypes.Tel, InputTextTypes.Number, InputTextTypes.Search];
        if (!validTypes.includes(this.inputType)) {
            this.inputType = InputTextTypes.Text;
        }
    }
    updateReadonly() {
        if (this.disabled) {
            this.readonly = false;
        }
    }
    handleInput = () => {
        this.value = this.inputEl.value;
        this.setInputValue(this.value);
        this.athInput.emit(this.value);
        if (this.value === '') {
            this.athClear.emit();
        }
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
    handleClearButton = () => {
        this.doClear();
    };
    handleKeydown = (event) => {
        if (event.code === 'Enter') {
            this.submitOnEnter && this.internals.form && this.internals.form.requestSubmit();
        }
    };
    doClear = () => {
        this.inputEl.value = '';
        this.value = '';
        this.athClear.emit();
        this.setFocus();
    };
    getLabelProps = () => ({
        htmlForId: this.inputId,
        label: this.label,
        required: this.required,
        showRequired: !this.hideRequired,
        tooltipText: this.tooltipText,
        tooltipWidth: this.tooltipWidth,
    });
    getInputProps = () => ({
        inputId: this.inputId,
        icon: this.icon,
        iconPosition: this.iconPosition,
        type: this.type,
        autocomplete: this.autocomplete,
        name: this.name,
        pattern: this.pattern,
        placeholder: this.placeholder,
        value: this.value,
        required: this.required,
        disabled: this.disabled,
        readonly: this.readonly,
        maxlength: this.maxlength,
        inputAriaLabel: this.inputAriaLabel,
        hasButton: this.hasClear,
        buttonAriaLabel: this.clearButtonAriaLabel,
        showButtonWhenDisabled: false,
        showButtonWhenEmpty: false,
        showButtonWhenReadonly: false,
        helperText: this.helperText,
        feedback: this.feedback,
        feedbackText: this.feedbackText,
        tabindex: this.inputTabindex,
        size: this.size,
        role: this.type === InputTextTypes.Search ? 'searchbox' : undefined,
        onKeyDown: e => this.handleKeydown(e),
        onInput: () => this.handleInput(),
        onFocus: () => this.handleFocus(),
        onBlur: () => this.handleBlur(),
        onChange: () => this.handleChange(),
        onClickButton: () => this.handleClearButton(),
        onInputRef: (el) => (this.inputEl = el),
    });
    getCounterProps = () => ({
        accesibleLabel: this.counterLabel,
        value: this.value,
        maxlength: this.maxlength,
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
    isTypeText = () => this.type === InputTextTypes.Text;
    renderInput = () => {
        const labelProps = this.getLabelProps();
        const counterProps = this.getCounterProps();
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        const inputProps = this.getInputProps();
        return (h("div", { class: "ath-input" }, !!this.label && h(FcInputLabel, { ...labelProps }), h("div", { class: "wrapper" }, h(FcInputElement, { ...inputProps }), this.isTypeText() && this.counter && h(FcInputCounter, { ...counterProps }), !!this.helperText && h(FcInputHelperText, { ...helperTextProps }), this.feedback !== InputFeedbackTypes.None && !this.disabled && !this.readonly && h(FcInputFeedback, { ...feedbackProps }))));
    };
    render() {
        return h(Host, { key: 'b06218212026d70ba57c8c141fea62a18d0ad758' }, this.renderInput());
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "disabled": ["watchDisabled"],
        "value": ["updateValue"]
    }; }
};
AthInputText.style = inputTextCss;

export { AthInputText as ath_input_text };
//# sourceMappingURL=ath-input-text.entry.esm.js.map
