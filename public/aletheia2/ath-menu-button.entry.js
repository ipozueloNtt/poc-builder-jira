import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { a as ButtonColor, b as ButtonSize } from './button.model-Cy_pPkIg.js';

var Alignment;
(function (Alignment) {
    Alignment["Left"] = "left";
    Alignment["Right"] = "right";
})(Alignment || (Alignment = {}));

const menuButtonCss = ".ath-scroll{overflow:auto}.ath-overflow-hidden{overflow:hidden}.ath-overflow-x-hidden{overflow-x:hidden}.ath-overflow-y-hidden{overflow-y:hidden}@supports (-moz-appearance: none){.ath-scroll{scrollbar-width:thin;scrollbar-color:var(--ath-color-bg-alpha-bolder-default) var(--ath-color-scroll-track-bg)}.ath-scroll:hover{scrollbar-color:var(--ath-color-bg-alpha-bolder-hovered) var(--ath-color-scroll-track-bg)}}.ath-scroll::-webkit-scrollbar{width:var(--ath-sizing-scroll);height:var(--ath-sizing-scroll)}.ath-scroll::-webkit-scrollbar-track{background-color:var(--ath-color-scroll-track-bg)}.ath-scroll::-webkit-scrollbar-thumb{background-color:var(--ath-color-bg-alpha-bolder-default);border-radius:var(--ath-border-radius-scroll)}.ath-scroll::-webkit-scrollbar-thumb:hover{background-color:var(--ath-color-bg-alpha-bolder-hovered)}.ath-scroll::-webkit-scrollbar-button{display:none}:host{display:inline-flex;flex-direction:column;align-items:flex-start}:host .ath-menu-button-container{position:relative}:host .ath-menu-button-container .ath-menu-button-disabled{pointer-events:none}:host .ath-menu-button-container .ath-menu-button-overlay{position:absolute;display:inline-flex;padding:var(--ath-spacing-menu-button-overlay-padding);padding-right:calc(var(--ath-spacing-menu-button-overlay-padding) / 2);flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-menu-button-overlay-row-gap);border-radius:var(--ath-border-radius-3xl);border:var(--ath-border-width-xs) solid var(--ath-color-border-alpha-bolder-default);background:var(--ath-color-menu-button-overlay-bg);margin-top:4px;z-index:1000}:host .ath-menu-button-container .ath-menu-button-overlay-wrapper{padding-right:calc(var(--ath-spacing-menu-button-overlay-padding) / 2)}:host .ath-menu-button-container .position--right{right:0px}:host .ath-menu-button-container .position--left{left:0px}";

let menuButtonSequence = 0;
const AthMenuButton = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athAction = createEvent(this, "athAction", 7);
    }
    hostId = ++menuButtonSequence;
    overlayId = `menu-button--overlay-${this.hostId}`;
    get el() { return getElement(this); }
    /**
     * The overlay's position relative to the origin
     */
    alignment = Alignment.Left;
    /**
     * Weather the button is focused by default
     */
    autofocus;
    /**
     * The clear of the button (background and border color)
     */
    clear;
    /**
     * The color variant of the button
     */
    color = ButtonColor.Primary;
    /**
     * The button is disabled
     */
    disabled;
    /**
     * The code of the button's icon (used with iconPosition)
     */
    icon = 'placeholder';
    /**
     * Wheather the menu is open by default
     */
    open;
    /**
     * The size of the button
     */
    size = ButtonSize.Medium;
    /**
     * Altura del overlay del menu
     */
    overlayMaxHeight;
    // ACCESSIBILITY
    /**
     * The accesible label of the menu-button
     */
    athAriaLabel;
    /**
     * Emitted when an item is clicked
     */
    athAction;
    justOpen = false;
    clickOutside(ev) {
        const path = ev.composedPath();
        if (!path.includes(this.el)) {
            this.open = false;
        }
    }
    handleClick = ev => {
        ev.stopPropagation();
        this.open = !this.open;
        this.justOpen = !this.justOpen;
        if (!this.disabled && this.open) {
            const items = Array.from(this.el.querySelectorAll('ath-menu-button-item'));
            const firstItem = items.find(i => !i.hasAttribute('disabled'));
            if (firstItem) {
                items.forEach(item => {
                    item.itemTabIndex = item === firstItem ? 0 : -1;
                });
                firstItem.focus();
            }
        }
    };
    componentDidLoad() {
        if (this.autofocus && !this.disabled) {
            this.setFocusToAthButton();
        }
        if (this.open && !this.disabled) {
            this.setFocusToAthButton();
        }
        const children = Array.from(this.el.querySelectorAll('ath-menu-button-item'));
        children.map(item => (item.tabIndex = -1));
        const htmlChildren = children.map(child => child);
        this.manageGroups(htmlChildren);
    }
    setFocusToAthButton() {
        const athButton = this.el.shadowRoot.querySelector('ath-button');
        athButton.focus();
    }
    manageGroups(children) {
        const groups = this.groupBy(children, item => item.getAttribute('group-name'));
        const allItemsArray = Array.from(children);
        const globalFirstItem = allItemsArray[0];
        const globalLastItem = allItemsArray[allItemsArray.length - 1];
        let previousGroupName = null;
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
    groupBy(array, keyGetter) {
        return array.reduce((result, current) => {
            const key = keyGetter(current);
            if (key) {
                if (!result[key]) {
                    result[key] = [];
                }
                result[key].push(current);
            }
            return result;
        }, {});
    }
    onClick(ev) {
        this.open = false;
        this.justOpen = false;
        this.setFocusToAthButton();
        if (ev.detail) {
            this.athAction.emit(ev.detail.target);
        }
        ev.stopPropagation();
    }
    handleKeyDown(ev) {
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
    focusManager(ev) {
        const items = Array.from(this.el.querySelectorAll('ath-menu-button-item')).filter(item => !item.hasAttribute('disabled'));
        const currentElement = document.activeElement;
        const currentIndex = items.indexOf(currentElement);
        let nextIndex;
        if (ev.key === 'ArrowDown') {
            ev.preventDefault();
            nextIndex = (currentIndex + 1) % items.length;
        }
        else if (ev.key === 'ArrowUp') {
            ev.preventDefault();
            if (currentIndex === -1) {
                nextIndex = items.length - 1;
            }
            else {
                nextIndex = (currentIndex - 1 + items.length) % items.length;
            }
        }
        else if (ev.key === 'Home') {
            ev.preventDefault();
            nextIndex = 0;
        }
        else if (ev.key === 'End') {
            ev.preventDefault();
            nextIndex = items.length - 1;
        }
        if (nextIndex !== undefined) {
            items.forEach((item, index) => {
                item.itemTabIndex = index === nextIndex ? 0 : -1;
            });
            items[nextIndex].focus();
        }
    }
    getButtonClassNames = () => ({
        'ath-menu-button-disabled': !!this.disabled,
    });
    getOverlayClassNames = () => ({
        'ath-menu-button-overlay': true,
        [`position--${this.alignment}`]: !!this.alignment,
    });
    render() {
        const styleHeight = this.overlayMaxHeight ? { maxHeight: this.overlayMaxHeight } : { maxHeight: '236px' };
        return (h(Host, { key: '33941f12b5a331a81c8c9bc88ff05dd40964c512' }, h("div", { key: 'f52eeb9fd7e08f04187ee7d7b7e00c8a8b9b806d', class: "ath-menu-button-container" }, h("div", { key: '7a7989a0f636b1c3d5a1f1633b30a5057b266250' }, h("ath-button", { key: '616c2bc948d309e5e64aa6c6c3fc32f380325c70', id: "button-menu", autofocus: !!this.autofocus, icon: this.icon, "icon-position": "icon-only", clear: this.clear, color: this.color, disabled: this.disabled, size: this.size, onAthClick: this.handleClick, "aria-controls": this.overlayId, "aria-expanded": !!this.open ? 'true' : 'false', "aria-haspopup": "true", class: this.getButtonClassNames(), "aria-label": this.athAriaLabel })), this.open && !this.disabled && (h("div", { key: 'ff7069deb23b73d02be803c42bb7cd9c43c5a71e', style: styleHeight, class: this.getOverlayClassNames(), id: this.overlayId, role: "menu", tabindex: "-1" }, h("div", { key: '3949750ecf3b77aee42236f3fb14f7e274c8f4f0', class: "ath-scroll ath-menu-button-overlay-wrapper" }, h("slot", { key: 'dad2ffff339aa37a55903ce39c81696830cef204' })))))));
    }
};
AthMenuButton.style = menuButtonCss;

export { AthMenuButton as ath_menu_button };
//# sourceMappingURL=ath-menu-button.entry.esm.js.map
