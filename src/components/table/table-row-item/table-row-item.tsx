import { Component, Host, Prop, Element, h } from '@stencil/core';
import { getCellRole, getCellStyles } from '../utils/table.utils';
import { TableColor, TableColorType, TableAlignmentType, TableFrozen, TableFrozenType, TableSizeType } from '../table.model';

@Component({
  tag: 'ath-table-row-item',
  styleUrl: 'table-row-item.scss',
  shadow: true,
})
export class AthTableRowItem {
  @Element() el!: HTMLElement;

  /** Column width (px, %, auto) */
  @Prop() cellWidth: string = 'auto';

  /** If this cell is header of the row */
  @Prop() isHeader = false;

  /**
   * If this cell contains interactive elements (menus, buttons, links, etc.).
   * When true, row click events will be prevented to avoid conflicts with cell interactions.
   */
  @Prop() hasInteractivity = false;

  /** If this cell is fixed, created a first or last column fixed */
  @Prop({ reflect: true }) frozen: TableFrozenType = TableFrozen.None;

  /** If true, no shadow will be applied to the frozen cell */
  @Prop() noFrozenShadow: boolean = false;

  /** Cell alignment */
  @Prop() alignment: TableAlignmentType;

  /** Table size */
  @Prop() size: TableSizeType;

  /** Striped background */
  @Prop() striped: boolean = false;

  /** Background color */
  @Prop() color: TableColorType = TableColor.Primary;

  /** Marks this cell as an expander control (collapse/expand). Internal use by ath-table-row. */
  @Prop() expander: boolean = false;

  /** Current expanded state (used when expander = true) */
  @Prop() expanded: boolean = false;

  /** Aria-controls value for the expander button (ID of the collapsable content) */
  @Prop() expanderAriaControls: string;

  /** Marks this cell as the first data cell of a child row (for indentation) */
  @Prop() isChild: boolean = false;

  private getClassNames = () => ({
    'ath-table-row-item': true,
    [`ath-table-row-item--${this.color}`]: !!this.color,
    [`ath-table-row-item--${this.alignment}`]: !!this.alignment,
    [`ath-table-row-item--${this.size}`]: !!this.size,
    [`ath-table-row-item--frozen-${this.frozen}`]: this.frozen !== TableFrozen.None,
    [`ath-table-row-item--${this.striped ? 'striped--' : ''}frozen-${this.frozen}--shadow`]: this.frozen !== TableFrozen.None && this.noFrozenShadow !== true,
    'ath-table-row-item--striped': this.striped,
    'ath-table-row-item--child': this.isChild,
  });

  private onExpanderClick = (e: Event) => {
    e.stopPropagation();
    const rowEl = this.el.closest('ath-table-row');
    if (!rowEl) return;
    if (!rowEl.hasChildren) return;
    rowEl.expanded = !rowEl.expanded;
  };

  render() {
    const rowEl = this.el?.closest('ath-table-row');
    const showButton = this.expander && rowEl && rowEl.hasChildren;

    return (
      <Host style={getCellStyles(this.cellWidth)} class={this.getClassNames()} role={getCellRole(this.isHeader)}>
        {showButton && (
          <button
            class="ath-button_comp"
            aria-controls={this.expanderAriaControls}
            aria-label={rowEl.expanded ? 'Colapsar fila' : 'Expandir fila'}
            aria-expanded={String(!!rowEl.expanded)}
            onClick={this.onExpanderClick}
          >
            <ath-collapse-icon expanded={rowEl.expanded}></ath-collapse-icon>
          </button>
        )}
        {this.isChild && <div class="ath-table-row-item__child-spacing"></div>}
        <slot></slot>
      </Host>
    );
  }
}
