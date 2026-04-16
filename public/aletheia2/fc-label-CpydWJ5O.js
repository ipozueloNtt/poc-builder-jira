import { h } from './index-Bf9CG7gQ.js';

const feedBackIcons = {
    none: null,
    error: { icon: 'error_solid', color: 'error' },
    success: { icon: 'check_2_solid', color: 'success' },
    warning: { icon: 'exclamation_solid', color: 'warning' },
};
const FcInputFeedback = props => {
    const iconName = feedBackIcons[props.type].icon;
    const iconColor = feedBackIcons[props.type].color;
    const getFeedbackClass = () => ({
        'ath-input__feedback': true,
        [`ath-input__feedback--${props.type}`]: !!props.type,
    });
    return (!!props.text && (h("div", { class: getFeedbackClass(), "aria-live": "polite", id: props.id }, h("ath-icon", { icon: iconName, color: iconColor, size: "sm" }), h("span", { class: "padding" }, props.text))));
};

const FcInputHelperText = props => {
    return (h("div", { class: "ath-input__helper-text", id: props.id }, h("span", null, props.text)));
};

const FcInputLabel = props => {
    const tooltipWidth = props.tooltipWidth || 0;
    return (h("div", { class: "ath-input__label" }, h("label", { id: props.id, htmlFor: props.htmlForId, class: "ath-input__label__wrapper" }, h("span", null, props.label), props.required && props.showRequired && (h("span", { "aria-hidden": "true", class: "required" }, "*"))), !!props.tooltipText && (h("ath-tooltip", { headingText: props.tooltipText, position: "top", "has-arrow": "true", color: "primary", "max-width": tooltipWidth }, h("ath-tooltip-trigger", { icon: "info", size: "md", "aria-label": props.tooltipText, onClick: ev => ev.stopPropagation(), onKeyDown: ev => ev.stopPropagation(), "aria-describedBy": props.htmlForId })))));
};

export { FcInputLabel as F, FcInputHelperText as a, FcInputFeedback as b };
//# sourceMappingURL=fc-label-CpydWJ5O.js.map

//# sourceMappingURL=fc-label-CpydWJ5O.js.map