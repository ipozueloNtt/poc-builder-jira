import { r as registerInstance, h, d as Host } from './index-Bf9CG7gQ.js';
import { g as getCellStyles } from './table.utils-Be7uKW1F.js';
import { a as TableColor } from './table.model-CNHkCc5d.js';

const tableHeaderItemCss = ":host{display:flex;align-content:center;flex-wrap:wrap;box-sizing:border-box;color:var(--ath-color-table-col-header-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-comp-md);font-weight:var(--ath-font-weight-medium);line-height:var(--ath-font-line-height-comp-md);padding:var(--padding-y) var(--ath-spacing-table-col-header-padding-x)}:host(:first-child){border-top-left-radius:var(--ath-border-radius-table-default)}:host(:last-child){border-top-right-radius:var(--ath-border-radius-table-default)}:host(.ath-table-header-item--left){text-align:left;justify-content:flex-start}:host(.ath-table-header-item--center){text-align:center;justify-content:center}:host(.ath-table-header-item--right){text-align:right;justify-content:flex-end}:host(.ath-table-header-item--primary){background:var(--ath-color-table-col-header-bg-primary)}:host(.ath-table-header-item--secondary){background:var(--ath-color-table-col-header-bg-secondary)}:host(.ath-table-header-item--frozen-first){position:sticky;left:0}:host(.ath-table-header-item--frozen-last){position:sticky;right:0}:host(.ath-table-header-item--lg){--padding-y:var(--ath-spacing-table-col-header-padding-y-lg)}:host(.ath-table-header-item--md){--padding-y:var(--ath-spacing-table-col-header-padding-y-md)}:host(.ath-table-header-item--sm){--padding-y:var(--ath-spacing-table-col-header-padding-y-sm)}";

const AthTableHeaderItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    /** Column alignment */
    alignment;
    /** Item color */
    color = TableColor.Primary;
    /** Column width (px, %, auto) */
    cellWidth = 'auto';
    /** If this column is fixed */
    frozen;
    /**
     * If this column contains interactive elements (menus, buttons, links, etc.).
     * This property will be passed down to all row items in the same column.
     */
    hasInteractivity = false;
    /** Item size */
    size;
    getHostClassNames = () => ({
        'ath-table-header-item': true,
        [`ath-table-header-item--${this.alignment}`]: !!this.alignment,
        [`ath-table-header-item--${this.color}`]: !!this.color,
        [`ath-table-header-item--frozen-${this.frozen}`]: !!this.frozen,
        [`ath-table-header-item--${this.size}`]: !!this.size,
    });
    getAttributes = () => ({
        role: 'columnheader',
    });
    render() {
        return (h(Host, { key: 'f2dbe8d1630136c8779720eb334f57f251ba7b19', style: getCellStyles(this.cellWidth), class: this.getHostClassNames(), ...this.getAttributes() }, h("slot", { key: 'f4c0e022823c76f08b6c3f4aeab50b0a07be336c' })));
    }
};
AthTableHeaderItem.style = tableHeaderItemCss;

export { AthTableHeaderItem as ath_table_header_item };
//# sourceMappingURL=ath-table-header-item.entry.esm.js.map
