import { r as registerInstance, e as createEvent, h, d as Host } from './index-Bf9CG7gQ.js';
import { B as ButtonIconPosition } from './button.model-Cy_pPkIg.js';
import { F as FcButtonComp } from './index-8mh0qKYc.js';
import { f as formatDateToString, g as getDateBetweenLimits, a as formatDateToMonth, b as formatDateToYear, c as addYears, d as addMonths, e as getMonthName, i as isDisabledDate, y as yearStart, m as monthStart, F as FcCalendar, h as FcCalendarMonth, j as FcCalendarYear } from './index-DDO3GhOW.js';
import './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './icon.model-D_uLkZWw.js';

const CalendarTypes = {
    Date: 'date',
    Month: 'month',
    Year: 'year',
};
const CalendarColors = {
    Primary: 'primary',
    Accent: 'accent',
};

const calendarCss = ".ath-visibility-hidden,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host .ath-input__field--size-sm{--input-padding-x:var(--ath-spacing-input-field-padding-x-sm);--input-padding-y:var(--ath-spacing-input-field-padding-y-sm)}:host .ath-input__field--size-md{--input-padding-x:var(--ath-spacing-input-field-padding-x-md);--input-padding-y:var(--ath-spacing-input-field-padding-y-md)}:host .ath-input__field--size-lg{--input-padding-x:var(--ath-spacing-input-field-padding-x-lg);--input-padding-y:var(--ath-spacing-input-field-padding-y-lg)}:host .ath-button_comp--size-xs{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-sm{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-md{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-lg{--button-padding:var(--ath-spacing-button-padding-around-sm)}:host .ath-datepicker-item{display:flex;flex-direction:column;justify-content:center;align-items:center;flex:1 0 0;border-radius:var(--ath-border-radius-input-datepicker-cell);user-select:none;cursor:pointer;text-align:center;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-comp-md);color:var(--ath-color-input-datepicker-option-fg-default)}:host .ath-datepicker-item.is-day{width:40px;height:40px}:host .ath-datepicker-item.is-month{width:64px;height:48px}:host .ath-datepicker-item.is-year{width:68px;height:48px}:host .ath-datepicker-item:focus-visible{outline:none}:host .ath-datepicker-item:focus-visible .ath-datepicker-item-content{box-shadow:0 0 0 2px var(--ath-color-border-focus);border:1px solid var(--ath-color-border-inverse-focus)}:host .ath-datepicker-item:focus-visible:hover .ath-datepicker-item-content,:host .ath-datepicker-item:focus-visible:active .ath-datepicker-item-content,:host .ath-datepicker-item:focus-visible.is-selected .ath-datepicker-item-content{box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}:host .ath-datepicker-item.is-start{border-radius:var(--ath-border-radius-input-datepicker-cell) 0 0 var(--ath-border-radius-input-datepicker-cell);background:var(--ath-color-input-datepicker-option-bg-primary-selected-range-default)}:host .ath-datepicker-item.is-middle{border-radius:0}:host .ath-datepicker-item.is-middle::before{content:\"\";position:absolute;z-index:-1;background:var(--ath-color-input-datepicker-option-bg-primary-selected-range-default)}:host .ath-datepicker-item.is-middle.is-day::before{width:42px;height:42px}:host .ath-datepicker-item.is-middle.is-month::before{width:66px;height:50px}:host .ath-datepicker-item.is-middle.is-year::before{width:70px;height:50px}:host .ath-datepicker-item.is-end{border-radius:0 var(--ath-border-radius-input-datepicker-cell) var(--ath-border-radius-input-datepicker-cell) 0;z-index:-1;background:var(--ath-color-input-datepicker-option-bg-primary-selected-range-default)}:host .ath-datepicker-item.is-start.is-accent{background:var(--ath-color-input-datepicker-option-bg-accent-selected-range-default)}:host .ath-datepicker-item.is-middle.is-accent::before{background:var(--ath-color-input-datepicker-option-bg-accent-selected-range-default)}:host .ath-datepicker-item.is-end.is-accent{z-index:-1;background:var(--ath-color-input-datepicker-option-bg-accent-selected-range-default)}:host .ath-datepicker-item .ath-datepicker-item-content{width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-input-datepicker-cell)}.ath-datepicker-item.is-day :host .ath-datepicker-item .ath-datepicker-item-content{padding:var(--ath-spacing-input-datepicker-calendar-cell-padding-date)}.ath-datepicker-item.is-month :host .ath-datepicker-item .ath-datepicker-item-content{padding:var(--ath-spacing-input-datepicker-calendar-cell-padding-month)}.ath-datepicker-item.is-year :host .ath-datepicker-item .ath-datepicker-item-content{padding:var(--ath-spacing-input-datepicker-calendar-cell-padding-year)}:host .ath-datepicker-item .ath-datepicker-item-content:hover{background:var(--ath-color-bg-alpha-hovered)}:host .ath-datepicker-item .ath-datepicker-item-content.is-highlighted{color:var(--ath-color-fg-accent-default)}:host .ath-datepicker-item .ath-datepicker-item-content.is-highlighted:hover{color:var(--ath-color-fg-accent-hovered)}:host .ath-datepicker-item .ath-datepicker-item-content.is-highlighted:active{color:var(--ath-color-fg-accent-pressed)}:host .ath-datepicker-item .ath-datepicker-item-content.is-other-month{color:var(--ath-color-fg-disabled)}:host .ath-datepicker-item .ath-datepicker-item-content:active{background:var(--ath-color-bg-alpha-pressed)}:host .ath-datepicker-item .ath-datepicker-item-content.is-current{outline:2px solid var(--ath-color-input-datepicker-option-border-primary-current);outline-offset:1px}:host .ath-datepicker-item .ath-datepicker-item-content.is-selected{background:var(--ath-color-input-datepicker-option-bg-primary-selected-default);color:var(--ath-color-input-datepicker-option-fg-selected-hovered)}:host .ath-datepicker-item .ath-datepicker-item-content.is-selected:hover{color:var(--ath-color-input-datepicker-option-fg-selected-hovered);background:var(--ath-color-input-datepicker-option-bg-primary-selected-hovered)}:host .ath-datepicker-item .ath-datepicker-item-content.is-selected:active{color:var(--ath-color-input-datepicker-option-fg-selected-hovered);background:var(--ath-color-input-datepicker-option-bg-primary-selected-pressed)}:host .ath-datepicker-item .ath-datepicker-item-content.is-current.is-accent{outline:2px solid var(--ath-color-input-datepicker-option-border-accent-current);outline-offset:1px}:host .ath-datepicker-item .ath-datepicker-item-content.is-selected.is-accent{background:var(--ath-color-input-datepicker-option-bg-accent-selected-default)}:host .ath-datepicker-item .ath-datepicker-item-content.is-selected.is-accent:hover{background:var(--ath-color-input-datepicker-option-bg-accent-selected-hovered)}:host .ath-datepicker-item .ath-datepicker-item-content.is-selected.is-accent:active{background:var(--ath-color-input-datepicker-option-bg-accent-selected-pressed)}:host .ath-datepicker-item .ath-datepicker-item-content.is-disabled{cursor:not-allowed;color:var(--ath-color-fg-disabled);background:transparent}:host .fc-calendar{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap);align-self:stretch}:host .fc-calendar__header-week{display:flex;align-items:center;align-self:stretch}:host .fc-calendar__header-week__day{display:flex;padding:8px;flex-direction:column;text-align:center;flex:1 0 0;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-overline);font-size:var(--ath-font-size-overline);font-style:normal;font-weight:var(--ath-font-weight-overline);line-height:var(--ath-font-line-height-overline)}:host .fc-calendar__body-week{display:flex;flex-direction:column;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap)}:host .fc-calendar__row-days{justify-content:space-around;display:flex;align-items:center;align-self:stretch}:host .fc-calendar .w-full{width:100%}:host .fc-calendar-month{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap);width:200px;height:192px;min-width:200px;justify-content:center;align-items:center;justify-items:center}:host .fc-calendar-month__rows{display:flex;flex-direction:column;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap)}:host .fc-calendar-month__row-months{justify-content:space-around;display:flex;align-items:center;align-self:stretch}:host .fc-calendar-year{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap);width:200px;height:192px;min-width:200px;justify-content:center;align-items:center;justify-items:center}:host .fc-calendar-year__rows{display:flex;flex-direction:column;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap)}:host .fc-calendar-year__row-years{justify-content:space-around;display:flex;align-items:center;align-self:stretch}.ath-input .ath-input__field{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:var(--ath-spacing-input-field-col-gap);align-self:stretch;border:1px solid var(--ath-color-input-border-default);border-radius:var(--input-border-radius);background:var(--ath-color-input-bg-default);padding:calc(var(--input-padding-y) - 1px) calc(var(--input-padding-x) - 1px)}.ath-input .ath-input__field:focus-within:not(:has(>button:focus)){box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset;border:1px solid transparent;border-radius:var(--input-border-radius)}.ath-input .ath-input__field--error{border-color:var(--ath-color-border-danger-default)}.ath-input .ath-input__field--success{border-color:var(--ath-color-border-success-default)}.ath-input .ath-input__field--warning{border-color:var(--ath-color-border-warning-default)}.ath-input .ath-input__field--readonly{border:1px solid transparent;position:relative;background:none}.ath-input .ath-input__field--readonly::after{content:\"\";position:absolute;bottom:1px;width:100%;height:1px;background-color:var(--ath-color-input-border-default)}.ath-input .ath-input__field--readonly{border-radius:var(--ath-border-radius-input-readonly)}.ath-input .ath-input__field--readonly:focus-within{border:1px solid transparent}.ath-input .ath-input__field--readonly:focus-within::after{background-color:transparent}.ath-input .ath-input__field--readonly .ath-input__text--value{color:var(--ath-color-fg-default)}.ath-input .ath-input__field--disabled{background:var(--ath-color-bg-alpha-disabled);border-color:var(--ath-color-border-alpha-disabled)}.ath-input__text--value{flex:1 0 0;overflow:hidden;color:var(--ath-color-fg-default);text-overflow:ellipsis;font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-regular);font-size:var(--ath-font-size-input-text);line-height:var(--ath-font-line-height-input-text);border:none;width:100%;background-color:transparent;padding:0px var(--ath-spacing-input-text-padding-x)}.ath-input__text--value:focus{outline:1px solid transparent;border:none}.ath-input--unit{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-text);font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-input-text)}.ath-input--unit--disabled{color:var(--ath-color-fg-disabled)}input[type=password]::-ms-reveal,input[type=password]::-ms-clear{display:none}input::-webkit-outer-spin-button,input::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}input[type=number]{-moz-appearance:textfield;appearance:textfield}.ath-visibility-hidden{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.ath-button_comp{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.ath-button_comp:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.ath-button_comp:hover{background:var(--ath-color-bg-alpha-hovered)}.ath-button_comp:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.ath-button_comp--disabled{pointer-events:none;color:var(--ath-color-button-icon-disabled)}:host .ath-calendar{display:flex;border-radius:var(--ath-border-radius-input-datepicker-overlay);width:288px;flex-direction:column;align-items:center;gap:var(--ath-spacing-input-datepicker-calendar-overlay-row-gap)}:host .ath-calendar__header{display:flex;justify-content:center;align-items:center;gap:var(--ath-spacing-input-datepicker-calendar-header-col-gap);align-self:stretch}:host .ath-calendar__header__date{display:flex;justify-content:center;align-items:center;gap:var(--ath-spacing-input-datepicker-calendar-header-date-col-gap);flex:1 0 0}:host .ath-calendar__date{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap);align-self:stretch}:host .ath-calendar__month,:host .ath-calendar__year{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:var(--ath-spacing-input-datepicker-calendar-cell-group-row-gap);align-self:stretch;height:286px}";

const AthCalendar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChange = createEvent(this, "athChange", 7);
    }
    /**
     * The color of the Calendar.
     */
    color = CalendarColors.Primary;
    /**
     * The type of the Calendar.
     */
    type = CalendarTypes.Date;
    /**
     * List of days which are shown as disabled.
     */
    disabledDates;
    updateDisabledDates() {
        this.disabledDatesAux = [];
        try {
            const parsedDates = JSON.parse(this.disabledDates.replace(/'/g, '"'));
            parsedDates.forEach(element => {
                const parsedDate = typeof element === 'string' ? new Date(element) : element;
                if (!isNaN(parsedDate.getTime())) {
                    this.disabledDatesAux.push(parsedDate);
                }
            });
        }
        catch (error) {
            this.disabledDatesAux = [];
        }
    }
    disabledDatesAux;
    /**
     * List of days which are shown as highlighted.
     */
    highlightedDates;
    updateHighlightedDates() {
        this.highlightedDatesAux = [];
        try {
            const parsedDates = JSON.parse(this.highlightedDates.replace(/'/g, '"'));
            parsedDates.forEach(element => {
                const parsedDate = typeof element === 'string' ? new Date(element) : element;
                if (!isNaN(parsedDate.getTime())) {
                    this.highlightedDatesAux.push(parsedDate);
                }
            });
        }
        catch (error) {
            this.highlightedDatesAux = [];
        }
    }
    highlightedDatesAux;
    /**
     * If true, all the weekends will be highlighted.
     */
    highlightedWeekends = false;
    /**
     * The minimum date that can be selected.
     */
    min;
    updateMin() {
        if (this.min || !isNaN(new Date(this.min).getTime())) {
            try {
                this.minDate = new Date(this.min);
            }
            catch (error) {
                this.minDate = undefined;
            }
        }
        else {
            this.minDate = undefined;
        }
    }
    minDate;
    /**
     * The maximum date that can be selected.
     */
    max;
    updateMax() {
        if (this.max || !isNaN(new Date(this.max).getTime())) {
            try {
                this.maxDate = new Date(this.max);
            }
            catch (error) {
                this.maxDate = undefined;
            }
        }
        else {
            this.maxDate = undefined;
        }
    }
    maxDate;
    selected;
    updateSelected() {
        if (this.selected && !isNaN(new Date(this.selected).getTime())) {
            try {
                this.selectedDate = new Date(this.selected);
                this.athChange.emit(this.selected);
            }
            catch (error) {
                this.selectedDate = undefined;
                this.athChange.emit(undefined);
                return;
            }
        }
        else {
            this.selectedDate = undefined;
            this.athChange.emit(undefined);
        }
    }
    selectedDate;
    /**
     * Emitted when the value has changed.
     * This event doesn't fire until the control loses focus.
     */
    athChange;
    showType = CalendarTypes.Date;
    shownDate = new Date();
    ariaLiveMessage = '';
    componentWillLoad() {
        this.showType = this.type;
        this.updateMin();
        this.updateMax();
        if (this.selected && !isNaN(new Date(this.selected).getTime())) {
            try {
                this.selectedDate = new Date(this.selected);
            }
            catch (error) {
                this.selectedDate = undefined;
            }
        }
        else {
            this.selectedDate = undefined;
        }
        this.updateDisabledDates();
        this.updateHighlightedDates();
        if (this.selectedDate) {
            this.shownDate = this.selectedDate;
        }
    }
    handleClickMonth = () => {
        this.showType = CalendarTypes.Month;
        this.setAriaLiveMessage('Vista de selección de mes abierta');
    };
    handleClickYear = () => {
        this.showType = CalendarTypes.Year;
        this.setAriaLiveMessage('Vista de selección de año abierta');
    };
    handleDaySelect = (_event, day) => {
        this.selected = day.toISOString();
        this.shownDate = day;
        this.setAriaLiveMessage(`Fecha seleccionada: ${formatDateToString(day, 'DD/MM/YYYY')}`);
    };
    handleMonthSelect = (_event, month) => {
        if (this.type === CalendarTypes.Month) {
            this.selected = month.toISOString();
            this.shownDate = month;
            return;
        }
        this.shownDate = getDateBetweenLimits(month, this.minDate, this.maxDate);
        this.showType = CalendarTypes.Date;
        this.setAriaLiveMessage(`Mes seleccionado: ${formatDateToMonth(month)}. Vista de calendario abierta`);
    };
    handleYearSelect = (_event, year) => {
        if (this.type === CalendarTypes.Year) {
            this.selected = year.toISOString();
            this.shownDate = year;
            this.setAriaLiveMessage(`Año seleccionado: ${formatDateToYear(year)}`);
            return;
        }
        this.shownDate = getDateBetweenLimits(year, this.minDate, this.maxDate);
        this.showType = CalendarTypes.Month;
        this.setAriaLiveMessage(`Año seleccionado: ${formatDateToYear(year)}. Vista de selección de mes abierta`);
    };
    handlePrevButton = () => {
        let navigationMessage = '';
        switch (this.showType) {
            case CalendarTypes.Date:
                this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, -1), this.minDate, this.maxDate);
                navigationMessage = `Navegando a ${getMonthName(this.shownDate)} ${this.shownDate.getFullYear()}`;
                break;
            case CalendarTypes.Month:
                this.shownDate = getDateBetweenLimits(addYears(this.shownDate, -1), this.minDate, this.maxDate);
                navigationMessage = `Navegando al año ${this.shownDate.getFullYear()}`;
                break;
            case CalendarTypes.Year:
                this.shownDate = getDateBetweenLimits(addYears(this.shownDate, -12), this.minDate, this.maxDate);
                navigationMessage = `Navegando a la página que contiene los años ${this.shownDate.getFullYear() - (this.shownDate.getFullYear() % 10)} - ${this.shownDate.getFullYear() - (this.shownDate.getFullYear() % 10) + 9}`;
                break;
            default:
                break;
        }
        if (navigationMessage) {
            this.setAriaLiveMessage(navigationMessage);
        }
    };
    isPrevButtonDisabled = () => {
        switch (this.showType) {
            case CalendarTypes.Date:
                return isDisabledDate(new Date(this.shownDate.getFullYear(), this.shownDate.getMonth(), 0), [], this.minDate, this.maxDate);
            case CalendarTypes.Month:
                return isDisabledDate(new Date(this.shownDate.getFullYear(), 0, 0), [], this.minDate, this.maxDate);
            case CalendarTypes.Year:
                return isDisabledDate(addYears(new Date(this.shownDate.getFullYear(), 0, 0), -12), [], this.minDate, this.maxDate);
            default:
                return false;
        }
    };
    handleNextButton = () => {
        let navigationMessage = '';
        switch (this.showType) {
            case CalendarTypes.Date:
                this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, 1), this.minDate, this.maxDate);
                navigationMessage = `Navegando a ${getMonthName(this.shownDate)} ${this.shownDate.getFullYear()}`;
                break;
            case CalendarTypes.Month:
                this.shownDate = getDateBetweenLimits(addYears(this.shownDate, 1), this.minDate, this.maxDate);
                navigationMessage = `Navegando al año ${this.shownDate.getFullYear()}`;
                break;
            case CalendarTypes.Year:
                this.shownDate = getDateBetweenLimits(addYears(this.shownDate, 12), this.minDate, this.maxDate);
                navigationMessage = `Navegando a la página que contiene los años ${this.shownDate.getFullYear() - (this.shownDate.getFullYear() % 10)} - ${this.shownDate.getFullYear() - (this.shownDate.getFullYear() % 10) + 9}`;
                break;
            default:
                break;
        }
        if (navigationMessage) {
            this.setAriaLiveMessage(navigationMessage);
        }
    };
    getPrevButtonAriaLabel = () => {
        switch (this.showType) {
            case CalendarTypes.Date:
                return 'Mes anterior';
            case CalendarTypes.Month:
                return 'Año anterior';
            case CalendarTypes.Year:
                return 'Página de años anterior';
            default:
                return 'Mes anterior';
        }
    };
    isNextButtonDisabled = () => {
        switch (this.showType) {
            case CalendarTypes.Date:
                return isDisabledDate(addMonths(monthStart(this.shownDate), 1), [], this.minDate, this.maxDate);
            case CalendarTypes.Month:
                return isDisabledDate(addYears(yearStart(this.shownDate), 1), [], this.minDate, this.maxDate);
            case CalendarTypes.Year:
                return isDisabledDate(addYears(yearStart(this.shownDate), 12), [], this.minDate, this.maxDate);
            default:
                return false;
        }
    };
    getNextButtonAriaLabel = () => {
        switch (this.showType) {
            case CalendarTypes.Date:
                return 'Mes siguiente';
            case CalendarTypes.Month:
                return 'Año siguiente';
            case CalendarTypes.Year:
                return 'Página de años siguiente';
            default:
                return 'Mes siguiente';
        }
    };
    handleKeyDownOverButton = (key, type) => {
        let variation = 0;
        switch (key.code) {
            case 'ArrowDown':
            case 'ArrowRight':
                key.stopPropagation();
                key.preventDefault();
                variation = 1;
                break;
            case 'ArrowUp':
            case 'ArrowLeft':
                key.stopPropagation();
                key.preventDefault();
                variation = -1;
                break;
            case 'PageUp':
                key.stopPropagation();
                key.preventDefault();
                variation = -12;
                break;
            case 'PageDown':
                key.stopPropagation();
                key.preventDefault();
                variation = 12;
                break;
        }
        if (variation !== 0) {
            switch (type) {
                case 'year':
                    this.shownDate = getDateBetweenLimits(addYears(this.shownDate, variation), this.minDate, this.maxDate);
                    break;
                case 'month':
                    this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, variation), this.minDate, this.maxDate);
                    break;
            }
        }
    };
    setAriaLiveMessage = (message) => {
        this.ariaLiveMessage = message;
        setTimeout(() => (this.ariaLiveMessage = ''), 2000);
    };
    render() {
        return (h(Host, { key: '4aa81609e806b4ed8b81d69fae4995b4113f6eff' }, h("div", { key: '476a9d76fbafa8729d0aa55bd3614a91868ad3c1', class: "ath-calendar" }, h("div", { key: 'b5b8b8b9ddb1fae9022d13f6ddc3753bf5eb58f5', "aria-live": "polite", "aria-atomic": "true", class: "sr-only", role: "status" }, this.ariaLiveMessage), h("div", { key: 'fae9d0fada76accece68dedefff2a95d097861ab', class: "ath-calendar__header" }, h(FcButtonComp, { key: '221e0885fb8fe50132eec8e936f1bd8424491f43', size: "sm", color: "default", iconPosition: ButtonIconPosition.IconOnly, icon: "chevron_left", disabled: this.isPrevButtonDisabled(), onClick: this.handlePrevButton, buttonAriaLabel: this.getPrevButtonAriaLabel() }), h("div", { key: 'a4262613603bdd28b2072aabc77a21a7d9d87c09', class: "ath-calendar__header__date" }, this.showType !== 'year' && (h("ath-button", { key: 'c99da96878e3820ca062d85f295dbd3b4fdb35e9', clear: true, size: "sm", onAthClick: this.handleClickMonth, onKeyDown: e => this.handleKeyDownOverButton(e, 'month'), "aria-label": `Cambiar a vista de selección de mes. Mes seleccionado: ${this.shownDate ? getMonthName(this.shownDate) : this.selectedDate ? getMonthName(this.selectedDate) : getMonthName(new Date())}` }, this.shownDate ? getMonthName(this.shownDate) : this.selectedDate ? getMonthName(this.selectedDate) : getMonthName(new Date()))), h("ath-button", { key: 'ca37a96decf31ffd596bb2695430e08375808587', clear: true, size: "sm", onAthClick: this.handleClickYear, onKeyDown: e => this.handleKeyDownOverButton(e, 'year'), "aria-label": `Cambiar a vista de selección de año. Año seleccionado: ${this.shownDate ? this.shownDate.getFullYear() : this.selectedDate ? this.selectedDate.getFullYear() : new Date().getFullYear()}` }, this.shownDate ? this.shownDate.getFullYear() : this.selectedDate ? this.selectedDate.getFullYear() : new Date().getFullYear())), h(FcButtonComp, { key: '76399969aec63780a94e44f7d926cb694b5d788d', size: "sm", color: "default", iconPosition: ButtonIconPosition.IconOnly, icon: "chevron_right", disabled: this.isNextButtonDisabled(), onClick: this.handleNextButton, buttonAriaLabel: this.getNextButtonAriaLabel() })), this.showType === 'date' && (h("div", { key: '81a0d1eb52a8f57c8b3a1a0c6dc963ff6aaad03c', class: "ath-calendar__date" }, h(FcCalendar, { key: 'bf0fa5a13608012dadc48313c1c6520e531d5ff7', shownDate: this.shownDate || this.selectedDate || new Date(), selectedDate: this.selectedDate, onDateSelect: this.handleDaySelect, currentDate: new Date(), color: this.color, hasFocus: true, disabledDate: this.disabledDatesAux, highlightedDate: this.highlightedDatesAux, highlightedWeekends: this.highlightedWeekends, minDate: this.minDate, maxDate: this.maxDate, onChangeShownDate: (date) => {
                this.shownDate = date;
            } }))), this.showType === 'month' && (h("div", { key: '4f24cd92a729dddb83c2586980be7e51542ed8f3', class: "ath-calendar__month" }, h(FcCalendarMonth, { key: '6482efb2bb6f774ff35e512e57582a78e067c05c', shownMonth: this.shownDate || this.selectedDate || new Date(), selectedMonth: this.selectedDate, onMonthSelect: this.handleMonthSelect, currentMonth: new Date(), color: this.color, hasFocus: true, disabledDates: this.disabledDatesAux, highlightedDates: this.highlightedDatesAux, minMonth: this.minDate, maxMonth: this.maxDate, onChangeShownMonth: (date) => {
                this.shownDate = date;
            } }))), this.showType === 'year' && (h("div", { key: '289ceb683d4fdfcec9a86a08cb33737436e13f74', class: "ath-calendar__year" }, h(FcCalendarYear, { key: '457e531accb088b93ed0bb3673b70ef4a39f980e', shownYear: this.shownDate || this.selectedDate || new Date(), selectedYear: this.selectedDate, onYearSelect: this.handleYearSelect, currentYear: new Date(), color: this.color, hasFocus: true, disabledDates: this.disabledDatesAux, highlightedDates: this.highlightedDatesAux, minYear: this.minDate, maxYear: this.maxDate, onChangeShownYear: (date) => {
                this.shownDate = date;
            } }))))));
    }
    static get watchers() { return {
        "disabledDates": ["updateDisabledDates"],
        "highlightedDates": ["updateHighlightedDates"],
        "min": ["updateMin"],
        "max": ["updateMax"],
        "selected": ["updateSelected"]
    }; }
};
AthCalendar.style = calendarCss;

export { AthCalendar as ath_calendar };
//# sourceMappingURL=ath-calendar.entry.esm.js.map
