import { Component, ComponentInterface, Host, Prop, h, Event, JSX, EventEmitter, Element } from '@stencil/core';
import { Header } from './card.interface';
import { CardOrientation, CardOrientations, CardSize, CardSizes } from './card.model';

let cardSequence = 0;

@Component({
  tag: 'ath-card',
  styleUrls: ['card.scss'],
  scoped: true,
})
export class AthCard implements ComponentInterface {
  private hostId = `card-${++cardSequence}`;
  private titleId = `${this.hostId}-title`;
  private subtitleId = `${this.hostId}-subtitle`;
  private bodyId = `${this.hostId}-body`;
  private dateId = `${this.hostId}-date`;
  private tagId = `${this.hostId}-tag`;

  /**
   * Size of the card
   **/
  @Prop() size: CardSizes = CardSize.Small;

  /**
   * Orientation Card
   **/
  @Prop() orientation: CardOrientations = CardOrientation.Vertical;

  /**
   * Card is clickable
   **/
  @Prop() clickable = false;

  /**
   * if Card thumbnail is fluid
   */
  @Prop() fluid = false;

  /**
   * ancho de la card
   */
  @Prop() width: string;

  /**
   * ancho máximo de la card
   */
  @Prop() maxWidth: string;

  /**
   * ancho máximo de la card
   */
  @Prop() ariaLabelledBy: string;

  /**
   * Emitted when card is clicked
   */
  @Event() athClick: EventEmitter<void>;

  /**
   * Emitted when card gains focus
   */
  @Event() athFocus: EventEmitter<void>;

  /**
   * Emitted when card loses focus
   */
  @Event() athBlur: EventEmitter<void>;

  @Element() el: HTMLElement;

  private ArticleEl: HTMLElement;
  private header: Header;
  private isHeaderSlotted = true;

  constructor() {
    this.header = {
      headingText: undefined,
      date: undefined,
      overline: undefined,
      subtitle: undefined,
    };
  }

  private handleClick = () => {
    this.ArticleEl.focus();
    this.athClick.emit();
  };

  private handleFocus = () => {
    this.athFocus.emit();
  };

  private handleBlur = () => {
    this.athBlur.emit();
  };

  private getClassNames = () => ({
    'ath-card': true,
    [`ath-card--${this.orientation}`]: true,
    'ath-card--clickable': this.clickable,
    'ath-card--fluid': this.fluid,
  });

  private getImgClassNames = () => ({
    'ath-card-header_wrapper__addons-img': true,
  });

  private getTagClassNames = () => ({
    'ath-card-header_wrapper__tag': true,
  });

  private getWrapperClassNames = () => ({
    'ath-card-wrapper': true,
    [`ath-card-wrapper--${this.size}`]: !!this.size,
  });

  private getThumbnailClassNames = () => ({
    'ath-card-thumbnail': true,
  });

  private getAriaAttributes = (): { [key: string]: unknown } => {
    return {
      'aria-labelledby': this.clickable && this.titleId ? this.titleId : this.ariaLabelledBy || undefined,
      'aria-describedby': this.clickable ? [this.dateId, this.tagId, this.subtitleId, this.bodyId].filter(Boolean).join(' ') : undefined,
    };
  };

  private getHostAttributes = () => ({
    style: !!this.width ? { width: this.width } : undefined,
    role: this.clickable ? 'button' : undefined,
    tabindex: this.clickable ? 0 : -1,
    onFocus: this.handleFocus,
    onBlur: this.handleBlur,
    onClick: this.clickable ? this.handleClick : undefined,
  });

  private renderIcon = () => {
    return <ath-icon icon="arrow_right"></ath-icon>;
  };

  private isSlotted(slotName: string) {
    const namedSlot = this.el.querySelector(`[slot="${slotName}"]`) as HTMLSlotElement;

    if (namedSlot && slotName === 'thumbnail') {
      const thumbnail = this.el.querySelector('ath-card-thumbnail');
      if (thumbnail && typeof thumbnail['updateTypeCard'] === 'function') {
        thumbnail['updateTypeCard'](this.fluid, this.orientation === CardOrientation.Vertical);
      }
    }

    return !!namedSlot;
  }

  private emptySlot(slotSelector: string) {
    const element = this.el.querySelector(slotSelector);
    if (element) {
      element.classList.add('empty');
    }
  }

  private fillHeaderinterface() {
    const athHeader: HTMLAthCardHeaderElement = this.el.querySelector('ath-card-header');
    if (athHeader) {
      this.header.date = athHeader.date ?? undefined;
      this.header.headingText = athHeader.headingText ?? undefined;
      this.header.overline = athHeader.overline ?? undefined;
      this.header.subtitle = athHeader.subtitle ?? undefined;
    } else {
      this.isHeaderSlotted = false;
    }
  }

  componentWillLoad(): void {
    this.fillHeaderinterface();
  }

  componentDidLoad(): void {
    if (!this.isHeaderSlotted) this.emptySlot('.ath-card-header');
    if (!this.isSlotted('img')) this.emptySlot('.ath-card-header_wrapper__addons-img');
    if (!this.isSlotted('tag')) this.emptySlot('.ath-card-header_wrapper__tag');
    if (!this.isSlotted('thumbnail')) this.emptySlot('.ath-card-thumbnail');
  }

  renderHeader = () => {
    return (
      <div class="ath-card-header">
        <div class="ath-card-header_wrapper">
          <div class="ath-card-header_wrapper__addons">
            <div class={this.getImgClassNames()}>
              <slot name="img"></slot>
            </div>
            {!!this.header.date && (
              <span id={this.dateId} class="ath-card-header_wrapper__addons-date">
                {this.header.date}
              </span>
            )}
          </div>
          <div class={this.getTagClassNames()} id={this.tagId}>
            <slot name="tag"></slot>
          </div>
        </div>
        {!!this.header.overline && <span class="ath-card-header_overline"> {this.header.overline} </span>}
        <div class="ath-card-header_titles">
          {!!this.header.headingText && (
            <span id={this.titleId} class="ath-card-header_titles__title">
              {this.header.headingText}
            </span>
          )}
          {!!this.header.subtitle && (
            <span id={this.subtitleId} class="ath-card-header_titles__subtitle">
              {this.header.subtitle}
            </span>
          )}
        </div>
      </div>
    );
  };

  render(): JSX.Element {
    const containsHeader = Object.values(this.header).some(value => value != undefined) || this.isSlotted('img') || this.isSlotted('thumbnail') || this.isSlotted('tag');

    return (
      <Host {...this.getHostAttributes()} {...this.getAriaAttributes()}>
        <article ref={(el: HTMLElement) => (this.ArticleEl = el)} class={this.getClassNames()}>
          <div class={this.getThumbnailClassNames()}>
            <slot name="thumbnail"></slot>
          </div>
          <div class={this.getWrapperClassNames()}>
            <div class="ath-card-wrapper_content">
              {containsHeader && this.renderHeader()}
              <div id={this.bodyId}>
                <slot name="body"></slot>
              </div>
            </div>
            {!this.clickable && <slot name="footer"></slot>}
            {this.clickable && this.renderIcon()}
          </div>
        </article>
      </Host>
    );
  }
}
