import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { F as FcButtonComp } from './index-8mh0qKYc.js';
import { B as ButtonIconPosition } from './button.model-Cy_pPkIg.js';
import './index-DLEKXOBo.js';
import { T as TargetType } from './menu-horizontal.model-CgHQrXFp.js';
import { I as IconSize } from './types-Dwt0hPp9.js';
import './fc-label-CpydWJ5O.js';
import './icon.model-D_uLkZWw.js';

const moveFocusToItem = (items, direction, activeItemId, toEnd = false) => {
    if (!items || items.length === 0)
        return activeItemId;
    const currentIndex = items.findIndex(item => item.id === activeItemId);
    if (currentIndex === -1)
        return activeItemId;
    if (items[currentIndex].disabled)
        return activeItemId;
    if (direction === 0) {
        const firstEnabled = items.find(item => !item.disabled);
        return firstEnabled ? firstEnabled.id : activeItemId;
    }
    if (toEnd) {
        const lastEnabled = [...items].reverse().find(item => !item.disabled);
        return lastEnabled ? lastEnabled.id : activeItemId;
    }
    if (direction === 1) {
        for (let i = currentIndex + 1; i < items.length; i++) {
            if (!items[i].disabled)
                return items[i].id;
        }
        return activeItemId;
    }
    if (direction === -1) {
        for (let i = currentIndex - 1; i >= 0; i--) {
            if (!items[i].disabled)
                return items[i].id;
        }
        return activeItemId;
    }
    return activeItemId;
};
const focusItem = (itemId, el) => {
    const itemElement = el.querySelector(`a#${itemId}`);
    if (itemElement) {
        itemElement.focus();
    }
};

const menuHorizontalCss = ".sc-ath-menu-horizontal-h .ath-button_comp--size-xs.sc-ath-menu-horizontal{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-menu-horizontal-h .ath-button_comp--size-sm.sc-ath-menu-horizontal{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-menu-horizontal-h .ath-button_comp--size-md.sc-ath-menu-horizontal{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-menu-horizontal-h .ath-button_comp--size-lg.sc-ath-menu-horizontal{--button-padding:var(--ath-spacing-button-padding-around-sm)}.ath-button_comp.sc-ath-menu-horizontal{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.ath-button_comp.sc-ath-menu-horizontal:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.ath-button_comp.sc-ath-menu-horizontal:hover{background:var(--ath-color-bg-alpha-hovered)}.ath-button_comp.sc-ath-menu-horizontal:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.ath-button_comp--disabled.sc-ath-menu-horizontal{pointer-events:none;color:var(--ath-color-button-icon-disabled)}.sc-ath-menu-horizontal-h .ath-menu-horizontal.sc-ath-menu-horizontal{display:flex;align-items:center;border-bottom:var(--border-bottom)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--has-divider.sc-ath-menu-horizontal{border-bottom:var(--ath-border-width-xs) solid var(--ath-color-border-alpha-boldest-default)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal{padding:var(--ath-spacing-menu-horizontal-group-padding-y) var(--ath-spacing-menu-horizontal-group-padding-x);margin-bottom:-1px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal::-webkit-scrollbar{display:none}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group--list.sc-ath-menu-horizontal{display:flex;gap:var(--ath-spacing-menu-horizontal-group-col-gap);padding:0;margin:0;white-space:nowrap}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group--list--item.sc-ath-menu-horizontal{display:inline-block}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .last-item--padding-right.sc-ath-menu-horizontal{padding-right:20px}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item.sc-ath-menu-horizontal{display:flex;height:var(--ath-size-menu-horizontal-item-height);flex-direction:column;align-items:center;gap:var(--ath-spacing-menu-horizontal-item-row-gap);text-decoration:none}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--content.sc-ath-menu-horizontal{display:flex;padding:var(--ath-spacing-menu-horizontal-item-content-padding-y) var(--ath-spacing-menu-horizontal-item-content-padding-x);flex-direction:column;align-items:center;gap:var(--ath-spacing-menu-horizontal-item-content-col-gap);border-radius:var(--ath-border-radius-menu-horizontal-item)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--content.sc-ath-menu-horizontal .ath-menu-horizontal-label.sc-ath-menu-horizontal{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-comp-md)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--indicator.sc-ath-menu-horizontal{height:var(--ath-size-menu-horizontal-item-indicator-height);flex-shrink:0;align-self:stretch;border-radius:var(--ath-border-radius-menu-horizontal-indicator);background:var(--ath-color-menu-horizontal-item-indicator-bg)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--selected.sc-ath-menu-horizontal .ath-menu-horizontal-label.sc-ath-menu-horizontal{font-weight:var(--ath-font-weight-medium)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--selected.sc-ath-menu-horizontal{cursor:default}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--disabled.sc-ath-menu-horizontal{cursor:not-allowed;pointer-events:none}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item--disabled.sc-ath-menu-horizontal .ath-menu-horizontal-label.sc-ath-menu-horizontal{color:var(--ath-color-fg-disabled)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item.sc-ath-menu-horizontal:not(.ath-menu-horizontal-item--selected):not(.ath-menu-horizontal-item--disabled):hover .ath-menu-horizontal-item--content.sc-ath-menu-horizontal{background:var(--ath-color-bg-alpha-hovered)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item.sc-ath-menu-horizontal:not(.ath-menu-horizontal-item--selected):not(.ath-menu-horizontal-item--disabled):active .ath-menu-horizontal-item--content.sc-ath-menu-horizontal{background:var(--ath-color-bg-alpha-pressed)}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item.sc-ath-menu-horizontal:focus-visible{outline:none}.sc-ath-menu-horizontal-h .ath-menu-horizontal--item-group.sc-ath-menu-horizontal .ath-menu-horizontal-item.sc-ath-menu-horizontal:focus-visible .ath-menu-horizontal-item--content.sc-ath-menu-horizontal{border-radius:var(--ath-border-radius-menu-horizontal-item);background:var(ath-color-bg-alpha-default);box-shadow:0 0 0 2px var(--ath-color-border-focus)}";

let menuHorizontalSequence = 0;
const AthMenuHorizontal = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athSelected = createEvent(this, "athSelected", 7);
    }
    /**
     * The accessible label for the menu
     */
    athAriaLabel;
    /**
     * Whether the menu has a divider below
     */
    hasDivider = true;
    /**
     * Items to generate using the imperative way
     */
    items;
    /**
     * Emitted when an item is selected with the MenuHorizontalItem object
     */
    athSelected;
    selectedMenuHorizontalItemId;
    activeMenuHorizontalItemId;
    showArrows = false;
    isLeftArrowHidden = false;
    isRightArrowHidden = false;
    get el() { return getElement(this); }
    hostId = ++menuHorizontalSequence;
    menuHorizontalItems = [];
    firstEnabledItemId;
    lastEnabledItemId;
    itemGroup;
    resizeObserver;
    onItemsChange(newValue, oldValue) {
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
    generateItems() {
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
    getItemsFromAnySource() {
        if (this.items) {
            const parsedItems = typeof this.items === 'string' ? this.getItemsFromImperative(this.items) : [...this.items];
            return parsedItems;
        }
        return this.getItemsFromDOM();
    }
    getItemsFromImperative(value) {
        try {
            return value ? JSON.parse(value) : [];
        }
        catch (error) {
            console.error('Error parsing items:', error);
            return [];
        }
    }
    getDOMElements() {
        return Array.from(this.el.querySelectorAll('ath-menu-horizontal-item'));
    }
    getItemsFromDOM() {
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
    detectFirstAndLastEnabledTab() {
        const firstEnabled = this.menuHorizontalItems.find(item => !item.disabled);
        this.firstEnabledItemId = firstEnabled ? firstEnabled.id : undefined;
        const lastEnabled = this.menuHorizontalItems
            .slice()
            .reverse()
            .find(item => !item.disabled);
        this.lastEnabledItemId = lastEnabled ? lastEnabled.id : undefined;
    }
    detectSelectedItem() {
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
    updateArrowsVisibility = () => {
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
    handleItemFocus = (event) => {
        const target = event.target;
        if (target && this.itemGroup) {
            target.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
        }
    };
    handleItemClick = (e, item) => {
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
        const selectedIndex = parseInt(item.id.split('-').pop());
        if (elements[selectedIndex]) {
            elements[selectedIndex].selected = true;
        }
        this.emitSelectedEvent(item);
    };
    handleKeyDown = (event, item) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleItemClick(event, item);
            return;
        }
        else if (event.key === 'ArrowLeft') {
            if (this.activeMenuHorizontalItemId !== this.firstEnabledItemId) {
                const nextTabId = moveFocusToItem(this.menuHorizontalItems, -1, this.activeMenuHorizontalItemId);
                focusItem(nextTabId, this.el);
            }
        }
        else if (event.key === 'ArrowRight') {
            if (this.activeMenuHorizontalItemId !== this.lastEnabledItemId) {
                const nextTabId = moveFocusToItem(this.menuHorizontalItems, 1, this.activeMenuHorizontalItemId);
                focusItem(nextTabId, this.el);
            }
        }
        else if (event.key === 'Home') {
            if (this.activeMenuHorizontalItemId !== this.firstEnabledItemId) {
                focusItem(this.firstEnabledItemId, this.el);
            }
        }
        else if (event.key === 'End') {
            if (this.activeMenuHorizontalItemId !== this.lastEnabledItemId) {
                focusItem(this.lastEnabledItemId, this.el);
            }
        }
        const activeElement = document.activeElement;
        this.activeMenuHorizontalItemId = activeElement && activeElement.id ? activeElement.id : undefined;
    };
    emitSelectedEvent(item) {
        this.athSelected.emit(item);
    }
    scrollItems(direction) {
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
    getHostClassNames() {
        return {
            'ath-menu-horizontal': true,
            'ath-menu-horizontal--has-divider': this.hasDivider,
            'ath-items': true,
        };
    }
    getMenuHorizontalItemItemClassNames(item) {
        return {
            'ath-menu-horizontal-item': true,
            ['ath-menu-horizontal-item--selected']: item.id === this.selectedMenuHorizontalItemId,
            ['ath-menu-horizontal-item--disabled']: item.disabled,
        };
    }
    renderLabel = item => {
        if (item.badgeValue) {
            return (h("ath-badge", { label: item.badgeLabel, position: "right", value: item.badgeValue, max: item.badgeMax, color: item.disabled ? 'disabled' : 'accent' }, item.label));
        }
        else
            return item.label;
    };
    render() {
        return (h(Host, { key: '85daf20b9d23ed421cdf7c44b3104630b7584d19' }, h("div", { key: '7f4f0ebb235662f449c2ab4d5259f2f0698348f2', class: this.getHostClassNames() }, this.showArrows && !this.isLeftArrowHidden && (h("div", { key: '39a5f2f58446a12508f237e1b4058b72ea97a6be', class: "ath-menu-horizontal__button ath-menu-horizontal__button-left", "aria-hidden": "true" }, h(FcButtonComp, { key: '3b293b86806ed7d7ffca833b01fadccfb6f84b85', icon: "chevron_left", color: "default", iconPosition: ButtonIconPosition.IconOnly, size: IconSize.Small, onClick: () => this.scrollItems('left'), "aria-hidden": "true", tabindex: -1 }))), h("nav", { key: '6b0c1e68e87e3c143a449543188e5d8084a06939', class: "ath-menu-horizontal--item-group", ref: el => (this.itemGroup = el), onScroll: () => this.updateArrowsVisibility() }, h("ul", { key: '6bb08f6b842a15db14ce4fc7cf19a7a796822163', class: "ath-menu-horizontal--item-group--list", role: "menubar", "aria-label": this.athAriaLabel }, this.menuHorizontalItems.map((item, i) => (h("li", { class: {
                'last-item--padding-right': i === this.menuHorizontalItems.length - 1,
                'ath-menu-horizontal--item-group--list--item': true,
            }, role: "none" }, h("a", { role: "menuitem", id: item.id, href: item.href, target: `_${item.target}`, "aria-disabled": item.disabled ? 'true' : 'false', tabindex: item.id === this.selectedMenuHorizontalItemId ? '0' : '-1', "aria-current": item.id === this.selectedMenuHorizontalItemId ? 'page' : undefined, class: this.getMenuHorizontalItemItemClassNames(item), onClick: e => this.handleItemClick(e, item), onKeyDown: event => this.handleKeyDown(event, item), onFocus: this.handleItemFocus }, h("div", { class: "ath-menu-horizontal-item--content" }, h("span", { class: "ath-menu-horizontal-label" }, this.renderLabel(item)), item.id === this.selectedMenuHorizontalItemId && item.id === this.activeMenuHorizontalItemId && h("span", { class: "sr-only" }, " seleccionado")), item.target === 'blank' && h("span", { class: "sr-only ath-external-label" }, ' ' + item.externalLabel), h("div", { class: { 'ath-menu-horizontal-item--indicator': this.selectedMenuHorizontalItemId === item.id } }))))))), this.showArrows && !this.isRightArrowHidden && (h("div", { key: 'de56eda3ce016995826a5b24dcf560032b45a742', class: "ath-menu-horizontal__button ath-menu-horizontal__button-right", "aria-hidden": "true" }, h(FcButtonComp, { key: 'b862f4c690844c08a5430e5d6249df6ec01a3d39', icon: "chevron_right", color: "default", iconPosition: ButtonIconPosition.IconOnly, size: IconSize.Small, onClick: () => this.scrollItems('right'), buttonAriaLabel: "Mostrar m\u00E1s pesta\u00F1as hacia la derecha", "aria-hidden": "true", tabindex: -1 }))))));
    }
    static get watchers() { return {
        "items": ["onItemsChange"]
    }; }
};
AthMenuHorizontal.style = menuHorizontalCss;

export { AthMenuHorizontal as ath_menu_horizontal };
//# sourceMappingURL=ath-menu-horizontal.entry.esm.js.map
