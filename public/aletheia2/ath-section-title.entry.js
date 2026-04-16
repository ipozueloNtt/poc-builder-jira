import { r as registerInstance, e as createEvent, a as getElement, h, d as Host } from './index-Bf9CG7gQ.js';
import { g as getHeading } from './heading-wtmkpk46.js';
import { b as FcPictogram } from './index-8mh0qKYc.js';
import './fc-label-CpydWJ5O.js';
import './index-DLEKXOBo.js';
import './types-Dwt0hPp9.js';
import './button.model-Cy_pPkIg.js';
import './icon.model-D_uLkZWw.js';

const SectionTitleColor = {
    Accent: 'accent',
    Primary: 'primary',
};
const SectionTitleOption = {
    Default: 'default',
    Icon: 'icon',
    Pictogram: 'pictogram',
};
const HeadingSize = {
    Sm: 'sm',
    Md: 'md',
    Lg: 'lg',
};

const sectionTitleCss = ".sc-ath-section-title-h .ath-section-title--primary.sc-ath-section-title{border-left:2px solid var(--ath-color-section-title-bg-primary)}.sc-ath-section-title-h .ath-section-title--primary-overline.sc-ath-section-title{color:var(--ath-color-fg-primary-default)}.sc-ath-section-title-h .ath-section-title--accent.sc-ath-section-title{border-left:2px solid var(--ath-color-section-title-bg-accent)}.sc-ath-section-title-h .ath-section-title--accent-overline.sc-ath-section-title{color:var(--ath-color-fg-accent-default)}.sc-ath-section-title-h .ath-section-title--label--sm.sc-ath-section-title{font-size:var(--ath-font-size-heading-4);font-weight:var(--ath-font-weight-section-title-heading);line-height:var(--ath-font-line-height-heading-4)}.sc-ath-section-title-h .ath-section-title--label--md.sc-ath-section-title{font-size:var(--ath-font-size-heading-3);font-weight:var(--ath-font-weight-section-title-heading);line-height:var(--ath-font-line-height-heading-3)}.sc-ath-section-title-h .ath-section-title--label--lg.sc-ath-section-title{font-size:var(--ath-font-size-display-sm);font-weight:var(--ath-font-weight-display);line-height:var(--ath-font-line-height-display)}.sc-ath-section-title-h{display:inline-flex;position:relative}.sc-ath-section-title-h .ath-section-title.sc-ath-section-title{display:inline-flex;align-items:center;padding-left:var(--ath-spacing-section-title-padding-left)}.sc-ath-section-title-h .ath-section-title--hasLabel.sc-ath-section-title .ath-section-title--slot.sc-ath-section-title{display:none}.sc-ath-section-title-h .ath-section-title--content.sc-ath-section-title{display:inline-flex;flex-direction:column;align-items:flex-start}.sc-ath-section-title-h .ath-section-title--overline.sc-ath-section-title{margin:0;font-family:var(--ath-font-family-overline);font-size:var(--ath-font-size-overline);font-weight:var(--ath-font-weight-overline);line-height:var(--ath-font-line-height-overline)}.sc-ath-section-title-h .ath-section-title--label.sc-ath-section-title{margin:0;color:var(--ath-color-fg-default);font-family:var(--ath-font-family-heading)}.sc-ath-section-title-h .ath-section-title--label-wrapper.sc-ath-section-title{display:flex;gap:4px;align-items:center}.sc-ath-section-title-h .ath-section-title--tooltip.sc-ath-section-title{display:flex;align-items:flex-end;position:absolute;bottom:2px}.sc-ath-section-title-h .ath-section-title--tooltip.sc-ath-section-title .ath-tooltip-container.sc-ath-section-title{right:0}.sc-ath-section-title-h .ath-section-title--collapsable.sc-ath-section-title{cursor:pointer}.sc-ath-section-title-h .ath-section-title--collapsable.sc-ath-section-title:focus,.sc-ath-section-title-h .ath-section-title--collapsable.sc-ath-section-title:focus-visible{outline:2px solid var(--ath-color-border-focus);outline-offset:2px;border-radius:var(--ath-border-radius-2xs)}.sc-ath-section-title-h .ath-section-title--chevron.sc-ath-section-title{display:flex}.sc-ath-section-title-h .ath-section-title--chevron.sc-ath-section-title ath-icon.sc-ath-section-title{transition:transform 0.3s ease-in-out}.sc-ath-section-title-h .ath-section-title--chevron-rotate.sc-ath-section-title ath-icon.sc-ath-section-title{transform:rotate(180deg)}[collapsable=true][tooltip].sc-ath-section-title-h .ath-section-title--tooltip.sc-ath-section-title,[collapsable][tooltip].sc-ath-section-title-h .ath-section-title--tooltip.sc-ath-section-title{right:calc(var(--ath-font-size-icon-md) + var(--ath-spacing-section-title-col-gap))}[collapsable=true][tooltip].sc-ath-section-title-h .ath-section-title--content.sc-ath-section-title,[collapsable][tooltip].sc-ath-section-title-h .ath-section-title--content.sc-ath-section-title{padding-right:calc(var(--ath-font-size-icon-md) + var(--ath-spacing-section-title-col-gap) + 4px)}[collapsable=true].sc-ath-section-title-h:not([tooltip]) .ath-section-title.sc-ath-section-title,[collapsable].sc-ath-section-title-h:not([tooltip]) .ath-section-title.sc-ath-section-title{gap:var(--ath-spacing-section-title-col-gap)}[collapsable=false][tooltip].sc-ath-section-title-h .ath-section-title--tooltip.sc-ath-section-title,.sc-ath-section-title-h:not([collapsable])[tooltip] .ath-section-title--tooltip.sc-ath-section-title{right:0}[collapsable=false][tooltip].sc-ath-section-title-h .ath-section-title--content.sc-ath-section-title,.sc-ath-section-title-h:not([collapsable])[tooltip] .ath-section-title--content.sc-ath-section-title{padding-right:calc(var(--ath-font-size-icon-md) + var(--ath-spacing-section-title-tooltip-col-gap))}";

let tooltipItemsequence = 0;
const AthSectionTitle = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.athToggleCollapse = createEvent(this, "athToggleCollapse", 7);
    }
    tooltipId = `tooltip-${++tooltipItemsequence}`;
    get el() { return getElement(this); }
    /**
     * Option assigned to the decorative element.
     **/
    type = SectionTitleOption.Default;
    /**
     * Color assigned to the decorative element and the 'overline' text.
     **/
    color = SectionTitleColor.Primary;
    /**
     * The code of the Section Title's icon (used with type Icon)
     */
    icon;
    /**
     * The code of the Section Title's pictogram (used with type Pictogram)
     */
    pictogram;
    /**
     * Section title.
     **/
    headingText;
    /**
     * Indicates the heading size for the heading text.
     */
    headingSize = HeadingSize.Sm;
    /**
     * Heading level assigned to the title. If 0, a <p> tag is assigned. Values between 1 and 6 correspond to <h1> ... <h6>.
     **/
    headingLevel = 4;
    /**
     * Text above the title, usually used to categorize the content.
     **/
    overline;
    /**
     * Heading level assigned to the overline. If 0, a <p> tag is assigned. Values between 1 and 6 correspond to <h1> ... <h6>.
     **/
    headingOverline = 0;
    /**
     * 'The 'Section title' can become a button that shows or hides the content of the 'Collapse' component.
     **/
    collapsable;
    /**
     * Identifier of the 'Collapse' component whose visibility is controlled by this 'Section title'.
     **/
    collapseTarget;
    /**
     * Tooltip text to be included.
     **/
    tooltip = '';
    /**
     * Tooltip aria-label.
     **/
    tooltipLabel = 'Más información';
    isExpanded = false;
    /**
     * Emitted when the 'Collapse' component collapses or expands.
     */
    athToggleCollapse;
    handleCollapseStateChange(event) {
        if (event.detail.id === this.collapseTarget) {
            this.isExpanded = event.detail.isExpanded;
        }
    }
    handleKeyDown(ev) {
        if (['Enter', 'Space'].includes(ev.code)) {
            this.handleCollapse();
        }
    }
    handleCollapse = () => {
        this.isExpanded = !this.isExpanded;
        this.athToggleCollapse.emit(this.collapseTarget);
    };
    getHostClassNames = () => ({
        'ath-section-title-wrapper': true,
    });
    getClassNames = () => ({
        'ath-section-title': true,
        [`ath-section-title--${this.color}`]: this.type === SectionTitleOption.Default && !!this.color,
        [`ath-section-title--collapsable`]: !!this.collapsable,
        [`ath-section-title--expanded`]: !this.isExpanded,
        [`ath-section-title--hasLabel`]: !!this.headingText,
    });
    getChevronClasses = () => ({
        'ath-section-title--chevron': true,
        [`ath-section-title--chevron-rotate`]: !this.isExpanded,
    });
    getCollapsableAttr = (condition, value) => (condition ? value : undefined);
    getAttributes = () => ({
        'role': this.getCollapsableAttr(this.collapsable, 'button'),
        'tabindex': this.getCollapsableAttr(this.collapsable, '0'),
        'aria-controls': this.getCollapsableAttr(this.collapseTarget, this.collapseTarget),
        'aria-expanded': this.getCollapsableAttr(this.collapsable, `${this.isExpanded}`),
        'onClick': this.getCollapsableAttr(this.collapsable, this.handleCollapse),
    });
    render() {
        const HeadingOverline = getHeading(this.headingOverline);
        const HeadingLabel = getHeading(this.headingLevel);
        const decorationLeft = () => {
            switch (this.type) {
                case SectionTitleOption.Icon:
                    return h("ath-icon", { icon: this.icon, size: "lg" });
                case SectionTitleOption.Pictogram:
                    return this.pictogram && h(FcPictogram, { name: this.pictogram });
                case SectionTitleOption.Default:
                default:
                    return h("div", { class: "ath-section-title--decorator ath-section-title--default" });
            }
        };
        return (h(Host, { class: this.getHostClassNames() }, decorationLeft(), h("div", { ...this.getAttributes(), class: this.getClassNames() }, h("div", { class: "ath-section-title--content" }, this.overline && (h(HeadingOverline, { class: { 'ath-section-title--overline': true, [`ath-section-title--${this.color}-overline`]: !!this.color } }, this.overline)), h("div", { class: "ath-section-title--label-wrapper" }, h(HeadingLabel, { class: { 'ath-section-title--label': true, [`ath-section-title--label--${this.headingSize}`]: true } }, this.headingText, h("div", { class: "ath-section-title--slot" }, h("slot", null))))), this.collapsable && (h("div", { class: this.getChevronClasses() }, h("ath-icon", { icon: "chevron_up" })))), this.tooltip && (h("ath-tooltip", { id: this.tooltipId, "heading-text": this.tooltip, class: "ath-section-title--tooltip" }, h("ath-tooltip-trigger", { icon: "info", size: "md", "aria-label": this.tooltipLabel, onClick: ev => ev.stopPropagation(), onKeyDown: ev => ev.stopPropagation(), "aria-describedBy": this.tooltipId })))));
    }
};
AthSectionTitle.style = sectionTitleCss;

export { AthSectionTitle as ath_section_title };
//# sourceMappingURL=ath-section-title.entry.esm.js.map
