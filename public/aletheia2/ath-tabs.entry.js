import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { F as FcButtonComp } from './index-8mh0qKYc.js';
import { B as ButtonIconPosition } from './button.model-Cy_pPkIg.js';
import './index-DLEKXOBo.js';
import { I as IconSize } from './types-Dwt0hPp9.js';
import './fc-label-CpydWJ5O.js';
import './icon.model-D_uLkZWw.js';

const moveFocusToTab = (tabs, direction, activeTabId, toEnd = false) => {
    const activeTabElement = document.activeElement;
    if (!activeTabElement)
        return activeTabId;
    const currentTab = tabs.find(tab => tab.id === activeTabElement?.id);
    if (currentTab) {
        let currentIndex = tabs.findIndex(tab => tab.id === currentTab.id);
        let nextIndex = currentIndex + direction;
        if (toEnd) {
            for (let i = tabs.length - 1; i >= 0; i--) {
                if (!tabs[i].disabled) {
                    nextIndex = i;
                    break;
                }
            }
        }
        else if (direction === 0) {
            nextIndex = tabs.findIndex(tab => !tab.disabled);
        }
        else {
            nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
            while (tabs[nextIndex] && tabs[nextIndex].disabled) {
                nextIndex = (nextIndex + direction + tabs.length) % tabs.length;
            }
        }
        const nextTab = tabs[nextIndex];
        // No loop
        if (nextTab && !nextTab.disabled) {
            if (direction === -1 && currentIndex === 0) {
                return activeTabId;
            }
            if (direction === 1 && currentIndex === tabs.length - 1) {
                return activeTabId;
            }
            return nextTab.id;
        }
    }
    return activeTabId;
};
const focusTab = (tabId, el) => {
    const tabElement = el.querySelector(`span#${tabId}`);
    if (tabElement) {
        tabElement.focus();
    }
};

const TabsTypes = {
    Underline: 'underline',
    Box: 'box',
};

const tabsCss = ".sc-ath-tabs-h .ath-tabs--underline.sc-ath-tabs{--color--selected:var(--ath-color-fg-default);--background--selected:none;--border-radius:var(--ath-border-radius-tab-item-underline) var(--ath-border-radius-tab-item-underline) 0 0}.sc-ath-tabs-h .ath-tabs--box.sc-ath-tabs{--color--selected:var(--ath-color-tab-item-box-fg-selected);--background--selected:var(--ath-color-tab-item-box-border);--border-radius:var(--ath-border-radius-tab-item-box)}.sc-ath-tabs-h .ath-button_comp--size-xs.sc-ath-tabs{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-tabs-h .ath-button_comp--size-sm.sc-ath-tabs{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-tabs-h .ath-button_comp--size-md.sc-ath-tabs{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-tabs-h .ath-button_comp--size-lg.sc-ath-tabs{--button-padding:var(--ath-spacing-button-padding-around-sm)}.ath-button_comp.sc-ath-tabs{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.ath-button_comp.sc-ath-tabs:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.ath-button_comp.sc-ath-tabs:hover{background:var(--ath-color-bg-alpha-hovered)}.ath-button_comp.sc-ath-tabs:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.ath-button_comp--disabled.sc-ath-tabs{pointer-events:none;color:var(--ath-color-button-icon-disabled)}.sc-ath-tabs-h{display:flex;width:100%;flex-direction:column;align-items:flex-start}.sc-ath-tabs-h .ath_tab-header.sc-ath-tabs{display:flex;align-items:center;align-self:stretch;position:relative;z-index:1}.sc-ath-tabs-h .ath_tab-header.ath-tabs--underline.sc-ath-tabs::before{content:\"\";position:absolute;bottom:4px;left:2px;width:100%;height:1px;background-color:var(--ath-color-tab-header-border);z-index:0}.sc-ath-tabs-h .ath-tab-header__button.sc-ath-tabs{display:flex;height:48px;align-items:center;gap:8px}.sc-ath-tabs-h .ath-tab-header__button-left.sc-ath-tabs{padding-right:var(--ath-spacing-050);margin-left:4px}.sc-ath-tabs-h .ath-tab-header__button-right.sc-ath-tabs{padding-left:var(--ath-spacing-050);margin-right:4px}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs{display:flex;flex:1 0 0;align-self:stretch;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs::-webkit-scrollbar{display:none}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs ul.sc-ath-tabs{display:flex;list-style:none;padding:0;margin:0;border:none;white-space:nowrap}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs li.sc-ath-tabs{display:inline-block;vertical-align:bottom;border:none}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__list--box.sc-ath-tabs{width:100%;gap:var(--ath-spacing-tab-box-group-col-gap)}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.sc-ath-tabs{display:flex;padding:var(--ath-spacing-tab-item-padding-y) var(--ath-spacing-tab-item-padding-x);gap:var(--ath-spacing-tab-item-col-gap);align-items:center;justify-content:center;position:relative;border-radius:var(--border-radius);border:none;outline:none;box-sizing:border-box;overflow:visible;cursor:pointer;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-tab-item);font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-tab-item);z-index:100;margin-bottom:4px;margin-top:4px}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.sc-ath-tabs:not(.ath-tab__item--selected):not(.ath-tab__item--disabled):hover{background:var(--ath-color-bg-alpha-hovered);font-weight:var(--ath-font-weight-tab-item-hovered)}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.sc-ath-tabs:not(.ath-tab__item--selected):not(.ath-tab__item--disabled):active{background:var(--ath-color-bg-alpha-pressed)}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--underline.sc-ath-tabs:focus-visible{box-shadow:0px 0px 0px 2px var(--ath-color-border-focus);z-index:1000}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--box.sc-ath-tabs:focus-visible{border:1px solid var(--ath-color-drop-shadow-focus, );box-shadow:0px 0px 0px 2px var(--ath-color-border-focus);z-index:1000}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--box--selected.sc-ath-tabs:focus-visible{border:1px solid var(--ath-color-drop-shadow-focus, );box-shadow:0px 0px 0px 2px var(--ath-color-border-focus);z-index:1000}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item--selected.sc-ath-tabs{font-weight:var(--ath-font-weight-medium);cursor:default}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--underline.ath-tab__item--selected.sc-ath-tabs:not(.ath-tab__item--disabled)::after,.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--underline.sc-ath-tabs:not(.ath-tab__item--disabled):hover::after,.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--underline.sc-ath-tabs:not(.ath-tab__item--disabled):active::before{content:\"\";position:absolute;bottom:0;left:0;width:100%;height:var(--ath-sizing-tab-item-indicator-height);border-radius:var(--ath-border-radius-tab-item-indicator);border:1px solid var(--ath-color-tab-item-indicator-bg-default);box-sizing:border-box;background:var(--ath-color-tab-item-indicator-bg-default);z-index:2}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.sc-ath-tabs:active:after{display:none}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item--disabled.sc-ath-tabs{color:var(--ath-color-fg-disabled);cursor:not-allowed;pointer-events:none}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--box.sc-ath-tabs{border:var(--ath-border-width-tab-item-box) solid var(--ath-color-tab-item-box-border);margin-left:-1px}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--box--selected.sc-ath-tabs{font-weight:var(--ath-font-weight-medium);color:var(--ath-color-tab-item-box-fg-selected);background:var(--ath-color-tab-item-box-bg-selected);cursor:default}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--box.sc-ath-tabs:not(.ath-tab__item--disabled):hover::after,.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs .ath-tab__item.ath-tab__item--box.sc-ath-tabs:not(.ath-tab__item--disabled):active::before{content:\"\";position:absolute;box-sizing:content-box;height:calc(100% - 2px);width:calc(100% - 2px);border:var(--ath-border-width-tab-item-box-hovered) solid var(--ath-color-tab-item-box-border);border-radius:var(--border-radius)}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs ul[role=tablist].sc-ath-tabs li.sc-ath-tabs:last-child .ath-tab__item--box.sc-ath-tabs{border-right:1px solid var(--ath-color-tab-item-box-border)}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs ul[role=tablist].sc-ath-tabs li.sc-ath-tabs:first-child .ath-tab__item--box.sc-ath-tabs:not(:focus-visible){border-left:1px solid var(--ath-color-tab-item-box-border)}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs ul[role=tablist].sc-ath-tabs li.sc-ath-tabs:first-child .ath-tab__item--box.sc-ath-tabs{margin-left:2px}.sc-ath-tabs-h .ath-tab__group.sc-ath-tabs ul[role=tablist].sc-ath-tabs li.sc-ath-tabs:first-child .ath-tab__item--underline.sc-ath-tabs{margin-left:2px}.sc-ath-tabs-h .warning.sc-ath-tabs{color:var(--ath-color-alert-fg-danger);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm, );font-style:normal;font-weight:400;line-height:150%;letter-spacing:-0.14px}";

let tabsSequence = 0;
const AthTabs = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Tipo de Tabs
     */
    type = TabsTypes.Underline;
    /**
     * Etiqueta accesible para la lista de tabs
     */
    listAriaLabel;
    /**
     * Lista de tabs a generar
     */
    items;
    selectedTabId;
    activeTabId;
    showLeftArrow = false;
    showRightArrow = false;
    get el() { return getElement(this); }
    hostId = ++tabsSequence;
    tabs = [];
    panelElements = [];
    firstEnabledTabId;
    lastEnabledTabId;
    tabGroup;
    resizeObserver;
    onItemsChange(newValue, oldValue) {
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
    generateTabs() {
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
    getTabs() {
        if (this.items) {
            const parsedItems = typeof this.items === 'string' ? this.parseItems(this.items) : [...this.items];
            return parsedItems;
        }
        return this.getTabElements();
    }
    parseItems(value) {
        try {
            return value ? JSON.parse(value) : [];
        }
        catch (error) {
            console.error('Error parsing items:', error);
            return [];
        }
    }
    getTabElements() {
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
    setPanelAtributes() {
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
    detectFirstAndLastEnabledTab() {
        this.firstEnabledTabId = this.tabs.find(tab => !tab.disabled).id;
        this.lastEnabledTabId = this.tabs
            .slice()
            .reverse()
            .find(tab => !tab.disabled)?.id;
    }
    detectSelectedTab() {
        const selectedTab = this.tabs.find(tab => tab.selected);
        this.selectedTabId = selectedTab ? selectedTab.id : this.firstEnabledTabId;
    }
    showSelectedPanel() {
        const selectedPanelId = this.tabs.find(tab => tab.id === this.selectedTabId).panelId;
        this.panelElements.forEach(panel => {
            if (panel.id === selectedPanelId) {
                panel.removeAttribute('hidden');
            }
            else {
                panel.setAttribute('hidden', 'true');
            }
        });
    }
    disconnectedCallback() {
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
    }
    handleTabClick = tab => {
        if (!tab.disabled) {
            this.selectedTabId = tab.id;
            this.showSelectedPanel();
        }
    };
    handleKeyUp = (event, tab) => {
        if (event.key === 'Enter' || event.key === ' ') {
            this.handleTabClick(tab);
        }
        else if (event.key === 'ArrowLeft') {
            if (this.activeTabId !== this.firstEnabledTabId) {
                const nextTabId = moveFocusToTab(this.tabs, -1, this.activeTabId);
                focusTab(nextTabId, this.el);
            }
        }
        else if (event.key === 'ArrowRight') {
            if (this.activeTabId !== this.lastEnabledTabId) {
                const nextTabId = moveFocusToTab(this.tabs, 1, this.activeTabId);
                focusTab(nextTabId, this.el);
            }
        }
        else if (event.key === 'Home') {
            if (this.activeTabId !== this.firstEnabledTabId) {
                focusTab(this.firstEnabledTabId, this.el);
            }
        }
        else if (event.key === 'End') {
            if (this.activeTabId !== this.lastEnabledTabId) {
                focusTab(this.lastEnabledTabId, this.el);
            }
        }
        this.activeTabId = document.activeElement.id;
    };
    scrollTabs(direction) {
        if (this.tabGroup) {
            const scrollAmount = 250;
            this.tabGroup.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
            requestAnimationFrame(() => this.updateArrowsVisibility());
        }
    }
    updateArrowsVisibility = () => {
        if (this.tabGroup) {
            const maxScrollLeft = this.tabGroup.scrollWidth - this.tabGroup.clientWidth;
            this.showLeftArrow = this.tabGroup.scrollLeft > 0;
            this.showRightArrow = this.tabGroup.scrollLeft < maxScrollLeft - 5;
        }
    };
    checkNumberOfPanels = () => {
        {
            if (this.panelElements.length != this.tabs.length) {
                console.error(`AVISO: Hay una ${this.panelElements.length > this.tabs.length ? 'mayor' : 'menor'} cantidad de paneles (${this.panelElements.length}) que de tabs (${this.tabs.length}). Por favor, revíselo.`);
            }
        }
    };
    getHostClassNames() {
        return {
            'ath_tab-header': true,
            [`ath-tabs--${this.type}`]: !!this.type,
        };
    }
    getTabItemClassNames(tab) {
        return {
            'ath-tab__item': true,
            [`ath-tab__item--${this.type}`]: !!this.type,
            ['ath-tab__item--selected']: tab.id === this.selectedTabId,
            ['ath-tab__item--box--selected']: tab.id === this.selectedTabId && this.type === 'box',
            ['ath-tab__item--disabled']: tab.disabled,
        };
    }
    getTabListClassNames() {
        return {
            'ath-tab__list--box': this.type === 'box',
        };
    }
    render() {
        return (h(Host, { key: '16aed2d3ab67aa0dfdbcb1c82f2ae540b8cb10bd' }, h("div", { key: 'fd1b058a228e692f48d0ad55b142097108e8f603', class: this.getHostClassNames() }, this.showLeftArrow && (h("div", { key: '57273a2de584ab9d4aa878f6b80eecac6a4bfc88', class: "ath-tab-header__button ath-tab-header__button-left" }, h(FcButtonComp, { key: '2bb1b02e996bb1b61af9f6ea5ef982c39c2d1d19', icon: "chevron_left", color: "default", iconPosition: ButtonIconPosition.IconOnly, size: IconSize.Small, onClick: () => this.scrollTabs('left'), buttonAriaLabel: "Mostrar m\u00E1s pesta\u00F1as hacia la izquierda" }))), h("div", { key: 'ba15145416736f20bcd6b28bb6c3cc40d373a255', class: "ath-tab__group", ref: el => (this.tabGroup = el), onScroll: () => this.updateArrowsVisibility() }, h("ul", { key: 'bee100cd44ba33e7d780ef742c63d6e748ff21b6', role: "tablist", "aria-label": this.listAriaLabel, class: this.getTabListClassNames() }, this.tabs.map(tab => (h("li", { role: "presentation", class: this.getTabListClassNames() }, h("span", { role: "tab", id: tab.id, "aria-controls": tab.panelId, "aria-selected": tab.id === this.selectedTabId ? 'true' : 'false', "aria-disabled": tab.disabled ? true : false, tabindex: tab.id === this.selectedTabId ? '0' : '-1', class: this.getTabItemClassNames(tab), onClick: () => this.handleTabClick(tab), onKeyUp: event => this.handleKeyUp(event, tab) }, tab.icon && h("ath-icon", { icon: tab.icon, size: "md", "aria-label": tab.iconAriaLabel }), tab.label)))))), this.showRightArrow && (h("div", { key: '26f4e78499747225caed60e42b48a9882c405c8c', class: "ath-tab-header__button ath-tab-header__button-right" }, h(FcButtonComp, { key: '1ab067dd5d578cb3cc23ef85fabdc904ca3598cd', icon: "chevron_right", color: "default", iconPosition: ButtonIconPosition.IconOnly, size: IconSize.Small, onClick: () => this.scrollTabs('right'), buttonAriaLabel: "Mostrar m\u00E1s pesta\u00F1as hacia la derecha" })))), h("slot", { key: 'b877108842349de7ebb3e9abf0618ad4822d63ce', name: "panel" })));
    }
    static get watchers() { return {
        "items": ["onItemsChange"]
    }; }
};
AthTabs.style = tabsCss;

export { AthTabs as ath_tabs };
//# sourceMappingURL=ath-tabs.entry.esm.js.map
