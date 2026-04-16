import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

var CheckIconValue;
(function (CheckIconValue) {
    CheckIconValue["Check"] = "\n            <svg width=\"24px\" height=\"24px\" focusable=\"false\" aria-hidden=\"true\" >\n                <path\n                d=\"M18.3814 7.26903C18.7851 7.64592 18.8069 8.27871 18.43 8.68241L11.3146 16.3041C10.7355 16.9245 9.75749 16.9413 9.15743 16.3412L5.49209 12.6756C5.10158 12.2851 5.1016 11.6519 5.49213 11.2614C5.88267 10.8709 6.51583 10.8709 6.90634 11.2614L10.2058 14.5611L16.968 7.31759C17.3449 6.91389 17.9777 6.89215 18.3814 7.26903Z\"\n                fill=\"currentColor\"\n                />\n            </svg>\n      ";
})(CheckIconValue || (CheckIconValue = {}));

const dropdownOptionCss = ".sc-ath-dropdown-option-h .ath-dropdown-option-header.sc-ath-dropdown-option{--background:var(--ath-color-bg-alpha-default);--font-weight:var(--ath-font-weight-regular);--color:var(--ath-color-fg-default);--display-checked-ico:none}.sc-ath-dropdown-option-h .ath-dropdown-option-header.disabled.sc-ath-dropdown-option{--color:var(--ath-color-fg-disabled);pointer-events:none}.sc-ath-dropdown-option-h .ath-dropdown-option-header.sc-ath-dropdown-option:hover{--background:var(--ath-color-bg-alpha-hovered);--font-weight:var(--ath-font-weight-medium)}.sc-ath-dropdown-option-h .ath-dropdown-option-header.sc-ath-dropdown-option:active{--background:var(--ath-color-bg-alpha-pressed);--font-weight:var(--ath-font-weight-medium)}.sc-ath-dropdown-option-h .ath-dropdown-option-header.selected.sc-ath-dropdown-option{--background:var(--ath-color-input-dropdown-option-bg-selected-default);--color:var(--ath-color-fg-inverse-default);--display-checked-ico:inline-block}.sc-ath-dropdown-option-h .ath-dropdown-option-header.selected.sc-ath-dropdown-option:hover{--background:var(--ath-color-input-dropdown-option-bg-selected-hovered);--font-weight:var(--ath-font-weight-regular)}.sc-ath-dropdown-option-h .ath-dropdown-option-header.selected.sc-ath-dropdown-option:active{--background:var(--ath-color-input-dropdown-option-bg-selected-pressed);--font-weight:var(--ath-font-weight-regular)}.sc-ath-dropdown-option-h .ath-dropdown-option-header.sc-ath-dropdown-option:focus-visible{outline:none}.sc-ath-dropdown-option-h .ath-dropdown-option-header.optGroup.sc-ath-dropdown-option{--font-weight:var(--ath-font-weight-medium);pointer-events:none}.sc-ath-dropdown-option-h .ath-dropdown-option-header.active.sc-ath-dropdown-option{--box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset}.sc-ath-dropdown-option-h .ath-dropdown-option-header.active.selected.sc-ath-dropdown-option{--background:var(--ath-color-input-dropdown-option-bg-selected-default);--box-shadow:0px 0px 0px 2px var(--ath-color-border-focus) inset, 0px 0px 0px 4px var(--ath-color-drop-shadow-focus) inset}.ath-dropdown-option.sc-ath-dropdown-option-h{display:flex;flex-direction:column;width:100%;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-dropdown-option);justify-content:center;align-self:stretch;border-radius:var(--ath-border-radius-input-dropdown-option);background:var(--ath-color-bg-alpha-default);align-items:center;font-style:normal;line-height:var(--ath-font-line-height-input-dropdown-option);cursor:pointer}.ath-dropdown-option--hidden.sc-ath-dropdown-option-h{display:none}.sc-ath-dropdown-option-h .ath-dropdown-option-header.sc-ath-dropdown-option{display:flex;justify-content:center;align-self:stretch;padding:var(--ath-spacing-input-dropdown-option-padding-y) var(--ath-spacing-input-dropdown-option-padding-x);gap:var(--ath-spacing-input-dropdown-option-col-gap);align-items:center;font-weight:var(--font-weight);border-radius:var(--ath-border-radius-input-dropdown-option);background:var(--background);color:var(--color);box-shadow:var(--box-shadow)}.sc-ath-dropdown-option-h .ath-dropdown-option__list.sc-ath-dropdown-option{padding:0;margin:0;gap:var(--ath-spacing-input-dropdown-option-group-row-gap);list-style:none;display:flex;flex-direction:column;align-items:flex-start;align-self:stretch;width:100%}.sc-ath-dropdown-option-h span.sc-ath-dropdown-option{width:100%}.sc-ath-dropdown-option-h .option-checkbox.sc-ath-dropdown-option{appearance:none;-webkit-appearance:none;-moz-appearance:none;display:flex;min-width:24px;min-height:24px;max-height:24px;align-items:center;justify-content:center;border-radius:var(--ath-border-radius-checkbox);border:1px solid var(--ath-color-checkbox-border-default);background:var(--ath-color-checkbox-bg-default)}.sc-ath-dropdown-option-h .option-checkbox.sc-ath-dropdown-option svg.sc-ath-dropdown-option{display:none}.sc-ath-dropdown-option-h .option-checkbox.checked.sc-ath-dropdown-option{outline:none;border:none;color:var(--ath-color-input-dropdown-checkbox-icon-selected);border-radius:var(--ath-border-radius-checkbox);border:1px solid var(--ath-color-input-dropdown-checkbox-border-checked-selected);background:var(--ath-color-input-dropdown-checkbox-bg-checked-selected)}.sc-ath-dropdown-option-h .level.sc-ath-dropdown-option{width:16px}.sc-ath-dropdown-option-h.sc-ath-dropdown-option-s>[slot=left-asset],.sc-ath-dropdown-option-h .sc-ath-dropdown-option-s>[slot=left-asset],.sc-ath-dropdown-option-h.sc-ath-dropdown-option-s>[slot=right-asset],.sc-ath-dropdown-option-h .sc-ath-dropdown-option-s>[slot=right-asset]{display:flex}";

const AthDropdownOption = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.optSelected = createEvent(this, "optSelected", 7);
    }
    /**
     * name option
     */
    name;
    /**
     * Valor del option
     */
    value;
    /**
     * texto del option
     */
    text;
    /**
     * Si esta selecionado
     */
    selected = false;
    /**
     * Si esta deshabilitado
     */
    disabled = false;
    /**
     * Permite agrupaciones
     */
    optionGroup;
    /**
     * icono para opcion
     */
    icon;
    /**
     * etiqueta accesible para la opcionseleccionada
     */
    selectedAriaLabel = 'seleccionada';
    isMultiselect = false;
    optSelected;
    hidden = false;
    haveOptionSlot = false;
    isIngroup = false;
    activeOption = false;
    async updateMultiselect() {
        this.isMultiselect = true;
    }
    async updateGroupOption() {
        this.isIngroup = true;
    }
    async activeDropdownOption() {
        this.activeOption = true;
    }
    async noActiveDropdownOption() {
        this.activeOption = false;
    }
    async filterNotFound(inputText) {
        this.hidden = true;
        if (this.haveOptionSlot) {
            this.optionsGroup.forEach(option => {
                if (option.text.toLowerCase().includes(inputText)) {
                    this.hidden = false;
                }
            });
        }
    }
    async setSelected(selected, opts) {
        if (this.disabled || this.optionGroup)
            return;
        if (this.selected === selected)
            return;
        this.selected = selected;
        if (!opts?.silent) {
            this.optSelected.emit({ source: opts?.source ?? 'programmatic' });
        }
    }
    async filterFound() {
        this.hidden = false;
    }
    async selectOption() {
        return this.setSelected(true, { source: 'programmatic' });
    }
    async unselectOption() {
        return this.setSelected(false, { source: 'programmatic' });
    }
    get el() { return getElement(this); }
    optionsGroup;
    getOptionClassNames = () => ({
        'ath-dropdown-option': true,
        'ath-dropdown-option--hidden': this.hidden,
    });
    addLevel() {
        this.optionsGroup.forEach(option => {
            option.updateGroupOption();
        });
    }
    getClassNames = () => ({
        'ath-dropdown-option-header': true,
        'disabled': this.disabled,
        'optGroup': this.optionGroup,
        'selected': this.selected,
        'active': this.activeOption,
    });
    getCheckboxClassNames = () => ({
        'option-checkbox': true,
        'checked': this.selected,
    });
    handleClick = () => {
        if (this.disabled || this.optionGroup)
            return;
        const selectedValue = this.isMultiselect ? !this.selected : true;
        this.setSelected(selectedValue, { silent: false, source: 'user' });
    };
    componentWillLoad() {
        this.optionsGroup = Array.from(this.el.querySelectorAll('ath-dropdown-option'));
        if (this.optionGroup) {
            this.addLevel();
            this.haveOptionSlot = true;
        }
    }
    render() {
        const checkboxIconHtml = this.selected ? CheckIconValue.Check : '';
        const id = this.el.getAttribute('id');
        const ariaLabelText = this.selected ? `${this.text} ${this.selectedAriaLabel}` : this.text;
        return (h(Host, { key: '5edddb07cfbd7ca24bfaf9f3df6ab9f53668a9a2', role: this.optionGroup ? 'group' : 'option', "aria-selected": !this.optionGroup ? this.selected : undefined, class: this.getOptionClassNames(), onClick: this.handleClick, "aria-label": ariaLabelText, "aria-labelledby": this.optionGroup ? id + '-text' : undefined }, h("div", { key: 'b2fde6317a59e455dd54b33e7b8c775363c1146b', class: this.getClassNames() }, this.isIngroup && h("div", { key: 'aca78b5f73816ba48341e2d229e11614933c6841', class: "level" }), this.isMultiselect && !this.optionGroup && (h("div", { key: 'a1b5d641e318da38b098f4a08a71bd3be4cdb75b' }, h("div", { key: '1500ec86088d286ef0075f48a91e72083411ee0e', class: this.getCheckboxClassNames(), innerHTML: checkboxIconHtml }))), !!this.icon && h("ath-icon", { key: '29d8c30c50a731ef586dda031154b62ad4a8618c', icon: this.icon, color: this.selected ? 'inverse' : 'inherit' }), h("slot", { key: '10b073fe4274575b57ecdf919d5e8b5fc18e2899', name: "left-asset" }), h("span", { key: '9dd13f141d97163204b0cfe2495e1eac826b2921', id: id + '-text' }, " ", this.text), h("slot", { key: '91f111d59f803003c6ac5ce13082ec9e28f754be', name: "right-asset" }), this.selected && !this.isMultiselect && h("ath-icon", { key: '2f74ae81899b465463c1f0615a50774b8fa2710f', icon: "check", color: "inverse" })), this.haveOptionSlot && (h("div", { key: 'd6f6cb2c09c7e6fe00fc2c022dddd29e81fbf3e7', class: "ath-dropdown-option__list" }, h("slot", { key: '5f1872780621adc05e0f805a79ffbbb5c4c06537' })))));
    }
};
AthDropdownOption.style = dropdownOptionCss;

export { AthDropdownOption as ath_dropdown_option };
//# sourceMappingURL=ath-dropdown-option.entry.esm.js.map
