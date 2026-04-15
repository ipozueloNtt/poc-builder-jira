import { Component, ComponentInterface, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h, AttachInternals } from '@stencil/core';
import { InputFeedbackTypes, InputIconPositions, InputSizes, InputSize, InputTextType, InputTextTypes } from './input-text.model';

import {
  FcInputCounter,
  FcInputCounterType,
  FcInputElement,
  FcInputElementType,
  FcInputFeedback,
  FcInputFeedbackType,
  FcInputHelperText,
  FcInputHelperTextType,
  FcInputLabel,
  FcInputLabelType,
} from '../../sharedfc/input/index';

let inputSequence = 0;

@Component({
  tag: 'ath-input-text',
  styleUrls: ['input-text.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthInputText implements ComponentInterface {
  private inputId = `ath-input-${inputSequence++}`;
  private inputHintId: string;
  private inputFeedbackId: string;
  private inputEl: HTMLInputElement;
  private initialValue: string;

  @Element() el: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  /**
   * The type of the input
   */
  @Prop() type = InputTextTypes.Text;

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
  @Prop({ reflect: true }) disabled = false;
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
  @Prop({ reflect: true }) feedback = InputFeedbackTypes.None;

  /**
   * The feedback message.
   */
  @Prop() feedbackText: string;

  /**
   * Include a button to clear the value
   */
  @Prop() hasClear = false;

  /**
   * Message to help the user fills the input value
   */
  @Prop() helperText: string;

  /**
   * The icon name for the input's icon
   */
  @Prop() icon: string;

  /**
   * The icon position
   */
  @Prop() iconPosition = InputIconPositions.Left;

  /**
   * Represents the caption of the input
   */
  @Prop() label: string;

  /**
   * The label and aria-label of the clear button
   */
  @Prop() clearButtonAriaLabel = 'Borrar';

  /**
   * Specifies the maximum number of characters allowed in the input element
   */
  @Prop() maxlength: number;

  /**
   * The name of the input. Submitted with the form as part of a name/value pair
   */
  @Prop() name: string;

  /**
   * Specifies a regular expression that the input element's value is checked
   */
  @Prop() pattern: string;

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
   * The size of the input
   */
  @Prop() size: InputSize = InputSizes.Medium;

  /**
   * If true, the * asterisk will be hidden when required = true.
   */
  @Prop() hideRequired = false;

  /**
   * If true, submit the form when pressing Enter in the input field and the input is inside a form
   */
  @Prop() submitOnEnter = false;

  /**
   * The text to be shown in the tooltip
   */
  @Prop() tooltipText: string;

  /**
   * The max width to the text in the tooltip
   */
  @Prop() tooltipWidth;

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
   * Emitted when the component is cleared
   */
  @Event() athClear: EventEmitter<string>;

  /**
   * Emitted every time the value is updated by introducing a change
   */
  @Event() athInput: EventEmitter<string>;

  @State() inputType: InputTextType;

  componentWillLoad() {
    this.inputHintId = `${this.inputId}-hint`;
    this.inputFeedbackId = `${this.inputId}-feedback`;

    this.inputType = this.type;

    this.validateType();
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

  private validateType() {
    const validTypes = [InputTextTypes.Text, InputTextTypes.Password, InputTextTypes.Email, InputTextTypes.Url, InputTextTypes.Tel, InputTextTypes.Number, InputTextTypes.Search];
    if (!validTypes.includes(this.inputType as InputTextType)) {
      this.inputType = InputTextTypes.Text;
    }
  }

  private updateReadonly() {
    if (this.disabled) {
      this.readonly = false;
    }
  }

  private handleInput = () => {
    this.value = this.inputEl.value;
    this.setInputValue(this.value);

    this.athInput.emit(this.value);
    if (this.value === '') {
      this.athClear.emit();
    }
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

  private handleClearButton = () => {
    this.doClear();
  };

  private handleKeydown = (event: KeyboardEvent) => {
    if (event.code === 'Enter') {
      this.submitOnEnter && this.internals.form && this.internals.form.requestSubmit();
    }
  };

  private doClear = () => {
    this.inputEl.value = '';
    this.value = '';
    this.athClear.emit();
    this.setFocus();
  };

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.inputId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  private getInputProps = (): FcInputElementType => ({
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
    onInputRef: (el: HTMLInputElement) => (this.inputEl = el),
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

  private isTypeText = () => this.type === InputTextTypes.Text;

  private renderInput = () => {
    const labelProps = this.getLabelProps();
    const counterProps = this.getCounterProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    const inputProps = this.getInputProps();

    return (
      <div class="ath-input">
        {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}

        <div class="wrapper">
          <FcInputElement {...inputProps} />

          {this.isTypeText() && this.counter && <FcInputCounter {...counterProps}></FcInputCounter>}

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
