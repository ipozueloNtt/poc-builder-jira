import { Component, Prop, State, h, Element, Host, Watch, Event, EventEmitter } from '@stencil/core';
import { MenuHorizontalItem } from './menu-horizontal-item/menu-horizontal-item.model';
import { FcButtonComp } from 'sharedfc/input';
import { ButtonIconPosition } from 'components/button/button.model';
import { IconSize } from '@utils/helper';
import { moveFocusToItem } from 'components/menu-horizontal/focus-manager';
import { focusItem } from './focus-manager';
import { TargetType } from './menu-horizontal.model';

let menuHorizontalSequence = 0;

@Component({
  tag: 'ath-menu-horizontal',
  styleUrl: 'menu-horizontal.scss',
  scoped: true,
})
export class AthMenuHorizontal {
  /**
   * The accessible label for the menu
   */
  @Prop() athAriaLabel: string;

  /**
   * Whether the menu has a divider below
   */
  @Prop() hasDivider = true;

  /**
   * Items to generate using the imperative way
   */
  @Prop() items: MenuHorizontalItem[] | string;

  /**
   * Emitted when an item is selected with the MenuHorizontalItem object
   */
  @Event() athSelected: EventEmitter<MenuHorizontalItem>;

  @State() selectedMenuHorizontalItemId: string;
  @State() activeMenuHorizontalItemId: string;
  @State() showArrows = false;
  @State() isLeftArrowHidden = false;
  @State() isRightArrowHidden = false;

  @Element() el: HTMLElement;

  private hostId = ++menuHorizontalSequence;
  private menuHorizontalItems: MenuHorizontalItem[] = [];
  private firstEnabledItemId: string;
  private lastEnabledItemId: string;
  private itemGroup!: HTMLElement;
  private resizeObserver: ResizeObserver;

  @Watch('items')
  onItemsChange(newValue: MenuHorizontalItem[] | string, oldValue: MenuHorizontalItem[] | string) {
    if (newValue !== oldValue) {
      this.generateItems();
      this.detectFirstAndLastEnabledTab();
      this.detectSelectedItem();
    }
  }

  componentWillLoad() {
    this.generateItems();
    this.detectFirstAndLastEnabledTab();
    this.detectSelectedItem();
    this.activeMenuHorizontalItemId = this.selectedMenuHorizontalItemId; // init
  }

  // Items generation
  private generateItems() {
    const items = this.getItemsFromAnySource();

    this.menuHorizontalItems = items.map((item, i) => ({
      badgeLabel: item.badgeLabel,
      badgeMax: item.badgeMax,
      badgeValue: item.badgeValue,
      disabled: item.disabled,
      externalLabel: item.externalLabel,
      href: item.href,
      id: `menu-horizontal-${this.hostId}-${i}`,
      label: item.label,
      rel: item.rel,
      selected: item.selected,
      target: !!item.target ? item.target : TargetType.Self,
      value: item.value,
    }));
  }

  private getItemsFromAnySource(): MenuHorizontalItem[] {
    if (this.items) {
      const parsedItems = typeof this.items === 'string' ? this.getItemsFromImperative(this.items) : [...this.items];
      return parsedItems;
    }

    return this.getItemsFromDOM();
  }

  private getItemsFromImperative(value: string): MenuHorizontalItem[] {
    try {
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error parsing items:', error);
      return [];
    }
  }

  private getDOMElements(): HTMLAthMenuHorizontalItemElement[] {
    return Array.from(this.el.querySelectorAll('ath-menu-horizontal-item'));
  }

  private getItemsFromDOM(): MenuHorizontalItem[] {
    return this.getDOMElements().map((item, i) => ({
      badgeLabel: item.badgeLabel,
      badgeMax: item.badgeMax,
      badgeValue: item.badgeValue,
      disabled: item.disabled,
      externalLabel: item.externalLabel,
      href: item.href,
      id: `menu-horizontal-${this.hostId}-${i}`,
      label: item.label,
      rel: item.rel,
      selected: item.selected,
      target: !!item.target ? item.target : TargetType.Self,
      value: item.value,
    }));
  }

  private detectFirstAndLastEnabledTab() {
    const firstEnabled = this.menuHorizontalItems.find(item => !item.disabled);
    this.firstEnabledItemId = firstEnabled ? firstEnabled.id : undefined;

    const lastEnabled = this.menuHorizontalItems
      .slice()
      .reverse()
      .find(item => !item.disabled);
    this.lastEnabledItemId = lastEnabled ? lastEnabled.id : undefined;
  }

  private detectSelectedItem(): void {
    const selectedItem = this.menuHorizontalItems.find(item => item.selected);
    this.selectedMenuHorizontalItemId = selectedItem ? selectedItem.id : this.firstEnabledItemId;

    const elements = this.getDOMElements();
    elements.forEach((element, index) => {
      element.selected = this.menuHorizontalItems[index]?.id === this.selectedMenuHorizontalItemId;
    });
  }

  // Arrows visibility
  componentDidLoad() {
    this.updateArrowsVisibility();
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        this.updateArrowsVisibility();
      });
      if (this.itemGroup) {
        this.resizeObserver.observe(this.itemGroup);
      }
    }
  }

  private updateArrowsVisibility = () => {
    if (this.itemGroup) {
      const hasOverflow = this.itemGroup.scrollWidth > this.itemGroup.clientWidth;
      this.showArrows = hasOverflow;

      this.isLeftArrowHidden = this.itemGroup.scrollLeft <= 0;
      const maxScrollLeft = this.itemGroup.scrollWidth - this.itemGroup.clientWidth;
      this.isRightArrowHidden = this.itemGroup.scrollLeft >= maxScrollLeft - 2;
    }
  };

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  // Interaction
  private handleItemFocus = (event: FocusEvent) => {
    const target = event.target as HTMLElement;
    if (target && this.itemGroup) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
    }
  };

  private handleItemClick = (e: MouseEvent | KeyboardEvent, item: MenuHorizontalItem) => {
    if (item.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.selectedMenuHorizontalItemId = item.id;

    // Update items array
    this.menuHorizontalItems.forEach(menuItem => {
      menuItem.selected = menuItem.id === item.id;
    });

    // Update DOM elements if they exist
    const elements = this.getDOMElements();
    elements.forEach(element => {
      element.selected = false;
    });
    const selectedIndex = parseInt(item.id.split('-').pop()!);
    if (elements[selectedIndex]) {
      elements[selectedIndex].selected = true;
    }

    this.emitSelectedEvent(item);
  };

  private handleKeyDown = (event: KeyboardEvent, item: MenuHorizontalItem) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleItemClick(event, item);
      return;
    } else if (event.key === 'ArrowLeft') {
      if (this.activeMenuHorizontalItemId !== this.firstEnabledItemId) {
        const nextTabId = moveFocusToItem(this.menuHorizontalItems, -1, this.activeMenuHorizontalItemId);
        focusItem(nextTabId, this.el);
      }
    } else if (event.key === 'ArrowRight') {
      if (this.activeMenuHorizontalItemId !== this.lastEnabledItemId) {
        const nextTabId = moveFocusToItem(this.menuHorizontalItems, 1, this.activeMenuHorizontalItemId);
        focusItem(nextTabId, this.el);
      }
    } else if (event.key === 'Home') {
      if (this.activeMenuHorizontalItemId !== this.firstEnabledItemId) {
        focusItem(this.firstEnabledItemId, this.el);
      }
    } else if (event.key === 'End') {
      if (this.activeMenuHorizontalItemId !== this.lastEnabledItemId) {
        focusItem(this.lastEnabledItemId, this.el);
      }
    }
    const activeElement = document.activeElement as HTMLElement;
    this.activeMenuHorizontalItemId = activeElement && activeElement.id ? activeElement.id : undefined;
  };

  private emitSelectedEvent(item) {
    this.athSelected.emit(item);
  }

  private scrollItems(direction: 'left' | 'right') {
    if (this.itemGroup) {
      const scrollFactor = 0.9;
      const scrollAmount = this.itemGroup.clientWidth * scrollFactor < 250 ? 250 : this.itemGroup.clientWidth * scrollFactor;
      this.itemGroup.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      requestAnimationFrame(() => this.updateArrowsVisibility());
    }
  }

  private getHostClassNames() {
    return {
      'ath-menu-horizontal': true,
      'ath-menu-horizontal--has-divider': this.hasDivider,
      'ath-items': true,
    };
  }

  private getMenuHorizontalItemItemClassNames(item) {
    return {
      'ath-menu-horizontal-item': true,
      ['ath-menu-horizontal-item--selected']: item.id === this.selectedMenuHorizontalItemId,
      ['ath-menu-horizontal-item--disabled']: item.disabled,
    };
  }

  private renderLabel = item => {
    if (item.badgeValue) {
      return (
        <ath-badge label={item.badgeLabel} position="right" value={item.badgeValue} max={item.badgeMax} color={item.disabled ? 'disabled' : 'accent'}>
          {item.label}
        </ath-badge>
      );
    } else return item.label;
  };

  render() {
    return (
      <Host>
        <div class={this.getHostClassNames()}>
          {this.showArrows && !this.isLeftArrowHidden && (
            <div class="ath-menu-horizontal__button ath-menu-horizontal__button-left" aria-hidden="true">
              <FcButtonComp
                icon="chevron_left"
                color="default"
                iconPosition={ButtonIconPosition.IconOnly}
                size={IconSize.Small}
                onClick={() => this.scrollItems('left')}
                aria-hidden="true"
                tabindex={-1}
              ></FcButtonComp>
            </div>
          )}

          <nav class="ath-menu-horizontal--item-group" ref={el => (this.itemGroup = el as HTMLElement)} onScroll={() => this.updateArrowsVisibility()}>
            <ul class="ath-menu-horizontal--item-group--list" role="menubar" aria-label={this.athAriaLabel}>
              {this.menuHorizontalItems.map((item, i) => (
                <li
                  class={{
                    'last-item--padding-right': i === this.menuHorizontalItems.length - 1,
                    'ath-menu-horizontal--item-group--list--item': true,
                  }}
                  role="none"
                >
                  <a
                    role="menuitem"
                    id={item.id}
                    href={item.href}
                    target={`_${item.target}`}
                    aria-disabled={item.disabled ? 'true' : 'false'}
                    tabindex={item.id === this.selectedMenuHorizontalItemId ? '0' : '-1'}
                    aria-current={item.id === this.selectedMenuHorizontalItemId ? 'page' : undefined}
                    class={this.getMenuHorizontalItemItemClassNames(item)}
                    onClick={e => this.handleItemClick(e, item)}
                    onKeyDown={event => this.handleKeyDown(event, item)}
                    onFocus={this.handleItemFocus}
                  >
                    <div class="ath-menu-horizontal-item--content">
                      <span class="ath-menu-horizontal-label">{this.renderLabel(item)}</span>
                      {item.id === this.selectedMenuHorizontalItemId && item.id === this.activeMenuHorizontalItemId && <span class="sr-only"> seleccionado</span>}
                    </div>

                    {item.target === 'blank' && <span class="sr-only ath-external-label">{' ' + item.externalLabel}</span>}
                    <div class={{ 'ath-menu-horizontal-item--indicator': this.selectedMenuHorizontalItemId === item.id }}></div>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {this.showArrows && !this.isRightArrowHidden && (
            <div class="ath-menu-horizontal__button ath-menu-horizontal__button-right" aria-hidden="true">
              <FcButtonComp
                icon="chevron_right"
                color="default"
                iconPosition={ButtonIconPosition.IconOnly}
                size={IconSize.Small}
                onClick={() => this.scrollItems('right')}
                buttonAriaLabel="Mostrar más pestañas hacia la derecha"
                aria-hidden="true"
                tabindex={-1}
              ></FcButtonComp>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
