import { Component, h, Host, JSX, Prop, Event, EventEmitter, Method, State, Element, ComponentInterface } from '@stencil/core';
import { CheckIconValue } from './dropdownOption.model';

@Component({
  tag: 'ath-dropdown-option',
  styleUrls: ['dropdownOption.scss'],
  scoped: true,
})
export class AthDropdownOption implements ComponentInterface {
  /**
   * name option
   */
  @Prop() name: string;
  /**
   * Valor del option
   */
  @Prop() value: string;
  /**
   * texto del option
   */
  @Prop() text: string;
  /**
   * Si esta selecionado
   */
  @Prop({ mutable: true }) selected = false;
  /**
   * Si esta deshabilitado
   */
  @Prop() disabled = false;
  /**
   * Permite agrupaciones
   */
  @Prop() optionGroup: boolean;
  /**
   * icono para opcion
   */
  @Prop() icon: string;

  /**
   * etiqueta accesible para la opcionseleccionada
   */
  @Prop() selectedAriaLabel: string = 'seleccionada';
  @State() isMultiselect = false;
  @Event() optSelected: EventEmitter<{ source: 'user' | 'programmatic' }>;
  @State() hidden = false;
  @State() haveOptionSlot = false;
  @State() isIngroup = false;
  @State() activeOption = false;

  @Method() async updateMultiselect() {
    this.isMultiselect = true;
  }

  @Method() async updateGroupOption() {
    this.isIngroup = true;
  }

  @Method() async activeDropdownOption() {
    this.activeOption = true;
  }

  @Method() async noActiveDropdownOption() {
    this.activeOption = false;
  }

  @Method() async filterNotFound(inputText) {
    this.hidden = true;
    if (this.haveOptionSlot) {
      this.optionsGroup.forEach(option => {
        if (option.text.toLowerCase().includes(inputText)) {
          this.hidden = false;
        }
      });
    }
  }

  @Method() async setSelected(selected: boolean, opts?: { silent?: boolean; source?: 'user' | 'programmatic' }) {
    if (this.disabled || this.optionGroup) return;
    if (this.selected === selected) return;
    this.selected = selected;
    if (!opts?.silent) {
      this.optSelected.emit({ source: opts?.source ?? 'programmatic' });
    }
  }

  @Method() async filterFound() {
    this.hidden = false;
  }

  @Method() async selectOption() {
    return this.setSelected(true, { source: 'programmatic' });
  }

  @Method() async unselectOption() {
    return this.setSelected(false, { source: 'programmatic' });
  }

  @Element() el: HTMLElement;

  private optionsGroup;

  private getOptionClassNames = () => ({
    'ath-dropdown-option': true,
    'ath-dropdown-option--hidden': this.hidden,
  });

  private addLevel() {
    this.optionsGroup.forEach(option => {
      option.updateGroupOption();
    });
  }

  private getClassNames = () => ({
    'ath-dropdown-option-header': true,
    'disabled': this.disabled,
    'optGroup': this.optionGroup,
    'selected': this.selected,
    'active': this.activeOption,
  });

  private getCheckboxClassNames = () => ({
    'option-checkbox': true,
    'checked': this.selected,
  });

  private handleClick = () => {
    if (this.disabled || this.optionGroup) return;
    const selectedValue = this.isMultiselect ? !this.selected : true;

    this.setSelected(selectedValue, { silent: false, source: 'user' });
  };

  componentWillLoad(): Promise<void> | void {
    this.optionsGroup = Array.from(this.el.querySelectorAll('ath-dropdown-option'));
    if (this.optionGroup) {
      this.addLevel();
      this.haveOptionSlot = true;
    }
  }

  render(): JSX.Element {
    const checkboxIconHtml = this.selected ? CheckIconValue.Check : '';
    const id = this.el.getAttribute('id');
    const ariaLabelText = this.selected ? `${this.text} ${this.selectedAriaLabel}` : this.text;

    return (
      <Host
        role={this.optionGroup ? 'group' : 'option'}
        aria-selected={!this.optionGroup ? this.selected : undefined}
        class={this.getOptionClassNames()}
        onClick={this.handleClick}
        aria-label={ariaLabelText}
        aria-labelledby={this.optionGroup ? id + '-text' : undefined}
      >
        <div class={this.getClassNames()}>
          {this.isIngroup && <div class="level"></div>}
          {this.isMultiselect && !this.optionGroup && (
            <div>
              <div class={this.getCheckboxClassNames()} innerHTML={checkboxIconHtml}></div>
            </div>
          )}
          {!!this.icon && <ath-icon icon={this.icon} color={this.selected ? 'inverse' : 'inherit'}></ath-icon>}
          <slot name="left-asset"></slot>
          <span id={id + '-text'}> {this.text}</span>
          <slot name="right-asset"></slot>
          {this.selected && !this.isMultiselect && <ath-icon icon="check" color="inverse"></ath-icon>}
        </div>
        {this.haveOptionSlot && (
          <div class="ath-dropdown-option__list">
            <slot></slot>
          </div>
        )}
      </Host>
    );
  }
}
