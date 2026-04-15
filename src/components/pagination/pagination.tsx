import { Component, ComponentInterface, Host, Prop, h, Event, EventEmitter, State, Watch, Listen } from '@stencil/core';
import { FcPageButton, FcPageButtonType } from './page-button/fc-page-button';
@Component({
  tag: 'ath-pagination',
  styleUrl: 'pagination.scss',
  scoped: true,
})
export class AthPagination implements ComponentInterface {
  private readonly BUTTON_WIDTH = 32 + 8; // Suma button + gap
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly DEFAULT_ITEMS_SELECTOR = [5, 10, 15];

  /**
   * Hide the buttons to navigate to the first and last pages.
   */
  @Prop() noEndButtons: boolean = false;

  /**
   * Hide the buttons to jump to the previous or next pages.
   */
  @Prop() noJumpButtons: boolean = false;

  /**
   * Determines whether the item count message is displayed in the pagination.
   */
  @Prop() noItemsCount: boolean = false;

  /**
   * Determines whether a dropdown is shown to select the number of items per page.
   */
  @Prop() noItemsSelector: boolean = false;

  /**
   * Defines the selectable options for the number of items of the dropdown.
   */
  @Prop() itemsSelector: string = '[5, 10, 15]';
  @Watch('itemsSelector')
  updateItemsSelector() {
    this.itemsSelectorArray = [];
    try {
      const parsedItems = JSON.parse(this.itemsSelector.replace(/'/g, '"'));
      parsedItems.forEach(element => {
        const parsedItem = typeof element === 'string' ? parseInt(element) : element;
        if (!isNaN(parsedItem)) {
          this.itemsSelectorArray.push(parsedItem);
        }
      });
      if (this.itemsSelectorArray.length === 0) {
        this.itemsSelectorArray = this.DEFAULT_ITEMS_SELECTOR;
      }
    } catch (error) {
      console.error('Error parsing itemsSelector:', error);
      this.itemsSelectorArray = this.DEFAULT_ITEMS_SELECTOR;
    }
  }
  @State() itemsSelectorArray: number[] = [];

  /**
   * Defines the number of items displayed per page in the pagination.
   */
  @Prop({ reflect: true }) itemsPerPage: number;
  @State() selectedItemsPerPage: number;

  /**
   * Current active page number in the pagination.
   */
  @Prop({ reflect: true }) currentPage: number = 1;
  @State() currentPageState: number;

  /**
   * Total number of items over all pages.
   */
  @Prop() totalItems: number;

  /**
   * Total number of available pages (calculated internally).
   */
  private totalPages: number = 1;

  /**
   * Determines whether the Pagination is disabled.
   */
  @Prop() disabled: boolean = false;

  /**
   * ARIA label for the pagination component.
   */
  @Prop() athAriaLabel: string = 'Paginación de resultados';

  /**
   * Event emitted when the page changes.
   * Emits the new page number as detail.
   */
  @Event() athPaginate: EventEmitter<number>;

  /**
   * Event emitted when the items per page changes.
   * Emits the new items per page as detail.
   */
  @Event() athItemsPerPageChange: EventEmitter<number>;

  @State() paginationSize: number = 5;

  @Watch('totalItems')
  onTotalItemsChange() {
    this.recalculateTotalPages();
  }

  @Watch('selectedItemsPerPage')
  onItemsPerPageChangeWatch() {
    this.recalculateTotalPages();
  }

  @Watch('currentPageState')
  onCurrentPageExternalChange() {
    this.ensureCurrentPageInRange();
    this.recalcResponsiveWindow();
  }

  @Watch('itemsPerPage')
  onItemsPerPageExternalChange(newValue: number) {
    if (newValue !== this.selectedItemsPerPage) {
      this.selectedItemsPerPage = newValue;
      this.recalculateTotalPages();
    }
  }

  @State() isMobileScreen: boolean = false;

  @Listen('resize', { target: 'window' })
  onResize() {
    this.isMobileScreen = window.innerWidth < this.MOBILE_BREAKPOINT;
    this.calculatePaginationSize();
  }

  componentWillLoad(): void {
    // Inicializar states desde props
    this.updateItemsSelector();
    this.selectedItemsPerPage = this.itemsPerPage ?? this.itemsSelectorArray[0] ?? 5;
    this.currentPageState = this.currentPage;

    if (typeof window !== 'undefined') {
      this.isMobileScreen = window.innerWidth < this.MOBILE_BREAKPOINT;
    }
  }

  componentDidLoad(): void {
    this.calculatePaginationSize();
    this.recalculateTotalPages(); // inicial
    this.ensureCurrentPageInRange();
  }

  private recalcResponsiveWindow() {
    if (typeof window !== 'undefined' && window.innerWidth < this.MOBILE_BREAKPOINT) {
      this.calculatePaginationSize();
    }
  }

  private recalculateTotalPages() {
    if (this.totalItems != null && this.selectedItemsPerPage) {
      const computed = Math.max(1, Math.ceil(this.totalItems / this.selectedItemsPerPage));
      if (computed !== this.totalPages) {
        this.totalPages = computed;
      }
      this.ensureCurrentPageInRange();
      this.recalcResponsiveWindow();
    }
  }

  private ensureCurrentPageInRange() {
    if (this.totalPages == null || this.totalPages < 1) return;
    if (this.currentPageState > this.totalPages) {
      this.currentPageState = this.totalPages;
    } else if (this.currentPageState < 1) {
      this.currentPageState = 1;
    }
  }

  private calculatePaginationSize() {
    const containerWidth = window.innerWidth;

    let totalButtons = 4; // * Botones fijos: anterior, siguiente y dos paginas (mínimo)

    const currentBlockStart = this.getBlockStart(this.currentPageState, this.paginationSize);
    const lastBlockStart = this.getBlockStart(this.totalPages, this.paginationSize);

    if (currentBlockStart === 1 && lastBlockStart !== 1) {
      totalButtons += 1; // * Añade jump button derecho
    } else if (currentBlockStart === lastBlockStart && lastBlockStart !== 1) {
      totalButtons += 1; // * Añade jump button izquierdo
    } else if (currentBlockStart !== 1 && currentBlockStart !== lastBlockStart) {
      totalButtons += 2; // * Añade ambos jump buttons
    }

    const availableWidth = containerWidth - totalButtons * this.BUTTON_WIDTH;

    const maxPagesByWidth = Math.max(Math.floor(availableWidth / this.BUTTON_WIDTH), 2);

    // Páginas visibles entre 2 y 5 y no más que totalPages
    this.paginationSize = Math.min(Math.max(2, Math.min(maxPagesByWidth, 5)), this.totalPages);
  }

  private onAthPaginate(newPage: number) {
    if (newPage !== this.currentPageState) {
      this.currentPageState = newPage;
      this.athPaginate.emit(newPage);
    }
  }

  private onAthItemsPerPageChange(newItemsPerPage: number) {
    if (newItemsPerPage !== this.selectedItemsPerPage) {
      this.selectedItemsPerPage = newItemsPerPage;
      this.recalculateTotalPages();
      // Solo emitir cambio de página si realmente cambia
      if (this.currentPageState !== 1) {
        this.currentPageState = 1;
        this.athPaginate.emit(1);
      }
      this.athItemsPerPageChange.emit(newItemsPerPage);
    }
  }

  private getBlockStart(currentPage: number, paginationSize: number): number {
    return Math.floor((currentPage - 1) / paginationSize) * paginationSize + 1;
  }

  private getPaginationBlock(blockStart: number, totalPages: number, paginationSize: number): number[] {
    const end = Math.min(blockStart + paginationSize - 1, totalPages);
    return Array.from({ length: end - blockStart + 1 }, (_, i) => blockStart + i);
  }

  private pageButtonRefs: { [pageNumber: number]: HTMLButtonElement } = {};

  private focusCurrentPageButton() {
    const btn = this.pageButtonRefs[this.currentPageState];
    if (btn?.focus) {
      btn.focus();
    }
  }

  private onPrevBlock() {
    const blockStart = this.getBlockStart(this.currentPageState, this.paginationSize);
    if (blockStart > 1) {
      const newPage = blockStart - this.paginationSize;
      this.onAthPaginate(newPage);
      setTimeout(() => this.focusCurrentPageButton(), 0);
    }
  }

  private onNextBlock() {
    const blockStart = this.getBlockStart(this.currentPageState, this.paginationSize);
    if (blockStart + this.paginationSize <= this.totalPages) {
      const newPage = blockStart + this.paginationSize;
      this.onAthPaginate(newPage);
      setTimeout(() => this.focusCurrentPageButton(), 0);
    }
  }

  private generateNavigationButtons() {
    return (
      <div class="ath-pagination-page-control">
        <ul class="ath-pagination-page-control-list">
          {!this.noEndButtons && (
            <li>
              <ath-button
                size="sm"
                color="secondary"
                icon-position="icon-only"
                icon="first"
                clear
                onAthClick={() => this.onAthPaginate(1)}
                disabled={this.disabled || this.currentPageState === 1}
                aria-label="Primera página"
              ></ath-button>
            </li>
          )}
          <li>
            <ath-button
              size="sm"
              color="secondary"
              icon-position="icon-only"
              icon="chevron_left"
              clear
              onAthClick={() => this.onAthPaginate(this.currentPageState - 1)}
              disabled={this.disabled || this.currentPageState <= 1}
              aria-label="Anterior"
            ></ath-button>
          </li>
          {!this.noJumpButtons && this.currentPageState > 1 && this.getBlockStart(this.currentPageState, this.paginationSize) > 1 && (
            <li>
              <ath-button
                size="sm"
                color="secondary"
                icon-position="icon-only"
                icon="menu_horizontal"
                clear
                onAthClick={() => this.onPrevBlock()}
                disabled={this.disabled}
                aria-label="Bloque anterior"
              ></ath-button>
            </li>
          )}

          {this.getPaginationBlock(this.getBlockStart(this.currentPageState, this.paginationSize), this.totalPages, this.paginationSize).map(page => (
            <li>
              <FcPageButton
                {...this.getPageButtonProps(page)}
                pageButtonRef={(el: HTMLButtonElement | null) => {
                  if (el) this.pageButtonRefs[page] = el;
                }}
                onClick={() => this.onAthPaginate(page)}
              />
            </li>
          ))}

          {!this.noJumpButtons &&
            this.currentPageState < this.totalPages &&
            this.getBlockStart(this.currentPageState, this.paginationSize) + this.paginationSize <= this.totalPages && (
              <li>
                <ath-button
                  size="sm"
                  color="secondary"
                  icon-position="icon-only"
                  icon="menu_horizontal"
                  clear
                  onAthClick={() => this.onNextBlock()}
                  disabled={this.disabled}
                  aria-label="Bloque siguiente"
                ></ath-button>
              </li>
            )}
          <li>
            <ath-button
              size="sm"
              color="secondary"
              icon-position="icon-only"
              icon="chevron_right"
              clear
              onAthClick={() => this.onAthPaginate(this.currentPageState + 1)}
              disabled={this.disabled || this.currentPageState === this.totalPages}
              aria-label="Siguiente"
            ></ath-button>
          </li>
          {!this.noEndButtons && (
            <li>
              <ath-button
                size="sm"
                color="secondary"
                icon-position="icon-only"
                icon="last"
                clear
                onAthClick={() => this.onAthPaginate(this.totalPages)}
                disabled={this.disabled || this.currentPageState === this.totalPages}
                aria-label="Última página"
              ></ath-button>
            </li>
          )}
        </ul>
      </div>
    );
  }

  private generateItemsCount() {
    if (!this.noItemsCount && !this.isMobileScreen) {
      return (
        <div class="ath-pagination-items-count">
          <span>
            {(this.currentPageState - 1) * this.selectedItemsPerPage + 1} - {Math.min(this.currentPageState * this.selectedItemsPerPage, this.totalItems)} de {this.totalItems}{' '}
            elementos
          </span>
        </div>
      );
    }
  }

  private generateItemsSelector() {
    if (!this.noItemsSelector && !this.isMobileScreen) {
      return (
        <div class="ath-pagination-items-selector">
          <ath-dropdown onAthChange={e => this.onItemsPerPageChange(e.detail)} disabled={this.disabled}>
            {this.itemsSelectorArray.map(items => (
              <ath-dropdown-option text={`${items} elementos por página`} value={items.toString()} selected={items === this.selectedItemsPerPage}></ath-dropdown-option>
            ))}
          </ath-dropdown>
        </div>
      );
    }
  }

  private getHostAttributes = () => {
    return {
      'aria-label': this.athAriaLabel,
    };
  };

  private generateStructure() {
    return (
      <nav class="ath-pagination" {...this.getHostAttributes()}>
        {this.generateNavigationButtons()}
        {this.generateItemsCount()}
        {this.generateItemsSelector()}
      </nav>
    );
  }

  private getPageButtonProps = (page: number): FcPageButtonType => ({
    selected: this.currentPageState === page && !this.disabled,
    disabled: this.disabled,
    pageNumber: page,
  });

  private onItemsPerPageChange(e: any) {
    const selectedItems = e;
    if (selectedItems && selectedItems.length > 0) {
      const newItemsPerPage = parseInt(selectedItems[0].value, 10);
      if (newItemsPerPage && newItemsPerPage !== this.selectedItemsPerPage) {
        this.onAthItemsPerPageChange(newItemsPerPage);
      }
    }
  }

  render() {
    return <Host>{this.generateStructure()}</Host>;
  }
}
