import { Component, ComponentInterface, Prop, Element, Host, h, State, Event, EventEmitter } from '@stencil/core';
import { MenuVerticalAppearance, MenuVerticalAppearances } from './menu-vertical.model';
import { MenuItem } from './stories/menu-vertical.types';

let menuVerticalSequence = 0;

@Component({
  tag: 'ath-menu-vertical',
  styleUrls: ['menu-vertical.scss'],
  shadow: true,
})
export class AthMenuVertical implements ComponentInterface {
  private menuVerticalId = `ath-menu-vertical-${menuVerticalSequence++}`;
  private menuLevelId = `${this.menuVerticalId}-menu`;

  /**
   * Appearance of the menu
   */
  @Prop() appearance: MenuVerticalAppearance = MenuVerticalAppearances.Primary;

  /**
   * Emitted when link or action Button is clicked
   */
  @Event() athSelected: EventEmitter<MenuItem>;

  @Element() el: HTMLElement;

  @State() menuItems: MenuItem[];
  @State() focusedItemId: string = '';

  private focusableItems: HTMLElement[] = [];

  private mutationObserver: MutationObserver;

  // Lifecycle
  componentWillLoad() {
    this.menuItems = Array.from(this.el.children)
      .filter(el => el.tagName.startsWith('ath-MENU-VERTICAL'))
      .map(el => this.mapElementToMenuItem(el));

    let menuSequence = 0;
    const assignIds = (items: MenuItem[], prefix: string) => {
      items.forEach(item => {
        item.id = `${prefix}-${menuSequence++}`;
        if (item.children && item.children.length > 0) {
          assignIds(Array.from(item.children), item.id);
        }
      });
    };
    assignIds(this.menuItems, this.menuLevelId);

    this.observeMutationTreeList();

    let firstFocusableId: string | null = null;
    if (this.appearance === MenuVerticalAppearances.Primary) {
      firstFocusableId = this.findFirstFocusableItemId(this.menuItems);
    } else {
      firstFocusableId = this.menuItems.length > 0 ? this.findFirstFocusableItemId(Array.from(this.menuItems[0].children)) : null;
    }
    if (firstFocusableId) {
      this.focusedItemId = firstFocusableId;
    }
    this.buildMenuItemsAndInitialize();
  }

  private mapElementToMenuItem(el: Element): MenuItem {
    const children = Array.from(el.children)
      .filter(child => child.tagName.startsWith('ath-MENU-VERTICAL'))
      .map(child => this.mapElementToMenuItem(child));

    const tagName = el.tagName as 'ath-MENU-VERTICAL-ITEM-LINK' | 'ath-MENU-VERTICAL-ITEM-ACTION';

    const allowedTargets = ['self', 'parent', 'blank', 'top'];
    const targetAttr = el.getAttribute('target');
    const target = allowedTargets.includes(targetAttr) ? (targetAttr as 'self' | 'parent' | 'blank' | 'top') : undefined;

    return {
      tagName,
      text: el.getAttribute('text') || '',
      selected: el.hasAttribute('selected'),
      open: el.hasAttribute('open'),
      disabled: el.hasAttribute('disabled'),
      icon: el.getAttribute('icon') || undefined,
      ariaLabel: el.getAttribute('aria-label') || undefined,
      ariaControls: el.getAttribute('aria-controls') || undefined,
      ariaExpanded: el.hasAttribute('aria-expanded') ? el.getAttribute('aria-expanded') === 'true' : undefined,
      ariaLabelledby: el.getAttribute('aria-labelledby') || undefined,
      href: el.getAttribute('href') || undefined,
      target,
      rel: el.getAttribute('rel') || undefined,
      externalLabel: el.getAttribute('externalLabel') || undefined,
      value: el.getAttribute('value') || undefined,
      children,
    };
  }

  private initializeOpenState() {
    if (!this.menuItems || this.menuItems.length === 0) return;

    this.cleanSelectedAttribute(this.menuItems);
    this.cleanOpenAttribute(this.menuItems);

    let selectedPath: any[] = [];
    let foundSelected = false;

    const findSelectedPath = (items: any[], path: any[] = []): boolean => {
      for (const item of items) {
        if (foundSelected) return true;
        if (item.selected) {
          selectedPath = [...path, item];
          foundSelected = true;
          return true;
        }
        if (item.children && item.children.length > 0) {
          if (findSelectedPath(Array.from(item.children), [...path, item])) {
            return true;
          }
        }
      }
      return false;
    };
    findSelectedPath(this.menuItems);

    if (selectedPath.length > 0) {
      const openOnlySelectedPath = (items: any[], path: any[], depth: number = 0) => {
        items.forEach(item => {
          item.open = selectedPath[depth] === item;
          if (item.children && item.children.length > 0) {
            openOnlySelectedPath(Array.from(item.children), path, depth + 1);
          }
        });
      };
      openOnlySelectedPath(this.menuItems, selectedPath);
      return;
    }

    let openPath: any[] = [];
    let foundOpen = false;
    const findOpenPath = (items: any[], path: any[] = []): boolean => {
      for (const item of items) {
        if (foundOpen) return true;
        if (item.open) {
          openPath = [...path, item];
          foundOpen = true;
          return true;
        }
        if (item.children && item.children.length > 0) {
          if (findOpenPath(Array.from(item.children), [...path, item])) {
            return true;
          }
        }
      }
      return false;
    };
    findOpenPath(this.menuItems);

    if (openPath.length > 1) {
      this.menuItems.forEach(item => {
        item.open = false;
        if (openPath[0] && item === openPath[0]) {
          item.open = true;
          if (openPath[1] && item.children) {
            Array.from(item.children).forEach((child: any) => {
              child.open = child === openPath[1];
            });
          }
        }
      });
      return;
    }

    const firstOpenIndex = this.menuItems.findIndex(item => item.open);
    if (firstOpenIndex !== -1) {
      this.menuItems.forEach((item, idx) => {
        item.open = idx === firstOpenIndex;
        if (item.children) {
          Array.from(item.children).forEach((child: any) => {
            child.open = false;
          });
        }
      });
      return;
    }

    const firstParentIndex = this.menuItems.findIndex(item => item.children && item.children.length > 0);
    this.menuItems.forEach((item, idx) => {
      item.open = idx === firstParentIndex;
      if (item.children) {
        Array.from(item.children).forEach((child: any) => {
          child.open = false;
        });
      }
    });
  }

  private cleanSelectedAttribute(items: any[]) {
    let found = false;
    function clean(items: any[]) {
      for (const item of items) {
        if (item.selected && !found) {
          found = true;
        } else {
          item.selected = false;
        }
        if (item.children && item.children.length > 0) {
          clean(Array.from(item.children));
        }
      }
    }
    clean(items);
  }

  private cleanOpenAttribute(items: any[]) {
    items.forEach(item => {
      const isLink = item.tagName === 'ath-MENU-VERTICAL-ITEM-LINK';
      const hasChildren = item.children && item.children.length > 0;

      if (hasChildren) {
        this.cleanOpenAttribute(Array.from(item.children));
        const childHasOpen = Array.from(item.children).some((child: any) => child.open);
        if (childHasOpen) {
          item.open = false;
        }
      }

      if (!hasChildren || isLink) {
        item.open = false;
      }
    });
  }

  private observeMutationTreeList() {
    this.mutationObserver = new MutationObserver(() => {
      this.buildMenuItemsAndInitialize();
    });

    Array.from(this.el.children)
      .filter(el => el.tagName.startsWith('ath-MENU-VERTICAL'))
      .forEach(menuItemEl => {
        this.mutationObserver.observe(menuItemEl, {
          childList: true,
          subtree: true,
          attributes: true,
        });
      });
  }

  private findFirstFocusableItemId(items: MenuItem[]): string | null {
    for (const item of items) {
      if (!item.disabled) return item.id;
      if (item.children && item.children.length > 0) {
        const childId = this.findFirstFocusableItemId(Array.from(item.children));
        if (childId) return childId;
      }
    }
    return null;
  }

  componentDidLoad() {
    this.focusableItems = Array.from(this.el.shadowRoot.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')) as HTMLElement[];
    this.observeMutationTreeList();
  }

  private buildMenuItemsAndInitialize() {
    this.menuItems = Array.from(this.el.children)
      .filter(el => el.tagName.startsWith('ath-MENU-VERTICAL'))
      .map(el => this.mapElementToMenuItem(el));

    let menuSequence = 0;
    const assignIds = (items: MenuItem[], prefix: string) => {
      items.forEach(item => {
        item.id = `${prefix}-${menuSequence++}`;
        if (item.children && item.children.length > 0) {
          assignIds(Array.from(item.children), item.id);
        }
      });
    };
    assignIds(this.menuItems, this.menuLevelId);

    this.initializeOpenState();

    let firstFocusableId: string | null = null;
    if (this.appearance === MenuVerticalAppearances.Primary) {
      firstFocusableId = this.findFirstFocusableItemId(this.menuItems);
    } else {
      firstFocusableId = this.menuItems.length > 0 ? this.findFirstFocusableItemId(Array.from(this.menuItems[0].children)) : null;
    }
    if (firstFocusableId) {
      this.focusedItemId = firstFocusableId;
    }
  }

  disconnectedCallback() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  // Render
  private renderMenu() {
    const menuArray = [];
    let menuSequence = 0;
    this.menuItems.forEach(item => {
      const itemId = `${this.menuLevelId}-${menuSequence++}`;
      item.id = itemId;
      if (this.appearance === MenuVerticalAppearances.Primary) {
        menuArray.push(this.renderLevel1(item, itemId));
      } else {
        menuArray.push(
          <li class="ath-section-sublist">
            <ath-section-title headingText={item.text} color="accent"></ath-section-title>
            {Array.from(item.children).length > 0 && <ul class="ath-menu-vertical__menu">{this.createMenu(itemId, Array.from(item.children), 2)}</ul>}
          </li>,
        );
      }
    });
    return menuArray;
  }

  private renderLevel1(item: any, id: string) {
    const isOpen = !!item.open;
    const isSelected = this.isItemSelected(item, 1);
    const renderLevel1ClassNames = ['ath-menu-vertical__level-1', isSelected ? 'selected' : '', item.disabled ? 'disabled' : '', isOpen ? 'open' : ''].filter(Boolean).join(' ');

    if (item.tagName === 'ath-MENU-VERTICAL-ITEM-LINK') {
      return (
        <li role="none">
          <a
            role="menuitem"
            id={id}
            {...(item.disabled ? {} : this.getLinkProp(item))}
            class={renderLevel1ClassNames}
            tabIndex={this.getTabIndex(item)}
            onFocus={item.disabled ? undefined : () => this.setFocusedItem(id)}
            aria-disabled={item.disabled ? 'true' : undefined}
            aria-label={item.ariaLabel}
            aria-labelledby={item.ariaLabelledby}
            aria-current={item.selected ? 'page' : undefined}
            onClick={e => {
              if (item.disabled) {
                e.preventDefault();
                return;
              }
              this.handleClick(id);
            }}
            onKeyDown={item.disabled ? undefined : e => this.handleKeyDown(e, id, 1, false)}
            ref={el => el && this.registerFocusableItem(el)}
          >
            <div class="ath-menu-vertical__level-1__icon">
              <ath-icon icon={!!item.icon ? item.icon : 'placeholder'} size="lg" color="inherit"></ath-icon>
            </div>
            <div class="ath-menu-vertical__level-1__text">{item.text}</div>
          </a>
        </li>
      );
    }

    return (
      <li class="ath-menu-vertical__list__group" role="none">
        <div
          id={id}
          class={renderLevel1ClassNames}
          role="menuitem"
          tabIndex={item.disabled ? -1 : this.focusedItemId === id ? 0 : -1}
          onFocus={item.disabled ? undefined : () => this.setFocusedItem(id)}
          aria-label={item.ariaLabel}
          aria-controls={`${id}-list`}
          aria-expanded={Array.from(item.children).length > 0 ? (isOpen ? 'true' : 'false') : undefined}
          aria-haspopup={Array.from(item.children).length > 0 ? 'menu' : undefined}
          aria-current={Array.from(item.children).length === 0 && item.selected ? 'page' : undefined}
          aria-disabled={item.disabled ? 'true' : undefined}
          onClick={item.disabled || isOpen ? undefined : Array.from(item.children).length > 0 ? () => this.handleClickOpen(id, 1, false) : () => this.handleClick(id)}
          onKeyDown={item.disabled ? undefined : e => this.handleKeyDown(e, id, 1, Array.from(item.children).length > 0)}
          ref={el => el && this.registerFocusableItem(el)}
        >
          <div class="ath-menu-vertical__level-1__icon">
            <ath-icon icon={!!item.icon ? item.icon : 'placeholder'} size="lg" color="inherit"></ath-icon>
          </div>
          <div class="ath-menu-vertical__level-1__text">
            <span>{item.text}</span>
            {Array.from(item.children).length > 0 && (
              <div class={`ath-menu-vertical__level-1__text__button${isOpen ? ' open' : ''}`}>
                <ath-icon size="md" icon="chevron_down" color="inherit" aria-hidden="true"></ath-icon>
              </div>
            )}
          </div>
        </div>
        {Array.from(item.children).length > 0 && isOpen && (
          <ul role="menu" id={`${id}-list`} class="ath-menu-vertical__menu ath-menu-vertical__sublist">
            {this.createMenu(id, Array.from(item.children), 2)}
          </ul>
        )}
      </li>
    );
  }

  private createMenu(id: string, arrayMenu: any[], level: number) {
    const menuArray = [];
    let menuSequence = 0;
    arrayMenu.forEach(item => {
      const itemId = `${id}-${menuSequence++}`;
      const isOpen = !!item.open;
      const isSelected = this.isItemSelected(item, level);
      const menuClassNames = [
        `ath-menu-vertical__level-${level}`,
        this.appearance === MenuVerticalAppearances.Primary ? 'primary' : 'secondary',
        isSelected ? 'selected' : '',
        item.disabled ? 'disabled' : '',
        isOpen ? 'open' : '',
      ]
        .filter(Boolean)
        .join(' ');

      const hasChildren = Array.from(item.children).length > 0;
      item.id = itemId;

      menuArray.push(
        <li role="none" class="ath-menu-vertical__sublist">
          <div class={menuClassNames}>
            {item.tagName === 'ath-MENU-VERTICAL-ITEM-LINK' ? this.createLink(item, level) : this.createAction(item, hasChildren, itemId, isOpen, level)}
          </div>
          {hasChildren && isOpen && (
            <ul role="menu" id={`${itemId}-list`} class="ath-menu-vertical__menu ath-menu-vertical__sublist">
              {this.createMenu(itemId, Array.from(item.children), level + 1)}
            </ul>
          )}
        </li>,
      );
    });
    return menuArray;
  }

  private createAction(item: any, hasChildren: boolean, itemId: string, isOpen: boolean, level: number) {
    const isSelected = this.isItemSelected(item, level);
    const actionClassNames = [
      'ath-menu-vertical__wrapper-title',
      isSelected ? 'selected' : '',
      item.disabled ? 'disabled' : '',
      isOpen ? 'open' : '',
      level === 3 && 'ath-menu-vertical__wrapper-title__no-gap',
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <div
        role="menuitem"
        id={itemId}
        class={actionClassNames}
        tabIndex={this.getTabIndex(item)}
        onFocus={item.disabled ? undefined : () => this.setFocusedItem(itemId)}
        aria-label={item.ariaLabel}
        aria-controls={hasChildren ? `${itemId}-list` : item.ariaControls}
        aria-expanded={Array.from(item.children).length > 0 ? (isOpen ? 'true' : 'false') : undefined}
        aria-haspopup={hasChildren ? 'menu' : undefined}
        aria-current={Array.from(item.children).length === 0 && item.selected ? 'page' : undefined}
        aria-disabled={item.disabled ? 'true' : undefined}
        onClick={item.disabled ? undefined : hasChildren ? () => this.handleClickOpen(itemId, level, true) : () => this.handleClick(itemId)}
        onKeyDown={item.disabled ? undefined : e => this.handleKeyDown(e, itemId, level, hasChildren)}
        ref={el => el && this.registerFocusableItem(el)}
      >
        <span>{item.text}</span>
        {hasChildren && (
          <span class={`ath-menu-vertical__wrapper-title__button${isOpen ? ' open' : ''}`}>
            <ath-icon size="md" icon="chevron_down" color="inherit" aria-hidden="true"></ath-icon>
          </span>
        )}
      </div>
    );
  }

  private createLink(item: any, level: number) {
    const linkProps = item.disabled ? undefined : this.getLinkProp(item);
    const isSelected = item.selected;
    const linkClassNames = [
      'ath-menu-vertical__wrapper-title',
      isSelected ? 'selected' : '',
      item.disabled ? 'disabled' : '',
      level === 3 && 'ath-menu-vertical__wrapper-title__no-gap',
    ]
      .filter(Boolean)
      .join(' ');
    return (
      <a
        role="menuitem"
        id={item.id}
        {...linkProps}
        class={linkClassNames}
        tabIndex={this.getTabIndex(item)}
        onFocus={item.disabled ? undefined : () => this.setFocusedItem(item.id)}
        aria-disabled={item.disabled ? 'true' : undefined}
        aria-label={item.ariaLabel ? item.ariaLabel : undefined}
        aria-labelledby={item.ariaLabelledby ? item.ariaLabelledby : undefined}
        aria-current={item.selected ? 'page' : undefined}
        onClick={e => {
          if (item.disabled) {
            e.preventDefault();
            return;
          }
          this.handleClick(item.id);
        }}
        onKeyDown={item.disabled ? undefined : e => this.handleKeyDown(e, item.id, 3, false)}
        ref={el => el && this.registerFocusableItem(el)}
      >
        <span>{item.text}</span>
        {item.target === 'blank' && <span class="ath-visibility-hidden">{item.externalLabel}</span>}
      </a>
    );
  }

  private getTabIndex(item: any): number {
    if (item.disabled) return -1;
    if (this.focusedItemId === item.id) return 0;
    if (this.focusedItemId === '' && this.focusableItems[0] && item.id === this.focusableItems[0].id) return 0;
    return -1;
  }

  private getLinkProp = (item: any) => ({
    href: item.href,
    rel: item.rel,
    target: `_${item.target}`,
  });

  private registerFocusableItem = (el: HTMLElement) => {
    if (el && !this.focusableItems.includes(el)) {
      this.focusableItems.push(el);
    }
  };

  // Interactivity
  private isItemSelected(item: any, level: number): boolean {
    if (level === 3) {
      return !!item.selected;
    }

    if (level === 2) {
      if (!item.children || item.children.length === 0) {
        return !!item.selected;
      } else {
        const hasSelectedChild = Array.from(item.children).some((child: any) => this.isItemSelected(child, 3));
        return hasSelectedChild && !item.open;
      }
    }

    if (level === 1) {
      if (!item.children || item.children.length === 0) {
        return !!item.selected;
      }

      const hasSelectedChild = Array.from(item.children).some((child: any) => this.isItemSelected(child, 2));
      if (hasSelectedChild && !item.open) return true;

      const hasSelectedGrandchild = Array.from(item.children).some(
        (child: any) => child.children && Array.from(child.children).some((grandchild: any) => this.isItemSelected(grandchild, 3)),
      );
      if (hasSelectedGrandchild && !item.open) return true;

      return false;
    }

    return false;
  }

  private setFocusedItem = (itemId: string) => {
    this.focusedItemId = itemId;
  };

  private handleClick = (currentId: string) => {
    let itemClicked;

    if (!this.menuItems) return;

    this.deselectAll(this.menuItems);

    const selectById = (items: any[]) => {
      items.forEach(item => {
        if (item.id === currentId) {
          itemClicked = item;
          item.selected = true;
        }
        if (item.children && item.children.length > 0) {
          selectById(Array.from(item.children));
        }
      });
    };

    selectById(this.menuItems);
    this.athSelected.emit(itemClicked);

    this.menuItems = [...this.menuItems];
  };

  private handleClickOpen = (id: string, level: number = 1, focusFirstChild: boolean = false) => {
    if (!this.menuItems) return;

    if (level === 1) {
      this.menuItems.forEach(item => {
        item.open = item.id === id;
        if (item.children && item.children.length > 0) {
          Array.from(item.children).forEach((child: any) => {
            child.open = false;
          });
        }
      });
    } else if (level === 2) {
      this.menuItems.forEach(item => {
        if (item.children && item.children.length > 0) {
          Array.from(item.children).forEach((child: any) => {
            child.open = child.id === id;
          });
        }
      });
    } else {
      const closeSiblingsAndOpen = (items: any[]) => {
        for (const item of items) {
          if (item.children && item.children.length > 0) {
            const child = Array.from(item.children).find((c: any) => c.id === id);
            if (child) {
              Array.from(item.children).forEach((c: any) => {
                c.open = c.id === id;
                if (c.children && c.children.length > 0 && c.id !== id) {
                  Array.from(c.children).forEach((grandchild: any) => {
                    grandchild.open = false;
                  });
                }
              });
              return true;
            } else if (closeSiblingsAndOpen(Array.from(item.children))) {
              return true;
            }
          }
        }
        return false;
      };
      closeSiblingsAndOpen(this.menuItems);
    }

    this.menuItems = [...this.menuItems];

    if (focusFirstChild) {
      const parent = this.findItemById(this.menuItems, id);
      if (parent && parent.children && parent.children.length > 0) {
        const firstChildId = `${id}-0`;
        this.focusedItemId = firstChildId;
      }
    }
  };

  private findItemById(items: any[], id: string): any | null {
    for (const item of items) {
      if (item.id === id) return item;
      if (item.children && item.children.length > 0) {
        const found = this.findItemById(Array.from(item.children), id);
        if (found) return found;
      }
    }
    return null;
  }

  private handleKeyDown = (e: KeyboardEvent, id: string, level: number = 1, hasChildren: boolean) => {
    switch (e.key) {
      case 'ArrowDown':
        if (hasChildren && level === 1) {
          const parent = this.findItemById(this.menuItems, id);
          if (parent && parent.selected && parent.children && parent.children.length > 0) {
            const firstChildId = `${id}-0`;
            this.focusedItemId = firstChildId;
            const firstChildEl = this.el.shadowRoot.querySelector(`[id="${firstChildId}"]`) as HTMLElement;
            if (firstChildEl) firstChildEl.focus();
            break;
          }
        }
        this.updateFocusableItems();
        this.focusNext(id);
        break;
      case 'ArrowUp':
        this.focusPrev(id);
        break;
      case 'ArrowRight':
        if (hasChildren) {
          this.handleClickOpen(id, level, false);
        }
        break;
      case ' ':
      case 'Enter':
        if (hasChildren) {
          this.handleClickOpen(id, level, false);
        } else {
          this.handleClick(id);
        }
        break;
    }
  };

  private deselectAll(items: any[]) {
    items.forEach(item => {
      item.selected = false;
      if (item.children && item.children.length > 0) {
        this.deselectAll(Array.from(item.children));
      }
    });
  }

  private updateFocusableItems() {
    this.focusableItems = Array.from(this.el.shadowRoot.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')) as HTMLElement[];
  }

  private focusPrev(currentId: string) {
    const currentEl = this.el.shadowRoot.querySelector(`[id="${currentId}"]`) as HTMLElement;
    if (!currentEl) return;
    const parentUl = currentEl.closest('ul[role="menu"]');
    if (!parentUl) return;
    const items = Array.from(parentUl.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])')) as HTMLElement[];
    const idx = items.findIndex(el => el.id === currentId);
    if (idx === -1) return;

    if (idx > 0) {
      items[idx - 1].focus();
      this.focusedItemId = items[idx - 1].id;
    } else {
      const parentLi = parentUl.closest('li[role="none"]');
      if (parentLi) {
        const parentMenuItem = parentLi.querySelector('[role="menuitem"]:not([aria-disabled="true"])');
        if (parentMenuItem) {
          (parentMenuItem as HTMLElement).focus();
          this.focusedItemId = (parentMenuItem as HTMLElement).id;
          return;
        }
      }
    }
  }

  private focusNext(currentId: string) {
    const items = this.focusableItems;
    const idx = items.findIndex(el => el.id === currentId);
    if (idx === -1) return;

    if (idx < items.length - 1) {
      items[idx + 1].focus();
      this.focusedItemId = items[idx + 1].id;
    }
  }

  // SCSS
  private getListClassNames = () => ({
    'ath-menu-vertical__menu': true,
    'ath-menu-vertical__list': true,
    [`ath-menu-vertical-${this.appearance}`]: true,
  });

  render() {
    return (
      <Host role="navigation" class="ath-menu-vertical">
        <ul role="menu" class={this.getListClassNames()}>
          {this.renderMenu()}
        </ul>
      </Host>
    );
  }
}
