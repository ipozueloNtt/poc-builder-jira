import { Component, Prop, Element, h, JSX, Host, Event, EventEmitter, ComponentInterface, Method, Listen } from '@stencil/core';
import { ButtonLinkColors, ButtonLinkColor, ButtonLinkSizes, ButtonLinkSize, ButtonLinkPositions, ButtonLinkPosition } from './button-link.model';
import { transformIconSize, IconType } from '../../utils/helper';

@Component({
  tag: 'ath-button-link',
  styleUrls: ['button-link.scss'],
  shadow: true,
  formAssociated: false,
})
export class AthButtonLink implements ComponentInterface {
  @Element() el: HTMLElement | null;

  /**
   * The color variant of the button-link
   */
  @Prop({ reflect: true }) color: ButtonLinkColors = ButtonLinkColor.Primary;

  /**
   * The size of the buton-link
   */
  @Prop({ reflect: true }) size: ButtonLinkSizes = ButtonLinkSize.Medium;

  /**
   * The code of the button-link's icon
   */
  @Prop() icon: string;

  /**
   * Icon Position
   */
  @Prop() iconPosition: ButtonLinkPositions = ButtonLinkPosition.Left;

  /**
   * The button-link is disabled
   */
  @Prop() disabled = false;

  @Method()
  async setFocus() {
    if (!this.disabled) {
      this.el.focus();
    }
  }

  /**
   * Emitted when the button-link is clicked
   */
  @Event() athClick: EventEmitter<void>;

  /**
   * Emitted when the button-link gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the button-link loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  componentDidLoad() {
    if (this.el.hasAttribute('autofocus') && this.el.getAttribute('autofocus') !== 'false') {
      this.setFocus();
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (['Enter', 'Space'].includes(ev.code)) {
      this.handleClick();
    }
  }

  private handleClick = (/**event: Event*/) => {
    if (!this.disabled) {
      this.athClick.emit();
    }
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private getHostClassNames = () => ({
    'ath-button-link': true,
  });

  private getSpanClassNames = () => ({
    'ath-button-link--container': true,
    [`ath-button-link--disabled`]: this.disabled,
    [`ath-button-link--${this.size}`]: !!this.size,
    [`ath-button-link--${this.color}`]: !!this.color,
  });

  private renderIcon = () => {
    const iconSize = transformIconSize(IconType.ButtonLink, this.size);
    return <ath-icon icon={this.icon} color="inherit" size={iconSize}></ath-icon>;
  };

  render(): JSX.Element {
    const hostTabindex = this.el.getAttribute('tabindex') === '-1' ? '-1' : '0';
    return (
      <Host
        role="button"
        class={this.getHostClassNames()}
        tabindex={this.disabled ? '-1' : hostTabindex}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        aria-disabled={this.disabled ? 'true' : 'false'}
      >
        <span class={this.getSpanClassNames()} part="button-link-styles">
          <span class="ath-button-link__inner">
            {this.icon && this.iconPosition === ButtonLinkPosition.Left && this.renderIcon()}
            <slot></slot>
            {this.icon && this.iconPosition === ButtonLinkPosition.Right && this.renderIcon()}
          </span>
        </span>
      </Host>
    );
  }
}
