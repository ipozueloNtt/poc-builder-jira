import { Component, ComponentInterface, Host, JSX, Prop, h, Element, Listen, Event, EventEmitter } from '@stencil/core';
import { FeedbackType, FeedbackTypes } from './checkbox-group.model';
import { FcInputFeedback, FcInputFeedbackType, FcInputHelperText, FcInputHelperTextType, FcInputLabel, FcInputLabelType } from '../../../sharedfc/input/index';
import { CheckboxChangeEventDetail, CheckboxValue } from '../checkbox.model';

let checkboxGroupSequence = 0;

@Component({
  tag: 'ath-checkbox-group',
  styleUrls: ['checkbox-group.scss'],
  shadow: true,
})
export class AthCheckBoxGroup implements ComponentInterface {
  private checkboxGroupId = `checkbox-group-${++checkboxGroupSequence}`;
  private checkboxGroupHelperTextId = `${this.checkboxGroupId}-helper-text`;
  private checkboxGroupFeedbackId = `${this.checkboxGroupId}-feedback`;
  private srOnlyId = `${this.checkboxGroupId}-sr-only`;

  @Element() el: HTMLElement | null;

  /**
   * Indica si esta deshabilitado
   */
  @Prop() disabled = false;

  /**
   * Indica el tipo de feedback
   */
  @Prop() feedback: FeedbackTypes = FeedbackType.None;

  /**
   * Texto feedback
   */
  @Prop() feedbackText: string;

  /**
   * Texto ayuda
   */
  @Prop() helperText: string;

  /**
   * Texto para el Label
   */
  @Prop() label: string;

  /**
   * Atributo name a aplicar a todo el grupo
   */
  @Prop() name: string;

  /**
   * Indica si es solo lectura
   */
  @Prop() readonly = false;

  /**
   * Indica si se muestra el asterisco
   */
  @Prop() showRequired = false;

  /**
   * Indica el texto del tooltip
   */
  @Prop() tooltipText: string;

  /**
   * Indica el ancho de la burbuja tooltip
   */
  @Prop() tooltipWidth = 0;

  // ACCESSIBILITY
  /**
   * Texto oculto para lectores de pantalla indicando que el grupo es requerido
   */
  @Prop() requiredAriaLabel: string;

  // EVENTS
  /**
   * Emite el array de checkboxes seleccionados
   */
  @Event() athChecked: EventEmitter<CheckboxChangeEventDetail[]>;

  componentDidLoad() {
    this.spreadProperties();
    this.initializeSelectedCheckboxes();
  }

  /**
   * Propagate attributes from parent to children.
   * Set boolean attributes only for true.
   */
  private spreadProperties() {
    const checkboxes = this.el.querySelectorAll('ath-checkbox');
    checkboxes.forEach((checkbox: HTMLAthCheckboxElement) => {
      if (this.readonly) {
        checkbox.readonly = true;
      }
      if (this.disabled) {
        checkbox.disabled = true;
      }
      if (this.name !== undefined) {
        checkbox.name = this.name;
      }
    });
  }

  private selectedCheckboxes: CheckboxChangeEventDetail[] = [];

  private initializeSelectedCheckboxes() {
    const checkboxes = Array.from(this.el.querySelectorAll('ath-checkbox')) as HTMLAthCheckboxElement[];

    checkboxes.forEach(checkbox => {
      const checkboxElement = checkbox as any;
      const label = checkboxElement.getAttribute('label');
      const name = checkboxElement.getAttribute('name');
      const value = checkboxElement.getAttribute('value');

      if (value === CheckboxValue.True) {
        this.selectedCheckboxes.push({ label: label, name: name, value: value });
      }
    });
  }

  @Listen('athChange')
  handleChildCheckboxChange(event: CustomEvent<CheckboxChangeEventDetail>) {
    event.stopPropagation();
    this.updateSelectedCheckboxes(event.detail);
  }

  private updateSelectedCheckboxes(checkboxChangeEventDetail: CheckboxChangeEventDetail) {
    const { label, name, value } = checkboxChangeEventDetail;

    const index = this.selectedCheckboxes.findIndex(selected => selected.label === label);
    if (index === -1) {
      this.selectedCheckboxes.push({ label, name, value });
    } else {
      this.selectedCheckboxes.splice(index, 1);
    }

    this.athChecked.emit(this.selectedCheckboxes);
  }

  private ariaDescribedBy = () => {
    const descriptions: { [key: string]: string } = {};

    if (this.helperText != undefined) descriptions[this.checkboxGroupHelperTextId] = this.checkboxGroupHelperTextId;
    if (this.feedback != FeedbackType.None) descriptions[this.checkboxGroupFeedbackId] = this.checkboxGroupFeedbackId;

    return descriptions;
  };

  private getAttributesGroup() {
    const describedByIds = Object.keys(this.ariaDescribedBy()).length !== 0 ? Object.keys(this.ariaDescribedBy()).join(' ') : undefined;
    const ariaLabelledByIds = this.showRequired ? `${this.checkboxGroupId} ${this.srOnlyId}` : this.checkboxGroupId;

    return {
      'role': 'group',
      'id': this.checkboxGroupId,
      'name': this.name,
      'aria-label': !!this.label ? this.label : undefined,
      'aria-labelledby': ariaLabelledByIds,
      'aria-describedby': describedByIds,
      'aria-invalid': this.feedback === FeedbackType.Error ? 'true' : undefined,
    };
  }

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.checkboxGroupFeedbackId,
    type: this.feedback,
    text: this.feedbackText,
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.checkboxGroupHelperTextId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.checkboxGroupId,
    label: this.label,
    showRequired: this.showRequired,
    required: this.showRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: this.tooltipWidth,
  });

  render(): JSX.Element {
    const ariaAttributes = this.getAttributesGroup();
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    return (
      <Host>
        <fieldset class="ath-checkbox--group" {...ariaAttributes}>
          {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}
          {this.showRequired && (
            <div id={this.srOnlyId} class="sr-only">
              {this.requiredAriaLabel}
            </div>
          )}
          <div class="ath-checkbox--group__items">
            <slot></slot>
          </div>
          {this.helperText && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}
          {this.feedback === 'error' && !this.disabled && !this.readonly && <FcInputFeedback {...feedbackProps}></FcInputFeedback>}
        </fieldset>
      </Host>
    );
  }
}
