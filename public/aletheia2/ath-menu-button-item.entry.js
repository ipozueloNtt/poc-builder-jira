import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const menuButtonItemCss = ".sc-ath-menu-button-item-h{display:flex;width:100%;cursor:pointer}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item{display:flex;flex-direction:column;align-items:flex-start;gap:4px;width:100%}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item{align-items:flex-start;border-radius:var(--ath-border-radius-menu-button-option);background:var(--ath-color-bg-alpha-default);width:100%}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item .sc-ath-menu-button-item:hover{border-radius:var(--ath-border-radius-menu-button-option);background:var(--ath-color-bg-alpha-hovered)}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item .sc-ath-menu-button-item:active{background:var(--ath-color-bg-alpha-pressed);border:none}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item{color:var(--ath-color-fg-default)}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level--disabled.sc-ath-menu-button-item{background:var(--ath-color-bg-alpha-default);color:var(--ath-color-fg-disabled);cursor:default}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level--disabled.sc-ath-menu-button-item .sc-ath-menu-button-item:hover{background:unset}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item .menu-button-option.sc-ath-menu-button-item{display:flex;padding:var(--ath-spacing-menu-button-option-padding-y) var(--ath-spacing-menu-button-option-padding-x);align-items:flex-start;gap:var(--ath-spacing-menu-button-option-col-gap);justify-content:space-between}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item .menu-button-option.sc-ath-menu-button-item .text.sc-ath-menu-button-item{font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-menu-button-option);font-style:normal;font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-menu-button-option);white-space:nowrap;flex-grow:1}.sc-ath-menu-button-item-h ._ath-menu-button-option.sc-ath-menu-button-item .ath-menu-button-option__level.sc-ath-menu-button-item .menu-button-option.sc-ath-menu-button-item .sc-ath-menu-button-item:hover{background:unset}.sc-ath-menu-button-item-h:focus-visible{outline:none;border-radius:var(--ath-border-radius-menu-button-option);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset;background:unset}";

const AthMenuButtonItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athSelected = createEvent(this, "athSelected", 7);
    }
    get el() { return getElement(this); }
    /**
     * name option
     */
    name;
    /**
     * Weather the button is disabled
     */
    disabled;
    /**
     * The name of the grout the item belongs to
     */
    groupName;
    /**
     * The icon of the menu-button-item
     */
    icon;
    /**
     * The text of the menu-button-item
     */
    text;
    itemTabIndex = -1;
    /**
     * Emitted when the item is clicked and triggers an action
     */
    athSelected;
    handleClick = ev => {
        if (!this.disabled) {
            ev.stopPropagation();
            this.athSelected.emit(ev);
        }
    };
    handleKeyDown(ev) {
        if (['Enter', 'Space'].includes(ev.code)) {
            ev.preventDefault();
            this.handleClick(ev);
        }
    }
    getMenuButtonOptionLevelClassNames = () => ({
        'ath-menu-button-option__level': true,
        [`ath-menu-button-option__level--disabled`]: this.disabled,
    });
    render() {
        return (h(Host, { key: '78645c2442bcc0a4dbb6233781a348331158ec5c', role: "menuitem", onClick: this.handleClick, tabindex: this.itemTabIndex, "aria-disabled": !!this.disabled ? 'true' : 'false' }, h("div", { key: 'a25e79be1157af8f2c38cd061088fae7bd6f0861', class: "_ath-menu-button-option" }, h("div", { key: '84b5d604737ce5d4a5272f5582d67e5204718826', class: this.getMenuButtonOptionLevelClassNames() }, h("div", { key: 'c9f5b642a0de4d03a86a8c7dc2e8e3ed90fb1fd7', class: "menu-button-option" }, !!this.icon && h("ath-icon", { key: 'ffc5346c7dad0197642d6da7216cbf9dadd0819f', icon: this.icon }), h("div", { key: '01b6d4a2f65f8f92b6a7c0b21e1b9629ef7dd46a', class: "text" }, this.text))))));
    }
};
AthMenuButtonItem.style = menuButtonItemCss;

export { AthMenuButtonItem as ath_menu_button_item };
//# sourceMappingURL=ath-menu-button-item.entry.esm.js.map
