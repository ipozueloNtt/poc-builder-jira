import { Component, EventEmitter, Host, Prop, h, Event, Method, Element } from '@stencil/core';
import { SwitchChangeDetail, SwitchSvgIcons } from './switch.model';
@Component({
  tag: 'ath-switch',
  styleUrl: 'switch.scss',
  shadow: true,
})
export class AthSwitch {
  /**
   * Determines if the switch is disabled and cannot be interacted with
   * @default false
   */
  @Prop() disabled = false;

  /**
   * Controls the selected/unselected state of the switch
   * @default false
   */
  @Prop({ mutable: true, reflect: true }) selected = false;

  /**
   * Makes the switch read-only, preventing user interaction while still being focusable
   * @default false
   */
  @Prop() readonly = false;

  /**
   * Name to identify the switch
   */
  @Prop() name: string;
  /**
   * Event emitted when the switch receives focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Event emitted when the switch loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  /**
   * Event emitted when the switch state changes
   */
  @Event() athChange: EventEmitter<SwitchChangeDetail>;

  @Element() el: HTMLElement;

  private get isReadonly(): boolean {
    return !this.disabled && this.readonly;
  }

  private getClassNames = () => ({
    'ath-switch': true,
    [`ath-switch__${this.selected ? 'selected' : 'unselected'}`]: true,
    'ath-switch__readonly': this.isReadonly,
    'ath-switch__disabled': this.disabled,
  });

  private getSwitchControllerClassNames = () => ({
    'ath-switch-controller': true,
    'ath-switch-controller__readonly': this.isReadonly,
    [`ath-switch-controller__${this.selected ? 'selected' : 'unselected'}`]: true,
    'ath-switch-controller__disabled': this.disabled,
  });

  @Method() async setFocus() {
    if (!this.disabled) {
      this.el.focus();
    }
  }

  private handleClick = () => {
    this.changeStatus();
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.changeStatus();
    }
  }

  private changeStatus() {
    if (this.disabled || this.readonly) {
      return;
    }

    this.selected = !this.selected;
    this.athChange.emit({ name: this.name, selected: this.selected });
  }

  private getSwitchIcon = () => {
    return this.selected ? SwitchSvgIcons.Selected : SwitchSvgIcons.Unselected;
  };

  private getHostAttributes = () => {
    return {
      'role': 'switch',
      'aria-disabled': this.disabled ? 'true' : 'false',
      'aria-checked': this.selected ? 'true' : 'false',
      'aria-readonly': this.isReadonly ? 'true' : 'false',
      'tabindex': this.disabled ? -1 : 0,
      'onFocus': this.handleFocus,
      'onBlur': this.handleBlur,
      'onClick': this.handleClick,
      'onKeyDown': event => this.handleKeyDown(event as KeyboardEvent),
    };
  };

  render() {
    return (
      <Host {...this.getHostAttributes()}>
        <span class={this.getClassNames()}>
          <div class={this.getSwitchControllerClassNames()} innerHTML={this.getSwitchIcon()} />
        </span>
      </Host>
    );
  }
}
