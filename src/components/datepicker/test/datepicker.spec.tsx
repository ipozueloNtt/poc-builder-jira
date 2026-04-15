import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthDatepicker } from '../datepicker';
import { formatDateToAriaLabel, formatDateToMonth, formatDateToYear, getMonthName } from '@utils/date-utils';
import { DatepickerTypes } from '../datepicker.model';
import * as utils from '@utils/date-utils';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthDatepicker, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

async function testKeyboardNavigation(expectedDate: Date, keyPressed: string, disabledDates: string = '', controlPressed: boolean = false): Promise<void> {
  const page = await testPage(`<ath-datepicker disabled-dates="${disabledDates}"></ath-datepicker>`);
  const input = page.root.shadowRoot.querySelector('input');

  input.focus();
  await page.waitForChanges();

  const todayItem = page.root.shadowRoot.querySelector('.is-current') as HTMLTableCellElement;
  todayItem.focus();

  const arrowDownEvent = new KeyboardEvent('keydown', {
    key: keyPressed,
    code: keyPressed,
    bubbles: true,
    ctrlKey: controlPressed,
  });
  todayItem.dispatchEvent(arrowDownEvent);
  await page.waitForChanges();

  const allItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item');
  const focusedElement = Array.from(allItems).find((item: HTMLTableCellElement) => item.tabIndex === 0 && !item.classList.contains('is-current')) as HTMLTableCellElement;

  expect(focusedElement).toBeTruthy();

  expect(focusedElement.getAttribute('aria-label')).toEqualText(formatDateToAriaLabel(expectedDate));
}

describe('ath-datepicker', () => {
  describe('render', () => {
    it('should have default properties', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      expect(page.root).toHaveProperty('feedback', 'none');
      expect(page.root).toHaveProperty('format', 'DD/MM/YYYY');
      expect(page.root).toHaveProperty('required', false);
      expect(page.root).toHaveProperty('disabled', false);
      expect(page.root).toHaveProperty('readonly', false);
      expect(page.root).toHaveProperty('hideRequired', false);
      expect(page.root).toHaveProperty('size', 'md');
      expect(page.root).toHaveProperty('type', 'date');
      expect(page.root).toHaveProperty('color', 'primary');
    });
    it('should have Label with text', async () => {
      const labelText = 'Datepicker Label';
      const page = await testPage(`<ath-datepicker label="${labelText}"></ath-datepicker>`);
      const label = page.root.shadowRoot.querySelector('label.ath-input__label__wrapper');
      expect(label).toEqualText(labelText);
    });

    it('should display a tooltip if label is set and tooltip-text is set', async () => {
      const page = await testPage(`<ath-datepicker label="Label" tooltip-text="tooltip text"></ath-datepicker>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeTruthy();
    });

    it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
      const page = await testPage(`<ath-datepicker label="Label"></ath-datepicker>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });

    it('should not display a tooltip if tooltip-text is set but label is not set', async () => {
      const page = await testPage(`<ath-datepicker tooltip-text="tooltip text"></ath-datepicker>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });

    it('should have helper-text with text', async () => {
      const helperText = 'Datepicker helper text';
      const page = await testPage(`<ath-datepicker helper-text="${helperText}"></ath-datepicker>`);
      const div = page.root.shadowRoot.querySelector('div.ath-input__helper-text');
      expect(div).toEqualText(helperText);
    });

    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });

    it('should have feedback with text', async () => {
      const feedbackText = 'Datepicker feedback text';
      const page = await testPage(`<ath-datepicker feedback="error" feedback-text="${feedbackText}"></ath-datepicker>`);
      const div = page.root.shadowRoot.querySelector('div.ath-input__feedback');
      expect(div).toEqualText(feedbackText);
    });

    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-datepicker feedback-text="feedback text"></ath-datepicker>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });

    it('should display the success feedback', async () => {
      const page = await testPage(`<ath-datepicker feedback-text="feedback text" feedback="success"></ath-datepicker>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback).toHaveClass('ath-input__feedback--success');
    });

    it('should display the warning feedback', async () => {
      const page = await testPage(`<ath-datepicker feedback-text="feedback text" feedback="warning"></ath-datepicker>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback).toHaveClass('ath-input__feedback--warning');
    });

    it('should display the error feedback', async () => {
      const page = await testPage(`<ath-datepicker feedback-text="feedback text" feedback="error"></ath-datepicker>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback).toHaveClass('ath-input__feedback--error');
    });

    it('should have required to be defined', async () => {
      const labelText = 'Datepicker Label text';
      const page = await testPage(`<ath-datepicker label="${labelText}" required="true"></ath-datepicker>`);
      const span = page.root.shadowRoot.querySelector('span.required');
      expect(span).toBeTruthy();
    });

    it('should set the md size by default', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });

    it('should set the right size if its set to sm', async () => {
      const page = await testPage(`<ath-datepicker size="sm"></ath-datepicker>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-sm');
    });

    it('should set the value property when its defined', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const datepicker = page.root;
      datepicker.value = new Date(2025, 10, 4);
      await page.waitForChanges();
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.value).toBe('04/11/2025');
    });

    it('should not set the value property when is not defined', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');
      expect(input.value).toBeFalsy();
    });
    it('Today must have the current style.', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();
      const todayItem = page.root.shadowRoot.querySelector('.is-current');
      expect(todayItem.getAttribute('aria-label')).toEqualText(formatDateToAriaLabel(new Date()));
    });

    it('should handle different date formats', async () => {
      const page = await testPage(`<ath-datepicker format="MM/DD/YYYY"></ath-datepicker>`);
      const datepicker = page.root;
      datepicker.value = new Date(2025, 10, 4);
      await page.waitForChanges();

      const input = page.root.shadowRoot.querySelector('input');
      expect(input.value).toBe('11/04/2025');
    });

    it('should handle year picker type', async () => {
      const page = await testPage(`<ath-datepicker type="year"></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-overlay');
      expect(overlay).toHaveClass('is-active');

      const yearItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item.is-year');
      expect(yearItems.length).toBeGreaterThan(0);
    });

    it('should handle month picker type', async () => {
      const page = await testPage(`<ath-datepicker type="month"></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-overlay');
      expect(overlay).toHaveClass('is-active');

      const monthItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item.is-month');
      expect(monthItems.length).toBeGreaterThan(0);
    });

    it('should handle min and max date constraints', async () => {
      const minDate = new Date(2025, 6, 5);
      const maxDate = new Date(2025, 6, 20);

      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      page.root.min = minDate;
      page.root.max = maxDate;

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const disabledItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-disabled');
      expect(disabledItems.length).toBeGreaterThan(0);
    });

    it('should handle disabled dates', async () => {
      const disabledDates = `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`;

      const page = await testPage(`<ath-datepicker disabled-dates="${disabledDates}"></ath-datepicker>`);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const disabledItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-disabled');
      expect(disabledItems.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle highlighted dates', async () => {
      const highlightedDates = `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`;

      const page = await testPage(`<ath-datepicker highlighted-dates="${highlightedDates}"></ath-datepicker>`);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const highlightedItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-highlighted');
      expect(highlightedItems.length).toBe(2);
    });
  });
  describe('actions', () => {
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      input.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('Focusing the input should open the overlay', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();
      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-overlay');
      expect(overlay).toHaveClass('is-active');
    });

    it('Pressing escape should close the overlay', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const todayItem = page.root.shadowRoot.querySelector('.is-current') as HTMLTableCellElement;
      todayItem.focus();

      const arrowDownEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        ctrlKey: false,
      });
      todayItem.dispatchEvent(arrowDownEvent);
      await page.waitForChanges();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-overlay.is-active');

      expect(overlay).toBeNull();
    });

    it('should allow the user introduce a valid date', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');
      const newValue = '08/04/2025';

      input.focus();
      await page.waitForChanges();

      const athInput = jest.fn();
      page.root.addEventListener('athInput', athInput);
      const inputEvent = new Event('input');
      const changeEvent = new Event('change');

      input.value = newValue;

      input.dispatchEvent(inputEvent);
      await page.waitForChanges();

      input.dispatchEvent(changeEvent);
      await page.waitForChanges();

      expect(athInput).toHaveBeenCalled();

      input.focus();
      await page.waitForChanges();

      const selectedItem = page.root.shadowRoot.querySelector('.is-selected');
      expect(selectedItem.getAttribute('aria-label')).toEqualText(formatDateToAriaLabel(new Date(2025, 3, 8)));
    });

    it('should not allow the user introduce a invalid date', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');
      const newValue = '08/14/2025';

      input.focus();
      await page.waitForChanges();

      const athInput = jest.fn();
      page.root.addEventListener('athInput', athInput);
      const inputEvent = new Event('input');
      const changeEvent = new Event('change');

      input.value = newValue;

      input.dispatchEvent(inputEvent);
      await page.waitForChanges();

      input.dispatchEvent(changeEvent);
      await page.waitForChanges();

      expect(athInput).toHaveBeenCalled();

      input.focus();
      await page.waitForChanges();

      const selectedItem = page.root.shadowRoot.querySelector('.is-selected');
      expect(selectedItem).toBeFalsy();
    });

    it('should navigate to next week when arrow down is pressed', async () => {
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7), 'ArrowDown');
    });

    it('should navigate to previous week when arrow up is pressed', async () => {
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 7), 'ArrowUp');
    });

    it('should navigate to next day when arrow right is pressed', async () => {
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), 'ArrowRight');
    });

    it('should navigate to previous day when arrow left is pressed', async () => {
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1), 'ArrowLeft');
    });

    it('should navigate to next month when page down is pressed', async () => {
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()), 'PageDown');
    });

    it('should navigate to previous month when page up is pressed', async () => {
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth() - 1, new Date().getDate()), 'PageUp');
    });

    it('should navigate to next available day when control + right is pressed', async () => {
      const disableDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1);
      const disabledDates = `['${disableDate.getFullYear()}-${String(disableDate.getMonth() + 1).padStart(2, '0')}-${disableDate.getDate().toString().padStart(2, '0')}']`;

      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1), 'ArrowRight', '', true);
      await testKeyboardNavigation(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2), 'ArrowRight', disabledDates, true);
    });

    it('should handle Enter key to select date', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const todayItem = page.root.shadowRoot.querySelector('.is-current') as HTMLTableCellElement;
      todayItem.focus();

      const enterEvent = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        bubbles: true,
      });

      todayItem.dispatchEvent(enterEvent);
      await page.waitForChanges();

      expect(page.root.value).toBeTruthy();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-overlay');
      expect(overlay).not.toHaveClass('is-active');
    });

    it('should change month when arrow is pressed over the month button', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const monthButton = (page.root.shadowRoot.querySelector('.ath-datepicker-calendar-date__header__date') as HTMLDivElement).children[0] as HTMLAthButtonElement;
      monthButton.focus();
      let ariaLabelExpected = `Cambiar a vista de selección de mes. Mes seleccionado: ${getMonthName(new Date())}`;
      expect(monthButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected);

      const arrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      monthButton.dispatchEvent(arrowEvent);
      await page.waitForChanges();

      let ariaLabelExpected2 = `Cambiar a vista de selección de mes. Mes seleccionado: ${getMonthName(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))}`;
      expect(monthButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected2);
    });

    it('should change year when arrow is pressed over the year button', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const yearButton = (page.root.shadowRoot.querySelector('.ath-datepicker-calendar-date__header__date') as HTMLDivElement).children[1] as HTMLAthButtonElement;
      yearButton.focus();
      let ariaLabelExpected = `Cambiar a vista de selección de año. Año seleccionado: ${new Date().getFullYear()}`;
      expect(yearButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected);

      const arrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      yearButton.dispatchEvent(arrowEvent);
      await page.waitForChanges();

      let ariaLabelExpected2 = `Cambiar a vista de selección de año. Año seleccionado: ${new Date().getFullYear() - 1}`;
      expect(yearButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected2);
    });
  });

  describe('internals & watchers', () => {
    it('watchDisabled should set readonly to false when disabled is true', async () => {
      const page = await testPage(`<ath-datepicker readonly="true" disabled="true"></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      inst.readonly = true;
      inst.disabled = true;
      inst.watchDisabled();
      expect(inst.readonly).toBe(false);
    });

    it('updateMin and updateMax set and clear minDate/maxDate correctly', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      inst.min = '2025-05-20';
      inst.updateMin();
      expect(inst['minDate']).toEqual(new Date('2025-05-20'));

      inst.min = 'invalid';
      inst.updateMin();
      expect(inst['minDate']).toBeInstanceOf(Date);
      expect(isNaN(inst['minDate'].getTime())).toBe(true);

      inst.max = '2025-12-31';
      inst.updateMax();
      expect(inst['maxDate']).toEqual(new Date('2025-12-31'));

      inst.max = 'invalid';
      inst.updateMax();
      expect(inst['maxDate']).toBeInstanceOf(Date);
      expect(isNaN(inst['maxDate'].getTime())).toBe(true);
    });

    it('updateMin sets minDate = undefined when Date constructor throws', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      const realDate = Date;

      // Sobrescribir temporalmente Date para que lance
      // @ts-ignore
      global.Date = jest.fn(() => {
        throw new Error('Date parse error');
      });

      inst.min = '2025-05-20';
      inst.updateMin();

      expect(inst['minDate']).toBeUndefined();

      // Restaurar Date original
      global.Date = realDate;
    });

    it('updateMin sets minDate = undefined when Date constructor throws', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      const realDate = Date;

      // Sobrescribir temporalmente Date para que lance
      // @ts-ignore
      global.Date = jest.fn(() => {
        throw new Error('Date parse error');
      });

      inst.max = '2025-12-31';
      inst.updateMax();

      expect(inst['maxDate']).toBeUndefined();

      // Restaurar Date original
      global.Date = realDate;
    });

    it('updateValue formats inputValue based on type and clears on empty', async () => {
      const page = await testPage(`<ath-datepicker type="year"></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;
      const date = '2025-08-13T00:00:00.000Z';

      inst.value = date;
      inst.updateValue();
      expect(inst['inputValue']).toBe('2025');

      inst.value = undefined;
      inst.updateValue();
      expect(inst['inputValue']).toBe('');
    });

    it('updateValue sets valueDate = undefined and returns when Date constructor throws', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      const RealDate = Date;

      // Mock de Date para que en este test siempre lance excepción
      // @ts-ignore
      global.Date = jest.fn(() => {
        throw new Error('Date parse error');
      });

      inst.value = '2025-08-13T00:00:00.000Z';
      inst.updateValue();

      expect(inst['valueDate']).toBeUndefined();

      // Restauramos Date original
      global.Date = RealDate;
    });

    it('updateValue sets inputValue using formatDateToMonth when type is Month', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      const date = new Date('2025-08-13T00:00:00.000Z');

      inst.type = DatepickerTypes.Month;
      inst.value = date.toISOString();

      inst.updateValue();

      expect(inst.inputValue).toBe(formatDateToMonth(date));
    });

    it('componentDidLoad calls setFocus if autofocus', async () => {
      const page = await testPage(`<ath-datepicker autofocus="true"></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;
      const focusSpy = jest.spyOn(inst, 'setFocus').mockResolvedValue();

      inst.autofocus = true;
      inst.componentDidLoad();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('componentWillLoad keeps shownDate when valueDate exists', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;
      const date = new Date('2025-01-01T00:00:00.000Z');

      inst.value = date.toISOString();
      inst['valueDate'] = date;
      inst.componentWillLoad();
      expect(inst['shownDate'].getTime()).toBe(date.getTime());
    });

    it('formResetCallback resets value and emits athChange', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;
      const emitSpy = jest.spyOn(inst.athChange, 'emit');

      inst['initialValue'] = '2025-01-01T00:00:00.000Z';
      inst.formResetCallback();
      expect(inst.value).toBe(inst['initialValue']);
      expect(emitSpy).toHaveBeenCalledWith(inst['initialValue']);
    });

    it('watchOpenState add mousedown listener when open is true', async () => {
      const page = await testPage(`<ath-datepicker></ath-datepicker>`);
      const inst = page.rootInstance as AthDatepicker;

      const addSpy = jest.spyOn(document, 'addEventListener');

      inst.open = true;
      inst.watchOpenState();

      await new Promise(resolve => setTimeout(resolve));

      expect(addSpy).toHaveBeenCalledWith('mousedown', inst['handleOutsideClick']);
    });
  });

  describe('handles dates', () => {
    it('executes the branch when type is Month', async () => {
      const page = await testPage('<ath-datepicker type="month"></ath-datepicker>');
      const inst = page.rootInstance as AthDatepicker;

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const focusSpy = jest.spyOn(inst, 'setFocus').mockResolvedValue();
      const emitSpy = jest.spyOn(inst.athChange, 'emit');

      const monthDate = new Date('2025-06-01T00:00:00.000Z');

      inst['handleMonthSelect'](new MouseEvent('click'), monthDate);

      expect(inst['returnInputFocus']).toBe(true);
      expect(inst.hasFocus).toBe(false);
      expect(inst.value).toBe(monthDate.toISOString());
      expect(emitSpy).toHaveBeenCalledWith(monthDate.toISOString());
      expect(inst.shownDate).toBe(monthDate);
      expect(inst.inputValue).toBe(formatDateToMonth(monthDate));
      expect(inst.open).toBe(false);
      expect(inst.wrongDate).toBe(false);
      expect(inst.feedbackWrong).toBe('');
      expect(ariaSpy).toHaveBeenCalledWith(`Mes seleccionado: ${formatDateToMonth(monthDate)}`);
      expect(focusSpy).toHaveBeenCalled();
    });

    it('executes the branch when type is Year', async () => {
      const page = await testPage('<ath-datepicker type="year"></ath-datepicker>');
      const inst = page.rootInstance as AthDatepicker;

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const focusSpy = jest.spyOn(inst, 'setFocus').mockResolvedValue();
      const emitSpy = jest.spyOn(inst.athChange, 'emit');

      const yearDate = new Date('2025-01-01T00:00:00.000Z');

      inst['handleYearSelect'](new MouseEvent('click'), yearDate);

      expect(inst['returnInputFocus']).toBe(true);
      expect(inst.hasFocus).toBe(false);
      expect(inst.value).toBe(yearDate.toISOString());
      expect(emitSpy).toHaveBeenCalledWith(yearDate.toISOString());
      expect(inst.shownDate).toBe(yearDate);
      expect(inst.inputValue).toBe(formatDateToYear(yearDate));
      expect(inst.open).toBe(false);
      expect(inst.wrongDate).toBe(false);
      expect(inst.feedbackWrong).toBe('');
      expect(ariaSpy).toHaveBeenCalledWith(`Año seleccionado: ${formatDateToYear(yearDate)}`);
      expect(focusSpy).toHaveBeenCalled();
    });

    it('executes the branch when type is not Month', async () => {
      const page = await testPage('<ath-datepicker></ath-datepicker>');
      const inst = page.rootInstance as AthDatepicker;

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const getBetweenSpy = jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);

      inst.type = DatepickerTypes.Year;
      const monthDate = new Date('2025-06-01T00:00:00.000Z');

      inst['handleMonthSelect'](new MouseEvent('click'), monthDate);

      expect(getBetweenSpy).toHaveBeenCalledWith(monthDate, inst['minDate'], inst['maxDate']);
      expect(inst.shownDate).toBe(monthDate);
      expect(inst.hasFocus).toBe(true);
      expect(inst.showType).toBe(DatepickerTypes.Date);
      expect(ariaSpy).toHaveBeenCalledWith(`Mes seleccionado: ${formatDateToMonth(monthDate)}. Vista de calendario abierta`);
    });

    it('executes the branch when type is not Year', async () => {
      const page = await testPage('<ath-datepicker></ath-datepicker>');
      const inst = page.rootInstance as AthDatepicker;

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const getBetweenSpy = jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);

      inst.type = DatepickerTypes.Month;
      const yearDate = new Date('2025-01-01T00:00:00.000Z');

      inst['handleYearSelect'](new MouseEvent('click'), yearDate);

      expect(getBetweenSpy).toHaveBeenCalledWith(yearDate, inst['minDate'], inst['maxDate']);
      expect(inst.shownDate).toBe(yearDate);
      expect(inst.hasFocus).toBe(true);
      expect(inst.showType).toBe(DatepickerTypes.Month);
      expect(ariaSpy).toHaveBeenCalledWith(`Año seleccionado: ${formatDateToYear(yearDate)}. Vista de selección de mes abierta`);
    });
  });

  describe('handleClicks and Buttons', () => {
    describe('handleClickMonth and Year', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it('handleClickMonth should set hasFocus, showType and aria live message', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();

        inst['handleClickMonth']();

        expect(inst.hasFocus).toBe(true);
        expect(inst.showType).toBe(DatepickerTypes.Month);
        expect(ariaSpy).toHaveBeenCalledWith('Vista de selección de mes abierta');
      });

      it('handleClickYear should set hasFocus, showType and aria live message', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();

        inst['handleClickYear']();

        expect(inst.showType).toBe(DatepickerTypes.Year);
        expect(inst.hasFocus).toBe(true);
        expect(ariaSpy).toHaveBeenCalledWith('Vista de selección de año abierta');
      });
    });

    describe('handleNextButton', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('navigates to previous month when showType is Date', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const addMonthsMock = jest.spyOn(utils, 'addMonths').mockImplementation(() => {
          return new Date('2025-05-01T00:00:00.000Z');
        });
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        jest.spyOn(utils, 'getMonthName').mockReturnValue('May');

        inst.showType = DatepickerTypes.Date;
        inst.shownDate = new Date('2025-06-01T00:00:00.000Z');

        inst['handlePrevButton']();

        expect(inst.hasFocus).toBe(false);
        expect(addMonthsMock).toHaveBeenCalledWith(expect.any(Date), -1);
        expect(inst.shownDate).toEqual(new Date('2025-05-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando a May 2025');
      });

      it('navigates to previous year when showType is Month', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const addYearsMock = jest.spyOn(utils, 'addYears').mockImplementation(() => {
          return new Date('2024-01-01T00:00:00.000Z');
        });
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);

        inst.showType = DatepickerTypes.Month;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');

        inst['handlePrevButton']();

        expect(inst.hasFocus).toBe(false);
        expect(addYearsMock).toHaveBeenCalledWith(expect.any(Date), -1);
        expect(inst.shownDate).toEqual(new Date('2024-01-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando al año 2024');
      });

      it('navigates 12 years back when showType is Year', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const addYearsMock = jest.spyOn(utils, 'addYears').mockImplementation(() => {
          return new Date('2013-01-01T00:00:00.000Z');
        });
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);

        inst.showType = DatepickerTypes.Year;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');

        inst['handlePrevButton']();

        expect(inst.hasFocus).toBe(false);
        expect(addYearsMock).toHaveBeenCalledWith(expect.any(Date), -12);
        expect(inst.shownDate).toEqual(new Date('2013-01-01T00:00:00.000Z'));

        const decadeStart = 2013 - (2013 % 10);
        const decadeEnd = decadeStart + 9;
        expect(ariaSpy).toHaveBeenCalledWith(`Navegando a la página que contiene los años ${decadeStart} - ${decadeEnd}`);
      });

      it('should do nothing (default case) when showType does not match any known type', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const initialDate = new Date('2025-01-01T00:00:00.000Z');
        inst.showType = 'Unknown' as any;
        inst.shownDate = initialDate;

        inst['handlePrevButton']();

        expect(inst.hasFocus).toBe(false);
        expect(inst.shownDate).toBe(initialDate);
        expect(ariaSpy).not.toHaveBeenCalled();
      });
    });

    describe('handleNextButton', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should navigate to next month when showType is Date', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        jest.spyOn(utils, 'addMonths').mockImplementation(() => new Date('2025-07-01T00:00:00.000Z'));
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        jest.spyOn(utils, 'getMonthName').mockReturnValue('July');

        inst.showType = DatepickerTypes.Date;
        inst.shownDate = new Date('2025-06-01T00:00:00.000Z');

        inst['handleNextButton']();

        expect(inst.hasFocus).toBe(false);
        expect(inst.shownDate).toEqual(new Date('2025-07-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando a July 2025');
      });

      it('should navigate to next year when showType is Month', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        jest.spyOn(utils, 'addYears').mockImplementation(() => new Date('2026-01-01T00:00:00.000Z'));
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);

        inst.showType = DatepickerTypes.Month;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');

        inst['handleNextButton']();

        expect(inst.hasFocus).toBe(false);
        expect(inst.shownDate).toEqual(new Date('2026-01-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando al año 2026');
      });

      it('should navigate 12 years forward when showType is Year', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        jest.spyOn(utils, 'addYears').mockImplementation(() => new Date('2037-01-01T00:00:00.000Z'));
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);

        inst.showType = DatepickerTypes.Year;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');

        inst['handleNextButton']();

        expect(inst.hasFocus).toBe(false);
        expect(inst.shownDate).toEqual(new Date('2037-01-01T00:00:00.000Z'));

        const decadeStart = 2037 - (2037 % 10);
        const decadeEnd = decadeStart + 9;
        expect(ariaSpy).toHaveBeenCalledWith(`Navegando a la página que contiene los años ${decadeStart} - ${decadeEnd}`);
      });

      it('should do nothing (default case) when showType does not match any known type', async () => {
        const page = await testPage('<ath-datepicker></ath-datepicker>');
        const inst = page.rootInstance as AthDatepicker;

        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const initialDate = new Date('2025-01-01T00:00:00.000Z');
        inst.showType = 'Unknown' as any;
        inst.shownDate = initialDate;

        inst['handleNextButton']();

        expect(inst.hasFocus).toBe(false);
        expect(inst.shownDate).toBe(initialDate);
        expect(ariaSpy).not.toHaveBeenCalled();
      });
    });
  });

  describe('reset', () => {
    it('should reset value, inputValue, shownDate and showType, and emit change', async () => {
      const page = await testPage('<ath-datepicker></ath-datepicker>');
      const inst = page.rootInstance as AthDatepicker;

      inst.value = '2025-12-31T00:00:00.000Z';
      inst.inputValue = 'some text';
      const customDate = new Date('2020-01-01T00:00:00.000Z');
      inst.shownDate = customDate;
      inst.showType = DatepickerTypes.Month;

      const emitSpy = jest.spyOn(inst.athChange, 'emit');

      inst['reset']();

      expect(inst.value).toBeUndefined();

      expect(inst.inputValue).toBe('');

      expect(inst.shownDate).toBeInstanceOf(Date);
      expect(Math.abs(inst.shownDate.getTime() - new Date().getTime())).toBeLessThan(2000);

      expect(inst.showType).toBe(inst.type);
      expect(emitSpy).toHaveBeenCalledWith(undefined);
    });
  });

  describe('handleInput', () => {
    let page;
    let inst: AthDatepicker;

    beforeEach(async () => {
      page = await testPage('<ath-datepicker></ath-datepicker>');
      inst = page.rootInstance as AthDatepicker;

      (inst as any).inputEl = document.createElement('input');
      inst.inputValue = '';
    });

    it('should handle deleteContentBackward', () => {
      const emitSpy = jest.spyOn(inst.athInput, 'emit');
      (inst as any).inputEl.value = '12/12/2025';

      const event = new Event('input') as any;
      event.inputType = 'deleteContentBackward';
      event.data = null;

      inst['handleInput'](event);

      expect(inst.inputValue).toBe('12/12/2025');
      expect(emitSpy).toHaveBeenCalledWith('12/12/2025');
    });

    it('should handle deleteContentForward', () => {
      const emitSpy = jest.spyOn(inst.athInput, 'emit');
      (inst as any).inputEl.value = '01/01/2025';

      const event = new Event('input') as any;
      event.inputType = 'deleteContentForward';
      event.data = null;

      inst['handleInput'](event);

      expect(inst.inputValue).toBe('01/01/2025');
      expect(emitSpy).toHaveBeenCalledWith('01/01/2025');
    });

    it('should call handleInputYear when type is Year', () => {
      const mockFn = jest.spyOn(inst as any, 'handleInputYear').mockImplementation();
      inst.type = DatepickerTypes.Year;

      const event = new Event('input') as any;
      event.inputType = null;
      event.data = null;

      inst['handleInput'](event);

      expect(mockFn).toHaveBeenCalledWith(event);
    });

    it('should call handleInputMonth when type is Month', () => {
      const mockFn = jest.spyOn(inst as any, 'handleInputMonth').mockImplementation();
      inst.type = DatepickerTypes.Month;

      const event = new Event('input') as any;
      event.inputType = null;
      event.data = null;

      inst['handleInput'](event);

      expect(mockFn).toHaveBeenCalledWith(event);
    });

    it('should emit when separator key matches format position', () => {
      inst.format = 'DD/MM/YYYY';
      (inst as any).inputEl.value = '12/';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = { data: '/', inputType: 'insertText' } as unknown as InputEvent;
      inst['handleInput'](event);

      expect(emitSpy).toHaveBeenCalledWith('12/');
    });

    it('should block non-numeric input', () => {
      inst.inputValue = '10';
      (inst as any).inputEl.value = '10a';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = { data: 'a', inputType: 'insertText' } as unknown as InputEvent;
      inst['handleInput'](event);

      expect((inst as any).inputEl.value).toBe('10');
      expect(emitSpy).toHaveBeenCalledWith('10');
    });
  });

  describe('handleInputYear', () => {
    let page: SpecPage;
    let inst: AthDatepicker;

    beforeEach(async () => {
      page = await testPage('<ath-datepicker type="year"></ath-datepicker>');
      inst = page.rootInstance as AthDatepicker;

      (inst as any).inputEl = document.createElement('input');
      inst.inputValue = '';
    });

    it('should block non-numeric input and restore previous value', () => {
      inst.inputValue = '202';
      (inst as any).inputEl.value = '202a';

      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = 'a';

      inst['handleInputYear'](event);

      expect((inst as any).inputEl.value).toBe('202');
      expect(emitSpy).toHaveBeenCalledWith('202');
    });

    it('handle change should be called if a correct value if number is a valid year', () => {
      inst.inputValue = '2023';
      (inst as any).inputEl.value = '2023';

      const emitSpy = jest.spyOn(inst.athChange, 'emit');

      inst['handleInputChange']();

      expect((inst as any).inputEl.value).toBe('2023');
      expect(inst.inputValue).toBe('2023');
      expect(emitSpy).toHaveBeenCalledWith(new Date(Number('2023'), 0, 1).toISOString());
    });

    it('should revert value if number is greater than 9999', () => {
      inst.inputValue = '2023';
      (inst as any).inputEl.value = '12345';

      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = '5';

      inst['handleInputYear'](event);

      expect((inst as any).inputEl.value).toBe('2023');
      expect(inst.inputValue).toBe('2023');
      expect(emitSpy).toHaveBeenCalledWith('2023');
    });

    it('should accept valid numeric year <= 9999', () => {
      inst.inputValue = '202';
      (inst as any).inputEl.value = '2024';

      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = '4';

      inst['handleInputYear'](event);

      expect(inst.inputValue).toBe('2024');
      expect((inst as any).inputEl.value).toBe('2024');
      expect(emitSpy).toHaveBeenCalledWith('2024');
    });
  });

  describe('handleInputMonth', () => {
    let page: SpecPage;
    let inst: AthDatepicker;

    beforeEach(async () => {
      page = await testPage('<ath-datepicker type="month"></ath-datepicker>');
      inst = page.rootInstance as AthDatepicker;

      (inst as any).inputEl = document.createElement('input');
      inst.inputValue = '';
    });

    it('should block non-numeric and non-slash input', () => {
      inst.inputValue = '1';
      (inst as any).inputEl.value = '1a';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = 'a';

      inst['handleInputMonth'](event);

      expect((inst as any).inputEl.value).toBe('1');
      expect(emitSpy).toHaveBeenCalledWith('1');
    });

    it('should pad and add slash when number > 12', () => {
      inst.inputValue = '9';
      (inst as any).inputEl.value = '13';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = '3';

      inst['handleInputMonth'](event);

      expect((inst as any).inputEl.value).toBe('09/3');
      expect(emitSpy).toHaveBeenCalledWith('09/3');
    });

    it('should pad month when "/" entered after 1-2 digits', () => {
      inst.inputValue = '9';
      (inst as any).inputEl.value = '9/';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = '/';

      inst['handleInputMonth'](event);

      expect((inst as any).inputEl.value).toBe('09/');
      expect(emitSpy).toHaveBeenCalledWith('09/');
    });

    it('should restore previous value and emit when "/" entered but inputValue length too long', () => {
      inst.inputValue = '123';
      (inst as any).inputEl.value = '123/';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = '/';

      inst['handleInputMonth'](event);

      expect((inst as any).inputEl.value).toBe('123');
      expect(emitSpy).toHaveBeenCalledWith('123');
    });

    it('should accept valid numeric month <= 12', () => {
      inst.inputValue = '1';
      (inst as any).inputEl.value = '12';
      const emitSpy = jest.spyOn(inst.athInput, 'emit');

      const event = new Event('input') as any;
      event.data = '2';

      inst['handleInputMonth'](event);

      expect(inst.inputValue).toBe('12');
      expect((inst as any).inputEl.value).toBe('12');
      expect(emitSpy).toHaveBeenCalledWith('12');
    });

    it('handle change should be called if a correct value if number is a valid month', () => {
      inst.inputValue = '02/2023';
      (inst as any).inputEl.value = '02/2023';

      const emitSpy = jest.spyOn(inst.athChange, 'emit');

      inst['handleInputChange']();

      expect((inst as any).inputEl.value).toBe('02/2023');
      expect(inst.inputValue).toBe('02/2023');
      const expectedCall = new Date(2023, 1, 1).toISOString();
      expect(emitSpy).toHaveBeenCalledWith(expectedCall);
    });
  });

  describe('handleInputBlur', () => {
    it('should set returnInputFocus to false', async () => {
      const page = await testPage('<ath-datepicker></ath-datepicker>');
      const inst = page.rootInstance as AthDatepicker;

      inst['returnInputFocus'] = true;

      inst['handleInputBlur']();

      expect(inst['returnInputFocus']).toBe(false);
    });
  });

  describe('handleOutsideClick', () => {
    it('should remove mousedown listener and return when open is false', async () => {
      const page = await newSpecPage({
        components: [AthDatepicker],
        html: `<ath-datepicker></ath-datepicker>`,
      });

      const inst = page.rootInstance as AthDatepicker;
      const removeSpy = jest.spyOn(document, 'removeEventListener');

      inst.open = false;

      const event = new MouseEvent('mousedown');
      inst['handleOutsideClick'](event);

      expect(removeSpy).toHaveBeenCalledWith('mousedown', inst['handleOutsideClick']);
    });

    it('should do nothing if click is inside the component', async () => {
      const page = await newSpecPage({
        components: [AthDatepicker],
        html: `<ath-datepicker></ath-datepicker>`,
      });

      const inst = page.rootInstance as AthDatepicker;
      const elementStub = document.createElement('div');
      jest.spyOn(inst as any, 'element', 'get').mockReturnValue(elementStub);

      inst.open = true;

      const event = new MouseEvent('mousedown') as any;
      event.composedPath = () => [elementStub];

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage');
      const blurSpy = jest.spyOn(inst.athBlur, 'emit');

      inst['handleOutsideClick'](event);

      expect(ariaSpy).not.toHaveBeenCalled();
      expect(blurSpy).not.toHaveBeenCalled();
      expect(inst.open).toBe(true);
    });

    it('should reset shownDate to valueDate when click is outside', async () => {
      const page = await newSpecPage({
        components: [AthDatepicker],
        html: `<ath-datepicker></ath-datepicker>`,
      });

      const inst = page.rootInstance as AthDatepicker;
      const elementStub = document.createElement('div');
      jest.spyOn(inst as any, 'element', 'get').mockReturnValue(elementStub);

      inst.open = true;
      inst['valueDate'] = new Date('2024-01-01T00:00:00.000Z');
      inst['shownDate'] = new Date('2020-01-01T00:00:00.000Z');

      const event = new MouseEvent('mousedown') as any;
      event.composedPath = () => [document.body];

      inst['handleOutsideClick'](event);

      await new Promise(resolve => setTimeout(resolve, 200));

      await page.waitForChanges();

      expect(inst['shownDate']).toEqual(inst['valueDate']);
    });
  });
});
