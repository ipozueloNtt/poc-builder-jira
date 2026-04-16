import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';

var CardSelectableSize;
(function (CardSelectableSize) {
    CardSelectableSize["Small"] = "sm";
    CardSelectableSize["Medium"] = "md";
})(CardSelectableSize || (CardSelectableSize = {}));
var CardSelectableType;
(function (CardSelectableType) {
    CardSelectableType["Single"] = "single";
    CardSelectableType["Multiselect"] = "multiselect";
})(CardSelectableType || (CardSelectableType = {}));

const cardSelectableCss = ".sc-ath-card-selectable-h .ath-card-selectable.sc-ath-card-selectable{--overline-color:var(--ath-color-fg-subtle);--headline-color:var(--ath-color-fg-primary-heading);--subheadline-color:var(--ath-color-fg-default);--icon-color:var(--ath-color-icon-primary-default);--card-border:var(--ath-border-width-card) solid var(--ath-color-border-alpha-bolder-default);--card-shadow:none}.sc-ath-card-selectable-h .ath-card-selectable--multiselect.sc-ath-card-selectable{--icon-border:1px solid var(--ath-color-checkbox-border-default);--icon-background:var(--ath-color-checkbox-bg-default);--icon-color:var(--ath-color-checkbox-icon-default)}.sc-ath-card-selectable-h .ath-card-selectable--multiselect.ath-card-selectable--selected.sc-ath-card-selectable:not(.ath-card-selectable--disabled){--icon-border:1px solid var(--ath-color-checkbox-border-checked);--icon-background:var(--ath-color-checkbox-bg-checked)}.sc-ath-card-selectable-h .ath-card-selectable--multiselect.ath-card-selectable--disabled.sc-ath-card-selectable:not(.ath-card-selectable--selected){--icon-border:1px solid var(--ath-color-checkbox-border-default)}.sc-ath-card-selectable-h .ath-card-selectable--multiselect.ath-card-selectable--selected.ath-card-selectable--disabled.sc-ath-card-selectable{--icon-background:var(--ath-color-bg-alpha-boldest-disabled)}.sc-ath-card-selectable-h .ath-card-selectable--disabled.sc-ath-card-selectable{--overline-color:var(--ath-color-fg-disabled);--headline-color:var(--ath-color-fg-disabled);--subheadline-color:var(--ath-color-fg-disabled);--icon-border:none;cursor:not-allowed}.sc-ath-card-selectable-h .ath-card-selectable--disabled.sc-ath-card-selectable:not(.ath-card-selectable--multiselect){--icon-color:var(--ath-color-icon-disabled)}.sc-ath-card-selectable-h .ath-card-selectable--selected.sc-ath-card-selectable{--card-border:var(--ath-border-width-card) solid var(--ath-color-card-selectable-border-selected)}.sc-ath-card-selectable-h:hover .ath-card-selectable.sc-ath-card-selectable:not(.ath-card-selectable--disabled):not(.ath-card-selectable--selected){--card-border:var(--ath-border-width-card) solid var(--ath-color-card-border-hovered);--card-shadow:var(--ath-box-shadow-position-x-0) var(--ath-box-shadow-position-y-4) var(--ath-box-shadow-blur-8) var(--ath-box-shadow-spread-0)\n    var(--ath-color-card-drop-shadow-hovered)}.sc-ath-card-selectable-h:hover .ath-card-selectable--selected.sc-ath-card-selectable{--card-border:var(--ath-border-width-card) solid var(--ath-color-card-selectable-border-selected);--card-shadow:var(--ath-box-shadow-position-x-0) var(--ath-box-shadow-position-y-4) var(--ath-box-shadow-blur-8) var(--ath-box-shadow-spread-0)\n    var(--ath-color-card-drop-shadow-hovered)}.sc-ath-card-selectable-h:active .ath-card-selectable.sc-ath-card-selectable:not(.ath-card-selectable--disabled){--card-border:var(--ath-border-width-card) solid var(--ath-color-card-border-pressed);--card-shadow:var(--ath-box-shadow-position-x-0) var(--ath-box-shadow-position-y-4) var(--ath-box-shadow-blur-8) var(--ath-box-shadow-spread-0)\n    var(--ath-color-card-drop-shadow-pressed)}.sc-ath-card-selectable-h:focus-visible{outline:none}.sc-ath-card-selectable-h:focus-visible .ath-card-selectable.sc-ath-card-selectable{outline:none;--card-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}.sc-ath-card-selectable-h{display:inline-grid;width:100%;cursor:pointer}.sc-ath-card-selectable-h .ath-card-selectable.sc-ath-card-selectable{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-gap);border-radius:var(--ath-border-radius-card);border:var(--card-border);background:var(--ath-color-card-content-bg);box-shadow:var(--card-shadow)}.sc-ath-card-selectable-h .ath-card-selectable--sm.sc-ath-card-selectable{padding:var(--ath-spacing-card-content-padding-around-sm)}.sc-ath-card-selectable-h .ath-card-selectable--md.sc-ath-card-selectable{padding:var(--ath-spacing-card-content-padding-around-md)}.sc-ath-card-selectable-h .ath-card-selectable_content.sc-ath-card-selectable{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-content-header-body-row-gap);align-self:stretch}.sc-ath-card-selectable-h .ath-card-selectable_header.sc-ath-card-selectable{display:flex;justify-content:flex-end;align-items:flex-start;gap:var(--ath-spacing-card-selectable-indicator-col-gap);align-self:stretch}.sc-ath-card-selectable-h .ath-card-selectable_headlines.sc-ath-card-selectable{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-header-row-gap);flex:1 0 0}.sc-ath-card-selectable-h .ath-card-selectable_overline.sc-ath-card-selectable{color:var(--overline-color);font-family:var(--ath-font-family-overline);font-size:var(--ath-font-size-overline);font-style:normal;font-weight:var(--ath-font-weight-overline);line-height:var(--ath-font-line-height-overline)}.sc-ath-card-selectable-h .ath-card-selectable_wrapper.sc-ath-card-selectable{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-header-titles-row-gap);align-self:stretch}.sc-ath-card-selectable-h .ath-card-selectable_headline.sc-ath-card-selectable{color:var(--headline-color);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-card-title);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-card-title)}.sc-ath-card-selectable-h .ath-card-selectable_subheadline.sc-ath-card-selectable{color:var(--subheadline-color);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-card-subtitle);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-card-subtitle)}.sc-ath-card-selectable-h .ath-card-selectable_check.sc-ath-card-selectable{display:flex;justify-content:center;align-items:center;width:var(--ath-sizing-checkbox-box-width);height:var(--ath-sizing-checkbox-box-width);border-radius:var(--ath-border-radius-checkbox);border:var(--icon-border);background:var(--icon-background);color:var(--icon-color)}";

let cardSelectableSequence = 0;
const AthCardSelectable = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athChange = createEvent(this, "athChange", 7);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
    }
    hostId = `card-selectable-${++cardSelectableSequence}`;
    headlineId;
    subheadlineId;
    tagId;
    get el() { return getElement(this); }
    /**
     * Size of the card
     **/
    size = CardSelectableSize.Small;
    /**
     * headline of the card
     **/
    headingText;
    /**
     * subtitle of the card
     **/
    subtitle;
    /**
     * overline of the card
     **/
    overline;
    /**
     * type of card
     **/
    type = CardSelectableType.Single;
    /**
     * Indicates whether the card is selected
     **/
    selected = false;
    /**
     * Indicates whether the card is disabled
     **/
    disabled = false;
    /**
     * tag of the card
     **/
    tag;
    athChange;
    athFocus;
    athBlur;
    visualSelected = false;
    async select(firstLoad) {
        if (!this.disabled) {
            this.visualSelected = true;
            if (!firstLoad)
                this.el.focus();
        }
    }
    async unselect() {
        if (!this.disabled) {
            this.visualSelected = false;
            this.el.blur();
        }
    }
    handleClick = () => {
        if (this.disabled)
            return;
        this.selected = this.type === CardSelectableType.Single ? true : !this.selected;
        this.visualSelected = this.type === CardSelectableType.Single ? true : !this.selected;
        this.athChange.emit(this.el);
    };
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    handleKeyDown = (ev) => {
        switch (ev.code) {
            case 'Space':
            case 'Enter':
                ev.preventDefault();
                this.handleClick();
                break;
            default:
                break;
        }
    };
    getHostAttributes = () => ({
        role: this.type === CardSelectableType.Single ? 'radio' : 'checkbox',
        tabindex: this.visualSelected && !this.disabled ? '0' : '-1',
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onClick: this.handleClick,
        onkeydown: this.handleKeyDown,
    });
    getAriaAttributes = () => {
        const describedBy = [this.tagId, this.subheadlineId].filter(Boolean).join(' ');
        return {
            'aria-labelledby': !!this.headingText ? this.headlineId : undefined,
            'aria-describedby': describedBy != '' ? describedBy : undefined,
            'aria-disabled': this.disabled ? 'true' : undefined,
            'aria-checked': this.selected ? 'true' : 'false',
        };
    };
    getCheckClassNames = () => ({
        'ath-card-selectable_check': true,
    });
    getCardClassNames = () => ({
        'ath-card-selectable': true,
        'ath-card-selectable--disabled': this.disabled,
        [`ath-card-selectable--${this.type}`]: true,
        [`ath-card-selectable--${this.size}`]: true,
        'ath-card-selectable--selected': this.selected,
        'ath-color-text--disabled': this.disabled,
    });
    componentWillLoad() {
        if (this.headingText)
            this.headlineId = `${this.hostId}-headline`;
        if (this.subtitle)
            this.subheadlineId = `${this.hostId}-subheadline`;
        if (this.tag)
            this.tagId = `${this.hostId}-tag`;
    }
    renderIcon = () => {
        const icon = this.type === CardSelectableType.Single ? 'check' : 'completed';
        const size = this.type === CardSelectableType.Single ? 'md' : 'sm';
        return h("ath-icon", { icon: icon, size: size, color: "inherit" });
    };
    render() {
        const tagColor = this.disabled ? 'disabled' : 'primary';
        return (h(Host, { key: 'ebe53c18b726d3eb75e969949f82aa249b84551c', ...this.getHostAttributes(), ...this.getAriaAttributes() }, h("div", { key: '7cab09e658fb3fa6b33334ae62798185120958bc', class: this.getCardClassNames() }, h("div", { key: '744a9184b018a45ef1f62ed2c41e9c06b3a8df3f', class: "ath-card-selectable_content" }, h("div", { key: '2068dae801a06955d6a8f72fd19d8de1f7233f19', class: "ath-card-selectable_header" }, h("div", { key: 'cb5f63087645b0436f4ce27dc7756dd995c86282', class: "ath-card-selectable_headlines" }, !!this.tag && h("ath-tag", { key: 'ba67bab35e9e67e14610c04e89ea79e1edbd94d3', id: this.tagId, size: "md", color: tagColor, headingText: this.tag }), !!this.overline && h("span", { key: '49ab3cdbd6b84c3f7321080a327c17000a6b1a2b', class: "ath-card-selectable_overline" }, this.overline), h("div", { key: 'f49399c3873cfc01db2fc75fb4b222c7e8d05f27', class: "ath-card-selectable_wrapper" }, h("span", { key: '847f1e4a61b17375161ccb6cf86ebc4037acab3f', id: this.headlineId, class: "ath-card-selectable_headline" }, this.headingText), h("span", { key: '317a55befe8cad7e254217b918c4dc9caef973e6', id: this.subheadlineId, class: "ath-card-selectable_subheadline" }, this.subtitle))), h("div", { key: 'f556febbbc2542e73834ceb4214b382adbe8e0bd', class: this.getCheckClassNames() }, this.selected && this.renderIcon())), h("slot", { key: '899c68ee59ca1789edc53e2b11e720fcc0ecb931', name: "body" })))));
    }
};
AthCardSelectable.style = cardSelectableCss;

export { AthCardSelectable as ath_card_selectable };
//# sourceMappingURL=ath-card-selectable.entry.esm.js.map
