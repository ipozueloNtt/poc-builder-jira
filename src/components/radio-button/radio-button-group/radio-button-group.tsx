import { Component, ComponentInterface, Host, JSX, Prop, h, Element, Listen, Event, EventEmitter, Watch, AttachInternals } from '@stencil/core';
import { FeedbackType, FeedbackTypes, OrientationType, OrientationTypes } from './radio-button-group.model';
import { FcInputFeedback, FcInputFeedbackType, FcInputHelperText, FcInputHelperTextType, FcInputLabel, FcInputLabelType } from '../../../sharedfc/input/index';
import { RadioButtonChangeDetail } from '../radio-button.model';

let radioButtonGroupSequence = 0;

@Component({
  tag: 'ath-radio-button-group',
  styleUrls: ['radio-button-group.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthRadioButtonGroup implements ComponentInterface {
  private hostId = `radio-button-group-${++radioButtonGroupSequence}`;
  private labelId = `${this.hostId}-label`;
  private helperTextId = `${this.hostId}-helper-text`;
  private feedbackId = `${this.hostId}-feedback`;
  private srOnlyId = `${this.hostId}-sr-only`;
  private initialValue: string;
  private index = 0;

  @Element() el: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  /**
   * Indicates whether the group is disabled
   */
  @Prop() disabled = false;

  /**
   * Indicates the Feedback type
   */
  @Prop() feedback: FeedbackType = FeedbackTypes.None;

  /**
   * Feedback text to be displayed
   */
  @Prop() feedbackText: string;

  /**
   * Helper text to be displayed
   */
  @Prop() helperText: string;

  /**
   * Label text
   */
  @Prop() label: string;

  /**
   * Name attribute to apply to the whole group
   */
  @Prop() name: string;

  /**
   * Indicates the orientation of the group
   */
  @Prop() orientation: OrientationType = OrientationTypes.Vertical;

  /**
   * Indicates whether the group is read-only
   */
  @Prop() readonly = false;

  /**
   * Indicates whether to show the asterisk
   */
  @Prop() showRequired = false;

  /**
   * Tooltip text
   */
  @Prop() tooltipText: string;

  /**
   * Tooltip width
   */
  @Prop() tooltipWidth = 0;

  /**
   * Set the value to select the checked ath-radio-button
   */
  @Prop({ mutable: true }) value: string;

  @Watch('value')
  watchValue(newValue: string) {
    this.checkRadioByValue(newValue);
  }

  // ACCESSIBILITY
  /**
   * Accessible name for the group
   */
  @Prop() ariaLabel: string | null;

  /**
   * Screen-reader-only text indicating the group is required
   */
  @Prop() requiredAriaLabel: string;

  //EVENTS
  /*
   * Emitted when any radio button changes its value
   */
  @Event() athChangeValue: EventEmitter<string>;

  @Listen('keydown')
  handleNavigation(event: KeyboardEvent) {
    const eventKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (eventKeys.includes(event.key)) {
      event.preventDefault();

      const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button')) as HTMLAthRadioButtonElement[];
      const totalButtons = radioButtons.length;
      let nextIndex = this.index;

      if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        nextIndex = this.getNextIndex(radioButtons, nextIndex, -1, totalButtons);
      } else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        nextIndex = this.getNextIndex(radioButtons, nextIndex, 1, totalButtons);
      } else if (event.key === 'Home') {
        nextIndex = this.getNextIndex(radioButtons, -1, 1, totalButtons);
      } else if (event.key === 'End') {
        nextIndex = this.getNextIndex(radioButtons, 1, -1, totalButtons);
      }

      this.index = nextIndex;

      const nextRadioButton = radioButtons[nextIndex] as any;
      if (typeof nextRadioButton.setFocus === 'function') {
        nextRadioButton.setFocus();
      }
    }
  }

  @Listen('athChange')
  handleValueChange(event: CustomEvent<RadioButtonChangeDetail>) {
    const target = event.target as HTMLAthRadioButtonElement;
    this.checkRadioByValue(target.value);
    this.athChangeValue.emit(event.detail.value);
  }

  componentDidLoad() {
    this.spreadProperties();
    if (this.value) {
      this.checkRadioByValue(this.value);
    } else {
      this.checkChecked();
    }
  }

  componentWillLoad(): Promise<void> | void {
    this.initialValue = this.value;
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.index = 0;
    this.checkRadioByValue(this.initialValue);
  }

  private checkRadioByValue(value: string) {
    const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button')) as HTMLAthRadioButtonElement[];
    const index = radioButtons.findIndex(radio => radio.value === value);

    if (index > -1) {
      const radioButton = radioButtons[index];
      this.uncheck(radioButton);
      radioButton.setTabindex(0);
      radioButton.setFocus();
    } else {
      this.uncheck(null);
      this.setFocusFirstActiveRadio();
      this.athChangeValue.emit(value);
    }

    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  private getNextIndex = (radioButtons: HTMLAthRadioButtonElement[], currentIndex: number, direction: number, totalButtons: number): number => {
    let newIndex = (currentIndex + direction + totalButtons) % totalButtons;
    while (radioButtons[newIndex].disabled) {
      newIndex = (newIndex + direction + totalButtons) % totalButtons;
    }
    return newIndex;
  };

  private uncheck(activeRadioButton) {
    const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button')) as HTMLElement[];
    radioButtons.forEach(item => {
      const radioButtonElement = item as any;

      if (item !== activeRadioButton && radioButtonElement.checked) {
        radioButtonElement.unCheck();
        radioButtonElement.setTabindex(-1);
      }
    });
  }

  private ariaDescribedBy = () => {
    const descriptions: { [key: string]: string } = {};

    if (this.helperText != undefined) descriptions[this.helperTextId] = this.helperTextId;
    if (this.feedback != FeedbackTypes.None) descriptions[this.feedbackId] = this.feedbackId;

    return descriptions;
  };

  private getAttributesGroup() {
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

  private getLabelProps = (): FcInputLabelType => ({
    id: this.labelId,
    htmlForId: undefined,
    label: this.label,
    required: this.showRequired,
    showRequired: this.showRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  private checkChecked() {
    const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button')) as HTMLAthRadioButtonElement[];
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

  private setFocusFirstActiveRadio(): void {
    const radioButtons = Array.from(this.el.querySelectorAll('ath-radio-button')) as HTMLAthRadioButtonElement[];
    const firstEnabledIndex = radioButtons.findIndex(rb => !rb.disabled);
    if (firstEnabledIndex !== -1) {
      const firstEnabled = radioButtons[firstEnabledIndex];
      (firstEnabled as any).setTabindex(0);
      this.index = firstEnabledIndex;
    }
  }

  /**
   * Propagate attributes from parent to children.
   * Set boolean attributes only for true.
   */
  private spreadProperties() {
    const radioButtons = this.el.querySelectorAll('ath-radio-button');

    radioButtons.forEach(radioButton => {
      const radioButtonElement = radioButton as any;

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

  private getGroupClassNames = () => ({
    'ath-radiobutton__group': true,
    [`ath-radiobutton__group-${this.orientation}`]: true,
  });

  render(): JSX.Element {
    const ariaAttributes = this.getAttributesGroup();
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    return (
      <Host>
        <fieldset class="ath-radiobutton-group" {...ariaAttributes}>
          {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}
          {this.showRequired && (
            <div id={this.srOnlyId} class="sr-only">
              {this.requiredAriaLabel}
            </div>
          )}
          <div class={this.getGroupClassNames()}>
            <slot></slot>
          </div>
          {!!this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}
          {this.feedback === 'error' && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
        </fieldset>
      </Host>
    );
  }
}
