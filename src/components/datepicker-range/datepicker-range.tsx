import {
  Component,
  ComponentInterface,
  ComponentDidLoad,
  Host,
  Prop,
  State,
  Watch,
  h,
  Element,
  Method,
  Event,
  EventEmitter,
  ComponentWillLoad,
  AttachInternals,
} from '@stencil/core';
import { FcCalendar, FcCalendarMonth, FcCalendarYear } from 'sharedfc/datepicker';
import {
  DatepickerRangeColor,
  DatepickerRangeColors,
  DatepickerRangeFeedback,
  DatepickerRangeFeedbacks,
  DatepickerRangeFocusState,
  DatepickerRangeSize,
  DatepickerRangeSizes,
  DatepickerRangeType,
  DatepickerRangeTypes,
} from './datepicker-range.model';
import {
  addDays,
  addMonths,
  addYears,
  formatDate,
  formatDateToISO,
  formatDateToMonth,
  formatDateToString,
  formatDateToYear,
  getDateBetweenLimits,
  getMonthName,
  getSROnlyHelperText,
  getValueRangeString,
  isDisabledDate,
  monthStart,
  yearStart,
} from '@utils/date-utils';
import {
  FcButtonComp,
  FcInputElement,
  FcInputElementType,
  FcInputFeedback,
  FcInputFeedbackType,
  FcInputHelperText,
  FcInputHelperTextType,
  FcInputLabel,
  FcInputLabelType,
} from 'sharedfc/input';
import { ButtonIconPosition } from 'components/button/button.model';

let datepickerRangeSequence = 0;
let inputToSequence = 0;
let inputFromSequence = 0;

@Component({
  tag: 'ath-datepicker-range',
  styleUrl: 'datepicker-range.scss',
  shadow: true,
  formAssociated: true,
})
export class AthDatepickerRange implements ComponentInterface, ComponentDidLoad, ComponentWillLoad {
  private datepickerRangeId = `ath-datepicker-range-${datepickerRangeSequence++}`;
  private datepickerRangePopupId = `ath-datepicker-range-popup-${datepickerRangeSequence++}`;
  private datepickerRangeHintId = `${this.datepickerRangeId}-hint`;
  private datepickerRangeHintSROnlyId = `${this.datepickerRangeId}-hintSROnly`;
  private datepickerRangeFeedbackId = `${this.datepickerRangeId}-feedback`;

  private labelId: string = `${this.datepickerRangeId}-label`;

  private inputElFrom: HTMLInputElement;
  private inputFromId: string = `ath-input-from-${inputFromSequence++}`;

  private inputElTo: HTMLInputElement;
  private inputToId: string = `ath-input-to-${inputToSequence++}`;

  private returnInputFocus: boolean = false;
  private initialValue: string;

  private transitionTime = 300;

  private overlayTimeout: NodeJS.Timeout | null = null;
  private ariaLiveTimeout: NodeJS.Timeout | null = null;

  @Element() element: HTMLElement;

  @AttachInternals() internals: ElementInternals;

  /**
   * Caption of the datepicker-range
   */
  @Prop() label: string;

  /**
   * Caption of the range start of the datepicker-range
   */
  @Prop() labelStart: string;

  /**
   * Caption of the datepicker-range
   */
  @Prop() labelEnd: string;

  /**
   * Text to be shown in the tooltip
   */
  @Prop() tooltipText: string;

  /**
   * The type of the feedback. If 'error' the error feedback will be shown
   */
  @Prop() feedback: DatepickerRangeFeedback = DatepickerRangeFeedbacks.None;

  /**
   * The feedback message.
   */
  @Prop() feedbackText: string;

  /**
   * Message to help the user fills the datepicker-range.
   */
  @Prop() helperText: string;

  /**
   * Date format to be used in the datepicker-range. Only used when the type is 'date'.
   */
  @Prop() format: string = 'DD/MM/YYYY';

  /*
   * Instructional text that shows before the datepicker-range start has a value.
   */
  @Prop() placeholderStart: string;

  /*
   * Instructional text that shows before the datepicker-range end has a value.
   */
  @Prop() placeholderEnd: string;

  /**
   * The name of the datepicker-range. Submitted with the form as part of a name/value pair
   */
  @Prop() name: string;

  /**
   * If true, the user must fill in a value before submitting a form.
   */
  @Prop() required: boolean = false;

  /**
   * If true, the user must fill in a value of start range before submitting a form.
   */
  @Prop() requiredStart: boolean = false;

  /**
   * If true, the user must fill in a value of end range before submitting a form.
   */
  @Prop() requiredEnd: boolean = false;

  /**
   * If true, the * asterisk will be show when required = true.
   */
  @Prop() hideRequired: boolean = false;

  /**
   * If true, the user cannot interact with the input.
   */
  @Prop({ reflect: true }) disabled = false;
  @Watch('disabled')
  watchDisabled() {
    if (this.disabled) this.readonly = false;
  }

  /**
   * If true, the user cannot modify the value.
   */
  @Prop() readonly: boolean = false;

  /**
   * Whether the datepicker is focused on page load.
   */
  @Prop() autofocus: boolean;

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
   * The minimum date that can be selected.
   */
  @Prop() min?: string;
  @Watch('min')
  updateMin() {
    if (this.min) {
      try {
        this.minDate = new Date(this.min);
      } catch (error) {
        this.minDate = undefined;
      }
    }
  }
  private minDate: Date;

  /**
   * The maximum date that can be selected.
   */
  @Prop() max?: string;
  @Watch('max')
  updateMax() {
    if (this.max) {
      try {
        this.maxDate = new Date(this.max);
      } catch (error) {
        this.maxDate = undefined;
      }
    }
  }
  private maxDate: Date;

  /**
   * The size of the datepicker-range.
   */
  @Prop() size: DatepickerRangeSize = DatepickerRangeSizes.Medium;

  /**
   * The type of the datepicker-range.
   */
  @Prop() type: DatepickerRangeType = DatepickerRangeTypes.Date;

  /**
   * The color of the datepicker-range.
   */
  @Prop() color: DatepickerRangeColor = DatepickerRangeColors.Primary;

  /**
   * The aria-label attribute of the start input
   */
  @Prop() inputAriaLabelStart: string;

  /**
   * The aria-label attribute of the end input
   */
  @Prop() inputAriaLabelEnd: string;

  /**
   * If true, the side panel will be hidden.
   */
  @Prop() hidePanel: boolean = false;

  /**
   * If true, all the weekends will be highlighted.
   */
  @Prop() highlightedWeekends: boolean = false;

  /**
   * Current value of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  updateValue() {
    if (this.value) {
      try {
        const cleanValue = this.value.replace(/['" \[\]]/g, '');
        const parsedDates = cleanValue.split(',');
        if (parsedDates.length !== 2) {
          return;
        }
        const from = !isNaN(new Date(parsedDates[0]).getTime()) ? parsedDates[0] : undefined;
        const to = !isNaN(new Date(parsedDates[1]).getTime()) ? parsedDates[1] : undefined;

        this.valueFrom = from;
        if (from != undefined && to != undefined && from > to) {
          this.valueTo = undefined;
          console.error('Rango inválido'); // Se muestra el error por consola ya que es fallo del desarrollador
        } else {
          this.valueTo = to;
        }
      } catch (error) {
        this.valueFrom = undefined;
        this.valueTo = undefined;
        this.updateValueFrom();
        this.updateValueTo();
        this.setInputValue(this.value);
        return;
      }
    } else {
      this.valueFrom = undefined;
      this.valueTo = undefined;
    }
    this.updateValueFrom();
    this.updateValueTo();
    this.setInputValue(this.value);
  }

  /**
   * If true, submit the form when pressing Enter in the input field and the input is inside a form
   */
  @Prop() submitOnEnter = false;

  private valueDateFrom: Date;
  private valueDateTo: Date;

  /**
   * Method to set the focus on the input element
   */
  @Method()
  async setFocus() {
    if (this.inputElFrom) {
      this.inputElFrom.focus();
    }
  }

  /**
   * Method to set the focus on the second input element
   */
  @Method()
  async setFocusEnd() {
    if (this.inputElTo && this.element?.isConnected) {
      this.inputElTo.focus();
    }
  }

  /**
   * Emitted when the input gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when the input loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  /**
   * Emitted when the value has changed.
   * This event doesn't fire until the control loses focus.
   */
  @Event() athChange: EventEmitter<string>;
  // @Event() athChange: EventEmitter<{ start: string; end: string }>;

  @Watch('open')
  watchOpenState() {
    if (this.overlayTimeout !== null) {
      clearTimeout(this.overlayTimeout);
      this.overlayTimeout = null;
    }

    if (this.open) {
      this.renderOverlay = true;
      document.addEventListener('mousedown', this.handleOutsideClick);
    } else {
      this.overlayTimeout = setTimeout(() => {
        this.renderOverlay = false;
        this.overlayTimeout = null;
      }, this.transitionTime);
    }
  }

  @Watch('valueFrom')
  updateValueFrom() {
    if (this.valueFrom) {
      try {
        this.valueDateFrom = new Date(this.valueFrom);
      } catch (error) {
        this.valueDateFrom = undefined;
        return;
      }

      switch (this.type) {
        case DatepickerRangeTypes.Year:
          this.inputValueFrom = this.valueDateFrom ? formatDateToYear(this.valueDateFrom) : '';
          break;
        case DatepickerRangeTypes.Month:
          this.inputValueFrom = this.valueDateFrom ? formatDateToMonth(this.valueDateFrom) : '';
          break;
        default:
          this.inputValueFrom = this.valueDateFrom ? formatDateToString(this.valueDateFrom, this.format) : '';
          break;
      }
      if (this.inputElFrom) {
        this.inputElFrom.value = this.inputValueFrom;
      }
    } else {
      this.valueDateFrom = undefined;
      this.inputValueFrom = '';
    }
  }

  @Watch('valueTo')
  updateValueTo() {
    if (this.valueTo) {
      try {
        this.valueDateTo = new Date(this.valueTo);
      } catch (error) {
        this.valueDateTo = undefined;
        return;
      }

      switch (this.type) {
        case DatepickerRangeTypes.Year:
          this.inputValueTo = this.valueDateTo ? formatDateToYear(this.valueDateTo) : '';
          break;
        case DatepickerRangeTypes.Month:
          this.inputValueTo = this.valueDateTo ? formatDateToMonth(this.valueDateTo) : '';
          break;
        default:
          this.inputValueTo = this.valueDateTo ? formatDateToString(this.valueDateTo, this.format) : '';
          break;
      }
      if (this.inputElTo) {
        this.inputElTo.value = this.inputValueTo;
      }
    } else {
      this.valueDateTo = undefined;
      this.inputValueTo = '';
    }
  }

  disconnectedCallback() {
    if (this.ariaLiveTimeout) {
      clearTimeout(this.ariaLiveTimeout);
      this.ariaLiveTimeout = null;
    }
    if (this.overlayTimeout) {
      clearTimeout(this.overlayTimeout);
      this.overlayTimeout = null;
    }
    document.removeEventListener('mousedown', this.handleOutsideClick);
  }

  @State() open: boolean = false;
  @State() renderOverlay: boolean = false;
  @State() wrongDate: boolean = false;
  @State() feedbackWrong: string = '';
  @State() showType: DatepickerRangeType = DatepickerRangeTypes.Date;
  @State() inputValueFrom: string;
  @State() inputValueTo: string;
  @State() valueFrom: string;
  @State() valueTo: string;
  @State() shownDate: Date = new Date();
  @State() focusState: DatepickerRangeFocusState = DatepickerRangeFocusState.None;
  @State() hasFocus: boolean = false;
  @State() ariaLiveMessage: string = '';

  componentDidLoad() {
    this.initialValue = this.value;

    if (this.autofocus) {
      this.setFocus();
    }
  }

  componentWillLoad() {
    this.showType = this.type;
    this.updateMin();
    this.updateMax();
    this.updateValue();
    this.updateDisabledDates();
    this.updateHighlightedDates();
    if (this.valueDateFrom) {
      this.shownDate = this.valueDateFrom;
    }
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.updateValue();
    this.hasChanged();
  }

  private hasChanged = () => {
    this.value = getValueRangeString(this.valueFrom, this.valueTo);
    this.setInputValue(this.value);
    this.athChange.emit(this.value);
  };

  private handleDaySelect = (_event: MouseEvent, day: Date) => {
    this.returnInputFocus = true;
    this.hasFocus = false;
    if (this.focusState !== DatepickerRangeFocusState.End) {
      this.valueFrom = formatDateToISO(day);
      if (this.valueTo && this.valueDateTo < day) {
        this.valueTo = undefined;
      }
      this.setAriaLiveDateSelect(true);
      this.setFocusEnd();
    } else {
      if (this.valueDateFrom > day) {
        this.valueFrom = formatDateToISO(day);
        this.valueTo = undefined;
        this.setAriaLiveDateSelect(true);
      } else {
        this.valueTo = formatDateToISO(day);
        this.setFocusEnd();
        this.open = false;
        this.setAriaLiveDateSelect(false);
      }
    }
    this.hasChanged();

    this.shownDate = day;
    this.wrongDate = false;
    this.feedbackWrong = '';
  };

  private handleMonthSelect = (_event: MouseEvent, month: Date) => {
    if (this.type === DatepickerRangeTypes.Month) {
      this.handleDaySelect(_event, month);
      return;
    }
    this.shownDate = getDateBetweenLimits(month, this.minDate, this.maxDate);
    this.hasFocus = true;
    this.showType = DatepickerRangeTypes.Date;
    this.setAriaLiveMessage(`Mes seleccionado: ${formatDateToMonth(month)}. Vista de calendario abierta`);
  };

  private handleYearSelect = (_event: MouseEvent, year: Date) => {
    if (this.type === DatepickerRangeTypes.Year) {
      this.handleDaySelect(_event, year);
      return;
    }
    this.shownDate = getDateBetweenLimits(year, this.minDate, this.maxDate);
    this.hasFocus = true;
    this.showType = DatepickerRangeTypes.Month;
    this.setAriaLiveMessage(`Año seleccionado: ${formatDateToYear(year)}. Vista de selección de mes abierta`);
  };

  private handleClickMonth = () => {
    this.hasFocus = true;
    this.showType = DatepickerRangeTypes.Month;
    this.setAriaLiveMessage('Vista de selección de mes abierta');
  };

  private handleClickYear = () => {
    this.showType = DatepickerRangeTypes.Year;
    this.hasFocus = true;
    this.setAriaLiveMessage('Vista de selección de año abierta');
  };

  private handlePrevButton = () => {
    this.hasFocus = false;
    let navigationMessage = '';

    switch (this.showType) {
      case DatepickerRangeTypes.Date:
        this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, -1), this.minDate, this.maxDate);
        navigationMessage = `Navegando a ${getMonthName(this.shownDate)} ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerRangeTypes.Month:
        this.shownDate = getDateBetweenLimits(addYears(this.shownDate, -1), this.minDate, this.maxDate);
        navigationMessage = `Navegando al año ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerRangeTypes.Year:
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
      case DatepickerRangeTypes.Date:
        return isDisabledDate(new Date(this.shownDate.getFullYear(), this.shownDate.getMonth(), 0), [], this.minDate, this.maxDate);
      case DatepickerRangeTypes.Month:
        return isDisabledDate(new Date(this.shownDate.getFullYear(), 0, 0), [], this.minDate, this.maxDate);
      case DatepickerRangeTypes.Year:
        return isDisabledDate(addYears(new Date(this.shownDate.getFullYear(), 0, 0), -12), [], this.minDate, this.maxDate);
      default:
        return false;
    }
  };

  private handleNextButton = () => {
    this.hasFocus = false;
    let navigationMessage = '';

    switch (this.showType) {
      case DatepickerRangeTypes.Date:
        this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, 1), this.minDate, this.maxDate);
        navigationMessage = `Navegando a ${getMonthName(this.shownDate)} ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerRangeTypes.Month:
        this.shownDate = getDateBetweenLimits(addYears(this.shownDate, 1), this.minDate, this.maxDate);
        navigationMessage = `Navegando al año ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerRangeTypes.Year:
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

  private isNextButtonDisabled = () => {
    switch (this.showType) {
      case DatepickerRangeTypes.Date:
        return isDisabledDate(addMonths(monthStart(this.shownDate), 1), [], this.minDate, this.maxDate);
      case DatepickerRangeTypes.Month:
        return isDisabledDate(addYears(yearStart(this.shownDate), 1), [], this.minDate, this.maxDate);
      case DatepickerRangeTypes.Year:
        return isDisabledDate(addYears(yearStart(this.shownDate), 12), [], this.minDate, this.maxDate);
      default:
        return false;
    }
  };

  private reset = () => {
    this.value = undefined;
    this.valueFrom = undefined;
    this.valueTo = undefined;
    this.inputValueFrom = '';
    this.inputValueTo = '';
    this.valueDateFrom = undefined;
    this.valueDateTo = undefined;
    this.shownDate = new Date();
    this.showType = this.type;
    this.hasChanged();
  };

  private error = (msg: string) => {
    this.wrongDate = true;
    this.feedbackWrong = msg;
    this.reset();
    this.open = false;
  };

  private today = () => {
    this.shownDate = new Date();
    this.showType = this.type;
  };

  private lastWeek = () => {
    const from = addDays(new Date(), -7);
    this.valueFrom = formatDateToISO(from);
    this.valueTo = formatDateToISO(new Date());
    this.setAriaLiveMessage(`Rango seleccionado: ${formatDateToString(this.valueDateFrom, this.format)}-${formatDateToString(this.valueDateTo, this.format)}.`);
  };

  private isLastWeekDisabled = () => {
    const from = addDays(new Date(), -7);
    return isDisabledDate(from, this.disabledDatesAux, this.minDate, this.maxDate) || isDisabledDate(new Date(), this.disabledDatesAux, this.minDate, this.maxDate);
  };

  private lastMonth = () => {
    const from = addMonths(new Date(), -1);
    this.valueFrom = formatDateToISO(from);
    this.valueTo = formatDateToISO(new Date());
    this.setAriaLiveMessage(`Rango seleccionado: ${formatDateToString(this.valueDateFrom, this.format)}-${formatDateToString(this.valueDateTo, this.format)}.`);
  };

  private isLastMonthDisabled = () => {
    const from = this.type === DatepickerRangeTypes.Date ? addMonths(new Date(), -1) : monthStart(addMonths(new Date(), -1));
    const to = this.type === DatepickerRangeTypes.Date ? new Date() : monthStart(new Date());
    return isDisabledDate(from, this.disabledDatesAux, this.minDate, this.maxDate) || isDisabledDate(to, this.disabledDatesAux, this.minDate, this.maxDate);
  };

  private lastQuarter = () => {
    const from = addMonths(new Date(), -3);
    this.valueFrom = formatDateToISO(from);
    this.valueTo = formatDateToISO(new Date());
    this.setAriaLiveMessage(`Rango seleccionado: ${formatDateToString(this.valueDateFrom, this.format)}-${formatDateToString(this.valueDateTo, this.format)}.`);
  };

  private isLastQuarterDisabled = () => {
    const from = this.type === DatepickerRangeTypes.Date ? addMonths(new Date(), -3) : monthStart(addMonths(new Date(), -3));
    const to = this.type === DatepickerRangeTypes.Date ? new Date() : monthStart(new Date());
    return isDisabledDate(from, this.disabledDatesAux, this.minDate, this.maxDate) || isDisabledDate(to, this.disabledDatesAux, this.minDate, this.maxDate);
  };

  private lastYear = () => {
    const from = addYears(new Date(), -1);
    this.valueFrom = formatDateToISO(from);
    this.valueTo = formatDateToISO(new Date());
    this.setAriaLiveMessage(`Rango seleccionado: ${formatDateToString(this.valueDateFrom, this.format)}-${formatDateToString(this.valueDateTo, this.format)}.`);
  };

  private isLastYearDisabled = () => {
    let from;
    let to;
    switch (this.type) {
      case DatepickerRangeTypes.Date:
        from = addYears(new Date(), -1);
        to = new Date();
        break;
      case DatepickerRangeTypes.Month:
        from = monthStart(addYears(new Date(), -1));
        to = monthStart(new Date());
        break;
      case DatepickerRangeTypes.Year:
        from = yearStart(addYears(new Date(), -1));
        to = yearStart(new Date());
        break;
    }
    return isDisabledDate(from, this.disabledDatesAux, this.minDate, this.maxDate) || isDisabledDate(to, this.disabledDatesAux, this.minDate, this.maxDate);
  };

  private handleInput = (e: InputEvent, isFrom: boolean) => {
    // If this is a deletion, just update the value
    if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') {
      if (isFrom) {
        this.inputValueFrom = this.inputElFrom.value;
      } else {
        this.inputValueTo = this.inputElTo.value;
      }
      return;
    }

    if (this.type === DatepickerRangeTypes.Year) {
      this.handleInputYear(e, isFrom);
      return;
    }

    if (this.type === DatepickerRangeTypes.Month) {
      this.handleInputMonth(e, isFrom);
      return;
    }

    // Extract only digits with dynamic limit based on format
    const formatParts = this.format.split(/[^A-Za-z]/);
    const separators = this.format.match(/[^A-Za-z0-9]/g) || ['/'];

    const maxDigits = formatParts.reduce((total, part) => total + part.length, 0);
    let digits: string;
    if (isFrom) {
      digits = this.inputElFrom.value.replace(/\D/g, '').substring(0, maxDigits);
      if (separators.includes(e.data) && e.data === this.format[this.inputElFrom.value.length - 1]) {
        return;
      }
      // Block non-numeric input
      if (e.data && isNaN(Number(e.data))) {
        this.inputElFrom.value = this.inputValueFrom ?? '';
        return;
      }
    } else {
      digits = this.inputElTo.value.replace(/\D/g, '').substring(0, maxDigits);
      if (separators.includes(e.data) && e.data === this.format[this.inputElTo.value.length - 1]) {
        return;
      }
      // Block non-numeric input
      if (e.data && isNaN(Number(e.data))) {
        this.inputElTo.value = this.inputValueFrom ?? '';
        return;
      }
    }

    // Format according to the provided format property
    let formatted = '';
    if (digits.length > 0) {
      // Parse the format to determine separator positions and date part lengths

      let digitIndex = 0;
      let formattedIndex = 0;

      // Apply each part of the format (e.g., DD, MM, YYYY)
      formatParts.forEach((part, i) => {
        const partLength = part.length;

        // Extract the corresponding digits for this part
        const partDigits = digits.substring(digitIndex, digitIndex + partLength);

        // Only proceed if we have digits for this part
        if (partDigits.length > 0) {
          // Add part to formatted string
          formatted += partDigits;
          digitIndex += partDigits.length;
          formattedIndex += partDigits.length;

          // Add separator if there are more parts and we have digits for the next part
          if (i < formatParts.length - 1 && digitIndex < digits.length) {
            formatted += separators[Math.min(i, separators.length - 1)];
            formattedIndex += 1;
          }
        }
      });
    }

    if (isFrom) {
      this.inputElFrom.value = formatted;
      this.inputValueFrom = formatted;
    } else {
      this.inputElTo.value = formatted;
      this.inputValueTo = formatted;
    }
  };

  private handleInputYear = (e: InputEvent, isFrom: boolean) => {
    if (e.data && isNaN(Number(e.data))) {
      if (isFrom) {
        this.inputElFrom.value = this.inputValueFrom ?? '';
      } else {
        this.inputElTo.value = this.inputValueTo ?? '';
      }
      return;
    }
    if (isFrom && Number(this.inputElFrom.value) > 9999) {
      this.inputElFrom.value = this.inputValueFrom;
      this.inputValueFrom = this.inputElFrom.value;
    }
    if (!isFrom && Number(this.inputElTo.value) > 9999) {
      this.inputElTo.value = this.inputValueTo;
      this.inputValueTo = this.inputElTo.value;
    }

    if (isFrom) {
      this.inputValueFrom = this.inputElFrom.value;
    } else {
      this.inputValueTo = this.inputElTo.value;
    }
  };

  private handleInputMonth = (e: InputEvent, isFrom: boolean) => {
    if (isFrom) {
      if (e.data && isNaN(Number(e.data)) && e.data !== '/') {
        this.inputElFrom.value = this.inputValueFrom ?? '';
        return;
      }
      if (Number(this.inputElFrom.value) > 12) {
        this.inputElFrom.value = this.inputValueFrom.padStart(2, '0') + '/' + e.data;
      }
      if (e.data === '/') {
        if (this.inputValueFrom && this.inputValueFrom.length <= 2 && this.inputValueFrom.length > 0) {
          this.inputElFrom.value = this.inputValueFrom.padStart(2, '0') + e.data;
        } else {
          this.inputElFrom.value = this.inputValueFrom ?? '';
        }
      }

      this.inputValueFrom = this.inputElFrom.value;
    } else {
      if (e.data && isNaN(Number(e.data)) && e.data !== '/') {
        this.inputElTo.value = this.inputValueTo ?? '';
        return;
      }
      if (Number(this.inputElTo.value) > 12) {
        this.inputElTo.value = this.inputValueTo.padStart(2, '0') + '/' + e.data;
      }
      if (e.data === '/') {
        if (this.inputValueTo && this.inputValueTo.length <= 2 && this.inputValueTo.length > 0) {
          this.inputElTo.value = this.inputValueTo.padStart(2, '0') + e.data;
        } else {
          this.inputElTo.value = this.inputValueTo ?? '';
        }
      }

      this.inputValueTo = this.inputElTo.value;
    }
  };

  private handleInputFocus = (isFrom: boolean) => {
    this.focusState = isFrom ? DatepickerRangeFocusState.Start : DatepickerRangeFocusState.End;
    if (!this.returnInputFocus && !this.readonly) {
      this.open = true;
      if (isFrom) {
        this.shownDate = this.valueDateFrom ?? this.valueDateTo ?? new Date();
      } else {
        this.shownDate = this.valueDateTo ?? this.valueDateFrom ?? new Date();
      }

      this.setAriaLiveMessage('Calendario abierto. Use las teclas de flecha para navegar.');
    }
    this.returnInputFocus = false;
    this.athFocus.emit();
  };

  private handleInputBlur = () => {
    this.returnInputFocus = false;
  };

  private handleOutsideClick = (e: MouseEvent) => {
    if (!this.open) {
      this.focusState = DatepickerRangeFocusState.None;
      document.removeEventListener('mousedown', this.handleOutsideClick);
      return;
    }

    // Use composedPath to detect if the click was inside the component
    const path = e.composedPath();
    const clickedInComponent = path.includes(this.element);

    if (!clickedInComponent) {
      this.focusState = DatepickerRangeFocusState.None;
      this.open = false;
      this.returnInputFocus = false;
      this.setAriaLiveMessage('Calendario cerrado');
      this.athBlur.emit();
    }
  };

  private handleInputChange = (isFrom: boolean) => {
    this.returnInputFocus = true;
    this.hasFocus = false;
    if (isFrom && this.inputValueFrom == '') {
      this.valueFrom = undefined;
      this.hasChanged();
      return;
    }
    if (!isFrom && this.inputValueTo == '') {
      this.valueTo = undefined;
      this.hasChanged();
      return;
    }
    if (this.type === DatepickerRangeTypes.Year) {
      this.handleInputChangeYear(isFrom);
      return;
    } else if (this.type === DatepickerRangeTypes.Month) {
      this.handleInputchangeMonth(isFrom);
      return;
    }
    try {
      const result = isFrom ? formatDate(this.inputValueFrom, this.format) : formatDate(this.inputValueTo, this.format);
      if (isDisabledDate(result, this.disabledDatesAux, this.minDate, this.maxDate)) {
        this.error(this.feedbackText);
        return;
      }
      if ((isFrom && result > this.valueDateTo) || (!isFrom && result < this.valueDateFrom)) {
        this.error('La fecha de inicio debe ser anterior a la fecha de finalización.');
        return;
      }

      this.wrongDate = false;
      this.feedbackWrong = '';
      this.shownDate = result;
      if (isFrom) {
        this.valueDateFrom = result;
        this.valueFrom = formatDateToISO(result);
        this.inputElTo.focus();
      } else {
        this.valueDateTo = result;
        this.valueTo = formatDateToISO(result);
        if (this.valueFrom) {
          this.open = false;
        }
      }

      this.setAriaLiveDateSelect(isFrom);
      this.hasChanged();
    } catch (error) {
      this.error('Fecha inexistente');
      this.setAriaLiveMessage('Error: Fecha inexistente o inválida');
    }
  };

  private handleInputChangeYear = (isFrom: boolean) => {
    try {
      const result = isFrom ? new Date(Number(this.inputValueFrom), 0, 1) : new Date(Number(this.inputValueTo), 0, 1);

      if (isDisabledDate(result, this.disabledDatesAux, this.minDate, this.maxDate)) {
        this.error(this.feedbackText);
        return;
      }
      if ((isFrom && result > this.valueDateTo) || (!isFrom && result < this.valueDateFrom)) {
        this.error('La fecha de inicio debe ser anterior a la fecha de finalización.');
        return;
      }

      if (isFrom) {
        this.valueFrom = formatDateToISO(result);
      } else {
        this.valueTo = formatDateToISO(result);
        if (this.valueFrom) {
          this.open = false;
        }
      }

      this.setAriaLiveDateSelect(isFrom);
      this.hasChanged();
      this.shownDate = result;
      this.wrongDate = false;
      this.feedbackWrong = '';
    } catch (error) {
      this.error('Fecha inexistente');
      this.setAriaLiveMessage('Error: Fecha inexistente o inválida');
    }
  };

  private handleInputchangeMonth = (isFrom: boolean) => {
    const result = isFrom
      ? new Date(Number(this.inputValueFrom.split('/')[1]), Number(this.inputValueFrom.split('/')[0]) - 1, 1)
      : new Date(Number(this.inputValueTo.split('/')[1]), Number(this.inputValueTo.split('/')[0]) - 1, 1);

    if (isDisabledDate(result, this.disabledDatesAux, this.minDate, this.maxDate)) {
      this.error(this.feedbackText);
      return;
    }
    if ((isFrom && result > this.valueDateTo) || (!isFrom && result < this.valueDateFrom)) {
      this.error('La fecha de inicio debe ser anterior a la fecha de finalización.');
      return;
    }

    if (isFrom) {
      this.valueFrom = formatDateToISO(result);
    } else {
      this.valueTo = formatDateToISO(result);
      if (this.valueFrom) {
        this.open = false;
      }
    }

    this.setAriaLiveDateSelect(isFrom);
    this.hasChanged();
    this.wrongDate = false;
    this.feedbackWrong = '';
    this.shownDate = result;
  };

  private handleKeydownOverInput = (event: KeyboardEvent) => {
    if (event.code === 'ArrowDown' && !this.disabled && !this.readonly) {
      event.preventDefault();
      event.stopPropagation();
      this.setAriaLiveMessage('Calendario abierto. Use las teclas de flecha para navegar.');
      if (!this.open) {
        this.open = true;
      } else {
        const overlay = this.element.shadowRoot?.querySelector('.ath-datepicker-range-overlay');
        if (!overlay) return;
        const focusableElements = Array.from(overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
        focusableElements[0].focus();
      }
    } else if (event.code === 'Enter') {
      this.submitOnEnter && this.internals.form && this.internals.form.requestSubmit();
    } else if (event.code === 'Tab') {
      if (event.shiftKey) {
        this.open = false;
      }
      if (!this.open && ((this.focusState !== DatepickerRangeFocusState.Start && event.shiftKey) || (this.focusState === DatepickerRangeFocusState.End && !event.shiftKey))) {
        this.focusState = DatepickerRangeFocusState.None;
        this.athBlur.emit();
      }
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
      this.hasFocus = false;
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

  private handleOnExit = () => {
    this.hasFocus = false;
    this.returnInputFocus = true;
    this.setFocus();
    this.open = false;
    this.shownDate = this.valueDateFrom ?? new Date();
    this.setAriaLiveMessage('Calendario cerrado, foco devuelto al campo de entrada');
  };

  private setAriaLiveMessage = (message: string) => {
    const duration = 2000;
    if (this.ariaLiveTimeout) {
      clearTimeout(this.ariaLiveTimeout);
      this.ariaLiveTimeout = null;
    }

    this.ariaLiveMessage = message;

    this.ariaLiveTimeout = setTimeout(() => {
      this.ariaLiveMessage = '';
      this.ariaLiveTimeout = null;
    }, duration);
  };

  setAriaLiveDateSelect = (isFrom: boolean) => {
    switch (this.type) {
      case DatepickerRangeTypes.Year:
        if (isFrom) {
          this.setAriaLiveMessage(
            this.valueDateTo === undefined
              ? `Año de inicio seleccionado: ${formatDateToYear(this.valueDateFrom)}. Seleccione año de fin:`
              : `Rango seleccionado: ${formatDateToYear(this.valueDateFrom)}-${formatDateToYear(this.valueDateTo)}. Seleccione otro año si desea modificar la fecha de fin`,
          );
        } else {
          this.setAriaLiveMessage(
            this.valueDateFrom === undefined
              ? `Año de inicio sin seleccionar. Año de fin seleccionado: ${formatDateToYear(this.valueDateTo)}`
              : `Rango seleccionado: ${formatDateToYear(this.valueDateFrom)}-${formatDateToYear(this.valueDateTo)}.`,
          );
        }
        return;
      case DatepickerRangeTypes.Month:
        if (isFrom) {
          this.setAriaLiveMessage(
            this.valueDateTo === undefined
              ? `Mes de inicio seleccionado: ${formatDateToMonth(this.valueDateFrom)}. Seleccione mes de fin:`
              : `Rango seleccionado: ${formatDateToMonth(this.valueDateFrom)}-${formatDateToMonth(this.valueDateTo)}. Seleccione otro mes si desea modificar la fecha de fin`,
          );
        } else {
          this.setAriaLiveMessage(
            this.valueDateFrom === undefined
              ? `Mes de inicio sin seleccionar. Mes de fin seleccionado: ${formatDateToMonth(this.valueDateTo)}`
              : `Rango seleccionado: ${formatDateToMonth(this.valueDateFrom)}-${formatDateToMonth(this.valueDateTo)}.`,
          );
        }
        return;
      default:
        if (isFrom) {
          this.setAriaLiveMessage(
            this.valueDateTo === undefined
              ? `Fecha de inicio seleccionada: ${formatDateToString(this.valueDateFrom, this.format)}. Seleccione la fecha de fin:`
              : `Rango seleccionado: ${formatDateToString(this.valueDateFrom, this.format)}-${formatDateToString(this.valueDateTo, this.format)}. Seleccione otro día si desea modificar la fecha de fin`,
          );
        } else {
          this.setAriaLiveMessage(
            this.valueDateFrom === undefined
              ? `Fecha de inicio sin seleccionar. Fecha de fin seleccionada: ${formatDateToString(this.valueDateTo, this.format)}`
              : `Rango seleccionado: ${formatDateToString(this.valueDateFrom, this.format)}-${formatDateToString(this.valueDateTo, this.format)}.`,
          );
        }
    }
  };

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.datepickerRangeId,
    id: this.labelId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: 200,
  });

  private getMaxLength = (): number => {
    switch (this.type) {
      case DatepickerRangeTypes.Year:
        return 4;
      case DatepickerRangeTypes.Month:
        return 7; // Format: MM/YYYY
      default:
        return this.format.length;
    }
  };

  private getInputFromProps = (): FcInputElementType => ({
    inputId: this.inputFromId,
    icon: 'calendar',
    iconPosition: 'right',
    type: this.type === DatepickerRangeTypes.Year ? 'number' : 'text',
    autocomplete: 'off',
    name: this.name,
    pattern: '',
    placeholder: this.placeholderStart,
    value: this.inputValueFrom,
    required: this.required || this.requiredStart,
    disabled: this.disabled,
    readonly: !this.disabled && this.readonly,
    maxlength: this.getMaxLength(),
    inputAriaLabel: this.inputAriaLabelStart,
    hasButton: false,
    tabindex: '0',
    size: this.size,
    role: 'combobox',
    ariaExpanded: this.open,
    ariaControls: this.open ? this.datepickerRangePopupId : undefined,
    ariaHaspopup: 'grid',
    helperText: this.helperText,
    helperId: this.datepickerRangeHintId,
    helperTextSROnly: getSROnlyHelperText(),
    helperIdSROnly: this.datepickerRangeHintSROnlyId,
    feedback: this.wrongDate ? DatepickerRangeFeedbacks.Error : this.feedback,
    feedbackText: this.wrongDate ? this.feedbackWrong : this.feedbackText,
    feedbackId: this.datepickerRangeFeedbackId,
    onKeyDown: e => this.handleKeydownOverInput(e),
    onInput: e => this.handleInput(e, true),
    onFocus: () => this.handleInputFocus(true),
    onBlur: () => this.handleInputBlur(),
    onChange: () => this.handleInputChange(true),
    onInputRef: (el: HTMLInputElement) => (this.inputElFrom = el),
  });

  private getInputToProps = (): FcInputElementType => ({
    inputId: this.inputToId,
    icon: 'calendar',
    iconPosition: 'right',
    type: this.type === DatepickerRangeTypes.Year ? 'number' : 'text',
    autocomplete: 'off',
    name: this.name,
    pattern: '',
    placeholder: this.placeholderEnd,
    value: this.inputValueTo,
    required: this.required || this.requiredEnd,
    disabled: this.disabled,
    readonly: !this.disabled && this.readonly,
    maxlength: this.getMaxLength(),
    inputAriaLabel: this.inputAriaLabelEnd,
    hasButton: false,
    tabindex: '0',
    size: this.size,
    role: 'combobox',
    ariaExpanded: this.open,
    ariaControls: this.open ? this.datepickerRangePopupId : undefined,
    ariaHaspopup: 'grid',
    helperText: this.helperText,
    helperId: this.datepickerRangeHintId,
    helperTextSROnly: getSROnlyHelperText(),
    helperIdSROnly: this.datepickerRangeHintSROnlyId,
    feedback: this.wrongDate ? DatepickerRangeFeedbacks.Error : this.feedback,
    feedbackText: this.wrongDate ? this.feedbackWrong : this.feedbackText,
    feedbackId: this.datepickerRangeFeedbackId,
    onKeyDown: e => this.handleKeydownOverInput(e),
    onInput: e => this.handleInput(e, false),
    onFocus: () => this.handleInputFocus(false),
    onBlur: () => this.handleInputBlur(),
    onChange: () => this.handleInputChange(false),
    onInputRef: (el: HTMLInputElement) => (this.inputElTo = el),
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.datepickerRangeHintId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.datepickerRangeFeedbackId,
    type: this.wrongDate ? DatepickerRangeFeedbacks.Error : this.feedback,
    text: this.wrongDate ? this.feedbackWrong : this.feedbackText,
  });

  private getDialogClassNames = () => ({
    'ath-datepicker-range-overlay': true,
    [`size-${this.size}${!!this.label ? '__label' : ''}`]: true,
    'is-active': this.open,
  });

  private getInputClassNames = (isFrom: boolean) => ({
    'ath-input': true,
    'ath-focused-input': isFrom ? this.focusState === DatepickerRangeFocusState.Start : this.focusState === DatepickerRangeFocusState.End,
  });

  private getPrevButtonAriaLabel = (): string => {
    switch (this.showType) {
      case DatepickerRangeTypes.Date:
        return 'Mes anterior';
      case DatepickerRangeTypes.Month:
        return 'Año anterior';
      case DatepickerRangeTypes.Year:
        return 'Página de años anterior';
      default:
        return 'Mes anterior';
    }
  };

  private getNextButtonAriaLabel = (): string => {
    switch (this.showType) {
      case DatepickerRangeTypes.Date:
        return 'Mes siguiente';
      case DatepickerRangeTypes.Month:
        return 'Año siguiente';
      case DatepickerRangeTypes.Year:
        return 'Página de años siguiente';
      default:
        return 'Mes siguiente';
    }
  };

  private setInputValue(value: string) {
    if (this.internals && 'setFormValue' in this.internals) {
      this.internals.setFormValue(value);
      this.internals.checkValidity();
    }
  }

  private trapFocus = (e: KeyboardEvent) => {
    if (!this.open || e.key !== 'Tab') return;

    const overlay = this.element.shadowRoot?.querySelector('.ath-datepicker-range-overlay');
    if (!overlay) return;

    const focusableElements = Array.from(overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) as HTMLElement[];

    const firstElement = focusableElements[0]['disabled'] ? focusableElements[1] : focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Tab hacia atrás
      if (this.element.shadowRoot.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab hacia adelante
      if (this.element.shadowRoot.activeElement === lastElement || this.element.shadowRoot.activeElement.nodeName === 'INPUT') {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  render() {
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    const inputFromProps = this.getInputFromProps();
    const inputToProps = this.getInputToProps();

    return (
      <Host>
        <fieldset
          role="group"
          id={this.datepickerRangeId}
          name={this.name}
          aria-labelledby={!!this.label ? this.labelId : undefined}
          aria-invalid={this.wrongDate || this.feedback === DatepickerRangeFeedbacks.Error ? 'true' : undefined}
          class="ath-datepicker-range"
          onKeyDown={e => {
            if (e.key === 'Escape') {
              this.returnInputFocus = true;
              this.hasFocus = false;
              if (this.focusState === DatepickerRangeFocusState.Start) {
                this.setFocus();
              } else if (this.focusState === DatepickerRangeFocusState.End) {
                this.setFocusEnd();
              }
              this.open = false;
              e.preventDefault();
              e.stopPropagation();
            } else {
              this.trapFocus(e);
            }
          }}
        >
          <div class="wrapper">
            {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}
            <div class="ath-datepicker-range__input-group">
              <div
                class={this.getInputClassNames(true)}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.setFocus();
                }}
              >
                <FcInputLabel
                  htmlForId={this.inputFromId}
                  label={this.labelStart ?? 'Desde'}
                  required={this.required || this.requiredStart}
                  showRequired={!this.hideRequired}
                ></FcInputLabel>

                <FcInputElement {...inputFromProps} />
              </div>
              <div
                class={this.getInputClassNames(false)}
                onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.setFocusEnd();
                }}
              >
                <FcInputLabel
                  htmlForId={this.inputToId}
                  label={this.labelEnd ?? 'Hasta'}
                  required={this.required || this.requiredEnd}
                  showRequired={!this.hideRequired}
                ></FcInputLabel>
                <FcInputElement {...inputToProps} />
              </div>
            </div>
            {!!this.helperText && !this.open && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}

            <div class="sr-only" id={this.datepickerRangeHintSROnlyId}>
              <span>{getSROnlyHelperText()}</span>
            </div>

            {((this.feedback !== DatepickerRangeFeedbacks.None && !this.disabled && !this.readonly && !this.open) || this.wrongDate) && (
              <FcInputFeedback {...feedbackProps}></FcInputFeedback>
            )}
          </div>

          <div aria-live="polite" aria-atomic="true" class="sr-only" role="status">
            {this.ariaLiveMessage}
          </div>

          {this.renderOverlay && (
            <div class={this.getDialogClassNames()} id={this.datepickerRangePopupId}>
              <div class="ath-datepicker-range-calendar-date">
                <div class="ath-datepicker-range-calendar-date__header">
                  <FcButtonComp
                    size="sm"
                    color="default"
                    iconPosition={ButtonIconPosition.IconOnly}
                    icon="chevron_left"
                    onClick={this.handlePrevButton}
                    disabled={this.isPrevButtonDisabled()}
                    buttonAriaLabel={this.getPrevButtonAriaLabel()}
                  ></FcButtonComp>
                  <div class="ath-datepicker-range-calendar-date__header__date">
                    {this.showType !== 'year' && (
                      <ath-button
                        clear={true}
                        size="sm"
                        onAthClick={this.handleClickMonth}
                        onKeyDown={e => this.handleKeyDownOverButton(e, 'month')}
                        aria-label={`Cambiar a vista de selección de mes. Mes seleccionado: ${this.shownDate ? getMonthName(this.shownDate) : this.valueDateFrom ? getMonthName(this.valueDateFrom) : getMonthName(new Date())}`}
                      >
                        {this.shownDate ? getMonthName(this.shownDate) : this.valueDateFrom ? getMonthName(this.valueDateFrom) : getMonthName(new Date())}
                      </ath-button>
                    )}
                    <ath-button
                      clear={true}
                      size="sm"
                      onAthClick={this.handleClickYear}
                      onKeyDown={e => this.handleKeyDownOverButton(e, 'year')}
                      aria-label={`Cambiar a vista de selección de año. Año seleccionado: ${this.shownDate ? this.shownDate.getFullYear() : this.valueDateFrom ? this.valueDateFrom.getFullYear() : new Date().getFullYear()}`}
                    >
                      {this.shownDate ? this.shownDate.getFullYear() : this.valueDateFrom ? this.valueDateFrom.getFullYear() : new Date().getFullYear()}
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
                  <div class="ath-datepicker-range-calendar-date__date">
                    <FcCalendar
                      shownDate={this.shownDate || this.valueDateFrom || new Date()}
                      selectedRangeStart={this.valueDateFrom}
                      selectedRangeEnd={this.valueDateTo}
                      hasFocus={this.hasFocus}
                      onDateSelect={this.handleDaySelect}
                      currentDate={new Date()}
                      color={this.color}
                      disabledDate={this.disabledDatesAux}
                      highlightedDate={this.highlightedDatesAux}
                      highlightedWeekends={this.highlightedWeekends}
                      minDate={this.minDate}
                      maxDate={this.maxDate}
                      onChangeShownDate={(date: Date) => {
                        this.shownDate = date;
                        this.hasFocus = true;
                      }}
                      onExit={this.handleOnExit}
                    ></FcCalendar>
                  </div>
                )}
                {this.showType === 'month' && (
                  <div class="ath-datepicker-range-calendar-date__month">
                    <FcCalendarMonth
                      shownMonth={this.shownDate || this.valueDateFrom || new Date()}
                      selectedRangeStart={this.valueDateFrom}
                      selectedRangeEnd={this.valueDateTo}
                      hasFocus={this.hasFocus}
                      onMonthSelect={this.handleMonthSelect}
                      currentMonth={new Date()}
                      color={this.color}
                      disabledDates={this.disabledDatesAux}
                      highlightedDates={this.highlightedDatesAux}
                      minMonth={this.minDate}
                      maxMonth={this.maxDate}
                      onChangeShownMonth={(date: Date) => {
                        this.shownDate = date;
                        this.hasFocus = true;
                      }}
                      onExit={this.handleOnExit}
                    ></FcCalendarMonth>
                  </div>
                )}
                {this.showType === 'year' && (
                  <div class="ath-datepicker-range-calendar-date__year">
                    <FcCalendarYear
                      shownYear={this.shownDate || this.valueDateFrom || new Date()}
                      selectedRangeStart={this.valueDateFrom}
                      selectedRangeEnd={this.valueDateTo}
                      hasFocus={this.hasFocus}
                      onYearSelect={this.handleYearSelect}
                      currentYear={new Date()}
                      color={this.color}
                      disabledDates={this.disabledDatesAux}
                      highlightedDates={this.highlightedDatesAux}
                      minYear={this.minDate}
                      maxYear={this.maxDate}
                      onChangeShownYear={(date: Date) => {
                        this.shownDate = date;
                        this.hasFocus = true;
                      }}
                      onExit={this.handleOnExit}
                    ></FcCalendarYear>
                  </div>
                )}
              </div>
              {!this.hidePanel && (
                <div class="ath-datepicker-range-calendar-date__panel">
                  <div class="ath-datepicker-range-calendar-date__panel-shortcuts">
                    <ath-button-link onAthClick={this.today} aria-label="Ir a hoy">
                      Hoy
                    </ath-button-link>
                    {this.type === DatepickerRangeTypes.Date && (
                      <ath-button-link disabled={this.isLastWeekDisabled()} onAthClick={this.lastWeek} aria-label="Seleccionar la última semana">
                        Última semana
                      </ath-button-link>
                    )}
                    {this.type !== DatepickerRangeTypes.Year && (
                      <ath-button-link disabled={this.isLastMonthDisabled()} onAthClick={this.lastMonth} aria-label="Seleccionar el último mes">
                        Último mes
                      </ath-button-link>
                    )}
                    {this.type !== DatepickerRangeTypes.Year && (
                      <ath-button-link disabled={this.isLastQuarterDisabled()} onAthClick={this.lastQuarter} aria-label="Seleccionar el último trimestre">
                        Último trimestre
                      </ath-button-link>
                    )}
                    <ath-button-link disabled={this.isLastYearDisabled()} onAthClick={this.lastYear} aria-label="Seleccionar el último año">
                      Último año
                    </ath-button-link>
                  </div>
                  <ath-button-link onAthClick={this.reset}>Restablecer</ath-button-link>
                </div>
              )}
            </div>
          )}
        </fieldset>
      </Host>
    );
  }
}
