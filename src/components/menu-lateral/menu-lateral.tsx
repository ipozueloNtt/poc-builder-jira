import { Component, Prop, h, JSX, Host, Element, Watch, State, Event, EventEmitter } from '@stencil/core';
import { MenuLateralItem, MenuLateralItemType } from './menu-lateral.model';
import { MenuLateralItemVM } from './menu-lateral.model';
import { FcHelpDescription } from 'sharedfc/tooltip';

let menuLateralSequence = 0;

@Component({
  tag: 'ath-menu-lateral',
  styleUrls: ['menu-lateral.scss'],
  shadow: true,
})
export class AthMenuLateral {
  private hostId = menuLateralSequence++;
  private menuLateralId = `menu-lateral-${this.hostId}`;

  /**
   * (JSON) Object of items to generate
   */
  @Prop() items: MenuLateralItem[] | string;

  /**
   * Items generated
   */
  @State() generatedMenuLateralItems: MenuLateralItemVM[] = [];

  /**
   * Id of the hovered item
   */
  @State() hoveredItemId: string = null;

  /**
   * Id of the focused item
   */
  @State() focusedItemId: string = null;

  /**
   * Show focused item
   */
  @State() showFocused = false;

  /**
   * Events
   */
  @Event() athSelected: EventEmitter<{ item: HTMLAthMenuLateralItemActionElement | HTMLAthMenuLateralItemLinkElement }>;

  @Element() el: HTMLElement;

  // Items generation
  @Watch('items')
  onItemsChange(newValue: MenuLateralItem[] | string, oldValue: MenuLateralItem[] | string) {
    if (newValue !== oldValue) {
      this.generateMenuLateralItems();
    }
  }

  componentWillLoad() {
    this.generateMenuLateralItems();
  }

  private generateMenuLateralItems() {
    const items = this.getItems();

    this.generatedMenuLateralItems = items.map((item, index) => ({
      id: `${this.menuLateralId}-item-${index}`,
      ariaLabel: item.ariaLabel || item.tooltipText,
      badgeLabel: item.badgeLabel,
      badgeMax: item.badgeMax,
      badgeValue: item.badgeValue,
      disabled: item.disabled,
      icon: item.icon,
      name: item.name,
      selected: item.selected === true,
      tooltipText: item.tooltipText,
      externalLabel: item.externalLabel,
      href: !item.disabled ? item.href : undefined,
      rel: item.rel,
      target: !!item.target ? `_${item.target}` : '_self',
      type: item.href != '' ? MenuLateralItemType.Link : MenuLateralItemType.Action,
    }));
  }

  private getItems(): MenuLateralItem[] {
    if (this.items) {
      const parsedItems = typeof this.items === 'string' ? this.parseItems(this.items) : [...this.items];
      return parsedItems;
    }

    return this.scanChildrenItems();
  }

  private parseItems(value: string): MenuLateralItem[] {
    try {
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error parsing items:', error);
      return [];
    }
  }

  private scanChildrenItems(): MenuLateralItem[] {
    return Array.from(this.el.querySelectorAll('ath-menu-lateral-item-link, ath-menu-lateral-item-action')).map((item: any, index) => {
      const isLink = item.tagName.toLowerCase() === 'ath-menu-lateral-item-link';
      return {
        id: `menu-lateral-${this.hostId}-item-${index}`,
        ariaLabel: item.ariaLabel || item.tooltipText,
        badgeLabel: item.badgeLabel,
        badgeMax: item.badgeMax,
        badgeValue: item.badgeValue,
        disabled: item.disabled,
        icon: item.icon,
        name: item.name,
        selected: item.selected === true,
        tooltipText: item.tooltipText,
        ...(isLink
          ? {
              externalLabel: item.externalLabel,
              href: !item.disabled ? item.href : undefined,
              rel: item.rel,
              target: item.target,
              type: MenuLateralItemType.Link,
            }
          : {
              type: MenuLateralItemType.Action,
            }),
      };
    });
  }

  // Render Items
  private renderMenuItem(item) {
    if (item.type === MenuLateralItemType.Action) return this.renderActionItem(item);
    if (item.type === MenuLateralItemType.Link) return this.renderLinkItem(item);
    return null;
  }

  private renderActionItem = item => {
    return (
      <div
        id={item.id}
        class={this.getMenuLateralItemButtonClassNames(item)}
        role="menuitem"
        aria-label={item.ariaLabel}
        aria-describedby={`${item.id}-desc`}
        aria-disabled={item.disabled ? 'true' : 'false'}
        aria-current={item.selected.toString()}
        onMouseEnter={() => this.handleMouseEnter(item.id)}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.handleClick(item)}
        tabindex="-1"
      >
        {!!item.icon && this.renderIcon(item)}
        <div id={`${item.id}-desc`} class="ath-visibility-hidden">
          {item.badgeLabel}
        </div>
      </div>
    );
  };

  private renderLinkItem = item => {
    return (
      <a
        id={item.id}
        class={this.getMenuLateralItemButtonClassNames(item)}
        role="menuitem"
        aria-label={item.ariaLabel}
        aria-describedby={`${item.id}-desc`}
        aria-disabled={item.disabled ? 'true' : 'false'}
        aria-current={item.selected && 'page'}
        onMouseEnter={() => this.handleMouseEnter(item.id)}
        onMouseLeave={this.handleMouseLeave}
        onClick={() => this.handleClick(item)}
        href={item.href}
        target={item.target}
        rel={item.rel}
        tabindex="-1"
      >
        {!!item.icon && this.renderIcon(item)}
        <div id={`${item.id}-desc`} class="ath-visibility-hidden">
          <span>{item.badgeLabel}</span>
          {item.target === '_blank' && <span>{item.externalLabel}</span>}
        </div>
      </a>
    );
  };

  private getMenuLateralItemButtonClassNames = item => ({
    'ath-menu-lateral__item-container': true,
    [`ath-menu-lateral__item-container--disabled`]: item.disabled,
    [`ath-menu-lateral__item-container--selected`]: item.selected,
    'ath-menu-lateral__item--focused': this.focusedItemId === item.id && this.showFocused,
  });

  private renderIcon = item => <ath-icon icon={item.icon} color={item.disabled ? 'disabled' : item.selected ? 'inverse' : 'primary'} size="sm"></ath-icon>;

  // Interaction
  private handleMenuItemKeyDown(event: KeyboardEvent) {
    const index = this.generatedMenuLateralItems.findIndex(item => item.id === this.focusedItemId);
    let nextIndex = index;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = this.findNextEnabledIndex(index, 1);
        event.preventDefault();
        this.setFocusedItemId(this.generatedMenuLateralItems[nextIndex].id);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = this.findNextEnabledIndex(index, -1);
        event.preventDefault();
        this.setFocusedItemId(this.generatedMenuLateralItems[nextIndex].id);
        break;
      case 'Home':
        nextIndex = this.generatedMenuLateralItems.findIndex(item => !item.disabled);
        if (nextIndex !== -1) {
          event.preventDefault();
          this.setFocusedItemId(this.generatedMenuLateralItems[nextIndex].id);
        }
        break;
      case 'End':
        nextIndex = this.generatedMenuLateralItems.length - 1;
        while (nextIndex >= 0 && this.generatedMenuLateralItems[nextIndex].disabled) {
          nextIndex--;
        }
        if (nextIndex >= 0) {
          event.preventDefault();
          this.setFocusedItemId(this.generatedMenuLateralItems[nextIndex].id);
        }
        break;
      case 'Enter':
      case ' ':
        if (index !== -1) {
          const item = this.generatedMenuLateralItems[index];
          if (item.type === MenuLateralItemType.Link && item.href && !item.disabled) {
            const linkEl = this.el.shadowRoot.querySelector(`#${item.id}`) as HTMLAnchorElement;
            if (linkEl) {
              linkEl.click();
            }
          } else {
            this.handleClick(item);
          }
        }
        break;
      default:
        break;
    }
  }

  private findNextEnabledIndex(startIndex: number, direction: 1 | -1): number {
    const total = this.generatedMenuLateralItems.length;
    let idx = startIndex;
    for (let i = 0; i < total; i++) {
      idx = (idx + direction + total) % total;
      if (!this.generatedMenuLateralItems[idx].disabled) {
        return idx;
      }
    }
    return startIndex;
  }

  private setFocusedItemId(id: string) {
    this.focusedItemId = id;
    this.hoveredItemId = null;
  }

  // Selection
  private handleClick(item) {
    if (item.disabled) return;
    this.generatedMenuLateralItems = this.generatedMenuLateralItems.map(i => ({
      ...i,
      selected: i.id === item.id,
    }));
    this.emitSelectedEvent(item);
  }

  private emitSelectedEvent(item) {
    this.athSelected.emit(item);
  }

  @Watch('selectedItemId')
  onSelectedItemIdChange(newValue: string) {
    this.generatedMenuLateralItems.map(item => {
      item.selected = item.id === newValue ? true : false;
    });
  }

  // Tooltip
  private handleMouseEnter = (itemId: string) => {
    this.hoveredItemId = itemId;
    this.focusedItemId = null;
  };

  private handleMouseLeave = () => {
    this.hoveredItemId = null;
    this.focusedItemId = null;
  };

  private handleFocus = () => {
    this.showFocused = true;
    if (!this.focusedItemId && this.generatedMenuLateralItems.length > 0) {
      const firstEnabled = this.generatedMenuLateralItems.find(i => !i.disabled);
      if (firstEnabled) this.setFocusedItemId(firstEnabled.id);
    }
  };

  // Render
  render(): JSX.Element {
    return (
      <Host>
        <div
          role="menubar"
          class="ath-menu-lateral"
          tabindex="0"
          aria-activedescendant={this.focusedItemId}
          onKeyDown={e => this.handleMenuItemKeyDown(e)}
          onFocus={this.handleFocus}
          onBlur={() => {
            this.showFocused = false;
          }}
        >
          {this.generatedMenuLateralItems.map(item => (
            <div class="ath-menu-lateral__item-wrapper">
              <div class="ath-menu-lateral__item">
                {item.badgeValue ? (
                  <ath-badge value={item.badgeValue} max={item.badgeMax} position="top-right" distance-x={-5} distance-y={-4} color={item.disabled ? 'disabled' : 'accent'}>
                    {this.renderMenuItem(item)}
                  </ath-badge>
                ) : (
                  this.renderMenuItem(item)
                )}
              </div>
              <span class={((this.hoveredItemId === item.id && !item.disabled) || this.focusedItemId === item.id) && item.tooltipText ? '' : 'ath-visibility-hidden'}>
                <FcHelpDescription text={item.tooltipText} position="bottom-right"></FcHelpDescription>
              </span>
            </div>
          ))}
        </div>
      </Host>
    );
  }
}
