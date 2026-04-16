import { a as getElement, r as registerInstance, e as createEvent, h, d as Host } from './index-Bf9CG7gQ.js';

var CardSize;
(function (CardSize) {
    CardSize["Small"] = "sm";
    CardSize["Medium"] = "md";
})(CardSize || (CardSize = {}));
var CardOrientation;
(function (CardOrientation) {
    CardOrientation["Vertical"] = "vertical";
    CardOrientation["Horizontal"] = "horizontal";
})(CardOrientation || (CardOrientation = {}));

const cardCss = ".sc-ath-card-h .ath-card--vertical.sc-ath-card{--flex-direction:column;--height:100%;--gap-footer:var(--ath-spacing-between-100)}.sc-ath-card-h .ath-card--vertical--fluid.sc-ath-card{--ratio:16/9}.sc-ath-card-h .ath-card--horizontal.sc-ath-card{--flex-direction:row;--gap-footer:var(--ath-spacing-card-footer-col-gap);--height:100%;--width:100%}.sc-ath-card-h .ath-card--horizontal--fluid.sc-ath-card{--ratio:1/1}.sc-ath-card-h{display:block;height:fit-content}.sc-ath-card-h .ath-card.sc-ath-card{outline:none;display:flex;width:inherit;height:inherit;align-items:flex-start;gap:var(--ath-spacing-card-gap);flex-shrink:0;border-radius:var(--ath-border-radius-card);border:var(--ath-border-width-card) solid var(--ath-color-border-alpha-bolder-default);overflow:auto;flex-direction:var(--flex-direction)}.sc-ath-card-h .ath-card-thumbnail.sc-ath-card{align-self:stretch;width:100%}.sc-ath-card-h .ath-card-wrapper.sc-ath-card{display:flex;flex-direction:column;height:var(--height);width:var(--width);background:var(--ath-color-card-content-bg)}.sc-ath-card-h .ath-card-wrapper--sm.sc-ath-card{padding:var(--ath-spacing-card-content-padding-around-sm);gap:var(--ath-spacing-card-content-row-gap-sm);--width:calc(100% - (var(--ath-spacing-card-content-padding-around-sm) + var(--ath-spacing-card-content-padding-around-sm)))}.sc-ath-card-h .ath-card-wrapper--md.sc-ath-card{padding:var(--ath-spacing-card-content-padding-around-md);gap:var(--ath-spacing-card-content-row-gap-md);--width:calc(100% - (var(--ath-spacing-card-content-padding-around-md) + var(--ath-spacing-card-content-padding-around-md)))}.sc-ath-card-h .ath-card-wrapper_content.sc-ath-card{display:flex;flex-direction:column;flex:1 0 0;align-items:flex-start;gap:var(--ath-spacing-card-content-header-body-row-gap);align-self:stretch}.sc-ath-card-h .ath-card--clickable.sc-ath-card{cursor:pointer}.sc-ath-card-h .ath-card--clickable.sc-ath-card:hover{box-shadow:var(--ath-box-shadow-position-x-0) var(--ath-box-shadow-position-y-4) var(--ath-box-shadow-blur-8) var(--ath-box-shadow-spread-0) var(--ath-color-card-drop-shadow-hovered)}.sc-ath-card-h .ath-card--clickable.sc-ath-card:active{box-shadow:var(--ath-box-shadow-position-x-0) var(--ath-box-shadow-position-y-4) var(--ath-box-shadow-blur-8) var(--ath-box-shadow-spread-0) var(--ath-color-card-drop-shadow-pressed)}.sc-ath-card-h ath-icon.sc-ath-card{align-self:end}.sc-ath-card-h.sc-ath-card-s>[slot=body],.sc-ath-card-h .sc-ath-card-s>[slot=body]{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-lg);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(ath-font-line-height-body)}.sc-ath-card-h.sc-ath-card-s>[slot=footer],.sc-ath-card-h .sc-ath-card-s>[slot=footer]{display:flex;flex-direction:var(--flex-direction);gap:var(--gap-footer);justify-content:flex-end}.sc-ath-card-h .ath-card-header.sc-ath-card{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-header-row-gap);width:100%}.sc-ath-card-h .ath-card-header_wrapper.sc-ath-card{display:flex;align-items:flex-start;align-self:stretch}.sc-ath-card-h .ath-card-header_wrapper__addons.sc-ath-card{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-header-date-img-row-gap);flex:1 0 0}.sc-ath-card-h .ath-card-header_wrapper__addons-img.sc-ath-card{display:flex;align-items:center;align-self:stretch}.sc-ath-card-h .ath-card-header_wrapper__addons-date.sc-ath-card{color:var(--ath-color-fg-primary-default);font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-md);font-style:normal;font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.sc-ath-card-h .ath-card-header_wrapper__tag.sc-ath-card{display:flex;justify-content:flex-end;align-items:flex-start;flex:1 0 0}.sc-ath-card-h .ath-card-header_overline.sc-ath-card{color:var(--ath-color-fg-subtle);font-family:var(--ath-font-family-overline);font-size:var(--ath-font-size-overline);font-style:normal;font-weight:var(--ath-font-weight-overline);line-height:var(--ath-font-line-height-overline)}.sc-ath-card-h .ath-card-header_titles.sc-ath-card{display:flex;flex-direction:column;align-items:flex-start;gap:var(--ath-spacing-card-header-titles-row-gap);align-self:stretch}.sc-ath-card-h .ath-card-header_titles__title.sc-ath-card{align-self:stretch;color:var(--ath-color-fg-primary-heading);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-card-title);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-card-title)}.sc-ath-card-h .ath-card-header_titles__subtitle.sc-ath-card{align-self:stretch;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-card-subtitle);font-style:normal;font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-card-subtitle)}.sc-ath-card-h .empty.sc-ath-card{display:none}.sc-ath-card-h:focus,.sc-ath-card-h:focus-visible{outline:none}.sc-ath-card-h:focus .ath-card--clickable.sc-ath-card,.sc-ath-card-h:focus-visible .ath-card--clickable.sc-ath-card{box-shadow:0px 0px 0px 2px var(--ath-color-drop-shadow-focus), 0px 0px 0px 4px var(--ath-color-border-focus)}";

let cardSequence = 0;
const AthCard = class {
    hostId = `card-${++cardSequence}`;
    titleId = `${this.hostId}-title`;
    subtitleId = `${this.hostId}-subtitle`;
    bodyId = `${this.hostId}-body`;
    dateId = `${this.hostId}-date`;
    tagId = `${this.hostId}-tag`;
    /**
     * Size of the card
     **/
    size = CardSize.Small;
    /**
     * Orientation Card
     **/
    orientation = CardOrientation.Vertical;
    /**
     * Card is clickable
     **/
    clickable = false;
    /**
     * if Card thumbnail is fluid
     */
    fluid = false;
    /**
     * ancho de la card
     */
    width;
    /**
     * ancho máximo de la card
     */
    maxWidth;
    /**
     * ancho máximo de la card
     */
    ariaLabelledBy;
    /**
     * Emitted when card is clicked
     */
    athClick;
    /**
     * Emitted when card gains focus
     */
    athFocus;
    /**
     * Emitted when card loses focus
     */
    athBlur;
    get el() { return getElement(this); }
    ArticleEl;
    header;
    isHeaderSlotted = true;
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athClick = createEvent(this, "athClick", 7);
        this.athFocus = createEvent(this, "athFocus", 7);
        this.athBlur = createEvent(this, "athBlur", 7);
        this.header = {
            headingText: undefined,
            date: undefined,
            overline: undefined,
            subtitle: undefined,
        };
    }
    handleClick = () => {
        this.ArticleEl.focus();
        this.athClick.emit();
    };
    handleFocus = () => {
        this.athFocus.emit();
    };
    handleBlur = () => {
        this.athBlur.emit();
    };
    getClassNames = () => ({
        'ath-card': true,
        [`ath-card--${this.orientation}`]: true,
        'ath-card--clickable': this.clickable,
        'ath-card--fluid': this.fluid,
    });
    getImgClassNames = () => ({
        'ath-card-header_wrapper__addons-img': true,
    });
    getTagClassNames = () => ({
        'ath-card-header_wrapper__tag': true,
    });
    getWrapperClassNames = () => ({
        'ath-card-wrapper': true,
        [`ath-card-wrapper--${this.size}`]: !!this.size,
    });
    getThumbnailClassNames = () => ({
        'ath-card-thumbnail': true,
    });
    getAriaAttributes = () => {
        return {
            'aria-labelledby': this.clickable && this.titleId ? this.titleId : this.ariaLabelledBy || undefined,
            'aria-describedby': this.clickable ? [this.dateId, this.tagId, this.subtitleId, this.bodyId].filter(Boolean).join(' ') : undefined,
        };
    };
    getHostAttributes = () => ({
        style: !!this.width ? { width: this.width } : undefined,
        role: this.clickable ? 'button' : undefined,
        tabindex: this.clickable ? 0 : -1,
        onFocus: this.handleFocus,
        onBlur: this.handleBlur,
        onClick: this.clickable ? this.handleClick : undefined,
    });
    renderIcon = () => {
        return h("ath-icon", { icon: "arrow_right" });
    };
    isSlotted(slotName) {
        const namedSlot = this.el.querySelector(`[slot="${slotName}"]`);
        if (namedSlot && slotName === 'thumbnail') {
            const thumbnail = this.el.querySelector('ath-card-thumbnail');
            if (thumbnail && typeof thumbnail['updateTypeCard'] === 'function') {
                thumbnail['updateTypeCard'](this.fluid, this.orientation === CardOrientation.Vertical);
            }
        }
        return !!namedSlot;
    }
    emptySlot(slotSelector) {
        const element = this.el.querySelector(slotSelector);
        if (element) {
            element.classList.add('empty');
        }
    }
    fillHeaderinterface() {
        const athHeader = this.el.querySelector('ath-card-header');
        if (athHeader) {
            this.header.date = athHeader.date ?? undefined;
            this.header.headingText = athHeader.headingText ?? undefined;
            this.header.overline = athHeader.overline ?? undefined;
            this.header.subtitle = athHeader.subtitle ?? undefined;
        }
        else {
            this.isHeaderSlotted = false;
        }
    }
    componentWillLoad() {
        this.fillHeaderinterface();
    }
    componentDidLoad() {
        if (!this.isHeaderSlotted)
            this.emptySlot('.ath-card-header');
        if (!this.isSlotted('img'))
            this.emptySlot('.ath-card-header_wrapper__addons-img');
        if (!this.isSlotted('tag'))
            this.emptySlot('.ath-card-header_wrapper__tag');
        if (!this.isSlotted('thumbnail'))
            this.emptySlot('.ath-card-thumbnail');
    }
    renderHeader = () => {
        return (h("div", { class: "ath-card-header" }, h("div", { class: "ath-card-header_wrapper" }, h("div", { class: "ath-card-header_wrapper__addons" }, h("div", { class: this.getImgClassNames() }, h("slot", { name: "img" })), !!this.header.date && (h("span", { id: this.dateId, class: "ath-card-header_wrapper__addons-date" }, this.header.date))), h("div", { class: this.getTagClassNames(), id: this.tagId }, h("slot", { name: "tag" }))), !!this.header.overline && h("span", { class: "ath-card-header_overline" }, " ", this.header.overline, " "), h("div", { class: "ath-card-header_titles" }, !!this.header.headingText && (h("span", { id: this.titleId, class: "ath-card-header_titles__title" }, this.header.headingText)), !!this.header.subtitle && (h("span", { id: this.subtitleId, class: "ath-card-header_titles__subtitle" }, this.header.subtitle)))));
    };
    render() {
        const containsHeader = Object.values(this.header).some(value => value != undefined) || this.isSlotted('img') || this.isSlotted('thumbnail') || this.isSlotted('tag');
        return (h(Host, { key: '4a8abae87baa6c8d67e77e1878b276a9c660acdb', ...this.getHostAttributes(), ...this.getAriaAttributes() }, h("article", { key: '923799a151d5cf0f8cf9fa5ed448e97e9b5f7117', ref: (el) => (this.ArticleEl = el), class: this.getClassNames() }, h("div", { key: 'f73f1431be7774beaca45baab7f959ee19c17982', class: this.getThumbnailClassNames() }, h("slot", { key: '56f11447bde5bf03f106e60276a5ec4c321da5fa', name: "thumbnail" })), h("div", { key: 'cabe64f348ef033cbf4448f0db1a9fc84d81cf4c', class: this.getWrapperClassNames() }, h("div", { key: '7483898f7dd1f6003da3e266296b02ab112e4883', class: "ath-card-wrapper_content" }, containsHeader && this.renderHeader(), h("div", { key: '602f07ed65c34ebca4784a9e331c51f6fc1b636b', id: this.bodyId }, h("slot", { key: 'e11e4766677abe713f0d257ecda945a42b2856a1', name: "body" }))), !this.clickable && h("slot", { key: 'e6bcc55ce2ad473b3f8c18b289e0f3ed4a58191c', name: "footer" }), this.clickable && this.renderIcon()))));
    }
};
AthCard.style = cardCss;

export { AthCard as ath_card };
//# sourceMappingURL=ath-card.entry.esm.js.map
