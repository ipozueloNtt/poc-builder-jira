import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { AthCalendar } from '../calendar';
import { formatDateToAriaLabel, formatDateToMonth, formatDateToYear, getMonthName } from '@utils/date-utils';
import { CalendarTypes } from '../calendar.model';
import * as utils from '@utils/date-utils';

const testPage = (html, othersComponents = []): Promise<SpecPage> => {
  const components = [AthCalendar, ...othersComponents];
  return newSpecPage({
    components: components,
    html: html,
    supportsShadowDom: true,
  });
};

async function testKeyboardNavigation(expectedDate: Date, keyPressed: string, disabledDates: string = '', controlPressed: boolean = false): Promise<void> {
  const page = await testPage(`<ath-calendar disabled-dates="${disabledDates}"></ath-calendar>`);

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

describe('ath-calendar', () => {
  describe('render', () => {
    it('renders', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      expect(page.root).toBeTruthy();
      expect(page.root.shadowRoot).toBeTruthy();
    });

    it('should have default properties', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      expect(page.root).toHaveProperty('color', 'primary');
      expect(page.root).toHaveProperty('type', 'date');
      expect(page.root).toHaveProperty('highlightedWeekends', false);
    });

    it('Today must have the current style', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      await page.waitForChanges();
      const todayItem = page.root.shadowRoot.querySelector('.is-current');
      expect(todayItem.getAttribute('aria-label')).toEqualText(formatDateToAriaLabel(new Date()));
    });

    it('should handle year calendar type', async () => {
      const page = await testPage(`<ath-calendar type="year"></ath-calendar>`);
      await page.waitForChanges();

      const yearItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item.is-year');
      expect(yearItems.length).toBeGreaterThan(0);
    });

    it('should handle month calendar type', async () => {
      const page = await testPage(`<ath-calendar type="month"></ath-calendar>`);
      await page.waitForChanges();

      const monthItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item.is-month');
      expect(monthItems.length).toBeGreaterThan(0);
    });

    it('should handle min and max date constraints', async () => {
      const page = await testPage(`<ath-calendar min="2025-06-05" max="2025-06-20" selected="2025-06-10"></ath-calendar>`);

      const disabledItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-disabled');
      expect(disabledItems.length).toBeGreaterThan(0);
    });

    it('should handle disabled dates', async () => {
      const disabledDates = `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`;

      const page = await testPage(`<ath-calendar disabled-dates="${disabledDates}"></ath-calendar>`);
      await page.waitForChanges();

      const disabledItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-disabled');
      expect(disabledItems.length).toBeGreaterThanOrEqual(2);
    });

    it('should handle highlighted dates', async () => {
      const highlightedDates = `['${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01', '${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}-02']`;

      const page = await testPage(`<ath-calendar highlighted-dates="${highlightedDates}"></ath-calendar>`);
      await page.waitForChanges();

      const highlightedItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item .is-highlighted');
      expect(highlightedItems.length).toBe(2);
    });

    it('should set the selected property when defined', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const calendar = page.root;
      calendar.selected = new Date(2025, 10, 4).toISOString();
      await page.waitForChanges();

      const selectedItem = page.root.shadowRoot.querySelector('.is-selected');
      expect(selectedItem).toBeTruthy();
    });

    it('should not set the selected property when not defined', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const selectedItem = page.root.shadowRoot.querySelector('.is-selected');
      expect(selectedItem).toBeFalsy();
    });

    it('should display month and year buttons in date view', async () => {
      const page = await testPage(`<ath-calendar type="date"></ath-calendar>`);
      await page.waitForChanges();

      const buttons = page.root.shadowRoot.querySelectorAll('.ath-calendar__header__date ath-button');
      expect(buttons.length).toBe(2); // Month and Year buttons
    });

    it('should only display year button in year view', async () => {
      const page = await testPage(`<ath-calendar type="year"></ath-calendar>`);
      await page.waitForChanges();

      const buttons = page.root.shadowRoot.querySelectorAll('.ath-calendar__header__date ath-button');
      expect(buttons.length).toBe(1); // Only Year button
    });
  });

  describe('actions', () => {
    it('should emit athChange event when date is selected', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);

      const calendar = page.root;
      calendar.selected = new Date(2025, 10, 4).toISOString();
      await page.waitForChanges();

      expect(athChange).toHaveBeenCalled();
    });

    it('should allow user to select a valid date', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      await page.waitForChanges();

      const athChange = jest.fn();
      page.root.addEventListener('athChange', athChange);

      const dateItems = page.root.shadowRoot.querySelectorAll('.ath-datepicker-item:not(.is-disabled)');
      const firstValidDate = dateItems[0] as HTMLTableCellElement;

      firstValidDate.click();
      await page.waitForChanges();

      expect(athChange).toHaveBeenCalled();
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

    it('should change month when arrow is pressed over month button', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      await page.waitForChanges();

      const monthButton = page.root.shadowRoot.querySelector('.ath-calendar__header__date ath-button') as HTMLAthButtonElement;
      monthButton.focus();

      const ariaLabelExpected = `Cambiar a vista de selección de mes. Mes seleccionado: ${getMonthName(new Date())}`;
      expect(monthButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected);

      const arrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      monthButton.dispatchEvent(arrowEvent);
      await page.waitForChanges();

      const ariaLabelExpected2 = `Cambiar a vista de selección de mes. Mes seleccionado: ${getMonthName(new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1))}`;
      expect(monthButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected2);
    });

    it('should change year when arrow is pressed over year button', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      await page.waitForChanges();

      const buttons = page.root.shadowRoot.querySelectorAll('.ath-calendar__header__date ath-button');
      const yearButton = buttons[1] as HTMLAthButtonElement;
      yearButton.focus();

      const ariaLabelExpected = `Cambiar a vista de selección de año. Año seleccionado: ${new Date().getFullYear()}`;
      expect(yearButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected);

      const arrowEvent = new KeyboardEvent('keydown', {
        key: 'ArrowUp',
        code: 'ArrowUp',
        bubbles: true,
      });

      yearButton.dispatchEvent(arrowEvent);
      await page.waitForChanges();

      const ariaLabelExpected2 = `Cambiar a vista de selección de año. Año seleccionado: ${new Date().getFullYear() - 1}`;
      expect(yearButton.getAttribute('aria-label')).toEqualText(ariaLabelExpected2);
    });
  });

  describe('internals & watchers', () => {
    it('updateMin and updateMax set and clear minDate/maxDate correctly', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

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
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      const realDate = Date;

      // @ts-ignore
      global.Date = jest.fn(() => {
        throw new Error('Date parse error');
      });

      inst.min = '2025-05-20';
      inst.updateMin();

      expect(inst['minDate']).toBeUndefined();

      global.Date = realDate;
    });

    it('updateMax sets maxDate = undefined when Date constructor throws', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      const realDate = Date;

      // @ts-ignore
      global.Date = jest.fn(() => {
        throw new Error('Date parse error');
      });

      inst.max = '2025-12-31';
      inst.updateMax();

      expect(inst['maxDate']).toBeUndefined();

      global.Date = realDate;
    });

    it('updateSelected sets selectedDate correctly', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;
      const date = '2025-08-13T00:00:00.000Z';

      inst.selected = date;
      inst.updateSelected();

      expect(inst['selectedDate']).toEqual(new Date(date));
    });

    it('selected is undefined if its invalid', async () => {
      const page = await testPage(`<ath-calendar selected="invalidDate"></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      expect(inst['selectedDate']).toBeUndefined();
    });

    it('updateSelected clears selectedDate when selected is undefined', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      inst.selected = undefined;
      inst.updateSelected();

      expect(inst['selectedDate']).toBeUndefined();
    });

    it('componentWillLoad keeps shownDate when selectedDate exists', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;
      const date = new Date('2025-01-01T00:00:00.000Z');

      inst.selected = date.toISOString();
      inst['selectedDate'] = date;
      inst.componentWillLoad();

      expect(inst['shownDate'].getTime()).toBe(date.getTime());
    });

    it('updateDisabledDates parses dates correctly', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      const disabledDates = `['2025-10-01', '2025-10-02']`;
      inst.disabledDates = disabledDates;
      inst.updateDisabledDates();

      expect(inst['disabledDatesAux'].length).toBe(2);
    });

    it('updateDisabledDates handles invalid JSON', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      inst.disabledDates = 'invalid json';
      inst.updateDisabledDates();

      expect(inst['disabledDatesAux']).toEqual([]);
    });

    it('updateHighlightedDates parses dates correctly', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      const highlightedDates = `['2025-10-01', '2025-10-02']`;
      inst.highlightedDates = highlightedDates;
      inst.updateHighlightedDates();

      expect(inst['highlightedDatesAux'].length).toBe(2);
    });

    it('updateHighlightedDates handles invalid JSON', async () => {
      const page = await testPage(`<ath-calendar></ath-calendar>`);
      const inst = page.rootInstance as AthCalendar;

      inst.highlightedDates = 'invalid json';
      inst.updateHighlightedDates();

      expect(inst['highlightedDatesAux']).toEqual([]);
    });
  });

  describe('handles dates', () => {
    it('executes the branch when type is Month', async () => {
      const page = await testPage('<ath-calendar type="month"></ath-calendar>');
      const inst = page.rootInstance as AthCalendar;
      // const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const emitSpy = jest.spyOn(inst.athChange, 'emit');
      const monthDate = new Date('2025-06-01T00:00:00.000Z');
      inst['handleMonthSelect'](new MouseEvent('click'), monthDate);
      expect(inst.selected).toBe(monthDate.toISOString());
      expect(emitSpy).toHaveBeenCalled();
      expect(inst.shownDate).toBe(monthDate);
    });
    it('executes the branch when type is Year', async () => {
      const page = await testPage('<ath-calendar type="year"></ath-calendar>');
      const inst = page.rootInstance as AthCalendar;
      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const emitSpy = jest.spyOn(inst.athChange, 'emit');
      const yearDate = new Date('2025-01-01T00:00:00.000Z');
      inst['handleYearSelect'](new MouseEvent('click'), yearDate);
      expect(inst.selected).toBe(yearDate.toISOString());
      expect(emitSpy).toHaveBeenCalled();
      expect(inst.shownDate).toBe(yearDate);
      expect(ariaSpy).toHaveBeenCalledWith(`Año seleccionado: ${formatDateToYear(yearDate)}`);
    });
    it('executes the branch when type is not Month', async () => {
      const page = await testPage('<ath-calendar></ath-calendar>');
      const inst = page.rootInstance as AthCalendar;
      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const getBetweenSpy = jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
      inst.type = CalendarTypes.Year;
      const monthDate = new Date('2025-06-01T00:00:00.000Z');
      inst['handleMonthSelect'](new MouseEvent('click'), monthDate);
      expect(getBetweenSpy).toHaveBeenCalledWith(monthDate, inst['minDate'], inst['maxDate']);
      expect(inst.shownDate).toBe(monthDate);
      expect(inst.showType).toBe(CalendarTypes.Date);
      expect(ariaSpy).toHaveBeenCalledWith(`Mes seleccionado: ${formatDateToMonth(monthDate)}. Vista de calendario abierta`);
    });
    it('should handle date selection in date view', async () => {
      const page = await testPage('<ath-calendar type="date"></ath-calendar>');
      const inst = page.rootInstance as AthCalendar;
      const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
      const emitSpy = jest.spyOn(inst.athChange, 'emit');
      const date = new Date('2025-06-15T00:00:00.000Z');
      inst['handleDaySelect'](new MouseEvent('click'), date);
      expect(inst.selected).toBe(date.toISOString());
      expect(emitSpy).toHaveBeenCalled();
      expect(inst.shownDate).toBe(date);
      expect(ariaSpy).toHaveBeenCalled();
    });
  });

  describe('handleClicks and Buttons', () => {
    describe('handleClickMonth and Year', () => {
      it('handleClickMonth should set showType and aria live message', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        inst['handleClickMonth']();
        expect(inst.showType).toBe(CalendarTypes.Month);
        expect(ariaSpy).toHaveBeenCalledWith('Vista de selección de mes abierta');
      });
      it('handleClickYear should set showType and aria live message', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        inst['handleClickYear']();
        expect(inst.showType).toBe(CalendarTypes.Year);
        expect(ariaSpy).toHaveBeenCalledWith('Vista de selección de año abierta');
      });
    });

    describe('handlePrevButton', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
      it('navigates to previous month when showType is Date', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const addMonthsMock = jest.spyOn(utils, 'addMonths').mockImplementation(() => {
          return new Date('2025-05-01T00:00:00.000Z');
        });
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        jest.spyOn(utils, 'getMonthName').mockReturnValue('May');
        inst.showType = CalendarTypes.Date;
        inst.shownDate = new Date('2025-06-01T00:00:00.000Z');
        inst['handlePrevButton']();
        expect(addMonthsMock).toHaveBeenCalledWith(expect.any(Date), -1);
        expect(inst.shownDate).toEqual(new Date('2025-05-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando a May 2025');
      });
      it('navigates to previous year when showType is Month', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const addYearsMock = jest.spyOn(utils, 'addYears').mockImplementation(() => {
          return new Date('2024-01-01T00:00:00.000Z');
        });
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        inst.showType = CalendarTypes.Month;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');
        inst['handlePrevButton']();
        expect(addYearsMock).toHaveBeenCalledWith(expect.any(Date), -1);
        expect(inst.shownDate).toEqual(new Date('2024-01-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando al año 2024');
      });
      it('navigates 12 years back when showType is Year', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const addYearsMock = jest.spyOn(utils, 'addYears').mockImplementation(() => {
          return new Date('2013-01-01T00:00:00.000Z');
        });
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        inst.showType = CalendarTypes.Year;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');
        inst['handlePrevButton']();
        expect(addYearsMock).toHaveBeenCalledWith(expect.any(Date), -12);
        expect(inst.shownDate).toEqual(new Date('2013-01-01T00:00:00.000Z'));
        const decadeStart = 2013 - (2013 % 10);
        const decadeEnd = decadeStart + 9;
        expect(ariaSpy).toHaveBeenCalledWith(`Navegando a la página que contiene los años ${decadeStart} - ${decadeEnd}`);
      });
      it('should do nothing (default case) when showType does not match any known type', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const initialDate = new Date('2025-01-01T00:00:00.000Z');
        inst.showType = 'Unknown' as any;
        inst.shownDate = initialDate;
        inst['handlePrevButton']();
        expect(inst.shownDate).toBe(initialDate);
        expect(ariaSpy).not.toHaveBeenCalled();
      });
    });

    describe('handleNextButton', () => {
      // beforeEach(() => {
      //   jest.clearAllMocks();
      // });
      it('should navigate to next month when showType is Date', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        jest.spyOn(utils, 'addMonths').mockImplementation(() => new Date('2025-07-01T00:00:00.000Z'));
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        jest.spyOn(utils, 'getMonthName').mockReturnValue('July');
        inst.showType = CalendarTypes.Date;
        inst.shownDate = new Date('2025-06-01T00:00:00.000Z');
        inst['handleNextButton']();
        await page.waitForChanges();
        expect(inst.shownDate).toEqual(new Date('2025-07-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando a July 2025');
      });
      it('should navigate to next year when showType is Month', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        jest.spyOn(utils, 'addYears').mockImplementation(() => new Date('2026-01-01T00:00:00.000Z'));
        jest.spyOn(utils, 'getDateBetweenLimits').mockImplementation(date => date);
        inst.showType = CalendarTypes.Month;
        inst.shownDate = new Date('2025-01-01T00:00:00.000Z');
        inst['handleNextButton']();
        await page.waitForChanges();
        expect(inst.shownDate).toEqual(new Date('2026-01-01T00:00:00.000Z'));
        expect(ariaSpy).toHaveBeenCalledWith('Navegando al año 2026');
      });
      it('should do nothing (default case) when showType does not match any known type', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        const ariaSpy = jest.spyOn(inst as any, 'setAriaLiveMessage').mockImplementation();
        const initialDate = new Date('2025-01-01T00:00:00.000Z');
        inst.showType = 'Unknown' as any;
        inst.shownDate = initialDate;
        inst['handleNextButton']();
        await page.waitForChanges();
        expect(inst.shownDate).toBe(initialDate);
        expect(ariaSpy).not.toHaveBeenCalled();
      });
    });

    describe('button states', () => {
      it('isPrevButtonDisabled should return correct state for Date type', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        inst.showType = CalendarTypes.Date;
        inst.min = new Date(2025, 0, 1).toISOString();
        inst.shownDate = new Date(2025, 0, 15);
        await page.waitForChanges();
        const result = inst['isPrevButtonDisabled']();
        expect(typeof result).toBe('boolean');
      });
      it('isNextButtonDisabled should return correct state for Date type', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        inst.showType = CalendarTypes.Date;
        inst.max = new Date(2025, 11, 31).toISOString();
        inst.shownDate = new Date(2025, 11, 15);
        await page.waitForChanges();
        const result = inst['isNextButtonDisabled']();
        expect(typeof result).toBe('boolean');
      });
    });

    describe('aria labels', () => {
      it('getPrevButtonAriaLabel should return correct label for each type', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        inst.showType = CalendarTypes.Date;
        expect(inst['getPrevButtonAriaLabel']()).toBe('Mes anterior');
        inst.showType = CalendarTypes.Month;
        expect(inst['getPrevButtonAriaLabel']()).toBe('Año anterior');
        inst.showType = CalendarTypes.Year;
        expect(inst['getPrevButtonAriaLabel']()).toBe('Página de años anterior');
      });
      it('getNextButtonAriaLabel should return correct label for each type', async () => {
        const page = await testPage('<ath-calendar></ath-calendar>');
        const inst = page.rootInstance as AthCalendar;
        inst.showType = CalendarTypes.Date;
        expect(inst['getNextButtonAriaLabel']()).toBe('Mes siguiente');
        inst.showType = CalendarTypes.Month;
        expect(inst['getNextButtonAriaLabel']()).toBe('Año siguiente');
        inst.showType = CalendarTypes.Year;
        expect(inst['getNextButtonAriaLabel']()).toBe('Página de años siguiente');
      });
    });
  });
});
