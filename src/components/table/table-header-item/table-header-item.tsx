import { Component, Host, Prop, h } from '@stencil/core';
import { getCellStyles } from '../utils/table.utils';
import { TableFrozenType, TableAlignmentType, TableSizeType, TableColorType, TableColor } from '../table.model';

@Component({
  tag: 'ath-table-header-item',
  styleUrl: 'table-header-item.scss',
  shadow: true,
})
export class AthTableHeaderItem {
  /** Column alignment */
  @Prop() alignment: TableAlignmentType;

  /** Item color */
  @Prop() color: TableColorType = TableColor.Primary;

  /** Column width (px, %, auto) */
  @Prop() cellWidth: string = 'auto';

  /** If this column is fixed */
  @Prop() frozen: TableFrozenType;

  /**
   * If this column contains interactive elements (menus, buttons, links, etc.).
   * This property will be passed down to all row items in the same column.
   */
  @Prop() hasInteractivity = false;

  /** Item size */
  @Prop() size: TableSizeType;

  private getHostClassNames = () => ({
    'ath-table-header-item': true,
    [`ath-table-header-item--${this.alignment}`]: !!this.alignment,
    [`ath-table-header-item--${this.color}`]: !!this.color,
    [`ath-table-header-item--frozen-${this.frozen}`]: !!this.frozen,
    [`ath-table-header-item--${this.size}`]: !!this.size,
  });

  private getAttributes = () => ({
    role: 'columnheader',
  });

  render() {
    return (
      <Host style={getCellStyles(this.cellWidth)} class={this.getHostClassNames()} {...this.getAttributes()}>
        <slot></slot>
      </Host>
    );
  }
}
