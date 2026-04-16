import { h } from './index-Bf9CG7gQ.js';
import './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import { B as ButtonIconPosition } from './button.model-Cy_pPkIg.js';
import { t as transformIconSize, a as IconType, b as attrString, c as attrBoolean, d as attrNumber, e as Icons, I as IconSize } from './types-Dwt0hPp9.js';
import { I as IconColor } from './icon.model-D_uLkZWw.js';

const accesibleCounterLabel = (accesibleLabel, value, maxlength) => {
    let label = accesibleLabel;
    label = label.replace(/\[length\]/g, String(value.length));
    label = label.replace(/\[max\]/g, String(maxlength));
    label = label.replace(/\[rest\]/g, String(maxlength - value.length));
    return label;
};
const FcInputCounter = props => {
    return [
        h("div", { class: "ath-input__counter", "aria-hidden": "true" }, !!props.value ? props.value.length : 0, props.maxlength && h("span", null, "/", props.maxlength)),
        h("div", { class: "ath-visibility-hidden", "aria-live": "polite" }, accesibleCounterLabel(props.accesibleLabel, (props.value = ''), props.maxlength)),
    ];
};

const InputTextTypes = {
    Text: 'text',
    Email: 'email',
    Search: 'search',
    Url: 'url',
    Tel: 'tel',
};
const InputSizes = {
    Small: 'sm',
    Medium: 'md',
    Large: 'lg',
};
const InputIconPositions = {
    Left: 'left',
    Right: 'right',
};
const InputFeedbackTypes = {
    Error: 'error',
    None: 'none',
};

const FcButtonComp = props => {
    const getButtonClass = () => ({
        'ath-button_comp': true,
        [`ath-button_comp--size-${props.size}`]: !!props.size,
        'ath-button_comp--disabled': !!props.disabled,
    });
    const handleClick = (e) => {
        if (!props.disabled && !props.readonly && props.onClick) {
            e.stopPropagation();
            props.onClick();
        }
    };
    const buttonTabIndex = props.disabled ? '-1' : (props.tabindex ?? '0');
    return (h("button", { class: getButtonClass(), disabled: props.disabled, "aria-label": props.buttonAriaLabel, onClick: handleClick, onFocus: props.onFocus, onBlur: props.onBlur, tabIndex: Number(buttonTabIndex) }, props.icon && h("ath-icon", { icon: props.icon, size: transformIconSize(IconType.ButtonComp, props.size), color: props.disabled ? 'disabled' : props.color })));
};

const getInputContainerClass = (props) => ({
    'ath-input__field': true,
    [`ath-input__field--${props.feedback}`]: !!props.feedback,
    'ath-input__field--readonly': props.readonly,
    'ath-input__field--disabled': props.disabled,
    [`ath-input__field--size-${props.size}`]: !!props.size,
});
const getUnitClass = (props) => ({
    'ath-input--unit': true,
    [`ath-input--unit--disabled`]: props.disabled,
});
const getAriaDescribedBy = (props) => {
    const inputHintId = props.helperId ?? `${props.inputId}-hint`;
    const inputHintSROnlyId = props.helperIdSROnly ?? `${props.inputId}-hintSROnly`;
    const inputFeedbackId = props.feedbackId ?? `${props.inputId}-feedback`;
    const descriptions = {};
    if (!!props.helperText)
        descriptions[inputHintId] = inputHintId;
    if (!!props.helperTextSROnly)
        descriptions[inputHintSROnlyId] = inputHintSROnlyId;
    if (props.feedback != 'none' && !!props.feedbackText)
        descriptions[inputFeedbackId] = inputFeedbackId;
    return descriptions;
};
const getInputAttributes = (props) => {
    const inputUnitId = `${props.inputId}-unit`;
    const ariaDescribedBy = Object.keys(getAriaDescribedBy(props)).join(' ') == '' ? undefined : Object.keys(getAriaDescribedBy(props)).join(' ');
    const ariaLabelledBy = props.unit && props.labelId ? `${props.labelId} ${props.inputId} ${inputUnitId}` : '';
    const role = props.role ?? undefined;
    return {
        'id': attrString(props.inputId),
        'icon': attrString(props.icon),
        'iconPosition': attrString(props.iconPosition),
        'type': attrString(props.type === 'search' ? 'text' : props.type),
        'labelClearButton': attrString(props.buttonAriaLabel),
        'maxlength': attrNumber(props.maxlength),
        'disabled': props.disabled,
        'readonly': props.readonly && !props.disabled,
        'tabindex': props.disabled ? '-1' : props.tabindex,
        'autocomplete': attrString(props.autocomplete),
        'min': attrNumber(props.min),
        'max': attrNumber(props.max),
        'step': attrNumber(props.step),
        'name': attrString(props.name),
        'pattern': attrString(props.pattern),
        'placeholder': attrString(props.placeholder),
        'value': attrString(props.value, true),
        'aria-label': attrString(props.inputAriaLabel),
        'aria-labelledby': attrString(ariaLabelledBy),
        'aria-required': attrBoolean(props.required, false),
        'aria-invalid': attrBoolean(props.feedback === InputFeedbackTypes.Error, false),
        'aria-describedby': attrString(ariaDescribedBy, false),
        'aria-disabled': attrBoolean(props.disabled, false),
        'aria-readonly': attrBoolean(props.readonly, false),
        'aria-activedescendant': attrString(props.ariaActiveDescendant),
        'role': role,
        'aria-expanded': attrBoolean(props.ariaExpanded),
        'aria-controls': attrString(props.ariaControls),
        'aria-haspopup': attrString(props.ariaHaspopup),
    };
};
const getIconRight = (props) => {
    if (props.type === 'search') {
        return Icons.Search;
    }
    return props.iconPosition === 'right' && props.icon ? props.icon : undefined;
};
const isEmptyValue = (value) => {
    return (value || '').trim().length === 0;
};
const showInputButton = (props) => {
    if (!props.hasButton) {
        return false;
    }
    if (isEmptyValue(props.value) && !props.showButtonWhenEmpty) {
        return false;
    }
    if (props.disabled && !props.showButtonWhenDisabled) {
        return false;
    }
    if (props.readonly && !props.showButtonWhenReadonly) {
        return false;
    }
    return true;
};
const FcInputElement = props => {
    const inputAttributes = getInputAttributes(props);
    const iconRight = getIconRight(props);
    const iconButton = props.buttonIcon || Icons.InputClearValue;
    const showButton = showInputButton(props);
    const inputUnitId = `${props.inputId}-unit`;
    return (h("div", { class: getInputContainerClass(props) }, !!props.icon && props.iconPosition === 'left' && h("ath-icon", { icon: props.icon, size: "md" }), h("input", { class: "ath-input__text--value", ref: (el) => props.onInputRef(el), ...inputAttributes, onInput: props.onInput, onFocus: props.onFocus, onBlur: props.onBlur, onChange: props.onChange, onKeyDown: props.onKeyDown }), !!props.unit && (h("span", { id: inputUnitId, class: getUnitClass(props) }, h("span", { "aria-hidden": "true" }, props.unit), " ", h("span", { class: "ath-visibility-hidden" }, props.unitAriaLabel || props.unit))), showButton && (h(FcButtonComp, { buttonAriaLabel: props.buttonAriaLabel, color: props.disabled ? IconColor.Disabled : IconColor.Default, disabled: props.disabled || props.readonly, icon: iconButton, iconPosition: ButtonIconPosition.IconOnly, size: IconSize.Extrasmall, onClick: props.onClickButton })), iconRight && h("ath-icon", { icon: iconRight, size: IconSize.Medium })));
};

const getInputTextareaContainerClass = (props) => ({
    'ath-input__field': true,
    'ath-input__field--textarea': true,
    [`ath-input__field--${props.feedback}`]: !!props.feedback,
    'ath-input__field--readonly': props.readonly,
    'ath-input__field--disabled': props.disabled,
    [`ath-input__field--size-${props.size}`]: !!props.size,
});
const getTabindex = (props) => {
    return !!props.disabled ? '-1' : props.tabindex;
};
const getInputTextareaAttributes = (props) => {
    const inputHintId = `${props.inputId}-hint`;
    const inputFeedbackId = `${props.inputId}-feedback`;
    const ariaDescribedBy = (props.helperText ? inputHintId : '') + ' ' + (props.feedback ? inputFeedbackId : '');
    return {
        'id': attrString(props.inputId),
        'maxlength': attrNumber(props.maxlength),
        'disabled': props.disabled,
        'readonly': props.readonly && !props.disabled,
        'tabindex': attrString(getTabindex(props)),
        'autocomplete': attrString(props.autocomplete),
        'name': attrString(props.name),
        'placeholder': attrString(props.placeholder),
        'value': attrString(props.value),
        'cols': props.cols,
        'rows': props.rows,
        'aria-label': attrString(props.inputAriaLabel),
        'aria-required': attrBoolean(props.required, false),
        'aria-invalid': attrBoolean(props.feedback === InputFeedbackTypes.Error, false),
        'aria-describedby': attrString(ariaDescribedBy.trim(), false),
        'aria-disabled': attrBoolean(props.disabled, false),
        'aria-readonly': attrBoolean(props.readonly, false),
    };
};
const FcInputTextareaElement = props => {
    const inputAttributes = getInputTextareaAttributes(props);
    return (h("div", { class: getInputTextareaContainerClass(props) }, h("textarea", { class: "ath-input__text--value", ref: (el) => props.onInputRef(el), ...inputAttributes, onInput: props.onInput, onFocus: props.onFocus, onBlur: props.onBlur, onChange: props.onChange })));
};

const FcPictogram = props => {
    const theme = document.body.dataset.theme || 'core';
    const assetsPath = `assets/images/pictograms/${theme}/`;
    return !!props.name && h("img", { src: `${assetsPath}${props.name}.svg`, alt: "" });
};

export { FcButtonComp as F, InputTextTypes as I, FcInputElement as a, FcPictogram as b, FcInputCounter as c, InputFeedbackTypes as d, InputIconPositions as e, InputSizes as f, FcInputTextareaElement as g };
//# sourceMappingURL=index-8mh0qKYc.js.map

//# sourceMappingURL=index-8mh0qKYc.js.map