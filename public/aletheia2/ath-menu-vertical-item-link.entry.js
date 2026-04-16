import { r as registerInstance } from './index-Bf9CG7gQ.js';

const menuItemLinkTargets = {
    Self: 'self',
    Parent: 'parent',
    Blank: 'blank',
    Top: 'top',
};

const AthMenuVerticalItemLink = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * Whether the link is selected
     */
    selected = false;
    /**
     * Whether the link is disabled
     */
    disabled = false;
    /**
     * Icon of the item
     **/
    icon;
    /**
     * Title of the link
     **/
    text;
    /**
     * Value of the item, in order to identify it.
     **/
    value;
    /**
     * URL of the link
     **/
    href;
    /**
     * target of the link: blank | self
     **/
    target = menuItemLinkTargets.Blank;
    /**
     * rel of the link
     **/
    rel;
    /**
     * The text that indicates that the link open a new window
     **/
    externalLabel = 'Se abre en una nueva ventana';
};

export { AthMenuVerticalItemLink as ath_menu_vertical_item_link };
//# sourceMappingURL=ath-menu-vertical-item-link.entry.esm.js.map
