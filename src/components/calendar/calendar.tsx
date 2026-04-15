import { Component, ComponentInterface, ComponentWillLoad, Event, EventEmitter, Host, Prop, State, Watch, h } from '@stencil/core';
import { ButtonIconPosition } from 'components/button/button.model';
import { FcButtonComp } from 'sharedfc/input';
import { CalendarColor, CalendarColors, CalendarType, CalendarTypes } from './calendar.model';
import {
  addMonths,
  addYears,
  formatDateToMonth,
  formatDateToString,
  formatDateToYear,
  getDateBetweenLimits,
  getMonthName,
  isDisabledDate,
  monthStart,
  yearStart,
} from '@utils/date-utils';
import { FcCalendar, FcCalendarMonth, FcCalendarYear } from 'sharedfc/datepicker';

@Component({
  tag: 'ath-calendar',
  styleUrl: 'calendar.scss',
  shadow: true,
})
export class AthCalendar implements ComponentInterface, ComponentWillLoad {
  /**
   * The color of the Calendar.
   */
  @Prop() color: CalendarColor = CalendarColors.Primary;
  /**
   * The type of the Calendar.
   */
  @Prop() type: CalendarType = CalendarTypes.Date;

  /**
   * List of days which are shown as disabled.
   */
  @Prop() disabledDates: string;
  @Watch('disabledDates')
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
    } catch (error) {
      this.disabledDatesAux = [];
    }
  }
  private disabledDatesAux: Date[];
  /**
   * List of days which are shown as highlighted.
   */
  @Prop() highlightedDates: string;
  @Watch('highlightedDates')
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
    } catch (error) {
      this.highlightedDatesAux = [];
    }
  }
  private highlightedDatesAux: Date[];
  /**
   * If true, all the weekends will be highlighted.
   */
  @Prop() highlightedWeekends: boolean = false;

  /**
   * The minimum date that can be selected.
   */
  @Prop() min?: string;
  @Watch('min')
  updateMin() {
    if (this.min || !isNaN(new Date(this.min).getTime())) {
      try {
        this.minDate = new Date(this.min);
      } catch (error) {
        this.minDate = undefined;
      }
    } else {
      this.minDate = undefined;
    }
  }
  private minDate: Date;

  /**
   * The maximum date that can be selected.
   */
  @Prop() max?: string;
  @Watch('max')
  updateMax() {
    if (this.max || !isNaN(new Date(this.max).getTime())) {
      try {
        this.maxDate = new Date(this.max);
      } catch (error) {
        this.maxDate = undefined;
      }
    } else {
      this.maxDate = undefined;
    }
  }
  private maxDate: Date;

  @Prop({ mutable: true }) selected?: string;
  @Watch('selected')
  updateSelected() {
    if (this.selected && !isNaN(new Date(this.selected).getTime())) {
      try {
        this.selectedDate = new Date(this.selected);
        this.athChange.emit(this.selected);
      } catch (error) {
        this.selectedDate = undefined;
        this.athChange.emit(undefined);
        return;
      }
    } else {
      this.selectedDate = undefined;
      this.athChange.emit(undefined);
    }
  }
  private selectedDate: Date;

  /**
   * Emitted when the value has changed.
   * This event doesn't fire until the control loses focus.
   */
  @Event() athChange: EventEmitter<string>;

  @State() showType: CalendarType = CalendarTypes.Date;
  @State() shownDate: Date = new Date();
  @State() ariaLiveMessage: string = '';

  componentWillLoad() {
    this.showType = this.type;
    this.updateMin();
    this.updateMax();
    if (this.selected && !isNaN(new Date(this.selected).getTime())) {
      try {
        this.selectedDate = new Date(this.selected);
      } catch (error) {
        this.selectedDate = undefined;
      }
    } else {
      this.selectedDate = undefined;
    }

    this.updateDisabledDates();
    this.updateHighlightedDates();
    if (this.selectedDate) {
      this.shownDate = this.selectedDate;
    }
  }

  private handleClickMonth = () => {
    this.showType = CalendarTypes.Month;
    this.setAriaLiveMessage('Vista de selección de mes abierta');
  };

  private handleClickYear = () => {
    this.showType = CalendarTypes.Year;
    this.setAriaLiveMessage('Vista de selección de año abierta');
  };

  private handleDaySelect = (_event: MouseEvent, day: Date) => {
    this.selected = day.toISOString();
    this.shownDate = day;
    this.setAriaLiveMessage(`Fecha seleccionada: ${formatDateToString(day, 'DD/MM/YYYY')}`);
  };

  private handleMonthSelect = (_event: MouseEvent, month: Date) => {
    if (this.type === CalendarTypes.Month) {
      this.selected = month.toISOString();
      this.shownDate = month;
      return;
    }
    this.shownDate = getDateBetweenLimits(month, this.minDate, this.maxDate);
    this.showType = CalendarTypes.Date;
    this.setAriaLiveMessage(`Mes seleccionado: ${formatDateToMonth(month)}. Vista de calendario abierta`);
  };

  private handleYearSelect = (_event: MouseEvent, year: Date) => {
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

  private handlePrevButton = () => {
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

  private isPrevButtonDisabled = () => {
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

  private handleNextButton = () => {
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

  private getPrevButtonAriaLabel = (): string => {
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

  private isNextButtonDisabled = () => {
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

  private getNextButtonAriaLabel = (): string => {
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

  private handleKeyDownOverButton = (key: KeyboardEvent, type: string) => {
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

  private setAriaLiveMessage = (message: string) => {
    this.ariaLiveMessage = message;
    setTimeout(() => (this.ariaLiveMessage = ''), 2000);
  };

  render() {
    return (
      <Host>
        <div class="ath-calendar">
          <div aria-live="polite" aria-atomic="true" class="sr-only" role="status">
            {this.ariaLiveMessage}
          </div>
          <div class="ath-calendar__header">
            <FcButtonComp
              size="sm"
              color="default"
              iconPosition={ButtonIconPosition.IconOnly}
              icon="chevron_left"
              disabled={this.isPrevButtonDisabled()}
              onClick={this.handlePrevButton}
              buttonAriaLabel={this.getPrevButtonAriaLabel()}
            ></FcButtonComp>
            <div class="ath-calendar__header__date">
              {this.showType !== 'year' && (
                <ath-button
                  clear={true}
                  size="sm"
                  onAthClick={this.handleClickMonth}
                  onKeyDown={e => this.handleKeyDownOverButton(e, 'month')}
                  aria-label={`Cambiar a vista de selección de mes. Mes seleccionado: ${this.shownDate ? getMonthName(this.shownDate) : this.selectedDate ? getMonthName(this.selectedDate) : getMonthName(new Date())}`}
                >
                  {this.shownDate ? getMonthName(this.shownDate) : this.selectedDate ? getMonthName(this.selectedDate) : getMonthName(new Date())}
                </ath-button>
              )}
              <ath-button
                clear={true}
                size="sm"
                onAthClick={this.handleClickYear}
                onKeyDown={e => this.handleKeyDownOverButton(e, 'year')}
                aria-label={`Cambiar a vista de selección de año. Año seleccionado: ${this.shownDate ? this.shownDate.getFullYear() : this.selectedDate ? this.selectedDate.getFullYear() : new Date().getFullYear()}`}
              >
                {this.shownDate ? this.shownDate.getFullYear() : this.selectedDate ? this.selectedDate.getFullYear() : new Date().getFullYear()}
              </ath-button>
            </div>
            <FcButtonComp
              size="sm"
              color="default"
              iconPosition={ButtonIconPosition.IconOnly}
              icon="chevron_right"
              disabled={this.isNextButtonDisabled()}
              onClick={this.handleNextButton}
              buttonAriaLabel={this.getNextButtonAriaLabel()}
            ></FcButtonComp>
          </div>
          {this.showType === 'date' && (
            <div class="ath-calendar__date">
              <FcCalendar
                shownDate={this.shownDate || this.selectedDate || new Date()}
                selectedDate={this.selectedDate}
                onDateSelect={this.handleDaySelect}
                currentDate={new Date()}
                color={this.color}
                hasFocus={true}
                disabledDate={this.disabledDatesAux}
                highlightedDate={this.highlightedDatesAux}
                highlightedWeekends={this.highlightedWeekends}
                minDate={this.minDate}
                maxDate={this.maxDate}
                onChangeShownDate={(date: Date) => {
                  this.shownDate = date;
                }}
              ></FcCalendar>
            </div>
          )}
          {this.showType === 'month' && (
            <div class="ath-calendar__month">
              <FcCalendarMonth
                shownMonth={this.shownDate || this.selectedDate || new Date()}
                selectedMonth={this.selectedDate}
                onMonthSelect={this.handleMonthSelect}
                currentMonth={new Date()}
                color={this.color}
                hasFocus={true}
                disabledDates={this.disabledDatesAux}
                highlightedDates={this.highlightedDatesAux}
                minMonth={this.minDate}
                maxMonth={this.maxDate}
                onChangeShownMonth={(date: Date) => {
                  this.shownDate = date;
                }}
              ></FcCalendarMonth>
            </div>
          )}
          {this.showType === 'year' && (
            <div class="ath-calendar__year">
              <FcCalendarYear
                shownYear={this.shownDate || this.selectedDate || new Date()}
                selectedYear={this.selectedDate}
                onYearSelect={this.handleYearSelect}
                currentYear={new Date()}
                color={this.color}
                hasFocus={true}
                disabledDates={this.disabledDatesAux}
                highlightedDates={this.highlightedDatesAux}
                minYear={this.minDate}
                maxYear={this.maxDate}
                onChangeShownYear={(date: Date) => {
                  this.shownDate = date;
                }}
              ></FcCalendarYear>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
