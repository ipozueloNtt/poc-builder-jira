import { Component, Element, Event, EventEmitter, Host, Prop, Watch, h } from '@stencil/core';
import {
  TableSelectable,
  TableSelectableType,
  TableStriping,
  TableStripingType,
  TableColorType,
  TableColor,
  TableSizeType,
  TableRowClickEvent,
  TableFrozenType,
  TableFrozen,
  TableRowSelectionChangeEvent,
} from '../table.model';
import { RadioButtonChangeDetail } from '../../radio-button/radio-button.model';
import { CheckboxChangeEventDetail } from '../../checkbox/checkbox.model';
import { IconSize } from '@utils/helper';

@Component({
  tag: 'ath-table-row',
  styleUrl: 'table-row.scss',
  shadow: true,
})
export class AthTableRow {
  @Element() el!: HTMLElement;

  /** Current selection state */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /** Apply zebra striping */
  @Prop() striped: TableStripingType = TableStriping.None;

  /** Selection mode (none | single | multiple) */
  @Prop() selectable: TableSelectableType = TableSelectable.None;

  /** Enable clickable functionality */
  @Prop() clickable: boolean = false;

  /** Aria label of row click button */
  @Prop() clickableAriaLabel: string = 'Navegar';

  /** Row color */
  @Prop() color: TableColorType = TableColor.Primary;

  /** Row size */
  @Prop() size: TableSizeType;

  /** Group name for radios in single mode */
  @Prop() selectionGroupName: string;

  /** Optional row value to be included in selection events */
  @Prop() value: any;

  /** Unique id for this row */
  @Prop() rowId?: string;

  /** Optional parent row id if this row is a child */
  @Prop({ reflect: true }) parentId?: string;

  /** Whether this row has children */
  @Prop() hasChildren: boolean = false;

  /** Reserve space for expander column even if this row has no children. Internal use by ath-table */
  @Prop() reserveExpander: boolean = false;

  /** Reserve space for clickable column. Internal use by ath-table */
  @Prop() reserveClickable: boolean = false;

  /** Controls the expanded state for rows that have children */
  @Prop({ mutable: true, reflect: true }) expanded: boolean = false;

  /** Indicates that this is the last visual row (no border). Internal use by ath-table */
  @Prop() last: boolean = false;

  /** If the row has a fixed column, specify if it's the first or last column */
  @Prop() frozen: TableFrozenType = TableFrozen.None;

  /** Emits when this row selection changes */
  @Event() athRowSelectionChange: EventEmitter<TableRowSelectionChangeEvent>;

  /** Emits when this clickable row is clicked */
  @Event() athRowClick: EventEmitter<TableRowClickEvent>;

  @Watch('striped')
  handleZebraChange() {
    this.updateZebraClasses();
  }

  @Watch('selected')
  handleSelectedChanged() {
    this.syncControlsWithSelected();
  }

  @Watch('expanded')
  handleExpandedChanged() {
    this.applyExpanderToFirstCell();
    this.emitExpansionEvents();
  }

  @Watch('hasChildren')
  @Watch('reserveExpander')
  handleHierarchyFlagsChanged() {
    this.applyExpanderToFirstCell();
  }

  private handlePseudoFocusKeyDown = (ev: KeyboardEvent) => {
    if (this.clickable && ['Enter', 'Space'].includes(ev.code)) {
      ev.preventDefault();
      ev.stopPropagation();
      this.onActionClick();
    }
  };

  private updateZebraClasses() {
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
      } else if (this.striped === TableStriping.Columns) {
        cells.forEach((cell, cellIndex) => {
          const isOddCell = cellIndex % 2 !== 0;
          cell.striped = isOddCell;
        });
      } else {
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

  private radioEl?: HTMLAthRadioButtonElement;
  private checkboxEl?: HTMLAthCheckboxElement;

  private onRadioChange = (e: CustomEvent<RadioButtonChangeDetail>) => {
    // ath-radio-button emits { checked, value }
    const detail = e.detail;
    if (detail && typeof detail.checked === 'boolean') {
      this.selected = !!detail.checked;
      this.athRowSelectionChange.emit({ selected: this.selected });
    }
  };

  private onCheckboxChange = (e: CustomEvent<CheckboxChangeEventDetail>) => {
    // ath-checkbox emits { value: 'true' | 'false' }
    const detail = e.detail;
    const isTrue = detail && detail.value === 'true';
    this.selected = !!isTrue;
    this.athRowSelectionChange.emit({ selected: this.selected });
  };

  private onActionClick = () => {
    this.athRowClick.emit({
      rowValue: this.value,
      rowId: this.rowId,
    });
  };

  private syncControlsWithSelected() {
    if (this.selectable === TableSelectable.Single && this.radioEl) {
      if (this.selected) {
        this.radioEl.checked = true;
      } else if (typeof this.radioEl.unCheck === 'function') {
        this.radioEl.unCheck();
      } else {
        this.radioEl.checked = false;
      }
    }
    if (this.selectable === TableSelectable.Multiple && this.checkboxEl) {
      this.checkboxEl.value = this.selected ? 'true' : 'false';
    }
  }

  private applyExpanderToFirstCell() {
    // Find first data cell (exclude selection cell)
    const cells = Array.from(this.el.querySelectorAll('ath-table-row-item'));
    if (!cells.length) return;
    const dataCell = cells.find(c => !c.hasAttribute('data-ath-selection')) || cells[0];
    if (!dataCell) return;
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

  private emitExpansionEvents() {
    if (this.rowId) {
      const ev = new CustomEvent('athToggleCollapse', { detail: this.rowId, bubbles: true });
      window.dispatchEvent(ev);
    }
  }

  private onSlotClick($event: PointerEvent) {
    if (!this.clickable) return;

    // Prevent clicks on interactive elements inside the row from triggering the row click
    const path = $event.composedPath() as HTMLElement[];
    const clickedCell = path.find(el => el.tagName && el.tagName.toLowerCase() === 'ath-table-row-item') as HTMLAthTableRowItemElement;
    if (clickedCell && clickedCell.hasInteractivity) {
      return;
    }

    this.onActionClick();
  }

  private getAttributes = () => ({
    role: 'row',
  });

  private getHostClassNames = () => ({
    'ath-table-row--last': this.last,
    'ath-table-row--clickable': this.clickable,
  });

  render() {
    return (
      <Host {...this.getAttributes()} class={this.getHostClassNames()}>
        {this.clickable && (
          <div class="ath-table-row__focus" tabIndex={0} aria-label={this.clickableAriaLabel} onKeyDown={this.handlePseudoFocusKeyDown} onClick={this.onActionClick}></div>
        )}

        {this.selectable !== TableSelectable.None && (
          <ath-table-row-item data-ath-selection alignment="center" cellWidth="64px" frozen={this.frozen} noFrozenShadow={true} color={this.color} size={this.size}>
            {this.selectable === TableSelectable.Single ? (
              <ath-radio-button
                ref={el => (this.radioEl = el)}
                name={this.selectionGroupName}
                ariaLabel="Selecciona esta fila"
                checked={this.selected}
                onAthChange={this.onRadioChange}
              ></ath-radio-button>
            ) : this.selectable === TableSelectable.Multiple ? (
              <ath-checkbox
                ref={el => (this.checkboxEl = el)}
                ariaLabel="Selecciona esta fila"
                value={this.selected ? 'true' : 'false'}
                onAthChange={this.onCheckboxChange}
              ></ath-checkbox>
            ) : null}
          </ath-table-row-item>
        )}

        {!this.clickable ? (
          <slot></slot>
        ) : (
          <div class="ath-table-row__wrapper" onClick={e => this.onSlotClick(e)}>
            <slot></slot>
          </div>
        )}

        {this.reserveClickable && (
          <ath-table-row-item data-ath-action alignment="center" cellWidth="64px" color={this.color} size={this.size}>
            {this.clickable && <ath-icon icon="arrow_right" color="default" size={IconSize.Medium} title={this.clickableAriaLabel} onClick={() => this.onActionClick()}></ath-icon>}
          </ath-table-row-item>
        )}
      </Host>
    );
  }
}
