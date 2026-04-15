import { Component, Prop, Element, h, JSX, Host, Event, EventEmitter, ComponentInterface, Listen } from '@stencil/core';
import { Icons, IconSizeTypes } from '../../utils/helper';

@Component({
  tag: 'ath-tooltip-trigger',
  styleUrls: ['tooltip.scss'],
  scoped: true,
})
export class TooltipTrigger implements ComponentInterface {
  @Element() el: HTMLElement | null;

  /**
   * The icon name
   */
  @Prop() icon: string = Icons.Info;

  /**
   * The size of the icon
   */
  @Prop({ reflect: true }) size: IconSizeTypes = 'md';

  /**
   * The aria-label attribute of the icon
   */
  @Prop() ariaLabel: string | null = 'Más información';

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

  @Listen('click')
  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (['Enter', 'Space'].includes(ev.code)) {
      this.handleClick();
      ev.stopPropagation();
    }
  }

  private handleClick = (/**event: Event*/) => {
    this.athClick.emit();
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private getHostClassNames = () => ({
    'ath-tooltip-trigger': true,
  });

  render(): JSX.Element {
    const hostTabindex = this.el.getAttribute('tabindex') === '-1' ? '-1' : '0';
    return (
      <Host
        role="button"
        class={this.getHostClassNames()}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onClick={this.handleClick}
        aria-label={this.el.ariaLabel ?? this.ariaLabel}
        tabIndex={hostTabindex}
      >
        <ath-icon icon={this.icon} size={this.size}></ath-icon>
      </Host>
    );
  }
}
