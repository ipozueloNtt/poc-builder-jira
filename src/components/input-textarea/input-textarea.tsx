import { AttachInternals, Component, ComponentInterface, Element, Event, EventEmitter, Host, Method, Prop, Watch, h } from '@stencil/core';
import { InputFeedbackTypes, InputSize, InputSizes } from './input-textarea.models';

import {
  FcInputCounter,
  FcInputCounterType,
  FcInputTextareaElement,
  FcInputFeedback,
  FcInputFeedbackType,
  FcInputHelperText,
  FcInputHelperTextType,
  FcInputLabel,
  FcInputLabelType,
  FcInputTextareaElementType,
} from '../../sharedfc/input/index';

let inputTextareaSequence = 0;

@Component({
  tag: 'ath-input-textarea',
  styleUrls: ['input-textarea.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthInputTextarea implements ComponentInterface {
  private inputId = `ath-input-textarea-${inputTextareaSequence++}`;
  private inputHintId: string;
  private inputFeedbackId: string;
  private inputEl: HTMLTextAreaElement;
  private initialValue: string;

  @Element() el: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  /**
   * Whether the input will be autocompleted.
   */
  @Prop() autocomplete: string;

  /**
   * Whether the input is focused on page load.
   */
  @Prop() autofocus: boolean;

  /**
   * Shows a counter
   */
  @Prop() counter: boolean;

  /**
   * SThe label of the counter
   */
  @Prop() counterLabel = '[length] de [max] caracteres. Quedan [rest]';

  /**
   * If true, the user cannot interact with the input.
   */
  @Prop() disabled = false;
  @Watch('disabled')
  watchDisabled() {
    this.updateReadonly();
  }

  /**
   * The aria-label attribute of the input
   */
  @Prop() inputAriaLabel: string;

  /**
   * Set tabindex
   */
  @Prop() inputTabindex = '0';

  /**
   * The type of the feedback. If 'error' the error feedback will be shown
   */
  @Prop() feedback = InputFeedbackTypes.None;

  /**
   * The feedback message.
   */
  @Prop() feedbackText: string;

  /**
   * Message to help the user fills the input value
   */
  @Prop() helperText: string;

  /**
   * Represents the caption of the input
   */
  @Prop() label: string;

  /**
   * Specifies the maximum number of characters allowed in the input element
   */
  @Prop() maxlength: number;

  /**
   * The name of the input. Submitted with the form as part of a name/value pair
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
   * Number of visible rows.
   */
  @Prop() rows: number;

  /**
   * The size of the input
   */
  @Prop() size: InputSize = InputSizes.Medium;

  /**
   * If true, the * asterisk will be hidden when required = true.
   */
  @Prop() hideRequired = false;

  /**
   * The text to be shown in the tooltip
   */
  @Prop() tooltipText: string;

  /**
   * The max width to the text in the tooltip
   */
  @Prop() tooltipWidth = 0;

  /**
   * Current value of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  updateValue() {
    if (this.inputEl) {
      this.setInputValue(this.value);
    }
  }

  /**
   * The max width to the text in the tooltip
   */
  @Prop() width: string;

  /**
   * Method to set the focus on the input element
   */
  @Method()
  async setFocus() {
    if (this.inputEl) {
      this.inputEl.focus();
    }
  }

  /**
   * Emitted when the input gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the input loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  /**
   * Emitted when the value has changed.
   * This event doesn't fire until the control loses focus.
   */
  @Event() athChange: EventEmitter<string>;

  /**
   * Emitted every time the value is updated by introducing a change
   */
  @Event() athInput: EventEmitter<string>;

  componentWillLoad() {
    this.inputHintId = `${this.inputId}-hint`;
    this.inputFeedbackId = `${this.inputId}-feedback`;
    this.updateReadonly();
  }

  componentDidLoad(): void {
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

  private setInputValue(value: string) {
    const inputValue = value || '';

    if (this.inputEl.value !== inputValue) {
      this.inputEl.value = inputValue;
    }

    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(inputValue);
      this.internals.checkValidity();
    }
  }

  private updateReadonly() {
    if (this.disabled) {
      this.readonly = false;
    }
  }

  private handleInput = () => {
    this.value = this.inputEl.value;
    this.athInput.emit(this.value);
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
    htmlForId: this.inputId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  private getInputTextAreaProps = (): FcInputTextareaElementType => ({
    autocomplete: this.autocomplete,
    disabled: this.disabled,
    feedback: this.feedback,
    feedbackText: this.feedbackText,
    helperText: this.helperText,
    inputAriaLabel: this.inputAriaLabel,
    inputId: this.inputId,
    maxlength: this.maxlength,
    name: this.name,
    placeholder: this.placeholder,
    readonly: this.readonly,
    required: this.required,
    rows: this.rows,
    size: this.size,
    tabindex: this.inputTabindex,
    value: this.value,

    onInput: () => this.handleInput(),
    onFocus: () => this.handleFocus(),
    onBlur: () => this.handleBlur(),
    onChange: () => this.handleChange(),
    onInputRef: (el: HTMLTextAreaElement) => (this.inputEl = el),
  });

  private getCounterProps = (): FcInputCounterType => ({
    accesibleLabel: this.counterLabel,
    value: this.value,
    maxlength: this.maxlength,
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

  private renderInput = () => {
    const labelProps = this.getLabelProps();
    const counterProps = this.getCounterProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    const inputTextareaProps = this.getInputTextAreaProps();

    return (
      <div class="ath-input" style={this.width ? { width: this.width } : undefined}>
        {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}

        <div class="wrapper">
          <FcInputTextareaElement {...inputTextareaProps} />

          {this.counter && <FcInputCounter {...counterProps}></FcInputCounter>}

          {!!this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}

          {this.feedback !== InputFeedbackTypes.None && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
        </div>
      </div>
    );
  };

  render() {
    return <Host>{this.renderInput()}</Host>;
  }
}
