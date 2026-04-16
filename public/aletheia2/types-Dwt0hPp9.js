function isDefined(value) {
    return value !== undefined;
}
function attrBoolean(value, validFalse = true) {
    if (value === undefined || value === null) {
        return undefined;
    }
    if (value || validFalse) {
        return value.toString();
    }
    return undefined;
}
function attrNumber(value) {
    if (value !== undefined && value !== null) {
        return value.toString();
    }
    return undefined;
}
function attrString(value, validEmpty = false) {
    if (value?.length > 0) {
        return value;
    }
    if (validEmpty && String(value).trim().length === 0) {
        return '';
    }
    return undefined;
}

const IconSize = {
    Large: 'lg',
    Medium: 'md',
    Small: 'sm',
    Extrasmall: 'xs',
};
var Icons;
(function (Icons) {
    Icons["Add"] = "add";
    Icons["InputClearValue"] = "close";
    Icons["DropDown"] = "chevron-down";
    Icons["Minimize"] = "minimize";
    Icons["PasswordHide"] = "eye-close";
    Icons["PasswordView"] = "eye";
    Icons["Search"] = "search";
    Icons["Info"] = "info";
})(Icons || (Icons = {}));
var IconType;
(function (IconType) {
    IconType["Button"] = "button";
    IconType["ButtonComp"] = "buttonComp";
    IconType["ButtonExpandable"] = "buttonExpandable";
    IconType["ButtonLink"] = "buttonLink";
    IconType["ButtonIconOnly"] = "iconOnly";
    IconType["Link"] = "link";
    IconType["Feedback"] = "feedback";
    IconType["Input"] = "input";
    IconType["Label"] = "label";
    IconType["Message"] = "message";
    IconType["Combobox"] = "combobox";
    IconType["Chipchoice"] = "chipchoice";
    IconType["SegmentedControlItem"] = "segmentedControlItem";
    IconType["SegmentedControlItemIconOnly"] = "segmentedControlItemIconOnly";
})(IconType || (IconType = {}));
function transformIconSize(type, size) {
    const map = {
        link: { sm: 'xs', md: 'sm', lg: 'sm' },
        button: { xs: 'xs', sm: 'sm', md: 'sm', lg: 'sm' },
        buttonComp: { xs: 'xs', sm: 'md', md: 'lg' },
        buttonExpandable: { sm: 'xs', md: 'sm', lg: 'sm' },
        buttonLink: { sm: 'xs', md: 'sm', lg: 'sm' },
        iconOnly: { xs: 'xs', sm: 'sm', md: 'md', lg: 'md' },
        feedback: { sm: 'sm', md: 'md', lg: 'lg' },
        input: { sm: 'xs', md: 'xs', lg: 'sm' },
        label: { sm: 'xs', md: 'xs', lg: 'sm' },
        message: { sm: 'xs', md: 'xs', lg: 'md' },
        combobox: { sm: 'xs', md: 'xs', lg: 'md' },
        chipchoice: { sm: 'xs', md: 'sm' },
        segmentedControlItem: { sm: 'xs', md: 'sm', lg: 'sm', xl: 'sm' },
        segmentedControlItemIconOnly: { sm: 'xs', md: 'sm', lg: 'md', xl: 'md' },
    };
    return map[type][size];
}

export { IconSize as I, IconType as a, attrString as b, attrBoolean as c, attrNumber as d, Icons as e, transformIconSize as t };
//# sourceMappingURL=types-Dwt0hPp9.js.map

//# sourceMappingURL=types-Dwt0hPp9.js.map