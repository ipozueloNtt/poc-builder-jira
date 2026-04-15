import { Component, ComponentInterface, EventEmitter, Host, JSX, Prop, Watch, h, Event, Method, Element, AttachInternals } from '@stencil/core';
import { FeedbackType, FeedbackTypes, CheckboxValues, CheckboxValue, CheckIconValue, CheckboxChangeEventDetail } from './checkbox.model';

import { FcInputFeedback, FcInputFeedbackType, FcInputHelperText, FcInputHelperTextType, FcInputLabel, FcInputLabelType } from '../../sharedfc/input/index';

let checkboxSequence = 0;

@Component({
  tag: 'ath-checkbox',
  styleUrls: ['checkbox.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthCheckBox implements ComponentInterface {
  private checkboxId = `checkbox-${++checkboxSequence}`;
  private helperTextId = `${this.checkboxId}-helper-text`;
  private feedbackId = `${this.checkboxId}-feedback`;

  /**
   * Name of the checkbox (necessary for forms)
   */
  @Prop() name: string;

  /**
   * Value of the checkbox
   */
  @Prop({ mutable: true }) value: CheckboxValues = CheckboxValue.False;

  /**
   * If the checkbox is checked by default
   */
  @Prop() checked = false;

  /**
   * If the checkbox is indeterminate by default
   */
  @Prop() indeterminate = false;

  /**
   * If it is disabled
   */
  @Prop() disabled = false;

  /**
   * If it is required
   */
  @Prop() required = false;

  /**
   * If the required character is shown in the label
   */
  @Prop() hideRequired = false;

  /**
   * Label of the checkbox
   */
  @Prop() label: string;

  /**
   * Accessible text when there is no visible label
   */
  @Prop() ariaLabel: string | null;

  /**
   * Text below the checkbox (helper text)
   */
  @Prop() helperText: string;

  /**
   * Type of feedback
   */
  @Prop() feedback: FeedbackTypes = FeedbackType.None;

  /**
   * Text of the feedback
   */
  @Prop() feedbackText: string;

  /**
   * If it is read-only
   */
  @Prop() readonly = false;

  /**
   * If the element is focused
   */
  @Prop() autofocus = false;

  /**
   * Emitted when the checkbox gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  /**
   * Emitted when the checkbox change
   */
  @Event() athChange: EventEmitter<CheckboxChangeEventDetail>;

  @Watch('value')
  watchValue(value) {
    this.setInputValue(value);
  }

  @Method()
  async setFocus() {
    if (!this.disabled) {
      const checkboxDiv = this.el.shadowRoot.querySelector('.ath-checkbox') as HTMLElement;
      checkboxDiv.focus();
    }
  }

  @Element() el: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  private elInput: HTMLInputElement;
  private initialValue: CheckboxValues;

  private handleFocus = () => {
    this.athFocus.emit();
  };
  private handleBlur = () => {
    requestAnimationFrame(() => {
      if (!this.el.contains(document.activeElement)) {
        this.athBlur.emit();
      }
    });
  };
  private handleClick = () => {
    if (!this.disabled && !this.readonly) {
      this.toggleChecked();
      this.emitChangeEvent();
    }
    this.setFocus();
  };

  private emitChangeEvent() {
    const selectedCheckboxEventDetail = {
      label: this.label,
      name: this.name,
      value: this.value,
    };
    this.athChange.emit(selectedCheckboxEventDetail);
  }

  private toggleChecked() {
    this.value = this.value === CheckboxValue.True ? CheckboxValue.False : CheckboxValue.True;
  }

  private handleKeyDown(event: KeyboardEvent) {
    if (!this.readonly && (event.key === ' ' || event.key === 'Enter')) {
      event.preventDefault();
      this.handleClick();
    }
  }

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.checkboxId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
  });

  private getInputClassNames = () => ({
    'ath-checkbox': true,
    'ath-checkbox--read-only': this.readonly && !this.disabled,
    'ath-checkbox--checked': this.value === CheckboxValue.True,
    'ath-checkbox--indeterminate': this.value === CheckboxValue.Indeterminate,
    'ath-checkbox--disabled': this.disabled,
  });

  private getAriaAttributes() {
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

  private getActionAttributes() {
    return {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onKeyDown: event => this.handleKeyDown(event as KeyboardEvent),
      onClick: this.handleClick,
    };
  }

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.feedbackId,
    type: this.feedback,
    text: this.feedbackText,
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.helperTextId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private checkValue() {
    if (this.value == CheckboxValue.True) {
      return CheckIconValue.Check;
    } else if (this.value == CheckboxValue.Indeterminate) {
      return CheckIconValue.Indeterminate;
    }
  }

  private setInputValue(value: string) {
    const inputValue = value || 'false';

    if (this.elInput) {
      this.elInput.indeterminate = false;
      this.elInput.checked = false;

      if (inputValue === CheckboxValue.True) {
        this.elInput.checked = true;
      } else if (inputValue === CheckboxValue.Indeterminate) {
        this.elInput.indeterminate = true;
      }
    }

    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(inputValue);
      this.internals.checkValidity();
    }
  }

  componentWillLoad() {
    if (this.checked) this.value = CheckboxValue.True;
    if (this.indeterminate) this.value = CheckboxValue.Indeterminate;
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

  render(): JSX.Element {
    const ariaAttributes = this.getAriaAttributes();
    const actionAttributes = this.getActionAttributes();
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();

    return (
      <Host>
        <div role="checkbox" class={this.getInputClassNames()} {...actionAttributes} {...ariaAttributes} tabindex={!!this.disabled ? '-1' : '0'}>
          <div class="ath-checkbox-indicator" id={this.checkboxId} innerHTML={this.checkValue()} tabindex="-1"></div>
          <div class="ath-checkbox__wrapper">
            <input ref={el => (this.elInput = el as HTMLInputElement)} type="hidden" name={this.name} value={this.value} disabled={this.disabled} />
            {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}
            {!!this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}
            {this.feedback === 'error' && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
          </div>
        </div>
      </Host>
    );
  }
}
