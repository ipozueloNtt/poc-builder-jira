import { Component, Prop, h, JSX, Host, Event, EventEmitter, ComponentInterface, Element, Listen } from '@stencil/core';

@Component({
  tag: 'ath-menu-button-item',
  styleUrls: ['menu-button-item.scss'],
  scoped: true,
})
export class AthMenuButtonItem implements ComponentInterface {
  @Element() el: HTMLElement | null;

  /**
   * name option
   */
  @Prop() name: string;

  /**
   * Weather the button is disabled
   */
  @Prop() disabled: boolean;

  /**
   * The name of the grout the item belongs to
   */
  @Prop() groupName: string;

  /**
   * The icon of the menu-button-item
   */
  @Prop() icon: string;

  /**
   * The text of the menu-button-item
   */
  @Prop() text: string;

  @Prop({ mutable: true }) itemTabIndex: number = -1;

  /**
   * Emitted when the item is clicked and triggers an action
   */
  @Event() athSelected: EventEmitter<HTMLAthMenuButtonItemElement>;

  private handleClick = ev => {
    if (!this.disabled) {
      ev.stopPropagation();
      this.athSelected.emit(ev);
    }
  };

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (['Enter', 'Space'].includes(ev.code)) {
      ev.preventDefault();
      this.handleClick(ev);
    }
  }

  private getMenuButtonOptionLevelClassNames = () => ({
    'ath-menu-button-option__level': true,
    [`ath-menu-button-option__level--disabled`]: this.disabled,
  });

  render(): JSX.Element {
    return (
      <Host role="menuitem" onClick={this.handleClick} tabindex={this.itemTabIndex} aria-disabled={!!this.disabled ? 'true' : 'false'}>
        <div class="_ath-menu-button-option">
          <div class={this.getMenuButtonOptionLevelClassNames()}>
            <div class="menu-button-option">
              {!!this.icon && <ath-icon icon={this.icon}></ath-icon>}
              <div class="text">{this.text}</div>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
