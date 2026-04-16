import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const ProgressBarLabelAlignment = {
    Inline: 'inline',
    Stack: 'stack',
};

const progressBarCss = ":host{width:100%}:host .ath-progress-bar{display:flex}:host .ath-progress-bar-temporal{display:flex;justify-content:space-between}:host .ath-progress-bar-item{width:100%;height:var(--ath-sizing-progress-bar-item-height);border-radius:var(--ath-border-radius-slider-controller-trail);background:var(--ath-color-slider-controller-trail-bg-default);position:relative;overflow:hidden}:host .ath-progress-bar__filler{height:var(--ath-sizing-progress-bar-item-height);border-radius:var(--ath-border-radius-progress-bar-item-track);background:var(--ath-color-slider-controller-trail-bg-selected);width:calc(var(--progress-value, 0) * 1%);transition:width 0.3s ease}:host .ath-progress-bar__filler.infinite{animation:loading 1.5s linear infinite;position:absolute;width:75px}:host .ath-progress-bar-label{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-input-text);font-style:normal;font-weight:var(--ath-font-weight-regular);line-height:var(--ath-font-line-height-body)}:host .ath-progress-bar-label.left{text-align:left}:host .ath-progress-bar-label.right{margin-left:auto}:host .ath-progress-bar--stack{flex-direction:column;gap:var(--ath-spacing-progress-bar-stack-row-gap)}:host .ath-progress-bar--inline{gap:var(--ath-spacing-progress-bar-inline-col-gap);align-items:center;white-space:nowrap}@keyframes loading{0%{left:0%}100%{left:100%}}";

let inputCounterSeq = 0;
const AthProgressBar = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    get el() { return getElement(this); }
    /**
     * Infinite determines if the progress bar is a loop or not
     */
    infinite = false;
    /**
     * Text of the label left
     */
    labelLeft;
    /**
     * Text of the label right
     */
    labelRight;
    /**
     * Change label alignment
     */
    labelAlignment = ProgressBarLabelAlignment.Stack;
    /**
     * Number min of progress bar
     */
    min = 0;
    /**
     * Number max of progress bar
     */
    max = 100;
    /**
     * Value of the progress bar
     */
    value;
    /**
     * Value text of the progress bar
     */
    valueText;
    /**
     * Aria Label
     */
    athAriaLabel;
    /**
     * Calculate the percetage of value
     */
    get valuePercentage() {
        // Calcula el porcentaje relativo entre min y max
        const clampedValue = Math.max(this.min, Math.min(this.max, this.value));
        const range = this.max - this.min;
        if (range === 0)
            return 0;
        return ((clampedValue - this.min) / range) * 100;
    }
    //Generador de ID dinamicos para accesibilidad
    uniqueId = (() => {
        return (prefix) => {
            const normalized = prefix
                .replace(/\s+/g, '-') // espacios por guiones
                .replace(/([a-z])([A-Z])/g, '$1-$2') // camelCase a kebab-case
                .toLowerCase();
            return `${normalized}-${++inputCounterSeq}`;
        };
    })();
    getHostAtributtes = () => {
        return {
            'role': 'progressbar',
            'aria-valuenow': this.infinite ? undefined : this.value > this.max ? this.max : this.value < this.min ? this.min : this.value,
            'aria-valuemin': this.infinite ? undefined : this.min,
            'aria-valuemax': this.infinite ? undefined : this.max,
            'aria-valuetext': this.valueText ?? undefined,
            'aria-label': this.athAriaLabel || undefined,
        };
    };
    getClassNames = () => ({
        'ath-progress-bar': true,
        [`ath-progress-bar--${this.labelAlignment}`]: !!this.labelAlignment,
    });
    getFillerClassNames = () => ({
        'ath-progress-bar__filler': true,
        'infinite': this.infinite,
    });
    render() {
        // Genera los IDs solo si hay label
        const labelLeftId = this.labelLeft ? this.uniqueId(this.labelLeft) : undefined;
        const labelRightId = this.labelRight ? this.uniqueId(this.labelRight) : undefined;
        // Prepara aria-labelledby
        const ariaLabelledBy = !this.athAriaLabel && (labelLeftId || labelRightId) ? [labelLeftId, labelRightId].filter(Boolean).join(' ') : undefined;
        return (h(Host, { key: 'fa8576982a9c77f9b6a07d55d65f5b011a35c115' }, h("div", { key: '1af0beac3ca1eac2baaaac8f330fa039e13a4952', class: this.getClassNames() }, this.labelLeft && this.labelAlignment === 'inline' && (h("span", { key: '36ada15a39d5e27713d4c0ba16071fa72ae1a916', id: labelLeftId, class: "ath-progress-bar-label left" }, this.labelLeft)), h("div", { key: '6ceb32294923f76b2926fd383f8e434e4ba4a1f9', ...this.getHostAtributtes(),
            'aria-labelledby': ariaLabelledBy, class: "ath-progress-bar-item", style: { '--progress-value': `${this.valuePercentage}` } }, h("div", { key: '78849766ae3c3de8458003d4108e6a7fdd77cf3b', class: this.getFillerClassNames() })), (this.labelLeft || this.labelRight) && this.labelAlignment === 'stack' && (h("div", { key: 'c2b19f3219d911ad34b6bc848071e3f765cbfa82', class: "ath-progress-bar-temporal" }, this.labelLeft && (h("span", { key: '18eb86a3b03257501f700781d1921f4bb4d7db0a', id: labelLeftId, class: "ath-progress-bar-label left" }, this.labelLeft)), this.labelRight && (h("span", { key: '81dd3501e278c52c1030ac51eb9a4d3ba2337799', id: labelRightId, class: "ath-progress-bar-label right" }, this.labelRight)))))));
    }
};
AthProgressBar.style = progressBarCss;

export { AthProgressBar as ath_progress_bar };
//# sourceMappingURL=ath-progress-bar.entry.esm.js.map
