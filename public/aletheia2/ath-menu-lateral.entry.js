import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { M as MenuLateralItemType } from './menu-lateral.model-I7B9TKUW.js';
import { F as FcHelpDescription } from './index-D0VVo5qG.js';

const menuLateralCss = ":host .ath-menu-lateral__item-container{--border-radius-container:var(--ath-border-radius-menu-vertical-item-level)}:host .ath-menu-lateral__item-container:hover:not(.ath-menu-lateral__item-container--disabled):not(.ath-menu-lateral__item-container--selected){--bg-container:var(--ath-color-menu-lateral-item-bg-hovered)}:host .ath-menu-lateral__item-container:active:not(.ath-menu-lateral__item-container--disabled):not(.ath-menu-lateral__item-container--selected){--bg-container:var(--ath-color-menu-lateral-item-bg-pressed)}:host .ath-menu-lateral__item-container--disabled{--bg-container:none;--box-shadow:none;cursor:not-allowed}:host .ath-menu-lateral__item-container--selected{--bg-container:var(--ath-color-menu-lateral-item-bg-selected);cursor:default}.ath-visibility-hidden,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host{display:flex;height:100%}:host .ath-menu-lateral{display:flex;height:100%;padding:var(--ath-spacing-menu-lateral-padding-y) var(--ath-spacing-menu-lateral-padding-x);flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-menu-lateral-row-gap);background:var(--ath-color-menu-lateral-bg-default);outline:none;border-right:var(--ath-border-width-xs) solid var(--ath-color-border-alpha-bold-default)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper{cursor:pointer;position:relative}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper .ath-menu-lateral__item{display:flex;align-items:center;border-radius:var(--ath-border-radius-menu-vertical-item-level)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper .ath-menu-lateral__item-container{display:flex;padding:var(--ath-spacing-menu-lateral-item-padding-around);align-items:center;border-radius:var(--border-radius-container);background:var(--bg-container);box-shadow:var(--box-shadow)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper .ath-menu-lateral__item--focused:not(.ath-menu-lateral__item-container--disabled):not(.ath-menu-lateral__item-container--selected){outline:none;--border-radius-container:var(--ath-border-radius-menu-vertical-item-level);--box-shadow:0 0 0 2px var(--ath-color-drop-shadow-focus), 0 0 0 4px var(--ath-color-border-focus);--bg-container:var(--ath-color-menu-lateral-bg-default)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper .ath-menu-lateral__item--focused:not(.ath-menu-lateral__item-container--disabled){outline:none;--border-radius-container:var(--ath-border-radius-menu-vertical-item-level);--box-shadow:0 0 0 2px var(--ath-color-drop-shadow-focus), 0 0 0 4px var(--ath-color-border-focus)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper ._ath-help-description{position:absolute;z-index:10;pointer-events:none}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper ._ath-help-description .content{display:flex;padding:var(--ath-spacing-slider-tooltip-padding-y) var(--ath-spacing-slider-tooltip-padding-x);justify-content:center;align-items:center;border-radius:var(--ath-border-radius-slider-tooltip);background:var(--ath-color-tooltip-bg-primary);width:max-content;min-width:28px}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper ._ath-help-description .content .text{max-width:288px;color:var(--ath-color-tooltip-fg);text-align:center;font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper ._ath-help-description--bottom-right{top:32px;left:28px}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper ._ath-help-description--bottom{bottom:-46px;transform:translate(-50%, 0%)}:host .ath-menu-lateral .ath-menu-lateral__item-wrapper ._ath-help-description--has-arrow::after{content:\"\";position:absolute;width:11.3px;height:11.3px;transform:rotate(45deg);background-color:var(--ath-color-tooltip-bg-primary);top:-5px;right:calc(50% - 6px);border-radius:2px 0px 0px 0px}";

let menuLateralSequence = 0;
const AthMenuLateral = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athSelected = createEvent(this, "athSelected", 7);
    }
    hostId = menuLateralSequence++;
    menuLateralId = `menu-lateral-${this.hostId}`;
    /**
     * (JSON) Object of items to generate
     */
    items;
    /**
     * Items generated
     */
    generatedMenuLateralItems = [];
    /**
     * Id of the hovered item
     */
    hoveredItemId = null;
    /**
     * Id of the focused item
     */
    focusedItemId = null;
    /**
     * Show focused item
     */
    showFocused = false;
    /**
     * Events
     */
    athSelected;
    get el() { return getElement(this); }
    // Items generation
    onItemsChange(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.generateMenuLateralItems();
        }
    }
    componentWillLoad() {
        this.generateMenuLateralItems();
    }
    generateMenuLateralItems() {
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
    getItems() {
        if (this.items) {
            const parsedItems = typeof this.items === 'string' ? this.parseItems(this.items) : [...this.items];
            return parsedItems;
        }
        return this.scanChildrenItems();
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
    scanChildrenItems() {
        return Array.from(this.el.querySelectorAll('ath-menu-lateral-item-link, ath-menu-lateral-item-action')).map((item, index) => {
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
    renderMenuItem(item) {
        if (item.type === MenuLateralItemType.Action)
            return this.renderActionItem(item);
        if (item.type === MenuLateralItemType.Link)
            return this.renderLinkItem(item);
        return null;
    }
    renderActionItem = item => {
        return (h("div", { id: item.id, class: this.getMenuLateralItemButtonClassNames(item), role: "menuitem", "aria-label": item.ariaLabel, "aria-describedby": `${item.id}-desc`, "aria-disabled": item.disabled ? 'true' : 'false', "aria-current": item.selected.toString(), onMouseEnter: () => this.handleMouseEnter(item.id), onMouseLeave: this.handleMouseLeave, onClick: () => this.handleClick(item), tabindex: "-1" }, !!item.icon && this.renderIcon(item), h("div", { id: `${item.id}-desc`, class: "ath-visibility-hidden" }, item.badgeLabel)));
    };
    renderLinkItem = item => {
        return (h("a", { id: item.id, class: this.getMenuLateralItemButtonClassNames(item), role: "menuitem", "aria-label": item.ariaLabel, "aria-describedby": `${item.id}-desc`, "aria-disabled": item.disabled ? 'true' : 'false', "aria-current": item.selected && 'page', onMouseEnter: () => this.handleMouseEnter(item.id), onMouseLeave: this.handleMouseLeave, onClick: () => this.handleClick(item), href: item.href, target: item.target, rel: item.rel, tabindex: "-1" }, !!item.icon && this.renderIcon(item), h("div", { id: `${item.id}-desc`, class: "ath-visibility-hidden" }, h("span", null, item.badgeLabel), item.target === '_blank' && h("span", null, item.externalLabel))));
    };
    getMenuLateralItemButtonClassNames = item => ({
        'ath-menu-lateral__item-container': true,
        [`ath-menu-lateral__item-container--disabled`]: item.disabled,
        [`ath-menu-lateral__item-container--selected`]: item.selected,
        'ath-menu-lateral__item--focused': this.focusedItemId === item.id && this.showFocused,
    });
    renderIcon = item => h("ath-icon", { icon: item.icon, color: item.disabled ? 'disabled' : item.selected ? 'inverse' : 'primary', size: "sm" });
    // Interaction
    handleMenuItemKeyDown(event) {
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
                        const linkEl = this.el.shadowRoot.querySelector(`#${item.id}`);
                        if (linkEl) {
                            linkEl.click();
                        }
                    }
                    else {
                        this.handleClick(item);
                    }
                }
                break;
            default:
                break;
        }
    }
    findNextEnabledIndex(startIndex, direction) {
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
    setFocusedItemId(id) {
        this.focusedItemId = id;
        this.hoveredItemId = null;
    }
    // Selection
    handleClick(item) {
        if (item.disabled)
            return;
        this.generatedMenuLateralItems = this.generatedMenuLateralItems.map(i => ({
            ...i,
            selected: i.id === item.id,
        }));
        this.emitSelectedEvent(item);
    }
    emitSelectedEvent(item) {
        this.athSelected.emit(item);
    }
    onSelectedItemIdChange(newValue) {
        this.generatedMenuLateralItems.map(item => {
            item.selected = item.id === newValue ? true : false;
        });
    }
    // Tooltip
    handleMouseEnter = (itemId) => {
        this.hoveredItemId = itemId;
        this.focusedItemId = null;
    };
    handleMouseLeave = () => {
        this.hoveredItemId = null;
        this.focusedItemId = null;
    };
    handleFocus = () => {
        this.showFocused = true;
        if (!this.focusedItemId && this.generatedMenuLateralItems.length > 0) {
            const firstEnabled = this.generatedMenuLateralItems.find(i => !i.disabled);
            if (firstEnabled)
                this.setFocusedItemId(firstEnabled.id);
        }
    };
    // Render
    render() {
        return (h(Host, { key: 'bf2406f00da95a63cd93c4ef71d590c4127b1a10' }, h("div", { key: '7ff0c7a568844d3a9e9e6d36f107b70cd0b1712b', role: "menubar", class: "ath-menu-lateral", tabindex: "0", "aria-activedescendant": this.focusedItemId, onKeyDown: e => this.handleMenuItemKeyDown(e), onFocus: this.handleFocus, onBlur: () => {
                this.showFocused = false;
            } }, this.generatedMenuLateralItems.map(item => (h("div", { class: "ath-menu-lateral__item-wrapper" }, h("div", { class: "ath-menu-lateral__item" }, item.badgeValue ? (h("ath-badge", { value: item.badgeValue, max: item.badgeMax, position: "top-right", "distance-x": -5, "distance-y": -4, color: item.disabled ? 'disabled' : 'accent' }, this.renderMenuItem(item))) : (this.renderMenuItem(item))), h("span", { class: ((this.hoveredItemId === item.id && !item.disabled) || this.focusedItemId === item.id) && item.tooltipText ? '' : 'ath-visibility-hidden' }, h(FcHelpDescription, { text: item.tooltipText, position: "bottom-right" }))))))));
    }
    static get watchers() { return {
        "items": ["onItemsChange"],
        "selectedItemId": ["onSelectedItemIdChange"]
    }; }
};
AthMenuLateral.style = menuLateralCss;

export { AthMenuLateral as ath_menu_lateral };
//# sourceMappingURL=ath-menu-lateral.entry.esm.js.map
