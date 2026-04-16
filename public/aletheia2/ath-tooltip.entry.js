import { r as registerInstance, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

const TooltipColor = {
    Primary: 'primary',
    Secondary: 'secondary',
};
const TooltipPosition = {
    Top: 'top',
    Right: 'right',
    Bottom: 'bottom',
    Left: 'left',
    TopLeft: 'top-left',
    TopRight: 'top-right',
    BottomLeft: 'bottom-left',
    BottomRight: 'bottom-right',
};
const TooltipTrigger = {
    Hover: 'hover',
    Click: 'click',
};

const tooltipCss = "[size=xs].sc-ath-tooltip-h{display:block;height:16px}[size=sm].sc-ath-tooltip-h{display:block;height:20px}[size=md].sc-ath-tooltip-h{display:block;height:24px}[size=lg].sc-ath-tooltip-h{display:block;height:32px}.sc-ath-tooltip-h .ath-tooltip--primary.sc-ath-tooltip{--background-color:var(--ath-color-tooltip-bg-primary);--color:var(--ath-color-tooltip-fg)}.sc-ath-tooltip-h .ath-tooltip--secondary.sc-ath-tooltip{--background-color:var(--ath-color-tooltip-bg-secondary);--color:var(--ath-color-tooltip-fg)}.sc-ath-tooltip-h{width:fit-content}.sc-ath-tooltip-h .ath-tooltip-container.sc-ath-tooltip{position:relative;text-align:center;font-family:var(--ath-font-family-primary);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:100%;width:fit-content;height:fit-content}.sc-ath-tooltip-h .ath-tooltip.sc-ath-tooltip{--tooltip-arrow-translation:12px;line-height:150%;position:absolute;color:var(--color);background-color:var(--background-color);border-radius:var(--ath-border-radius-tooltip);font-size:var(--ath-font-size-body-md);text-align:center;white-space:nowrap;z-index:10;opacity:0;pointer-events:none;transition:opacity 0.3s ease;visibility:hidden;max-width:var(--max-width);white-space:normal;width:max-content;padding-top:var(--ath-spacing-tooltip-padding-y);padding-right:var(--ath-spacing-tooltip-padding-x);padding-bottom:var(--ath-spacing-tooltip-padding-y);padding-left:var(--ath-spacing-tooltip-padding-x)}.sc-ath-tooltip-h .ath-tooltip--visible.sc-ath-tooltip{opacity:1;pointer-events:auto;visibility:visible}.sc-ath-tooltip-h .ath-tooltip--clickable.sc-ath-tooltip:hover{opacity:1;pointer-events:auto;visibility:visible;cursor:pointer}.sc-ath-tooltip-h .ath-tooltip.sc-ath-tooltip::after{content:\"\";position:absolute;width:11.3px;height:11.3px;transform:rotate(45deg);background-color:var(--background-color)}.sc-ath-tooltip-h .ath-tooltip--no-arrow.sc-ath-tooltip::after{display:none}.sc-ath-tooltip-h .ath-tooltip--top.sc-ath-tooltip::after{bottom:-5px;right:calc(50% - 6px);border-radius:0px 0px 2px 0px}.sc-ath-tooltip-h .ath-tooltip--right.sc-ath-tooltip::after{top:50%;left:-9px;border-radius:0px 0px 0px 2px;transform:rotate(45deg) translateY(-50%)}.sc-ath-tooltip-h .ath-tooltip--bottom.sc-ath-tooltip::after{top:-5px;right:calc(50% - 6px);border-radius:2px 0px 0px 0px}.sc-ath-tooltip-h .ath-tooltip--left.sc-ath-tooltip::after{top:50%;right:-2px;border-radius:0px 2px 0px 0px;transform:rotate(45deg) translateY(-50%)}.sc-ath-tooltip-h .ath-tooltip--top-left.sc-ath-tooltip::after{bottom:-5px;right:calc(2px + var(--tooltip-arrow-translation));border-radius:0px 0px 2px 0px}.sc-ath-tooltip-h .ath-tooltip--top-right.sc-ath-tooltip::after{bottom:-5px;left:calc(2px + var(--tooltip-arrow-translation));border-radius:0px 0px 2px 0px}.sc-ath-tooltip-h .ath-tooltip--bottom-left.sc-ath-tooltip::after{top:-5px;right:calc(2px + var(--tooltip-arrow-translation));border-radius:2px 0px 0px 0px}.sc-ath-tooltip-h .ath-tooltip--bottom-right.sc-ath-tooltip::after{top:-5px;left:calc(2px + var(--tooltip-arrow-translation));border-radius:2px 0px 0px 0px}.sc-ath-tooltip-h .ath-tooltip-trigger.sc-ath-tooltip{display:flex;cursor:pointer}.sc-ath-tooltip-h .ath-tooltip-trigger.sc-ath-tooltip .ath-tooltip-container.sc-ath-tooltip{display:flex}.sc-ath-tooltip-h:focus,.sc-ath-tooltip-h:focus-visible{border-radius:var(--ath-border-radius-tooltip-trigger);box-shadow:0px 0px 0px 2px var(--ath-color-border-focus);display:block;outline:none}";

let tooltipSequence = 0;
const AthTooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    hostId = ++tooltipSequence;
    tooltipId = `tooltip-${this.hostId}`;
    /**
     * Whether the tooltip has an arrow
     */
    hasArrow = true;
    /**
     * The position of the tooltip
     */
    position = TooltipPosition.Right;
    /**
     * The variant of the tooltip
     */
    color = TooltipColor.Primary;
    /**
     * Whether the tooltip has a maximum width, and if so, the maximum width
     */
    maxWidth = 240;
    /**
     * The action that will show the tooltip
     */
    trigger = TooltipTrigger.Hover;
    /**
     * The text in the tooltip
     */
    headingText = '';
    isVisible = false;
    get el() { return getElement(this); }
    handleFocus() {
        if (this.trigger === TooltipTrigger.Hover) {
            this.showTooltip();
        }
    }
    handleBlur() {
        if (this.trigger === TooltipTrigger.Hover) {
            this.hideTooltip();
        }
    }
    handleClick() {
        if (this.trigger === TooltipTrigger.Click) {
            if (this.isVisible) {
                this.hideTooltip();
            }
            else {
                this.showTooltip();
                document.addEventListener('focusout', this.hideTooltip);
            }
        }
    }
    handleMouseEnter() {
        if (this.trigger === TooltipTrigger.Hover) {
            this.showTooltip();
        }
    }
    handleMouseLeave() {
        if (this.trigger === TooltipTrigger.Hover) {
            this.hideTooltip();
        }
    }
    handleKeyDown(ev) {
        if (this.isVisible && ev.code === 'Escape') {
            this.hideTooltip();
        }
    }
    showTooltip = () => {
        this.isVisible = true;
        this.calculateTooltipPosition();
    };
    calculateTooltipPosition = () => {
        const container = this.el.querySelector('.ath-tooltip-container');
        const tooltip = this.el.querySelector('[role="tooltip"]');
        let containerPosition;
        let tooltipPosition;
        if (container) {
            containerPosition = container.getBoundingClientRect();
            tooltipPosition = tooltip.getBoundingClientRect();
        }
        if (!tooltip) {
            return;
        }
        const minimumContainerSize = 40;
        const combinedXtranslation = container.clientWidth < minimumContainerSize ? container.clientWidth / 2 + 20 : 40;
        const gap = 12;
        switch (this.position) {
            case 'top':
                tooltip.style.top = `-${tooltipPosition.height + 8 + gap}px`;
                tooltip.style.left = `${containerPosition.width / 2 - tooltipPosition.width / 2}px`;
                break;
            case 'left':
                tooltip.style.top = `-${tooltipPosition.height / 2 - containerPosition.height / 2}px`;
                tooltip.style.left = `-${tooltip.clientWidth + 8 + gap}px`;
                break;
            case 'bottom':
                tooltip.style.bottom = `-${tooltipPosition.height + 8 + gap}px`;
                tooltip.style.left = `${containerPosition.width / 2 - tooltipPosition.width / 2}px`;
                break;
            case 'right':
                tooltip.style.top = `-${tooltipPosition.height / 2 - containerPosition.height / 2}px`;
                tooltip.style.left = `${containerPosition.width + 8 + gap}px`;
                break;
            case 'top-left':
                tooltip.style.top = `-${tooltipPosition.height + 8 + gap}px`;
                tooltip.style.left = `-${tooltip.clientWidth - combinedXtranslation}px`;
                break;
            case 'top-right':
                tooltip.style.top = `-${tooltipPosition.height + 8 + gap}px`;
                tooltip.style.right = `-${tooltipPosition.width - combinedXtranslation}px`;
                break;
            case 'bottom-left':
                tooltip.style.bottom = `-${tooltipPosition.height + 8 + gap}px`;
                tooltip.style.left = `-${tooltip.clientWidth - combinedXtranslation}px`;
                break;
            case 'bottom-right':
                tooltip.style.bottom = `-${tooltipPosition.height + 8 + gap}px`;
                tooltip.style.right = `-${tooltipPosition.width - combinedXtranslation}px`;
                break;
        }
    };
    hideTooltip = () => {
        this.isVisible = false;
        document.removeEventListener('focusout', this.hideTooltip);
    };
    classNames = () => ({
        'ath-tooltip': true,
        [`ath-tooltip--${this.position}`]: !!this.position,
        [`ath-tooltip--${this.color}`]: !!this.color,
        'ath-tooltip--no-arrow': !this.hasArrow,
        'ath-tooltip--visible': this.isVisible,
    });
    componentDidLoad() {
        const topWindow = window.top || window;
        topWindow.addEventListener('keydown', this.handleKeyDown.bind(this));
        const trigger = this.el.querySelector('ath-button') ?? this.el.querySelector('ath-tooltip-trigger');
        if (trigger) {
            trigger.setAttribute('aria-describedby', this.tooltipId);
        }
    }
    render() {
        return (h(Host, { key: '229502dad719d3b65c568474c7ed572c5de16837' }, h("div", { key: 'f131b112bf1cf252655ddb79980fd5149f4f606b', class: "ath-tooltip-container" }, h("slot", { key: '93196632be5890ae49ea3f953af30e5a7acab9fc' }), this.headingText !== '' && (h("span", { key: '9eb8e639aa8fa5d3f0db87d6bc3715c876dc3d90', id: this.tooltipId, role: "tooltip", class: this.classNames(), style: {
                '--max-width': this.maxWidth === 0 ? 'none' : `${this.maxWidth}px`,
            } }, this.headingText)))));
    }
};
AthTooltip.style = tooltipCss;

export { AthTooltip as ath_tooltip };
//# sourceMappingURL=ath-tooltip.entry.esm.js.map
