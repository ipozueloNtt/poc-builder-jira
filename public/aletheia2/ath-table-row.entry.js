import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { b as TableStriping, c as TableSelectable, a as TableColor, d as TableFrozen } from './table.model-CNHkCc5d.js';
import './index-DLEKXOBo.js';
import { I as IconSize } from './types-Dwt0hPp9.js';

const tableRowCss = ":host{display:flex;align-items:center;border-bottom:var(--ath-border-width-xs) solid var(--ath-color-table-row-item-border);transition:border-bottom-color 0.5s ease;position:relative}:host .ath-table-row__wrapper{display:contents}:host .ath-table-row__focus{position:absolute;top:0;left:0;right:0;bottom:0;z-index:1;background:transparent;border:none;outline:none;cursor:pointer;pointer-events:none}:host .ath-table-row__focus:focus-visible{outline:none;box-shadow:0 0 0 2px var(--ath-color-drop-shadow-focus), 0 0 0 4px var(--ath-color-border-focus);border-radius:2px}:host .ath-table-row__focus:focus{pointer-events:auto}:host(.ath-table-row--last){border-bottom-color:transparent}:host(.ath-table-row--last)>::slotted(:first-child),:host(.ath-table-row--last) .ath-table-row__wrapper>::slotted(:first-child){border-bottom-left-radius:var(--ath-border-radius-table-default)}:host(.ath-table-row--last)>ath-table-row-item[data-ath-selection]{border-bottom-left-radius:var(--ath-border-radius-table-default)}:host(.ath-table-row--last)>ath-table-row-item[data-ath-selection]~::slotted(*),:host(.ath-table-row--last)>ath-table-row-item[data-ath-selection]~.ath-table-row__wrapper>::slotted(*){border-bottom-left-radius:initial}:host(.ath-table-row--last)>::slotted(:last-child),:host(.ath-table-row--last)>ath-table-row-item[data-ath-action]{border-bottom-right-radius:var(--ath-border-radius-table-default)}:host(.ath-table-row--clickable){cursor:pointer}:host(.ath-table-row--clickable:hover){border-color:var(--ath-color-table-row-clickable-border-hovered);border-width:var(--ath-border-width-table-row-clickable-hover);box-shadow:var(--ath-box-shadow-table-row-clickable-hovered-offset-x) var(--ath-box-shadow-table-row-clickable-hovered-offset-y) var(--ath-box-shadow-table-row-clickable-hovered-blur) var(--ath-box-shadow-table-row-clickable-hovered-color);transition:box-shadow 0.2s ease, border-color 0.2s ease, border-width 0.2s ease;z-index:1}:host(.ath-table-row--clickable:active){border-color:var(--ath-color-table-row-clickable-border-pressed);border-width:var(--ath-border-width-table-row-clickable-active);box-shadow:var(--ath-box-shadow-table-row-clickable-pressed-offset-x) var(--ath-box-shadow-table-row-clickable-pressed-offset-y) var(--ath-box-shadow-table-row-clickable-pressed-blur) var(--ath-box-shadow-table-row-clickable-pressed-color);transition:box-shadow 0.1s ease, border-color 0.1s ease, border-width 0.1s ease;z-index:1}:host(.ath-table-row--last.ath-table-row--clickable:hover),:host(.ath-table-row--last.ath-table-row--clickable:active){border-color:transparent;border-width:var(--ath-border-width-xs);border-bottom-left-radius:var(--ath-border-radius-table-default);border-bottom-right-radius:var(--ath-border-radius-table-default)}";

const AthTableRow = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athRowSelectionChange = createEvent(this, "athRowSelectionChange", 7);
        this.athRowClick = createEvent(this, "athRowClick", 7);
    }
    get el() { return getElement(this); }
    /** Current selection state */
    selected = false;
    /** Apply zebra striping */
    striped = TableStriping.None;
    /** Selection mode (none | single | multiple) */
    selectable = TableSelectable.None;
    /** Enable clickable functionality */
    clickable = false;
    /** Aria label of row click button */
    clickableAriaLabel = 'Navegar';
    /** Row color */
    color = TableColor.Primary;
    /** Row size */
    size;
    /** Group name for radios in single mode */
    selectionGroupName;
    /** Optional row value to be included in selection events */
    value;
    /** Unique id for this row */
    rowId;
    /** Optional parent row id if this row is a child */
    parentId;
    /** Whether this row has children */
    hasChildren = false;
    /** Reserve space for expander column even if this row has no children. Internal use by ath-table */
    reserveExpander = false;
    /** Reserve space for clickable column. Internal use by ath-table */
    reserveClickable = false;
    /** Controls the expanded state for rows that have children */
    expanded = false;
    /** Indicates that this is the last visual row (no border). Internal use by ath-table */
    last = false;
    /** If the row has a fixed column, specify if it's the first or last column */
    frozen = TableFrozen.None;
    /** Emits when this row selection changes */
    athRowSelectionChange;
    /** Emits when this clickable row is clicked */
    athRowClick;
    handleZebraChange() {
        this.updateZebraClasses();
    }
    handleSelectedChanged() {
        this.syncControlsWithSelected();
    }
    handleExpandedChanged() {
        this.applyExpanderToFirstCell();
        this.emitExpansionEvents();
    }
    handleHierarchyFlagsChanged() {
        this.applyExpanderToFirstCell();
    }
    handlePseudoFocusKeyDown = (ev) => {
        if (this.clickable && ['Enter', 'Space'].includes(ev.code)) {
            ev.preventDefault();
            ev.stopPropagation();
            this.onActionClick();
        }
    };
    updateZebraClasses() {
        // Get index among siblings
        const parent = this.el.parentElement;
        if (parent) {
            const siblings = Array.from(parent.children).filter(el => el.tagName.toLowerCase() === 'ath-table-row');
            const index = siblings.indexOf(this.el);
            const isEven = index % 2 === 0;
            const slottedCells = Array.from(this.el.querySelectorAll('ath-table-row-item'));
            const shadowCells = Array.from(this.el.shadowRoot?.querySelectorAll('ath-table-row-item') || []);
            const cells = [...shadowCells, ...slottedCells];
            if (this.striped === TableStriping.Rows) {
                cells.forEach(cell => {
                    cell.striped = isEven;
                });
            }
            else if (this.striped === TableStriping.Columns) {
                cells.forEach((cell, cellIndex) => {
                    const isOddCell = cellIndex % 2 !== 0;
                    cell.striped = isOddCell;
                });
            }
            else {
                cells.forEach(cell => {
                    cell.striped = false;
                });
            }
        }
    }
    componentDidRender() {
        this.applyExpanderToFirstCell();
        this.updateZebraClasses();
    }
    componentDidLoad() {
        this.updateZebraClasses();
        this.syncControlsWithSelected();
    }
    radioEl;
    checkboxEl;
    onRadioChange = (e) => {
        // ath-radio-button emits { checked, value }
        const detail = e.detail;
        if (detail && typeof detail.checked === 'boolean') {
            this.selected = !!detail.checked;
            this.athRowSelectionChange.emit({ selected: this.selected });
        }
    };
    onCheckboxChange = (e) => {
        // ath-checkbox emits { value: 'true' | 'false' }
        const detail = e.detail;
        const isTrue = detail && detail.value === 'true';
        this.selected = !!isTrue;
        this.athRowSelectionChange.emit({ selected: this.selected });
    };
    onActionClick = () => {
        this.athRowClick.emit({
            rowValue: this.value,
            rowId: this.rowId,
        });
    };
    syncControlsWithSelected() {
        if (this.selectable === TableSelectable.Single && this.radioEl) {
            if (this.selected) {
                this.radioEl.checked = true;
            }
            else if (typeof this.radioEl.unCheck === 'function') {
                this.radioEl.unCheck();
            }
            else {
                this.radioEl.checked = false;
            }
        }
        if (this.selectable === TableSelectable.Multiple && this.checkboxEl) {
            this.checkboxEl.value = this.selected ? 'true' : 'false';
        }
    }
    applyExpanderToFirstCell() {
        // Find first data cell (exclude selection cell)
        const cells = Array.from(this.el.querySelectorAll('ath-table-row-item'));
        if (!cells.length)
            return;
        const dataCell = cells.find(c => !c.hasAttribute('data-ath-selection')) || cells[0];
        if (!dataCell)
            return;
        const needsExpander = this.hasChildren || this.reserveExpander;
        if (!needsExpander) {
            dataCell.expander = false;
            return;
        }
        dataCell.expander = true;
        dataCell.expanded = this.expanded;
        dataCell.expanderAriaControls = this.rowId;
        dataCell.isChild = !!this.parentId;
    }
    emitExpansionEvents() {
        if (this.rowId) {
            const ev = new CustomEvent('athToggleCollapse', { detail: this.rowId, bubbles: true });
            window.dispatchEvent(ev);
        }
    }
    onSlotClick($event) {
        if (!this.clickable)
            return;
        // Prevent clicks on interactive elements inside the row from triggering the row click
        const path = $event.composedPath();
        const clickedCell = path.find(el => el.tagName && el.tagName.toLowerCase() === 'ath-table-row-item');
        if (clickedCell && clickedCell.hasInteractivity) {
            return;
        }
        this.onActionClick();
    }
    getAttributes = () => ({
        role: 'row',
    });
    getHostClassNames = () => ({
        'ath-table-row--last': this.last,
        'ath-table-row--clickable': this.clickable,
    });
    render() {
        return (h(Host, { key: 'e21cadeb250c6bc96c3f55e8b2816af4900adfb4', ...this.getAttributes(), class: this.getHostClassNames() }, this.clickable && (h("div", { key: 'e367f461816ad80b5f17313f7d7e74733208104f', class: "ath-table-row__focus", tabIndex: 0, "aria-label": this.clickableAriaLabel, onKeyDown: this.handlePseudoFocusKeyDown, onClick: this.onActionClick })), this.selectable !== TableSelectable.None && (h("ath-table-row-item", { key: '90d49644420f41e6fb7f491b09da166c4d7b55e6', "data-ath-selection": true, alignment: "center", cellWidth: "64px", frozen: this.frozen, noFrozenShadow: true, color: this.color, size: this.size }, this.selectable === TableSelectable.Single ? (h("ath-radio-button", { ref: el => (this.radioEl = el), name: this.selectionGroupName, ariaLabel: "Selecciona esta fila", checked: this.selected, onAthChange: this.onRadioChange })) : this.selectable === TableSelectable.Multiple ? (h("ath-checkbox", { ref: el => (this.checkboxEl = el), ariaLabel: "Selecciona esta fila", value: this.selected ? 'true' : 'false', onAthChange: this.onCheckboxChange })) : null)), !this.clickable ? (h("slot", null)) : (h("div", { class: "ath-table-row__wrapper", onClick: e => this.onSlotClick(e) }, h("slot", null))), this.reserveClickable && (h("ath-table-row-item", { key: '12f4dfc85d0e01ad473269872186d2feee290409', "data-ath-action": true, alignment: "center", cellWidth: "64px", color: this.color, size: this.size }, this.clickable && h("ath-icon", { key: 'b10bcd49254125eba5c9e328a50144b0f94cc3d1', icon: "arrow_right", color: "default", size: IconSize.Medium, title: this.clickableAriaLabel, onClick: () => this.onActionClick() })))));
    }
    static get watchers() { return {
        "striped": ["handleZebraChange"],
        "selected": ["handleSelectedChanged"],
        "expanded": ["handleExpandedChanged"],
        "hasChildren": ["handleHierarchyFlagsChanged"],
        "reserveExpander": ["handleHierarchyFlagsChanged"]
    }; }
};
AthTableRow.style = tableRowCss;

export { AthTableRow as ath_table_row };
//# sourceMappingURL=ath-table-row.entry.esm.js.map
