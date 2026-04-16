import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { a as getCellRole, g as getCellStyles } from './table.utils-Be7uKW1F.js';
import { d as TableFrozen, a as TableColor } from './table.model-CNHkCc5d.js';

const tableRowItemCss = ":host(.ath-table-row-item--left){text-align:left;justify-content:flex-start}:host(.ath-table-row-item--center){text-align:center;justify-content:center}:host(.ath-table-row-item--right){text-align:right;justify-content:flex-end}:host(.ath-table-row-item--primary){background:var(--ath-box-shadow-table-row-item-primary-color)}:host(.ath-table-row-item--secondary){background:var(--ath-box-shadow-table-row-item-secondary-color)}:host(.ath-table-row-item--sm){--padding-y:var(--ath-spacing-table-row-item-padding-y-sm)}:host(.ath-table-row-item--md){--padding-y:var(--ath-spacing-table-row-item-padding-y-md)}:host(.ath-table-row-item--lg){--padding-y:var(--ath-spacing-table-row-item-padding-y-lg)}:host(.ath-table-row-item--frozen-first){position:sticky;left:0}:host(.ath-table-row-item--frozen-last){position:sticky;right:0}:host(.ath-table-row-item--frozen-first--shadow)::after{content:\"\";position:absolute;pointer-events:none;width:8px;height:100%;top:0;right:0;background:linear-gradient(270deg, var(--ath-color-table-row-item-gradient-default-2) 0%, var(--ath-color-table-row-item-gradient-default-1) 100%);border-left:1px solid var(--ath-color-table-row-item-border-x)}:host(.ath-table-row-item--striped--frozen-first--shadow)::after{content:\"\";position:absolute;pointer-events:none;width:8px;height:100%;top:0;right:0;background:linear-gradient(270deg, var(--ath-color-table-row-item-gradient-striped-2) 0%, var(--ath-color-table-row-item-gradient-striped-1) 100%);border-left:1px solid var(--ath-color-table-row-item-border-x)}:host(.ath-table-row-item--frozen-last--shadow)::before{content:\"\";position:absolute;pointer-events:none;width:8px;height:100%;top:0;left:0;background:linear-gradient(270deg, var(--ath-color-table-row-item-gradient-default-1) 0%, var(--ath-color-table-row-item-gradient-default-2) 100%);border-right:1px solid var(--ath-color-table-row-item-border-x)}:host(.ath-table-row-item--striped--frozen-last--shadow)::before{content:\"\";position:absolute;pointer-events:none;width:8px;height:100%;top:0;left:0;background:linear-gradient(270deg, var(--ath-color-table-row-item-gradient-striped-1) 0%, var(--ath-color-table-row-item-gradient-striped-2) 100%);border-right:1px solid var(--ath-color-table-row-item-border-x)}:host{display:flex;height:100%;align-items:center;box-sizing:border-box;padding:var(--padding-y) var(--ath-spacing-table-row-item-padding-x);gap:var(--ath-spacing-table-row-item-col-gap);font-family:var(--ath-font-family-body);color:var(--ath-color-table-row-item-fg-default);font-size:var(--ath-font-size-comp-md);font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-comp-md)}:host(.ath-table-row-item--striped){box-shadow:inset 0 0 0 99999px var(--ath-color-table-row-item-bg-striped)}.ath-table-row-item__child-spacing{padding-left:calc(var(--ath-spacing-table-row-item-padding-y-lg) - var(--ath-spacing-table-row-item-col-gap))}.ath-button_comp{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.ath-button_comp:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.ath-button_comp:hover{background:var(--ath-color-bg-alpha-hovered)}.ath-button_comp:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.ath-button_comp--disabled{pointer-events:none;color:var(--ath-color-button-icon-disabled)}";

const AthTableRowItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /** Column width (px, %, auto) */
    cellWidth = 'auto';
    /** If this cell is header of the row */
    isHeader = false;
    /**
     * If this cell contains interactive elements (menus, buttons, links, etc.).
     * When true, row click events will be prevented to avoid conflicts with cell interactions.
     */
    hasInteractivity = false;
    /** If this cell is fixed, created a first or last column fixed */
    frozen = TableFrozen.None;
    /** If true, no shadow will be applied to the frozen cell */
    noFrozenShadow = false;
    /** Cell alignment */
    alignment;
    /** Table size */
    size;
    /** Striped background */
    striped = false;
    /** Background color */
    color = TableColor.Primary;
    /** Marks this cell as an expander control (collapse/expand). Internal use by ath-table-row. */
    expander = false;
    /** Current expanded state (used when expander = true) */
    expanded = false;
    /** Aria-controls value for the expander button (ID of the collapsable content) */
    expanderAriaControls;
    /** Marks this cell as the first data cell of a child row (for indentation) */
    isChild = false;
    getClassNames = () => ({
        'ath-table-row-item': true,
        [`ath-table-row-item--${this.color}`]: !!this.color,
        [`ath-table-row-item--${this.alignment}`]: !!this.alignment,
        [`ath-table-row-item--${this.size}`]: !!this.size,
        [`ath-table-row-item--frozen-${this.frozen}`]: this.frozen !== TableFrozen.None,
        [`ath-table-row-item--${this.striped ? 'striped--' : ''}frozen-${this.frozen}--shadow`]: this.frozen !== TableFrozen.None && this.noFrozenShadow !== true,
        'ath-table-row-item--striped': this.striped,
        'ath-table-row-item--child': this.isChild,
    });
    onExpanderClick = (e) => {
        e.stopPropagation();
        const rowEl = this.el.closest('ath-table-row');
        if (!rowEl)
            return;
        if (!rowEl.hasChildren)
            return;
        rowEl.expanded = !rowEl.expanded;
    };
    render() {
        const rowEl = this.el?.closest('ath-table-row');
        const showButton = this.expander && rowEl && rowEl.hasChildren;
        return (h(Host, { key: '5decd7fac1036c157d2340d0d101069aba4625ec', style: getCellStyles(this.cellWidth), class: this.getClassNames(), role: getCellRole(this.isHeader) }, showButton && (h("button", { key: '4f075377d1886b63a9ad4a1bfcd190297aacf86f', class: "ath-button_comp", "aria-controls": this.expanderAriaControls, "aria-label": rowEl.expanded ? 'Colapsar fila' : 'Expandir fila', "aria-expanded": String(!!rowEl.expanded), onClick: this.onExpanderClick }, h("ath-collapse-icon", { key: '282528aacfca9f281e2c8e8fe948fb2f34e3f0c1', expanded: rowEl.expanded }))), this.isChild && h("div", { key: 'a1e1b4b94865f74294b66994ababfad8497695f6', class: "ath-table-row-item__child-spacing" }), h("slot", { key: '4e21fb4cc9bf57c48397cede9e3a8d108fb07ad2' })));
    }
};
AthTableRowItem.style = tableRowItemCss;

export { AthTableRowItem as ath_table_row_item };
//# sourceMappingURL=ath-table-row-item.entry.esm.js.map
