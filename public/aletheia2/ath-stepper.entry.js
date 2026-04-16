import { r as registerInstance, e as createEvent, a as getElement, h } from './index-Bf9CG7gQ.js';
import { S as StepRole, e as StepperOrientation, b as StepperSize, c as StepAlignment, d as StepSize } from './stepper-model-DixUSIOU.js';

const stepperCss = ":host .ath-stepper--horizontal{--stepper-direction:row;--group-gap:var(--ath-spacing-stepper-horizontal-col-gap)}:host .ath-stepper--vertical{--stepper-direction:column;--group-gap:var(--ath-spacing-stepper-vertical-row-gap)}:host .ath-stepper{display:flex;width:100%;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-stepper-row-gap)}:host .ath-stepper_heading{display:flex;align-items:center;gap:var(--ath-spacing-stepper-header-col-gap);align-self:stretch}:host .ath-stepper_heading-icon{display:flex;padding:var(--ath-spacing-stepper-header-icon-padding-around);align-items:center;gap:8px;border-radius:var(--ath-border-radius-stepper-header-icon);border:1px solid var(--ath-color-stepper-header-icon-border);background:var(--ath-color-stepper-header-icon-bg)}:host .ath-stepper_heading-text{flex:1 0 0;color:var(--ath-color-stepper-header-fg);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-heading-4);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-4)}:host .ath-stepper .ath-step_group{display:flex;flex-direction:var(--stepper-direction);align-items:flex-start;gap:var(--group-gap);align-self:stretch;margin:0px;padding:0px}:host .ath-stepper .ath-step_steps{display:flex;flex-direction:column;align-items:center;gap:var(--ath-spacing-stepper-step-group-row-gap);align-self:stretch}:host .ath-stepper .ath-step_progressbar{display:flex;align-items:flex-start;gap:var(--ath-spacing-stepper-step-group-progress-bar-col-gap);align-self:stretch}";

let stepperSequence = 0;
const AthStepper = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athSelect = createEvent(this, "athSelect", 7);
    }
    hostId = ++stepperSequence;
    headingId = `tab-${this.hostId}`;
    timeoutProgressBarComp;
    get el() { return getElement(this); }
    /**
     * Indicates if the steps are interactive
     */
    clickable = true;
    /**
     * Indicates the custom accessible text for the chevron to collapse
     */
    collapseLabel = 'Colapsar paso [number]';
    /**
     * Specifies the accessible text for the CHECK indicator of completion, which will be injected into the steps
     */
    completedLabel = 'Completado';
    /**
     * Defines the accessible text for the step
     */
    athAriaLabel;
    /**
     * Defines the message for screen readers when changing the step. Only applied on non-interactive steps
     */
    ariaLiveMessage = 'Paso actual [number]';
    /**
     * Indicates the role of the step
     */
    athRole = StepRole.Button;
    /**
     * Specifies the accessible text for the error indicator in steps
     */
    errorLabel = 'Error';
    /**
     * Indicates the custom accessible text for the chevron to expand
     */
    expandLabel = 'Expandir paso [number]';
    /**
     * Indicates the icon to use in the title
     */
    headingIcon;
    /**
     * Indicates the title of the stepper
     */
    headingText;
    /**
     * Indicates the orientation of the stepper
     */
    orientation = StepperOrientation.Horizontal;
    /**
     * Indicates if the all the steps are read-only
     */
    readonly = false;
    /**
     * Indicates the size of the steps
     */
    size = StepperSize.Medium;
    /**
     * Indicates the number of the first step
     */
    startFrom = 1;
    athSelect;
    componentWillLoad() {
        this.injectToSteps();
    }
    componentDidLoad() {
        this.manageDividers();
        this.manageProgressBar();
    }
    getValidAriaValue(value) {
        return value && value.trim() !== '' ? value : undefined;
    }
    injectToSteps = () => {
        const steps = Array.from(this.el.querySelectorAll('ath-step'));
        steps.forEach((stepElement, index) => {
            if (this.clickable) {
                stepElement.clickable = this.clickable;
            }
            if (this.collapseLabel) {
                stepElement.collapseLabel = this.collapseLabel;
            }
            if (!stepElement.completedLabel && this.completedLabel) {
                stepElement.completedLabel = this.completedLabel;
            }
            if (this.errorLabel) {
                stepElement.errorLabel = this.errorLabel;
            }
            if (this.expandLabel) {
                stepElement.expandLabel = this.expandLabel;
            }
            if (this.readonly) {
                stepElement.readonly = this.readonly;
            }
            if (!stepElement.number) {
                stepElement.number = this.startFrom + index;
            }
            if (!stepElement.athAriaLabel) {
                stepElement.athAriaLabel = this.getValidAriaValue(this.athAriaLabel);
            }
            if (!stepElement.ariaLiveMessage) {
                stepElement.ariaLiveMessage = this.getValidAriaValue(this.ariaLiveMessage);
            }
            stepElement.athRole = this.athRole || StepRole.Button;
            stepElement.alignment = this.orientation === StepperOrientation.Horizontal ? StepAlignment.Center : StepAlignment.Left;
            stepElement.athId = index;
            stepElement.size = !(this.size === StepperSize.Medium) ? StepSize.Sm : StepSize.Md;
            stepElement.total = steps.length;
        });
    };
    manageDividers = () => {
        const steps = Array.from(this.el.querySelectorAll('ath-step'));
        steps.forEach((stepElement, index) => {
            if (this.orientation === StepperOrientation.Horizontal) {
                if (index < steps.length - 1) {
                    const div = document.createElement('div');
                    div.innerHTML = '<ath-divider></ath-divider>';
                    div.role = 'listitem';
                    div.style.width = '100%';
                    div.style.transform = 'translateY(24px)';
                    stepElement.insertAdjacentElement('afterend', div);
                    if (this.readonly) {
                        div.style.visibility = 'hidden';
                        div.style.opacity = '0';
                    }
                }
            }
            else {
                const line = steps[index].shadowRoot.querySelector('.line');
                if (line) {
                    if (this.readonly) {
                        line.classList.add('hidden');
                    }
                    else {
                        if (index + 1 === steps.length) {
                            line.classList.add('hidden');
                        }
                    }
                }
            }
        });
    };
    checkDetailData(ev) {
        if (ev.detail != null || ev.detail != undefined) {
            if (ev.detail || ev.detail == 0) {
                return true;
            }
        }
        return false;
    }
    manageSelectedStepId(ev) {
        if (this.checkDetailData(ev)) {
            const stepPosition = ev.detail;
            this.manageSelection(stepPosition);
            const steps = Array.from(this.el.querySelectorAll('ath-step'));
            this.athSelect.emit(steps[stepPosition]);
            this.manageProgressBar();
            ev.stopPropagation();
        }
    }
    disconnectedCallback() {
        if (this.timeoutProgressBarComp)
            clearTimeout(this.timeoutProgressBarComp);
    }
    manageProgressBar() {
        if (this.timeoutProgressBarComp)
            clearTimeout(this.timeoutProgressBarComp);
        const progressBars = Array.from(this.el.shadowRoot.querySelectorAll('ath-progress-bar'));
        const steps = Array.from(this.el.querySelectorAll('ath-step'));
        const stepIndex = steps.findIndex(item => item.selected === true);
        let progress = 0;
        progressBars.forEach((progressElement, index) => {
            progressElement.athAriaLabel = `Progreso del paso ${index + 1} de ${steps.length}`;
            if (index <= stepIndex) {
                progressElement.valueText = index === stepIndex ? 'Actual' : this.completedLabel;
                if (progressElement.value !== 1) {
                    this.timeoutProgressBarComp = setTimeout(() => {
                        progressElement.value = 1;
                    }, 240 * progress);
                    ++progress;
                }
            }
            else {
                progressElement.value = 0;
                progressElement.valueText = 'Pendiente';
            }
        });
    }
    manageSelection = id => {
        const steps = Array.from(this.el.querySelectorAll('ath-step'));
        steps.forEach(stepElement => {
            stepElement.selected = false;
        });
        steps[id].selected = true;
    };
    getClassNames = () => ({
        'ath-stepper': true,
        [`ath-stepper--${this.orientation}`]: !!this.orientation,
    });
    renderProgressBar() {
        const progressBarArray = [];
        const steps = Array.from(this.el.querySelectorAll('ath-step'));
        const totalSteps = steps.length - 1;
        for (let i = 0; i <= totalSteps; i++) {
            progressBarArray.push(h("ath-progress-bar", { infinite: false, "label-alignment": "stack", max: 1, min: 0, value: 0 }));
        }
        return progressBarArray;
    }
    renderStepGroup = () => {
        return (h("div", { role: "list", class: "ath-step_group", "aria-labelledby": this.headingId }, h("slot", null)));
    };
    renderSteps = () => {
        if (this.orientation === StepperOrientation.Horizontal) {
            const progressBarArray = this.orientation === StepperOrientation.Horizontal ? this.renderProgressBar() : '';
            return (h("div", { class: "ath-step_steps" }, h("div", { class: "ath-step_progressbar" }, progressBarArray), this.renderStepGroup()));
        }
        else {
            return this.renderStepGroup();
        }
    };
    render() {
        return (h("section", { key: '0812a7cc5a75386ae07c6fef84e847dfe519d2d5' }, h("div", { key: '31e04cc19044747d38a10e915002b9f1c56ce663', class: this.getClassNames() }, this.headingText && (h("div", { key: '0fa2c7929342e2df6ca5e6a35c8a93ca0caff442', class: "ath-stepper_heading" }, this.headingIcon && (h("div", { key: 'd1ef74b2843573f58fffc472846da393a78e59f4', class: "ath-stepper_heading-icon" }, h("ath-icon", { key: '1b6583d403435eb2dfc63868435124a66c30ec18', icon: this.headingIcon, size: "lg", color: "primary", "aria-hidden": "true" }))), h("div", { key: 'fc9304a29248830b69d6b5baa974b146cd9f6786', class: "ath-stepper_heading-text", id: this.headingId }, this.headingText))), this.renderSteps())));
    }
};
AthStepper.style = stepperCss;

export { AthStepper as ath_stepper };
//# sourceMappingURL=ath-stepper.entry.esm.js.map
