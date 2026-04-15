import { Component, Prop, h, JSX, Host, Event, EventEmitter, ComponentInterface, Listen, Element } from '@stencil/core';
import { Alignment, Alignments } from './menu-button.model';
import { ButtonColor, ButtonColors, ButtonSize, ButtonSizes } from 'components/button/button.model';

let menuButtonSequence = 0;

@Component({
  tag: 'ath-menu-button',
  styleUrls: ['menu-button.scss'],
  shadow: true,
})
export class AthMenuButton implements ComponentInterface {
  private hostId = ++menuButtonSequence;
  private overlayId = `menu-button--overlay-${this.hostId}`;

  @Element() el: HTMLElement | null;

  /**
   * The overlay's position relative to the origin
   */
  @Prop({ reflect: true }) alignment: Alignments = Alignment.Left;

  /**
   * Weather the button is focused by default
   */
  @Prop() autofocus: boolean;

  /**
   * The clear of the button (background and border color)
   */
  @Prop() clear: boolean;

  /**
   * The color variant of the button
   */
  @Prop() color: ButtonColors = ButtonColor.Primary;

  /**
   * The button is disabled
   */
  @Prop() disabled: boolean;

  /**
   * The code of the button's icon (used with iconPosition)
   */
  @Prop() icon = 'placeholder';

  /**
   * Wheather the menu is open by default
   */
  @Prop({ mutable: true }) open: boolean;

  /**
   * The size of the button
   */
  @Prop() size: ButtonSizes = ButtonSize.Medium;

  /**
   * Altura del overlay del menu
   */
  @Prop() overlayMaxHeight: string;

  // ACCESSIBILITY
  /**
   * The accesible label of the menu-button
   */
  @Prop() athAriaLabel: string;

  /**
   * Emitted when an item is clicked
   */
  @Event() athAction: EventEmitter<{ item: HTMLAthMenuButtonItemElement }>;

  private justOpen = false;

  @Listen('click', { target: 'window' })
  clickOutside(ev: MouseEvent) {
    const path = ev.composedPath();
    if (!path.includes(this.el)) {
      this.open = false;
    }
  }

  private handleClick = ev => {
    ev.stopPropagation();
    this.open = !this.open;
    this.justOpen = !this.justOpen;
    if (!this.disabled && this.open) {
      const items = Array.from(this.el.querySelectorAll('ath-menu-button-item')) as HTMLElement[];
      const firstItem = items.find(i => !i.hasAttribute('disabled'));
      if (firstItem) {
        items.forEach(item => {
          (item as any).itemTabIndex = item === firstItem ? 0 : -1;
        });
        firstItem.focus();
      }
    }
  };

  componentDidLoad(): void {
    if (this.autofocus && !this.disabled) {
      this.setFocusToAthButton();
    }
    if (this.open && !this.disabled) {
      this.setFocusToAthButton();
    }

    const children = Array.from(this.el.querySelectorAll('ath-menu-button-item'));
    children.map(item => (item.tabIndex = -1));
    const htmlChildren: HTMLElement[] = children.map(child => child as unknown as HTMLElement);
    this.manageGroups(htmlChildren);
  }

  private setFocusToAthButton() {
    const athButton = this.el.shadowRoot.querySelector('ath-button') as HTMLElement;
    athButton.focus();
  }

  private manageGroups(children: HTMLElement[]): void {
    const groups = this.groupBy(children, item => item.getAttribute('group-name'));
    const allItemsArray = Array.from(children);
    const globalFirstItem = allItemsArray[0];
    const globalLastItem = allItemsArray[allItemsArray.length - 1];

    let previousGroupName: string | null = null;

    for (const group in groups) {
      const groupItems = groups[group];
      const firstItem = groupItems[0];
      const lastItem = groupItems[groupItems.length - 1];

      if (firstItem && lastItem) {
        const separator = document.createElement('ath-divider');
        separator.setAttribute('style', 'width: 100%');

        // SEPARATORS - Before the first item of the group
        if (firstItem !== globalFirstItem && previousGroupName !== group && firstItem.parentNode) {
          const previousSibling = firstItem.previousElementSibling;
          if (!previousSibling || !previousSibling.matches('ath-divider')) {
            firstItem.parentNode.insertBefore(separator.cloneNode(true), firstItem);
          }
        }

        // SEPARATORS - After the last item if it's not global last
        if (lastItem !== globalLastItem && lastItem.parentNode) {
          lastItem.parentNode.insertBefore(separator.cloneNode(true), lastItem.nextSibling);
        }

        // GROUPS
        const groupContainer = document.createElement('div');
        groupContainer.setAttribute('role', 'group');
        groupContainer.setAttribute('aria-label', group);
        groupContainer.setAttribute('style', 'display: contents;');
        firstItem.parentNode.insertBefore(groupContainer, firstItem);
        groupItems.forEach(item => {
          groupContainer.appendChild(item);
        });

        previousGroupName = group;
      }
    }
  }
  private groupBy<T>(array: T[], keyGetter: (item: T) => string): Record<string, T[]> {
    return array.reduce(
      (result, current) => {
        const key = keyGetter(current);
        if (key) {
          if (!result[key]) {
            result[key] = [];
          }
          result[key].push(current);
        }

        return result;
      },
      {} as Record<string, T[]>,
    );
  }

  @Listen('athSelected')
  onClick(ev: CustomEvent) {
    this.open = false;
    this.justOpen = false;
    this.setFocusToAthButton();
    if (ev.detail) {
      this.athAction.emit(ev.detail.target);
    }
    ev.stopPropagation();
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (ev.key === 'Escape' && this.open) {
      ev.preventDefault();
      this.open = false;
      this.setFocusToAthButton();
    }

    if (ev.key === 'Tab' && this.open) {
      this.open = false;
    }

    this.focusManager(ev);
  }

  private focusManager(ev) {
    const items = Array.from(this.el.querySelectorAll<HTMLElement>('ath-menu-button-item')).filter(item => !item.hasAttribute('disabled'));
    const currentElement = document.activeElement as HTMLElement;
    const currentIndex = items.indexOf(currentElement);

    let nextIndex;
    if (ev.key === 'ArrowDown') {
      ev.preventDefault();
      nextIndex = (currentIndex + 1) % items.length;
    } else if (ev.key === 'ArrowUp') {
      ev.preventDefault();
      if (currentIndex === -1) {
        nextIndex = items.length - 1;
      } else {
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      }
    } else if (ev.key === 'Home') {
      ev.preventDefault();
      nextIndex = 0;
    } else if (ev.key === 'End') {
      ev.preventDefault();
      nextIndex = items.length - 1;
    }
    if (nextIndex !== undefined) {
      items.forEach((item, index) => {
        (item as any).itemTabIndex = index === nextIndex ? 0 : -1;
      });
      items[nextIndex].focus();
    }
  }

  private getButtonClassNames = () => ({
    'ath-menu-button-disabled': !!this.disabled,
  });

  private getOverlayClassNames = () => ({
    'ath-menu-button-overlay': true,
    [`position--${this.alignment}`]: !!this.alignment,
  });

  render(): JSX.Element {
    const styleHeight = this.overlayMaxHeight ? { maxHeight: this.overlayMaxHeight } : { maxHeight: '236px' };

    return (
      <Host>
        <div class="ath-menu-button-container">
          <div>
            <ath-button
              id="button-menu"
              autofocus={!!this.autofocus}
              icon={this.icon}
              icon-position="icon-only"
              clear={this.clear}
              color={this.color}
              disabled={this.disabled}
              size={this.size}
              onAthClick={this.handleClick}
              aria-controls={this.overlayId}
              aria-expanded={!!this.open ? 'true' : 'false'}
              aria-haspopup="true"
              class={this.getButtonClassNames()}
              aria-label={this.athAriaLabel}
            ></ath-button>
          </div>
          {this.open && !this.disabled && (
            <div style={styleHeight} class={this.getOverlayClassNames()} id={this.overlayId} role="menu" tabindex="-1">
              <div class="ath-scroll ath-menu-button-overlay-wrapper">
                <slot></slot>
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
