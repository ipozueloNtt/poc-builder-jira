import { Component, ComponentInterface, Event, EventEmitter, Host, h, Prop, Listen, Element, State, Method, AttachInternals, Watch } from '@stencil/core';
import { ChipChoiceSizes, ChipChoiceSize, ChipChoiceRole } from './chip-choice.model';
import { IconType, transformIconSize } from '@utils/helper';

@Component({
  tag: 'ath-chip-choice',
  styleUrls: ['chip-choice.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthChipChoice implements ComponentInterface {
  private initialValue: boolean;

  @Element() el: HTMLElement;

  @AttachInternals() internals: ElementInternals;

  /**
   * Indica si el chip esta seleccionado
   */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /**
   * Indica si el chip esta deshabilitado
   */
  @Prop() disabled = false;

  /**
   * Indica el nombre del icono a usar
   */
  @Prop() icon: string;

  /**
   * Texto del chip
   */
  @Prop() label: string;

  /**
   * The chip name for HTML Form API
   */
  @Prop() name: string;

  /**
   * The role of the chip
   */
  @Prop({ reflect: true }) role: string | null = ChipChoiceRole.Checkbox;

  /**
   * Indica el tamaño del chip (sm/md)
   */
  @Prop() size: ChipChoiceSizes = ChipChoiceSize.Medium;

  /**
   * The chip value for HTML Form API
   */
  @Prop() value: string;

  @Watch('selected')
  watchSelectedHandler(newValue: boolean) {
    if (this.isCheckbox() && !this.disabled) {
      this.visualSelected = newValue;
      this.el.focus();
      this.setInputValue();
    }
  }

  @Event() athChange: EventEmitter<any>;
  @Event() athFocus: EventEmitter<void>;
  @Event() athBlur: EventEmitter<void>;

  @State() visualSelected = false;

  @Method()
  async select() {
    if (!this.disabled) {
      this.visualSelected = true;
      this.el.focus();
    }
  }

  @Method()
  async unselect() {
    if (!this.disabled) {
      this.visualSelected = false;
      this.el.blur();
    }
  }

  @Listen('keydown')
  handleKeydown(e: KeyboardEvent) {
    if (e.code === 'Space' || e.code === 'Enter') {
      this.toogleValueChip();
      e.stopPropagation();
    }
  }

  @Listen('mousedown')
  handleMouseDown(e: MouseEvent) {
    if (this.disabled) {
      e.preventDefault();
    }
  }

  componentDidLoad() {
    if (!this.value) {
      this.value = this.label;
    }

    this.initialValue = this.selected;
    if (this.isCheckbox() && !this.disabled) {
      this.setInputValue();
    }
  }

  formResetCallback() {
    if (this.isCheckbox() && !this.disabled) {
      this.setValueChip(this.initialValue);
    }
  }

  private isCheckbox() {
    return this.role === ChipChoiceRole.Checkbox;
  }

  private handleClick = () => {
    this.toogleValueChip();
    this.select();
  };

  private handleFocus = () => {
    if (!this.disabled) {
      this.athFocus.emit();
    }
  };

  private handleBlur = () => {
    if (!this.disabled) {
      this.athBlur.emit();
    }
  };

  private toogleValueChip() {
    this.setValueChip(!this.selected);
  }

  private setValueChip(value: boolean) {
    if (!this.disabled && this.selected !== value) {
      this.selected = value;
      this.athChange.emit(this.el);
      this.setInputValue();
    }
  }

  private setInputValue() {
    if (this.internals && 'setFormValue' in this.internals) {
      this.internals?.setFormValue(this.selected ? this.value : undefined);
      this.internals?.checkValidity();
    }
  }

  private getHostAttributes = () => {
    return {
      'tabindex': this.visualSelected && !this.disabled ? '0' : '-1',
      'aria-disabled': this.disabled ? 'true' : undefined,
      'aria-checked': this.selected ? 'true' : 'false',
      'onClick': this.handleClick,
      'onFocus': this.handleFocus,
      'onBlur': this.handleBlur,
    };
  };

  private getHostClassNames = () => ({
    'ath-chip-choice': true,
  });

  private getContainerClassNames = () => ({
    'ath-chip-choice__container': true,
    [`ath-chip-choice__container--${this.size}`]: true,
    'ath-chip-choice__container--disabled': this.disabled,
    [`ath-chip-choice__container--checked`]: this.selected && !this.disabled,
  });

  private renderIcon = () => {
    return <ath-icon icon={this.icon} size={transformIconSize(IconType.Chipchoice, this.size)} color="inherit"></ath-icon>;
  };

  render() {
    return (
      <Host {...this.getHostAttributes()} class={this.getHostClassNames()}>
        <span class={this.getContainerClassNames()}>
          {!!this.icon && this.renderIcon()}
          <span class="ath-chip-choice__text">{this.label}</span>
        </span>
      </Host>
    );
  }
}
