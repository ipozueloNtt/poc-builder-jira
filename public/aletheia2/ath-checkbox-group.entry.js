import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import './index-8mh0qKYc.js';
import { C as CheckboxValue } from './checkbox.model-DynFLFRk.js';
import { F as FcInputLabel, a as FcInputHelperText, b as FcInputFeedback } from './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

var FeedbackType;
(function (FeedbackType) {
    FeedbackType["None"] = "none";
    FeedbackType["Error"] = "error";
    FeedbackType["Success"] = "success";
})(FeedbackType || (FeedbackType = {}));

const checkboxGroupCss = ":host{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary)}:host .ath-input__helper-text{display:flex;justify-content:flex-start;align-items:center;align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback{display:flex;align-items:flex-start;gap:var(--ath-spacing-feedback-text-col-gap);align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-sm);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}:host .ath-input__feedback--error{color:var(--ath-color-fg-feedback-danger)}:host .ath-input__feedback--success{color:var(--ath-color-fg-feedback-success)}:host .ath-input__feedback--warning{color:var(--ath-color-fg-feedback-warning)}:host .padding{display:flex;padding-top:var(--ath-spacing-feedback-text-padding-top);align-items:center}:host .ath-input__label{display:flex;flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-label-col-gap);font-family:var(--ath-font-family-primary);color:var(--ath-color-fg-default);font-weight:var(--ath-font-weight-medium);font-size:var(--ath-font-size-input-label);line-height:var(--ath-font-line-height-input-label)}:host .ath-input__label__wrapper{display:flex;align-items:center;gap:var(--ath-spacing-label-required-col-gap)}:host .ath-input__label ath-icon{color:var(--ath-color-fg-default)}:host .ath-input__label .required{color:var(--ath-color-fg-feedback-danger);padding-left:4px}:host .ath-input__label ath-button{display:flex;flex-direction:row;align-items:center;justify-content:center;width:24px;height:24px}:host .ath-checkbox--group{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-checkbox-group-row-gap);border:none;margin:0px;padding:0px}:host .ath-checkbox--group__items{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-checkbox-group-row-gap);align-self:stretch}:host .ath-checkbox--group .sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}";

let checkboxGroupSequence = 0;
const AthCheckBoxGroup = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChecked = createEvent(this, "athChecked", 7);
    }
    checkboxGroupId = `checkbox-group-${++checkboxGroupSequence}`;
    checkboxGroupHelperTextId = `${this.checkboxGroupId}-helper-text`;
    checkboxGroupFeedbackId = `${this.checkboxGroupId}-feedback`;
    srOnlyId = `${this.checkboxGroupId}-sr-only`;
    get el() { return getElement(this); }
    /**
     * Indica si esta deshabilitado
     */
    disabled = false;
    /**
     * Indica el tipo de feedback
     */
    feedback = FeedbackType.None;
    /**
     * Texto feedback
     */
    feedbackText;
    /**
     * Texto ayuda
     */
    helperText;
    /**
     * Texto para el Label
     */
    label;
    /**
     * Atributo name a aplicar a todo el grupo
     */
    name;
    /**
     * Indica si es solo lectura
     */
    readonly = false;
    /**
     * Indica si se muestra el asterisco
     */
    showRequired = false;
    /**
     * Indica el texto del tooltip
     */
    tooltipText;
    /**
     * Indica el ancho de la burbuja tooltip
     */
    tooltipWidth = 0;
    // ACCESSIBILITY
    /**
     * Texto oculto para lectores de pantalla indicando que el grupo es requerido
     */
    requiredAriaLabel;
    // EVENTS
    /**
     * Emite el array de checkboxes seleccionados
     */
    athChecked;
    componentDidLoad() {
        this.spreadProperties();
        this.initializeSelectedCheckboxes();
    }
    /**
     * Propagate attributes from parent to children.
     * Set boolean attributes only for true.
     */
    spreadProperties() {
        const checkboxes = this.el.querySelectorAll('ath-checkbox');
        checkboxes.forEach((checkbox) => {
            if (this.readonly) {
                checkbox.readonly = true;
            }
            if (this.disabled) {
                checkbox.disabled = true;
            }
            if (this.name !== undefined) {
                checkbox.name = this.name;
            }
        });
    }
    selectedCheckboxes = [];
    initializeSelectedCheckboxes() {
        const checkboxes = Array.from(this.el.querySelectorAll('ath-checkbox'));
        checkboxes.forEach(checkbox => {
            const checkboxElement = checkbox;
            const label = checkboxElement.getAttribute('label');
            const name = checkboxElement.getAttribute('name');
            const value = checkboxElement.getAttribute('value');
            if (value === CheckboxValue.True) {
                this.selectedCheckboxes.push({ label: label, name: name, value: value });
            }
        });
    }
    handleChildCheckboxChange(event) {
        event.stopPropagation();
        this.updateSelectedCheckboxes(event.detail);
    }
    updateSelectedCheckboxes(checkboxChangeEventDetail) {
        const { label, name, value } = checkboxChangeEventDetail;
        const index = this.selectedCheckboxes.findIndex(selected => selected.label === label);
        if (index === -1) {
            this.selectedCheckboxes.push({ label, name, value });
        }
        else {
            this.selectedCheckboxes.splice(index, 1);
        }
        this.athChecked.emit(this.selectedCheckboxes);
    }
    ariaDescribedBy = () => {
        const descriptions = {};
        if (this.helperText != undefined)
            descriptions[this.checkboxGroupHelperTextId] = this.checkboxGroupHelperTextId;
        if (this.feedback != FeedbackType.None)
            descriptions[this.checkboxGroupFeedbackId] = this.checkboxGroupFeedbackId;
        return descriptions;
    };
    getAttributesGroup() {
        const describedByIds = Object.keys(this.ariaDescribedBy()).length !== 0 ? Object.keys(this.ariaDescribedBy()).join(' ') : undefined;
        const ariaLabelledByIds = this.showRequired ? `${this.checkboxGroupId} ${this.srOnlyId}` : this.checkboxGroupId;
        return {
            'role': 'group',
            'id': this.checkboxGroupId,
            'name': this.name,
            'aria-label': !!this.label ? this.label : undefined,
            'aria-labelledby': ariaLabelledByIds,
            'aria-describedby': describedByIds,
            'aria-invalid': this.feedback === FeedbackType.Error ? 'true' : undefined,
        };
    }
    getFeedbackProps = () => ({
        id: this.checkboxGroupFeedbackId,
        type: this.feedback,
        text: this.feedbackText,
    });
    getHelperTextProps = () => {
        return {
            id: this.checkboxGroupHelperTextId,
            text: !!this.helperText ? this.helperText.trim() : '',
        };
    };
    getLabelProps = () => ({
        htmlForId: this.checkboxGroupId,
        label: this.label,
        showRequired: this.showRequired,
        required: this.showRequired,
        tooltipText: this.tooltipText,
        tooltipWidth: this.tooltipWidth,
    });
    render() {
        const ariaAttributes = this.getAttributesGroup();
        const labelProps = this.getLabelProps();
        const helperTextProps = this.getHelperTextProps();
        const feedbackProps = this.getFeedbackProps();
        return (h(Host, { key: '708360511510bfbf5a642f537391b3f04c502fbb' }, h("fieldset", { key: 'd05643775860a831b59495775b9af9ed2a468f35', class: "ath-checkbox--group", ...ariaAttributes }, !!this.label && h(FcInputLabel, { key: '2485cae4afaa6666ecadaf60c9f38f7534f0f2de', ...labelProps }), this.showRequired && (h("div", { key: 'f1485daeb8e15b44e5e1a6d02c7ee1344c93e145', id: this.srOnlyId, class: "sr-only" }, this.requiredAriaLabel)), h("div", { key: '22f6e1aadb2697c55233c3f8f300116657f86ae0', class: "ath-checkbox--group__items" }, h("slot", { key: '3a9c009fb5d1926223c144f64e46e78977eadf20' })), this.helperText && h(FcInputHelperText, { key: '9d3c8f524a9ecc0678518df1e6447a65e62e0f07', ...helperTextProps }), this.feedback === 'error' && !this.disabled && !this.readonly && h(FcInputFeedback, { key: '9f5411b484b8092c801f7e36e4525168b13545f2', ...feedbackProps }))));
    }
};
AthCheckBoxGroup.style = checkboxGroupCss;

export { AthCheckBoxGroup as ath_checkbox_group };
//# sourceMappingURL=ath-checkbox-group.entry.esm.js.map
