import { Component, Prop, Element, h, JSX, Host, Event, EventEmitter, ComponentInterface, Method, Listen, AttachInternals } from '@stencil/core';
import { ButtonType, ButtonIconPosition, ButtonColors, ButtonColor, ButtonSizes, ButtonSize, ButtonTypes, ButtonIconPositions } from './button.model';
import { transformIconSize, IconType } from '../../utils/helper';

@Component({
  tag: 'ath-button',
  styleUrls: ['button.scss'],
  shadow: true,
  formAssociated: true,
})
export class AthButton implements ComponentInterface {
  private showLeftIcon: boolean;
  private showRightIcon: boolean;

  @Element() el: HTMLElement | null;

  @AttachInternals() internals: ElementInternals;

  /**
   * The color variant of the button
   */
  @Prop({ reflect: true }) color: ButtonColors = ButtonColor.Primary;

  /**
   * The size of the buton
   */
  @Prop({ reflect: true }) size: ButtonSizes = ButtonSize.Medium;

  /**
   * The type of the button
   */
  @Prop() type: ButtonTypes = ButtonType.Button;

  /**
   * Whether the button has an icon and his position
   */
  @Prop({ reflect: true }) iconPosition: ButtonIconPositions = ButtonIconPosition.None;

  /**
   * The code of the button's icon (used with iconPosition)
   */
  @Prop() icon: string;

  /**
   * The clear of the button (background and border color)
   */
  @Prop() clear = false;

  /**
   * The button can be adapted to its container width
   */
  @Prop({ reflect: true }) fullWidth = false;

  /**
   * The button is disabled
   */
  @Prop() disabled = false;

  @Method()
  async setFocus() {
    if (!this.disabled) {
      this.el.focus();
    }
  }

  /**
   * Emitted when the button is clicked
   */
  @Event() athClick: EventEmitter<void>;

  /**
   * Emitted when the button gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the button loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  componentWillLoad() {
    this.showLeftIcon = this.icon && (this.iconPosition === ButtonIconPosition.Left || this.iconPosition === ButtonIconPosition.IconOnly);
    this.showRightIcon = this.icon && this.iconPosition === ButtonIconPosition.Right;
  }

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
      if (this.type === ButtonType.Submit) {
        this.internals?.form && this.internals.form.requestSubmit();
      }
      if (this.type === ButtonType.Reset) {
        this.internals?.form && this.internals.form.reset();
      }

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
    'ath-button': true,
  });

  private getSpanClassNames = () => ({
    'ath-button--container': true,
    [`ath-button--${this.size}`]: !!this.size,
    [`ath-button--solid`]: !this.clear,
    [`ath-button--clear`]: this.clear,
    [`ath-button--${this.color}`]: !!this.color,
    [`ath-button--icon-only`]: this.iconPosition === ButtonIconPosition.IconOnly,
    [`ath-button--disabled`]: this.disabled,
    [`ath-button--full-width`]: this.fullWidth,
  });

  private getButtonStyle = () => ({
    width: this.fullWidth ? '100%' : 'auto',
  });

  private renderIcon = () => {
    const isIconOnly = this.iconPosition === ButtonIconPosition.IconOnly;
    const iconSize = isIconOnly ? transformIconSize(IconType.ButtonIconOnly, this.size) : transformIconSize(IconType.Button, this.size);
    return <ath-icon icon={this.icon} size={iconSize} color="inherit"></ath-icon>;
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
        style={this.getButtonStyle()}
      >
        <span class={this.getSpanClassNames()} part="button-styles">
          <span class="ath-button__inner">
            {this.showLeftIcon && this.renderIcon()}
            {this.iconPosition != 'icon-only' && <slot></slot>}
            {this.showRightIcon && this.renderIcon()}
          </span>
        </span>
      </Host>
    );
  }
}
