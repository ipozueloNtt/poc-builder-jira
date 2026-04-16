import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import './index-8mh0qKYc.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

var FeedbackTypes;
(function (FeedbackTypes) {
    FeedbackTypes["None"] = "none";
    FeedbackTypes["Error"] = "error";
    FeedbackTypes["Success"] = "success";
})(FeedbackTypes || (FeedbackTypes = {}));
var OrientationTypes;
(function (OrientationTypes) {
    OrientationTypes["Vertical"] = "vertical";
    OrientationTypes["Horizontal"] = "horizontal";
})(OrientationTypes || (OrientationTypes = {}));

const radioButtonGroupCss = ":host{width:100%;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary)}:host .ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}:host .ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}:host .ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}:host .padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}:host .ath-input__label{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}:host .ath-input__label__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}:host .ath-input__label ath-icon{color:var(--ath-color-fg-default)}:host .ath-input__label .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}:host .ath-input__label ath-button{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}:host .ath-radiobutton-group{width:100%;display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-between-100);border:none;margin:0;padding:0}:host .ath-radiobutton-group .ath-radiobutton__group{width:100%;display:flex;align-items:flex-start;flex-direction:column;gap:var(--ath-spacing-radiobutton-group-row-gap);align-self:stretch}:host .ath-radiobutton-group .ath-radiobutton__group-horizontal{flex-direction:row;gap:var(--ath-spacing-between-300)}:host .ath-radiobutton-group .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}";

let radioButtonGroupSequence = 0;
const AthRadioButtonGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChangeValue = createEvent(this, "athChangeValue", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    hostId = `radio-button-group-${++radioButtonGroupSequence}`;
    labelId = `${this.hostId}-label`;
    helperTextId = `${this.hostId}-helper-text`;
    feedbackId = `${this.hostId}-feedback`;
    srOnlyId = `${this.hostId}-sr-only`;
    initialValue;
    index = 0;
    get el() { return getElement(this); }
    internals;
    /**
     * Indicates whether the group is disabled
     */
    disabled = false;
    /**
     * Indicates the Feedback type
     */
    feedback = FeedbackTypes.None;
    /**
     * Feedback text to be displayed
     */
    feedbackText;
    /**
     * Helper text to be displayed
     */
    helperText;
    /**
     * Label text
     */
    label;
    /**
     * Name attribute to apply to the whole group
     */
    name;
    /**
     * Indicates the orientation of the group
     */
    orientation = OrientationTypes.Vertical;
    /**
     * Indicates whether the group is read-only
     */
    readonly = false;
    /**
     * Indicates whether to show the asterisk
     */
    showRequired = false;
    /**
     * Tooltip text
     */
    tooltipText;
    /**
     * Tooltip width
     */
    tooltipWidth = 0;
    /**
     * Set the value to select the checked ath-radio-button
     */
    value;
    watchValue(newValue) {
        this.checkRadioByValue(newValue);
    }
    // ACCESSIBILITY
    /**
     * Accessible name for the group
     */
    ariaLabel;
    /**
     * Screen-reader-only text indicating the group is required
     */
    requiredAriaLabel;
    //EVENTS
    /*
     * Emitted when any radio button changes its value
     */
    athChangeValue;
    handleNavigation(event) {
        const eventKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
        if (eventKeys.includes(event.key)) {
            event.preventDefault();
            const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button'));
            const totalButtons = radioButtons.length;
            let nextIndex = this.index;
            if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
                nextIndex = this.getNextIndex(radioButtons, nextIndex, -1, totalButtons);
            }
            else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
                nextIndex = this.getNextIndex(radioButtons, nextIndex, 1, totalButtons);
            }
            else if (event.key === 'Home') {
                nextIndex = this.getNextIndex(radioButtons, -1, 1, totalButtons);
            }
            else if (event.key === 'End') {
                nextIndex = this.getNextIndex(radioButtons, 1, -1, totalButtons);
            }
            this.index = nextIndex;
            const nextRadioButton = radioButtons[nextIndex];
            if (typeof nextRadioButton.setFocus === 'function') {
                nextRadioButton.setFocus();
            }
        }
    }
    handleValueChange(event) {
        const target = event.target;
        this.checkRadioByValue(target.value);
        this.athChangeValue.emit(event.detail.value);
    }
    componentDidLoad() {
        this.spreadProperties();
        if (this.value) {
            this.checkRadioByValue(this.value);
        }
        else {
            this.checkChecked();
        }
    }
    componentWillLoad() {
        this.initialValue = this.value;
    }
    formResetCallback() {
        this.value = this.initialValue;
        this.index = 0;
        this.checkRadioByValue(this.initialValue);
    }
    checkRadioByValue(value) {
        const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button'));
        const index = radioButtons.findIndex(radio => radio.value === value);
        if (index > -1) {
            const radioButton = radioButtons[index];
            this.uncheck(radioButton);
            radioButton.setTabindex(0);
            radioButton.setFocus();
        }
        else {
            this.uncheck(null);
            this.setFocusFirstActiveRadio();
            this.athChangeValue.emit(value);
        }
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(value);
            this.internals.checkValidity();
        }
    }
    getNextIndex = (radioButtons, currentIndex, direction, totalButtons) => {
        let newIndex = (currentIndex + direction + totalButtons) % totalButtons;
        while (radioButtons[newIndex].disabled) {
            newIndex = (newIndex + direction + totalButtons) % totalButtons;
        }
        return newIndex;
    };
    uncheck(activeRadioButton) {
        const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button'));
        radioButtons.forEach(item => {
            const radioButtonElement = item;
            if (item !== activeRadioButton && radioButtonElement.checked) {
                radioButtonElement.unCheck();
                radioButtonElement.setTabindex(-1);
            }
        });
    }
    ariaDescribedBy = () => {
        const descriptions = {};
        if (this.helperText != undefined)
            descriptions[this.helperTextId] = this.helperTextId;
        if (this.feedback != FeedbackTypes.None)
            descriptions[this.feedbackId] = this.feedbackId;
        return descriptions;
    };
    getAttributesGroup() {
        const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ');
        const ariaLabelledByIds = this.showRequired ? `${this.labelId} ${this.srOnlyId}` : this.labelId;
        return {
            'role': 'radiogroup',
            'id': this.hostId,
            'name': this.name,
            'aria-label': this.ariaLabel,
            'aria-labelledby': ariaLabelledByIds,
            'aria-describedby': describedByIds,
            'aria-invalid': this.feedback === FeedbackTypes.Error ? 'true' : undefined,
            'aria-required': this.showRequired ? 'true' : undefined,
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
    getLabelProps = () => ({
        id: this.labelId,
        htmlForId: undefined,
        label: this.label,
        required: this.showRequired,
        showRequired: this.showRequired,
        tooltipText: this.tooltipText,
        tooltipWidth: this.tooltipWidth,
    });
    checkChecked() {
        const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button'));
        let firstChecked = false;
        radioButtons.forEach((radioButtonElement, index) => {
            if (radioButtonElement.checked && !firstChecked && !radioButtonElement.disabled) {
                firstChecked = true;
                this.index = index;
                this.value = radioButtonElement.value;
            }
        });
        if (!firstChecked) {
            this.setFocusFirstActiveRadio();
        }
    }
    setFocusFirstActiveRadio() {
        const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button'));
        const firstEnabledIndex = radioButtons.findIndex(rb => !rb.disabled);
        if (firstEnabledIndex !== -1) {
            const firstEnabled = radioButtons[firstEnabledIndex];
            firstEnabled.setTabindex(0);
            this.index = firstEnabledIndex;
        }
    }
    /**
     * Propagate attributes from parent to children.
     * Set boolean attributes only for true.
     */
    spreadProperties() {
        const radioButtons = this.el.querySelectorAll('ath-radio-button');
        radioButtons.forEach(radioButton => {
            const radioButtonElement = radioButton;
            if (this.readonly) {
                radioButtonElement.readonly = true;
            }
            if (this.disabled) {
                radioButtonElement.disabled = true;
            }
            if (this.name !== undefined) {
                radioButtonElement.name = this.name;
            }
        });
    }
    getGroupClassNames = () => ({
        'ath-radiobutton__group': true,
        [`ath-radiobutton__group-${this.orientation}`]: true,
    });
    render() {
        const ariaAttributes = this.getAttributesGroup();
        const labelProps = this.getLabelProps();
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        return (h(Host, { key: '668fbbf5bc3d5ac724c8a59b5c7d8f470c8249ed' }, h("fieldset", { key: 'b137ab8fd72c30b03018b0b92540837aa95ec28a', class: "ath-radiobutton-group", ...ariaAttributes }, !!this.label && h(FcInputLabel, { key: 'b49dcc6e5f4a1e8855cc010322d4a812186ec492', ...labelProps }), this.showRequired && (h("div", { key: 'e5f6add18fa1006a758e754f095d01ebce95a127', id: this.srOnlyId, class: "sr-only" }, this.requiredAriaLabel)), h("div", { key: '0456569f21638ef8a1e6f032983483c21e3b5ab0', class: this.getGroupClassNames() }, h("slot", { key: 'bc1dfc83bbad43fcc34d2ddf07b6cc51238b2bae' })), !!this.helperText && h(FcInputHelperText, { key: 'f0a7891dbcd9c9d655b8184adfdf4f6159350589', ...helperTextProps }), this.feedback === 'error' && !this.disabled && !this.readonly && h(FcInputFeedback, { key: '0d67f141cb0ca5467af518d8644bf558adb7c7df', ...feedbackProps }))));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["watchValue"]
    }; }
};
AthRadioButtonGroup.style = radioButtonGroupCss;

export { AthRadioButtonGroup as ath_radio_button_group };
//# sourceMappingURL=ath-radio-button-group.entry.esm.js.map
