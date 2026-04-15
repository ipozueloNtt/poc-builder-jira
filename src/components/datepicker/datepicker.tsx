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
import { DatepickerColor, DatepickerColors, DatepickerFeedback, DatepickerFeedbacks, DatepickerSize, DatepickerSizes, DatepickerType, DatepickerTypes } from './datepicker.model';
import {
  addMonths,
  addYears,
  formatDate,
  formatDateToMonth,
  formatDateToString,
  formatDateToYear,
  getDateBetweenLimits,
  getMonthName,
  getSROnlyHelperText,
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

let inputSequence = 0;

@Component({
  tag: 'ath-datepicker',
  styleUrl: 'datepicker.scss',
  shadow: true,
  formAssociated: true,
})
export class AthDatepicker implements ComponentInterface, ComponentDidLoad, ComponentWillLoad {
  private inputId = `ath-input-${inputSequence++}`;
  private datepickerpopupId = `datepicker-popup-${inputSequence++}`;
  private inputHintId: string;
  private inputHintSROnlyId: string;
  private inputFeedbackId: string;
  private inputEl: HTMLInputElement;
  private returnInputFocus: boolean = false;
  private initialValue: string;
  private transitionTime = 300;
  private overlayTimeout: NodeJS.Timeout | null = null;
  private dateResetTimeout: NodeJS.Timeout | null = null;

  @Element() element: HTMLElement;

  @AttachInternals() internals: ElementInternals;

  /**
   * Caption of the datepicker
   */
  @Prop() label: string;

  /**
   * Text to be shown in the tooltip
   */
  @Prop() tooltipText: string;

  /**
   * The type of the feedback. If 'error' the error feedback will be shown
   */
  @Prop() feedback: DatepickerFeedback = DatepickerFeedbacks.None;

  /**
   * The feedback message.
   */
  @Prop() feedbackText: string;

  /**
   * Message to help the user fills the datepicker.
   */
  @Prop() helperText: string;

  /**
   * Date format to be used in the datepicker. Only used when the type is 'date'.
   */
  @Prop() format: string = 'DD/MM/YYYY';

  /*
   * Instructional text that shows before the datepicker has a value.
   */
  @Prop() placeholder: string;

  /**
   * The name of the datepicker. Submitted with the form as part of a name/value pair
   */
  @Prop() name: string;

  /**
   * If true, the user must fill in a value before submitting a form.
   */
  @Prop() required: boolean = false;

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
   * If true, all the weekends will be highlighted.
   */
  @Prop() highlightedWeekends: boolean = false;

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
   * The size of the datepicker.
   */
  @Prop() size: DatepickerSize = DatepickerSizes.Medium;

  /**
   * The type of the datepicker.
   */
  @Prop() type: DatepickerType = DatepickerTypes.Date;

  /**
   * The color of the datepicker.
   */
  @Prop() color: DatepickerColor = DatepickerColors.Primary;

  /**
   * The aria-label attribute of the input
   */
  @Prop() inputAriaLabel: string;

  /**
   * Current value of the form control. Submitted with the form as part of a name/value pair.
   */
  @Prop({ mutable: true }) value: string;
  @Watch('value')
  updateValue() {
    if (this.value) {
      try {
        this.valueDate = new Date(this.value);
      } catch (error) {
        this.valueDate = undefined;
        return;
      }

      this.setInputValue(this.value);

      switch (this.type) {
        case DatepickerTypes.Year:
          this.inputValue = this.valueDate ? formatDateToYear(this.valueDate) : '';
          break;
        case DatepickerTypes.Month:
          this.inputValue = this.valueDate ? formatDateToMonth(this.valueDate) : '';
          break;
        default:
          this.inputValue = this.valueDate ? formatDateToString(this.valueDate, this.format) : '';
          break;
      }
      if (this.inputEl) {
        this.inputEl.value = this.inputValue;
      }
    } else {
      this.valueDate = undefined;
      this.setInputValue(undefined);
      this.inputValue = '';
    }
  }

  /**
   * If true, submit the form when pressing Enter in the input field and the input is inside a form
   */
  @Prop() submitOnEnter = false;

  private valueDate: Date;

  /**
   * Method to set the focus on the input element
   */
  @Method()
  async setFocus() {
    if (this.inputEl) {
      this.inputEl.focus();
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

  /**
   * Emitted every time the value is updated by introducing a change
   */
  @Event() athInput: EventEmitter<string>;

  @Watch('open')
  watchOpenState() {
    // Clear any existing timeout to prevent conflicts
    if (this.overlayTimeout !== null) {
      clearTimeout(this.overlayTimeout);
      this.overlayTimeout = null;
    }

    if (this.open) {
      this.renderOverlay = true;
      setTimeout(() => {
        document.addEventListener('mousedown', this.handleOutsideClick);
      }, 0);
    } else {
      this.overlayTimeout = setTimeout(() => {
        this.renderOverlay = false;
        this.overlayTimeout = null;
      }, this.transitionTime);
      document.removeEventListener('mousedown', this.handleOutsideClick);
    }
  }

  disconnectedCallback() {
    document.removeEventListener('mousedown', this.handleOutsideClick);

    clearTimeout(this.overlayTimeout);
    clearTimeout(this.dateResetTimeout);
  }

  @State() open: boolean = false;
  @State() renderOverlay: boolean = false;
  @State() wrongDate: boolean = false;
  @State() feedbackWrong: string = '';
  @State() showType: DatepickerType = DatepickerTypes.Date;
  @State() inputValue: string;
  @State() shownDate: Date = new Date();
  @State() hasFocus: boolean = false;
  @State() ariaLiveMessage: string = '';

  componentDidLoad() {
    this.inputHintId = `${this.inputId}-hint`;
    this.inputHintSROnlyId = `${this.inputId}-hintSROnly`;
    this.inputFeedbackId = `${this.inputId}-feedback`;
    this.initialValue = this.value;

    this.setInputValue(this.value);

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
    if (this.valueDate) {
      this.shownDate = this.valueDate;
    }
  }

  formResetCallback() {
    this.value = this.initialValue;
    this.updateValue();
    this.athChange.emit(this.value);
  }

  private handleDaySelect = (_event: MouseEvent, day: Date) => {
    this.returnInputFocus = true;
    this.hasFocus = false;
    this.value = day.toISOString();
    this.athChange.emit(this.value);

    this.shownDate = day;
    this.inputValue = formatDateToString(day, this.format);
    this.open = false;
    this.wrongDate = false;
    this.feedbackWrong = '';

    this.setAriaLiveMessage(`Fecha seleccionada: ${formatDateToString(day, this.format)}`);

    this.setFocus();
  };

  private handleMonthSelect = (_event: MouseEvent, month: Date) => {
    if (this.type === DatepickerTypes.Month) {
      this.returnInputFocus = true;
      this.hasFocus = false;
      this.value = month.toISOString();
      this.athChange.emit(this.value);

      this.shownDate = month;
      this.inputValue = formatDateToMonth(month);
      this.open = false;
      this.wrongDate = false;
      this.feedbackWrong = '';
      this.setAriaLiveMessage(`Mes seleccionado: ${formatDateToMonth(month)}`);
      this.setFocus();
      return;
    }
    this.shownDate = getDateBetweenLimits(month, this.minDate, this.maxDate);
    this.hasFocus = true;
    this.showType = DatepickerTypes.Date;
    this.setAriaLiveMessage(`Mes seleccionado: ${formatDateToMonth(month)}. Vista de calendario abierta`);
  };

  private handleYearSelect = (_event: MouseEvent, year: Date) => {
    if (this.type === DatepickerTypes.Year) {
      this.returnInputFocus = true;
      this.hasFocus = false;
      this.value = year.toISOString();
      this.athChange.emit(this.value);

      this.shownDate = year;
      this.inputValue = formatDateToYear(year);
      this.open = false;
      this.wrongDate = false;
      this.feedbackWrong = '';
      this.setAriaLiveMessage(`Año seleccionado: ${formatDateToYear(year)}`);
      this.setFocus();
      return;
    }
    this.shownDate = getDateBetweenLimits(year, this.minDate, this.maxDate);
    this.hasFocus = true;
    this.showType = DatepickerTypes.Month;
    this.setAriaLiveMessage(`Año seleccionado: ${formatDateToYear(year)}. Vista de selección de mes abierta`);
  };

  private handleClickMonth = () => {
    this.hasFocus = true;
    this.showType = DatepickerTypes.Month;
    this.setAriaLiveMessage('Vista de selección de mes abierta');
  };

  private handleClickYear = () => {
    this.showType = DatepickerTypes.Year;
    this.hasFocus = true;
    this.setAriaLiveMessage('Vista de selección de año abierta');
  };

  private handlePrevButton = () => {
    this.hasFocus = false;
    let navigationMessage = '';

    switch (this.showType) {
      case DatepickerTypes.Date:
        this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, -1), this.minDate, this.maxDate);
        navigationMessage = `Navegando a ${getMonthName(this.shownDate)} ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerTypes.Month:
        this.shownDate = getDateBetweenLimits(addYears(this.shownDate, -1), this.minDate, this.maxDate);
        navigationMessage = `Navegando al año ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerTypes.Year:
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
      case DatepickerTypes.Date:
        return isDisabledDate(new Date(this.shownDate.getFullYear(), this.shownDate.getMonth(), 0), [], this.minDate, this.maxDate);
      case DatepickerTypes.Month:
        return isDisabledDate(new Date(this.shownDate.getFullYear(), 0, 0), [], this.minDate, this.maxDate);
      case DatepickerTypes.Year:
        return isDisabledDate(addYears(new Date(this.shownDate.getFullYear(), 0, 0), -12), [], this.minDate, this.maxDate);
      default:
        return false;
    }
  };

  private handleNextButton = () => {
    this.hasFocus = false;
    let navigationMessage = '';

    switch (this.showType) {
      case DatepickerTypes.Date:
        this.shownDate = getDateBetweenLimits(addMonths(this.shownDate, 1), this.minDate, this.maxDate);
        navigationMessage = `Navegando a ${getMonthName(this.shownDate)} ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerTypes.Month:
        this.shownDate = getDateBetweenLimits(addYears(this.shownDate, 1), this.minDate, this.maxDate);
        navigationMessage = `Navegando al año ${this.shownDate.getFullYear()}`;
        break;
      case DatepickerTypes.Year:
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
      case DatepickerTypes.Date:
        return isDisabledDate(addMonths(monthStart(this.shownDate), 1), [], this.minDate, this.maxDate);
      case DatepickerTypes.Month:
        return isDisabledDate(addYears(yearStart(this.shownDate), 1), [], this.minDate, this.maxDate);
      case DatepickerTypes.Year:
        return isDisabledDate(addYears(yearStart(this.shownDate), 12), [], this.minDate, this.maxDate);
      default:
        return false;
    }
  };

  private reset = () => {
    this.value = undefined;
    this.inputValue = '';
    this.shownDate = new Date();
    this.showType = this.type;
    this.athChange.emit(this.value);
  };

  private handleInput = (e: InputEvent) => {
    // If this is a deletion, just update the value
    if (e.inputType === 'deleteContentBackward' || e.inputType === 'deleteContentForward') {
      this.inputValue = this.inputEl.value;
      this.athInput.emit(this.inputEl.value);
      return;
    }

    if (this.type === DatepickerTypes.Year) {
      this.handleInputYear(e);
      return;
    }

    if (this.type === DatepickerTypes.Month) {
      this.handleInputMonth(e);
      return;
    }

    // Extract only digits with dynamic limit based on format
    const formatParts = this.format.split(/[^A-Za-z]/);
    const separators = this.format.match(/[^A-Za-z0-9]/g) || ['/'];

    const maxDigits = formatParts.reduce((total, part) => total + part.length, 0);
    const digits = this.inputEl.value.replace(/\D/g, '').substring(0, maxDigits);

    if (separators.includes(e.data) && e.data === this.format[this.inputEl.value.length - 1]) {
      this.athInput.emit(this.inputEl.value);
      return;
    }

    // Block non-numeric input
    if (e.data && isNaN(Number(e.data))) {
      this.inputEl.value = this.inputValue ?? '';

      this.athInput.emit(this.inputEl.value);
      return;
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

    this.inputEl.value = formatted;
    this.inputValue = formatted;
    this.athInput.emit(this.inputEl.value);
  };

  private handleInputYear = (e: InputEvent) => {
    if (e.data && isNaN(Number(e.data))) {
      this.inputEl.value = this.inputValue ?? '';

      this.athInput.emit(this.inputEl.value);
      return;
    }
    if (Number(this.inputEl.value) > 9999) {
      this.inputEl.value = this.inputValue;
    }
    this.inputValue = this.inputEl.value;
    this.athInput.emit(this.inputEl.value);
  };

  private handleInputMonth = (e: InputEvent) => {
    if (e.data && isNaN(Number(e.data)) && e.data !== '/') {
      this.inputEl.value = this.inputValue ?? '';

      this.athInput.emit(this.inputEl.value);
      return;
    }
    if (Number(this.inputEl.value) > 12) {
      this.inputEl.value = this.inputValue.padStart(2, '0') + '/' + e.data;
    }
    if (e.data === '/') {
      if (this.inputValue && this.inputValue.length <= 2 && this.inputValue.length > 0) {
        this.inputEl.value = this.inputValue.padStart(2, '0') + e.data;
      } else {
        this.inputEl.value = this.inputValue ?? '';

        this.athInput.emit(this.inputEl.value);
      }
    }

    this.inputValue = this.inputEl.value;
    this.athInput.emit(this.inputEl.value);
  };

  private handleInputFocus = () => {
    if (!this.returnInputFocus && !this.readonly) {
      this.open = true;
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
      document.removeEventListener('mousedown', this.handleOutsideClick);
      return;
    }

    // Use composedPath to detect if the click was inside the component
    const path = e.composedPath();
    const clickedInComponent = path.includes(this.element);

    if (!clickedInComponent) {
      this.open = false;
      setTimeout(() => {
        this.shownDate = this.valueDate ?? new Date();
      }, 200);
      this.returnInputFocus = false;
      this.setAriaLiveMessage('Calendario cerrado');
      this.athBlur.emit();
    }
  };

  private handleInputChange = () => {
    this.returnInputFocus = true;
    this.hasFocus = false;

    if (this.inputValue == '') {
      this.value = undefined;
      return;
    }

    if (this.type === DatepickerTypes.Year) {
      this.value = new Date(Number(this.inputValue), 0, 1).toISOString();
      this.athChange.emit(this.value);
      this.shownDate = new Date(Number(this.inputValue), 0, 1);
      this.wrongDate = false;
      this.feedbackWrong = '';
      this.open = false;
      return;
    } else if (this.type === DatepickerTypes.Month) {
      this.value = new Date(Number(this.inputValue.split('/')[1]), Number(this.inputValue.split('/')[0]) - 1, 1).toISOString();
      this.athChange.emit(this.value);
      this.shownDate = new Date(Number(this.inputValue.split('/')[1]), Number(this.inputValue.split('/')[0]) - 1, 1);
      this.wrongDate = false;
      this.feedbackWrong = '';
      this.open = false;
      return;
    }
    try {
      const result = formatDate(this.inputValue, this.format);
      if (
        (this.min && new Date(this.min) && result < new Date(this.min)) ||
        (this.max && new Date(this.max) && result > new Date(this.max)) ||
        this.disabledDatesAux.some(date => date.getTime() === result.getTime())
      ) {
        this.wrongDate = true;
        this.feedbackWrong = this.feedbackText;
        this.value = undefined;
        this.athChange.emit(this.value);
        this.shownDate = new Date();
        this.inputValue = '';
        this.open = false;
        return;
      }
      this.value = result.toISOString();
      this.athChange.emit(this.value);
      this.wrongDate = false;
      this.feedbackWrong = '';
      this.shownDate = result;
    } catch (error) {
      this.wrongDate = true;
      this.feedbackWrong = 'Fecha inexistente';
      this.value = undefined;
      this.athChange.emit(this.value);
      this.shownDate = new Date();
      this.inputValue = '';

      this.setAriaLiveMessage('Error: Fecha inexistente o inválida');
    }

    this.open = false;
  };

  private handleKeydownOverInput = (event: KeyboardEvent) => {
    if (event.code === 'ArrowDown' && !this.disabled && !this.readonly) {
      event.preventDefault();
      event.stopPropagation();
      this.setAriaLiveMessage('Calendario abierto. Use las teclas de flecha para navegar.');
      if (!this.open) {
        this.open = true;
      } else {
        const overlay = this.element.shadowRoot?.querySelector('.ath-datepicker-overlay');
        if (!overlay) return;
        const focusableElements = Array.from(overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) as HTMLElement[];
        focusableElements[0].focus();
      }
    } else if (event.code === 'Enter') {
      this.submitOnEnter && this.internals.form && this.internals.form.requestSubmit();
    } else if (event.code === 'Tab') {
      if (event.shiftKey) {
        this.open = false;
        setTimeout(() => {
          this.shownDate = this.valueDate ?? new Date();
        }, 200);
      }
      if (!this.open) this.athBlur.emit();
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
    setTimeout(() => {
      this.setFocus();
    }, 1);
    this.open = false;
    // Clear any existing date reset timeout
    if (this.dateResetTimeout) {
      clearTimeout(this.dateResetTimeout);
    }
    this.dateResetTimeout = setTimeout(() => {
      this.shownDate = this.valueDate ?? new Date();
      this.dateResetTimeout = null;
    }, 200);
    this.setAriaLiveMessage('Calendario cerrado, foco devuelto al campo de entrada');
  };

  private setAriaLiveMessage = (message: string) => {
    this.ariaLiveMessage = message;
    setTimeout(() => (this.ariaLiveMessage = ''), 2000);
  };

  private getLabelProps = (): FcInputLabelType => ({
    htmlForId: this.inputId,
    label: this.label,
    required: this.required,
    showRequired: !this.hideRequired,
    tooltipText: this.tooltipText,
    tooltipWidth: 200,
  });

  private getMaxLength = (): number => {
    switch (this.type) {
      case DatepickerTypes.Year:
        return 4;
      case DatepickerTypes.Month:
        return 7; // Format: MM/YYYY
      default:
        return this.format.length;
    }
  };

  private getInputProps = (): FcInputElementType => ({
    inputId: this.inputId,
    icon: 'calendar',
    iconPosition: 'right',
    type: this.type === DatepickerTypes.Year ? 'number' : 'text',
    autocomplete: 'off',
    name: this.name,
    pattern: '',
    placeholder: this.placeholder,
    value: this.inputValue,
    required: this.required,
    disabled: this.disabled,
    readonly: this.readonly,
    maxlength: this.getMaxLength(),
    inputAriaLabel: this.inputAriaLabel,
    hasButton: false,
    helperText: this.helperText,
    helperTextSROnly: getSROnlyHelperText(),
    feedback: this.wrongDate ? DatepickerFeedbacks.Error : this.feedback,
    feedbackText: this.wrongDate ? this.feedbackWrong : this.feedbackText,
    tabindex: '0',
    size: this.size,
    onKeyDown: e => this.handleKeydownOverInput(e),
    onInput: e => this.handleInput(e),
    onFocus: () => this.handleInputFocus(),
    onBlur: () => this.handleInputBlur(),
    onChange: () => this.handleInputChange(),
    onInputRef: (el: HTMLInputElement) => (this.inputEl = el),
    role: 'combobox',
    ariaExpanded: this.open,
    ariaControls: this.open ? this.datepickerpopupId : undefined,
    ariaHaspopup: 'grid',
  });

  private getHelperTextProps = (): FcInputHelperTextType => {
    return {
      id: this.inputHintId,
      text: !!this.helperText ? this.helperText.trim() : '',
    };
  };

  private getFeedbackProps = (): FcInputFeedbackType => ({
    id: this.inputFeedbackId,
    type: this.wrongDate ? DatepickerFeedbacks.Error : this.feedback,
    text: this.wrongDate ? this.feedbackWrong : this.feedbackText,
  });

  private getDialogClassNames = () => ({
    'ath-datepicker-overlay': true,
    [`size-${this.size}${!!this.label ? '__label' : ''}`]: true,
    'is-active': this.open,
  });

  private getPrevButtonAriaLabel = (): string => {
    switch (this.showType) {
      case DatepickerTypes.Date:
        return 'Mes anterior';
      case DatepickerTypes.Month:
        return 'Año anterior';
      case DatepickerTypes.Year:
        return 'Página de años anterior';
      default:
        return 'Mes anterior';
    }
  };

  private getNextButtonAriaLabel = (): string => {
    switch (this.showType) {
      case DatepickerTypes.Date:
        return 'Mes siguiente';
      case DatepickerTypes.Month:
        return 'Año siguiente';
      case DatepickerTypes.Year:
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

    const overlay = this.element.shadowRoot?.querySelector('.ath-datepicker-overlay');
    if (!overlay) return;

    const focusableElements = Array.from(overlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')) as HTMLElement[];

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      // Tab hacia atrás
      if (this.element.shadowRoot.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
    } else {
      // Tab hacia adelante
      if (this.element.shadowRoot.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
  };

  render() {
    const labelProps = this.getLabelProps();
    const helperTextProps = this.getHelperTextProps();
    const feedbackProps = this.getFeedbackProps();
    const inputProps = this.getInputProps();

    return (
      <Host>
        <div
          class="ath-datepicker"
          onKeyDown={e => {
            if (e.key === 'Escape') {
              this.returnInputFocus = true;
              this.hasFocus = false;
              setTimeout(() => {
                this.setFocus();
              }, 1);
              this.open = false;
              setTimeout(() => {
                this.shownDate = this.valueDate ?? new Date();
              }, 200);
              e.preventDefault();
              e.stopPropagation();
            } else {
              this.trapFocus(e);
            }
          }}
        >
          <div
            class="ath-input"
            onClick={e => {
              e.preventDefault();
              setTimeout(() => {
                this.setFocus();
              }, 1);
            }}
          >
            {!!this.label && <FcInputLabel {...labelProps}></FcInputLabel>}

            <div class="wrapper">
              <FcInputElement {...inputProps} />

              {!!this.helperText && !this.open && <FcInputHelperText {...helperTextProps}></FcInputHelperText>}
              <div class="sr-only" id={this.inputHintSROnlyId}>
                <span>{getSROnlyHelperText()}</span>
              </div>
              {((this.feedback !== DatepickerFeedbacks.None && !this.disabled && !this.readonly && !this.open) || this.wrongDate) && (
                <FcInputFeedback {...feedbackProps}></FcInputFeedback>
              )}
            </div>
          </div>
          <div aria-live="polite" aria-atomic="true" class="sr-only" role="status">
            {this.ariaLiveMessage}
          </div>
          {this.renderOverlay && (
            <div class={this.getDialogClassNames()} id={this.datepickerpopupId}>
              <div class="ath-datepicker-calendar-date">
                <div class="ath-datepicker-calendar-date__header">
                  <FcButtonComp
                    size="sm"
                    color="default"
                    iconPosition={ButtonIconPosition.IconOnly}
                    icon="chevron_left"
                    disabled={this.isPrevButtonDisabled()}
                    onClick={this.handlePrevButton}
                    buttonAriaLabel={this.getPrevButtonAriaLabel()}
                  ></FcButtonComp>
                  <div class="ath-datepicker-calendar-date__header__date">
                    {this.showType !== 'year' && (
                      <ath-button
                        clear={true}
                        size="sm"
                        onAthClick={this.handleClickMonth}
                        onKeyDown={e => this.handleKeyDownOverButton(e, 'month')}
                        aria-label={`Cambiar a vista de selección de mes. Mes seleccionado: ${this.shownDate ? getMonthName(this.shownDate) : this.valueDate ? getMonthName(this.valueDate) : getMonthName(new Date())}`}
                      >
                        {this.shownDate ? getMonthName(this.shownDate) : this.valueDate ? getMonthName(this.valueDate) : getMonthName(new Date())}
                      </ath-button>
                    )}
                    <ath-button
                      clear={true}
                      size="sm"
                      onAthClick={this.handleClickYear}
                      onKeyDown={e => this.handleKeyDownOverButton(e, 'year')}
                      aria-label={`Cambiar a vista de selección de año. Año seleccionado: ${this.shownDate ? this.shownDate.getFullYear() : this.valueDate ? this.valueDate.getFullYear() : new Date().getFullYear()}`}
                    >
                      {this.shownDate ? this.shownDate.getFullYear() : this.valueDate ? this.valueDate.getFullYear() : new Date().getFullYear()}
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
                  <div class="ath-datepicker-calendar-date__date">
                    <FcCalendar
                      shownDate={this.shownDate || this.valueDate || new Date()}
                      selectedDate={this.valueDate}
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
                  <div class="ath-datepicker-calendar-date__month">
                    <FcCalendarMonth
                      shownMonth={this.shownDate || this.valueDate || new Date()}
                      selectedMonth={this.valueDate}
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
                  <div class="ath-datepicker-calendar-date__year">
                    <FcCalendarYear
                      shownYear={this.shownDate || this.valueDate || new Date()}
                      selectedYear={this.valueDate}
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
                <div class="ath-datepicker-calendar-date__footer">
                  <ath-button clear={true} size="sm" tabIndex={0} iconPosition="left" icon="reload_double" onAthClick={this.reset}>
                    Restablecer
                  </ath-button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
