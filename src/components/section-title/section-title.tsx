import { Component, ComponentInterface, Event, EventEmitter, Host, Listen, Prop, State, h, Element } from '@stencil/core';
import { getHeading } from '@utils/helper/heading';
import { FcPictogram } from 'sharedfc/input';
import { HeadingSize, HeadingSizes, SectionTitleColor, SectionTitleColorType, SectionTitleOption, SectionTitleOptionType } from './section-title.model';

let tooltipItemsequence = 0;

@Component({
  tag: 'ath-section-title',
  styleUrl: 'section-title.scss',
  scoped: true,
})
export class AthSectionTitle implements ComponentInterface {
  private tooltipId = `tooltip-${++tooltipItemsequence}`;

  @Element() el: HTMLElement;

  /**
   * Option assigned to the decorative element.
   **/
  @Prop() type: SectionTitleOptionType = SectionTitleOption.Default;

  /**
   * Color assigned to the decorative element and the 'overline' text.
   **/
  @Prop() color: SectionTitleColorType = SectionTitleColor.Primary;

  /**
   * The code of the Section Title's icon (used with type Icon)
   */
  @Prop() icon: string;

  /**
   * The code of the Section Title's pictogram (used with type Pictogram)
   */
  @Prop() pictogram: string;

  /**
   * Section title.
   **/
  @Prop() headingText: string;

  /**
   * Indicates the heading size for the heading text.
   */
  @Prop() headingSize: HeadingSizes = HeadingSize.Sm;

  /**
   * Heading level assigned to the title. If 0, a <p> tag is assigned. Values between 1 and 6 correspond to <h1> ... <h6>.
   **/
  @Prop() headingLevel = 4;

  /**
   * Text above the title, usually used to categorize the content.
   **/
  @Prop() overline: string;

  /**
   * Heading level assigned to the overline. If 0, a <p> tag is assigned. Values between 1 and 6 correspond to <h1> ... <h6>.
   **/
  @Prop() headingOverline = 0;

  /**
   * 'The 'Section title' can become a button that shows or hides the content of the 'Collapse' component.
   **/
  @Prop({ reflect: true }) collapsable: boolean;

  /**
   * Identifier of the 'Collapse' component whose visibility is controlled by this 'Section title'.
   **/
  @Prop() collapseTarget: string;

  /**
   * Tooltip text to be included.
   **/
  @Prop() tooltip: string = '';

  /**
   * Tooltip aria-label.
   **/
  @Prop() tooltipLabel: string = 'Más información';

  @State() isExpanded = false;

  /**
   * Emitted when the 'Collapse' component collapses or expands.
   */
  @Event() athToggleCollapse: EventEmitter<string>;

  @Listen('athCollapseState', { target: 'window' })
  handleCollapseStateChange(event: CustomEvent<{ id: string; isExpanded: boolean }>) {
    if (event.detail.id === this.collapseTarget) {
      this.isExpanded = event.detail.isExpanded;
    }
  }

  @Listen('keydown')
  handleKeyDown(ev: KeyboardEvent) {
    if (['Enter', 'Space'].includes(ev.code)) {
      this.handleCollapse();
    }
  }

  private handleCollapse = () => {
    this.isExpanded = !this.isExpanded;

    this.athToggleCollapse.emit(this.collapseTarget);
  };

  private getHostClassNames = () => ({
    'ath-section-title-wrapper': true,
  });

  private getClassNames = () => ({
    'ath-section-title': true,
    [`ath-section-title--${this.color}`]: this.type === SectionTitleOption.Default && !!this.color,
    [`ath-section-title--collapsable`]: !!this.collapsable,
    [`ath-section-title--expanded`]: !this.isExpanded,
    [`ath-section-title--hasLabel`]: !!this.headingText,
  });

  private getChevronClasses = () => ({
    'ath-section-title--chevron': true,
    [`ath-section-title--chevron-rotate`]: !this.isExpanded,
  });

  private getCollapsableAttr = (condition, value) => (condition ? value : undefined);

  private getAttributes = () => ({
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
          return <ath-icon icon={this.icon} size="lg"></ath-icon>;
        case SectionTitleOption.Pictogram:
          return this.pictogram && <FcPictogram name={this.pictogram} />;
        case SectionTitleOption.Default:
        default:
          return <div class="ath-section-title--decorator ath-section-title--default"></div>;
      }
    };

    return (
      <Host class={this.getHostClassNames()}>
        {decorationLeft()}
        <div {...this.getAttributes()} class={this.getClassNames()}>
          <div class="ath-section-title--content">
            {this.overline && (
              <HeadingOverline class={{ 'ath-section-title--overline': true, [`ath-section-title--${this.color}-overline`]: !!this.color }}>{this.overline}</HeadingOverline>
            )}
            <div class="ath-section-title--label-wrapper">
              <HeadingLabel class={{ 'ath-section-title--label': true, [`ath-section-title--label--${this.headingSize}`]: true }}>
                {this.headingText}
                <div class="ath-section-title--slot">
                  <slot></slot>
                </div>
              </HeadingLabel>
            </div>
          </div>
          {this.collapsable && (
            <div class={this.getChevronClasses()}>
              <ath-icon icon="chevron_up"></ath-icon>
            </div>
          )}
        </div>

        {this.tooltip && (
          <ath-tooltip id={this.tooltipId} heading-text={this.tooltip} class="ath-section-title--tooltip">
            <ath-tooltip-trigger
              icon="info"
              size="md"
              aria-label={this.tooltipLabel}
              onClick={ev => ev.stopPropagation()}
              onKeyDown={ev => ev.stopPropagation()}
              aria-describedBy={this.tooltipId}
            ></ath-tooltip-trigger>
          </ath-tooltip>
        )}
      </Host>
    );
  }
}
