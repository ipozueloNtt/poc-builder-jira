import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthDatepickerRange } from '../datepicker-range';
import { formatDateToAriaLabel } from '@utils/date-utils';
import { DatepickerRangeFocusState, DatepickerRangeTypes } from '../datepicker-range.model';
import * as utils from '@utils/date-utils';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthDatepickerRange, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

const RealDate = Date;

export function mockGlobalDate(iso: string) {
  const fixed = new RealDate(iso);

  function MockDate(this: any, ...args: any[]) {
    if (new.target === undefined) {
      return RealDate();
    }

    if (args.length === 0) {
      return Reflect.construct(RealDate, [fixed], new.target);
    }
    return Reflect.construct(RealDate, args, new.target);
  }

  Object.setPrototypeOf(MockDate, RealDate);
  (MockDate as any).now = () => fixed.getTime();
  (MockDate as any).UTC = RealDate.UTC;
  (MockDate as any).parse = RealDate.parse;
  (MockDate as any).prototype = RealDate.prototype;

  (global as any).Date = MockDate as unknown as DateConstructor;
}

function restoreGlobalDate() {
  global.Date = RealDate;
}

async function testKeyboardNavigation(expectedDate: Date, keyPressed: string, disabledDates: string = '', controlPressed: boolean = false): Promise<void> {
  const page = await testPage(`<ath-datepicker-range disabled-dates="${disabledDates}"></ath-datepicker-range>`);
  const inputFrom = page.root.shadowRoot.querySelector('input');

  inputFrom.focus();
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

describe('ath-datepicker-range', () => {
  describe('render', () => {
    it('renders', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      expect(page.root).toBeTruthy();
    });

    it('should have default properties', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
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
      const labelText = 'Datepicker Range Label';
      const page = await testPage(`<ath-datepicker-range label="${labelText}"></ath-datepicker-range>`);
      const label = page.root.shadowRoot.querySelector('label.ath-input__label__wrapper');
      expect(label).toEqualText(labelText);
    });

    it('should display a tooltip if label is set and tooltip-text is set', async () => {
      const page = await testPage(`<ath-datepicker-range label="Label" tooltip-text="tooltip text"></ath-datepicker-range>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeTruthy();
    });

    it('should not display a tooltip if label is set but tooltip-text is not set', async () => {
      const page = await testPage(`<ath-datepicker-range label="Label"></ath-datepicker-range>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });

    it('should not display a tooltip if tooltip-text is set but label is not set', async () => {
      const page = await testPage(`<ath-datepicker-range tooltip-text="tooltip text"></ath-datepicker-range>`);
      const athTooltip = page.root.shadowRoot.querySelector('ath-tooltip');
      expect(athTooltip).toBeFalsy();
    });

    it('should have helper-text with text', async () => {
      const helperText = 'Datepicker range helper text';
      const page = await testPage(`<ath-datepicker-range helper-text="${helperText}"></ath-datepicker-range>`);
      const div = page.root.shadowRoot.querySelector('div.ath-input__helper-text');
      expect(div).toEqualText(helperText);
    });

    it('should not display helper-text when helper-text it is not defined', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const helperText = page.root.shadowRoot.querySelector('.ath-input__helper-text');
      expect(helperText).toBeFalsy();
    });

    it('should have feedback with text', async () => {
      const feedbackText = 'Datepicker range feedback text';
      const page = await testPage(`<ath-datepicker-range feedback="error" feedback-text="${feedbackText}"></ath-datepicker-range>`);
      const div = page.root.shadowRoot.querySelector('div.ath-input__feedback');
      expect(div).toEqualText(feedbackText);
    });

    it('should not display the feedback when feedback it is not defined', async () => {
      const page = await testPage(`<ath-datepicker-range feedback-text="feedback text"></ath-datepicker-range>`);
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeFalsy();
    });

    it('should display the success feedback', async () => {
      const page = await testPage(`<ath-datepicker-range feedback-text="feedback text" feedback="success"></ath-datepicker-range>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback).toHaveClass('ath-input__feedback--success');
    });

    it('should display the warning feedback', async () => {
      const page = await testPage(`<ath-datepicker-range feedback-text="feedback text" feedback="warning"></ath-datepicker-range>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback).toHaveClass('ath-input__feedback--warning');
    });

    it('should display the error feedback', async () => {
      const page = await testPage(`<ath-datepicker-range feedback-text="feedback text" feedback="error"></ath-datepicker-range>`);
      await page.waitForChanges();
      const feedback = page.root.shadowRoot.querySelector('.ath-input__feedback');
      expect(feedback).toBeTruthy();
      expect(feedback).toHaveClass('ath-input__feedback--error');
    });

    it('should have required to be defined', async () => {
      const labelText = 'Datepicker Range Label text';
      const page = await testPage(`<ath-datepicker-range label="${labelText}" required></ath-datepicker-range>`);
      const span = page.root.shadowRoot.querySelector('span.required');
      expect(span).toBeTruthy();
    });

    it('should set the md size by default', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-md');
    });

    it('should set the right size if its set to sm', async () => {
      const page = await testPage(`<ath-datepicker-range size="sm"></ath-datepicker-range>`);
      const inputField = page.root.shadowRoot.querySelector('.ath-input__field');
      expect(inputField).toHaveClass('ath-input__field--size-sm');
    });

    it('should set the value property when its defined', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const datepicker = page.root;
      datepicker.value = "['2025-10-04T00:00:00.000Z','2025-11-04T00:00:00.000Z']";
      await page.waitForChanges();
      const inputs = page.root.shadowRoot.querySelectorAll('input');
      expect(inputs[0].value).toBe('04/10/2025');
      expect(inputs[1].value).toBe('04/11/2025');
    });

    it('should not set the value property when is not defined', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const inputs = page.root.shadowRoot.querySelectorAll('input');
      expect(inputs[0].value).toBeFalsy();
      expect(inputs[1].value).toBeFalsy();
    });

    it('should handle different date formats', async () => {
      const page = await testPage(`<ath-datepicker-range format="MM/DD/YYYY"></ath-datepicker-range>`);
      const datepicker = page.root;
      datepicker.value = "['2025-10-04T00:00:00.000Z','2025-11-04T00:00:00.000Z']";
      await page.waitForChanges();
      const inputs = page.root.shadowRoot.querySelectorAll('input');
      expect(inputs[0].value).toBe('10/04/2025');
      expect(inputs[1].value).toBe('11/04/2025');
    });

    it('should handle year picker type', async () => {
      const page = await testPage(`<ath-datepicker-range type="year"></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-range-overlay');
      expect(overlay).toHaveClass('is-active');

      const yearItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item.is-year');
      expect(yearItems.length).toBeGreaterThan(0);
    });

    it('should handle month picker type', async () => {
      const page = await testPage(`<ath-datepicker-range type="month"></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-range-overlay');
      expect(overlay).toHaveClass('is-active');

      const monthItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item.is-month');
      expect(monthItems.length).toBeGreaterThan(0);
    });

    it('should handle min and max date constraints', async () => {
      const minDate = new Date(2025, 6, 5);
      const maxDate = new Date(2025, 6, 20);

      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
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

      const page = await testPage(`<ath-datepicker-range disabled-dates="${disabledDates}"></ath-datepicker-range>`);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const disabledItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-disabled');
      expect(disabledItems.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle highlighted dates', async () => {
      const highlightedDates = `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`;

      const page = await testPage(`<ath-datepicker-range highlighted-dates="${highlightedDates}"></ath-datepicker-range>`);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const highlightedItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-highlighted');
      expect(highlightedItems.length).toBe(2);
    });

    it('should display range shortcuts when hidePanel is false', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const shortcuts = page.root.shadowRoot.querySelector('.ath-datepicker-range-calendar-date__panel-shortcuts');
      expect(shortcuts).toBeTruthy();
    });

    it('should not display range shortcuts when hidePanel is true', async () => {
      const page = await testPage(`<ath-datepicker-range hide-panel></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();

      const panel = page.root.shadowRoot.querySelector('.ath-datepicker-range-calendar-date__panel');
      expect(panel).toBeFalsy();
    });

    it('should display proper labels for start and end inputs', async () => {
      const page = await testPage(`<ath-datepicker-range label="Datepicker" label-start="From" label-end="To"></ath-datepicker-range>`);
      const labels = page.root.shadowRoot.querySelectorAll('.ath-input__label__wrapper');
      expect(labels[0]).toEqualText('Datepicker');
      expect(labels[1]).toEqualText('From');
      expect(labels[2]).toEqualText('To');
    });
  });

  describe('actions', () => {
    it('should emit the athFocus event when focused', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');
      const athFocus = jest.fn();
      page.root.addEventListener('athFocus', athFocus);
      input.focus();
      expect(athFocus).toHaveBeenCalled();
    });

    it('Focusing the input should open the overlay', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      await page.waitForChanges();
      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-range-overlay');
      expect(overlay).toHaveClass('is-active');
    });

    it('Pressing escape should close the overlay', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input');

      input.focus();
      await page.waitForChanges();

      const todayItem = page.root.shadowRoot.querySelector('.is-current') as HTMLTableCellElement;
      todayItem.focus();

      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        bubbles: true,
        ctrlKey: false,
      });
      todayItem.dispatchEvent(escapeEvent);
      await page.waitForChanges();

      const overlay = page.root.shadowRoot.querySelector('.ath-datepicker-range-overlay.is-active');
      expect(overlay).toBeNull();
    });

    // it('should allow the user to select a date range', async () => {
    //   const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
    //   const inputFrom = page.root.shadowRoot.querySelector('input');
    //   const athChange = jest.fn();
    //   page.root.addEventListener('athChange', athChange);

    //   inputFrom.focus();
    //   await page.waitForChanges();

    //   const dateItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item');
    //   const firstDate = dateItems[10] as HTMLTableCellElement;
    //   const secondDate = dateItems[15] as HTMLTableCellElement;

    //   firstDate.click();
    //   await page.waitForChanges();

    //   secondDate.click();
    //   await page.waitForChanges();

    //   expect(athChange).toHaveBeenCalled();
    // });

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

    it('should handle Enter key to select date', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
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

      expect(input.value).toBeTruthy();
    });

    // it('should switch focus to end input after selecting start date', async () => {
    //   const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
    //   const inputFrom = page.root.shadowRoot.querySelector('input');
    //   const inputs = page.root.shadowRoot.querySelectorAll('input');
    //   const inputTo = inputs[1];

    //   inputFrom.focus();
    //   await page.waitForChanges();

    //   const dateItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item');
    //   const firstDate = dateItems[10] as HTMLTableCellElement;

    //   firstDate.click();
    //   await page.waitForChanges();

    //   // Should focus on the second input after selecting first date
    //   const focusedElement = page.root.shadowRoot.activeElement;
    //   expect(focusedElement).toBe(inputTo);
    // });

    it('should reset range if end date is before start date', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const inputFrom = page.root.shadowRoot.querySelector('input');

      inputFrom.focus();
      await page.waitForChanges();

      const dateItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item');
      const laterDate = dateItems[20] as HTMLTableCellElement;
      const earlierDate = dateItems[10] as HTMLTableCellElement;

      // Select later date first
      laterDate.click();
      await page.waitForChanges();

      // Then select earlier date - should reset the first date
      earlierDate.click();
      await page.waitForChanges();

      const inputs = page.root.shadowRoot.querySelectorAll('input');
      expect(inputs[1].value).toBe('');
    });
  });

  describe('internals & watchers', () => {
    it('watchDisabled should set readonly to false when disabled is true', async () => {
      const page = await testPage(`<ath-datepicker-range readonly disabled></ath-datepicker-range>`);
      const shadowRoot = page.root.shadowRoot;
      const input = shadowRoot.querySelector('input');

      await page.waitForChanges();

      expect(input).not.toHaveAttribute('readonly');
    });

    it('updateMin and updateMax set and clear minDate/maxDate correctly', async () => {
      const page = await testPage(`<ath-datepicker-range min="2025-05-20" max="2025-12-31"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['minDate']).toEqual(new Date('2025-05-20'));
      expect(inst['maxDate']).toEqual(new Date('2025-12-31'));
    });

    it('updateValue formats inputValue based on type ', async () => {
      const page = await testPage(`<ath-datepicker-range type="year" value="['2025-08-13T00:00:00.000Z','2025-12-13T00:00:00.000Z']"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['inputValueFrom']).toBe('2025');
      expect(inst['inputValueTo']).toBe('2025');
    });

    it('updateValue clears on empty', async () => {
      const page = await testPage(`<ath-datepicker-range type="year" ></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['inputValueFrom']).toBe('');
      expect(inst['inputValueTo']).toBe('');
    });

    it('componentDidLoad calls setFocus if autofocus', async () => {
      const focusSpy = jest.spyOn(AthDatepickerRange.prototype, 'setFocus');
      const page = await testPage(`<ath-datepicker-range autofocus></ath-datepicker-range>`);

      await page.waitForChanges();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('formResetCallback resets value and emits athChange', async () => {
      const value = "['2025-01-01','2025-01-31']";
      const page = await testPage(`<ath-datepicker-range value="${value}"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      const athChange = jest.fn();
      page.root!.addEventListener('athChange', athChange);

      inst.formResetCallback();
      await page.waitForChanges();

      expect(inst.value).toBe(value);
      expect((inst as any).valueFrom).toBe('2025-01-01');
      expect((inst as any).valueTo).toBe('2025-01-31');

      expect(athChange).toHaveBeenCalledTimes(1);
      expect(athChange.mock.calls[0][0].detail).toEqual("['2025-01-01','2025-01-31']");
    });

    xit('watchOpenState adds mousedown listener when open is true', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
      const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();
      await new Promise(r => setTimeout(r, 0));

      let overlay = page.root.shadowRoot.querySelector('.ath-datepicker-range-overlay');
      expect(overlay).not.toBeNull();

      document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      await page.waitForChanges();

      await new Promise(r => setTimeout(r, 350));

      overlay = page.root.shadowRoot.querySelector('.ath-datepicker-range-overlay');
      expect(overlay).toBeNull();

      const inst = page.rootInstance as any;
      expect(inst.open).toBe(false);
      expect(inst.renderOverlay).toBe(false);
    });

    it('updateDisabledDates should parse and set disabled dates correctly', async () => {
      const page = await testPage(`<ath-datepicker-range disabled-dates="['2025-01-01', '2025-01-02']"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['disabledDatesAux']).toHaveLength(2);
    });

    it('updateHighlightedDates should parse and set highlighted dates correctly', async () => {
      const page = await testPage(`<ath-datepicker-range highlighted-dates= "['2025-01-01', '2025-01-02']"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['highlightedDatesAux']).toHaveLength(2);
    });

    it('updateDisabledDates should handle invalid JSON gracefully', async () => {
      const page = await testPage(`<ath-datepicker-range disabled-dates="Invalid json"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['disabledDatesAux']).toEqual([]);
    });

    it('updateHighlightedDates should handle invalid JSON gracefully', async () => {
      const page = await testPage(`<ath-datepicker-range highlighted-dates="invalid json"></ath-datepicker-range>`);
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['highlightedDatesAux']).toEqual([]);
    });
  });

  describe('handles dates and types', () => {
    it('should handle input change for year type', async () => {
      const page = await testPage('<ath-datepicker-range type="year" value="[2025-05-05, 2025-05-05]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['valueFrom']).toEqual('2025-05-05');
      expect(inst.wrongDate).toBe(false);
    });

    it('should handle input change for month type', async () => {
      const page = await testPage('<ath-datepicker-range type="month" value="[2025-06-05, 2025-06-05]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['valueFrom']).toEqual('2025-06-05');
      expect(inst.wrongDate).toBe(false);
    });

    it('should handle regular date input change', async () => {
      const page = await testPage('<ath-datepicker-range value="[2025-06-01, null]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['valueFrom']).toBe('2025-06-01');
      expect(inst.wrongDate).toBe(false);
    });

    it('should not select an invalid date', async () => {
      const page = await testPage(`<ath-datepicker-range></ath-datepicker-range>`);
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

      input.focus();
      await page.waitForChanges();

      const selectedItem = page.root.shadowRoot.querySelector('.is-selected');
      expect(selectedItem).toBeFalsy();
    });
  });

  describe('input handling', () => {
    it('should handle deleteContentBackward', async () => {
      const page = await testPage('<ath-datepicker-range type="year"></ath-datepicker-range>');
      const input = page.root.shadowRoot.querySelector('input');
      input.value = '12/12/2025';

      const event = new Event('input') as any;
      event.inputType = 'deleteContentBackward';
      event.data = null;

      input.dispatchEvent(event);
      await page.waitForChanges();

      expect(page.rootInstance['inputValueFrom']).toBe('12/12/2025');
    });

    it('should handle year input type', async () => {
      const page = await testPage('<ath-datepicker-range type="year"></ath-datepicker-range>');
      const yearSpy = jest.spyOn(page.rootInstance as any, 'handleInputYear');

      const input = page.root.shadowRoot.querySelector('input');
      input.value = '2025';

      const event = new Event('input') as any;
      event.inputType = null;
      event.data = null;

      input.dispatchEvent(event);
      await page.waitForChanges();

      expect(yearSpy).toHaveBeenCalledWith(event, true);
    });

    it('should handle month input type', async () => {
      const page = await testPage('<ath-datepicker-range type="month"></ath-datepicker-range>');
      const input = page.root.shadowRoot.querySelector('input');
      const monthSpy = jest.spyOn(page.rootInstance as any, 'handleInputMonth');

      const event = new Event('input') as any;
      event.inputType = null;
      event.data = null;
      input.dispatchEvent(event);

      expect(monthSpy).toHaveBeenCalledWith(event, true);
    });

    it('should block non-numeric input', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const input = page.root.shadowRoot.querySelector('input');
      page.rootInstance.inputValueFrom = '10';

      const event = new Event('input', { bubbles: true }) as any;
      event.inputType = 'insertText';
      event.data = 'a';

      input.dispatchEvent(event);
      await page.waitForChanges();

      expect(input.value).toBe('10');
    });

    it('should format date input correctly', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const input = page.root.shadowRoot.querySelector('input');
      input.value = '1234';

      const event = new Event('input', { bubbles: true, composed: true }) as any;
      event.inputType = 'insertText';
      event.data = '4';

      input.dispatchEvent(event);

      await page.waitForChanges();
      expect(input.value).toBe('12/34');
    });
  });

  describe('navigation and buttons', () => {
    it('should handle previous button navigation', async () => {
      const page = await testPage('<ath-datepicker-range value="[2025-06-10, 2025-06-15]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst.shownDate.getFullYear()).toBe(2025);
      expect(inst.shownDate.getMonth()).toBe(5);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();

      const prevButton = page.root.shadowRoot.querySelector('.ath-button_comp') as HTMLElement;
      expect(prevButton).toBeTruthy();

      prevButton.click();

      await page.waitForChanges();

      expect(inst.shownDate.getMonth()).toBe(4);
      expect(ariaSpy).toHaveBeenCalledWith('Navegando a Mayo 2025');
    });

    it('should handle next button navigation', async () => {
      const page = await testPage('<ath-datepicker-range value="[2025-06-10, 2025-06-15]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst.shownDate.getFullYear()).toBe(2025);
      expect(inst.shownDate.getMonth()).toBe(5);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();

      const nextButton = page.root.shadowRoot.querySelector('.ath-button_comp[aria-label="Mes siguiente"]') as HTMLElement;
      expect(nextButton).toBeTruthy();

      nextButton.click();

      await page.waitForChanges();

      expect(inst.shownDate.getMonth()).toBe(6);
      expect(ariaSpy).toHaveBeenCalledWith('Navegando a Julio 2025');
    });

    it('should check if prev button is disabled', async () => {
      const spyCheckDisabled = jest.spyOn(utils, 'isDisabledDate');
      const page = await testPage('<ath-datepicker-range disabled-dates="[2025-05-05]" value="[2025-05-06, 2025-05-07]"></ath-datepicker-range>');
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const selectedStartDate = page.root.shadowRoot.querySelector('.is-selected') as HTMLElement;
      selectedStartDate.focus();
      await page.waitForChanges();

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', code: 'ArrowLeft', bubbles: true }));
      await page.waitForChanges();

      expect(spyCheckDisabled).toHaveBeenCalled();
    });

    it('should check if next button is disabled', async () => {
      const spyCheckDisabled = jest.spyOn(utils, 'isDisabledDate');
      const page = await testPage('<ath-datepicker-range disabled-dates="[2025-05-05]" value="[2025-05-04, 2025-05-04]"></ath-datepicker-range>');
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const selectedStartDate = page.root.shadowRoot.querySelector('.is-selected') as HTMLElement;
      selectedStartDate.focus();
      await page.waitForChanges();

      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', code: 'ArrowRight', bubbles: true }));
      await page.waitForChanges();

      expect(spyCheckDisabled).toHaveBeenCalled();
    });
  });

  describe('outside click and blur handling', () => {
    it('should handle outside click when overlay is closed', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      expect(inst['focusState']).toBe(DatepickerRangeFocusState.None);

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      expect(inst['focusState']).toBe(DatepickerRangeFocusState.Start);
      expect(inst['open']).toBe(true);

      const outside = document.createElement('div');
      document.body.appendChild(outside);

      const ev = new MouseEvent('mousedown', { bubbles: true, composed: true });
      (ev as any).composedPath = () => [outside, document.body, document, window];

      outside.dispatchEvent(ev);
      await page.waitForChanges();

      expect(inst['focusState']).toBe(DatepickerRangeFocusState.None);
      expect(inst['open']).toBe(false);
    });
  });

  describe('range shortcuts', () => {
    it('should handle last week shortcut', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range value="[2025-05-05, 2025-05-06]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar la última semana"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();

      expect(inst['valueFrom']).toBe('2025/04/28');
      expect(inst['valueTo']).toBe('2025/05/05');

      restoreGlobalDate();

      const spyDisabled = jest.spyOn(utils, 'isDisabledDate').mockReturnValue(true);
      const result = inst['isLastWeekDisabled']();
      expect(spyDisabled).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should handle last month shortcut', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último mes"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();

      expect(inst['valueFrom']).toBe('2025/04/05');
      expect(inst['valueTo']).toBe('2025/05/05');

      restoreGlobalDate();
    });

    it('should handle last quarter shortcut', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último trimestre"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();

      expect(inst['valueFrom']).toBe('2025/02/05');
      expect(inst['valueTo']).toBe('2025/05/05');

      restoreGlobalDate();
    });

    it('should handle last year shortcut', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último año"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();

      expect(inst['valueFrom']).toBe('2024/05/05');
      expect(inst['valueTo']).toBe('2025/05/05');

      restoreGlobalDate();
    });

    it('should check if last week is disabled', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range disabled-dates="[2025-04-29]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último mes"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();
      const spyDisabled = jest.spyOn(utils, 'isDisabledDate');
      const result = inst['isLastWeekDisabled']();
      expect(spyDisabled).toHaveBeenCalled();
      expect(result).toBe(true);
      restoreGlobalDate();
    });

    it('should check if last month is disabled', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range  disabled-dates="[2025-04-29]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último mes"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();
      const spyDisabled = jest.spyOn(utils, 'isDisabledDate');
      const result = inst['isLastMonthDisabled']();
      expect(spyDisabled).toHaveBeenCalled();
      expect(result).toBe(true);
      restoreGlobalDate();
    });

    it('should check if last quarter is disabled', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range disabled-dates="[2025-04-29]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último trimestre"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();
      const spyDisabled = jest.spyOn(utils, 'isDisabledDate');
      const result = inst['isLastQuarterDisabled']();
      expect(spyDisabled).toHaveBeenCalled();
      expect(result).toBe(true);
      restoreGlobalDate();
    });

    it('should check if last year is disabled', async () => {
      mockGlobalDate('2025-05-05T12:00:00Z');
      const page = await testPage('<ath-datepicker-range disabled-dates="[2025-04-29]"></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const lastWeekButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Seleccionar el último año"]') as HTMLElement;
      lastWeekButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));

      await page.waitForChanges();
      const spyDisabled = jest.spyOn(utils, 'isDisabledDate');
      const result = inst['isLastYearDisabled']();
      expect(spyDisabled).toHaveBeenCalled();
      expect(result).toBe(true);
      restoreGlobalDate();
    });

    it('should handle today shortcut', async () => {
      const mockedToday = '2025-05-05T12:00:00Z';
      mockGlobalDate(mockedToday);
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      const input = page.root.shadowRoot.querySelector('input');
      input.focus();
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', code: 'ArrowDown', bubbles: true }));
      await page.waitForChanges();

      const prevButton = page.root.shadowRoot.querySelector('button') as HTMLElement;
      prevButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));
      await page.waitForChanges();

      const todayButton = page.root.shadowRoot.querySelector('ath-button-link[aria-label="Ir a hoy"]') as HTMLElement;
      todayButton.dispatchEvent(new CustomEvent('athClick', { bubbles: true, composed: true }));
      await page.waitForChanges();

      expect(inst.shownDate.getTime()).toBe(new Date(mockedToday).getTime());

      expect(inst.showType).toBe(inst.type);
      restoreGlobalDate();
    });
  });

  describe('keyboard interactions', () => {
    it('should handle enter key with submitOnEnter', async () => {
      const page = await testPage('<ath-datepicker-range submit-on-enter></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      inst.internals = { form: { requestSubmit: jest.fn() } } as any;

      const input = page.root.shadowRoot.querySelector('input') as HTMLInputElement;
      input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', code: 'Enter', bubbles: true }));
      await page.waitForChanges();

      expect(inst.internals.form.requestSubmit).toHaveBeenCalled();
    });
  });

  describe('focus management', () => {
    it('should set focus on start input', async () => {
      const page = await testPage('<ath-datepicker-range autofocus></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const spySetFocusStart = jest.spyOn(inst, 'setFocus');

      expect(spySetFocusStart).toHaveBeenCalled();
    });

    it('should set focus on end input', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;
      const spySetFocusEnd = jest.spyOn(inst, 'setFocusEnd');

      await inst.setFocusEnd();

      expect(spySetFocusEnd).toHaveBeenCalled();
    });

    it('should handle input focus for start input', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      const athFocusSpy = jest.spyOn(inst.athFocus, 'emit');
      inst['handleInputFocus'](true);

      expect(inst['focusState']).toBe(DatepickerRangeFocusState.Start);
      expect(athFocusSpy).toHaveBeenCalled();
    });

    it('should handle input focus for end input', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      const athFocusSpy = jest.spyOn(inst.athFocus, 'emit');
      inst['handleInputFocus'](false);

      expect(inst['focusState']).toBe(DatepickerRangeFocusState.End);
      expect(athFocusSpy).toHaveBeenCalled();
    });
  });

  describe('utility methods', () => {
    it('should get max length for different types', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      inst.type = DatepickerRangeTypes.Year;
      expect(inst['getMaxLength']()).toBe(4);

      inst.type = DatepickerRangeTypes.Month;
      expect(inst['getMaxLength']()).toBe(7);

      inst.type = DatepickerRangeTypes.Date;
      expect(inst['getMaxLength']()).toBe(inst.format.length);
    });

    it('should set aria live message', async () => {
      const page = await testPage('<ath-datepicker-range></ath-datepicker-range>');
      const inst = page.rootInstance as AthDatepickerRange;

      inst['setAriaLiveMessage']('Test message');
      expect(inst.ariaLiveMessage).toBe('Test message');

      await new Promise(resolve => setTimeout(resolve, 2100));
      expect(inst.ariaLiveMessage).toBe('');
    });
  });
});
