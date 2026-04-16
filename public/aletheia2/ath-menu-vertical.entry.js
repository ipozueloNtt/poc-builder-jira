import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const MenuVerticalAppearances = {
    Primary: 'primary',
    Secondary: 'secondary',
};

const menuVerticalCss = ":host .ath-menu-vertical__wrapper-title{cursor:pointer;--color-title:var(--ath-color-fg-default);--font-weight-title:var(--ath-font-weight-regular)}:host .ath-menu-vertical__wrapper-title:focus-visible{--bg-title:var(--ath-color-drop-shadow-focus)}:host .ath-menu-vertical__wrapper-title.selected{--bg-title:var(--ath-color-menu-vertical-item-level-bg-selected);--color-title:var(--ath-color-fg-inverse-default);--font-weight-title:var(--ath-font-weight-medium)}:host .ath-menu-vertical__wrapper-title:hover:not(.selected,.disabled,.open){--bg-title:var(--ath-color-menu-vertical-item-level-bg-hovered);font-weight:var(--ath-font-weight-medium)}:host .ath-menu-vertical__wrapper-title:active:not(.disabled,.open){--bg-title:var(--ath-color-menu-vertical-item-level-bg-pressed);--font-weight-title:var(--ath-font-weight-medium)}:host .ath-menu-vertical__wrapper-title.disabled{cursor:not-allowed;--color-title:var(--ath-color-fg-disabled)}:host .ath-menu-vertical__level-1{cursor:pointer;--color-text:var(--ath-color-fg-default);--font-weight-text:var(--ath-font-weight-regular);--color-icon:var(--ath-color-icon-default)}:host .ath-menu-vertical__level-1:hover:not(.selected,.disabled,.open) .ath-menu-vertical__level-1__icon{--bg-icon:var(--ath-color-menu-vertical-item-level-1-bg-hovered);--color-icon:var(--ath-color-icon-inverse-default)}:host .ath-menu-vertical__level-1:hover:not(.selected,.disabled,.open) .ath-menu-vertical__level-1__text{font-weight:var(--ath-font-weight-medium)}:host .ath-menu-vertical__level-1.selected .ath-menu-vertical__level-1__icon{--bg-icon:var(--ath-color-menu-vertical-item-level-1-bg-selected);--color-icon:var(--ath-color-icon-inverse-default)}:host .ath-menu-vertical__level-1.selected .ath-menu-vertical__level-1__text{font-weight:var(--ath-font-weight-medium)}:host .ath-menu-vertical__level-1:active:not(.disabled,.open) .ath-menu-vertical__level-1__icon{--bg-icon:var(--ath-color-menu-vertical-item-level-1-bg-pressed);--color-icon:var(--ath-color-icon-inverse-default)}:host .ath-menu-vertical__level-1:active:not(.disabled,.open) .ath-menu-vertical__level-1__text{font-weight:var(--ath-font-weight-medium)}:host .ath-menu-vertical__level-1.disabled{cursor:not-allowed}:host .ath-menu-vertical__level-1.disabled .ath-menu-vertical__level-1__icon{--color-icon:var(--ath-color-fg-disabled)}:host .ath-menu-vertical__level-1.disabled .ath-menu-vertical__level-1__text{--color-text:var(--ath-color-fg-disabled)}.ath-visibility-hidden,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host{display:flex}:host .ath-menu-vertical-primary{gap:var(--ath-spacing-menu-vertical-row-gap-primary)}:host .ath-menu-vertical-secondary{gap:var(--ath-spacing-menu-vertical-row-gap-secondary)}:host .ath-menu-vertical__list{display:flex;flex-direction:column;align-items:flex-start;min-width:288px;max-width:480px;width:100%}:host .ath-menu-vertical__list__group{width:100%}:host .ath-menu-vertical__wrapper-title{display:flex;width:100%;justify-content:space-between;padding:var(--ath-spacing-menu-vertical-item-padding-y-xs) var(--ath-spacing-menu-vertical-item-padding-x);align-items:center;gap:var(--ath-spacing-menu-vertical-item-level-col-gap-sm);flex:1 0 0;border-radius:var(--ath-border-radius-menu-vertical-item-level);color:var(--color-title);background:var(--bg-title);text-decoration:none;font-weight:var(--ath-font-weight-title);cursor:pointer}:host .ath-menu-vertical__wrapper-title.open{cursor:default}:host .ath-menu-vertical__wrapper-title__no-gap{gap:none}:host .ath-menu-vertical__wrapper-title__button{display:flex;align-items:center;gap:8px;transition:transform 0.3s ease-in-out}:host .ath-menu-vertical__wrapper-title__button.open{transform:rotate(-180deg)}:host .ath-menu-vertical__wrapper-title:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-color-drop-shadow-focus), 0 0 0 4px var(--ath-color-border-focus)}:host .ath-menu-vertical__level-1{display:flex;width:100%;align-items:center;gap:var(--ath-spacing-menu-vertical-item-level-col-gap-md);border-radius:var(--ath-border-radius-menu-vertical-item-level);text-decoration:none;color:inherit}:host .ath-menu-vertical__level-1.open{cursor:default}:host .ath-menu-vertical__level-1:visited,:host .ath-menu-vertical__level-1:hover,:host .ath-menu-vertical__level-1:active{text-decoration:none;color:inherit}:host .ath-menu-vertical__level-1__icon{display:flex;padding:var(--ath-spacing-menu-vertical-item-level-icon-padding-around);align-items:center;gap:10px;border-radius:var(--ath-border-radius-menu-vertical-item-level-1);background:var(--bg-icon);color:var(--color-icon)}:host .ath-menu-vertical__level-1__text{display:flex;width:100%;justify-content:space-between;align-items:center;padding:var(--ath-spacing-menu-vertical-item-padding-y-sm) var(--ath-spacing-menu-vertical-item-padding-x) var(--ath-spacing-menu-vertical-item-padding-y-sm) 0;gap:var(--ath-spacing-menu-vertical-item-level-col-gap-sm);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-menu-vertical-heading-level-1);font-family:var(--ath-font-family-primary);font-style:normal;line-height:var(--ath-font-line-height-menu-vertical-heading-level);color:var(--color-text);font-weight:var(--ath-font-weight-regular)}:host .ath-menu-vertical__level-1__text__button{display:flex;align-items:center;gap:8px;transition:transform 0.3s ease-in-out}:host .ath-menu-vertical__level-1__text__button.open{transform:rotate(-180deg)}:host .ath-menu-vertical__level-1:focus-visible{outline:none;background-color:var(--ath-color-drop-shadow-focus);box-shadow:0 0 0 2px var(--ath-color-border-focus)}:host .ath-menu-vertical__level-2{display:flex;align-self:stretch;align-items:center;font-size:var(--ath-font-size-menu-vertical-heading-level-2);font-family:var(--ath-font-family-primary);font-style:normal;line-height:var(--ath-font-line-height-menu-vertical-heading-level);font-weight:var(--ath-font-weight-regular)}:host .ath-menu-vertical__level-2.primary{padding-left:var(--ath-spacing-menu-vertical-item-level-padding-left-level-2)}:host .ath-menu-vertical__level-2.selected{font-weight:var(--ath-font-weight-medium)}:host .ath-menu-vertical__level-3{display:flex;align-self:stretch;align-items:center;font-size:var(--ath-font-size-menu-vertical-heading-level-3);font-family:var(--ath-font-family-primary);font-style:normal;line-height:var(--ath-font-line-height-menu-vertical-heading-level);font-weight:var(--ath-font-weight-regular)}:host .ath-menu-vertical__level-3.primary{padding-left:var(--ath-spacing-menu-vertical-item-level-padding-left-level-3-primary)}:host .ath-menu-vertical__level-3.secondary{padding-left:var(--ath-spacing-menu-vertical-item-level-padding-left-level-3-secondary)}:host .ath-menu-vertical__level-3.selected{font-weight:var(--ath-font-weight-medium)}.ath-section-sublist{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-menu-vertical-item-group-row-gap-xs);align-self:stretch}.ath-menu-vertical__menu{display:flex;flex-direction:column;list-style:none;padding:0;margin:0;width:100%}.ath-menu-vertical__sublist{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-menu-vertical-item-group-row-gap-xs);align-self:stretch}";

let menuVerticalSequence = 0;
const AthMenuVertical = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athSelected = createEvent(this, "athSelected", 7);
    }
    menuVerticalId = `ath-menu-vertical-${menuVerticalSequence++}`;
    menuLevelId = `${this.menuVerticalId}-menu`;
    /**
     * Appearance of the menu
     */
    appearance = MenuVerticalAppearances.Primary;
    /**
     * Emitted when link or action Button is clicked
     */
    athSelected;
    get el() { return getElement(this); }
    menuItems;
    focusedItemId = '';
    focusableItems = [];
    mutationObserver;
    // Lifecycle
    componentWillLoad() {
        this.menuItems = Array.from(this.el.children)
            .filter(el => el.tagName.startsWith('ath-MENU-VERTICAL'))
            .map(el => this.mapElementToMenuItem(el));
        let menuSequence = 0;
        const assignIds = (items, prefix) => {
            items.forEach(item => {
                item.id = `${prefix}-${menuSequence++}`;
                if (item.children && item.children.length > 0) {
                    assignIds(Array.from(item.children), item.id);
                }
            });
        };
        assignIds(this.menuItems, this.menuLevelId);
        this.observeMutationTreeList();
        let firstFocusableId = null;
        if (this.appearance === MenuVerticalAppearances.Primary) {
            firstFocusableId = this.findFirstFocusableItemId(this.menuItems);
        }
        else {
            firstFocusableId = this.menuItems.length > 0 ? this.findFirstFocusableItemId(Array.from(this.menuItems[0].children)) : null;
        }
        if (firstFocusableId) {
            this.focusedItemId = firstFocusableId;
        }
        this.buildMenuItemsAndInitialize();
    }
    mapElementToMenuItem(el) {
        const children = Array.from(el.children)
            .filter(child => child.tagName.startsWith('ath-MENU-VERTICAL'))
            .map(child => this.mapElementToMenuItem(child));
        const tagName = el.tagName;
        const allowedTargets = ['self', 'parent', 'blank', 'top'];
        const targetAttr = el.getAttribute('target');
        const target = allowedTargets.includes(targetAttr) ? targetAttr : undefined;
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
    initializeOpenState() {
        if (!this.menuItems || this.menuItems.length === 0)
            return;
        this.cleanSelectedAttribute(this.menuItems);
        this.cleanOpenAttribute(this.menuItems);
        let selectedPath = [];
        let foundSelected = false;
        const findSelectedPath = (items, path = []) => {
            for (const item of items) {
                if (foundSelected)
                    return true;
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
            const openOnlySelectedPath = (items, path, depth = 0) => {
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
        let openPath = [];
        let foundOpen = false;
        const findOpenPath = (items, path = []) => {
            for (const item of items) {
                if (foundOpen)
                    return true;
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
                        Array.from(item.children).forEach((child) => {
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
                    Array.from(item.children).forEach((child) => {
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
                Array.from(item.children).forEach((child) => {
                    child.open = false;
                });
            }
        });
    }
    cleanSelectedAttribute(items) {
        let found = false;
        function clean(items) {
            for (const item of items) {
                if (item.selected && !found) {
                    found = true;
                }
                else {
                    item.selected = false;
                }
                if (item.children && item.children.length > 0) {
                    clean(Array.from(item.children));
                }
            }
        }
        clean(items);
    }
    cleanOpenAttribute(items) {
        items.forEach(item => {
            const isLink = item.tagName === 'ath-MENU-VERTICAL-ITEM-LINK';
            const hasChildren = item.children && item.children.length > 0;
            if (hasChildren) {
                this.cleanOpenAttribute(Array.from(item.children));
                const childHasOpen = Array.from(item.children).some((child) => child.open);
                if (childHasOpen) {
                    item.open = false;
                }
            }
            if (!hasChildren || isLink) {
                item.open = false;
            }
        });
    }
    observeMutationTreeList() {
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
    findFirstFocusableItemId(items) {
        for (const item of items) {
            if (!item.disabled)
                return item.id;
            if (item.children && item.children.length > 0) {
                const childId = this.findFirstFocusableItemId(Array.from(item.children));
                if (childId)
                    return childId;
            }
        }
        return null;
    }
    componentDidLoad() {
        this.focusableItems = Array.from(this.el.shadowRoot.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])'));
        this.observeMutationTreeList();
    }
    buildMenuItemsAndInitialize() {
        this.menuItems = Array.from(this.el.children)
            .filter(el => el.tagName.startsWith('ath-MENU-VERTICAL'))
            .map(el => this.mapElementToMenuItem(el));
        let menuSequence = 0;
        const assignIds = (items, prefix) => {
            items.forEach(item => {
                item.id = `${prefix}-${menuSequence++}`;
                if (item.children && item.children.length > 0) {
                    assignIds(Array.from(item.children), item.id);
                }
            });
        };
        assignIds(this.menuItems, this.menuLevelId);
        this.initializeOpenState();
        let firstFocusableId = null;
        if (this.appearance === MenuVerticalAppearances.Primary) {
            firstFocusableId = this.findFirstFocusableItemId(this.menuItems);
        }
        else {
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
    renderMenu() {
        const menuArray = [];
        let menuSequence = 0;
        this.menuItems.forEach(item => {
            const itemId = `${this.menuLevelId}-${menuSequence++}`;
            item.id = itemId;
            if (this.appearance === MenuVerticalAppearances.Primary) {
                menuArray.push(this.renderLevel1(item, itemId));
            }
            else {
                menuArray.push(h("li", { class: "ath-section-sublist" }, h("ath-section-title", { headingText: item.text, color: "accent" }), Array.from(item.children).length > 0 && h("ul", { class: "ath-menu-vertical__menu" }, this.createMenu(itemId, Array.from(item.children), 2))));
            }
        });
        return menuArray;
    }
    renderLevel1(item, id) {
        const isOpen = !!item.open;
        const isSelected = this.isItemSelected(item, 1);
        const renderLevel1ClassNames = ['ath-menu-vertical__level-1', isSelected ? 'selected' : '', item.disabled ? 'disabled' : '', isOpen ? 'open' : ''].filter(Boolean).join(' ');
        if (item.tagName === 'ath-MENU-VERTICAL-ITEM-LINK') {
            return (h("li", { role: "none" }, h("a", { role: "menuitem", id: id, ...(item.disabled ? {} : this.getLinkProp(item)), class: renderLevel1ClassNames, tabIndex: this.getTabIndex(item), onFocus: item.disabled ? undefined : () => this.setFocusedItem(id), "aria-disabled": item.disabled ? 'true' : undefined, "aria-label": item.ariaLabel, "aria-labelledby": item.ariaLabelledby, "aria-current": item.selected ? 'page' : undefined, onClick: e => {
                    if (item.disabled) {
                        e.preventDefault();
                        return;
                    }
                    this.handleClick(id);
                }, onKeyDown: item.disabled ? undefined : e => this.handleKeyDown(e, id, 1, false), ref: el => el && this.registerFocusableItem(el) }, h("div", { class: "ath-menu-vertical__level-1__icon" }, h("ath-icon", { icon: !!item.icon ? item.icon : 'placeholder', size: "lg", color: "inherit" })), h("div", { class: "ath-menu-vertical__level-1__text" }, item.text))));
        }
        return (h("li", { class: "ath-menu-vertical__list__group", role: "none" }, h("div", { id: id, class: renderLevel1ClassNames, role: "menuitem", tabIndex: item.disabled ? -1 : this.focusedItemId === id ? 0 : -1, onFocus: item.disabled ? undefined : () => this.setFocusedItem(id), "aria-label": item.ariaLabel, "aria-controls": `${id}-list`, "aria-expanded": Array.from(item.children).length > 0 ? (isOpen ? 'true' : 'false') : undefined, "aria-haspopup": Array.from(item.children).length > 0 ? 'menu' : undefined, "aria-current": Array.from(item.children).length === 0 && item.selected ? 'page' : undefined, "aria-disabled": item.disabled ? 'true' : undefined, onClick: item.disabled || isOpen ? undefined : Array.from(item.children).length > 0 ? () => this.handleClickOpen(id, 1, false) : () => this.handleClick(id), onKeyDown: item.disabled ? undefined : e => this.handleKeyDown(e, id, 1, Array.from(item.children).length > 0), ref: el => el && this.registerFocusableItem(el) }, h("div", { class: "ath-menu-vertical__level-1__icon" }, h("ath-icon", { icon: !!item.icon ? item.icon : 'placeholder', size: "lg", color: "inherit" })), h("div", { class: "ath-menu-vertical__level-1__text" }, h("span", null, item.text), Array.from(item.children).length > 0 && (h("div", { class: `ath-menu-vertical__level-1__text__button${isOpen ? ' open' : ''}` }, h("ath-icon", { size: "md", icon: "chevron_down", color: "inherit", "aria-hidden": "true" }))))), Array.from(item.children).length > 0 && isOpen && (h("ul", { role: "menu", id: `${id}-list`, class: "ath-menu-vertical__menu ath-menu-vertical__sublist" }, this.createMenu(id, Array.from(item.children), 2)))));
    }
    createMenu(id, arrayMenu, level) {
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
            menuArray.push(h("li", { role: "none", class: "ath-menu-vertical__sublist" }, h("div", { class: menuClassNames }, item.tagName === 'ath-MENU-VERTICAL-ITEM-LINK' ? this.createLink(item, level) : this.createAction(item, hasChildren, itemId, isOpen, level)), hasChildren && isOpen && (h("ul", { role: "menu", id: `${itemId}-list`, class: "ath-menu-vertical__menu ath-menu-vertical__sublist" }, this.createMenu(itemId, Array.from(item.children), level + 1)))));
        });
        return menuArray;
    }
    createAction(item, hasChildren, itemId, isOpen, level) {
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
        return (h("div", { role: "menuitem", id: itemId, class: actionClassNames, tabIndex: this.getTabIndex(item), onFocus: item.disabled ? undefined : () => this.setFocusedItem(itemId), "aria-label": item.ariaLabel, "aria-controls": hasChildren ? `${itemId}-list` : item.ariaControls, "aria-expanded": Array.from(item.children).length > 0 ? (isOpen ? 'true' : 'false') : undefined, "aria-haspopup": hasChildren ? 'menu' : undefined, "aria-current": Array.from(item.children).length === 0 && item.selected ? 'page' : undefined, "aria-disabled": item.disabled ? 'true' : undefined, onClick: item.disabled ? undefined : hasChildren ? () => this.handleClickOpen(itemId, level, true) : () => this.handleClick(itemId), onKeyDown: item.disabled ? undefined : e => this.handleKeyDown(e, itemId, level, hasChildren), ref: el => el && this.registerFocusableItem(el) }, h("span", null, item.text), hasChildren && (h("span", { class: `ath-menu-vertical__wrapper-title__button${isOpen ? ' open' : ''}` }, h("ath-icon", { size: "md", icon: "chevron_down", color: "inherit", "aria-hidden": "true" })))));
    }
    createLink(item, level) {
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
        return (h("a", { role: "menuitem", id: item.id, ...linkProps, class: linkClassNames, tabIndex: this.getTabIndex(item), onFocus: item.disabled ? undefined : () => this.setFocusedItem(item.id), "aria-disabled": item.disabled ? 'true' : undefined, "aria-label": item.ariaLabel ? item.ariaLabel : undefined, "aria-labelledby": item.ariaLabelledby ? item.ariaLabelledby : undefined, "aria-current": item.selected ? 'page' : undefined, onClick: e => {
                if (item.disabled) {
                    e.preventDefault();
                    return;
                }
                this.handleClick(item.id);
            }, onKeyDown: item.disabled ? undefined : e => this.handleKeyDown(e, item.id, 3, false), ref: el => el && this.registerFocusableItem(el) }, h("span", null, item.text), item.target === 'blank' && h("span", { class: "ath-visibility-hidden" }, item.externalLabel)));
    }
    getTabIndex(item) {
        if (item.disabled)
            return -1;
        if (this.focusedItemId === item.id)
            return 0;
        if (this.focusedItemId === '' && this.focusableItems[0] && item.id === this.focusableItems[0].id)
            return 0;
        return -1;
    }
    getLinkProp = (item) => ({
        href: item.href,
        rel: item.rel,
        target: `_${item.target}`,
    });
    registerFocusableItem = (el) => {
        if (el && !this.focusableItems.includes(el)) {
            this.focusableItems.push(el);
        }
    };
    // Interactivity
    isItemSelected(item, level) {
        if (level === 3) {
            return !!item.selected;
        }
        if (level === 2) {
            if (!item.children || item.children.length === 0) {
                return !!item.selected;
            }
            else {
                const hasSelectedChild = Array.from(item.children).some((child) => this.isItemSelected(child, 3));
                return hasSelectedChild && !item.open;
            }
        }
        if (level === 1) {
            if (!item.children || item.children.length === 0) {
                return !!item.selected;
            }
            const hasSelectedChild = Array.from(item.children).some((child) => this.isItemSelected(child, 2));
            if (hasSelectedChild && !item.open)
                return true;
            const hasSelectedGrandchild = Array.from(item.children).some((child) => child.children && Array.from(child.children).some((grandchild) => this.isItemSelected(grandchild, 3)));
            if (hasSelectedGrandchild && !item.open)
                return true;
            return false;
        }
        return false;
    }
    setFocusedItem = (itemId) => {
        this.focusedItemId = itemId;
    };
    handleClick = (currentId) => {
        let itemClicked;
        if (!this.menuItems)
            return;
        this.deselectAll(this.menuItems);
        const selectById = (items) => {
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
    handleClickOpen = (id, level = 1, focusFirstChild = false) => {
        if (!this.menuItems)
            return;
        if (level === 1) {
            this.menuItems.forEach(item => {
                item.open = item.id === id;
                if (item.children && item.children.length > 0) {
                    Array.from(item.children).forEach((child) => {
                        child.open = false;
                    });
                }
            });
        }
        else if (level === 2) {
            this.menuItems.forEach(item => {
                if (item.children && item.children.length > 0) {
                    Array.from(item.children).forEach((child) => {
                        child.open = child.id === id;
                    });
                }
            });
        }
        else {
            const closeSiblingsAndOpen = (items) => {
                for (const item of items) {
                    if (item.children && item.children.length > 0) {
                        const child = Array.from(item.children).find((c) => c.id === id);
                        if (child) {
                            Array.from(item.children).forEach((c) => {
                                c.open = c.id === id;
                                if (c.children && c.children.length > 0 && c.id !== id) {
                                    Array.from(c.children).forEach((grandchild) => {
                                        grandchild.open = false;
                                    });
                                }
                            });
                            return true;
                        }
                        else if (closeSiblingsAndOpen(Array.from(item.children))) {
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
    findItemById(items, id) {
        for (const item of items) {
            if (item.id === id)
                return item;
            if (item.children && item.children.length > 0) {
                const found = this.findItemById(Array.from(item.children), id);
                if (found)
                    return found;
            }
        }
        return null;
    }
    handleKeyDown = (e, id, level = 1, hasChildren) => {
        switch (e.key) {
            case 'ArrowDown':
                if (hasChildren && level === 1) {
                    const parent = this.findItemById(this.menuItems, id);
                    if (parent && parent.selected && parent.children && parent.children.length > 0) {
                        const firstChildId = `${id}-0`;
                        this.focusedItemId = firstChildId;
                        const firstChildEl = this.el.shadowRoot.querySelector(`[id="${firstChildId}"]`);
                        if (firstChildEl)
                            firstChildEl.focus();
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
                }
                else {
                    this.handleClick(id);
                }
                break;
        }
    };
    deselectAll(items) {
        items.forEach(item => {
            item.selected = false;
            if (item.children && item.children.length > 0) {
                this.deselectAll(Array.from(item.children));
            }
        });
    }
    updateFocusableItems() {
        this.focusableItems = Array.from(this.el.shadowRoot.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])'));
    }
    focusPrev(currentId) {
        const currentEl = this.el.shadowRoot.querySelector(`[id="${currentId}"]`);
        if (!currentEl)
            return;
        const parentUl = currentEl.closest('ul[role="menu"]');
        if (!parentUl)
            return;
        const items = Array.from(parentUl.querySelectorAll('[role="menuitem"]:not([aria-disabled="true"])'));
        const idx = items.findIndex(el => el.id === currentId);
        if (idx === -1)
            return;
        if (idx > 0) {
            items[idx - 1].focus();
            this.focusedItemId = items[idx - 1].id;
        }
        else {
            const parentLi = parentUl.closest('li[role="none"]');
            if (parentLi) {
                const parentMenuItem = parentLi.querySelector('[role="menuitem"]:not([aria-disabled="true"])');
                if (parentMenuItem) {
                    parentMenuItem.focus();
                    this.focusedItemId = parentMenuItem.id;
                    return;
                }
            }
        }
    }
    focusNext(currentId) {
        const items = this.focusableItems;
        const idx = items.findIndex(el => el.id === currentId);
        if (idx === -1)
            return;
        if (idx < items.length - 1) {
            items[idx + 1].focus();
            this.focusedItemId = items[idx + 1].id;
        }
    }
    // SCSS
    getListClassNames = () => ({
        'ath-menu-vertical__menu': true,
        'ath-menu-vertical__list': true,
        [`ath-menu-vertical-${this.appearance}`]: true,
    });
    render() {
        return (h(Host, { key: 'b3da87c403d9ffde25b291e7ff52e45844b13662', role: "navigation", class: "ath-menu-vertical" }, h("ul", { key: 'f164834a1e109fd49b9feab41d016e814ff174bd', role: "menu", class: this.getListClassNames() }, this.renderMenu())));
    }
};
AthMenuVertical.style = menuVerticalCss;

export { AthMenuVertical as ath_menu_vertical };
//# sourceMappingURL=ath-menu-vertical.entry.esm.js.map
