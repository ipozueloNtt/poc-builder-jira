import { Component, ComponentInterface, EventEmitter, Host, Prop, h, Event, Method, State } from '@stencil/core';
import { RadioButtonChangeDetail } from './radio-button.model';
import { FcInputLabel, FcInputLabelType } from '../../sharedfc/input/index';

let radioButtonSequence = 0;

@Component({
  tag: 'ath-radio-button',
  styleUrls: ['radio-button.scss'],
  shadow: true,
})
export class AthRadioButton implements ComponentInterface {
  private radioButtonId = `radio-button-${++radioButtonSequence}`;

  /**
   * Indicates if it is checked by default
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * Indicates if it is disabled
   */
  @Prop() disabled = false;

  /**
   * Label text
   */
  @Prop() label: string;

  /**
   * Indicates the name of the radioButton
   */
  @Prop() name: string;

  /**
   * Indicates if it is read-only
   */
  @Prop() readonly = false;

  /**
   * Indicates the value of the radioButton
   */
  @Prop() value: string;

  // ACCESIBILIDAD
  /**
   * Accessible text (aria-label)
   */
  @Prop() ariaLabel: string | null;

  // EVENTOS

  /**
   * Emitted when the radio-button receives focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the radio-button loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  /**
   * Emitted when there is a change in the input state
   */
  @Event() athChange: EventEmitter<RadioButtonChangeDetail>;

  @Method() async unCheck() {
    this.checked = false;
  }

  @Method() async setFocus() {
    this.elRadioButton.focus();
    this.handleClick();
  }

  @Method() async setTabindex(tabIndex) {
    this.tabIndex = tabIndex;
  }

  private elRadioButton: HTMLElement;
  @State() tabIndex;

  componentWillLoad(): Promise<void> | void {
    this.tabIndex = this.checked ? 0 : -1;
  }

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private handleClick = () => {
    if (!this.disabled && !this.readonly && !this.checked) {
      this.checked = true;
      this.tabIndex = 0;
      this.handleChange();
    }
  };

  private handleChange = () => {
    const detail: RadioButtonChangeDetail = {
      checked: this.checked,
      value: this.value,
    };
    this.athChange.emit(detail);
  };

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  }

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.radioButtonId,
    label: this.label,
  });

  private getInputClassNames = () => ({
    'ath-radiobutton': true,
    'ath-radiobutton--read-only': this.readonly && !this.disabled,
    'ath-radiobutton--checked': this.checked,
    'ath-radiobutton--disabled': this.disabled,
  });

  private getAriaAttributes() {
    return {
      'role': 'radio',
      'aria-disabled': this.disabled ? 'true' : 'false',
      'aria-label': this.ariaLabel ? this.ariaLabel : this.label,
      'aria-checked': this.checked ? 'true' : 'false',
      'ref': (el: HTMLElement) => (this.elRadioButton = el),
    };
  }

  private getActionAttributes() {
    return {
      onFocus: this.handleFocus,
      onBlur: this.handleBlur,
      onClick: this.handleClick,
      onKeyDown: event => this.handleKeyDown(event as KeyboardEvent),
    };
  }

  private renderRadio = () => {
    const ariaAttributes = this.getAriaAttributes();
    const actionAttributes = this.getActionAttributes();
    const labelProps = this.getLabelProps();

    return (
      <div class={this.getInputClassNames()}>
        <span tabindex={this.disabled ? -1 : this.tabIndex} {...ariaAttributes} class="ath-radiobutton-item" id={this.radioButtonId} {...actionAttributes}></span>
        {!!this.label && (
          <span onClick={this.handleClick}>
            <FcInputLabel {...labelProps}></FcInputLabel>
          </span>
        )}
      </div>
    );
  };

  render() {
    return <Host> {this.renderRadio()} </Host>;
  }
}
