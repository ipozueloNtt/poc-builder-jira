import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { g as getHeading } from './heading-wtmkpk46.js';
import { a as ListOrientation, L as ListSizes, b as ListLinkTarget } from './list.model-B7BBdWjk.js';
import { I as IconColor } from './icon.model-D_uLkZWw.js';

const listItemCss = ".sc-ath-list-item-h{display:flex;flex-direction:var(--flex-direction--container)}.sc-ath-list-item-h .clickable.sc-ath-list-item{text-decoration:none;cursor:pointer}.sc-ath-list-item-h .clickable.sc-ath-list-item:focus-visible:not(:active){outline:none}.sc-ath-list-item-h .clickable.sc-ath-list-item:focus-visible:not(:active) .ath-list-item.sc-ath-list-item{background:linear-gradient(0deg), var(--ath-color-bg-alpha-default);box-shadow:0 0 0 2px var(--ath-color-border-focus) inset}.sc-ath-list-item-h .clickable.sc-ath-list-item:hover{background:var(--ath-color-bg-alpha-hovered)}.sc-ath-list-item-h .clickable.sc-ath-list-item:active{box-shadow:none;background:var(--ath-color-bg-alpha-pressed)}.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item{cursor:not-allowed;background:var(--ath-color-bg-alpha-default)}.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item .ath-list-item--title.sc-ath-list-item,.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item .ath-list-item--subtitle.sc-ath-list-item,.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item .ath-list-item--subtitle-wrapper.sc-ath-list-item,.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item .ath-list-item--subtitle-tooltip.sc-ath-list-item,.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item .ath-list-item--description.sc-ath-list-item{color:var(--ath-color-fg-disabled);cursor:not-allowed;background:var(--ath-color-bg-alpha-default)}.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item .tooltip-trigger.sc-ath-list-item{pointer-events:none;user-select:none}.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item:hover,.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item:focus,.sc-ath-list-item-h .clickable.disabled.sc-ath-list-item:active{background:var(--ath-color-bg-alpha-default);box-shadow:none;cursor:not-allowed}.sc-ath-list-item-h .ath-list-item.sc-ath-list-item{display:flex;flex-direction:var(--flex-direction--items);padding:var(--padding);gap:var(--gap--list);text-decoration:none}.sc-ath-list-item-h .ath-list-item--center-detail.sc-ath-list-item{display:flex;flex-direction:column;flex:1;gap:var(--gap--center-detail)}.sc-ath-list-item-h .ath-list-item--right-detail.sc-ath-list-item{text-align:right;font-style:normal}.sc-ath-list-item-h .ath-list-item--title.sc-ath-list-item{color:var(--ath-color-fg-default);font-family:var(--ath-font-family-heading);font-size:var(--ath-font-size-heading-4);font-weight:var(--ath-font-weight-heading);line-height:var(--ath-font-line-height-heading-4);margin:0}.sc-ath-list-item-h .ath-list-item--subtitle.sc-ath-list-item{display:flex;align-items:flex-start;gap:var(--ath-spacing-list-item-col-gap-sm);position:relative;color:var(--ath-color-fg-subtle);font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-lg);font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.sc-ath-list-item-h .ath-list-item--subtitle-wrapper.sc-ath-list-item{display:flex;align-items:center}.sc-ath-list-item-h .ath-list-item--subtitle-tooltip.sc-ath-list-item{padding-top:4px}.sc-ath-list-item-h .ath-list-item--description.sc-ath-list-item{overflow:hidden;color:var(--ath-color-fg-default);text-overflow:ellipsis;font-family:var(--ath-font-family-body);font-size:var(--ath-font-size-body-md);font-weight:var(--ath-font-weight-body-regular);line-height:var(--ath-font-line-height-body)}.sc-ath-list-item-h .empty.sc-ath-list-item{display:none}.sc-ath-list-item-h.clickable.disabled.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.clickable.disabled .sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.clickable.disabled.sc-ath-list-item-s>[slot=left-detail],.sc-ath-list-item-h.clickable.disabled .sc-ath-list-item-s>[slot=left-detail]{color:var(--ath-color-fg-disabled);cursor:not-allowed;user-select:none;pointer-events:none;text-decoration:none}.sc-ath-list-item-s>[slot=right-detail]{display:flex;flex-direction:column;align-items:flex-end;text-decoration:none}.ath-list-item--horizontal.sc-ath-list-item-h .ath-list-item--divider.sc-ath-list-item{border-right:var(--ath-border-width-divider-md) solid var(--ath-color-border-alpha-bold-default)}.sc-ath-list-item-h.ath-list-item--horizontal.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--horizontal .sc-ath-list-item-s>[slot=right-detail]{align-items:flex-start}.ath-list-item--vertical.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-col-gap-md)}.sc-ath-list-item-h.ath-list-item--vertical.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--vertical .sc-ath-list-item-s>[slot=right-detail]{align-items:flex-end}.ath-list-item--vertical.sc-ath-list-item-h .ath-list-item--divider.sc-ath-list-item{border-bottom:var(--ath-border-width-divider-md) solid var(--ath-color-border-alpha-bold-default)}.ath-list-item--xs-vertical.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-xs);--padding:var(--ath-spacing-list-item-padding-vertical-xs);--gap--center-detail:var(--ath-spacing-list-item-row-gap-vertical-xs)}.sc-ath-list-item-h.ath-list-item--xs-vertical.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--xs-vertical .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-xs)}.ath-list-item--xs-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-xs)}.ath-list-item--sm-vertical.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-sm);--padding:var(--ath-spacing-list-item-padding-vertical-sm);--gap--center-detail:var(--ath-spacing-list-item-row-gap-vertical-sm)}.sc-ath-list-item-h.ath-list-item--sm-vertical.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--sm-vertical .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-sm)}.ath-list-item--sm-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-sm)}.ath-list-item--md-vertical.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-md);--padding:var(--ath-spacing-list-item-padding-vertical-md);--gap--center-detail:var(--ath-spacing-list-item-row-gap-vertical-md)}.sc-ath-list-item-h.ath-list-item--md-vertical.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--md-vertical .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-md)}.ath-list-item--md-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-md)}.ath-list-item--lg-vertical.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-lg);--padding:var(--ath-spacing-list-item-padding-vertical-lg);--gap--center-detail:var(--ath-spacing-list-item-row-gap-vertical-lg)}.sc-ath-list-item-h.ath-list-item--lg-vertical.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--lg-vertical .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-lg)}.ath-list-item--lg-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-lg)}.ath-list-item--xs-horizontal.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-xs);--padding:var(--ath-spacing-list-item-padding-horizontal-xs);--gap--center-detail:var(--ath-spacing-list-item-row-gap-horizontal-xs)}.sc-ath-list-item-h.ath-list-item--xs-horizontal.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--xs-horizontal .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-xs)}.ath-list-item--xs-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-xs)}.ath-list-item--sm-horizontal.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-sm);--padding:var(--ath-spacing-list-item-padding-horizontal-sm);--gap--center-detail:var(--ath-spacing-list-item-row-gap-horizontal-sm)}.sc-ath-list-item-h.ath-list-item--sm-horizontal.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--sm-horizontal .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-sm)}.ath-list-item--sm-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-sm)}.ath-list-item--md-horizontal.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-md);--padding:var(--ath-spacing-list-item-padding-horizontal-md);--gap--center-detail:var(--ath-spacing-list-item-row-gap-horizontal-md)}.sc-ath-list-item-h.ath-list-item--md-horizontal.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--md-horizontal .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-md)}.ath-list-item--md-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-md)}.ath-list-item--lg-horizontal.sc-ath-list-item-h{--gap--right-detail:var(--ath-spacing-list-item-right-slot-lg);--padding:var(--ath-spacing-list-item-padding-horizontal-lg);--gap--center-detail:var(--ath-spacing-list-item-row-gap-horizontal-lg)}.sc-ath-list-item-h.ath-list-item--lg-horizontal.sc-ath-list-item-s>[slot=right-detail],.sc-ath-list-item-h.ath-list-item--lg-horizontal .sc-ath-list-item-s>[slot=right-detail]{gap:var(--ath-spacing-list-item-right-slot-lg)}.ath-list-item--lg-horizontal.sc-ath-list-item-h{--gap--list:var(--ath-spacing-list-item-row-gap-horizontal-lg)}";

let listItemSequence = 0;
const AthListItem = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athClick = createEvent(this, "athClick", 7);
    }
    get el() { return getElement(this); }
    /** List item title */
    headingText;
    /** Heading level for the title */
    headingLevel = 4;
    /** List item subtitle */
    subtitle;
    /** List item description */
    description;
    /** List item tooltip */
    tooltip;
    /** Tooltip max-width */
    tooltipMaxWidth = 240;
    /** List item divider. If user doesn't inform it, its informed from parent list */
    hasDivider;
    /** List item orientation. Its informed from parent list */
    orientation = ListOrientation.Vertical;
    /** List item size. Its informed from parent list */
    size = ListSizes.Medium;
    /** List item state disabled, only works if clickable is true */
    disabled = false;
    /** ListItem is clickable */
    clickable = false;
    /** URL when clickable is true */
    href;
    /** Type of target to url*/
    target = ListLinkTarget.Self;
    /** Type of rel to url*/
    rel;
    /** The aria-label attribute of the clicable item */
    athAriaLabel;
    /** Additional text to be appended to the aria-label to indicate that this is an external link */
    externalLabel = 'Se abre una ventana nueva';
    hasLeftSlot = true;
    hasRightSlot = true;
    calculatedLabelledBy;
    calculatedDescribedBy;
    /** Emitted when listItem is clicked */
    athClick;
    listItemId = `list-item-${++listItemSequence}`;
    headingTextId = `heading-text-${this.listItemId}`;
    subtitleId = `subtitle-${this.listItemId}`;
    descriptionId = `description-${this.listItemId}`;
    rightDetailId = `right-detail-${this.listItemId}`;
    externalLabelId = `external-${this.listItemId}`;
    handleClick = (event) => {
        if (this.disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
        }
        this.athClick.emit();
    };
    componentWillLoad() {
        this.hasLeftSlot = this.isSlotted('left-detail');
        this.hasRightSlot = this.isSlotted('right-detail');
        this.calculatedLabelledBy = this.setLabelledby();
        this.calculatedDescribedBy = this.setDescribedBy();
    }
    componentWillRender() {
        if (!this.hasLeftSlot)
            this.markEmptySlot('.ath-list-item--left-detail');
        if (!this.hasRightSlot)
            this.markEmptySlot('.ath-list-item--right-detail');
    }
    isSlotted(slotName) {
        const slottedElements = this.el.querySelectorAll(`[slot="${slotName}"]`);
        return slottedElements.length > 0;
    }
    markEmptySlot(slotSelector) {
        const slot = this.el.querySelector(slotSelector);
        if (slot) {
            slot.classList.add('empty');
        }
    }
    setLabelledby() {
        const ids = [];
        if (this.headingText) {
            ids.push(this.headingTextId);
        }
        if (this.subtitle) {
            ids.push(this.subtitleId);
        }
        if (this.target === ListLinkTarget.Blank) {
            ids.push(this.externalLabelId);
        }
        return ids.length > 0 ? ids.join(' ') : undefined;
    }
    setDescribedBy() {
        const ids = [];
        if (this.description) {
            ids.push(this.descriptionId);
        }
        const hasRightSlot = this.el.querySelectorAll(`[slot="right-detail"]`).length > 0;
        if (hasRightSlot) {
            ids.push(this.rightDetailId);
        }
        return ids.length > 0 ? ids.join(' ') : undefined;
    }
    getHostAttributes = () => ({
        role: 'listitem',
    });
    getHostClassNames = () => ({
        [`ath-list-item--${this.orientation}`]: !!this.orientation,
        [`ath-list-item--${this.size}-${this.orientation}`]: !!this.size && !!this.orientation,
        disabled: this.disabled,
    });
    getListItemClassNames = () => ({
        [`ath-list-item`]: true,
        [`ath-list-item--divider`]: !!this.hasDivider,
        clickable: this.clickable,
        disabled: this.disabled,
    });
    renderItem() {
        const HeadingTitle = getHeading(this.headingLevel);
        return (h("div", { class: this.getListItemClassNames() }, this.isSlotted('left-detail') && (h("div", { class: "ath-list-item--left-detail" }, h("slot", { name: "left-detail" }))), h("div", { class: "ath-list-item--center-detail", part: "center-detail" }, this.headingText && (h(HeadingTitle, { id: this.headingTextId, class: "ath-list-item--title" }, this.headingText)), this.subtitle && (h("div", { class: "ath-list-item--subtitle" }, h("span", { class: "ath-list-item--subtitle-wrapper", id: this.subtitleId }, this.subtitle), h("div", { class: "ath-list-item--subtitle-tooltip" }, this.tooltip && (h("ath-tooltip", { class: this.disabled ? 'tooltip-trigger' : '', headingText: this.tooltip, position: "bottom", maxWidth: this.tooltipMaxWidth }, h("ath-tooltip-trigger", { size: "xs", tabindex: this.disabled ? '-1' : '0' })))))), this.description && (h("span", { id: this.descriptionId, class: "ath-list-item--description" }, this.description))), this.isSlotted('right-detail') && (h("div", { class: "ath-list-item--right-detail", id: this.rightDetailId }, h("slot", { name: "right-detail" }))), this.clickable && (h("div", null, h("ath-icon", { class: "icon", icon: "chevron_right", color: this.disabled ? IconColor.Disabled : IconColor.Default })))));
    }
    getClickableAttributes = () => {
        const externalLabel = this.externalLabel ?? 'Se abre una ventana nueva';
        const linkAriaLabel = this.athAriaLabel ? (this.target === ListLinkTarget.Blank ? `${this.athAriaLabel} ${externalLabel}` : this.athAriaLabel) : null;
        return {
            'tabindex': this.disabled ? '-1' : '0',
            'aria-disabled': this.disabled ? 'true' : 'false',
            'onClick': this.handleClick,
            'aria-label': linkAriaLabel || undefined,
            'aria-labelledby': !this.athAriaLabel ? this.calculatedLabelledBy : undefined,
            'aria-describedby': this.calculatedDescribedBy,
        };
    };
    renderItemClickable() {
        if (this.href) {
            return (h("a", { class: this.disabled ? 'clickable disabled' : 'clickable', href: this.href, target: '_' + this.target, rel: this.rel, ...this.getClickableAttributes() }, this.renderItem(), this.target === ListLinkTarget.Blank && (h("span", { class: "sr-only", id: this.externalLabelId }, this.externalLabel))));
        }
        return (h("div", { class: this.disabled ? 'clickable disabled' : 'clickable', role: "button", ...this.getClickableAttributes() }, this.renderItem()));
    }
    render() {
        return (h(Host, { key: 'd5184e9ff1834997c57627904ac43c25071211fb', class: this.getHostClassNames(), ...this.getHostAttributes() }, this.clickable ? this.renderItemClickable() : this.renderItem()));
    }
};
AthListItem.style = listItemCss;

export { AthListItem as ath_list_item };
//# sourceMappingURL=ath-list-item.entry.esm.js.map
