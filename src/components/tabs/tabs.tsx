import { Component, Prop, State, h, Element, Host, Watch } from '@stencil/core';
import { Tab } from './tabs.interfaces';
import { moveFocusToTab, focusTab } from './focus-manager';
import { TabItem, TabsType, TabsTypes } from './tabs.model';
import { FcButtonComp } from 'sharedfc/input';
import { ButtonIconPosition } from 'components/button/button.model';
import { IconSize } from '@utils/helper';

let tabsSequence = 0;

@Component({
  tag: 'ath-tabs',
  styleUrl: 'tabs.scss',
  scoped: true,
})
export class AthTabs {
  /**
   * Tipo de Tabs
   */
  @Prop() type: TabsType = TabsTypes.Underline;

  /**
   * Etiqueta accesible para la lista de tabs
   */
  @Prop() listAriaLabel: string;

  /**
   * Lista de tabs a generar
   */
  @Prop() items: TabItem[] | string;

  @State() selectedTabId: string;
  @State() activeTabId: string;
  @State() showLeftArrow = false;
  @State() showRightArrow = false;

  @Element() el: HTMLElement;

  private hostId = ++tabsSequence;
  private tabs: Tab[] = [];
  private panelElements: HTMLElement[] = [];
  private firstEnabledTabId: string;
  private lastEnabledTabId: string;
  private tabGroup!: HTMLElement;
  private resizeObserver: ResizeObserver;

  @Watch('items')
  onItemsChange(newValue: TabItem[] | string, oldValue: TabItem[] | string) {
    if (newValue !== oldValue) {
      this.generateTabs();
      this.detectFirstAndLastEnabledTab();
      this.detectSelectedTab();
      this.showSelectedPanel();
    }
  }

  componentWillLoad() {
    this.panelElements = Array.from(this.el.querySelectorAll('ath-panel'));
    this.generateTabs();
    this.detectFirstAndLastEnabledTab();
    this.detectSelectedTab();
    this.setPanelAtributes();
  }

  private generateTabs() {
    const tabs = this.getTabs();

    this.tabs = tabs.map(tab => ({
      id: `tab-${this.hostId}-${tab.id}`,
      label: tab.label,
      disabled: tab.disabled,
      icon: tab.icon,
      iconAriaLabel: tab['icon-aria-label'],
      selected: tab.selected === true,
      panelId: '',
    }));
  }

  private getTabs(): TabItem[] {
    if (this.items) {
      const parsedItems = typeof this.items === 'string' ? this.parseItems(this.items) : [...this.items];
      return parsedItems;
    }

    return this.getTabElements();
  }

  private parseItems(value: string): TabItem[] {
    try {
      return value ? JSON.parse(value) : [];
    } catch (error) {
      console.error('Error parsing items:', error);
      return [];
    }
  }

  private getTabElements(): TabItem[] {
    return Array.from(this.el.querySelectorAll('ath-tab')).map(tab => ({
      id: tab.id,
      label: tab.label,
      disabled: tab.disabled,
      icon: tab.icon,
      iconAriaLabel: tab.iconAriaLabel,
      selected: tab.selected,
    }));
  }

  componentDidLoad() {
    this.showSelectedPanel();
    this.updateArrowsVisibility();
    this.resizeObserver = new ResizeObserver(() => {
      this.updateArrowsVisibility();
    });
    this.resizeObserver.observe(this.el);
    this.checkNumberOfPanels();
  }

  private setPanelAtributes() {
    this.panelElements.map((_panel, index) => this.panelElements[index].setAttribute('hidden', 'true'));
    this.tabs.map((tab, index) => {
      if (this.panelElements[index]) {
        if (!this.panelElements[index].id) {
          this.panelElements[index].setAttribute('id', `panel-${tab.id}`);
        }
        tab.panelId = this.panelElements[index].id;
        this.panelElements[index].setAttribute('aria-labelledby', tab.id);
      }
    });
  }

  private detectFirstAndLastEnabledTab() {
    this.firstEnabledTabId = this.tabs.find(tab => !tab.disabled).id;
    this.lastEnabledTabId = this.tabs
      .slice()
      .reverse()
      .find(tab => !tab.disabled)?.id;
  }

  private detectSelectedTab(): void {
    const selectedTab = this.tabs.find(tab => tab.selected);
    this.selectedTabId = selectedTab ? selectedTab.id : this.firstEnabledTabId;
  }

  private showSelectedPanel() {
    const selectedPanelId = this.tabs.find(tab => tab.id === this.selectedTabId).panelId;

    this.panelElements.forEach(panel => {
      if (panel.id === selectedPanelId) {
        panel.removeAttribute('hidden');
      } else {
        panel.setAttribute('hidden', 'true');
      }
    });
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  private handleTabClick = tab => {
    if (!tab.disabled) {
      this.selectedTabId = tab.id;
      this.showSelectedPanel();
    }
  };

  private handleKeyUp = (event: KeyboardEvent, tab) => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.handleTabClick(tab);
    } else if (event.key === 'ArrowLeft') {
      if (this.activeTabId !== this.firstEnabledTabId) {
        const nextTabId = moveFocusToTab(this.tabs, -1, this.activeTabId);
        focusTab(nextTabId, this.el);
      }
    } else if (event.key === 'ArrowRight') {
      if (this.activeTabId !== this.lastEnabledTabId) {
        const nextTabId = moveFocusToTab(this.tabs, 1, this.activeTabId);
        focusTab(nextTabId, this.el);
      }
    } else if (event.key === 'Home') {
      if (this.activeTabId !== this.firstEnabledTabId) {
        focusTab(this.firstEnabledTabId, this.el);
      }
    } else if (event.key === 'End') {
      if (this.activeTabId !== this.lastEnabledTabId) {
        focusTab(this.lastEnabledTabId, this.el);
      }
    }
    this.activeTabId = (document.activeElement as HTMLElement).id;
  };

  private scrollTabs(direction: 'left' | 'right') {
    if (this.tabGroup) {
      const scrollAmount = 250;
      this.tabGroup.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });

      requestAnimationFrame(() => this.updateArrowsVisibility());
    }
  }

  private updateArrowsVisibility = () => {
    if (this.tabGroup) {
      const maxScrollLeft = this.tabGroup.scrollWidth - this.tabGroup.clientWidth;
      this.showLeftArrow = this.tabGroup.scrollLeft > 0;
      this.showRightArrow = this.tabGroup.scrollLeft < maxScrollLeft - 5;
    }
  };

  private checkNumberOfPanels = () => {
    {
      if (this.panelElements.length != this.tabs.length) {
        console.error(
          `AVISO: Hay una ${this.panelElements.length > this.tabs.length ? 'mayor' : 'menor'} cantidad de paneles (${this.panelElements.length}) que de tabs (${this.tabs.length}). Por favor, revíselo.`,
        );
      }
    }
  };

  private getHostClassNames() {
    return {
      'ath_tab-header': true,
      [`ath-tabs--${this.type}`]: !!this.type,
    };
  }

  private getTabItemClassNames(tab) {
    return {
      'ath-tab__item': true,
      [`ath-tab__item--${this.type}`]: !!this.type,
      ['ath-tab__item--selected']: tab.id === this.selectedTabId,
      ['ath-tab__item--box--selected']: tab.id === this.selectedTabId && this.type === 'box',
      ['ath-tab__item--disabled']: tab.disabled,
    };
  }

  private getTabListClassNames() {
    return {
      'ath-tab__list--box': this.type === 'box',
    };
  }

  render() {
    return (
      <Host>
        <div class={this.getHostClassNames()}>
          {this.showLeftArrow && (
            <div class="ath-tab-header__button ath-tab-header__button-left">
              <FcButtonComp
                icon="chevron_left"
                color="default"
                iconPosition={ButtonIconPosition.IconOnly}
                size={IconSize.Small}
                onClick={() => this.scrollTabs('left')}
                buttonAriaLabel="Mostrar más pestañas hacia la izquierda"
              ></FcButtonComp>
            </div>
          )}
          <div class="ath-tab__group" ref={el => (this.tabGroup = el as HTMLElement)} onScroll={() => this.updateArrowsVisibility()}>
            <ul role="tablist" aria-label={this.listAriaLabel} class={this.getTabListClassNames()}>
              {this.tabs.map(tab => (
                <li role="presentation" class={this.getTabListClassNames()}>
                  <span
                    role="tab"
                    id={tab.id}
                    aria-controls={tab.panelId}
                    aria-selected={tab.id === this.selectedTabId ? 'true' : 'false'}
                    aria-disabled={tab.disabled ? true : false}
                    tabindex={tab.id === this.selectedTabId ? '0' : '-1'}
                    class={this.getTabItemClassNames(tab)}
                    onClick={() => this.handleTabClick(tab)}
                    onKeyUp={event => this.handleKeyUp(event, tab)}
                  >
                    {tab.icon && <ath-icon icon={tab.icon} size="md" aria-label={tab.iconAriaLabel}></ath-icon>}
                    {tab.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {this.showRightArrow && (
            <div class="ath-tab-header__button ath-tab-header__button-right">
              <FcButtonComp
                icon="chevron_right"
                color="default"
                iconPosition={ButtonIconPosition.IconOnly}
                size={IconSize.Small}
                onClick={() => this.scrollTabs('right')}
                buttonAriaLabel="Mostrar más pestañas hacia la derecha"
              ></FcButtonComp>
            </div>
          )}
        </div>
        <slot name="panel"></slot>
      </Host>
    );
  }
}
