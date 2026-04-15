import { Component, Host, h, Element, Listen, Event, EventEmitter, Prop, State, ComponentInterface, Method } from '@stencil/core';
import { IconType, transformIconSize } from '@utils/helper';
import { ButtonExpandableSizesType, ButtonExpandableSizesTypes } from './button-expandable.model';

@Component({
  tag: 'ath-button-expandable',
  styleUrl: 'button-expandable.scss',
  scoped: true,
})
export class AthButtonExpandable implements ComponentInterface {
  @Element() el: HTMLElement | null;

  /**
   * The size of the buton
   */
  @Prop({ reflect: true }) size: ButtonExpandableSizesType = ButtonExpandableSizesTypes.Large;

  /**
   * The code of the button's icon (used with iconPosition)
   */
  @Prop() icon: string;

  /**
   * The button is disabled
   */
  @Prop({ reflect: true }) disabled = false;

  @State() isExpanded = false;

  @Event() athToggleCollapse: EventEmitter<string>;

  @Prop() collapseTarget: string;

  @Method()
  async setFocus() {
    if (!this.disabled) {
      this.el.focus();
    }
  }

  @Listen('athCollapseState', { target: 'window' })
  handleCollapseStateChange(event: CustomEvent<{ id: string; isExpanded: boolean }>) {
    if (event.detail.id === this.collapseTarget) {
      this.isExpanded = event.detail.isExpanded;
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (['Enter', 'Space'].includes(ev.code) && !this.disabled) {
      ev.preventDefault();
      this.handleCollapse();
    }
  }

  private handleCollapse = () => {
    this.isExpanded = !this.isExpanded;
    this.athToggleCollapse.emit(this.collapseTarget);
  };

  private getHostClassNames = () => ({
    'ath-button-expandable': true,
  });

  private getSpanClassNames = () => ({
    'ath-button-expandable--container': true,
    [`ath-button-expandable--${this.size}`]: !!this.size,
    [`ath-button-expandable--disabled`]: this.disabled,
  });

  private getChevronClasses = () => ({
    'ath-button-expandable--chevron': true,
    [`ath-button-expandable--chevron-rotate`]: !this.isExpanded,
  });

  private getAttributes = () => ({
    'role': 'button',
    'tabindex': this.disabled ? '-1' : this.el.getAttribute('tabindex') === '-1' ? '-1' : '0',
    'aria-controls': !this.disabled && this.collapseTarget ? this.collapseTarget : undefined,
    'aria-expanded': !this.disabled && this.collapseTarget ? `${this.isExpanded}` : undefined,
    'aria-disabled': this.disabled ? 'true' : 'false',
    'onClick': this.disabled ? undefined : this.handleCollapse,
    'onMouseDown': e => {
      if (this.disabled) e.preventDefault();
    },
  });

  private renderIcon = icon => {
    return <ath-icon icon={icon} size={transformIconSize(IconType.ButtonExpandable, this.size)} color={this.disabled ? 'disabled' : 'default'}></ath-icon>;
  };

  render() {
    return (
      <Host class={this.getHostClassNames()} {...this.getAttributes()}>
        <span class={this.getSpanClassNames()}>
          {this.icon && this.renderIcon(this.icon)}
          <span class="ath-button-expandable--text">
            <slot></slot>
          </span>
          <div class={this.getChevronClasses()}>{this.renderIcon('chevron_up')}</div>
        </span>
      </Host>
    );
  }
}
