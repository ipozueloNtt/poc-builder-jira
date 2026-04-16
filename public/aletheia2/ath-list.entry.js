import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { L as ListSizes, a as ListOrientation } from './list.model-B7BBdWjk.js';

const listCss = ".sc-ath-list-h{display:flex;flex-wrap:nowrap;flex-direction:var(--flex-direction--container)}.ath-list--horizontal.sc-ath-list-h{--flex-direction--container:row;--flex-direction--items:column}.ath-list--vertical.sc-ath-list-h{--flex-direction--container:column;--flex-direction--items:row}";

const AthList = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /** List spacings size*/
    size = ListSizes.Medium;
    /** Define the list orientation*/
    orientation = ListOrientation.Vertical;
    /** Define if the list contains dividers between items*/
    hasDivider;
    /** List state disabled, only works if clickable is true */
    disabled = false;
    /** List is clickable */
    clickable = false;
    slottedItems = [];
    getHostAttributes = () => ({
        role: 'list',
    });
    getListClassNames = () => ({
        'ath-list': true,
        [`ath-list--${this.orientation}`]: !!this.orientation,
        'disabled': this.disabled,
        'clickable': this.clickable,
    });
    componentWillLoad() {
        this.slottedItems = Array.from(this.el.querySelectorAll('ath-list-item'));
        this.slottedItems.forEach((item, index) => {
            item.hasDivider = !!this.hasDivider && this.hasDivider && index < this.slottedItems.length - 1;
            item.orientation = this.orientation;
            item.size = this.size;
            if (this.disabled) {
                item.disabled = this.disabled;
            }
            if (this.clickable) {
                item.clickable = this.clickable;
            }
        });
    }
    render() {
        return (h(Host, { key: '471bf158674920e045f55606f92828585f288fd8', class: this.getListClassNames(), ...this.getHostAttributes() }, h("slot", { key: '213cf899f36da1495a5cf59171e820121588ca62' })));
    }
};
AthList.style = listCss;

export { AthList as ath_list };
//# sourceMappingURL=ath-list.entry.esm.js.map
