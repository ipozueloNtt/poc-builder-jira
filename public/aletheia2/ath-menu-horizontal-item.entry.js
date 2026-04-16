import { r as registerInstance } from './index-Bf9CG7gQ.js';
import { T as TargetType } from './menu-horizontal.model-CgHQrXFp.js';

const AthMenuHorizontalItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /**
     * The accessible text of the badge
     */
    badgeLabel;
    /**
     * The value of the badge
     */
    badgeValue = undefined;
    /**
     * The maximum value inside the badge
     */
    badgeMax;
    /**
     * Whether the item is disabled or not
     */
    disabled;
    /**
     * Additional text to be appended to the aria-label to indicate that this is an external link
     */
    externalLabel = '(Se abre en una nueva ventana)';
    /**
     * The URL of the item
     */
    href;
    /**
     * The label of the item
     */
    label;
    /**
     * Whether the item is selected or not
     */
    selected;
    /**
     * Specifies the relationship of the linked URL
     */
    rel;
    /**
     * The target of the link
     */
    target = TargetType.Self;
    /*
     * Value of the item
     */
    value;
};

export { AthMenuHorizontalItem as ath_menu_horizontal_item };
//# sourceMappingURL=ath-menu-horizontal-item.entry.esm.js.map
