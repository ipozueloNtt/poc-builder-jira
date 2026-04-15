import { AttachInternals, Component, ComponentInterface, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import { InputCounterFeedbackTypes, InputCounterFeedbackType, InputCounterSizes, InputCounterSize } from './input-counter.model';
import { IconType, transformIconSize } from '@utils/helper';
import {
  FcInputFeedback,
  FcInputFeedbackType,
  FcInputHelperText,
  FcInputHelperTextType,
  FcInputLabel,
  FcInputLabelType,
  FcInputElement,
  FcInputElementType,
} from '../../sharedfc/input/index';

let inputCounterSequence = 0;

@Component({
  tag: 'ath-input-counter',
  styleUrls: ['input-counter.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthInputCounter implements ComponentInterface {
  private inputId = `ath-input-count-${inputCounterSequence++}`;
  private labelId = `${this.inputId}-label`;
  private inputHintId = `${this.inputId}-hint`;
  private inputFeedbackId = `${this.inputId}-feedback`;
  private inputEl: HTMLInputElement;
  private initialValue: string;

  @Element() el: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  /**
   * If true, the controls are not visible.
   */
  @Prop() hideControls = false;

  /**
   * If true, the user cannot interact with the input.
   */
  @Prop() disabled = false;

  /**
   * The type of the feedback. If 'error' the error feedback will be shown.
   */
  @Prop() feedback: InputCounterFeedbackType = InputCounterFeedbackTypes.None;

  /**
   * The message for the feedback.
   */
  @Prop() feedbackText: string;

  /**
   * Message to help the user fill the input value.
   */
  @Prop() helperText: string;

  /**
   * The aria-label attribute of the input.
   */
  @Prop() inputAriaLabel: string;

  /**
   * Represents the caption of the input.
   */
  @Prop() label: string;

  /**
   * Represents the maximum number of the input.
   */
  @Prop() max: number;

  /**
   * Represents the minimum number of the input.
   */
  @Prop() min: number;

  /**
   * The name of the input. Submitted with the form as part of a name/value pair.
   */
  @Prop() name: string;

  /**
   * Instructional text that shows before the input has a value.
   */
  @Prop() placeholder: string;

  /**
   * If true, the user cannot modify the value.
   */
  @Prop({ mutable: true }) readonly = false;

  /**
   * If true, the user must fill in a value before submitting a form.
   */
  @Prop() required = false;

  /**
   * If true, the * asterisk will be hidden when the input is required.
   */
  @Prop() hideRequired = false;

  /**
   * Specifies the size of the input.
   */
  @Prop() size: InputCounterSize = InputCounterSizes.Medium;

  /**
   * Specifies the interval between legal numbers in an <input> element.
   */
  @Prop() step = 1;

  /**
   * Specifies text for tooltip.
   */
  @Prop() tooltipText: string;

  /**
   * Specifies width for tooltip.
   */
  @Prop() tooltipWidth: number;

  /**
   * Specifies the unit for the input.
   */
  @Prop() unit: string;

  /**
   * Specifies the accesible unit for the input.
   */
  @Prop() unitAriaLabel: string;

  /**
   * Current value of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop({ mutable: true }) value: string;

  /**
   * Emitted when the input gains focus.
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() athBlur: EventEmitter<void>;

  /**
   * Emitted when the value has changed.
   * This event doesn't fire until the control loses focus.
   */
  @Event() athChange: EventEmitter<string>;

  /**
   * Emitted every time the value is updated by introducing a change.
   */
  @Event() athInput: EventEmitter<string>;

  @Watch('disabled')
  watchDisabled() {
    this.updateReadonly();
  }

  @Watch('value')
  updateValue() {
    this.value = this.value ?? '';
    if (this.inputEl && this.value !== this.inputEl.value) {
      this.inputEl.value = this.value || '';
      this.setInputValue(this.value);
    }
  }

  componentDidLoad(): void {
    this.setInputValue(this.value);
    this.inputEl.value = this.value;
  }

  componentWillLoad(): void {
    this.updateReadonly();

    this.value = this.value ?? '';
    this.initialValue = this.value;
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.setInputValue(this.initialValue);
    this.handleInput();
  }

  private setInputValue(value: string) {
    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  private updateReadonly() {
    if (this.disabled) {
      this.readonly = false;
    }
  }

  private handleDown = () => this.setValue(this.getPreviousValue());

  private handleUp = () => this.setValue(this.getNextValue());

  private setValue(value: string) {
    this.value = value;
    this.inputEl.value = this.value;
    this.athInput.emit(this.value);
    this.athChange.emit(this.value);
  }

  private getPreviousValue = (): string => {
    if (+this.value > this.max) {
      return this.max.toString();
    }
    const rest = (+this.value - (this.min || 0)) % this.step;
    const previous = +this.value - (rest === 0 ? this.step : rest);
    const value = previous < this.min ? this.min : previous;

    return value.toString();
  };

  private getNextValue = (): string => {
    if (+this.value < this.min) {
      return this.min.toString();
    }

    const rest = (+this.value - (this.min || 0)) % this.step;
    const next = +this.value + (this.step - rest);
    const value = next > this.max ? +this.value : next < this.min ? this.min : next;

    return value.toString();
  };

  private getInputProps = (): FcInputElementType => ({
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
    onInputRef: (el: HTMLInputElement) => (this.inputEl = el),
  });

  private handleInput = () => {
    this.value = this.inputEl.value;
    this.athInput.emit(this.value.toString());
  };

  private handleChange = () => {
    this.athChange.emit(this.inputEl.value);
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private getLabelProps = (): FcInputLabelType => ({
    id: this.labelId,
    htmlForId: this.inputId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.inputHintId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.inputFeedbackId,
    type: this.feedback,
    text: this.feedbackText,
  });

  private handleButtonClick = type => {
    if (!this.disabled && !this.readonly) {
      if (this.value === '' || this.value === undefined) this.value = '0';
      if (type === 'add') {
        this.handleUp();
      } else {
        this.handleDown();
      }
    }
  };

  private renderButton = icon => {
    const size = transformIconSize(IconType.Input, this.size);
    let actionDisabled = false;
    const disabled = this.disabled || this.readonly;

    if (icon === 'add' && this.max && +this.value >= this.max) {
      actionDisabled = true;
    } else if (icon === 'remove' && (this.min || this.min == 0) && +this.value <= this.min) {
      actionDisabled = true;
    }

    return (
      <ath-button
        tabindex="-1"
        size={size}
        icon={icon}
        iconPosition="icon-only"
        color="secondary"
        disabled={disabled || actionDisabled}
        onClick={() => this.handleButtonClick(icon)}
        aria-hidden="true"
        onMouseDown={(ev: MouseEvent) => {
          ev.preventDefault();
          ev.stopPropagation();
        }}
        onFocus={(ev: FocusEvent) => {
          ev.preventDefault();
        }}
      ></ath-button>
    );
  };

  private renderInput = () => {
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    const inputProps = this.getInputProps();

    return (
      <div class="ath-input-counter">
        {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}
        <div class="ath-input-counter__wrapper">
          <div class="ath-input-counter__counter">
            {!this.hideControls && this.renderButton('remove')}
            <div class="ath-input">
              <FcInputElement {...inputProps} />
            </div>
            {!this.hideControls && this.renderButton('add')}
          </div>
          {!!this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}

          {this.feedback !== InputCounterFeedbackTypes.None && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
        </div>
      </div>
    );
  };

  render() {
    return <Host>{this.renderInput()}</Host>;
  }
}
