import { Component, Element, Host, Prop, Event, EventEmitter, h } from '@stencil/core';
import { TableSelectable, TableSelectableType, TableColorType, TableColor, TableSizeType, TableFrozenType, TableFrozen } from '../table.model';
import { CheckboxValue, CheckboxValues } from '../../checkbox/checkbox.model';
import { TableSelectAllChangeEvent } from '../table.model';

@Component({
  tag: 'ath-table-header',
  styleUrl: 'table-header.scss',
  shadow: true,
})
export class AthTableHeader {
  @Element() el!: HTMLElement;

  /** Selection mode (none | single | multiple) */
  @Prop() selectable: TableSelectableType = TableSelectable.None;

  /** Enable clickable rows with action column */
  @Prop() clickable: boolean = false;

  /** Header color */
  @Prop() color: TableColorType = TableColor.Primary;

  /** Header size */
  @Prop() size: TableSizeType;

  /** If the row has a fixed column, specify if it's the first or last column */
  @Prop() frozen: TableFrozenType = TableFrozen.None;

  /** Hides select all checkbox when selectable is multiple */
  @Prop() noSelectAll: boolean = false;

  /** Current state of the select all checkbox (false | true | indeterminate) */
  @Prop() selectAllState: CheckboxValues = CheckboxValue.False;

  /** Total number of selectable rows (used for determining indeterminate state) */
  @Prop() totalRows: number = 0;

  /** Number of currently selected rows (used for determining indeterminate state) */
  @Prop() selectedRows: number = 0;

  /** Fired when select all checkbox state changes */
  @Event() athSelectAllChange: EventEmitter<TableSelectAllChangeEvent>;

  componentDidLoad() {
    // Set default widths if needed
    const items = this.el.querySelectorAll('ath-table-header-item');
    if (items.length) {
      Array.from(items).forEach(item => {
        if (item.cellWidth === 'auto' || item.cellWidth === '') {
          item.cellWidth = `${100 / items.length}%`;
        }
      });
    }
  }

  private handleSelectAllChange = () => {
    let newState: CheckboxValues;
    let selectAll: boolean;

    if (this.selectAllState === CheckboxValue.False || this.selectAllState === CheckboxValue.Indeterminate) {
      newState = CheckboxValue.True;
      selectAll = true;
    } else {
      newState = CheckboxValue.False;
      selectAll = false;
    }

    this.athSelectAllChange.emit({ selectAll, state: newState });
  };

  render() {
    return (
      <Host slot="header" role="row">
        {this.selectable !== TableSelectable.None && (
          <ath-table-header-item
            data-ath-selection
            alignment="center"
            cellWidth="64px"
            color={this.color}
            size={this.size}
            frozen={this.frozen !== TableFrozen.Last ? TableFrozen.First : undefined}
          >
            {this.selectable === TableSelectable.Multiple && !this.noSelectAll ? (
              <ath-checkbox value={this.selectAllState} ariaLabel="Seleccionar todas las filas" onAthChange={this.handleSelectAllChange} />
            ) : (
              <span class="sr-only">Columna de selección</span>
            )}
          </ath-table-header-item>
        )}
        <slot></slot>
        {this.clickable && (
          <ath-table-header-item
            data-ath-action
            alignment="center"
            cellWidth="64px"
            color={this.color}
            size={this.size}
            frozen={this.frozen !== TableFrozen.First ? TableFrozen.Last : undefined}
          >
            <span class="sr-only">Columna de acción</span>
          </ath-table-header-item>
        )}
      </Host>
    );
  }
}
