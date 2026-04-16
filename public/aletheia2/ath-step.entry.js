import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { S as StepRole, a as StepFeedback, b as StepperSize, c as StepAlignment, d as StepSize } from './stepper-model-DixUSIOU.js';
import './index-DLEKXOBo.js';
import { F as FcButtonComp } from './index-8mh0qKYc.js';
import { B as ButtonIconPosition } from './button.model-Cy_pPkIg.js';
import { I as IconColor } from './icon.model-D_uLkZWw.js';
import { I as IconSize } from './types-Dwt0hPp9.js';
import './fc-label-CpydWJ5O.js';

const stepCss = ".ath-visibility-hidden,.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}:host .ath-step{--bg-number:var(--ath-color-stepper-step-indicator-bg-default);--border-number:1px solid var(--ath-color-stepper-step-indicator-border-default);--color-number:var(--ath-color-stepper-step-indicator-fg-default);--border-radius-number:var(--ath-border-radius-stepper-step-indicator);--color-header:var(--ath-color-fg-default);--color-action:var(--ath-color-fg-primary-default)}:host .ath-step--clickable:hover:not(.ath-step--disabled):not(.ath-step--readonly):not(.ath-step--selected):not(.ath-step--error){--bg-number:var(--ath-color-stepper-step-indicator-bg-hovered);--border-number:1px solid var(--ath-color-stepper-step-indicator-border-hovered);--color-number:var(--ath-color-stepper-step-indicator-fg-hovered)}:host .ath-step--clickable:hover:not(.ath-step--disabled):not(.ath-step--readonly):not(.ath-step--selected) .header-text,:host .ath-step--clickable:hover:not(.ath-step--disabled):not(.ath-step--readonly):not(.ath-step--selected) .action-text{text-decoration-line:var(--ath-font-text-decoration-underline);text-decoration-style:solid;text-decoration-skip-ink:auto;text-decoration-thickness:auto;text-underline-offset:auto;text-underline-position:from-font}:host .ath-step--clickable:hover.ath-step--error:not(.ath-step--disabled){--border-radius-number:var(--ath-border-radius-stepper-step-indicator);--border-number:1px solid var(--ath-color-border-danger-hovered);--bg-number:var(--ath-color-bg-danger-hovered);--color-number:var(--ath-color-stepper-step-indicator-fg-hovered)}:host .ath-step--clickable:active:not(.ath-step--disabled):not(.ath-step--readonly):not(.ath-step--selected):not(.ath-step--error){--bg-number:var(--ath-color-stepper-step-indicator-bg-pressed);--border-number:1px solid var(--ath-color-stepper-step-indicator-border-pressed);--color-number:var(--ath-color-stepper-step-indicator-fg-pressed)}:host .ath-step--clickable:active:not(.ath-step--disabled):not(.ath-step--readonly):not(.ath-step--selected) .header-text,:host .ath-step--clickable:active:not(.ath-step--disabled):not(.ath-step--readonly):not(.ath-step--selected) .action-text{text-decoration-line:var(--ath-font-text-decoration-underline);text-decoration-style:solid;text-decoration-skip-ink:auto;text-decoration-thickness:auto;text-underline-offset:auto;text-underline-position:from-font}:host .ath-step--complete{--border-number:1px solid var(--ath-color-stepper-step-indicator-border-complete-default);--bg-number:var(--ath-color-stepper-step-indicator-bg-complete-default);--color-number:var(--ath-color-stepper-step-indicator-icon-complete-default)}:host .ath-step--complete.ath-step-wrapper-disabled{--border-number:1px solid var(--ath-color-border-alpha-boldest-disabled);--bg-number:none;--color-number:var(--ath-color-fg-disabled)}:host .ath-step--disabled{pointer-events:none;--border-number:1px solid var(--ath-color-border-alpha-boldest-disabled);--bg-number:none;--color-number:var(--ath-color-fg-disabled);--color-header:var(--ath-color-fg-disabled);--color-action:var(--ath-color-fg-disabled)}:host .ath-step--error{--border-number:1px solid var(--ath-color-border-danger-default);--bg-number:none;--color-number:var(--ath-color-stepper-step-indicator-fg-hovered);--color-header:var(--ath-color-fg-feedback-danger)}:host .ath-step--error:not(.ath-step--disabled):active .ath-step-wrapper{--border-radius-number:var(--ath-border-radius-stepper-step-indicator);--border-number:1px solid var(--ath-color-border-danger-pressed);--bg-number:var(--ath-color-bg-danger-pressed)}:host .ath-step--readonly{--color-action:var(--ath-color-fg-disabled)}:host .ath-step--readonly:not(.ath-step--selected):not(.ath-step--complete):not(.ath-step--error){--border-number:1px solid var(--ath-color-stepper-step-indicator-border-readonly);--bg-number:var(--ath-color-stepper-step-indicator-bg-readonly);--color-number:var(--ath-color-stepper-step-indicator-fg-readonly)}:host .ath-step--readonly.ath-step--complete{--border-number:1px solid var(--ath-color-stepper-step-indicator-border-complete-readonly);--bg-number:var(--ath-color-stepper-step-indicator-bg-complete-readonly);--color-number:var(--ath-color-stepper-step-indicator-icon-complete-readonly)}:host .ath-step--selected{--border-number:1px solid var(--ath-color-stepper-step-indicator-border-selected);--bg-number:var(--ath-color-stepper-step-indicator-bg-selected);--color-number:var(--ath-color-stepper-step-indicator-fg-selected)}:host .ath-step--selected.ath-step--error{--border-number:1px solid var(--ath-color-border-danger-default);--bg-number:var(--ath-color-border-danger-default)}:host .ath-button_comp--size-xs{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-sm{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-md{--button-padding:var(--ath-spacing-button-padding-around-xs)}:host .ath-button_comp--size-lg{--button-padding:var(--ath-spacing-button-padding-around-sm)}.ath-button_comp{display:inline-flex;justify-content:center;align-items:center;border-radius:var(--ath-border-radius-button);border:none;background:none;padding:var(--button-padding);outline:none;transition:background 0.5s;cursor:pointer}.ath-button_comp:focus{background:var(--ath-color-bg-alpha-focus);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus)}.ath-button_comp:hover{background:var(--ath-color-bg-alpha-hovered)}.ath-button_comp:active{background:var(--ath-color-bg-alpha-pressed);box-shadow:none}.ath-button_comp--disabled{pointer-events:none;color:var(--ath-color-button-icon-disabled)}:host{width:100%}:host .ath-step{display:flex;gap:var(--ath-spacing-stepper-step-content-info-padding-col-gap)}:host .ath-step--left--md{min-height:80px;align-items:flex-start}:host .ath-step--left--md .ath-step-wrapper{flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-stepper-step-left-col-gap-md)}:host .ath-step--left--md .ath-step__number{height:var(--ath-sizing-stepper-step-item-height-md);width:var(--ath-sizing-stepper-step-item-width-md);padding:var(--ath-spacing-stepper-step-indicator-padding-around-md);min-width:24px}:host .ath-step--left--md .ath-step__number .text{font-size:var(--ath-font-size-stepper-step-indicator-md);line-height:var(--ath-font-line-height-stepper-step-indicator-md)}:host .ath-step--left--md .ath-step-content{padding:var(--ath-spacing-stepper-step-content-info-padding-y-md) 0px;align-items:flex-start;text-align:left}:host .ath-step--left--md .ath-step_content-info{padding-top:var(--ath-spacing-stepper-step-content-padding-top-md);gap:var(--ath-spacing-stepper-step-content-row-gap)}:host .ath-step--left--md .ath-collapse-button{padding:var(--ath-spacing-stepper-step-content-info-padding-y-md) 0}:host .ath-step--left--sm{min-height:56px;align-items:flex-start}:host .ath-step--left--sm .ath-step-wrapper{flex-direction:row;align-items:flex-start;gap:var(--ath-spacing-stepper-step-left-col-gap-md)}:host .ath-step--left--sm .ath-step__number{height:var(--ath-sizing-stepper-step-item-height-sm);width:var(--ath-sizing-stepper-step-item-width-sm);padding:var(--ath-spacing-stepper-step-indicator-padding-around-sm);min-width:16px}:host .ath-step--left--sm .ath-step__number .text{font-size:var(--ath-font-size-stepper-step-indicator-sm);line-height:var(--ath-font-line-height-stepper-step-indicator-sm)}:host .ath-step--left--sm .ath-step-content{padding-bottom:var(--ath-spacing-stepper-step-content-info-padding-bottom-sm);align-items:flex-start;text-align:left}:host .ath-step--left--sm .ath-step_content-info{gap:var(--ath-spacing-stepper-step-content-row-gap)}:host .ath-step--center--md{min-height:80px;align-items:normal}:host .ath-step--center--md .ath-step-wrapper{flex-direction:column;align-items:center;gap:var(--ath-spacing-stepper-step-center-row-gap-md)}:host .ath-step--center--md .ath-step__number{height:var(--ath-sizing-stepper-step-item-height-md);width:var(--ath-sizing-stepper-step-item-width-md);padding:var(--ath-spacing-stepper-step-indicator-padding-around-md);min-width:24px}:host .ath-step--center--md .ath-step__number .text{font-size:var(--ath-font-size-stepper-step-indicator-md);line-height:var(--ath-font-line-height-stepper-step-indicator-md)}:host .ath-step--center--md .ath-step-content{align-items:center;text-align:center}:host .ath-step--center--md .ath-step_content-info{gap:var(--ath-spacing-stepper-step-content-row-gap)}:host .ath-step--center--md .ath-collapse-button{padding:var(--ath-spacing-stepper-step-content-info-padding-y-md) 0}:host .ath-step--center--sm{min-height:56px;align-items:normal}:host .ath-step--center--sm .ath-step-wrapper{flex-direction:column;align-items:center;gap:var(--ath-spacing-stepper-step-center-row-gap-md)}:host .ath-step--center--sm .ath-step__number{height:var(--ath-sizing-stepper-step-item-height-sm);width:var(--ath-sizing-stepper-step-item-width-sm);padding:var(--ath-spacing-stepper-step-indicator-padding-around-sm);min-width:16px}:host .ath-step--center--sm .ath-step__number .text{font-size:var(--ath-font-size-stepper-step-indicator-sm);line-height:var(--ath-font-line-height-stepper-step-indicator-sm)}:host .ath-step--center--sm .ath-step-content{padding-bottom:var(--ath-spacing-stepper-step-content-info-padding-bottom-sm);align-items:center;text-align:center}:host .ath-step--center--sm .ath-step_content-info{gap:var(--ath-spacing-stepper-step-content-row-gap)}:host .ath-step__number{display:flex;box-sizing:border-box;flex-direction:column;align-items:center;justify-content:center;background:var(--bg-number);border:var(--border-number);border-radius:var(--border-radius-number);color:var(--color-number)}:host .ath-step__number .text{text-align:center;font-family:var(--ath-font-family-primary);font-style:normal;font-weight:var(--ath-font-weight-medium)}:host .ath-step__divider{display:flex;padding-top:var(--ath-spacing-stepper-step-divider-padding-top);align-items:center;flex:1 0 0}:host .ath-step__divider .line{width:2px;height:100%;background-color:var(--ath-color-border-alpha-bolder-default)}:host .ath-step-indicator{display:flex;flex-direction:column;align-items:center;align-self:stretch}:host .ath-step-content{display:flex;align-items:flex-start;flex:1 0 0}:host .ath-step_content-info{display:flex;flex-direction:column;flex:1 0 0}:host .ath-step_content-info .header-text,:host .ath-step_content-info .action-text{align-self:stretch;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-md);line-height:var(--ath-font-line-height-body)}:host .ath-step_content-info .header-text{color:var(--color-header);font-style:normal;font-weight:var(--ath-font-weight-body-regular)}:host .ath-step_content-info .action-text{color:var(--color-action);font-style:normal;font-weight:var(--ath-font-weight-medium)}:host .ath-step-wrapper{display:flex;flex:1 0 0;align-self:stretch}:host .ath-step-wrapper:focus{border:none;outline:none}:host .ath-step-wrapper:focus-visible .ath-step-indicator .ath-step__number{box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}:host .ath-step--clickable{cursor:pointer}:host .ath-step--clickable.ath-step--disabled,:host .ath-step--clickable.ath-step--readonly,:host .ath-step--clickable.ath-step--selected{cursor:default}:host .ath-collapse-button{display:flex;align-items:center;gap:8px;transition:transform 0.3s ease-in-out}:host .ath-collapse-button--open{transform:rotate(-180deg)}.hidden{display:none}";

let stepSequence = 0;
const AthStep = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athClick = createEvent(this, "athClick", 7);
    }
    hostId = `step-${++stepSequence}`;
    titleId = `title-${this.hostId}`;
    panelId = `panel-${this.hostId}`;
    /**
     * Defines the action text
     */
    actionText;
    /**
     * Indicates the alignment of the step
     */
    alignment;
    /**
     * Indicates if the step is interactive
     */
    clickable;
    /**
     * Defines the accessible text for the chevron when its function is to collapse
     */
    collapseLabel;
    /**
     * Defines the accessible text for the completed state
     */
    completedLabel;
    /**
     * Indicates if the step is disabled
     */
    disabled = false;
    /**
     * Defines the accessible text for the step
     */
    athAriaLabel;
    /**
     * Defines the accessible message announced when the step changes to selected.Only applied on non-interactive steps
     */
    ariaLiveMessage;
    /**
     * Identifies the step by its position in the list
     */
    athId;
    /**
     * Indicates if the step is a button or a link
     */
    athRole = StepRole.Button;
    /**
     * Specifies the accessible text for the error indicator
     */
    errorLabel;
    /**
     * Indicates the custom accessible text for the chevron to expand
     */
    expandLabel;
    /**
     * Indicates if the step contains an error
     */
    feedback = StepFeedback.None;
    /**
     * Defines the title of the step
     */
    headingText;
    /**
     * Indicates if the step is collapsable
     */
    isCollapsable = false;
    /**
     * Indicates if the step is completed
     */
    isComplete = false;
    /**
     * Indicates if the slot is expanded
     */
    isExpanded = false;
    /**
     * Indicates the number of the step
     */
    number;
    /**
     * Indicates that the step is read-only
     */
    readonly = false;
    /**
     * Indicates that the step is in progress
     */
    selected;
    /**
     * Sets the size of the step
     */
    size;
    /**
     * Indicates the total number of steps in the stepper
     */
    total;
    athClick;
    get el() { return getElement(this); }
    isHover;
    buttonAriaLive;
    isActionVisible;
    buttonAriaLabel;
    finalcollapseLabel;
    finalexpandLabel;
    getValidAriaValue(value) {
        return value && value.trim() !== '' ? value : undefined;
    }
    componentWillLoad() {
        this.isActionVisible = this.actionText && this.clickable && !this.disabled && !this.readonly && !this.selected;
        this.getStepAria('label');
        this.getStepAria('live');
        this.getChevronAriaLabels();
    }
    componentWillUpdate() {
        this.isActionVisible = this.actionText && this.clickable && !this.disabled && !this.readonly && !this.selected;
    }
    getClassNames = () => ({
        'ath-step': true,
        [`ath-step--${this.alignment}--${this.size}`]: !!this.alignment && !!this.size,
        [`ath-step--complete`]: this.isComplete === true,
        [`ath-step--disabled`]: this.disabled === true,
        [`ath-step--error`]: this.feedback === StepFeedback.Error && !this.disabled,
        [`ath-step--readonly`]: this.readonly === true,
        [`ath-step--selected`]: this.selected === true,
        [`ath-step--clickable`]: this.clickable === true,
    });
    renderIndicator = () => {
        const iconSize = this.size === StepperSize.Medium ? IconSize.Medium : IconSize.Extrasmall;
        return (h("div", { class: "ath-step-indicator" }, h("div", { class: "ath-step__number" }, this.isComplete ? (h("ath-icon", { icon: "completed", color: !this.disabled ? IconColor.Inverse : IconColor.Disabled, size: iconSize })) : this.feedback === StepFeedback.Error ? (h("ath-icon", { icon: "failed", color: this.disabled ? IconColor.Disabled : this.selected || this.isHover ? IconColor.Inverse : IconColor.Error, size: iconSize })) : (h("div", { class: "text" }, this.number || 0))), this.alignment === StepAlignment.Left && (h("div", { class: "ath-step__divider" }, h("div", { class: "line" })))));
    };
    renderContent = () => {
        return (h("div", { class: "ath-step-content" }, h("div", { class: "ath-step_content-info" }, h("div", { class: "header-text", id: this.titleId }, this.headingText), this.isActionVisible && h("div", { class: "action-text" }, this.actionText), h("div", { "aria-labelledby": this.titleId, "aria-hidden": !this.isExpanded ? 'true' : 'false', class: this.alignment === StepAlignment.Left && !this.isExpanded && 'ath-visibility-hidden', id: this.panelId }, h("slot", null)))));
    };
    collapseButton = () => {
        const size = this.size === StepSize.Sm ? 'xs' : 'md';
        return (h("div", { class: {
                'ath-collapse-button': true,
                'ath-collapse-button--open': this.isExpanded,
            } }, h(FcButtonComp, { icon: "chevron_down", color: this.disabled ? IconColor.Disabled : IconColor.Default, iconPosition: ButtonIconPosition.IconOnly, size: size, onClick: this.handleCollapse, buttonAriaLabel: this.isExpanded ? this.finalcollapseLabel : this.finalexpandLabel, "aria-controls": this.isCollapsable ? this.panelId : undefined, "aria-expanded": this.isExpanded, disabled: this.disabled })));
    };
    handleClick = () => {
        if (this.isActionVisible) {
            this.athClick.emit(this.athId);
        }
    };
    handleKeyDown(event) {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            event.stopPropagation();
            this.handleClick();
        }
    }
    handleCollapse = () => {
        this.isExpanded = !this.isExpanded;
    };
    getStepAria(labelType) {
        const ariaProperty = labelType === 'label' ? this.athAriaLabel : this.ariaLiveMessage;
        const replacements = {
            '[number]': this.number ? this.number.toString() : '',
            '[total]': this.total ? this.total.toString() : '',
            '[heading-text]': this.headingText ? this.headingText : '',
            '[action-text]': this.actionText ? this.actionText : '',
            '[completed]': this.completedLabel ? this.completedLabel : '',
            '[error]': this.errorLabel ? this.errorLabel : '',
        };
        let statelessButtonAria;
        if (ariaProperty) {
            statelessButtonAria = ariaProperty.replace(/\[number\]|\[total\]|\[heading-text\]|\[action-text\]|\[completed\]|\[error\]/g, match => replacements[match]);
        }
        let stateButtonAria = statelessButtonAria;
        if (ariaProperty && ariaProperty.includes('[state-label]')) {
            if (this.isComplete && this.completedLabel) {
                stateButtonAria = statelessButtonAria.replace('[state-label]', this.completedLabel);
            }
            else if (this.feedback === StepFeedback.Error && this.errorLabel) {
                stateButtonAria = statelessButtonAria.replace('[state-label]', this.errorLabel);
            }
            else {
                stateButtonAria = statelessButtonAria.replace('[state-label]', '');
            }
        }
        if (labelType === 'label') {
            this.buttonAriaLabel = stateButtonAria;
        }
        else {
            this.buttonAriaLive = stateButtonAria;
        }
    }
    getChevronAriaLabels = () => {
        if (this.collapseLabel) {
            this.finalcollapseLabel = this.collapseLabel.replace('[number]', this.number.toString()).replace('[heading-text]', this.headingText);
        }
        if (this.expandLabel) {
            this.finalexpandLabel = this.expandLabel.replace('[number]', this.number.toString()).replace('[heading-text]', this.headingText);
        }
    };
    render() {
        return (h(Host, { key: '764eeca7843dd9f34ea635d9f96491d6cccbd0b2', role: "listitem" }, h("div", { key: 'e4ba759264c443174016b0721920f063e24e96ce', class: this.getClassNames(), onMouseEnter: () => {
                if (!this.disabled && this.clickable) {
                    this.isHover = true;
                }
            }, onMouseLeave: () => {
                this.isHover = false;
            } }, h("div", { key: '3bbbc724acbbc696c362ef80a6db656739ec1f6d', class: "ath-step-wrapper", tabindex: this.isActionVisible ? 0 : -1, onClick: this.handleClick, onKeyDown: e => this.handleKeyDown(e), role: this.isActionVisible ? this.athRole : undefined, "aria-current": this.selected ? 'step' : undefined, "aria-describedby": this.getValidAriaValue(this.panelId), "aria-disabled": this.disabled, "aria-label": this.isActionVisible ? this.getValidAriaValue(this.buttonAriaLabel) : undefined }, this.renderIndicator(), this.renderContent(), !this.isActionVisible && (h("div", { key: 'b0cde256f320ffacd7174853195fe812acc5fa09', class: "ath-visibility-hidden", role: "status", "aria-live": "polite", "aria-atomic": "true" }, this.selected && this.getValidAriaValue(this.buttonAriaLive)))), this.isCollapsable && this.alignment === StepAlignment.Left && this.collapseButton())));
    }
};
AthStep.style = stepCss;

export { AthStep as ath_step };
//# sourceMappingURL=ath-step.entry.esm.js.map
