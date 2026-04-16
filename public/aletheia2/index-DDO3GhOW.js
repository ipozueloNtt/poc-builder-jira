import { h } from './index-Bf9CG7gQ.js';

var WeekDays;
(function (WeekDays) {
    WeekDays[WeekDays["Sunday"] = 0] = "Sunday";
    WeekDays[WeekDays["Monday"] = 1] = "Monday";
    WeekDays[WeekDays["Tuesday"] = 2] = "Tuesday";
    WeekDays[WeekDays["Wednesday"] = 3] = "Wednesday";
    WeekDays[WeekDays["Thursday"] = 4] = "Thursday";
    WeekDays[WeekDays["Friday"] = 5] = "Friday";
    WeekDays[WeekDays["Saturday"] = 6] = "Saturday";
})(WeekDays || (WeekDays = {}));
var WeekDaysInitials;
(function (WeekDaysInitials) {
    WeekDaysInitials["Sunday"] = "D";
    WeekDaysInitials["Monday"] = "L";
    WeekDaysInitials["Tuesday"] = "M";
    WeekDaysInitials["Wednesday"] = "X";
    WeekDaysInitials["Thursday"] = "J";
    WeekDaysInitials["Friday"] = "V";
    WeekDaysInitials["Saturday"] = "S";
})(WeekDaysInitials || (WeekDaysInitials = {}));
function getWeekDaysInitials(firstWeekDay = WeekDays.Monday) {
    const weekDaysInitials = Object.values(WeekDaysInitials);
    return [...weekDaysInitials.slice(firstWeekDay), ...weekDaysInitials.slice(0, firstWeekDay)];
}
var WeekDaysNames;
(function (WeekDaysNames) {
    WeekDaysNames["D"] = "Domingo";
    WeekDaysNames["L"] = "Lunes";
    WeekDaysNames["M"] = "Martes";
    WeekDaysNames["X"] = "Mi\u00E9rcoles";
    WeekDaysNames["J"] = "Jueves";
    WeekDaysNames["V"] = "Viernes";
    WeekDaysNames["S"] = "S\u00E1bado";
})(WeekDaysNames || (WeekDaysNames = {}));
function getWeekDaysNamesFromInitials(initial) {
    return WeekDaysNames[initial];
}
function getWeekDaysNamesFromDate(date) {
    const DAY_NAMES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    if (!date || isNaN(date.getTime())) {
        throw new Error('Invalid date provided');
    }
    return DAY_NAMES[date.getDay()];
}
function weekStart(date, firstDayOfWeek = WeekDays.Monday) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day < firstDayOfWeek ? 7 : 0) + day - firstDayOfWeek;
    d.setDate(d.getDate() - diff);
    return d;
}
function monthStart(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function yearStart(date) {
    return new Date(date.getFullYear(), 0, 1);
}
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(date.getDate() + days);
    return result;
}
function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(date.getMonth() + months);
    return result;
}
function addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(date.getFullYear() + years);
    return result;
}
function getMonthName(date) {
    try {
        const options = { month: 'long' };
        const monthName = new Intl.DateTimeFormat('es-ES', options).format(date);
        // Capitalize the first letter
        return monthName.charAt(0).toUpperCase() + monthName.slice(1);
    }
    catch (e) {
        console.error('Error getting month name:', date, e);
    }
}
function getMonthNameShort(date) {
    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'short' }).format(date);
    return monthName.toUpperCase().slice(0, 3); // Return the first 3 letters in uppercase
}
function getWeeks(refDate, firstDayOfWeek = WeekDays.Monday, numberofWeeks = undefined) {
    const weeks = [];
    const firstDayOfTheMonth = new Date(refDate.getFullYear(), refDate.getMonth(), 1);
    let refDay = weekStart(firstDayOfTheMonth, firstDayOfWeek);
    if (numberofWeeks) {
        for (let i = 0; i < numberofWeeks; i++) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push(addDays(refDay, i));
            }
            weeks.push(week);
            refDay = addDays(refDay, 7);
        }
    }
    else {
        const currentMonth = refDate.getMonth();
        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        while (refDay.getMonth() === currentMonth || refDay.getMonth() === prevMonth) {
            const week = [];
            for (let i = 0; i < 7; i++) {
                week.push(addDays(refDay, i));
            }
            weeks.push(week);
            refDay = addDays(refDay, 7);
        }
    }
    return weeks;
}
function compareDates(date1, date2) {
    if (!date1 || !date2) {
        return false;
    }
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1.getTime() === d2.getTime();
}
function compareMonths(month1, month2) {
    if (!month1 || !month2) {
        return false;
    }
    const m1 = new Date(month1.getFullYear(), month1.getMonth(), 1);
    const m2 = new Date(month2.getFullYear(), month2.getMonth(), 1);
    return m1.getTime() === m2.getTime();
}
function compareYears(year1, year2) {
    if (!year1 || !year2) {
        return false;
    }
    const y1 = new Date(year1.getFullYear(), 0, 1);
    const y2 = new Date(year2.getFullYear(), 0, 1);
    return y1.getTime() === y2.getTime();
}
function isCompleteMonth(month, collection, min = null, max = null) {
    if (!month) {
        return false;
    }
    let startMonth = monthStart(month);
    const endMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    if (min && endMonth < min) {
        return true;
    }
    if (max && startMonth > max) {
        return true;
    }
    if (!collection || collection.length === 0) {
        return false;
    }
    while (compareMonths(month, startMonth)) {
        if (!collection.some(d => compareDates(d, startMonth)) && !(min && startMonth < min) && !(max && startMonth > max)) {
            return false;
        }
        startMonth = addDays(startMonth, 1);
    }
    return true;
}
function isCompleteYear(year, collection, min = null, max = null) {
    if (!year) {
        return false;
    }
    let startYear = yearStart(year);
    const endYear = new Date(year.getFullYear(), 11, 31);
    if (min && endYear < min) {
        return true;
    }
    if (max && startYear > max) {
        return true;
    }
    if (!collection || collection.length === 0) {
        return false;
    }
    while (compareYears(year, startYear)) {
        if (!collection.some(d => compareDates(d, startYear)) && !(min && startYear < min) && !(max && startYear > max)) {
            return false;
        }
        startYear = addDays(startYear, 1);
    }
    return true;
}
/**
 * Parses a date string according to the specified format and returns a Date object
 * @param dateStr The date string to parse
 * @param format The format of the date string (e.g., 'DD/MM/YYYY')
 * @returns A Date object representing the parsed date
 * @throws Error if the date string doesn't match the format or is invalid
 */
function formatDate(dateStr, format) {
    if (!dateStr || !format) {
        throw new Error('Date string and format are required');
    }
    // Split the format and date strings into parts
    const formatDelimiters = format.match(/[^A-Za-z0-9]/g) || ['/'];
    const dateDelimiters = dateStr.match(/[^0-9]/g) || formatDelimiters;
    // Create regex patterns for splitting both strings
    const formatRegex = new RegExp(`[${formatDelimiters.join('')}]`);
    const dateRegex = new RegExp(`[${dateDelimiters.join('')}]`);
    const formatParts = format.split(formatRegex);
    const dateParts = dateStr.split(dateRegex);
    if (formatParts.length !== dateParts.length) {
        throw new Error('Date string does not match the specified format');
    }
    let day = 1, month = 0, year = new Date().getFullYear();
    // Map each part of the date to its corresponding component
    formatParts.forEach((part, index) => {
        if (index < dateParts.length && dateParts[index]) {
            const value = parseInt(dateParts[index], 10);
            if (isNaN(value)) {
                throw new Error(`Invalid numeric value in date string: ${dateParts[index]}`);
            }
            const formatPart = part.toLowerCase();
            if (formatPart.startsWith('d')) {
                day = value;
            }
            else if (formatPart.startsWith('m')) {
                month = value - 1; // JavaScript months are 0-indexed
            }
            else if (formatPart.startsWith('y') || formatPart.startsWith('a')) {
                year = value;
                if (formatPart.length === 2 && dateParts[index].length <= 2) {
                    year = value + (value < 50 ? 2000 : 1900);
                }
            }
        }
    });
    const parsedDate = new Date(year, month, day);
    // Check if the date is valid and matches the input
    if (isNaN(parsedDate.getTime()) || parsedDate.getFullYear() !== year || parsedDate.getMonth() !== month || parsedDate.getDate() !== day) {
        throw new Error('Invalid date');
    }
    return parsedDate;
}
/**
 * Formats a Date object into a string according to the specified format
 * @param date The Date object to format
 * @param format The desired format (e.g., 'DD/MM/YYYY')
 * @returns A formatted date string
 */
function formatDateToString(date, format) {
    if (!date || isNaN(date.getTime())) {
        throw new Error('Invalid date object');
    }
    if (!format) {
        throw new Error('Format string is required');
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    let result = format;
    if (result.includes('YYYY')) {
        result = result.replace('YYYY', year.toString().padStart(4, '0'));
    }
    else if (result.includes('YY')) {
        result = result.replace('YY', (year % 100).toString().padStart(2, '0'));
    }
    if (result.includes('MM')) {
        result = result.replace('MM', month.toString().padStart(2, '0'));
    }
    else if (result.includes('M')) {
        result = result.replace('M', month.toString());
    }
    if (result.includes('DD')) {
        result = result.replace('DD', day.toString().padStart(2, '0'));
    }
    else if (result.includes('D')) {
        result = result.replace('D', day.toString());
    }
    return result;
}
function formatDateToISO(date) {
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    return `${date.getFullYear()}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
}
function formatDateToAriaLabel(date, type = 'day') {
    switch (type) {
        case 'month':
            return `${getMonthName(date)}, ${date.getFullYear()}`;
        case 'year':
            return `${date.getFullYear()}`;
        default:
            return `${getWeekDaysNamesFromDate(date)}, ${date.getDate()} de ${getMonthName(date)}, ${date.getFullYear()}`;
    }
}
function formatDateToMonth(date) {
    return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
}
function formatDateToYear(date) {
    return date.getFullYear().toString();
}
function isDisabledDate(day, disabledDates, minDate = null, maxDate = null) {
    return (disabledDates?.some(d => d.toDateString() === day.toDateString()) ||
        (minDate != undefined && day < new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate())) ||
        (maxDate != undefined && day > new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate())));
}
function getDateBetweenLimits(date, min = null, max = null) {
    if (!date) {
        return null;
    }
    if (min && date < min) {
        return min;
    }
    if (max && date > max) {
        return max;
    }
    return date;
}
function findNextValidDay(date, disabledDates, min = null, max = null) {
    if (!date) {
        return null;
    }
    if ((!disabledDates || disabledDates.length === 0) && !min && !max) {
        return date;
    }
    let nextDate = new Date(date);
    while (!max || nextDate <= max) {
        if (!isDisabledDate(nextDate, disabledDates, min, max)) {
            return nextDate;
        }
        if (max && nextDate > max) {
            return max;
        }
        nextDate.setDate(nextDate.getDate() + 1);
    }
    return null;
}
function findPrevValidDay(date, disabledDates, min = null, max = null) {
    if (!date) {
        return null;
    }
    if ((!disabledDates || disabledDates.length === 0) && !min && !max) {
        return date;
    }
    let prevDate = new Date(date);
    while (!min || prevDate >= min) {
        if (!isDisabledDate(prevDate, disabledDates, min, max)) {
            return prevDate;
        }
        if (min && prevDate < min) {
            return min;
        }
        prevDate.setDate(prevDate.getDate() - 1);
    }
    return null;
}
function isValidRange(startRange, endRange, disabledDates, min = null, max = null) {
    if (!startRange || !endRange || (min && startRange < min) || (max && endRange > max)) {
        return false;
    }
    if (disabledDates && disabledDates.length > 0) {
        return !disabledDates.some(disabledDate => disabledDate >= startRange && disabledDate <= endRange);
    }
    return true;
}
function getValueRangeObject(valueFrom, valueTo) {
    return {
        start: valueFrom,
        end: valueTo,
    };
}
function getValueRangeString(valueFrom, valueTo) {
    return `['${valueFrom ?? ''}','${valueTo ?? ''}']`;
}
function getSROnlyHelperText() {
    return 'Presiona flecha abajo para abrir el calendario y Escape para cerrarlo.';
}

const getContainerClasses = props => ({
    'ath-datepicker-item': true,
    [`is-selected`]: props.isSelected ?? false,
    [`is-start`]: props.isStart ?? false,
    [`is-middle`]: (!props.isStart && !props.isEnd && props.isMiddle) ?? false,
    [`is-end`]: props.isEnd ?? false,
    [`is-day`]: props.type === 'day',
    [`is-month`]: props.type === 'month',
    [`is-year`]: props.type === 'year',
    [`is-current`]: props.isCurrent ?? false,
    [`is-accent`]: props.color ? props.color === 'accent' : false,
});
const getItemClasses = props => ({
    'ath-datepicker-item-content': true,
    [`is-other-month`]: props.isOtherMonth ?? false,
    [`is-selected`]: (props.isSelected || props.isStart || props.isEnd) ?? false,
    [`is-current`]: props.isCurrent ?? false,
    [`is-disabled`]: props.isDisabled ?? false,
    [`is-highlighted`]: (props.isHighlighted && !props.isMiddle) ?? false,
    [`is-accent`]: props.color ? props.color === 'accent' : false,
});
const FcDatepickerItem = props => {
    function handleClick(e) {
        if (props.isDisabled) {
            e.stopPropagation();
            return;
        }
        props.onSelect(e, props.value);
    }
    function getAriaLabel() {
        let aria = formatDateToAriaLabel(props.value, props.type);
        if (props.isDisabled) {
            aria += '. Use control + flechas para desplazarse al siguiente día disponible.';
        }
        return aria;
    }
    return (h("td", { ref: el => props.onDatepickerItemRef(el), class: getContainerClasses(props), tabIndex: props.isFocusable ? 0 : -1, onClick: handleClick, onKeyDown: props.onKeyDown, "aria-label": getAriaLabel(), "aria-selected": props.isSelected || props.isStart || props.isEnd ? 'true' : 'false', "aria-current": props.isCurrent ? 'date' : undefined, "aria-disabled": props.isDisabled ? 'true' : 'false' }, h("span", { class: getItemClasses(props) }, props.text)));
};

const FcCalendar = props => {
    const referenceDate = props.shownDate || props.selectedDate || props.selectedRangeStart || new Date();
    function onKeyDown(key, day) {
        let nextDate = null;
        let isNext = true;
        switch (key.code) {
            case 'ArrowDown':
                nextDate = addDays(day, 7);
                isNext = true;
                break;
            case 'ArrowUp':
                nextDate = addDays(day, -7);
                isNext = false;
                break;
            case 'ArrowLeft':
                nextDate = addDays(day, -1);
                isNext = false;
                break;
            case 'ArrowRight':
                nextDate = addDays(day, 1);
                isNext = true;
                break;
            case 'Enter':
            case 'Space':
                key.stopPropagation();
                key.preventDefault();
                if (!isDisabledDate(day, props.disabledDate || [], props.minDate, props.maxDate)) {
                    props.onDateSelect(null, day);
                }
                return;
            case 'Home':
                nextDate = weekStart(day);
                isNext = true;
                break;
            case 'End':
                nextDate = addDays(weekStart(day), 6);
                isNext = false;
                break;
            case 'PageUp':
                nextDate = new Date(day.getFullYear(), day.getMonth() - 1, day.getDate());
                isNext = false;
                break;
            case 'PageDown':
                nextDate = new Date(day.getFullYear(), day.getMonth() + 1, day.getDate());
                isNext = true;
                break;
            case 'Escape':
                key.stopPropagation();
                key.preventDefault();
                props.onExit();
                return;
            default:
                return;
        }
        key.stopPropagation();
        key.preventDefault();
        if (key.ctrlKey) {
            if (isNext) {
                props.onChangeShownDate(findNextValidDay(nextDate, props.disabledDate || [], props.minDate, props.maxDate));
            }
            else {
                props.onChangeShownDate(findPrevValidDay(nextDate, props.disabledDate || [], props.minDate, props.maxDate));
            }
        }
        else {
            props.onChangeShownDate(getDateBetweenLimits(nextDate, props.minDate, props.maxDate));
        }
    }
    const selectedDateString = props.selectedDate?.toDateString();
    const selectedRangeStartString = props.selectedRangeStart?.toDateString();
    const selectedRangeEndString = props.selectedRangeEnd?.toDateString();
    function isSelectedDay(day) {
        const dayString = day.toDateString();
        if (selectedDateString) {
            return dayString === selectedDateString;
        }
        if (selectedRangeStartString && !props.selectedRangeEnd) {
            return dayString === selectedRangeStartString;
        }
        if (selectedRangeEndString && !props.selectedRangeStart) {
            return dayString === selectedRangeEndString;
        }
        if (selectedRangeStartString && selectedRangeEndString && selectedRangeStartString === selectedRangeEndString) {
            return dayString === selectedRangeStartString;
        }
        return false;
    }
    function isMiddleDay(day) {
        return props.selectedRangeStart && props.selectedRangeEnd ? day > props.selectedRangeStart && day < props.selectedRangeEnd : false;
    }
    function isStartDay(day) {
        return selectedRangeStartString && !isSelectedDay(day) ? day.toDateString() === selectedRangeStartString : false;
    }
    function isEndDay(day) {
        return selectedRangeEndString && !isSelectedDay(day) ? day.toDateString() === selectedRangeEndString : false;
    }
    function isHighlighted(day) {
        if (props.highlightedWeekends && (day.getDay() == 6 || day.getDay() == 0)) {
            return true;
        }
        return props.highlightedDate?.some(d => d.toDateString() === day.toDateString());
    }
    return (h("table", { role: "grid", class: "fc-calendar" }, h("thead", { class: "fc-calendar__header-week" }, getWeekDaysInitials(props.firstDayOfTheWeek ?? WeekDays.Monday).map(day => (h("th", { scope: "col", class: "fc-calendar__header-week__day", "aria-label": getWeekDaysNamesFromInitials(day) }, day)))), h("tbody", { class: "fc-calendar__body-week w-full" }, getWeeks(referenceDate, props.firstDayOfTheWeek ?? WeekDays.Monday, 6).map((week) => (h("tr", { class: "fc-calendar__row-days" }, week.map(day => (h(FcDatepickerItem, { onDatepickerItemRef: el => {
            if (el && props.hasFocus && day.toDateString() === props.shownDate.toDateString()) {
                setTimeout(() => {
                    el.focus();
                }, 1);
            }
        }, onSelect: props.onDateSelect, onKeyDown: e => onKeyDown(e, day), value: day, type: 'day', isFocusable: day.toDateString() === referenceDate.toDateString(), isDisabled: isDisabledDate(day, props.disabledDate || [], props.minDate, props.maxDate), isOtherMonth: day.getMonth() !== referenceDate.getMonth(), isCurrent: day.toDateString() === (props.currentDate || new Date()).toDateString(), isSelected: isSelectedDay(day), isStart: isStartDay(day), isMiddle: isMiddleDay(day), isEnd: isEndDay(day), isHighlighted: isHighlighted(day), color: props.color, text: day.getDate().toString() })))))))));
};

const FcCalendarMonth = props => {
    const referenceDate = monthStart(props.shownMonth || props.selectedMonth || new Date());
    function getMonths() {
        const months = [];
        let row = [];
        for (let index = 0; index < 12; index++) {
            row.push(new Date(new Date(referenceDate.getFullYear(), index, 1)));
            if (index % 3 === 2) {
                months.push(row);
                row = []; // Clear the array for the next row
            }
        }
        return months;
    }
    function isDisabledMonth(month) {
        return (isCompleteMonth(month, props.disabledDates, props.minMonth, props.maxMonth) ||
            (props.disabledMonths && props.disabledMonths.some(d => compareMonths(month, d))));
    }
    function isHighlightedMonth(month) {
        return (isCompleteMonth(month, props.highlightedDates) ||
            (props.highlightedMonths && props.highlightedMonths.some(d => compareMonths(month, d))));
    }
    function isSelectedMonth(month) {
        if (props.selectedMonth) {
            return compareMonths(month, props.selectedMonth);
        }
        if (props.selectedRangeStart && !props.selectedRangeEnd) {
            return compareMonths(month, props.selectedRangeStart);
        }
        if (props.selectedRangeEnd && !props.selectedRangeStart) {
            return compareMonths(month, props.selectedRangeEnd);
        }
        if (props.selectedRangeStart && props.selectedRangeEnd && compareMonths(props.selectedRangeStart, props.selectedRangeEnd)) {
            return compareMonths(month, props.selectedRangeStart);
        }
        return false;
    }
    function isMiddleMonth(month) {
        return props.selectedRangeStart && props.selectedRangeEnd ? month > props.selectedRangeStart && month < props.selectedRangeEnd : false;
    }
    function isStartMonth(month) {
        return props.selectedRangeStart && !isSelectedMonth(month) ? compareMonths(month, props.selectedRangeStart) : false;
    }
    function isEndMonth(month) {
        return props.selectedRangeEnd && !isSelectedMonth(month) ? compareMonths(month, props.selectedRangeEnd) : false;
    }
    function onKeyDown(key, month) {
        let nextDate = null;
        let isNext = true;
        switch (key.code) {
            case 'ArrowDown':
                nextDate = addMonths(month, 3);
                isNext = true;
                break;
            case 'ArrowUp':
                nextDate = addMonths(month, -3);
                isNext = false;
                break;
            case 'ArrowLeft':
                nextDate = addMonths(month, -1);
                isNext = false;
                break;
            case 'ArrowRight':
                nextDate = addMonths(month, 1);
                isNext = true;
                break;
            case 'Enter':
            case 'Space':
                key.stopPropagation();
                key.preventDefault();
                if (!isDisabledMonth(month)) {
                    props.onMonthSelect(null, getDateBetweenLimits(month, props.minMonth, props.maxMonth));
                }
                return;
            case 'Home':
                nextDate = new Date(month.getFullYear(), Math.floor(month.getMonth() / 3) * 3, 1);
                isNext = true;
                break;
            case 'End':
                nextDate = new Date(month.getFullYear(), Math.floor(month.getMonth() / 3) * 3 + 2, 1);
                isNext = false;
                break;
            case 'PageUp':
                nextDate = addMonths(month, -12);
                isNext = false;
                break;
            case 'PageDown':
                nextDate = addMonths(month, 12);
                isNext = true;
                break;
            case 'Escape':
                key.stopPropagation();
                key.preventDefault();
                props.onExit();
                return;
            default:
                return;
        }
        key.stopPropagation();
        key.preventDefault();
        if (key.ctrlKey) {
            if (isNext) {
                props.onChangeShownMonth(findNextValidDay(nextDate, props.disabledMonths || [], props.minMonth, props.maxMonth));
            }
            else {
                props.onChangeShownMonth(findPrevValidDay(nextDate, props.disabledMonths || [], props.minMonth, props.maxMonth));
            }
        }
        else {
            props.onChangeShownMonth(getDateBetweenLimits(nextDate, props.minMonth, props.maxMonth));
        }
    }
    return (h("table", { role: "grid", class: "fc-calendar-month" }, h("tbody", { class: "fc-calendar-month__rows" }, getMonths().map((row) => (h("tr", { class: "fc-calendar-month__row-months" }, row.map(month => (h(FcDatepickerItem, { onDatepickerItemRef: el => {
            if (el && compareMonths(month, props.shownMonth)) {
                if (props.hasFocus) {
                    setTimeout(() => {
                        el.focus();
                    }, 1);
                }
            }
        }, onSelect: props.onMonthSelect, onKeyDown: e => onKeyDown(e, month), value: month, type: 'month', isFocusable: compareMonths(month, referenceDate), isDisabled: isDisabledMonth(month), isCurrent: compareMonths(month, props.currentMonth), isSelected: isSelectedMonth(month), isStart: isStartMonth(month), isMiddle: isMiddleMonth(month), isEnd: isEndMonth(month), isHighlighted: isHighlightedMonth(month), color: props.color, text: getMonthNameShort(month) })))))))));
};

const FcCalendarYear = props => {
    const referenceDate = yearStart(props.shownYear || props.selectedYear || new Date());
    let startYear = new Date(new Date().getFullYear() - 7, 0, 1);
    function getYears() {
        let endYear = new Date(new Date().getFullYear() + 4, 0, 1);
        const years = [];
        let row = [];
        while (startYear > referenceDate || endYear < referenceDate) {
            if (startYear > referenceDate) {
                startYear = addYears(startYear, -12);
                endYear = addYears(endYear, -12);
            }
            else {
                startYear = addYears(startYear, 12);
                endYear = addYears(endYear, 12);
            }
        }
        for (let index = 0; index < 12; index++) {
            row.push(new Date(startYear.getFullYear() + index, 0, 1));
            if (index % 3 === 2) {
                years.push(row);
                row = []; // Clear the array for the next row
            }
        }
        return years;
    }
    function isSelectedYear(year) {
        if (props.selectedYear) {
            return compareYears(year, props.selectedYear);
        }
        if (props.selectedRangeStart && !props.selectedRangeEnd) {
            return compareYears(year, props.selectedRangeStart);
        }
        if (props.selectedRangeEnd && !props.selectedRangeStart) {
            return compareYears(year, props.selectedRangeEnd);
        }
        if (props.selectedRangeStart && props.selectedRangeEnd && compareYears(props.selectedRangeStart, props.selectedRangeEnd)) {
            return compareYears(year, props.selectedRangeStart);
        }
        return false;
    }
    function isMiddleYear(year) {
        return props.selectedRangeStart && props.selectedRangeEnd ? year > props.selectedRangeStart && year < props.selectedRangeEnd : false;
    }
    function isStartYear(year) {
        return props.selectedRangeStart && !isSelectedYear(year) ? compareYears(year, props.selectedRangeStart) : false;
    }
    function isEndYear(year) {
        return props.selectedRangeEnd && !isSelectedYear(year) ? compareYears(year, props.selectedRangeEnd) : false;
    }
    function isDisabledYear(year) {
        return (isCompleteYear(year, props.disabledDates, props.minYear, props.maxYear) ||
            (props.disabledYears && props.disabledYears.some(d => compareYears(year, d))));
    }
    function isHighlightedYear(year) {
        return (isCompleteYear(year, props.highlightedDates) || (props.highlightedYears && props.highlightedYears.some(d => compareYears(year, d))));
    }
    function onKeyDown(key, year) {
        let nextDate = null;
        let isNext = true;
        switch (key.code) {
            case 'ArrowDown':
                nextDate = addYears(year, 3);
                isNext = true;
                break;
            case 'ArrowUp':
                nextDate = addYears(year, -3);
                isNext = false;
                break;
            case 'ArrowLeft':
                nextDate = addYears(year, -1);
                isNext = false;
                break;
            case 'ArrowRight':
                nextDate = addYears(year, 1);
                isNext = true;
                break;
            case 'Enter':
            case 'Space':
                key.stopPropagation();
                key.preventDefault();
                if (!isDisabledYear(year)) {
                    props.onYearSelect(null, getDateBetweenLimits(year, props.minYear, props.maxYear));
                }
                return;
            case 'Home':
                nextDate = new Date(Math.floor((year.getFullYear() - startYear.getFullYear()) / 3) * 3 + startYear.getFullYear(), 0, 1);
                isNext = true;
                break;
            case 'End':
                nextDate = new Date(Math.floor((year.getFullYear() - startYear.getFullYear()) / 3) * 3 + startYear.getFullYear() + 2, 0, 1);
                isNext = false;
                break;
            case 'PageUp':
                nextDate = addYears(year, -12);
                isNext = false;
                break;
            case 'PageDown':
                nextDate = addYears(year, 12);
                isNext = true;
                break;
            case 'Escape':
                key.stopPropagation();
                key.preventDefault();
                props.onExit();
                return;
            default:
                return;
        }
        key.stopPropagation();
        key.preventDefault();
        if (key.ctrlKey) {
            if (isNext) {
                props.onChangeShownYear(findNextValidDay(nextDate, props.disabledYears || [], props.minYear, props.maxYear));
            }
            else {
                props.onChangeShownYear(findPrevValidDay(nextDate, props.disabledYears || [], props.minYear, props.maxYear));
            }
        }
        else {
            props.onChangeShownYear(getDateBetweenLimits(nextDate, props.minYear, props.maxYear));
        }
    }
    return (h("table", { role: "grid", class: "fc-calendar-year" }, h("tbody", { class: "fc-calendar-year__rows" }, getYears().map((row) => (h("tr", { class: "fc-calendar-year__row-years" }, row.map(year => (h(FcDatepickerItem, { onDatepickerItemRef: el => {
            if (el && compareYears(year, props.shownYear)) {
                if (props.hasFocus)
                    setTimeout(() => {
                        el.focus();
                    }, 1);
            }
        }, onSelect: props.onYearSelect, onKeyDown: e => onKeyDown(e, year), value: year, type: 'year', isFocusable: compareYears(year, referenceDate), isDisabled: isDisabledYear(year), isCurrent: compareYears(year, props.currentYear), isSelected: isSelectedYear(year), isStart: isStartYear(year), isMiddle: isMiddleYear(year), isEnd: isEndYear(year), isHighlighted: isHighlightedYear(year), color: props.color, text: `${year.getFullYear()}` })))))))));
};

export { FcCalendar as F, formatDateToMonth as a, formatDateToYear as b, addYears as c, addMonths as d, getMonthName as e, formatDateToString as f, getDateBetweenLimits as g, FcCalendarMonth as h, isDisabledDate as i, FcCalendarYear as j, formatDate as k, getSROnlyHelperText as l, monthStart as m, getValueRangeString as n, formatDateToISO as o, addDays as p, yearStart as y };
//# sourceMappingURL=index-DDO3GhOW.js.map

//# sourceMappingURL=index-DDO3GhOW.js.map