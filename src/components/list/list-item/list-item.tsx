import { Component, Host, Prop, h, Event, EventEmitter, Element, State } from '@stencil/core';
import { getHeading } from '@utils/helper/heading';
import { ListLinkTargetType, ListLinkTarget, ListOrientation, ListOrientationType, ListSizes, ListSizeType } from '../list.model';
import { IconColor } from 'components/icon/icon.model';

let listItemSequence = 0;
@Component({
  tag: 'ath-list-item',
  styleUrl: 'list-item.scss',
  scoped: true,
})
export class AthListItem {
  @Element() el: HTMLElement;

  /** List item title */
  @Prop() headingText: string;

  /** Heading level for the title */
  @Prop() headingLevel = 4;

  /** List item subtitle */
  @Prop() subtitle: string;

  /** List item description */
  @Prop() description: string;

  /** List item tooltip */
  @Prop() tooltip: string;

  /** Tooltip max-width */
  @Prop() tooltipMaxWidth = 240;

  /** List item divider. If user doesn't inform it, its informed from parent list */
  @Prop() hasDivider: boolean;

  /** List item orientation. Its informed from parent list */
  @Prop() orientation: ListOrientationType = ListOrientation.Vertical;

  /** List item size. Its informed from parent list */
  @Prop() size: ListSizeType = ListSizes.Medium;

  /** List item state disabled, only works if clickable is true */
  @Prop() disabled: boolean = false;

  /** ListItem is clickable */
  @Prop() clickable: boolean = false;

  /** URL when clickable is true */
  @Prop() href?: string;

  /** Type of target to url*/
  @Prop() target: ListLinkTargetType = ListLinkTarget.Self;

  /** Type of rel to url*/
  @Prop() rel: string;

  /** The aria-label attribute of the clicable item */
  @Prop() athAriaLabel: string | null;

  /** Additional text to be appended to the aria-label to indicate that this is an external link */
  @Prop() externalLabel?: string = 'Se abre una ventana nueva';

  @State() hasLeftSlot: boolean = true;
  @State() hasRightSlot: boolean = true;
  @State() calculatedLabelledBy: string;
  @State() calculatedDescribedBy: string;

  /** Emitted when listItem is clicked */
  @Event() athClick: EventEmitter<void>;

  private listItemId = `list-item-${++listItemSequence}`;
  private headingTextId = `heading-text-${this.listItemId}`;
  private subtitleId = `subtitle-${this.listItemId}`;
  private descriptionId = `description-${this.listItemId}`;
  private rightDetailId = `right-detail-${this.listItemId}`;
  private externalLabelId = `external-${this.listItemId}`;

  private handleClick = (event: MouseEvent) => {
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
    if (!this.hasLeftSlot) this.markEmptySlot('.ath-list-item--left-detail');
    if (!this.hasRightSlot) this.markEmptySlot('.ath-list-item--right-detail');
  }

  private isSlotted(slotName: string): boolean {
    const slottedElements = this.el.querySelectorAll(`[slot="${slotName}"]`);
    return slottedElements.length > 0;
  }

  private markEmptySlot(slotSelector: string) {
    const slot = this.el.querySelector(slotSelector);
    if (slot) {
      slot.classList.add('empty');
    }
  }

  private setLabelledby() {
    const ids: string[] = [];

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

  private setDescribedBy() {
    const ids: string[] = [];

    if (this.description) {
      ids.push(this.descriptionId);
    }

    const hasRightSlot = this.el.querySelectorAll(`[slot="right-detail"]`).length > 0;
    if (hasRightSlot) {
      ids.push(this.rightDetailId);
    }

    return ids.length > 0 ? ids.join(' ') : undefined;
  }

  private getHostAttributes = () => ({
    role: 'listitem',
  });

  private getHostClassNames = () => ({
    [`ath-list-item--${this.orientation}`]: !!this.orientation,
    [`ath-list-item--${this.size}-${this.orientation}`]: !!this.size && !!this.orientation,
    disabled: this.disabled,
  });

  private getListItemClassNames = () => ({
    [`ath-list-item`]: true,
    [`ath-list-item--divider`]: !!this.hasDivider,
    clickable: this.clickable,
    disabled: this.disabled,
  });

  private renderItem() {
    const HeadingTitle = getHeading(this.headingLevel);
    return (
      <div class={this.getListItemClassNames()}>
        {this.isSlotted('left-detail') && (
          <div class="ath-list-item--left-detail">
            <slot name="left-detail" />
          </div>
        )}
        <div class="ath-list-item--center-detail" part="center-detail">
          {this.headingText && (
            <HeadingTitle id={this.headingTextId} class="ath-list-item--title">
              {this.headingText}
            </HeadingTitle>
          )}
          {this.subtitle && (
            <div class="ath-list-item--subtitle">
              <span class="ath-list-item--subtitle-wrapper" id={this.subtitleId}>
                {this.subtitle}
              </span>
              <div class="ath-list-item--subtitle-tooltip">
                {this.tooltip && (
                  <ath-tooltip class={this.disabled ? 'tooltip-trigger' : ''} headingText={this.tooltip} position="bottom" maxWidth={this.tooltipMaxWidth}>
                    <ath-tooltip-trigger size="xs" tabindex={this.disabled ? '-1' : '0'}></ath-tooltip-trigger>
                  </ath-tooltip>
                )}
              </div>
            </div>
          )}
          {this.description && (
            <span id={this.descriptionId} class="ath-list-item--description">
              {this.description}
            </span>
          )}
        </div>
        {this.isSlotted('right-detail') && (
          <div class="ath-list-item--right-detail" id={this.rightDetailId}>
            <slot name="right-detail" />
          </div>
        )}

        {this.clickable && (
          <div>
            <ath-icon class="icon" icon="chevron_right" color={this.disabled ? IconColor.Disabled : IconColor.Default}></ath-icon>
          </div>
        )}
      </div>
    );
  }

  private getClickableAttributes = () => {
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

  private renderItemClickable() {
    if (this.href) {
      return (
        <a class={this.disabled ? 'clickable disabled' : 'clickable'} href={this.href} target={'_' + this.target} rel={this.rel} {...this.getClickableAttributes()}>
          {this.renderItem()}
          {this.target === ListLinkTarget.Blank && (
            <span class="sr-only" id={this.externalLabelId}>
              {this.externalLabel}
            </span>
          )}
        </a>
      );
    }

    return (
      <div class={this.disabled ? 'clickable disabled' : 'clickable'} role="button" {...this.getClickableAttributes()}>
        {this.renderItem()}
      </div>
    );
  }

  render() {
    return (
      <Host class={this.getHostClassNames()} {...this.getHostAttributes()}>
        {this.clickable ? this.renderItemClickable() : this.renderItem()}
      </Host>
    );
  }
}
