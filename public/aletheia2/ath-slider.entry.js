import { r as registerInstance, e as createEvent, h, d as Host } from './index-Bf9CG7gQ.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import { F as FcHelpDescription } from './index-D0VVo5qG.js';

const SliderFeedbackTypes = {
    Error: 'error',
    None: 'none',
};
const SliderTypes = {
    Default: 'default',
    Range: 'range',
};
const SliderFeedbackErrorCounterTypes = {
    None: 'none',
    From: 'from',
    To: 'to',
    Both: 'both',
};

const sliderCss = ":host .ath-slider__filler{--background-handle:var(--ath-color-slider-controller-indicator-bg-default);--background-trail:var(--ath-color-slider-controller-trail-bg-selected);--cursor:pointer;--handle-transform:translateX(-50%)}:host .ath-slider__filler--disabled{--background-handle:var(--ath-color-slider-controller-indicator-bg-disabled);--background-trail:var(--ath-color-slider-controller-trail-bg-disabled);--cursor:default}:host .ath-slider__filler--readonly{--display-handle:none;--cursor:default}:host .ath-slider__filler--range{--handle-transform:translateX(-87%)}:host .ath-slider__filler:has(.ath-slider-handle-range:active,.ath-slider-handle-range2:active):not(.ath-slider__filler--disabled,.ath-slider__filler--readonly){--background-handle:var(--ath-color-slider-controller-indicator-bg-pressed);--background-trail:var(--ath-color-slider-controller-trail-bg-pressed)}:host .ath-slider__filler:has(.ath-slider-handle-range:active,.ath-slider-handle-range2:active):not(.ath-slider__filler--disabled,.ath-slider__filler--readonly) .ath-slider-handle-range:active,:host .ath-slider__filler:has(.ath-slider-handle-range:active,.ath-slider-handle-range2:active):not(.ath-slider__filler--disabled,.ath-slider__filler--readonly) .ath-slider-handle-range2:active{transition:box-shadow 0.5s;outline:none;box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-slider-controller-indicator-bg-pressed)}:host .ath-slider__filler:has(.ath-slider-handle-range:focus,.ath-slider-handle-range2:focus):not(.ath-slider__filler--disabled,.ath-slider__filler--readonly) .ath-slider-handle-range:focus,:host .ath-slider__filler:has(.ath-slider-handle-range:focus,.ath-slider-handle-range2:focus):not(.ath-slider__filler--disabled,.ath-slider__filler--readonly) .ath-slider-handle-range2:focus{transition:box-shadow 0.5s;outline:none;box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}.ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}.ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}.ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}.padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}.ath-input__label{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}.ath-input__label__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}.ath-input__label ath-icon{color:var(--ath-color-fg-default)}.ath-input__label .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}.ath-input__label ath-button{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}._ath-help-description{position:absolute;z-index:10;pointer-events:none}._ath-help-description .content{display:flex;padding:var(--ath-spacing-slider-tooltip-padding-y) var(--ath-spacing-slider-tooltip-padding-x);justify-content:center;align-items:center;border-radius:var(--ath-border-radius-slider-tooltip);background:var(--ath-color-tooltip-bg-primary);width:max-content;min-width:28px}._ath-help-description .content .text{max-width:288px;color:var(--ath-color-tooltip-fg);text-align:center;font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}._ath-help-description--bottom-right{top:32px;left:28px}._ath-help-description--bottom{bottom:-46px;transform:translate(-50%, 0%)}._ath-help-description--has-arrow::after{content:\"\";position:absolute;width:11.3px;height:11.3px;transform:rotate(45deg);background-color:var(--ath-color-tooltip-bg-primary);top:-5px;right:calc(50% - 6px);border-radius:2px 0px 0px 0px}:host .ath-slider{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-slider-row-gap)}:host .ath-slider__header{display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:var(--ath-spacing-slider-header-row-gap);align-self:stretch}:host .ath-slider__header-inputs{display:flex;justify-content:space-between;align-items:center;align-content:center;gap:var(--ath-spacing-slider-header-input-row-gap);align-self:stretch;flex-wrap:wrap}:host .ath-slider__slider{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-slider-content-row-gap);align-self:stretch}:host .ath-slider__slider-wrapper{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-slider-controller-row-gap);align-self:stretch}:host .ath-slider__slider-wrapper__slider{display:flex;align-items:center;align-self:stretch;border-radius:var(--ath-border-radius-slider-controller-trail);background:var(--ath-color-slider-controller-trail-bg-default)}:host .ath-slider__slider-wrapper__slider .ath-slider__filler{display:flex;position:relative;width:100%;justify-content:space-between;align-items:center;border-radius:var(--ath-border-radius-slider-controller-trail)}:host .ath-slider__slider-wrapper__slider .ath-slider__filler__filled{position:absolute;display:flex;height:4px;flex-direction:column;align-items:flex-start;flex:1 0 0;border-radius:999px 0px 0px 999px;background:var(--background-trail);cursor:var(--cursor)}:host .ath-slider__slider-wrapper__slider .ath-slider__filler__steps{display:flex;width:100%;height:4px;justify-content:space-between;align-items:center;cursor:var(--cursor)}:host .ath-slider__slider-wrapper__details{display:flex;justify-content:space-between;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-dynamic-04)}:host .ath-slider-handle-range{--tooltip-display:none;position:absolute;max-width:16px;max-height:16px;padding:var(--ath-spacing-slider-controller-indicator-padding);flex-shrink:0;border-radius:var(--ath-border-radius-slider-controller-indicator);background:var(--background-handle);display:var(--display-handle);transform:var(--handle-transform);cursor:var(--cursor);transition:box-shadow 0.5s;box-shadow:none}:host .ath-slider-handle-range:active,:host .ath-slider-handle-range:hover{--tooltip-display:block}:host .ath-slider-handle-range__container{display:var(--tooltip-display)}:host .ath-slider-handle-range__container.disabled{display:none}:host .ath-slider-handle-range__container{position:relative}:host .ath-slider-handle-range2{--tooltip-display:none;position:absolute;max-width:16px;max-height:16px;padding:var(--ath-spacing-slider-controller-indicator-padding);flex-shrink:0;border-radius:var(--ath-border-radius-slider-controller-indicator);background:var(--background-handle);display:var(--display-handle);cursor:var(--cursor);transition:box-shadow 0.5s;box-shadow:none}:host .ath-slider-handle-range2:active,:host .ath-slider-handle-range2:hover{--tooltip-display:block}:host .ath-slider-handle-range2__container{display:var(--tooltip-display)}:host .ath-slider-handle-range2__container.disabled{display:none}:host .ath-slider-handle-range2__container{position:relative}:host .ath-slider__step{position:absolute;width:var(--ath-sizing-slider-controller-steps-width);height:var(--ath-sizing-slider-controller-steps-height);flex-shrink:0;background:var(--ath-color-slider-controller-steps-default)}:host .ath-slider__step--selected{background:var(--ath-color-slider-controller-steps-selected)}:host ath-input-counter{min-width:165px}";

let sliderSequence = 0;
const AthSlider = class {
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
    sliderId = `ath-slider-${sliderSequence++}`;
    sliderHintId;
    sliderFeedbackId;
    initialValue;
    internals;
    /**
     * The aria-label attribute of the first input-counter.
     */
    fromAriaLabel;
    /**
     * The aria-label attribute of the slider.
     */
    groupAriaLabel;
    /**
     * The aria-label attribute of the second input-counter.
     */
    toAriaLabel;
    /**
     * Detail text at the left of the slider
     */
    detailFirst;
    /**
     * Detail text at the right of the slider
     */
    detailLast;
    /**
     * If true, the user cannot interact with the slider and the inputs.
     */
    disabled = false;
    /**
     * The type of the feedback. If 'error' the error feedback will be shown.
     */
    feedback = SliderFeedbackTypes.None;
    /**
     * The ath-input-counter width.
     */
    counterWidth = 'auto';
    /**
     * Feedback error for input counter if is from, to, both or none.
     */
    feedbackCounter = SliderFeedbackErrorCounterTypes.None;
    /**
     * The message for the feedback.
     */
    feedbackText;
    /**
     * Message to help the user fill the input value.
     */
    helperText;
    /**
     * Label slider
     */
    labelGroup;
    /**
     * Represents the maximum number of the input & slider.
     */
    max = 100;
    /**
     * Represents the minimum number of the input & slider.
     */
    min = 0;
    /**
     * The name of the slider. Submitted with the form as part of a name/value pair
     */
    name;
    /**
     * If true, the user cannot modify the value.
     */
    readonly = false;
    /**
     * If true, the user must fill in a value before submitting a form.
     */
    required = false;
    /**
     * If true, the * asterisk will be show when required = true.
     */
    showRequired = true;
    /**
     * Specifies the interval between legal numbers in an <input> element & slider.
     */
    step = 1;
    /**
     * If true show step marks.
     */
    stepped = false;
    /**
     * The type of slider. if range shows two handles to select between two numbers.
     */
    type = SliderTypes.Default;
    /**
     * Specifies text for tooltip.
     */
    tooltipText;
    /**
     * Specifies the unit for the input.
     */
    unit;
    /**
     * Current value of the form control. Submitted with the form as part of a name/value pair.
     */
    value = this.min.toString();
    /**
     * The aria-valuetext attribute for slider.
     */
    valueText;
    /**
     * Specifies the width for slider.
     */
    width;
    /**
     * Emitted when the value has changed.
     */
    athChange;
    /**
     * Emitted when the slider gains focus
     */
    athFocus;
    /**
     * Emitted when the slider loses focus
     */
    athBlur;
    isFocused = false;
    currentValue;
    updateCurrentValue() {
        this.checkValues();
        if (Array.isArray(this.currentValue)) {
            this.value = `[${this.currentValue.join(',')}]`;
        }
        else {
            this.value = this.currentValue.toString();
        }
        if (this.isFocused) {
            this.handleChange();
        }
    }
    updateValue() {
        this.parseValue();
        this.setInputValue(this.value);
    }
    sliderTrack;
    activeHandle;
    handleChange = () => this.athChange.emit(this.value);
    handleFocus = event => {
        event.stopPropagation();
        if (!this.isFocused) {
            this.isFocused = true;
            this.athFocus.emit();
            document.addEventListener('focusout', this.handleBlur);
        }
    };
    handleBlur = () => {
        this.isFocused = false;
        this.athBlur.emit();
        document.removeEventListener('focusout', this.handleBlur);
    };
    preventBlurSubcomponent = event => event.stopPropagation();
    checkNearPosition(event) {
        const rect = this.sliderTrack.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percent = offsetX / rect.width;
        const newValue = Math.round((this.min + percent * (this.max - this.min)) / this.step) * this.step;
        if (this.type === SliderTypes.Range) {
            const leftHandleValue = this.currentValue[0];
            const rightHandleValue = this.currentValue[1];
            const leftDistance = Math.abs(newValue - leftHandleValue);
            const rightDistance = Math.abs(newValue - rightHandleValue);
            if (leftDistance < rightDistance) {
                this.currentValue = [Math.min(newValue, this.currentValue[1]), this.currentValue[1]];
                const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range');
                handle1.focus();
                this.activeHandle = 'handle1';
            }
            else {
                this.currentValue = [this.currentValue[0], Math.max(newValue, this.currentValue[0])];
                const handle2 = this.sliderTrack.querySelector('.ath-slider-handle-range2');
                handle2.focus();
                this.activeHandle = 'handle2';
            }
        }
        else {
            this.currentValue = Math.min(Math.max(newValue, this.min), this.max);
            const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range');
            handle1.focus();
            this.activeHandle = 'handle1';
        }
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
        this.updateSliderPosition();
    }
    parseValue() {
        if (this.value && !this.value.includes('NaN')) {
            const parsedValue = JSON.parse(this.value);
            if ((Array.isArray(parsedValue) && this.type === SliderTypes.Range) || (!Array.isArray(parsedValue) && this.type === SliderTypes.Default)) {
                this.currentValue = parsedValue;
            }
            else if (!Array.isArray(parsedValue) && this.type === SliderTypes.Range) {
                this.currentValue = [parsedValue, this.max];
            }
        }
    }
    checkValues() {
        if (this.type === SliderTypes.Default) {
            if (+this.currentValue < this.min)
                this.currentValue = this.min;
            if (+this.currentValue > this.max)
                this.currentValue = this.max;
        }
        else {
            if (this.currentValue[0] < this.min)
                this.currentValue[0] = this.min;
            if (this.currentValue[0] > this.max)
                this.currentValue[0] = this.max;
            if (this.currentValue[1] > this.max)
                this.currentValue[1] = this.max;
            if (this.currentValue[1] < this.currentValue[0])
                this.currentValue[1] = this.currentValue[0];
        }
    }
    setInputValue(value) {
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(value);
            this.internals.checkValidity();
        }
    }
    formResetCallback() {
        this.value = this.initialValue;
        this.parseValue();
        this.updateSliderPosition();
        this.setInputValue(this.value);
        this.handleChange();
    }
    componentWillLoad() {
        this.parseValue();
        this.sliderHintId = `${this.sliderId}-hint`;
        this.sliderFeedbackId = `${this.sliderId}-feedback`;
    }
    componentDidLoad() {
        this.initialValue = this.value;
        this.updateSliderPosition();
        if (this.stepped)
            this.checkStepsIsSelected();
    }
    handleathChangeListen(ev, input) {
        if (input === 'counter1') {
            if (this.type === SliderTypes.Range) {
                this.currentValue = [Number.parseInt(ev.detail), this.currentValue[1]];
                if (this.currentValue[0] > this.currentValue[1]) {
                    this.currentValue = [this.currentValue[1], this.currentValue[1]];
                }
            }
            else {
                this.currentValue = Number.parseInt(ev.detail);
            }
        }
        else {
            this.currentValue = [this.currentValue[0], Number.parseInt(ev.detail)];
            if (this.currentValue[1] < this.currentValue[0]) {
                this.currentValue = [this.currentValue[0], this.currentValue[0]];
            }
        }
        this.updateSliderPosition();
    }
    handleMouseMove = (event) => {
        this.calculateValue(event);
    };
    handleMouseUp = () => {
        this.activeHandle = null;
        const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range');
        handle1.blur();
        const handle2 = this.sliderTrack.querySelector('.ath-slider-handle-range2');
        if (handle2)
            handle2.blur();
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('mouseup', this.handleMouseUp);
        this.handleChange();
    };
    handleMouseDown = (event) => {
        if (this.disabled || this.readonly)
            return;
        event.preventDefault();
        event.stopPropagation();
        const target = event.target;
        if (target.classList.contains('ath-slider-handle-range')) {
            this.activeHandle = 'handle1';
        }
        else if (target.classList.contains('ath-slider-handle-range2')) {
            this.activeHandle = 'handle2';
        }
        else if (target.classList.contains('ath-slider__filler__steps') || target.classList.contains('ath-slider__filler__filled') || target.classList.contains('ath-slider__step')) {
            this.activeHandle = 'slider-track';
        }
        if (this.activeHandle != 'slider-track') {
            this.calculateValue(event);
            window.addEventListener('mousemove', this.handleMouseMove);
            window.addEventListener('mouseup', this.handleMouseUp);
        }
        else {
            this.checkNearPosition(event);
        }
    };
    calculateValue(event) {
        if (!this.sliderTrack || this.activeHandle === null)
            return;
        const rect = this.sliderTrack.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const percent = offsetX / rect.width;
        let newValue = Math.round((percent * (this.max - this.min)) / this.step) * this.step + this.min;
        if (this.activeHandle === 'handle1') {
            if (this.type === SliderTypes.Range) {
                this.currentValue = [Math.min(Math.max(newValue, this.min), this.currentValue[1]), this.currentValue[1]];
            }
            else {
                this.currentValue = Math.min(Math.max(newValue, this.min), this.max);
            }
        }
        else if (this.activeHandle === 'handle2') {
            if (this.type === SliderTypes.Range) {
                this.currentValue = [this.currentValue[0], Math.max(Math.min(newValue, this.max), this.currentValue[0])];
            }
        }
        this.updateSliderPosition();
    }
    updateSliderPosition() {
        const handle1 = this.sliderTrack.querySelector('.ath-slider-handle-range');
        const handle2 = this.sliderTrack.querySelector('.ath-slider-handle-range2');
        const trackBar = this.sliderTrack.querySelector('.ath-slider__filler__filled');
        if (this.type === SliderTypes.Range && this.currentValue instanceof Array) {
            const percentage1 = ((this.currentValue[0] - this.min) / (this.max - this.min)) * 100;
            const percentage2 = ((this.currentValue[1] - this.min) / (this.max - this.min)) * 100;
            if (trackBar) {
                trackBar.style.left = `${percentage1}%`;
                trackBar.style.width = `${percentage2 + 0.3 - percentage1}%`;
            }
            if (handle1) {
                handle1.style.left = `${percentage1}%`;
            }
            if (handle2) {
                handle2.style.left = `${percentage2}%`;
            }
        }
        else {
            const valueHandle1 = +this.currentValue;
            const percentage = ((valueHandle1 - this.min) / (this.max - this.min)) * 100;
            if (handle1) {
                handle1.style.left = `${percentage}%`;
            }
            if (trackBar) {
                trackBar.style.left = `0%`;
                trackBar.style.width = `${percentage}%`;
            }
        }
        if (this.stepped)
            this.checkStepsIsSelected();
    }
    getPreviousValue = (value) => {
        if (value > this.max) {
            return this.max;
        }
        const rest = (value - (this.min || 0)) % this.step;
        const previous = value - (rest === 0 ? this.step : rest);
        const currentValue = previous < this.min ? this.min : previous;
        return currentValue;
    };
    getNextValue = (value) => {
        if (value < this.min) {
            return this.min;
        }
        const rest = (value - (this.min || 0)) % this.step;
        const next = value + (this.step - rest);
        const currentValue = next > this.max ? +this.value : next < this.min ? this.min : next;
        return currentValue;
    };
    handleKeydown(event, handle) {
        if (this.disabled || this.readonly)
            return;
        if (event.key === 'ArrowUp' || event.key === 'ArrowRight') {
            if (handle === 'handle1') {
                if (this.type === SliderTypes.Range) {
                    if (this.currentValue[0] < this.currentValue[1]) {
                        this.currentValue = [this.getNextValue(this.currentValue[0]), this.currentValue[1]];
                    }
                }
                else {
                    if (+this.currentValue < this.max) {
                        this.currentValue = this.getNextValue(this.currentValue);
                    }
                }
            }
            else {
                if (+this.currentValue[1] < this.max) {
                    this.currentValue = [this.currentValue[0], this.getNextValue(this.currentValue[1])];
                }
            }
        }
        if (event.key === 'ArrowDown' || event.key === 'ArrowLeft') {
            if (handle === 'handle1') {
                if (this.type === SliderTypes.Range) {
                    if (this.currentValue[0] > this.min) {
                        this.currentValue = [this.getPreviousValue(this.currentValue[0]), this.currentValue[1]];
                    }
                }
                else {
                    if (+this.currentValue > this.min) {
                        this.currentValue = this.getPreviousValue(this.currentValue);
                    }
                }
            }
            else {
                if (this.currentValue[1] > this.currentValue[0]) {
                    this.currentValue = [this.currentValue[0], this.getPreviousValue(this.currentValue[1])];
                }
            }
        }
        this.updateSliderPosition();
    }
    getLabelProps = () => ({
        htmlForId: this.sliderId,
        label: this.labelGroup,
        tooltipText: this.tooltipText,
        required: this.required,
        showRequired: this.showRequired,
    });
    getHelperTextProps = () => {
        return {
            id: this.sliderHintId,
            text: !!this.helperText ? this.helperText.trim() : '',
        };
    };
    getFeedbackProps = () => ({
        id: this.sliderFeedbackId,
        type: this.feedback,
        text: this.feedbackText,
    });
    getValueText(handle) {
        const valueText = !!this.valueText ? ' ' + this.valueText : '';
        const text = handle === 'handle1'
            ? this.type === SliderTypes.Range
                ? this.currentValue[0].toString() + valueText
                : this.currentValue.toString() + valueText
            : this.currentValue[1].toString() + valueText;
        return text;
    }
    getSliderHandleAttributes(handle) {
        const valuetext = this.getValueText(handle);
        return {
            'tabindex': this.disabled || this.readonly ? -1 : 0,
            'aria-label': `${handle === 'handle1' ? (this.type != 'range' ? this.valueText : this.fromAriaLabel) : this.toAriaLabel}`,
            'aria-valuemin': handle === 'handle1' ? this.min : this.currentValue[0],
            'aria-valuemax': handle === 'handle1' ? (this.type === SliderTypes.Range ? this.currentValue[1] : this.max) : this.max,
            'aria-valuenow': handle === 'handle1' ? (this.type === SliderTypes.Range ? this.currentValue[0] : this.currentValue) : this.currentValue[1],
            'aria-valuetext': valuetext,
            'aria-disabled': this.disabled ? 'true' : undefined,
            'aria-readonly': this.readonly ? 'true' : undefined,
            'role': 'slider',
        };
    }
    getContainerHandleClassNames = classname => ({
        [`${classname}__container`]: true,
        [`disabled`]: this.disabled,
    });
    renderSliderHandles(handle) {
        const style = handle === 'handle1' ? { left: '0%' } : { left: '100%' };
        const className = handle === 'handle1' ? 'ath-slider-handle-range' : 'ath-slider-handle-range2';
        const ariaAttributes = this.getSliderHandleAttributes(handle);
        const tooltipValue = handle === 'handle1' ? (this.type === SliderTypes.Range ? this.currentValue[0].toString() : this.currentValue.toString()) : this.currentValue[1].toString();
        const tooltipContent = tooltipValue.concat(!!this.unit ? ' ' + this.unit : '');
        return (h("span", { ...ariaAttributes, class: className, style: style, onFocus: this.handleFocus, onKeyDown: (event) => this.handleKeydown(event, handle) }, h("div", { role: "presentation", class: this.getContainerHandleClassNames(className) }, h(FcHelpDescription, { text: tooltipContent, position: "bottom", hasArrow: true }))));
    }
    checkStepsIsSelected() {
        const steps = this.sliderTrack.querySelectorAll('.ath-slider__step');
        const percentage1 = this.type === SliderTypes.Range ? ((this.currentValue[0] - this.min) / (this.max - this.min)) * 100 : ((+this.currentValue - this.min) / (this.max - this.min)) * 100;
        const percentage2 = ((this.currentValue[1] - this.min) / (this.max - this.min)) * 100;
        if (this.type === SliderTypes.Range) {
            steps.forEach(step => {
                const stepElement = step;
                const stepPercentage = Number.parseInt(stepElement.style.left.replace('%', ''));
                if (stepPercentage >= percentage1 && stepPercentage <= percentage2) {
                    stepElement.classList.add('ath-slider__step--selected');
                }
                else {
                    stepElement.classList.remove('ath-slider__step--selected');
                }
            });
        }
        else {
            steps.forEach(step => {
                const stepElement = step;
                const stepPercentage = Number.parseInt(stepElement.style.left.replace('%', ''));
                if (stepPercentage <= percentage1) {
                    stepElement.classList.add('ath-slider__step--selected');
                }
                else {
                    stepElement.classList.remove('ath-slider__step--selected');
                }
            });
        }
    }
    createSteps() {
        const stepsArray = [];
        const totalSteps = (this.max - this.min) / this.step;
        for (let i = 0; i <= totalSteps; i++) {
            const stepValue = this.min + i * this.step;
            const positionPercentage = ((stepValue - this.min) / (this.max - this.min)) * 100;
            if (i != 0 && i != totalSteps) {
                stepsArray.push(h("div", { class: "ath-slider__step", style: { left: `${positionPercentage}%` }, key: i }));
            }
        }
        return stepsArray;
    }
    renderSliderSteps() {
        const stepsArray = this.stepped ? this.createSteps() : '';
        return h("div", { class: "ath-slider__filler__steps" }, stepsArray);
    }
    ariaDescribedBy = () => {
        const descriptions = {};
        if (!!this.helperText)
            descriptions[this.sliderHintId] = this.sliderHintId;
        if (this.feedback != SliderFeedbackTypes.None)
            descriptions[this.sliderFeedbackId] = this.sliderFeedbackId;
        return descriptions;
    };
    getSliderAttributes() {
        const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ') == '' ? undefined : Object.keys(this.ariaDescribedBy()).join(' ');
        return {
            'id': this.sliderId,
            'aria-label': !!this.labelGroup ? this.labelGroup : this.groupAriaLabel,
            'aria-invalid': this.feedback === SliderFeedbackTypes.Error ? 'true' : undefined,
            'aria-describedby': describedByIds,
            'aria-disabled': this.disabled ? 'true' : undefined,
            'role': 'group',
        };
    }
    getSliderClassNames = () => ({
        'ath-slider__filler': true,
        'ath-slider__filler--range': this.type === SliderTypes.Range,
        'ath-slider__filler--disabled': this.disabled,
        'ath-slider__filler--readonly': this.readonly,
    });
    renderSliderFiller() {
        const ariaAttributes = this.getSliderAttributes();
        return (h("div", { ...ariaAttributes, class: this.getSliderClassNames(), onMouseDown: this.handleMouseDown }, h("div", { class: "ath-slider__filler__filled" }), this.renderSliderSteps(), this.renderSliderHandles('handle1'), this.type === SliderTypes.Range && this.renderSliderHandles('handle2')));
    }
    manageFeedbackCounter(counter) {
        let feedback = SliderFeedbackTypes.None;
        if (this.feedback === SliderFeedbackTypes.Error) {
            if ((this.feedbackCounter === SliderFeedbackErrorCounterTypes.From || this.feedbackCounter === SliderFeedbackErrorCounterTypes.Both || this.type === SliderTypes.Default) &&
                counter === 'counter1') {
                feedback = SliderFeedbackTypes.Error;
            }
            else if ((this.feedbackCounter === SliderFeedbackErrorCounterTypes.To || this.feedbackCounter === SliderFeedbackErrorCounterTypes.Both) && counter === 'counter2') {
                feedback = SliderFeedbackTypes.Error;
            }
        }
        return feedback;
    }
    renderAthInputCounter(counter) {
        const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ') == '' ? undefined : Object.keys(this.ariaDescribedBy()).join(' ');
        const value = counter === 'counter1' ? (this.type === SliderTypes.Range ? this.currentValue[0] : this.currentValue) : this.currentValue[1];
        const ariaLabel = counter === 'counter1' ? (this.type === SliderTypes.Default ? (!!this.groupAriaLabel ? this.groupAriaLabel : this.labelGroup) : this.fromAriaLabel) : this.toAriaLabel;
        const feedback = this.manageFeedbackCounter(counter);
        const min = counter === 'counter1' ? this.min : this.currentValue[0];
        const max = counter === 'counter1' ? (this.type === SliderTypes.Range ? this.currentValue[1] : this.max) : this.max;
        return (h("ath-input-counter", { style: { width: `${this.counterWidth}` }, value: value, min: min, max: max, step: this.step, onAthChange: ev => this.handleathChangeListen(ev, counter), feedback: feedback, "aria-describedby": describedByIds, inputAriaLabel: ariaLabel, unit: this.unit, disabled: this.disabled, readonly: this.readonly, name: this.name, size: "sm", onAthFocus: (event) => this.handleFocus(event), onAthBlur: (event) => this.preventBlurSubcomponent(event) }));
    }
    renderSlider() {
        const labelProps = this.getLabelProps();
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        const style = !!this.width ? { width: this.width } : { width: '100%' };
        return (h("div", { class: "ath-slider", ref: el => (this.sliderTrack = el), style: style }, h("div", { class: "ath-slider__header" }, !!this.labelGroup && h(FcInputLabel, { ...labelProps }), h("div", { class: "ath-slider__header-inputs" }, this.renderAthInputCounter('counter1'), this.type === SliderTypes.Range && this.renderAthInputCounter('counter2'))), h("div", { class: "ath-slider__slider" }, h("div", { class: "ath-slider__slider-wrapper" }, h("div", { class: "ath-slider__slider-wrapper__slider" }, this.renderSliderFiller()), !!this.detailFirst && !!this.detailLast && (h("div", { class: "ath-slider__slider-wrapper__details" }, h("span", null, this.detailFirst), h("span", null, this.detailLast)))), !!this.helperText && h(FcInputHelperText, { ...helperTextProps }), this.feedback !== SliderFeedbackTypes.None && !this.disabled && !this.readonly && h(FcInputFeedback, { ...feedbackProps }))));
    }
    render() {
        return h(Host, { key: 'fda59b896076e4b865c175d89a25293c99022f21' }, this.renderSlider());
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "currentValue": ["updateCurrentValue"],
        "value": ["updateValue"]
    }; }
};
AthSlider.style = sliderCss;

export { AthSlider as ath_slider };
//# sourceMappingURL=ath-slider.entry.esm.js.map
