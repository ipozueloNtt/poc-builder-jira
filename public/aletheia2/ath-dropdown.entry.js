import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { a as FcInputElement } from './index-8mh0qKYc.js';
import { a as FcInputHelperText, b as FcInputFeedback, F as FcInputLabel } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

var dropdownSize;
(function (dropdownSize) {
    dropdownSize["Lg"] = "lg";
    dropdownSize["Md"] = "md";
    dropdownSize["Sm"] = "sm";
})(dropdownSize || (dropdownSize = {}));
var dropdownFeedbackType;
(function (dropdownFeedbackType) {
    dropdownFeedbackType["None"] = "none";
    dropdownFeedbackType["Error"] = "error";
})(dropdownFeedbackType || (dropdownFeedbackType = {}));

const dropdownCss = ".sc-ath-dropdown-h .ath-dropdown__wrapper--field.sc-ath-dropdown{--border-dropdown:1px solid var(--ath-color-input-border-default);--border-radius-dropdown:var(--ath-border-radius-input-default);--background-dropdown:var(--ath-color-input-bg-default);--border-bottom-dropdown:1px solid var(--ath-color-input-border-default)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.disabled.sc-ath-dropdown{--border-radius-dropdown:var(--ath-border-radius-input-default);--border-dropdown:1px solid var(--ath-color-border-alpha-disabled);--background-dropdown:var(--ath-color-bg-alpha-disabled);--border-bottom-dropdown:none}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.readonly.sc-ath-dropdown{--border-dropdown:none;--border-radius-dropdown:var(--ath-border-radius-input-readonly);--border-bottom-dropdown:1px solid var(--ath-color-input-border-default)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.readonly.sc-ath-dropdown .sc-ath-dropdown:focus-visible{--border-radius-dropdown:var(--ath-border-radius-input-default);--border-bottom-dropdown:none}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.error.sc-ath-dropdown{--border-radius-dropdown:var(--ath-border-radius-input-default);--border-dropdown:1px solid var(--ath-color-border-danger-default);--border-bottom-dropdown:1px solid var(--ath-color-border-danger-default);--background-dropdown:var(--ath-color-input-bg-default)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.open.sc-ath-dropdown{--border-dropdown:1px solid var(--ath-color-input-dropdown-border-active);--border-radius-dropdown:var(--ath-border-radius-input-dropdown-open-top) var(--ath-border-radius-input-dropdown-open-top)\n    var(--ath-border-radius-input-dropdown-open-bottom) var(--ath-border-radius-input-dropdown-open-bottom);--background-dropdown:var(--ath-color-input-bg-default);--border-bottom-dropdown:1px solid var(--ath-color-input-dropdown-border-active)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.open.size-lg.sc-ath-dropdown{--border-radius-dropdown:var(--ath-border-radius-input-dropdown-open-top-lg) var(--ath-border-radius-input-dropdown-open-top-lg)\n    var(--ath-border-radius-input-dropdown-open-bottom) var(--ath-border-radius-input-dropdown-open-bottom)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.sc-ath-dropdown:focus-visible{--border-dropdown:2px solid var(--ath-color-border-focus);--box-shadow-dropdown:none;--border-bottom-dropdown:2px solid var(--ath-color-border-focus);outline:none}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.open.sc-ath-dropdown:focus-visible{--border-dropdown:1px solid var(--ath-color-input-dropdown-border-active);--border-bottom-dropdown:1px solid var(--ath-color-border-focus)}.sc-ath-dropdown-h .ath-input__field--size-sm.sc-ath-dropdown{--input-padding-x:var(--ath-spacing-input-field-padding-x-sm);--input-padding-y:var(--ath-spacing-input-field-padding-y-sm)}.sc-ath-dropdown-h .ath-input__field--size-md.sc-ath-dropdown{--input-padding-x:var(--ath-spacing-input-field-padding-x-md);--input-padding-y:var(--ath-spacing-input-field-padding-y-md)}.sc-ath-dropdown-h .ath-input__field--size-lg.sc-ath-dropdown{--input-padding-x:var(--ath-spacing-input-field-padding-x-lg);--input-padding-y:var(--ath-spacing-input-field-padding-y-lg)}.sc-ath-dropdown-h .ath-button_comp--size-xs.sc-ath-dropdown{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-dropdown-h .ath-button_comp--size-sm.sc-ath-dropdown{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-dropdown-h .ath-button_comp--size-md.sc-ath-dropdown{--button-padding:var(--ath-spacing-button-padding-around-xs)}.sc-ath-dropdown-h .ath-button_comp--size-lg.sc-ath-dropdown{--button-padding:var(--ath-spacing-button-padding-around-sm)}.ath-input__helper-text.sc-ath-dropdown{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.ath-input__feedback.sc-ath-dropdown{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.ath-input__feedback--error.sc-ath-dropdown{color:var(--ath-color-fg-feedback-danger)}.ath-input__feedback--success.sc-ath-dropdown{color:var(--ath-color-fg-feedback-success)}.ath-input__feedback--warning.sc-ath-dropdown{color:var(--ath-color-fg-feedback-warning)}.padding.sc-ath-dropdown{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}.ath-input__label.sc-ath-dropdown{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}.ath-input__label__wrapper.sc-ath-dropdown{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}.ath-input__label.sc-ath-dropdown ath-icon.sc-ath-dropdown{color:var(--ath-color-fg-default)}.ath-input__label.sc-ath-dropdown .required.sc-ath-dropdown{color:var(--ath-color-fg-feedback-danger);padding-left:4px}.ath-input__label.sc-ath-dropdown ath-button.sc-ath-dropdown{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}.sc-ath-dropdown-h{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);width:100%}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;flex-wrap:wrap;row-gap:var(--ath-spacing-input-row-gap);width:100%}.sc-ath-dropdown-h .wrapper.sc-ath-dropdown{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-addons-row-gap);align-self:stretch;width:100%}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field.sc-ath-dropdown{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:var(--ath-spacing-input-field-col-gap);align-self:stretch;border:1px solid var(--ath-color-input-border-default);border-radius:var(--input-border-radius);background:var(--ath-color-input-bg-default);padding:calc(var(--input-padding-y) - 1px) calc(var(--input-padding-x) - 1px)}.sc-ath-dropdown-h .ath-input .ath-input__field:focus-within:not(:has(>button:focus)){box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset;border:1px solid transparent;border-radius:var(--input-border-radius)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--error.sc-ath-dropdown{border-color:var(--ath-color-border-danger-default)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--success.sc-ath-dropdown{border-color:var(--ath-color-border-success-default)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--warning.sc-ath-dropdown{border-color:var(--ath-color-border-warning-default)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--readonly.sc-ath-dropdown{border:1px solid transparent;position:relative;background:none}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--readonly.sc-ath-dropdown::after{content:\"\";position:absolute;bottom:1px;width:100%;height:1px;background-color:var(--ath-color-input-border-default)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--readonly.sc-ath-dropdown{border-radius:var(--ath-border-radius-input-readonly)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--readonly.sc-ath-dropdown:focus-within{border:1px solid transparent}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--readonly.sc-ath-dropdown:focus-within::after{background-color:transparent}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--readonly.sc-ath-dropdown .ath-input__text--value.sc-ath-dropdown{color:var(--ath-color-fg-default)}.sc-ath-dropdown-h .ath-input.sc-ath-dropdown .ath-input__field--disabled.sc-ath-dropdown{background:var(--ath-color-bg-alpha-disabled);border-color:var(--ath-color-border-alpha-disabled)}.sc-ath-dropdown-h .ath-input__text--value.sc-ath-dropdown{flex:1 0 0;overflow:hidden;color:var(--ath-color-fg-default);text-overflow:ellipsis;font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-regular);font-size:var(--ath-font-size-input-text);line-height:var(--ath-font-line-height-input-text);border:none;width:100%;background-color:transparent;padding:0px var(--ath-spacing-input-text-padding-x)}.sc-ath-dropdown-h .ath-input__text--value.sc-ath-dropdown:focus{outline:1px solid transparent;border:none}.sc-ath-dropdown-h .ath-input--unit.sc-ath-dropdown{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-text);font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-input-text)}.sc-ath-dropdown-h .ath-input--unit--disabled.sc-ath-dropdown{color:var(--ath-color-fg-disabled)}.sc-ath-dropdown-h input[type=password].sc-ath-dropdown::-ms-reveal,.sc-ath-dropdown-h input[type=password].sc-ath-dropdown::-ms-clear{display:none}.sc-ath-dropdown-h input.sc-ath-dropdown::-webkit-outer-spin-button,.sc-ath-dropdown-h input.sc-ath-dropdown::-webkit-inner-spin-button{-webkit-appearance:none;margin:0}.sc-ath-dropdown-h input[type=number].sc-ath-dropdown{-moz-appearance:textfield;appearance:textfield}.sc-ath-dropdown-h .ath-visibility-hidden.sc-ath-dropdown{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.sc-ath-dropdown-h .ath-button_comp.sc-ath-dropdown{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.sc-ath-dropdown-h .ath-button_comp.sc-ath-dropdown:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.sc-ath-dropdown-h .ath-button_comp.sc-ath-dropdown:hover{background:var(--ath-color-bg-alpha-hovered)}.sc-ath-dropdown-h .ath-button_comp.sc-ath-dropdown:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.sc-ath-dropdown-h .ath-button_comp--disabled.sc-ath-dropdown{pointer-events:none;color:var(--ath-color-button-icon-disabled)}.sc-ath-dropdown-h{--input-border-radius:var(--ath-border-radius-input-default)}.sc-ath-dropdown-h .ath-dropdown.sc-ath-dropdown{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-row-gap)}.sc-ath-dropdown-h .ath-dropdown__wrapper.sc-ath-dropdown{width:100%;display:flex;flex-direction:column;align-items:flex-start;position:relative;gap:var(--ath-spacing-input-addons-row-gap)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.sc-ath-dropdown{display:flex;justify-content:center;align-items:center;gap:var(--ath-spacing-input-field-col-gap);align-self:stretch;overflow:hidden;border:var(--border-dropdown);border-radius:var(--border-radius-dropdown);background:var(--background-dropdown);border-bottom:var(--border-bottom-dropdown);box-shadow:var(--box-shadow-dropdown);cursor:pointer;user-select:none}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.size-sm.sc-ath-dropdown{padding:calc(var(--ath-spacing-input-dropdown-field-padding-y-sm) - 1px) var(--ath-spacing-input-dropdown-field-padding-x-sm)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.size-md.sc-ath-dropdown{padding:calc(var(--ath-spacing-input-dropdown-field-padding-y-md) - 1px) var(--ath-spacing-input-dropdown-field-padding-x-md)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.size-lg.sc-ath-dropdown{padding:calc(var(--ath-spacing-input-dropdown-field-padding-y-lg) - 1px) var(--ath-spacing-input-dropdown-field-padding-x-lg)}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.sc-ath-dropdown:focus{outline:none}.sc-ath-dropdown-h .ath-dropdown__wrapper--field.disabled.sc-ath-dropdown{pointer-events:none}.sc-ath-dropdown-h .ath-dropdown__wrapper--addons.sc-ath-dropdown{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-addons-row-gap)}.sc-ath-dropdown-h .ath-dropdown__field.sc-ath-dropdown{display:flex;position:relative;align-items:center;flex:1 0 0;overflow:hidden;text-overflow:ellipsis;padding:0px var(--ath-spacing-input-dropdown-text-padding-x);gap:var(--ath-spacing-input-dropdown-option-col-gap);line-clamp:1;font-family:var(--ath-font-family-primary);font-weight:var(--ath-font-weight-regular);font-style:normal;font-size:var(--ath-font-size-input-text);line-height:var(--ath-font-line-height-input-text)}.sc-ath-dropdown-h .ath-dropdown__field-placeholder.sc-ath-dropdown{color:var(--ath-color-fg-subtle)}.sc-ath-dropdown-h .ath-dropdown__field-filled.sc-ath-dropdown{color:var(--ath-color-fg-default)}.sc-ath-dropdown-h .ath-dropdown-overlay--single-select.sc-ath-dropdown{display:flex;padding:var(--ath-spacing-input-dropdown-overlay-padding-y) var(--ath-spacing-input-dropdown-overlay-padding-x);flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-dropdown-overlay-row-gap);box-sizing:border-box;position:absolute;z-index:1000;border-radius:var(--ath-border-radius-input-dropdown-open-bottom) var(--ath-border-radius-input-dropdown-open-bottom) var(--ath-border-radius-input-dropdown-open-top) var(--ath-border-radius-input-dropdown-open-top);border-right:1px solid var(--ath-color-input-dropdown-overlay-border);border-bottom:1px solid var(--ath-color-input-dropdown-overlay-border);border-left:1px solid var(--ath-color-input-dropdown-overlay-border);background:var(--ath-color-input-dropdown-overlay-bg);width:100%;margin-top:2px}.sc-ath-dropdown-h .ath-dropdown-overlay--single-select.size-sm.sc-ath-dropdown{top:30px}.sc-ath-dropdown-h .ath-dropdown-overlay--single-select.size-md.sc-ath-dropdown{top:38px}.sc-ath-dropdown-h .ath-dropdown-overlay--single-select.size-lg.sc-ath-dropdown{top:46px;border-radius:var(--ath-border-radius-input-dropdown-open-bottom) var(--ath-border-radius-input-dropdown-open-bottom) var(--ath-border-radius-input-dropdown-open-top-lg) var(--ath-border-radius-input-dropdown-open-top-lg)}.sc-ath-dropdown-h .ath-dropdown-option__list.sc-ath-dropdown{padding:0;margin:0;gap:var(--ath-spacing-input-dropdown-option-group-row-gap);list-style:none;display:flex;flex-direction:column;align-items:flex-start;align-self:stretch;width:100%}.sc-ath-dropdown-h .ath-dropdown-option-group.sc-ath-dropdown{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-input-dropdown-option-group-row-gap);align-self:stretch}.sc-ath-dropdown-h .noResult.sc-ath-dropdown{display:flex;padding:var(--ath-spacing-input-dropdown-option-padding-y) var(--ath-spacing-input-dropdown-option-padding-x);align-items:center;gap:var(--ath-spacing-input-dropdown-option-col-gap);flex:1 0 0;color:var(--ath-color-fg-disabled);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-dropdown-option);font-style:normal;font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-input-dropdown-option)}.sc-ath-dropdown-h .hidden.sc-ath-dropdown{display:none}";

let dropdownSequence = 0;
const AthDropdown = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChange = createEvent(this, "athChange", 7);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        if (hostRef.$hostElement$["s-ei"]) {
            this.internals = hostRef.$hostElement$["s-ei"];
        }
        else {
            this.internals = hostRef.$hostElement$.attachInternals();
            hostRef.$hostElement$["s-ei"] = this.internals;
        }
    }
    dropdownId = `dropdown-${++dropdownSequence}`;
    labelId = `${this.dropdownId}-label`;
    optionPanelId = `${this.dropdownId}-option-panel`;
    listBoxId = `${this.dropdownId}-list-box`;
    inputSearchId = `${this.dropdownId}-input-search`;
    helperId = `${this.dropdownId}-helper-text`;
    feedbackId = `${this.dropdownId}-feedback`;
    searchInputComponent;
    timeoutSearchInpComp;
    initialValue = '';
    get el() { return getElement(this); }
    internals;
    /**
     * Nombre accesible para el dropdown
     */
    dropdownAriaLabel;
    /**
     * The name of the combobox. Submitted with the form as part of a name/value pair
     */
    name;
    /**
     * Current value of the form control. Submitted with the form as part of a name/value pair
     */
    value;
    /**
     * Label dropdown
     */
    label;
    /**
     * Si dropdown es obligatorio
     */
    required = false;
    /**
     * If true, Do no show required mark for required input
     */
    hideRequired = false;
    /**
     * Tamaño dropdown
     */
    size = dropdownSize.Md;
    /**
     * Texto del tooltip
     */
    tooltipText;
    /**
     * Tipo feedback
     */
    feedback = dropdownFeedbackType.None;
    /**
     * Texto feedback
     */
    feedbackText;
    /**
     * Texto de ayuda
     */
    helperText;
    /**
     * Si dropdown es solo lectura
     */
    readonly = false;
    /**
     * Si dropdown esta deshabilitado
     */
    disabled = false;
    /**
     * Si dropdown es multiseleccion
     */
    multiselect = false;
    /**
     * Mostrar chips
     */
    showChips = false;
    /**
     * Ancho dropdown
     */
    width;
    /**
     * Altura del overlay del dropdown
     */
    overlayMaxHeight;
    /**
     * Si dropdown tiene bloque de busqueda
     */
    search = false;
    /**
     * Texto placeholder del bloque de busqueda
     */
    searchPlaceholder = '';
    /**
     * Texto placeholder del bloque de busqueda
     */
    searchAriaLabel = 'Buscar';
    /**
     * Si dropdown esta abierto
     */
    open = false;
    /**
     * Ancho del tooltip
     */
    tooltipWidth = 0;
    /**
     * Placeholder
     */
    placeholder;
    /**
     * texto cuando multiselect es true, showChips es false y se selecciona una opcion
     */
    nochipsText;
    /**
     * no result text
     */
    noresultText;
    /**
     * Text to announce the items found in search input
     */
    announceResultText = 'Hay [total] elementos en la lista';
    WatchValue(newValue) {
        if (this.lastValue !== newValue) {
            this.selectOptionByValue(newValue);
        }
    }
    /**
     * Emitted when option changed
     */
    athChange;
    /**
     * Emitted when the combobox gains focus
     */
    athFocus;
    /**
     * Emitted when the combobox loses focus
     */
    athBlur;
    placeHolder;
    selectedOptions = [];
    foundResults = true;
    activeId = '';
    index = 0;
    liveMessage = '';
    increaseIndex() {
        this.index = Math.min(this.optionList.length - 1, this.index + 1);
    }
    decreaseIndex() {
        this.index = Math.max(0, this.index - 1);
    }
    async handleClose() {
        clearTimeout(this.timeoutSearchInpComp);
        if (!this.open) {
            this.index = 0;
            this.firstOpenKey = true;
            this.cleanActivaOption();
        }
        else if (this.search) {
            requestAnimationFrame(() => {
                this.timeoutSearchInpComp = setTimeout(() => {
                    this.searchInputComponent?.focus();
                }, 0);
            });
        }
    }
    handleDismiss() {
        const chipLabel = this.selectedOptions[0].text;
        this.options.forEach(option => {
            if (option.text === chipLabel) {
                option.selected = false;
                this.submitSelected(option, true);
            }
        });
        if (this.selectedOptions.length > 0) {
            this.spanTextEl.innerHTML = this.addChips();
        }
        else {
            this.addDefaultPlaceholderText();
        }
        this.dropdownEl.focus();
    }
    checkForClickOutside(event) {
        if (this.el.contains(event.target))
            return;
        if (!this.dropdownEl)
            return;
        this.open = false;
        this.dropdownEl.setAttribute('aria-expanded', 'false');
    }
    handleSelected(event) {
        if (event.detail?.source !== 'user')
            return;
        this.submitSelected(event.target);
        if (!this.multiselect) {
            if (event.target.selected) {
                this.refreshList(event.target);
                this.spanTextEl.innerHTML = event.target.text;
            }
            else {
                this.addDefaultPlaceholderText();
            }
            this.open = false;
            this.dropdownEl.focus();
        }
        else {
            if (this.selectedOptions.length > 0) {
                this.spanTextEl.innerHTML = this.showChips ? this.addChips() : this.selectedOptions.length + ' ' + this.nochipsText;
            }
            else {
                this.addDefaultPlaceholderText();
            }
        }
    }
    options = [];
    optionList = [];
    spanTextEl;
    dropdownEl;
    firstOpenKey = true;
    lastValue;
    addChips = () => {
        const chipCount = this.selectedOptions.length > 1 ? `+${this.selectedOptions.length - 1}` : '';
        const chipSize = this.size === dropdownSize.Lg ? 'md' : 'sm';
        const icon = !!this.selectedOptions[0].icon ? "icon='" + this.selectedOptions[0].icon + "'" : undefined;
        return `<ath-chip-dismiss heading-text="${this.selectedOptions[0].text}" ${icon} size="${chipSize}"></ath-chip-dismiss><span>${chipCount}</span>`;
    };
    updateSelectedOptions(option, dismiss = false) {
        if (dismiss || this.selectedOptions.includes(option)) {
            this.selectedOptions = this.selectedOptions.filter(opt => opt !== option);
        }
        else if (!this.multiselect && this.selectedOptions.length > 0) {
            this.selectedOptions = [option];
        }
        else {
            this.selectedOptions = [...this.selectedOptions, option];
        }
    }
    submitSelected(option, dismiss = false) {
        this.updateSelectedOptions(option, dismiss);
        const valuesSelected = this.selectedOptions.map(obj => obj.value).join(',');
        this.lastValue = valuesSelected;
        this.value = valuesSelected;
        this.athChange.emit(this.selectedOptions);
        this.setInputValue(this.value);
    }
    selectOptionByValue(values) {
        this.unselectAllOptions(true);
        const valueList = values.split(',');
        valueList.forEach(value => {
            const index = this.optionList.findIndex(option => option.value === value);
            if (index > -1) {
                this.optionList[index].setSelected(true, { silent: true, source: 'programmatic' });
            }
        });
        this.setInputValue(values);
    }
    unselectAllOptions(silent = false) {
        this.optionList.forEach(option => {
            if (option.selected)
                option.setSelected(false, { silent, source: 'programmatic' });
        });
    }
    setInputValue(value) {
        if (this.internals && 'setFormValue' in this.internals) {
            this.internals.setFormValue(value);
            this.internals.checkValidity();
        }
    }
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = event => {
        if (!this.firstOpenKey) {
            const related = event.relatedTarget ? event.relatedTarget.id : undefined;
            if (!this.search || related == undefined) {
                this.open = false;
            }
            else if (related == '') {
                this.open = false;
            }
        }
        this.athBlur.emit();
    };
    handleClick = event => {
        if (this.readonly)
            return;
        if (event.target.tagName.includes('ath-CHIP-DISMISS'))
            return;
        this.open = !this.open;
        this.dropdownEl.setAttribute('aria-expanded', this.open ? 'true' : 'false');
    };
    navigationList(isArrowDown) {
        isArrowDown ? this.increaseIndex() : this.decreaseIndex();
        if (this.optionList[this.index].disabled || this.optionList[this.index].optionGroup) {
            isArrowDown ? this.increaseIndex() : this.decreaseIndex();
        }
        this.setActiveOption();
    }
    keydownFirstOption() {
        this.activeId = this.optionList[this.index].id;
        this.options[this.index].activeDropdownOption();
    }
    handleKeyDown = (key) => {
        const isArrowUp = key.code === 'ArrowUp';
        const isArrowDown = key.code === 'ArrowDown';
        if (isArrowUp || isArrowDown) {
            if (!this.firstOpenKey) {
                key.preventDefault();
                if (this.optionList.length > 0) {
                    this.navigationList(isArrowDown);
                }
            }
            else {
                this.firstOpenKey = false;
                this.open = true;
                this.keydownFirstOption();
            }
            this.dropdownEl.setAttribute('aria-activedescendant', this.activeId);
        }
        if (key.code === 'Enter' || key.code === 'Space') {
            if (!this.open) {
                this.firstOpenKey = false;
                this.open = !this.open;
                this.dropdownEl.setAttribute('aria-expanded', 'true');
                this.keydownFirstOption();
                this.dropdownEl.setAttribute('aria-activedescendant', this.activeId);
                if (this.search) {
                    this.searchInputComponent.setAttribute('aria-activedescendant', this.activeId);
                }
            }
            else {
                const selectionValue = this.multiselect ? !this.optionList[this.index].selected : true;
                this.optionList[this.index].setSelected(selectionValue, { source: 'user' });
                this.dropdownEl.focus();
            }
        }
        if (key.code === 'Escape') {
            this.open = false;
            this.dropdownEl.setAttribute('aria-expanded', 'false');
            this.dropdownEl.focus();
        }
    };
    handleInput = (ev) => {
        this.handleFilterChange(ev.target.value || '');
    };
    async cleanActivaOption() {
        this.optionList.forEach(option => {
            option.noActiveDropdownOption();
        });
    }
    async setActiveOption() {
        this.optionList.forEach((option, i) => {
            if (this.index === i) {
                option.activeDropdownOption();
                this.activeId = option.id;
                option.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            }
            else {
                option.noActiveDropdownOption();
            }
        });
    }
    handleKeyDownInput = (key) => {
        const isArrowUp = key.code === 'ArrowUp';
        const isArrowDown = key.code === 'ArrowDown';
        if (isArrowUp || isArrowDown) {
            key.preventDefault();
            if (this.optionList.length > 0) {
                this.navigationList(isArrowDown);
            }
            this.dropdownEl.setAttribute('aria-activedescendant', this.activeId);
            if (this.search) {
                this.searchInputComponent.setAttribute('aria-activedescendant', this.activeId);
            }
        }
        if (key.code === 'Escape') {
            this.open = false;
            this.dropdownEl.focus();
        }
        if (key.code === 'Enter') {
            this.optionList[this.index].selectOption();
        }
    };
    handleFilterChange(inputText) {
        let haveResults = false;
        if (inputText === '') {
            this.options.forEach(option => {
                option.filterFound();
            });
            this.optionList = this.options;
            haveResults = true;
        }
        else {
            this.optionList = [];
            this.options.forEach(option => {
                if (option.text.toLowerCase().includes(inputText.toLowerCase()) && !option.optionGroup) {
                    option.filterFound();
                    this.optionList.push(option);
                    haveResults = true;
                }
                else {
                    option.filterNotFound(inputText.toLowerCase());
                }
            });
        }
        this.index = 0;
        this.activeId = '';
        this.foundResults = haveResults;
        this.setActiveOption();
        this.announceMessage();
    }
    refeshListMultiselect() {
        this.options.forEach(option => {
            option.updateMultiselect();
        });
    }
    refreshList(activeOption) {
        this.optionList.forEach(option => {
            if (option !== activeOption && option.selected) {
                option.selected = false;
            }
        });
    }
    announceMessage() {
        if (this.foundResults) {
            const message = this.announceResultText.replace('[total]', String(this.optionList.length));
            this.liveMessage = message;
        }
        else {
            this.liveMessage = this.noresultText;
        }
    }
    getFieldClassNames = () => ({
        'ath-dropdown__wrapper--field': true,
        'readonly': this.readonly,
        'disabled': this.disabled,
        'error': this.feedback == dropdownFeedbackType.Error && !this.disabled,
        'open': this.open,
        [`size-${this.size}`]: true,
    });
    getTextClassNames = () => ({
        'ath-dropdown__field': true,
        'ath-dropdown__field-placeholder': this.selectedOptions.length === 0,
        'ath-dropdown__field-filled': this.selectedOptions.length > 0,
    });
    getListClassNames = () => ({
        'ath-dropdown-overlay--single-select': true,
        [`size-${this.size}`]: true,
        'hidden': !this.open,
    });
    ariaDescribedBy = () => {
        const descriptions = {};
        if (this.helperText != undefined)
            descriptions[this.helperId] = this.helperId;
        if (this.feedback != dropdownFeedbackType.None)
            descriptions[this.feedbackId] = this.feedbackId;
        return descriptions;
    };
    getAriaAttributes() {
        const describedByIds = Object.keys(this.ariaDescribedBy()).join(' ') == '' ? undefined : Object.keys(this.ariaDescribedBy()).join(' ');
        return {
            'aria-label': !!this.label ? undefined : this.dropdownAriaLabel,
            'aria-labelledby': !!this.label ? this.labelId : undefined,
            'aria-disabled': this.disabled,
            'aria-required': this.required,
            'aria-invalid': this.feedback === dropdownFeedbackType.Error ? 'true' : undefined,
            'aria-controls': this.search ? this.optionPanelId : this.listBoxId,
            'aria-describedby': describedByIds,
            'aria-expanded': this.open ? 'true' : 'false',
            'aria-haspopup': !this.search ? 'listbox' : 'dialog',
        };
    }
    getFeedbackProps = () => ({
        id: this.feedbackId,
        type: this.feedback,
        text: this.feedbackText,
    });
    getHelperTextProps = () => {
        return {
            id: this.helperId,
            text: !!this.helperText ? this.helperText.trim() : '',
        };
    };
    getLabelProps = () => ({
        htmlForId: this.dropdownId,
        label: this.label,
        required: this.required,
        showRequired: !this.hideRequired,
        tooltipText: this.tooltipText,
        tooltipWidth: this.tooltipWidth,
    });
    renderDropdown = () => {
        const ariaAttributes = this.getAriaAttributes();
        const icon = this.open ? 'chevron_up' : 'chevron_down';
        const spanText = this.placeholder;
        return (h("span", { ref: (el) => (this.dropdownEl = el), role: "combobox", class: this.getFieldClassNames(), ...ariaAttributes, id: this.dropdownId, onClick: this.handleClick, tabIndex: this.disabled ? -1 : 0, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleKeyDown, "aria-activedescendant": this.open ? this.activeId : undefined }, h("span", { class: this.getTextClassNames(), ref: (el) => (this.spanTextEl = el) }, !this.placeHolder && spanText), h("ath-icon", { icon: icon, "aria-hidden": "true" })));
    };
    renderInputSearchNew = () => {
        const props = {
            inputId: this.inputSearchId,
            type: 'search',
            placeholder: this.searchPlaceholder,
            value: '',
            onKeyDown: this.handleKeyDownInput,
            onBlur: this.handleBlur,
            onInputRef: el => (this.searchInputComponent = el),
            onInput: this.handleInput,
            onFocus: () => { },
            onChange: () => { },
            inputAriaLabel: this.searchAriaLabel,
            ariaActiveDescendant: this.open ? this.activeId : undefined,
            size: 'md',
        };
        return h(FcInputElement, { ...props });
    };
    renderList = () => {
        const styleHeight = this.overlayMaxHeight ? { maxHeight: this.overlayMaxHeight } : { maxHeight: '236px' };
        return (h("div", { class: this.getListClassNames(), role: "dialog", id: this.optionPanelId, "aria-hidden": !this.open ? 'true' : undefined, "aria-labelledby": this.label ? this.labelId : undefined, "aria-label": this.dropdownAriaLabel ?? undefined, style: styleHeight }, this.search && (h("div", { class: "ath-input" }, h("div", { class: "wrapper" }, this.renderInputSearchNew()))), h("div", { class: "ath-dropdown-option-group ath-scroll", tabindex: "-1" }, h("div", { role: "listbox", class: "ath-dropdown-option__list", id: this.listBoxId, "aria-label": this.dropdownAriaLabel }, h("slot", null)), !this.foundResults && h("div", { class: "noResult" }, " ", this.noresultText, " "))));
    };
    renderAddons = () => {
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        return [
            !!this.helperText && h(FcInputHelperText, { ...helperTextProps }),
            this.feedback === 'error' && !this.disabled && !this.readonly && h(FcInputFeedback, { ...feedbackProps }),
        ];
    };
    addDefaultPlaceholderText() {
        this.spanTextEl.innerHTML = this.placeholder || '';
    }
    assignOptionIds() {
        let optionSecuence = 0;
        this.optionList.forEach(option => {
            if (option.id == '') {
                option.id = `${this.dropdownId}-option-${++optionSecuence}`;
            }
        });
    }
    componentWillLoad() {
        this.options = Array.from(this.el.querySelectorAll('ath-dropdown-option'));
        this.optionList = this.options;
        this.assignOptionIds();
        if (this.multiselect)
            this.refeshListMultiselect();
    }
    componentDidLoad() {
        this.initialValue = this.value;
        if (this.value) {
            this.selectOptionByValue(this.value);
        }
        else {
            const preSelected = this.optionList.filter(option => option.selected);
            if (preSelected.length) {
                this.selectedOptions = preSelected;
                this.lastValue = preSelected.map(o => o.value).join(',');
                this.value = this.lastValue;
                this.setInputValue(this.value);
                this.spanTextEl.innerHTML = this.multiselect ? (this.showChips ? this.addChips() : `${preSelected.length} ${this.nochipsText}`) : preSelected[0].text;
            }
            else {
                this.addDefaultPlaceholderText();
            }
        }
    }
    formResetCallback() {
        this.value = this.initialValue;
        this.athChange.emit(this.selectedOptions);
        this.setInputValue(this.initialValue);
    }
    disconnectedCallback() {
        clearTimeout(this.timeoutSearchInpComp);
    }
    render() {
        const style = this.width ? { width: this.width } : { width: '100%' };
        const labelProps = this.getLabelProps();
        return (h(Host, { key: '9419044173ac5d5b0ca3aba14085abac3e9f032d' }, h("div", { key: 'ec5e8d0b378cb07ea4029efc3da0b2df9d853d0b', class: "ath-dropdown", style: style }, !!this.label && (h("div", { key: '416e349c8327483584e325db723ff0439713c3f1', class: "ath-dropdown__label", id: this.labelId }, h(FcInputLabel, { key: 'e872ec64bf4bc4bddb89f4a0eb1e7351ac00dc10', ...labelProps }))), h("div", { key: '4a4f99c975e2a74153218174b1741efb4cb3ba2c', class: "ath-dropdown__wrapper" }, this.renderDropdown(), this.renderList(), this.renderAddons())), h("div", { key: 'cc6a0ffefe3deb411d6c9ae9cce40c3393c2ead4', class: "sr-only", role: "status" }, this.liveMessage)));
    }
    static get formAssociated() { return true; }
    static get watchers() { return {
        "value": ["WatchValue"],
        "open": ["handleClose"]
    }; }
};
AthDropdown.style = dropdownCss;

export { AthDropdown as ath_dropdown };
//# sourceMappingURL=ath-dropdown.entry.esm.js.map
