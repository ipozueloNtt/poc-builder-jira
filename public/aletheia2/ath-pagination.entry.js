import { h, r as registerInstance, e as createEvent, d as Host } from './index-Bf9CG7gQ.js';

const FcPageButton = props => {
    const getPageButtonClass = () => {
        return {
            'ath-pagination-page-button': true,
            ...(props.selected && { 'ath-pagination-page-button--selected': true }),
            ...(props.disabled && { 'ath-pagination-page-button--disabled': true }),
        };
    };
    const handleClick = () => {
        if (!props.disabled && props.onClick) {
            props.onClick();
        }
    };
    return (h("button", { ref: props.pageButtonRef, class: { ...getPageButtonClass() }, onClick: handleClick, "aria-label": `Página ${props.pageNumber}`, disabled: props.disabled, "aria-disabled": props.disabled ? 'true' : 'false', "aria-current": props.selected ? 'page' : undefined }, h("span", { class: "ath-pagination-page-button-number" }, props.pageNumber)));
};

const paginationCss = ".sc-ath-pagination-h .ath-pagination-page-button.sc-ath-pagination{display:flex;padding:var(--ath-spacing-pagination-page-button-padding-y) var(--ath-spacing-pagination-page-button-padding-x);justify-content:center;align-items:center;border:none;border-radius:var(--ath-border-radius-pagination-page-button);background:var(--ath-color-pagination-page-button-bg-default)}.sc-ath-pagination-h .ath-pagination-page-button-number.sc-ath-pagination{color:var(--ath-color-pagination-page-button-fg-default);text-align:center;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-comp-md);font-style:normal;font-weight:var(--ath-font-weight-medium);line-height:var(--ath-font-line-height-comp-sm);min-width:20px}.sc-ath-pagination-h .ath-pagination-page-button--disabled.sc-ath-pagination{cursor:not-allowed}.sc-ath-pagination-h .ath-pagination-page-button--disabled.sc-ath-pagination .ath-pagination-page-button-number.sc-ath-pagination{background:var(--ath-color-pagination-page-button-bg-default);color:var(--ath-color-fg-disabled)}.sc-ath-pagination-h .ath-pagination-page-button.sc-ath-pagination:hover{background:var(--ath-color-pagination-page-button-bg-hovered)}.sc-ath-pagination-h .ath-pagination-page-button.sc-ath-pagination:hover .ath-pagination-page-button-number.sc-ath-pagination{color:var(--ath-color-pagination-page-button-fg-hovered)}.sc-ath-pagination-h .ath-pagination-page-button.ath-pagination-page-button--disabled.sc-ath-pagination:hover{background:var(--ath-color-pagination-page-button-bg-default)}.sc-ath-pagination-h .ath-pagination-page-button.ath-pagination-page-button--disabled.sc-ath-pagination:hover .ath-pagination-page-button-number.sc-ath-pagination{color:var(--ath-color-fg-disabled)}.sc-ath-pagination-h .ath-pagination-page-button.sc-ath-pagination:active{background:var(--ath-color-pagination-page-button-bg-pressed)}.sc-ath-pagination-h .ath-pagination-page-button.sc-ath-pagination:active .ath-pagination-page-button-number.sc-ath-pagination{color:var(--ath-color-pagination-page-button-fg-pressed)}.sc-ath-pagination-h .ath-pagination-page-button.sc-ath-pagination:focus-visible:not(.ath-pagination-page-button--selected){outline:none;box-shadow:0 0 0 2px var(--ath-color-border-focus)}.sc-ath-pagination-h .ath-pagination-page-button--selected.sc-ath-pagination{background:var(--ath-color-pagination-page-button-bg-selected)}.sc-ath-pagination-h .ath-pagination-page-button--selected.sc-ath-pagination:focus-visible{box-shadow:0 0 0 2px var(--ath-color-drop-shadow-focus), 0 0 0 4px var(--ath-color-border-focus);outline:none}.sc-ath-pagination-h .ath-pagination-page-button--selected.sc-ath-pagination .ath-pagination-page-button-number.sc-ath-pagination{color:var(--ath-color-pagination-page-button-fg-selected)}.ath-pagination.sc-ath-pagination{display:inline-flex;align-items:center;gap:var(--ath-spacing-pagination-col-gap)}.ath-pagination-page-control.sc-ath-pagination{display:flex;align-items:center}.ath-pagination-page-control-list.sc-ath-pagination{display:flex;flex-direction:row;align-items:center;gap:var(--ath-spacing-pagination-page-control-col-gap);list-style:none;padding:0;margin:0}.ath-pagination-items-count.sc-ath-pagination{color:var(--ath-color-fg-subtle);font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.ath-pagination-items-selector.sc-ath-pagination{display:flex;flex-direction:column;align-items:flex-start}";

const AthPagination = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athPaginate = createEvent(this, "athPaginate", 7);
        this.athItemsPerPageChange = createEvent(this, "athItemsPerPageChange", 7);
    }
    BUTTON_WIDTH = 32 + 8; // Suma button + gap
    MOBILE_BREAKPOINT = 768;
    DEFAULT_ITEMS_SELECTOR = [5, 10, 15];
    /**
     * Hide the buttons to navigate to the first and last pages.
     */
    noEndButtons = false;
    /**
     * Hide the buttons to jump to the previous or next pages.
     */
    noJumpButtons = false;
    /**
     * Determines whether the item count message is displayed in the pagination.
     */
    noItemsCount = false;
    /**
     * Determines whether a dropdown is shown to select the number of items per page.
     */
    noItemsSelector = false;
    /**
     * Defines the selectable options for the number of items of the dropdown.
     */
    itemsSelector = '[5, 10, 15]';
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
        }
        catch (error) {
            console.error('Error parsing itemsSelector:', error);
            this.itemsSelectorArray = this.DEFAULT_ITEMS_SELECTOR;
        }
    }
    itemsSelectorArray = [];
    /**
     * Defines the number of items displayed per page in the pagination.
     */
    itemsPerPage;
    selectedItemsPerPage;
    /**
     * Current active page number in the pagination.
     */
    currentPage = 1;
    currentPageState;
    /**
     * Total number of items over all pages.
     */
    totalItems;
    /**
     * Total number of available pages (calculated internally).
     */
    totalPages = 1;
    /**
     * Determines whether the Pagination is disabled.
     */
    disabled = false;
    /**
     * ARIA label for the pagination component.
     */
    athAriaLabel = 'Paginación de resultados';
    /**
     * Event emitted when the page changes.
     * Emits the new page number as detail.
     */
    athPaginate;
    /**
     * Event emitted when the items per page changes.
     * Emits the new items per page as detail.
     */
    athItemsPerPageChange;
    paginationSize = 5;
    onTotalItemsChange() {
        this.recalculateTotalPages();
    }
    onItemsPerPageChangeWatch() {
        this.recalculateTotalPages();
    }
    onCurrentPageExternalChange() {
        this.ensureCurrentPageInRange();
        this.recalcResponsiveWindow();
    }
    onItemsPerPageExternalChange(newValue) {
        if (newValue !== this.selectedItemsPerPage) {
            this.selectedItemsPerPage = newValue;
            this.recalculateTotalPages();
        }
    }
    isMobileScreen = false;
    onResize() {
        this.isMobileScreen = window.innerWidth < this.MOBILE_BREAKPOINT;
        this.calculatePaginationSize();
    }
    componentWillLoad() {
        // Inicializar states desde props
        this.updateItemsSelector();
        this.selectedItemsPerPage = this.itemsPerPage ?? this.itemsSelectorArray[0] ?? 5;
        this.currentPageState = this.currentPage;
        if (typeof window !== 'undefined') {
            this.isMobileScreen = window.innerWidth < this.MOBILE_BREAKPOINT;
        }
    }
    componentDidLoad() {
        this.calculatePaginationSize();
        this.recalculateTotalPages(); // inicial
        this.ensureCurrentPageInRange();
    }
    recalcResponsiveWindow() {
        if (typeof window !== 'undefined' && window.innerWidth < this.MOBILE_BREAKPOINT) {
            this.calculatePaginationSize();
        }
    }
    recalculateTotalPages() {
        if (this.totalItems != null && this.selectedItemsPerPage) {
            const computed = Math.max(1, Math.ceil(this.totalItems / this.selectedItemsPerPage));
            if (computed !== this.totalPages) {
                this.totalPages = computed;
            }
            this.ensureCurrentPageInRange();
            this.recalcResponsiveWindow();
        }
    }
    ensureCurrentPageInRange() {
        if (this.totalPages == null || this.totalPages < 1)
            return;
        if (this.currentPageState > this.totalPages) {
            this.currentPageState = this.totalPages;
        }
        else if (this.currentPageState < 1) {
            this.currentPageState = 1;
        }
    }
    calculatePaginationSize() {
        const containerWidth = window.innerWidth;
        let totalButtons = 4; // * Botones fijos: anterior, siguiente y dos paginas (mínimo)
        const currentBlockStart = this.getBlockStart(this.currentPageState, this.paginationSize);
        const lastBlockStart = this.getBlockStart(this.totalPages, this.paginationSize);
        if (currentBlockStart === 1 && lastBlockStart !== 1) {
            totalButtons += 1; // * Añade jump button derecho
        }
        else if (currentBlockStart === lastBlockStart && lastBlockStart !== 1) {
            totalButtons += 1; // * Añade jump button izquierdo
        }
        else if (currentBlockStart !== 1 && currentBlockStart !== lastBlockStart) {
            totalButtons += 2; // * Añade ambos jump buttons
        }
        const availableWidth = containerWidth - totalButtons * this.BUTTON_WIDTH;
        const maxPagesByWidth = Math.max(Math.floor(availableWidth / this.BUTTON_WIDTH), 2);
        // Páginas visibles entre 2 y 5 y no más que totalPages
        this.paginationSize = Math.min(Math.max(2, Math.min(maxPagesByWidth, 5)), this.totalPages);
    }
    onAthPaginate(newPage) {
        if (newPage !== this.currentPageState) {
            this.currentPageState = newPage;
            this.athPaginate.emit(newPage);
        }
    }
    onAthItemsPerPageChange(newItemsPerPage) {
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
    getBlockStart(currentPage, paginationSize) {
        return Math.floor((currentPage - 1) / paginationSize) * paginationSize + 1;
    }
    getPaginationBlock(blockStart, totalPages, paginationSize) {
        const end = Math.min(blockStart + paginationSize - 1, totalPages);
        return Array.from({ length: end - blockStart + 1 }, (_, i) => blockStart + i);
    }
    pageButtonRefs = {};
    focusCurrentPageButton() {
        const btn = this.pageButtonRefs[this.currentPageState];
        if (btn?.focus) {
            btn.focus();
        }
    }
    onPrevBlock() {
        const blockStart = this.getBlockStart(this.currentPageState, this.paginationSize);
        if (blockStart > 1) {
            const newPage = blockStart - this.paginationSize;
            this.onAthPaginate(newPage);
            setTimeout(() => this.focusCurrentPageButton(), 0);
        }
    }
    onNextBlock() {
        const blockStart = this.getBlockStart(this.currentPageState, this.paginationSize);
        if (blockStart + this.paginationSize <= this.totalPages) {
            const newPage = blockStart + this.paginationSize;
            this.onAthPaginate(newPage);
            setTimeout(() => this.focusCurrentPageButton(), 0);
        }
    }
    generateNavigationButtons() {
        return (h("div", { class: "ath-pagination-page-control" }, h("ul", { class: "ath-pagination-page-control-list" }, !this.noEndButtons && (h("li", null, h("ath-button", { size: "sm", color: "secondary", "icon-position": "icon-only", icon: "first", clear: true, onAthClick: () => this.onAthPaginate(1), disabled: this.disabled || this.currentPageState === 1, "aria-label": "Primera p\u00E1gina" }))), h("li", null, h("ath-button", { size: "sm", color: "secondary", "icon-position": "icon-only", icon: "chevron_left", clear: true, onAthClick: () => this.onAthPaginate(this.currentPageState - 1), disabled: this.disabled || this.currentPageState <= 1, "aria-label": "Anterior" })), !this.noJumpButtons && this.currentPageState > 1 && this.getBlockStart(this.currentPageState, this.paginationSize) > 1 && (h("li", null, h("ath-button", { size: "sm", color: "secondary", "icon-position": "icon-only", icon: "menu_horizontal", clear: true, onAthClick: () => this.onPrevBlock(), disabled: this.disabled, "aria-label": "Bloque anterior" }))), this.getPaginationBlock(this.getBlockStart(this.currentPageState, this.paginationSize), this.totalPages, this.paginationSize).map(page => (h("li", null, h(FcPageButton, { ...this.getPageButtonProps(page), pageButtonRef: (el) => {
                if (el)
                    this.pageButtonRefs[page] = el;
            }, onClick: () => this.onAthPaginate(page) })))), !this.noJumpButtons &&
            this.currentPageState < this.totalPages &&
            this.getBlockStart(this.currentPageState, this.paginationSize) + this.paginationSize <= this.totalPages && (h("li", null, h("ath-button", { size: "sm", color: "secondary", "icon-position": "icon-only", icon: "menu_horizontal", clear: true, onAthClick: () => this.onNextBlock(), disabled: this.disabled, "aria-label": "Bloque siguiente" }))), h("li", null, h("ath-button", { size: "sm", color: "secondary", "icon-position": "icon-only", icon: "chevron_right", clear: true, onAthClick: () => this.onAthPaginate(this.currentPageState + 1), disabled: this.disabled || this.currentPageState === this.totalPages, "aria-label": "Siguiente" })), !this.noEndButtons && (h("li", null, h("ath-button", { size: "sm", color: "secondary", "icon-position": "icon-only", icon: "last", clear: true, onAthClick: () => this.onAthPaginate(this.totalPages), disabled: this.disabled || this.currentPageState === this.totalPages, "aria-label": "\u00DAltima p\u00E1gina" }))))));
    }
    generateItemsCount() {
        if (!this.noItemsCount && !this.isMobileScreen) {
            return (h("div", { class: "ath-pagination-items-count" }, h("span", null, (this.currentPageState - 1) * this.selectedItemsPerPage + 1, " - ", Math.min(this.currentPageState * this.selectedItemsPerPage, this.totalItems), " de ", this.totalItems, ' ', "elementos")));
        }
    }
    generateItemsSelector() {
        if (!this.noItemsSelector && !this.isMobileScreen) {
            return (h("div", { class: "ath-pagination-items-selector" }, h("ath-dropdown", { onAthChange: e => this.onItemsPerPageChange(e.detail), disabled: this.disabled }, this.itemsSelectorArray.map(items => (h("ath-dropdown-option", { text: `${items} elementos por página`, value: items.toString(), selected: items === this.selectedItemsPerPage }))))));
        }
    }
    getHostAttributes = () => {
        return {
            'aria-label': this.athAriaLabel,
        };
    };
    generateStructure() {
        return (h("nav", { class: "ath-pagination", ...this.getHostAttributes() }, this.generateNavigationButtons(), this.generateItemsCount(), this.generateItemsSelector()));
    }
    getPageButtonProps = (page) => ({
        selected: this.currentPageState === page && !this.disabled,
        disabled: this.disabled,
        pageNumber: page,
    });
    onItemsPerPageChange(e) {
        const selectedItems = e;
        if (selectedItems && selectedItems.length > 0) {
            const newItemsPerPage = parseInt(selectedItems[0].value, 10);
            if (newItemsPerPage && newItemsPerPage !== this.selectedItemsPerPage) {
                this.onAthItemsPerPageChange(newItemsPerPage);
            }
        }
    }
    render() {
        return h(Host, { key: '6cd9a598c5a58eca58d9760848b8ae0890f2a0e6' }, this.generateStructure());
    }
    static get watchers() { return {
        "itemsSelector": ["updateItemsSelector"],
        "totalItems": ["onTotalItemsChange"],
        "selectedItemsPerPage": ["onItemsPerPageChangeWatch"],
        "currentPageState": ["onCurrentPageExternalChange"],
        "itemsPerPage": ["onItemsPerPageExternalChange"]
    }; }
};
AthPagination.style = paginationCss;

export { AthPagination as ath_pagination };
//# sourceMappingURL=ath-pagination.entry.esm.js.map
